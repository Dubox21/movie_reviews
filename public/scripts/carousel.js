// document.addEventListener('DOMContentLoaded', () => {
//         const category1 = 'all';
//         const category2 = 'all';
//         loadCarousel('carouselContainer1', category1);
//         loadCarousel('carouselContainer2', category2);

//     // Agregar evento de clic a los enlaces dentro del dropdown-content 1
//     const dropdownLinks1 = document.querySelectorAll('#myDropdown a');
//     dropdownLinks1.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
//             const category = this.dataset.category; // Obtener el valor del atributo data-category
//             loadCarousel('carouselContainer1', category); // Volver a cargar el carrusel 1 con la nueva categoría
//         });
//     });

//     // Agregar evento de clic a los enlaces dentro del dropdown-content 2
//     const dropdownLinks2 = document.querySelectorAll('#myDropdown2 a');
//     dropdownLinks2.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
//             const category = this.dataset.category; // Obtener el valor del atributo data-category
//             loadCarousel('carouselContainer2', category); // Volver a cargar el carrusel 2 con la nueva categoría
//         });
//     });

//     // Función para cargar el contenido del carrusel
// //     

// function loadCarousel(containerId, category) {
//     fetch(`/api/movies`) // Cambiar la ruta según corresponda a tu API
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Error al obtener los detalles de la película.');
//         }
//         return response.json();
//     })
//     .then(movie => {
//         // Llenar los elementos HTML con los datos obtenidos
//         document.getElementById('movieTitleHead').textContent = movie.title;
//         if (movie.imageBanner) {
//             document.getElementById('movie').src = `/uploads/${movie.image_banner}`;
//         } else {
//             console.error('La propiedad imageBanner no está definida en el objeto movie.');
//         }
//         document.getElementById('movieTitle').textContent = movie.title;
//         document.getElementById('movieDescription').textContent = movie.description;

//         // Cargar el carrusel
//         initializeCarousel(containerId, category);
//     })
// }

// // Función para inicializar la funcionalidad del carrusel
// function initializeCarousel(containerId) {
//     // Acceder al carrusel específico
//     const container = document.getElementById(containerId);
//     const slides = container.querySelectorAll('.carousel_item');
//     const totalSlides = slides.length;
//     let currentIndex = 0;

//     // Función para mostrar el slide actual
//     function showSlide(index, category) {
//         let slidesToShow = 1; // Por defecto, mostrar un slide

//         if (window.innerWidth >= 1024) {
//             slidesToShow = 4; // En pantallas de escritorio, mostrar 4 slides
//         } else if (window.innerWidth >= 768) {
//             slidesToShow = 2; // En tabletas, mostrar 2 slides
//         }

//         // Obtener el total de slides
//         const totalSlides = slides.length;

//         // Filtrar el total de slides si se aplica una categoría
//         let filteredTotalSlides = totalSlides;
//         if (category !== 'all') {
//             filteredTotalSlides = Array.from(slides).filter(slide => slide.classList.contains(category)).length;
//         }

//         // Calcular el índice máximo permitido
//         const maxIndex = Math.max(0, totalSlides - slidesToShow);

//         // Si el índice es mayor que el máximo permitido, establecerlo en el máximo
//         if (index > maxIndex) {
//             index = maxIndex;
//         }

//         // Ocultar o mostrar los slides según corresponda
//         slides.forEach((slide, i) => {
//             if (i >= index && i < index + slidesToShow) {
//                 slide.style.display = 'flex';
//             } else {
//                 slide.style.display = 'none';
//             }
//         });

//         // Desactivar la flecha de la izquierda si se llega al primer slide
//         container.querySelector('.carousel-prev').disabled = index === 0;
//         container.querySelector('.carousel-prev').classList.toggle('disabled', index === 0);

//         // Desactivar la flecha de la derecha si se llega al último slide
//         container.querySelector('.carousel-next').disabled = index >= maxIndex;
//         container.querySelector('.carousel-next').classList.toggle('disabled', index >= maxIndex);
//     }

