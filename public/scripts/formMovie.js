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
        
    } else if (action === 'modify') {
        formHeading.textContent = 'Modificar Película';
        submitBtn.textContent = 'Modificar Película';
        document.title = `Modificar Película - ${pageTitle}`;

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

    movieForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(movieForm);

        try {
            let response;

            if (action === 'add') {
                response = await fetch('/api/movies/add', {
                    method: 'POST',
                    body: formData
                });
            } else if (action === 'modify' && movieTitle) {
                response = await fetch(`/api/movies/modify/${encodeURIComponent(movieTitle)}`, {
                    method: 'PUT',
                    body: formData
                });
            }

            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }

            localStorage.setItem('successAction', action);
            window.location.href = '/success';

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });

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
});
