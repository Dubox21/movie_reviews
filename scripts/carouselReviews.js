document.addEventListener('DOMContentLoaded', function () {
    loadCarousel();
});

function loadCarousel() {
    fetch('../Templates/carouselReviews.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('carouselContainer_reviews').innerHTML = data;
            initCarousel();
        })
        .catch(error => console.error('Error al cargar el carrusel:', error));
}

function initCarousel() {
    $(document).ready(function() {
        $('#carouselExample').on('slide.bs.carousel', function (e) {
          var $e = $(e.relatedTarget);
          var idx = $e.index();
          var itemsPerSlide = 3;
          var totalItems = $('.carousel-item').length;
      
          if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
              if (e.direction == 'left') {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
              }
              else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
              }
            }
          }
        });
      });
}

