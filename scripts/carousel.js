document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        loadCarousel('carouselContainer1');
        loadCarousel('carouselContainer2');
    });
    // Función para cargar el contenido del carrusel
    function loadCarousel(containerId) {
        fetch('../Templates/carousel.html')
            .then(response => response.text())
            .then(data => {
                // Insertar el contenido del carrusel en el contenedor específico
                document.getElementById(containerId).innerHTML = data;
                // Luego de cargar el carrusel, inicializamos su funcionalidad
                initializeCarousel(containerId);

                // Ocultar elementos según el carrusel
                if (containerId === 'carouselContainer1') {
                    const ratingStars = document.querySelector(`#${containerId} .rating-stars`);
                    ratingStars.style.display = 'none';
                }
            })
            .catch(error => console.error('Error al cargar el carrusel:', error));
    }
});

function initializeCarousel(containerId) {
    // Acceder al carrusel específico
    const slides = document.querySelectorAll(`#${containerId} .carousel-item`);
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
    const prevButton = document.querySelector(`#${containerId} .carousel-control-prev`);
    const nextButton = document.querySelector(`#${containerId} .carousel-control-next`);

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
    const ratingStars = carouselContainer.querySelector('.rating-stars');

    if (containerId === 'carouselContainer2') {
        ratingStars.style.display = 'block';
    } else {
        ratingStars.style.display = 'none';
    }
}

    ranking('carouselContainer2'); // Para el carrusel 2
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