//     // Llamar a la función showSlide() al cargar la página
//     showSlide(currentIndex);

//     // Función para avanzar al siguiente slide
//     function nextSlide() {
//         if (window.innerWidth >= 1024) {
//             currentIndex = (currentIndex + 4) % totalSlides;
//         } else if (window.innerWidth >= 768) {
//             currentIndex = (currentIndex + 2) % totalSlides;
//         } else {
//             currentIndex = (currentIndex + 1) % totalSlides;
//         }
//         showSlide(currentIndex);
//         slideFromRight();
//     }

//     // Función para retroceder al slide anterior
//     function prevSlide() {
//         if (window.innerWidth >= 1024) {
//             currentIndex = (currentIndex - 4 + totalSlides) % totalSlides;
//         } else if (window.innerWidth >= 768) {
//             currentIndex = (currentIndex - 2 + totalSlides) % totalSlides;
//         } else {
//             currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//         }
//         showSlide(currentIndex);
//         slideFromLeft();
//     }

//     // Agregar listeners para los botones de control
//     // Acceder a los botones de control dentro del contenedor específico
//     const prevButton = container.querySelector('.carousel-prev');
//     const nextButton = container.querySelector('.carousel-next');

//     prevButton.addEventListener('click', prevSlide);
//     nextButton.addEventListener('click', nextSlide);

//     // Definir animaciones
//     function slideFromLeft() {
//         const currentSlideIndex = currentIndex;
//         const slidesToShow = getSlidesToShow();

//         for (let i = currentSlideIndex; i < currentSlideIndex + slidesToShow; i++) {
//             const index = i % totalSlides;
//             const currentSlide = slides[index];
//             currentSlide.classList.remove('active');
//             currentSlide.classList.add('prev');
//             setTimeout(function () {
//                 currentSlide.classList.remove('prev');
//             }, 500); // La misma duración que la animación
//         }
//     }

//     function slideFromRight() {
//         const currentSlideIndex = currentIndex;
//         const slidesToShow = getSlidesToShow();

//         for (let i = currentSlideIndex; i < currentSlideIndex + slidesToShow; i++) {
//             const index = i % totalSlides;
//             const currentSlide = slides[index];
//             currentSlide.classList.remove('active');
//             currentSlide.classList.add('next');
//             setTimeout(function () {
//                 currentSlide.classList.remove('next');
//             }, 500); // La misma duración que la animación
//         }
//     }

//     function getSlidesToShow() {
//         let slidesToShow = 1; // Por defecto, mostrar un slide

//         if (window.innerWidth >= 1024) {
//             slidesToShow = 4; // En pantallas de escritorio, mostrar 4 slides
//         } else if (window.innerWidth >= 768) {
//             slidesToShow = 2; // En tabletas, mostrar 2 slides
//         }
//         return slidesToShow;
//     }
// }

// // Función para alternar la descripción de la película
// function toggleDescription(button) {
//     const description = button.parentElement.querySelector('.description-text'); // El párrafo dentro del mismo contenedor

//     if (description.classList.contains('expanded')) {
//         description.classList.remove('expanded');
//         button.innerHTML = '<i class="fa-solid fa-sort-down"></i>'; // Cambiar el ícono a flecha hacia abajo
//     } else {
//         description.classList.add('expanded');
//         button.innerHTML = '<i class="fa-solid fa-sort-up"></i>'; // Cambiar el ícono a flecha hacia arriba
//     }
// }


// });


document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/allMovies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los detalles de la película.');
            }
            return response.json();
        })
        .then(movie => {
            if (movie.imageBanner) {
                document.getElementById('movieCover').src = `/uploads/${movie.image_cover}`;
            } else {
                console.error('La propiedad imageBanner no está definida en el objeto movie.');
            }
            document.getElementById('movieTitle').textContent = movie.title;
            document.getElementById('movieDescription').textContent = movie.description;
        })
        .catch(error => {
            console.error('Error al obtener los detalles de la película:', error);
            alert('Error al cargar los detalles de la película. Por favor, inténtelo más tarde.');
        });


})