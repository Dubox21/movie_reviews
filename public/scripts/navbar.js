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
            
            // Agregar el evento de clic al enlace "Agregar películas"
            const addMovieLink = document.querySelector('#myDesplegable a[data-category="Agregar"]');
            addMovieLink.addEventListener('click', function(event) {
                event.preventDefault(); // Evita que el enlace redirija
                
                // Establecer la acción en el localStorage
                localStorage.setItem('action', 'add');
                
                // Redirigir a la página del formulario
                window.location.href = '/form';
            });
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



//CODIGO VIEJO

//Funciones para el container_desplegable, que se muestre el desplegable
// Selecciona el botón de la flecha por su ID
var desplegableButton = document.getElementById("desplegableButton");

//Funcion del desplegable
// Añade un event listener para detectar click en el botón de la flecha
desplegableButton.addEventListener("click", function () {
    // Selecciona el desplegable
    var desplegableContent = document.getElementById("myDesplegable");

    // Toggle (activa/desactiva) la clase "show" en el desplegable
    desplegableContent.classList.toggle("show");
});


//NUEVO CODIGO con FUNCION AGREGADA

// Cuando el usuario hace clic en el botón, puede alternar entre ocultar y mostrar el contenido desplegable
function myFunctionDesplegable() {
    document.getElementById("myDesplegable").classList.toggle("show");
  }

  //Cierre el menú desplegable si el usuario hace clic fuera de él.
  window.onclick = function(e) {
    if (!e.target.matches('.despbtn')) {
    var myDesplegable = document.getElementById("myDesplegable");
      if (myDesplegable.classList.contains('show')) {
        myDesplegable.classList.remove('show');
      }
    }
  }

