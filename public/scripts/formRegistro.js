const BACKEND_URL =
    window.location.hostname === 'localhost'
        ? ''
        : 'https://movie-reviews-b0ek.onrender.com';


document.getElementById("register-form").addEventListener("submit", function(event){

    event.preventDefault();


    const nombre =
        document.getElementById("InputName").value.trim();

    const correo =
        document.getElementById("InputEmail").value.trim();

    const contrasena =
        document.getElementById("InputPassword").value.trim();



    // ========================
    // VALIDAR PASSWORD
    // ========================

    if (contrasena && (contrasena.length < 5 || contrasena.length > 10)) {

        const alertContainer =
            document.getElementById("alert-container");

        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show">
                La contraseña debe tener entre 5 y 10 caracteres.
            </div>
        `;

        return;
    }



    // ========================
    // VALIDAR CAMPOS
    // ========================

    if (!nombre || !correo || !contrasena) {

        const alertContainer =
            document.getElementById("alert-container");

        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show">
                Por favor complete todos los campos correctamente.
            </div>
        `;

        return;
    }



    // ========================
    // BOTON PROCESANDO
    // ========================

    const submitButton =
        document.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.innerHTML = 'Procesando...';



    const formData = {

        nombre: nombre,
        correo_electronico: correo,
        contrasena: contrasena

    };



    // ========================
    // FETCH
    // ========================

    fetch(`${BACKEND_URL}/api/users/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

    })


    .then(response => {

        if (response.ok) {
            return response.text();
        }

        throw new Error("Error al registrar el usuario");

    })


    .then(message => {

        const alertContainer =
            document.getElementById("alert-container");

        alertContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show">
                ${message}
            </div>
        `;


        document.getElementById("InputName").value = '';
        document.getElementById("InputEmail").value = '';
        document.getElementById("InputPassword").value = '';

    })


    .catch(error => {

        const alertContainer =
            document.getElementById("alert-container");

        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show">
                ${error.message}
            </div>
        `;

    })


    .finally(() => {

        submitButton.disabled = false;
        submitButton.innerHTML = 'Crear Cuenta';

    });

});
