// Selecciona el botón de la flecha por su ID
var dropdownButton = document.getElementById("dropdownButton");
var dropdownButton2 = document.getElementById("dropdownButton2");

// Añade un event listener para detectar click en el botón de la flecha
dropdownButton.addEventListener("click", function () {
    // Selecciona el desplegable
    var dropdownContent = document.getElementById("myDropdown");

    // Toggle (activa/desactiva) la clase "show" en el desplegable
    dropdownContent.classList.toggle("show");
});

dropdownButton2.addEventListener("click", function () {
    // Selecciona el desplegable
    var dropdownContent = document.getElementById("myDropdown2");

    // Toggle (activa/desactiva) la clase "show" en el desplegable
    dropdownContent.classList.toggle("show");
});

// document.addEventListener('DOMContentLoaded', function () {
//     const dropdownLinks = document.querySelectorAll('#myDropdown2 a');

//     dropdownLinks.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault();

//             const quantityStars = this.getAttribute('data-stars');
//             const url = `../Templates/movie.html?quantityStars=${encodeURIComponent(quantityStars)}`;

//             // Redireccionar a la URL con el parámetro quantityStars
//             window.location.href = url;
//         });
//     });

//     function filterMoviesByStars(stars) {
//         Promise.all([
//             fetch('../Templates/carouselFilter.html').then(response => response.text()),
//             fetch('../JSON/movies.json').then(response => response.json())
//         ])
//             .then(([carouselHTML, slidesContainer]) => {
//                   // Insertar el contenido del carrusel en el contenedor específico
//                   document.getElementById(containerId).innerHTML = carouselHTML;

//                   // Obtener el contenedor del carrusel
//                   const container = document.getElementById(containerId);
  
//                   // Obtener el contenedor de slides dentro del carrusel
//                   const slidesContainer = container.getElementById('filteredMoviesContainer');

//                 const stars5Link = document.getElementById('stars5');
//                 const stars4Link = document.getElementById('stars4');
//                 const stars3Link = document.getElementById('stars3');
//                 const stars2Link = document.getElementById('stars2');
//                 const stars1Link = document.getElementById('stars1');

//                 stars5Link.addEventListener('click', function (event) {
//                     event.preventDefault();
//                     filterMoviesByStars('filteredMoviesContainer', 5);
//                 });

//                 stars4Link.addEventListener('click', function (event) {
//                     event.preventDefault();
//                     filterMoviesByStars('filteredMoviesContainer', 4);
//                 });

//                 stars3Link.addEventListener('click', function (event) {
//                     event.preventDefault();
//                     filterMoviesByStars('filteredMoviesContainer', 3);
//                 });

//                 stars2Link.addEventListener('click', function (event) {
//                     event.preventDefault();
//                     filterMoviesByStars('filteredMoviesContainer', 2);
//                 });

//                 stars1Link.addEventListener('click', function (event) {
//                     event.preventDefault();
//                     filterMoviesByStars('filteredMoviesContainer', 1);
//                 });

//             });
//     }
// });
