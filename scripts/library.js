// Mostrar el loader al principio
document.getElementById('loader').style.display = 'block';

// Ocultar el loader cuando la página haya cargado completamente
window.addEventListener('load', function () {
    document.getElementById('loader').style.display = 'none';
});

document.getElementById('btn-all').addEventListener('click', function () {
    const allMovies = document.getElementById('all-movies').offsetTop;

    // Desplazarse a la posición del elemento h3
    window.scrollTo({
        top: allMovies,
        behavior: "smooth" // Desplazamiento suave
    });
});

document.getElementById('btn-liked').addEventListener('click', function () {
    const topRated = document.getElementById('top-rated').offsetTop;

    // Desplazarse a la posición del elemento h3
    window.scrollTo({
        top: topRated,
        behavior: "smooth" // Desplazamiento suave
    });
});

const searchInput = document.getElementById('searchInput');
const searchResultsContainer = document.getElementById('searchResults');
const noResultsMessage = document.getElementById('noResultsMessage');

const handleSearch = async () => {
    const searchValue = searchInput.value.toLowerCase();

    try {
        // Cargar los datos de las películas
        const response = await fetch('../JSON/movies.json');
        const moviesData = await response.json();

        const filteredMovies = moviesData.filter(movie => movie.title.toLowerCase().startsWith(searchValue));

        // Limpiar resultados anteriores
        searchResultsContainer.innerHTML = '';

        // Mostrar sugerencias de búsqueda
        if (filteredMovies.length > 0 && searchValue !== '') {
            // Mostrar sugerencias de búsqueda
            filteredMovies.forEach(movie => {
                const resultItem = document.createElement('a');
                resultItem.textContent = movie.title;
                resultItem.classList.add('search-result');

                // Al hacer clic en la sugerencia, ir a la página de detalles de esa película
                resultItem.addEventListener('click', () => {
                    window.location.href = `../Templates/movie.html?title=${encodeURIComponent(movie.title)}`;
                });

                searchResultsContainer.appendChild(resultItem);
            });
           // Mostrar el contenedor de resultados
           searchResultsContainer.style.display = 'block';

           // Ocultar el mensaje de no resultados
           if (noResultsMessage) {
               noResultsMessage.style.display = 'none';
           }
       } else {
           // Si no hay coincidencias, ocultar el contenedor de resultados
           searchResultsContainer.style.display = 'none';
           // Mostrar el mensaje de no resultados solo si el campo de búsqueda no está vacío
           if (searchValue.trim() !== '') {
               noResultsMessage.style.display = 'block';
           } else {
               noResultsMessage.style.display = 'none'; // Ocultar el mensaje si el campo está vacío
           }
       }
    } catch (error) {
        console.error('Error al cargar los datos de las películas:', error);
    }
};

// Asignar el evento de búsqueda al campo de entrada
searchInput.addEventListener('input', handleSearch);
