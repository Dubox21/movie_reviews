document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {

        loadCarousel('carouselContainer1');
        loadCarousel('carouselContainer2');

    });
        // Función para cargar el contenido del carrusel
    function loadCarousel(containerId) {
        fetch('../JSON/movies.json')
            .then(response => response.json())
            .then(jsonData => {
                // Crear el contenedor principal del carrusel
                const carouselContainer = document.createElement('div');
                carouselContainer.id = 'carousel_container';
                carouselContainer.classList.add('carousel_film');
    
                // Crear el contenedor de slides dentro del carrusel
                const slidesContainer = document.createElement('div');
                slidesContainer.classList.add('carousel_inner');
    
                // Agregar el contenedor de slides al contenedor principal del carrusel
                carouselContainer.appendChild(slidesContainer);
    
                // Insertar el contenedor del carrusel en el contenedor específico
                document.getElementById(containerId).appendChild(carouselContainer);
    
                // Iterar sobre los datos de las películas y clonar el template para cada una
                jsonData.forEach(movie => {
                    const tags = movie.tags;
                    const image = movie.img;
                    const stars = movie.stars; //Caracteres Unicode de estrellas
                    const quantityStars = movie.quantityStars; // Número de estrellas
                    const filmTitle = movie.title;
                    const filmDescription = movie.description;
    
                    // Filtrar películas solo para el carrusel 2 (si corresponde)
                    if (containerId === 'carouselContainer2' && quantityStars !== '5') {
                        return; // Salir del bucle para omitir películas que no tienen la cantidad de estrellas deseada
                    }
    
                    // Crear un nuevo elemento de slide
                    const slide = document.createElement('div');
                    slide.classList.add('carousel_item', 'movie');
                    // Asignar los tags al atributo dataset
                    slide.dataset.tags = tags;
                    slide.dataset.quantityStars = quantityStars;
    
                    // Estructura del slide
                    slide.innerHTML = `
                        <div class="container_img">
                            <img src="${image}" alt="${filmTitle}" loading="lazy">
                        </div>
                        <div class="rating-stars">
                            <span class="star">${stars}</span>
                        </div>
                        <div class="container_description">
                            <h4 class="film_title">${filmTitle}</h4>
                            <div class="description-wrapper">
                                <p class="description-text">${filmDescription}</p>
                                <button class="btn_readMore" onclick="toggleDescription(this)">
                                    <i class="fa-solid fa-sort-down"></i>
                                </button>
                            </div>
                            <a href="../Templates/movie.html?title=${encodeURIComponent(filmTitle)}" class="btn_film">Ver</a>
                        </div>
                    `;
                    // Agregar el nuevo slide al contenedor de slides
                    slidesContainer.appendChild(slide);
                });
    
                // Agregar botones de navegación al carrusel
                const prevButton = document.createElement('button');
                prevButton.classList.add('carousel-prev');
                prevButton.setAttribute('aria-hidden', 'true');
                prevButton.innerHTML = '<i class="fa-solid fa-circle-chevron-left"></i>';
    
                const nextButton = document.createElement('button');
                nextButton.classList.add('carousel-next');
                nextButton.setAttribute('aria-hidden', 'true');
                nextButton.innerHTML = '<i class="fa-solid fa-circle-chevron-right"></i>';
    
                // Agregar botones de navegación al contenedor principal del carrusel
                carouselContainer.appendChild(prevButton);
                carouselContainer.appendChild(nextButton);
    
                // Ocultar elementos según el carrusel
                if (containerId === 'carouselContainer1') {
                    const ratingStars = document.querySelector(`#${containerId} .rating-stars`);
                    ratingStars.style.display = 'none';
                }
    
                // Luego de cargar el carrusel, inicializamos su funcionalidad
                initializeCarousel(containerId);
            });
    }
    
});



