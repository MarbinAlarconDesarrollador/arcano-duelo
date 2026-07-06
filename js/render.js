/**
 * Módulo de Renderizado
 * Responsabilidad: Generar el HTML de las cartas basándose en la clase Carta.
 */

export const RenderManager = {
    crearElementoCarta(carta) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-rareza', carta.rareza);
        
        cardDiv.innerHTML = `
            <h3 class="nombre">${carta.nombre}</h3>
            <img src="${carta.imagen}" class="card-img" alt="${carta.nombre}">
            <p class="categoria">${carta.categoria}</p>
            <div class="stats-container">
                ${Object.entries(carta.stats).map(([key, val]) => `
                    <div class="stat-item">
                        <span>${this.getIcono(key)}</span> ${val}
                    </div>
                `).join('')}
            </div>
        `;
        return cardDiv;
    },

    getIcono(stat) {
        const iconos = { vida: '❤️', ataque: '⚔️', defensa: '🛡️', velocidad: '⚡', 
                         magia: '✨', inteligencia: '🧠', resistencia: '💪', poder: '🔥' };
        return iconos[stat] || '⭐';
    }
};