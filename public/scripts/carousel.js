// Función para obtener datos de la API
async function fetchMovies() {
    try {
        const response = await fetch('/api/allMovies');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Función para crear el componente de película y mostrar en library.html
async function renderMovies(containerId) {
    const moviesContainer = document.querySelector(`#${containerId} .carousel_inner`);

    // Obtener datos de la API
    const moviesData = await fetchMovies();

    // Limpiar contenedor antes de agregar nuevos elementos
    moviesContainer.innerHTML = '';

    // Iterar sobre cada película y crear el componente HTML
    moviesData.forEach(movie => {
        const imageUrl = `/uploads/${movie.image_cover}`;
        // Crear el slide individual (carousel_item)
        const slide = document.createElement('div');
        slide.classList.add('carousel_item', 'movie');

        // Calcular las estrellas llenas y vacías
        const fullStars = Math.floor(movie.rating);
        const halfStar = movie.rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        // Crear el contenido HTML para cada película
        const movieHtml = `
            <div class="container_img">
               <img class="movie-image" src="${imageUrl}" alt="${movie.title} Cover">
            </div>
            <div class="rating-stars">
                <span class="star">${'★'.repeat(fullStars)}${halfStar ? '½' : ''}${'☆'.repeat(emptyStars)}</span>
            </div>
            <div class="container_description">
                <h4 class="film_title">${movie.title}</h4>
                <div class="description-wrapper">
                    <p class="description-text">${movie.description}</p>
                    <button class="btn_readMore" onclick="toggleDescription(this)">
                        <i class="fa-solid fa-sort-down"></i>
                    </button>
                </div>
            </div>
            <button class="btn_film">VER</button>
        `;

        // Agregar el contenido HTML al slide
        slide.innerHTML = movieHtml;

        // Agregar el slide al contenedor de slides
        moviesContainer.appendChild(slide);

        // Agregar listener de click para redirigir
        const btnFilm = slide.querySelector('.btn_film');
        btnFilm.addEventListener('click', () => {
            window.location.href = `/movies?title=${encodeURIComponent(movie.title)}`;
        });
    });

    // Inicializar el carrusel después de renderizar las películas
    initializeCarousel(containerId);
}

function initializeCarousel(containerId) {
    // Acceder al carrusel específico
    const container = document.getElementById(containerId);
    const slides = container.querySelectorAll('.carousel_item');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Función para mostrar el slide actual
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

        // Mostrar los slides según el índice actual
        slides.forEach((slide, i) => {
            if (i >= index && i < index + slidesToShow) {
                slide.style.display = 'flex';
            } else {
                slide.style.display = 'none';
            }
        });

        // Actualizar currentIndex
        currentIndex = index;

        // Desactivar la flecha de la izquierda si se llega al primer slide
        container.querySelector('.carousel-prev').disabled = index === 0;
        container.querySelector('.carousel-prev').classList.toggle('disabled', index === 0);

        // Desactivar la flecha de la derecha si se llega al último slide
        container.querySelector('.carousel-next').disabled = index >= maxIndex;
        container.querySelector('.carousel-next').classList.toggle('disabled', index >= maxIndex);
    }

    // Llamar a la función showSlide() al cargar la página
    showSlide(currentIndex);

    // Función para avanzar al siguiente slide
    function nextSlide() {
        let slidesToShow = 1; // Por defecto, mostrar un slide

        if (window.innerWidth >= 1024) {
            slidesToShow = 4; // En pantallas de escritorio, mostrar 4 slides
        } else if (window.innerWidth >= 768) {
            slidesToShow = 2; // En tabletas, mostrar 2 slides
        }

        currentIndex = Math.min(currentIndex + slidesToShow, totalSlides - slidesToShow);
        showSlide(currentIndex);
    }

    // Función para retroceder al slide anterior
    function prevSlide() {
        let slidesToShow = 1; // Por defecto, mostrar un slide

        if (window.innerWidth >= 1024) {
            slidesToShow = 4; // En pantallas de escritorio, mostrar 4 slides
        } else if (window.innerWidth >= 768) {
            slidesToShow = 2; // En tabletas, mostrar 2 slides
        }

        currentIndex = Math.max(0, currentIndex - slidesToShow);
        showSlide(currentIndex);
    }

    // Agregar listeners para los botones de control
    const prevButton = container.querySelector('.carousel-prev');
    const nextButton = container.querySelector('.carousel-next');

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
    const description = button.parentElement.querySelector('.description-text'); // El párrafo dentro del mismo contenedor

    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        button.innerHTML = '<i class="fa-solid fa-sort-down"></i>'; // Cambiar el ícono a flecha hacia abajo
    } else {
        description.classList.add('expanded');
        button.innerHTML = '<i class="fa-solid fa-sort-up"></i>'; // Cambiar el ícono a flecha hacia arriba
    }
}

// Llamar a la función para renderizar películas cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    renderMovies('carouselContainer1');
    renderMovies('carouselContainer2');
});
