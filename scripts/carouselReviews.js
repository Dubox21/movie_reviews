// Cargar el carrusel cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    loadCarousel();
});

// Función para cargar el contenido del carrusel
function loadCarousel() {
    fetch('../Templates/carouselReviews.html')
        .then(response => response.text())
        .then(data => {
            // Insertar el contenido del carrusel en el contenedor específico
            document.getElementById('carouselContainer_reviews').innerHTML = data;
            // Inicializar el carrusel después de cargar el contenido
            initCarousel();
        })
        .catch(error => console.error('Error al cargar el carrusel:', error));
}

// Función para inicializar el carrusel
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-item_reviews');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        let slidesToShow = 1; // Por defecto, mostrar un slide

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
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    // Agregar listeners para los botones de control
    // Acceder a los botones de control dentro del contenedor específico
    const prevButton = document.querySelector(' .carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    prevButton.addEventListener('click', function () {
        prevSlide();
       slideFromLeft()
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
        return slidesToShow;
    }


}



