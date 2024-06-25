document.addEventListener('DOMContentLoaded', () => {

    //funcion para cargar los generos de peliculas desde la bd
    async function loadGenres() {
        try {
            const response = await fetch('/api/genres');
            const genres = await response.json();
            const genreSelect = document.getElementById('genre_id');

            genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar los géneros:', error);
        }
    }

    loadGenres();

    //funcion para cargar los paises de las peliculas desde la bd
    async function loadCountry() {
        try {
            const response = await fetch('/api/countries');
            const country = await response.json();
            const countrySelect = document.getElementById('country_id');

            country.forEach(country => {
                const option = document.createElement('option');
                option.value = country.id;
                option.textContent = country.country;
                countrySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar los paises:', error);
        }
    }

    loadCountry();

    // Mostrar la vista previa de la imagen seleccionada
    const handleImagePreview = (input, previewElement) => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewElement.innerHTML = `<img src="${e.target.result}" alt="Vista previa de la imagen">`;
            };
            reader.readAsDataURL(file);
        } else {
            previewElement.innerHTML = "<span>Vista previa de la imagen</span>";
        }
    };

    // Vista previa para la imagen Cover
    document.getElementById("imageCover").addEventListener("change", (e) => {
        handleImagePreview(e.target, document.getElementById("imagePreviewCover"));
    });

    // Vista previa para la imagen Banner
    document.getElementById("imageBanner").addEventListener("change", (e) => {
        handleImagePreview(e.target, document.getElementById("imagePreviewBanner"));
    });

})