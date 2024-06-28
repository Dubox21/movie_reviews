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
    const topRated = document.getElementById('top-rated').offsetTop - headerHeight; // Ajustar la posición

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
const dropdownContent = document.getElementById('myDropdown');
var dropdownButton2 = document.getElementById("dropdownButton2");
const dropdownContent2 = document.getElementById('myDropdown2');

//Funcion del dropdown Carrusel 1
async function loadGenres() {
    try {
        const response = await fetch('/api/genres');
        const genres = await response.json();

        // Crear enlace para mostrar todas las películas
        const allMoviesLink = document.createElement('a');
        allMoviesLink.href = '#';
        allMoviesLink.textContent = 'Todas las películas';
        allMoviesLink.addEventListener('click', async (e) => {
            e.preventDefault();
            dropdownContent.classList.remove('show'); // Cerrar el dropdown después de seleccionar todas las películas
            await renderMovies('carouselContainer1'); // Renderizar todas las películas sin filtro de género
        });
        dropdownContent.appendChild(allMoviesLink);

        // Crear enlace para mostrar todas las películas en el carrusel 2
        const allMoviesLink2 = document.createElement('a');
        allMoviesLink2.href = '#';
        allMoviesLink2.textContent = 'Todas las películas';
        allMoviesLink2.addEventListener('click', async (e) => {
            e.preventDefault();
            dropdownContent2.classList.remove('show'); // Cerrar el dropdown después de seleccionar todas las películas
            await renderMovies('carouselContainer2'); // Renderizar todas las películas sin filtro de género
        });
        dropdownContent2.appendChild(allMoviesLink2);

        genres.forEach(genre => {
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.category = genre.id;
            link.textContent = genre.name;
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                dropdownContent.classList.remove('show'); // Cerrar el dropdown después de seleccionar un género
                await renderMovies('carouselContainer1', genre.id); // Renderizar películas del género seleccionado
            });
            dropdownContent.appendChild(link);
        });

        // Iterar sobre los géneros y crear enlaces para el carrusel 2
        genres.forEach(genre => {
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.category = genre.id;
            link.textContent = genre.name;
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                dropdownContent2.classList.remove('show'); // Cerrar el dropdown después de seleccionar un género
                await renderMovies('carouselContainer2', genre.id); // Renderizar películas del género seleccionado para el carrusel 2
            });
            dropdownContent2.appendChild(link);
        });

    } catch (error) {
        console.error('Error al cargar los géneros:', error);
    }
}

//para obtener el genero por id
async function fetchMoviesByGenre(genreId) {
    try {
        const response = await fetch(`/api/movies/genre/${genreId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching movies by genre ${genreId}:`, error);
        return [];
    }
}

dropdownButton.addEventListener('click', function () {
    dropdownContent.classList.toggle('show');
});

dropdownButton2.addEventListener("click", function () {
    // Toggle (activa/desactiva) la clase "show" en el desplegable
    dropdownContent2.classList.toggle("show");
});

loadGenres();