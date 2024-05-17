document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('botonEnvio').addEventListener('click', validarFormulario);

    function validarFormulario(event) {
        event.preventDefault(); 

        var errores = document.querySelectorAll('.error');
        errores.forEach(function (error) {
            error.remove();
        });

        var nombre = document.querySelector('input[placeholder="Nombre completo"]');
        var motivo = document.getElementById('inputOption');
        var contacto = document.querySelector('input[placeholder="Contacto"]');
        var mensaje = document.getElementById('floatingTextarea2');

        var esValido = true;

        // Validación de campos
        if (nombre.value.trim() === "") {
            mostrarError(nombre, "Por favor, ingrese su nombre completo.");
            esValido = false;
        }

        if (motivo.value === "Seleccionar el motivo de la consulta") {
            mostrarError(motivo, "Por favor, seleccione el motivo de la consulta.");
            esValido = false;
        }

        if (contacto.value.trim() === "") {
            mostrarError(contacto, "Por favor, ingrese su información de contacto.");
            esValido = false;
        }

        if (mensaje.value.trim() === "") {
            mostrarError(mensaje, "Por favor, ingrese su mensaje.");
            esValido = false;
        }

        if (esValido) {
            document.forms['miformulario'].submit();
        }
    }

    function mostrarError(elemento, mensaje) {
        var error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.textContent = mensaje;
        elemento.parentNode.appendChild(error);
    }
});