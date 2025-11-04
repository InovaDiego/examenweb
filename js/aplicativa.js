document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // INICIALIZACIÓN Y CONFIGURACIÓN
    // ----------------------------------------------------
    console.log('FORTALESIA SCRIPT: Lógica JS inicializada y lista para sincronización.');

    // Declaración de variables: Se capturan los elementos clave del DOM por su ID
    const video = document.getElementById('video-fondo');
    const contenido = document.getElementById('contenido-principal');
    const paginaActualSpan = document.getElementById('pagina-actual');
    
    // Total de secciones/páginas definidas por la altura CSS (4 secciones de 100vh)
    const totalPaginas = 4; 
    
    // Verificación de errores: Asegura que todos los elementos existan antes de continuar
    if (!video || !contenido || !paginaActualSpan) {
        console.error('ERROR JS: No se encontraron los elementos críticos (video, contenido o paginación). Verifica los IDs.');
        return; 
    }

    // ----------------------------------------------------
    // FUNCIÓN PRINCIPAL: Sincroniza Scroll, Video y Paginación
    // ----------------------------------------------------
    function syncAllToScroll() {
        
        // 1. CÁLCULO DEL PORCENTAJE DE SCROLL (DE 0.0 A 1.0)
        
        // Calcula la altura total que el usuario PUEDE desplazar
        const scrollableHeight = contenido.offsetHeight - window.innerHeight;
        if (scrollableHeight <= 0) return; // Si no hay scroll, se detiene
        
        const scrolled = window.scrollY; // Posición vertical actual del scroll
        
        // Calcula el porcentaje de scroll (posición actual / altura total)
        let scrollPercentage = scrolled / scrollableHeight;
        
        // Asegura que el valor esté siempre entre 0 y 1 (Clamp)
        scrollPercentage = Math.min(1, Math.max(0, scrollPercentage));
        
        
        // 2. SINCRONIZACIÓN DEL VIDEO
        // Requisito: Reproducción en base al scroll del mouse
        if (video.duration) {
            // Establece el tiempo de reproducción (currentTime)
            // Se multiplica la duración total por el porcentaje de scroll
            video.currentTime = video.duration * scrollPercentage;
        }

        
        // 3. SINCRONIZACIÓN DE LA PAGINACIÓN
        // Divide el porcentaje total (0 a 1) en las 4 secciones/páginas
        const pageIndex = Math.ceil(scrollPercentage * totalPaginas);
        
        // El número de página siempre será al menos 1
        const paginaActual = Math.max(1, pageIndex); 
        
        // Actualiza el texto de la paginación fija en la parte inferior
        paginaActualSpan.textContent = paginaActual;
    }

    // ----------------------------------------------------
    // MANEJO DE EVENTOS (Activación)
    // ----------------------------------------------------

    // Evento para asegurar que los metadatos del video estén cargados (duración, etc.)
    video.addEventListener('loadedmetadata', () => {
        // Intenta iniciar la reproducción silenciosa (requisito para manipular currentTime)
        video.play().catch(error => {
            console.warn("Advertencia: No se pudo iniciar la reproducción automática. El scroll lo controlará.");
        });
        syncAllToScroll(); // Sincroniza el video al cargar
    });
    
    // Escucha el evento de scroll
    window.addEventListener('scroll', () => {
        // Utiliza requestAnimationFrame para optimizar el rendimiento y evitar tirones (jank)
        window.requestAnimationFrame(syncAllToScroll);
    });

    // Sincroniza al cargar por si hay un scroll inicial o el video no cargó metadatos aún
    syncAllToScroll();
});