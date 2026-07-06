/**
 * Módulo de Renderizado
 * Responsabilidad: Generar el HTML de las cartas basándose en la clase Carta.
 */

export const RenderManager = {
    crearElementoCarta(carta) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.innerHTML = `
            <h3>${carta.nombre}</h3>
            <img src="${carta.imagen}" class="card-img">
            <div class="stats-container">
                ${Object.entries(carta.stats).map(([key, val]) => `
                    <button class="stat-item" data-stat="${key}">
                        ${key}: ${val}
                    </button>
                `).join('')}
            </div>
        `;
        return cardDiv;
    },

    getIcono(stat) {
        const iconos = {
            vida: '❤️', ataque: '⚔️', defensa: '🛡️', velocidad: '⚡',
            magia: '✨', inteligencia: '🧠', resistencia: '💪', poder: '🔥'
        };
        return iconos[stat] || '⭐';
    }
};