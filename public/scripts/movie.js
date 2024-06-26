// document.addEventListener("DOMContentLoaded", function () {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const filmTitle = urlParams.get('title');

//     function renderMovie() {
//         // Obtener el título de la película de la URL
//         fetch('../JSON/movies.json')
//             .then(response => response.json())
//             .then(data => {
//                 // Filtrar los datos para obtener la información de la película seleccionada
//                 const selectedMovie = data.find(movie => movie.title === filmTitle);

//                 if (!selectedMovie) {
//                     console.error(`No se encontró la película con el título "${filmTitle}"`);
//                     return;
//                 }

//                 const mainMovie = document.getElementById("main_movie");
//                 const containerMovie = document.getElementById("container-movie");
//                 const containerTrailer = document.getElementById("qualification_trailer");

//                 const Title = selectedMovie.title;
//                 document.title = Title;

//                 //Main Section
//                 const stars = selectedMovie.stars;
//                 const image = "../img/" + selectedMovie.image;

//                 //Section Creditos y Sinopsis
//                 const directors = selectedMovie.directors;
//                 const screenwriters = [
//                     selectedMovie.screenwriter1,
//                     selectedMovie.screenwriter2,
//                     selectedMovie.screenwriter3,
//                     selectedMovie.screenwriter4,
//                     selectedMovie.screenwriter5
//                 ].filter(writer => writer !== undefined); // Filtrar los guionistas indefinidos
//                 const genre = selectedMovie.gender;
//                 const country = selectedMovie.Country;
//                 const language = selectedMovie.language;
//                 const duration = selectedMovie.duration;
//                 const premiere = selectedMovie.premiere;
//                 const description = selectedMovie.descriptionComplete;

//                 //Section Trailer
//                 const trailer = selectedMovie.linkTrailer;
//                 const qualification = selectedMovie.qualification;
//                 const percentage = selectedMovie.percentage;

//                 // Crear un section
//                 const main = document.createElement('div');
//                 main.classList.add('section_main');

//                 // Estructura de main
//                 main.innerHTML = `
//                     <div class="rating-stars">
//                         <span class="star">${stars}</span>
//                    </div>
//                    <div class="container_img">
//                         <img src="${image}" alt="">
//                    </div>
//                 `;
//                 mainMovie.appendChild(main);

//                 // Crear un section para la descripción de la película
//                 const section_Movie = document.createElement('div');
//                 section_Movie.classList.add('container_description-movie');

//                 // Estructura del section
//                 section_Movie.innerHTML = `
//                     <h3 class="title">${Title}</h3>
//                     <div class="container_creditsDistributions">
//                         <h4 class="title-movie">Créditos y reparto</h4>
//                         <div class="container_flex">
//                             <p class="title_Credits">Directores:</p>
//                             <p class="credits">${directors}</p>
//                         </div>
//                         <div class="container_flex">
//                             <p class="title_Credits">Guión:</p>
//                             <div class="container_directors">
//                                 ${screenwriters.map(writer => `<p class="credits">${writer}</p>`).join('')}
//                             </div>
//                         </div>
//                         <div class="container_flex">
//                             <p class="title_Credits">Género:</p>
//                             <p class="credits">${genre}</p>
//                         </div>
//                         <div class="container_flex">
//                             <p class="title_Credits">País:</p>
//                             <p class="credits">${country}</p>
//                         </div>
//                         <div class="container_flex">
//                             <p class="title_Credits">Idioma:</p>
//                             <p class="credits">${language}</p>
//                         </div>
//                         <div class="container_flex">
//                             <p class="title_Credits">Duración:</p>
//                             <p class="credits">${duration}</p>
//                         </div>
//                         <div class="container_flex">
//                             <p class="title_Credits">Estreno:</p>
//                             <p class="credits">${premiere}</p>
//                         </div>
//                     </div>
//                     <div class="container_description-movie">
//                         <p class="description">${description}</p>
//                     </div>
//                 `;
//                 // Agregar el section al contenedor de películas
//                 containerMovie.appendChild(section_Movie);

//                 const section_Trailer = document.createElement('div');
//                 section_Trailer.classList.add('container_trailer-qualification');
//                 section_Trailer.innerHTML = `
//                     <h4 class="title-movie">Trailer</h4>
//                     <div class="container_trailer">
//                         <iframe src="${trailer}" frameborder="0" allowfullscreen></iframe>
//                     </div>
//                     <div class="container_qualification">
//                         <div class="container_qualification-flex">
//                             <h5>Calificacion</h5>
//                             <div class="qualification">
//                                 <p>${qualification}</p>
//                             </div>
//                         </div>
//                         <div class="container_qualification-flex">
//                             <h5>Le Gusto</h5>
//                             <div class="qualification">
//                                 <p>${percentage}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 containerTrailer.appendChild(section_Trailer);
//             })
//             .catch(error => {
//                 console.error('Error al cargar los datos:', error);
//             });
//     }

//     // Llamar a la función para cargar y renderizar la película
//     renderMovie();
// });

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el título de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');

    // Realizar la petición GET al servidor para obtener los detalles de la película
    fetch(`/api/movies/${encodeURIComponent(title)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los detalles de la película.');
            }
            return response.json();
        })
        .then(movie => {
            // Llenar los elementos HTML con los datos obtenidos
            document.getElementById('movieTitleHead').textContent = movie.title;
            if (movie.imageBanner) {
                document.getElementById('movieBanner').src = `/uploads/${movie.image_banner}`;
            } else {
                console.error('La propiedad imageBanner no está definida en el objeto movie.');
            }
            document.getElementById('movieTitle').textContent = movie.title;
            document.getElementById('movieDescription').textContent = movie.description;
            document.getElementById('movieDirector').textContent = movie.director;
            document.getElementById('movieScreenwriter').textContent = movie.screenwriter;
            document.getElementById('movieGenre').textContent = movie.name;
            document.getElementById('movieCountry').textContent = movie.country;
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
            console.error('Error al obtener los detalles de la película:', error);
            alert('Error al cargar los detalles de la película. Por favor, inténtelo más tarde.');
        });

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

});

function calculateLikePercentage(rating) {
    // en función del valor de la calificación (rating)
    return Math.round((rating / 5) * 100);
}

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