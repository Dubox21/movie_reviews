        const movieForm = document.getElementById('movieForm');
        const addMovieOption = document.getElementById('addMovieOption');
        const editMovieOption = document.getElementById('editMovieOption');
        const submitBtn = document.getElementById('submitBtn');
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');
        const ratingInput = document.getElementById('rating');
        const movieIdInput = document.getElementById('movieId');
        const formHeading = document.getElementById('formHeading');

        // Evento para opción de Agregar Película
        addMovieOption.addEventListener('click', function(event) {
            event.preventDefault();
            movieForm.style.display = 'block';
            submitBtn.textContent = 'Agregar Película';
            formHeading.textContent = 'Agregar Película';
            movieIdInput.value = ''; // Limpiar el ID de la película
        });

        // Evento para opción de Modificar Película
        editMovieOption.addEventListener('click', function(event) {
            event.preventDefault();
            movieForm.style.display = 'block';
            submitBtn.textContent = 'Modificar Película';
            formHeading.textContent = 'Modificar Película';

            // Aquí podrías cargar datos previos de la película a modificar si es necesario
            const movieId = prompt('Ingrese el ID de la película a modificar:');
            if (movieId) {
                // Simulación de carga de datos de la película
                titleInput.value = 'Título de la película cargado';
                descriptionInput.value = 'Descripción de la película cargada';
                ratingInput.value = 8;
                movieIdInput.value = movieId;
            }
        });

        // Manejador de eventos para enviar el formulario
        movieForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(movieForm);
            const movieData = {};
            formData.forEach((value, key) => {
                movieData[key] = value;
            });

            const endpoint = movieIdInput.value ? `/api/movies/${movieIdInput.value}` : '/api/movies';
            const method = movieIdInput.value ? 'PUT' : 'POST';

            fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            })
            .then(response => {
                if (response.ok) {
                    alert(`Película ${movieIdInput.value ? 'modificada' : 'agregada'} exitosamente`);
                    window.location.reload(); // Actualizar la página después de la acción
                } else {
                    throw new Error('Error al guardar película');
                }
            })
            .catch(error => console.error('Error saving movie:', error));
        });
