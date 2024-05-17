// Obtener una referencia al botón
const btn = document.getElementById("btn-1");

// Agregar un event listener para escuchar el clic en el botón
btn.addEventListener("click", function() {
    // Redirigir a la página "libreria.html"
    window.location.href = "library.html";
});



document.addEventListener("DOMContentLoaded", function() {
    // Define la función para actualizar el contador
    function actualizarContador(contadorID, valorFinal, esPorcentaje) {
        // Obtén el elemento del contador por su ID
        const contador = document.getElementById(contadorID);
        
        // Crea un contador desde 0 hasta el valor final
        let valorActual = 0;
        const incremento = 1;
        const intervalo = 15; // Tiempo en milisegundos entre incrementos

        // Establece un intervalo para aumentar el contador cada cierto tiempo
        const intervalID = setInterval(function() {
            // Incrementa el valor actual
            valorActual += incremento;

            // Verifica si es un porcentaje y agrega el símbolo "%"
            const textoContador = esPorcentaje ? valorActual + "%" : valorActual;

            // Actualiza el texto del contador
            contador.textContent = textoContador;

            // Verifica si se alcanzó el valor final
            if (valorActual >= valorFinal) {
                // Detiene el intervalo cuando se alcanza el valor final
                clearInterval(intervalID);
            }
        }, intervalo);
    }

    // Ejecuta la función para actualizar los contadores después de 4 segundos
    setTimeout(function() {
        actualizarContador("contador", 347, false);
        actualizarContador("contador2", 206, false);
        actualizarContador("porcentaje", 92, true);
        actualizarContador("porcentaje2", 44, true);
    }, 4000);
});
