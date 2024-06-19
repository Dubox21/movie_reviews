document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
});

function loadNavbar() {
    fetch('../Templates/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbarContainer').innerHTML = html;
            setActiveLink(); // Llamar a la función para establecer el enlace activo
            addEventListeners(); // Agregar event listeners después de cargar el navbar
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function setActiveLink() {
    const currentPage = window.location.pathname; // Obtener la ruta de la página actual
    
    // Obtener todos los elementos de enlace del menú
    const links = document.querySelectorAll('.nav-menu-link');
    
    links.forEach(link => {
        if (currentPage.includes('movie.html') && link.getAttribute('href') === '/library') {
            link.classList.add('nav-menu-link_active'); // Agregar la clase activa si coincide con movie.html y el enlace es de biblioteca
        } else if (link.getAttribute('href') === currentPage) {
            link.classList.add('nav-menu-link_active'); // Agregar la clase activa si coincide con la página actual
        }
    });
}

function addEventListeners() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("nav-menu_visible");

            if (navMenu.classList.contains("nav-menu_visible")) {
                navToggle.setAttribute("aria-label", "Cerrar menú");
            } else {
                navToggle.setAttribute("aria-label", "Abrir menú");
            }
        });
    }
}
