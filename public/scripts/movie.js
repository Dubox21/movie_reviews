//obtener los detalles de la pelicula desde la db
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el título de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');

    // Realizar la petición GET al servidor para obtener los detalles de la película
    fetch(`/api/movies/${encodeURIComponent(title)}`)
        .then(response => {
            if (!response.ok) {
                // Guardar el código de error en localStorage
                if (response.status === 404) {
                    localStorage.setItem('errorCode', '404');
                } else {
                    localStorage.setItem('errorCode', '500');
                }
                // Redirigir a la página de error
                window.location.href = '/error';
                return null; // Detener el procesamiento adicional
            }
            return response.json();
        })
        .then(movie => {
            // Llenar los elementos HTML con los datos obtenidos
            document.getElementById('movieTitleHead').textContent = movie.title;
            if (movie.imageBanner) {
                const imageUrl = `/uploads/${movie.image_banner}`;
                console.log('URL de la imagen del banner:', imageUrl);

                const movieBanner = document.getElementById('movieBanner');
                movieBanner.src = imageUrl;
                movieBanner.alt = movie.title;
            } else {
                console.error('La propiedad imageBanner no está definida en el objeto movie.');
            }
            document.getElementById('movieTitle').textContent = movie.title;
            document.getElementById('movieDescription').textContent = movie.description;
            document.getElementById('movieDirector').textContent = movie.director;
            document.getElementById('movieScreenwriter').textContent = movie.screenwriter;
            document.getElementById('movieGenre').textContent = movie.genre_name;
            document.getElementById('movieCountry').textContent = movie.country_name;
            document.getElementById('movieLanguage').textContent = movie.language;
            document.getElementById('movieDuration').textContent = movie.duration;
            document.getElementById('movieRelease').textContent = formatDate(movie.premiere);
            document.getElementById('movieTrailer').src = movie.trailer;
            document.getElementById('movieRating').textContent = movie.rating;
            const likePercentage = calculateLikePercentage(movie.rating);
            document.querySelector('.container_qualification-flex:nth-child(2) p').textContent = `${likePercentage}%`;

            showStars(movie.rating);
        })
        .catch(error => {
            console.error('Error al buscar película:', error);
        });

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Evento para el botón de modificar
    document.getElementById('modifyButton').addEventListener('click', function () {
        // Aquí obtienes el título de la película (puedes ajustar esto según cómo obtienes el título)
        const urlParams = new URLSearchParams(window.location.search);
        const movieTitle = urlParams.get('title'); // Debes obtener esto dinámicamente

        // Guarda la acción y redirecciona
        localStorage.setItem('action', 'modify');
        window.location.href = `/form?title=${encodeURIComponent(movieTitle)}`;
    });

// Evento para el botón de eliminar
document.getElementById('deleteButton').addEventListener('click', function () {
    // Aquí obtienes el título de la película (puedes ajustar esto según cómo obtienes el título)
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title'); // Debes obtener esto dinámicamente

// Guarda la acción y eliminar
localStorage.setItem('action', 'delete');
window.alert("¿Estás seguro de que deseas eliminar la pelicula?");

});




function calculateLikePercentage(rating) {
    // en función del valor de la calificación (rating)
    return Math.round((rating / 5) * 100);
}



// Función para mostrar las estrellas
function showStars(rating) {
    const starsContainer = document.querySelector('.rating-stars');
    starsContainer.innerHTML = ''; // Limpiar las estrellas existentes

    const fullStar = '&#9733;'; // Estrella llena
    const halfStar = '&#9733;'; // Estrella media
    const emptyStar = '&#9734;'; // Estrella vacía

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star');

        if (i < Math.floor(rating)) {
            star.innerHTML = fullStar;
        } else if (i === Math.floor(rating) && rating % 1 !== 0) {
            star.innerHTML = halfStar;
        } else {
            star.innerHTML = emptyStar;
        }

        starsContainer.appendChild(star);
    }
}



