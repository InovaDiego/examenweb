document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el carrusel de Bootstrap
    const carrusel = document.getElementById('carrusel-contenedor');
    if (carrusel) {
        // Inicializa el carrusel y lo configura para que cambie cada 5 segundos (5000ms)
        const bsCarousel = new bootstrap.Carousel(carrusel, {
            interval: 5000, 
            wrap: true // Para que siga dando vueltas
        });
        console.log('Animación JS: Carrusel iniciado automáticamente.');
    }
});