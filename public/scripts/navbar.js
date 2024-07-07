document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();

    function loadNavbar() {
        fetch('../Templates/navbar.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('navbarContainer').innerHTML = html;
                setActiveLink();
                addEventListeners();
                handleAuthentication();
            })
            .catch(error => console.error('Error loading navbar:', error));
    }

    function setActiveLink() {
        const currentPage = window.location.pathname;
        const links = document.querySelectorAll('.nav-menu-link');
        links.forEach(link => {
            if (currentPage.includes('movie.html') && link.getAttribute('href') === '/library') {
                link.classList.add('nav-menu-link_active');
            } else if (link.getAttribute('href') === currentPage) {
                link.classList.add('nav-menu-link_active');
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

        const addMovieLink = document.querySelector('#myDesplegable a[data-category="Agregar"]');
        if (addMovieLink) {
            addMovieLink.addEventListener('click', function(event) {
                event.preventDefault();
                localStorage.setItem('action', 'add');
                window.location.href = '/form';
            });
        }

        const singUpButton = document.getElementById('singupButton');
        if (singUpButton) {
            singUpButton.addEventListener('click', function() {
                window.location.href = '/formRegistro';
            });

            const logInButton = document.getElementById('logInButton');
            logInButton.addEventListener('click', function() {
                window.location.href = '/signin';
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

        const logInButton = document.getElementById('loginButton');
        if (logInButton) {
            logInButton.addEventListener('click', function() {
                window.location.href = '/formSignin';
            });
        }
    }

    function handleAuthentication() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const authButtons = document.getElementById("authButtons");
        const userDropdown = document.getElementById("userDropdown");
        const modifyButton = document.getElementById("modifyButton");
        const deleteButton = document.getElementById("deleteButton");
        const logoutButton = document.getElementById("logoutButton");

        if (isLoggedIn) {
            if (authButtons) authButtons.classList.add("escondido");
            if (userDropdown) userDropdown.classList.remove("escondido");
            if (modifyButton) modifyButton.classList.remove("escondido");
            if (deleteButton) deleteButton.classList.remove("escondido");

            if (logoutButton) {
                logoutButton.addEventListener("click", () => {
                    localStorage.removeItem("isLoggedIn");
                    window.location.href = "/home";
                });
            }
        } else {
            if (authButtons) authButtons.classList.remove("escondido");
            if (userDropdown) userDropdown.classList.add("escondido");
            if (modifyButton) modifyButton.classList.add("escondido");
            if (deleteButton) deleteButton.classList.add("escondido");

            if (logoutButton) {
                logoutButton.removeEventListener("click", () => {
                    localStorage.removeItem("isLoggedIn");
                    window.location.href = "/home";
                });
            }
        }
    }
}
});

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

