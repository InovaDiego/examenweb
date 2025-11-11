document.addEventListener('DOMContentLoaded', () => {
    console.log('FORTALESIA SCRIPT: Lógica JS inicializada y lista para sincronización.');

    const video = document.getElementById('video-fondo');
    const contenido = document.getElementById('contenido-principal');
    const paginaActualSpan = document.getElementById('pagina-actual');
    
    // Total de secciones/páginas definidas por la altura CSS (4 secciones de 100vh)
    const totalPaginas = 4; 
    
    if (!video || !contenido || !paginaActualSpan) {
        console.error('ERROR JS: No se encontraron los elementos críticos (video, contenido o paginación). Verifica los IDs.');
        return; 
    }

    // FUNCIÓN PRINCIPAL: Sincroniza Scroll, Video y Paginación
    function syncAllToScroll() {
        
        // 1. CÁLCULO DEL PORCENTAJE DE SCROLL
        const scrollableHeight = contenido.offsetHeight - window.innerHeight;
        if (scrollableHeight <= 0) return; 

        const scrolled = window.scrollY;
        let scrollPercentage = scrolled / scrollableHeight;
        scrollPercentage = Math.min(1, Math.max(0, scrollPercentage));
        
        
        // 2. SINCRONIZACIÓN DEL VIDEO (Reproducción en base al scroll del mouse)
        // Usamos isFinite() para evitar el error 'non-finite'
        if (video.duration && isFinite(video.duration)) {
            video.currentTime = video.duration * scrollPercentage;
        }

        
        // 3. SINCRONIZACIÓN DE LA PAGINACIÓN
        const pageIndex = Math.ceil(scrollPercentage * totalPaginas);
        const paginaActual = Math.max(1, pageIndex); 
        paginaActualSpan.textContent = paginaActual;
    }

    // MANEJO DE EVENTOS (Activación)
    
    // 🟢 CORRECCIÓN: Nombramos la función (handleCanPlay) para evitar el error 'arguments is not defined'
    const handleCanPlay = () => {
        
        // El video debe estar en modo play() (incluso muted) para que currentTime funcione
        video.play().catch(error => {
            console.warn("Advertencia: No se pudo iniciar la reproducción automática. El scroll lo controlará.");
        });
        
        syncAllToScroll(); 
        
        // Usamos el nombre de la función (handleCanPlay) para quitar el listener
        video.removeEventListener('canplay', handleCanPlay);
    };

    // Adjuntamos el listener con la función nombrada
    video.addEventListener('canplay', handleCanPlay);
    
    // Escucha el evento de scroll y lo optimiza con requestAnimationFrame
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(syncAllToScroll);
    });

    // Carga inicial: Si el video ya tiene duración al inicio, se sincroniza. 
    // Si no, forzamos la carga para activar 'canplay'.
    if (video.duration && isFinite(video.duration)) {
        syncAllToScroll();
    } else {
        video.load(); 
    }
});