document.addEventListener('DOMContentLoaded', () => loadRecetasByCategory('postres'));

function loadRecetasByCategory(category) {
    fetch('data/recetas.json')
        .then(response => response.json())
        .then(recetas => {
            const recetasFiltradas = recetas.filter(receta => receta.categoria === category);
            displayRecetas(recetasFiltradas);
        });
}

function displayRecetas(recetas) {
    const container = document.getElementById('recetas-container');
    container.innerHTML = '';

    recetas.forEach(receta => {
        const recetaDiv = document.createElement('div');
        recetaDiv.className = 'receta-card';
        recetaDiv.innerHTML = `
            <div class="side-image left"></div> <!-- Imagen decorativa izquierda -->
            <div class="side-image right"></div> <!-- Imagen decorativa derecha -->
            <img src="${receta.imagen}" alt="${receta.nombre}" class="img-fluid" style="width:100%; height: 300px; object-fit: cover; border-radius: 10px;">
            <h3 class="mt-3">${receta.nombre}</h3>
            <p>${receta.descripcion}</p>
            <button class="btn btn-primary" onclick="toggleRecipeDetails('${receta.id}')">Ver Detalles</button>
            <div id="receta-detalle-${receta.id}" class="receta-detalle mt-3" style="display: none;">
                <h4>Ingredientes</h4>
                <ul>${receta.ingredientes.map(ing => `<li>${ing}</li>`).join('')}</ul>
                <h4>Pasos</h4>
                <ol>${receta.pasos.map(paso => `<li>${paso}</li>`).join('')}</ol>
            </div>
        `;
        container.appendChild(recetaDiv);
    });
}



function toggleRecipeDetails(id) {
    const detalleDiv = document.getElementById(`receta-detalle-${id}`);
    const recetaCard = detalleDiv.parentElement;

    if (detalleDiv.style.display === 'none') {
        detalleDiv.style.display = 'block';
        recetaCard.classList.add('opened'); // Añadir clase para expandir imágenes
    } else {
        detalleDiv.style.display = 'none';
        recetaCard.classList.remove('opened'); // Remover clase para cerrar imágenes
    }
}
