//Funcion para posicionarse en las tarjetas de Acerca de nosotros//
document.getElementById('btn-mas').addEventListener('click', function () {
    const headerHeight = document.querySelector('.header').offsetHeight; // Obtener la altura del encabezado
    const SeccionCards = document.getElementById('seccioncard').offsetTop - headerHeight; // Ajustar la posición

    // Desplazarse a la posición de la seccion de las tarjetas //
    window.scrollTo({
        top: SeccionCards,
        behavior: "smooth" // Desplazamiento suave
    });
});
