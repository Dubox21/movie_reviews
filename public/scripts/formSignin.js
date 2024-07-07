const mensajeError = document.getElementsByClassName('error')[0];


document.getElementById("login").addEventListener("submit", async(e) =>{
    e.preventDefault();
    const email = e.target.children.email.value;
    const password =e.target.children.password.value;
    const mensajeError = document.getElementsByClassName('error')[0];

    console.log(e.target.children.email.value);
    console.log(e.target.children.password.value);

try {
    const respuesta = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo_electronico: email,
            contrasena: password
        })
        
    });

    if (!respuesta.ok) {
        mensajeError.classList.toggle("escondido", false);
        return;
    }

    const resJson = await respuesta.json();

        if (resJson.redirect) {
            localStorage.setItem("isLoggedIn", "true");
            console.log("Usuario logueado:", localStorage.getItem("isLoggedIn")); // Agregado console.log

            // Obtener y almacenar el ID del usuario si está disponible en la respuesta
            const userId = resJson.userId; // Asegúrate de ajustar esto según lo que devuelve tu API

            // Almacenar el ID del usuario en localStorage para su uso posterior
            localStorage.setItem("userId", userId);

            // Configurar temporizador para deslogueo automático después de 15 minutos (900,000 milisegundos)
            const tiempoDesconexion = 900000; // 15 minutos en milisegundos
            let temporizadorDesconexion = setTimeout(() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userId"); // Limpiar también el userId al desconectar
                console.log("Usuario desconectado automáticamente.");
                window.location.href = "/login"; // Redirigir a la página de inicio de sesión
            }, tiempoDesconexion);

            // Reiniciar el temporizador si hay actividad del usuario
            document.addEventListener("mousemove", reiniciarTemporizador);
            document.addEventListener("keydown", reiniciarTemporizador);

            function reiniciarTemporizador() {
                clearTimeout(temporizadorDesconexion);
                temporizadorDesconexion = setTimeout(() => {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("userId"); // Limpiar también el userId al desconectar
                    console.log("Usuario desconectado automáticamente.");
                    window.location.href = "/login"; // Redirigir a la página de inicio de sesión
                }, tiempoDesconexion);
            }

            // Redirigir a la página según lo indicado por el backend
            window.location.href = resJson.redirect;
        }
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
    }
});
