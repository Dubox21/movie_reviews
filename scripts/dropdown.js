// Selecciona el botón de la flecha por su ID
var dropdownButton = document.getElementById("dropdownButton");
var dropdownButton2 = document.getElementById("dropdownButton2");

// Añade un event listener para detectar click en el botón de la flecha
dropdownButton.addEventListener("click", function() {
    // Selecciona el desplegable
    var dropdownContent = document.getElementById("myDropdown");

    // Toggle (activa/desactiva) la clase "show" en el desplegable
    dropdownContent.classList.toggle("show");
});

dropdownButton2.addEventListener("click", function() {
    // Selecciona el desplegable
    var dropdownContent = document.getElementById("myDropdown2");

    // Toggle (activa/desactiva) la clase "show" en el desplegable
    dropdownContent.classList.toggle("show");
});

