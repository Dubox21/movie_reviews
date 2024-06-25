document.addEventListener('DOMContentLoaded', () => {

    //Funcion para el manejo del formulario dependiendo de donde se entre, agregar o modificar
    const action = localStorage.getItem('action');
    const formHeading = document.getElementById('formHeading');
    const movieForm = document.getElementById('movieForm');
    const submitBtn = document.getElementById('submitBtn');

    let pageTitle = 'Formulario de Películas';

    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    if (action === 'add') {
        formHeading.textContent = 'Agregar Película';
        submitBtn.textContent = 'Agregar Película';
        document.title = `Agregar Película - ${pageTitle}`;
        movieForm.method = 'POST';
        movieForm.action = '/api/movies/add';
    } else if (action === 'modify') {
        formHeading.textContent = 'Modificar Película';
        submitBtn.textContent = 'Modificar Película';
        document.title = `Modificar Película - ${pageTitle}`;
        movieForm.method = 'PUT';
        movieForm.action = `/api/movies/modify/${encodeURIComponent(movieTitle)}`;

        // Si hay un título en la URL, hacer la solicitud para obtener los datos de la película
        if (movieTitle) {
            fetch(`/api/movies/${encodeURIComponent(movieTitle)}`)
                .then(response => response.json())
                .then(data => {
                    // Autocompletar los campos del formulario con los datos obtenidos
                    document.getElementById('title').value = data.title;
                    document.getElementById('description').value = data.description;
                    if (data.image_cover) {
                        const imageCoverUrl = `/uploads/${data.image_cover}`;
                        const imagePreviewCover = document.getElementById('imagePreviewCover');
                        imagePreviewCover.style.backgroundImage = `url(${imageCoverUrl})`;
                        imagePreviewCover.style.height = '280px';
                        imagePreviewCover.style.width = '280px';
                        imagePreviewCover.style.backgroundSize = 'cover';
                        imagePreviewCover.innerHTML = '';
                    } else {
                        console.error('La propiedad image_cover no está definida en el objeto movie.');
                    }
                    if (data.imageBanner) {
                        const imageBannerUrl = `/uploads/${data.image_banner}`;
                        const imagePreviewCover = document.getElementById('imagePreviewBanner');
                        imagePreviewCover.style.backgroundImage = `url(${imageBannerUrl})`;
                        imagePreviewCover.style.height = '540px';
                        imagePreviewCover.style.width = '1200px';
                        imagePreviewCover.style.backgroundSize = 'cover'; // Ajustar el tamaño de fondo según sea necesario
                        imagePreviewCover.innerHTML = ''; // Limpiar contenido si es necesario
                    } else {
                        console.error('La propiedad imageCover no está definida en el objeto movie.');
                    }
                    document.getElementById('trailer').value = data.trailer;
                    document.getElementById('director').value = data.director;
                    document.getElementById('screenwriter').value = data.screenwriter;
                    document.getElementById('language').value = data.language;
                    document.getElementById('duration').value = data.duration;
                    document.getElementById('premiere').value = data.premiere.split('T')[0]; // Solo la fecha sin la hora
                    document.querySelector(`input[name="rating"][value="${data.rating}"]`).checked = true;
                    document.getElementById('result').textContent = `${data.rating} / 5`;
                    document.getElementById('genre_id').value = data.genre_id;
                    document.getElementById('country_id').value = data.country_id;

                    showStars(data.rating);
                })
                .catch(error => {
                    console.error('Error al obtener los datos de la película:', error);
                });
        }

    }

    // Manejo de la calificación y visualización del resultado
    const ratingInputs = document.querySelectorAll('.star-rating input[type="radio"]');
    const resultDiv = document.getElementById('result');

    ratingInputs.forEach(input => {
        input.addEventListener('change', () => {
            const ratingValue = parseInt(input.value);
            const percentage = (ratingValue / 5) * 100;
            resultDiv.innerHTML = `${ratingValue} / 5 (${percentage}%)`;
        });
    });

    // Captura el evento de envío del formulario
    movieForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío por defecto

        const formData = new FormData(movieForm); // Obtén los datos del formulario
        const url = movieForm.action;

        try {
            const response = await fetch(`/api/movies/modify/${encodeURIComponent(movieTitle)}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al modificar la película.');
            }

            const result = await response.json();
            console.log(result); // Maneja la respuesta del servidor
        } catch (error) {
            console.error('Error al enviar la solicitud PUT:', error);
        }
    });
});
