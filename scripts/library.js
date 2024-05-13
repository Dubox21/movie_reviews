// Mostrar el loader al principio
document.getElementById('loader').style.display = 'block';

// Ocultar el loader cuando la página haya cargado completamente
window.addEventListener('load', function () {
    document.getElementById('loader').style.display = 'none';
});

document.getElementById('btn-all').addEventListener('click', function () {
    const allMovies = document.getElementById('all-movies').offsetTop;

    // Desplazarse a la posición del elemento h3
    window.scrollTo({
        top: allMovies,
        behavior: "smooth" // Desplazamiento suave
    });
});

document.getElementById('btn-liked').addEventListener('click', function () {
    const topRated = document.getElementById('top-rated').offsetTop;

    // Desplazarse a la posición del elemento h3
    window.scrollTo({
        top: topRated,
        behavior: "smooth" // Desplazamiento suave
    });
});