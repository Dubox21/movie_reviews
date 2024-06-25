// Mostrar el loader al principio
document.getElementById('loader').style.display = 'block';

// Ocultar el loader cuando la página haya cargado completamente
window.addEventListener('load', function () {
    document.getElementById('loader').style.display = 'none';
});

//Funcion para posicionarse en el carrusel de todas las peliculas
document.getElementById('btn-all').addEventListener('click', function () {
    const headerHeight = document.querySelector('.header').offsetHeight; // Obtener la altura del encabezado
    const allMovies = document.getElementById('all-movies').offsetTop - headerHeight; // Ajustar la posición

    // Desplazarse a la posición del elemento h3
    window.scrollTo({
        top: allMovies,
        behavior: "smooth" // Desplazamiento suave
    });
});

//Funcion para posicionarse en el carrusel de mejores valoradas
document.getElementById('btn-liked').addEventListener('click', function () {
    const headerHeight = document.querySelector('.header').offsetHeight; // Obtener la altura del encabezado
    const topRated = document.getElementById('top-rated').offsetTop   - headerHeight; // Ajustar la posición

    // Desplazarse a la posición del elemento h3
    window.scrollTo({
        top: topRated,
        behavior: "smooth" // Desplazamiento suave
    });
});

//Funcion para el input de busqueda
const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');
const noResultsMessage = document.getElementById('noResultsMessage');

/*Aca se renderizan los titulos de las peliculas para mostrar en un desplegable las coincidencias y poder 
navegar a la info completa de la pelicula*/
const handleSearch = async () => {
    const searchValue = searchInput.value.toLowerCase().trim();

    if (searchValue === '') {
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.style.display = 'none';
        noResultsMessage.style.display = 'none';
        return;
    }

    try {
        // Realizar la solicitud al backend para obtener las películas filtradas
        const response = await fetch(`/api/movies/search/${encodeURIComponent(searchValue)}`);
        const moviesData = await response.json();

        // Limpiar resultados anteriores
        searchResultsContainer.innerHTML = '';

        // Mostrar sugerencias de búsqueda
        if (moviesData.length > 0) {
            moviesData.forEach(movie => {
                const resultItem = document.createElement('a');
                resultItem.textContent = movie.title;
                resultItem.classList.add('search-result');

                // Al hacer clic en la sugerencia, ir a la página de detalles de esa película
                resultItem.addEventListener('click', () => {
                    window.location.href = `/movies?title=${encodeURIComponent(movie.title)}`;
                });

                searchResultsContainer.appendChild(resultItem);
            });
            // Mostrar el contenedor de resultados
            searchResultsContainer.style.display = 'block';

            // Ocultar el mensaje de no resultados
            noResultsMessage.style.display = 'none';
        } else {
            // Si no hay coincidencias, ocultar el contenedor de resultados
            searchResultsContainer.style.display = 'none';
            // Mostrar el mensaje de no resultados
            noResultsMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al buscar películas:', error);
        // Mostrar el mensaje de no resultados en caso de error
        searchResultsContainer.style.display = 'none';
        noResultsMessage.style.display = 'block';
    }
};

// Asignar el evento de búsqueda al campo de entrada
searchInput.addEventListener('input', handleSearch);

//Funciones para el dropdown, que se muestre el desplegable
// Selecciona el botón de la flecha por su ID
var dropdownButton = document.getElementById("dropdownButton");
var dropdownButton2 = document.getElementById("dropdownButton2");

//Funcion del dropdown Carrusel 1
// Añade un event listener para detectar click en el botón de la flecha
dropdownButton.addEventListener("click", function () {
    // Selecciona el desplegable
    var dropdownContent = document.getElementById("myDropdown");

    // Toggle (activa/desactiva) la clase "show" en el desplegable
    dropdownContent.classList.toggle("show");
});

//Funcion del dropdown Carrusel 2
dropdownButton2.addEventListener("click", function () {
    // Selecciona el desplegable
    var dropdownContent = document.getElementById("myDropdown2");

    // Toggle (activa/desactiva) la clase "show" en el desplegable
    dropdownContent.classList.toggle("show");
});