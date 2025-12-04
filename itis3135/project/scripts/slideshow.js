$(document).ready(function () {
    let currentSlide = 0;
    const slides = $('#slideshow img');
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        setInterval(function () {
            slides.eq(currentSlide).removeClass('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides.eq(currentSlide).addClass('active');
        }, 5000); // Change slide every 5 seconds
    }
});
