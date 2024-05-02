$(document).ready(function() {
    loadCarousel();
});

function loadCarousel() {
    const carouselContainer = document.getElementById('carouselContainer');
    // Usamos fetch para obtener el contenido del archivo carousel.html
    fetch('../Templates/carousel.html')
        .then(response => response.text())
        .then(data => {
            carouselContainer.innerHTML = data; // Insertamos el contenido del carrusel en el contenedor
        })
        .catch(error => console.error('Error al cargar el carrusel:', error));
}

let currentIndex = 0;

function prevSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    currentIndex = (currentIndex + 1) % totalSlides;
    
    // Verificamos si estamos en la última imagen y si estamos en una versión de tablet
    if ((currentIndex === totalSlides - 1 && window.innerWidth >= 768) || 
        (currentIndex === totalSlides - 4 && window.innerWidth >= 1024)) {
        // Reiniciamos el carrusel
        currentIndex = 0;
    } else {
        // Avanzamos al siguiente slide
        currentIndex = (currentIndex + 1) % totalSlides;
    }
    
    updateCarousel();
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    currentIndex = (currentIndex + 1) % totalSlides;
    
    // Verificamos si estamos en la última imagen y si estamos en una versión de tablet
    if ((currentIndex === totalSlides - 1 && window.innerWidth >= 768) || 
        (currentIndex === totalSlides - 4 && window.innerWidth >= 1024)) {
        // Reiniciamos el carrusel
        currentIndex = 0;
    } else {
        // Avanzamos al siguiente slide
        currentIndex = (currentIndex + 1) % totalSlides;
    }
    
    updateCarousel();
}


function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-item');
    const width = slides[0].offsetWidth;
    const offset = -currentIndex * width;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}px)`;
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




