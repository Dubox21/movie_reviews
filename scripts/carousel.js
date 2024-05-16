document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        const category = 'all';
        loadCarousel('carouselContainer1', category);
        loadCarousel('carouselContainer2', category);
    });

    // Agregar evento de clic a los enlaces dentro del dropdown-content
    const dropdownLinks = document.querySelectorAll('#myDropdown a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
            const category = this.dataset.category; // Obtener el valor del atributo data-category
            loadCarousel('carouselContainer1', category); // Volver a cargar el carrusel con la nueva categoría
            loadCarousel('carouselContainer2', category);
        });
    });
    // Función para cargar el contenido del carrusel
    function loadCarousel(containerId, category) {
        Promise.all([
            fetch('../Templates/carousel.html').then(response => response.text()),
            fetch('../JSON/movies.json').then(response => response.json())
        ])
            .then(([carouselHTML, jsonData]) => {

                // Insertar el contenido del carrusel en el contenedor específico
                document.getElementById(containerId).innerHTML = carouselHTML;

                // Obtener el contenedor del carrusel
                const container = document.getElementById(containerId);

                // Obtener el contenedor de slides dentro del carrusel
                const slidesContainer = container.querySelector('.carousel_inner');

                // Iterar sobre los datos de las películas y clonar el template para cada una
                jsonData.forEach(movie => {
                    const tags = movie.tags;
                    const image = movie.img;
                    const stars = movie.stars; //Caracteres Unicode de estrellas
                    const quantityStars = movie.quantityStars; // Número de estrellas
                    const filmTitle = movie.title;
                    const filmDescription = movie.description;

                    // Verificar si la película tiene el tag correspondiente a la categoría seleccionada
                    if (category === 'all' || tags.includes(category)) {
                        // Crear un nuevo elemento de slide
                        const slide = document.createElement('div');
                        slide.classList.add('carousel_item', ...tags);
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
                            <div class="btn_film">
                            <a href="../Templates/movie.html?title=${encodeURIComponent(filmTitle)}">VER</a>
                            </div>
                        </div>
                       `;
                        // Agregar el nuevo slide al contenedor de slides solo si no se ha superado la cantidad total de slides
                        if (slidesContainer.children.length < jsonData.length) {
                            slidesContainer.appendChild(slide);
                        }
                    }
                });

                // Ocultar elementos según el carrusel
                if (containerId === 'carouselContainer1') {
                    const ratingStars = document.querySelector(`#${containerId} .rating-stars`);
                    ratingStars.style.display = 'none';
                }

                // Luego de cargar el carrusel, inicializamos su funcionalidad
                initializeCarousel(containerId);
            });
    }

    function initializeCarousel(containerId) {
        // Acceder al carrusel específico
        const container = document.getElementById(containerId);
        const slides = document.querySelectorAll('.carousel_item');
        const totalSlides = slides.length;
        let currentIndex = 0;

        // Función para mostrar el slide actual
        function showSlide(index, category) {
            let slidesToShow = 1; // Por defecto, mostrar un slide

            if (window.innerWidth >= 1024) {
                slidesToShow = 4; // En pantallas de escritorio, mostrar 4 slides
            } else if (window.innerWidth >= 768) {
                slidesToShow = 2; // En tabletas, mostrar 2 slides
            }

            // Obtener el contenedor específico del carrusel
            const container = document.getElementById(containerId);

            // Obtener el contenedor de slides dentro del carrusel
            const slidesContainer = container.querySelector('.carousel_inner');

            // Obtener el total de slides
            const totalSlides = slidesContainer.children.length;

            // Filtrar el total de slides si se aplica una categoría
            let filteredTotalSlides = totalSlides;
            if (category !== 'all') {
                filteredTotalSlides = Array.from(slidesContainer.children).filter(slide => slide.classList.contains(category)).length;
            }

            // Calcular el índice máximo permitido
            const maxIndex = Math.max(0, totalSlides - slidesToShow);

            // Si el índice es mayor que el máximo permitido, establecerlo en el máximo
            if (index > maxIndex) {
                index = maxIndex;
            }

            // Ocultar o mostrar los slides según corresponda
            slides.forEach((slide, i) => {
                if (i >= index && i < index + slidesToShow) {
                    slide.style.display = 'flex';
                } else {
                    slide.style.display = 'none';
                }
            });

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
            if (window.innerWidth >= 1024) {
                currentIndex = (currentIndex + 4) % totalSlides;
            } else if (window.innerWidth >= 768) {
                currentIndex = (currentIndex + 2) % totalSlides;
            } else {
                currentIndex = (currentIndex + 1) % totalSlides;
            }
            showSlide(currentIndex);
        }

        // Función para retroceder al slide anterior
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


});

// Función para alternar la descripción de la película
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