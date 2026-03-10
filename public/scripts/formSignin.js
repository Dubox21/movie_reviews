const BACKEND_URL =
    window.location.hostname === 'localhost'
        ? ''
        : 'https://movie-reviews-b0ek.onrender.com';



document.addEventListener('DOMContentLoaded', () => {

    const register = document.getElementById('register');

    if (register) {
        register.addEventListener('click', function () {
            window.location.href = '/formRegistro';
        });
    }


    const forgorPassword = document.getElementById('forgotPassword');

    if (forgorPassword) {
        forgorPassword.addEventListener('click', function() {
            window.location.href = '/inConstruction';
        });
    }

});



document.getElementById("login").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const mensajeError =
        document.getElementsByClassName('error')[0];


    try {

        const respuesta = await fetch(
            `${BACKEND_URL}/api/users/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    correo_electronico: email,
                    contrasena: password
                })
            }
        );


        if (!respuesta.ok) {

            mensajeError.classList.toggle(
                "escondido",
                false
            );

            return;
        }


        const resJson = await respuesta.json();


        if (resJson.redirect) {

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            const userId = resJson.userId;

            localStorage.setItem(
                "userId",
                userId
            );


            // ====================
            // AUTO LOGOUT
            // ====================

            const tiempoDesconexion =
                900000; // 15 min


            let temporizadorDesconexion =
                setTimeout(cerrarSesion,
                    tiempoDesconexion
                );


            document.addEventListener(
                "mousemove",
                reiniciarTemporizador
            );

            document.addEventListener(
                "keydown",
                reiniciarTemporizador
            );


            function reiniciarTemporizador() {

                clearTimeout(
                    temporizadorDesconexion
                );

                temporizadorDesconexion =
                    setTimeout(
                        cerrarSesion,
                        tiempoDesconexion
                    );
            }


            function cerrarSesion() {

                localStorage.removeItem(
                    "isLoggedIn"
                );

                localStorage.removeItem(
                    "userId"
                );

                window.location.href =
                    "/login";
            }


            window.location.href =
                resJson.redirect;
        }

    }

    catch (error) {

        console.error(
            "Error durante el inicio de sesión:",
            error
        );

    }

});