function initializeCarousel(containerId) {
    // Acceder al carrusel específico
    const slides = document.querySelectorAll(`#${containerId} .carousel_item`);
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        let slidesToShow = 1; // Por defecto, mostrar un slide

        if (window.innerWidth >= 1024) {
            slidesToShow = 4; // En pantallas de escritorio, mostrar 4 slides
        } else if (window.innerWidth >= 768) {
            slidesToShow = 2; // En tabletas, mostrar 2 slides
        }

        // Calcular el índice máximo permitido
        const maxIndex = Math.max(0, totalSlides - slidesToShow);

        // Si el índice es mayor que el máximo permitido, establecerlo en el máximo
        if (index > maxIndex) {
            index = maxIndex;
        }

        slides.forEach((slide, i) => {
            if (i >= index && i < index + slidesToShow) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    // Llamar a la función showSlide() al cargar la página
    showSlide(currentIndex);

    // Función para avanzar al siguiente slide
    function nextSlide() {
        if (window.innerWidth >= 1024) {
            currentIndex = (currentIndex + 4) % totalSlides;
        } else if (window.innerWidth >= 768) {
            currentIndex = (currentIndex + 2) % totalSlides;
        } else {
            currentIndex = (currentIndex + 1) % totalSlides;
        }
        showSlide(currentIndex);
    }

    function prevSlide() {
        if (window.innerWidth >= 1024) {
            currentIndex = (currentIndex - 4 + totalSlides) % totalSlides;
        } else if (window.innerWidth >= 768) {
            currentIndex = (currentIndex + 2) % totalSlides;
        } else {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        showSlide(currentIndex);
    }

    // Agregar listeners para los botones de control
    // Acceder a los botones de control dentro del contenedor específico
    const prevButton = document.querySelector(`#${containerId} .carousel-prev`);
    const nextButton = document.querySelector(`#${containerId} .carousel-next`);

    prevButton.addEventListener('click', function () {
        prevSlide();
        slideFromLeft();
    });

    nextButton.addEventListener('click', function () {
        nextSlide();
        slideFromRight();
    });

    // Definir animaciones
    function slideFromLeft() {
        const currentSlideIndex = currentIndex;
        const slidesToShow = getSlidesToShow();

        for (let i = currentSlideIndex; i < currentSlideIndex + slidesToShow; i++) {
            const index = i % totalSlides;
            const currentSlide = slides[index];
            currentSlide.classList.remove('active');
            currentSlide.classList.add('prev');
            setTimeout(function () {
                currentSlide.classList.remove('prev');
            }, 500); // La misma duración que la animación
        }
    }

    function slideFromRight() {
        const currentSlideIndex = currentIndex;
        const slidesToShow = getSlidesToShow();

        for (let i = currentSlideIndex; i < currentSlideIndex + slidesToShow; i++) {
            const index = i % totalSlides;
            const currentSlide = slides[index];
            currentSlide.classList.remove('active');
            currentSlide.classList.add('next');
            setTimeout(function () {
                currentSlide.classList.remove('next');
            }, 500); // La misma duración que la animación
        }
    }

    function getSlidesToShow() {
        let slidesToShow = 1; // Por defecto, mostrar un slide

        if (window.innerWidth >= 1024) {
            slidesToShow = 4; // En pantallas de escritorio, mostrar 4 slides
        } else if (window.innerWidth >= 768) {
            slidesToShow = 2; // En tabletas, mostrar 2 slides
        }
        return slidesToShow;
    }
}

function toggleDescription(button) {
    var description = button.parentElement.querySelector('.description-text'); // El párrafo dentro del mismo contenedor

    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        button.innerHTML = '<i class="fa-solid fa-sort-down"></i>'; // Cambiar el ícono a flecha hacia abajo
    } else {
        description.classList.add('expanded');
        button.innerHTML = '<i class="fa-solid fa-sort-up"></i>'; // Cambiar el ícono a flecha hacia arriba
    }
}

function filterMoviesByStars(selectedStars) {

            // Obtener todas las películas del carrusel 2
            const allMovies = document.querySelectorAll('.carrusel-2 .carousel_item');

            // Iterar sobre todas las películas
            allMovies.forEach(movie => {
                // Obtener el número de estrellas de la película
                const movieStars = parseInt(movie.dataset.quantityStars);

                // Verificar si el número de estrellas coincide con el seleccionado
                if (movieStars !== selectedStars) {
                    // Ocultar la película que no coincide
                    movie.style.display = 'none';
                } else {
                    // Mostrar la película que coincide
                    movie.style.display = 'block';
                }
            });
            // Redirigir al usuario al archivo carouselFilter.html
            window.location.href = '../Templates/carouselFilter.html';
}

