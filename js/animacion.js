document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // LÓGICA DE ANIMACIÓN: Carrusel de Bootstrap
    // ----------------------------------------------------
    
    // Captura el elemento del carrusel por su ID
    const carrusel = document.getElementById('carrusel-contenedor');
    
    if (carrusel) {
        // Inicializa el carrusel de Bootstrap
        // El requisito es que tenga reproducción automática (intervalo).
        const bsCarousel = new bootstrap.Carousel(carrusel, {
            interval: 2000, // Cambia la imagen cada 2 segundos (2000ms)
            pause: 'hover', // Se detiene al pasar el mouse (buena práctica de UX)
            wrap: true      // Continúa el ciclo después de la última imagen
        });
        console.log('Animación JS: Carrusel iniciado en modo automático.');
    }
});