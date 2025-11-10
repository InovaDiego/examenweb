document.addEventListener('DOMContentLoaded', () => {
    
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');

    const totalPages = pages.length; // 7 páginas
    let currentPage = 1;

    // Función que actualiza la clase 'flipped' para girar la página
    function turnPage(pageIndex, flip) {
        // El índice en JavaScript va de 0 a 6, pero la página va de 1 a 7
        const pageElement = pages[pageIndex - 1]; 
        if (pageElement) {
            pageElement.classList.toggle('flipped', flip);
        }
    }

    // Función que actualiza la paginación y el estado de los botones
    function updateControls() {
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        
        // Deshabilitar botón 'Anterior' en la primera página
        prevBtn.disabled = currentPage === 1; 
        
        // Deshabilitar botón 'Siguiente' en la última página
        nextBtn.disabled = currentPage === totalPages; 
    }

    // --- Manejadores de Eventos ---

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            // Girar la página actual (hacia el lado izquierdo)
            turnPage(currentPage, true); 
            currentPage++;
            updateControls();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            // La página que se gira es la anterior a la actual
            currentPage--;
            turnPage(currentPage, false); // Desgirar la página
            updateControls();
        }
    });

    // Inicialización al cargar
    updateControls();
    console.log(`Flipbook: ${totalPages} páginas inicializadas.`);
    
});




