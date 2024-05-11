document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {

        loadCarousel('carouselContainer1');
        loadCarousel('carouselContainer2');

    });
    // Función para cargar el contenido del carrusel
    function loadCarousel(containerId) {
        Promise.all([
            fetch('../Templates/carousel.html').then(response => response.text()),
            fetch('/JSON/movies.json').then(response => response.json())
        ])
        .then(([carouselHTML, jsonData]) => {

            // Insertar el contenido del carrusel en el contenedor específico
            document.getElementById(containerId).innerHTML = carouselHTML;
        
            // Obtener el contenedor del carrusel
            const container = document.getElementById(containerId);
        
            // Obtener el contenedor de slides dentro del carrusel
            const slidesContainer = container.querySelector('.carousel_inner');
        
            // Obtener el primer slide (elemento de película)
            const templateSlide = slidesContainer.querySelector('.carousel_item.movie');
        
            // Iterar sobre los datos de las películas y clonar el template para cada una
            jsonData.forEach(movie => {
                const tags = movie.tags;
                const image = movie.img;
                const stars = movie.stars;
                const filmTitle = movie.title;
                const filmDescription = movie.description;
        
                // Crear un nuevo elemento de slide
                const slide = document.createElement('div');
                slide.classList.add('carousel_item', 'movie');
                // Asignar los tags al atributo dataset
                slide.dataset.tags = tags;
        
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
                        <button class="btn_film">Ver</button>
                    </div>
                `;
        
                // Agregar el nuevo slide al contenedor de slides
                slidesContainer.appendChild(slide);
            });
        
            // Ocultar elementos según el carrusel
            if (containerId === 'carouselContainer1') {
                const ratingStars = document.querySelector(`#${containerId} .rating-stars`);
                ratingStars.style.display = 'none';
            }
        
            // Luego de cargar el carrusel, inicializamos su funcionalidad
            initializeCarousel(containerId, jsonData);
        })
    }        
});

function initializeCarousel(containerId, jsonData) {
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

    function ranking(containerId) {
        const carouselContainer = document.getElementById(containerId);
        if (!carouselContainer) {
            console.error(`El contenedor con ID '${containerId}' no se encontró en el DOM.`);
            return; // Salir de la función si el contenedor no se encuentra
        }
    
        const ratingStars = carouselContainer.querySelector('.rating-stars');
        if (!ratingStars) {
            console.error(`No se encontró el elemento con la clase 'rating-stars' dentro del contenedor con ID '${containerId}'.`);
            return; // Salir de la función si el elemento no se encuentra
        }
    
        if (containerId === 'carouselContainer2') {
            ratingStars.style.display = 'block';
        } else {
            ratingStars.style.display = 'none';
        }
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


