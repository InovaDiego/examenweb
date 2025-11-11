// js/deseo.js

// 1. SIMULACIÓN DE LA BASE DE DATOS (Arreglo JSON)
const listaRegalosDB = [
    // 🟢 PRUEBA FINAL: Añadimos una barra diagonal inicial (/)
    { id: 1, deseo: "Camiseta del clan Uchiha", checked: false, imagen: "/IMAGENES/camisetauchiha.webp" },
    
    // 🟢 PRUEBA FINAL
    { id: 2, deseo: "Réplica de la katana Kusanagi", checked: false, imagen: "/IMAGENES/katana.jpg" },
    
    // 🟢 PRUEBA FINAL
    { id: 3, deseo: "Figura de Sasuke Rinnegan", checked: false, imagen: "/IMAGENES/figurarinegan.jpg" },
    
    // 🟢 PRUEBA FINAL
    { id: 4, deseo: "Sharingan de Itachi (Collar)", checked: false, imagen: "/IMAGENES/collaruchiha.webp" },
    
    // 🟢 PRUEBA FINAL
    { id: 5, deseo: "Set de Kunai y Shuriken", checked: false, imagen: "/IMAGENES/setkunai.webp" }
];

// Nombres para las áreas HTML
const deseoArea = document.getElementById('deseo-area');
const imagenesRegaloArea = document.getElementById('imagenes-regalo-area');

// 2. FUNCIÓN PARA CARGAR LA DB Y EL ESTADO DE LOS CHECKBOXES
function cargarDB() {
    // Intentar cargar el estado guardado en localStorage
    const savedState = localStorage.getItem('listaRegalosDB');
    let listaActual = listaRegalosDB;

    if (savedState) {
        // Si hay un estado guardado, úsalo
        listaActual = JSON.parse(savedState);
    }
    
    dibujarLista(listaActual);
}

// 3. FUNCIÓN PARA DIBUJAR LA INTERFAZ HTML
function dibujarLista(lista) {
    deseoArea.innerHTML = '';
    imagenesRegaloArea.innerHTML = '';

    lista.forEach(item => {
        // Crear elemento para el Deseo (Izquierda)
        const deseoItem = document.createElement('div');
        deseoItem.className = 'deseo-item';
        deseoItem.innerHTML = `
            <input type="checkbox" id="deseo-${item.id}" data-id="${item.id}" ${item.checked ? 'checked' : ''}>
            <label for="deseo-${item.id}">${item.deseo}</label>
        `;
        deseoArea.appendChild(deseoItem);

        // Crear elemento para la Imagen (Derecha)
        const imagenItem = document.createElement('div');
        imagenItem.className = 'imagen-item';
        imagenItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.deseo}" title="${item.deseo}">
        `;
        imagenesRegaloArea.appendChild(imagenItem);
    });

    // Agregar evento a los checkboxes
    deseoArea.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', manejarCambioCheckbox);
    });
}

// 4. FUNCIÓN PARA GUARDAR EL ESTADO (LocalStorage)
function manejarCambioCheckbox(event) {
    const id = parseInt(event.target.dataset.id);
    const isChecked = event.target.checked;
    
    // Obtener la lista actual (ya sea la default o la guardada)
    const savedState = localStorage.getItem('listaRegalosDB');
    let listaActual = savedState ? JSON.parse(savedState) : listaRegalosDB;

    // Encontrar y actualizar el estado del elemento
    const itemIndex = listaActual.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        listaActual[itemIndex].checked = isChecked;
    }

    // Guardar el estado actualizado en localStorage
    localStorage.setItem('listaRegalosDB', JSON.stringify(listaActual));
    
    // Opcional: Recargar la lista para actualizar los estilos visuales (si los hubiera)
    // dibujarLista(listaActual); 
}


// Ejecutar la carga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarDB);