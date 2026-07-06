import { Mazo } from './mazo.js';
import { RenderManager } from './render.js';

export class Juego {
    constructor() {
        this.estado = 'ESPERANDO';
        this.mazo = new Mazo();
        this.miMano = [];
    }

    iniciar() {
        this.mazo.inicializar();
        this.mazo.barajar();
        this.miMano = this.mazo.repartir(2)[0];
        this.estado = 'SELECCIONANDO_STAT';
        this.actualizarUI();
    }

    procesarSeleccion(statKey) {
        if (this.estado !== 'SELECCIONANDO_STAT') return;
        const valor = this.miMano[0].getStat(statKey);
        this.enviarJugadaAlRival(statKey, valor); // Inyectado por app.js
    }

    resolverRonda(statKey, valorRival) {
        this.estado = 'SELECCIONANDO_STAT';
        this.miMano.shift();
        this.actualizarUI();
    }

    actualizarUI() {
        const board = document.getElementById('game-board');
        board.innerHTML = '';
        if (this.miMano.length > 0) {
            const el = RenderManager.crearElementoCarta(this.miMano[0]);
            el.querySelectorAll('.stat-item').forEach(btn => {
                btn.onclick = () => this.procesarSeleccion(btn.dataset.stat);
            });
            board.appendChild(el);
        }
    }
}