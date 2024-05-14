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

const dropdown = document.querySelector('#myDropdown2');
dropdown.addEventListener('click', function (event) {
    event.preventDefault(); // Evitar la acción por defecto de los enlaces
    const link = event.target.closest('a');
    if (link && link.dataset.stars) {
        const stars = parseInt(link.dataset.stars);
        filterMoviesByStars(stars);
    }
});
