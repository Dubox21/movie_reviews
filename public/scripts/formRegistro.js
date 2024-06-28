document.getElementById("register-form").addEventListener("submit", function(event){
    event.preventDefault(); // Prevenir el envío automático del formulario

    // Obtener valores de los campos
    const nombre = document.getElementById("InputName").value.trim();
    const correo = document.getElementById("InputEmail").value.trim();
    const contrasena = document.getElementById("InputPassword").value.trim();

    // Validar longitud de la contraseña
    if (contrasena && (contrasena.length < 5 || contrasena.length > 10)) {
        // Mostrar mensaje de error específico para la contraseña
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                La contraseña debe tener entre 5 y 10 caracteres.
                <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        return; // Detener el envío del formulario
    }

    // Validar que todos los campos estén completos si la contraseña es correcta o está vacía
    if (!nombre || !correo || !contrasena) {
        // Mostrar mensaje general de error si algún campo está vacío
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Por favor complete todos los campos correctamente.
                <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        return; // Detener el envío del formulario
    }

    // Deshabilitar el botón de submit y mostrar mensaje de procesamiento
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Procesando...';

    const formData = {
        nombre: nombre,
        correo_electronico: correo,
        contrasena: contrasena
    };

    fetch("/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Error al registrar el usuario");
        }
    })
    .then(message => {
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
        `;
        // Limpiar los campos del formulario después del registro exitoso
        document.getElementById("InputName").value = '';
        document.getElementById("InputEmail").value = '';
        document.getElementById("InputPassword").value = '';
    })
    .catch(error => {
        const alertContainer = document.getElementById("alert-container");
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${error.message}
                <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    })
    .finally(() => {
        // Habilitar el botón de submit después de completar el registro o en caso de error
        submitButton.disabled = false;
        submitButton.innerHTML = 'Crear Cuenta';
    });
});
