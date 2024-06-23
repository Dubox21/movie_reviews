document.addEventListener('DOMContentLoaded', () => {
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

    // Manejo del formulario y validaciones
    const form = document.getElementById("movieForm");
    const inputs = form.querySelectorAll("input, textarea");
    const fileInputs = form.querySelectorAll("input[type='file']");

    // Función para validar un campo
    const validateInput = (input) => {
        if (input.value.trim() === '') {
            input.classList.remove("valid");
            input.classList.add("invalid");
            return false;
        } else {
            input.classList.remove("invalid");
            input.classList.add("valid");
            return true;
        }
    };

    // Evento para cada input y textarea
    inputs.forEach(input => {
        input.addEventListener("input", () => validateInput(input));
        input.addEventListener("blur", () => validateInput(input));
    });

    // Validación para los campos de archivos
    fileInputs.forEach(input => {
        input.addEventListener("change", () => validateInput(input));
    });

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
    document.getElementById("image").addEventListener("change", (e) => {
        handleImagePreview(e.target, document.getElementById("imagePreviewCover"));
    });

    // Vista previa para la imagen Banner
    document.getElementById("imageBanner").addEventListener("change", (e) => {
        handleImagePreview(e.target, document.getElementById("imagePreviewBanner"));
    });

    // Validar el formulario completo antes de enviarlo
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formIsValid = true;

        inputs.forEach(input => {
            validateInput(input);
            if (!input.checkValidity()) {
                formIsValid = false;
            }
        });

        fileInputs.forEach(input => {
            validateInput(input);
            if (!input.checkValidity()) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            form.submit();
        } else {
            alert("Por favor, completa todos los campos obligatorios correctamente.");
        }
    });
});
