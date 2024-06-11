const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible");

    if(navMenu.classList.contains("nav-menu_visible")) {
        navToggle.setAttribute("aria-label", "Cerrar menu");
    } else {
        navToggle.setAttribute("aria-label", "Cerrar menu");
    }
});


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
