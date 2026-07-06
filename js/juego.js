/**
 * Módulo de Juego
 * Responsabilidad: Máquina de estados, lógica de turnos y orquestación.
 */
import { Mazo } from './mazo.js';
import { RenderManager } from './render.js';

export class Juego {
    constructor() {
        this.estado = 'INICIALIZANDO'; // Estados: ESPERANDO_TURNO, SELECCIONANDO_STAT, RESOLVIENDO
        this.mazo = new Mazo();
        this.miMano = [];
        this.cartaActual = null;
    }

    iniciar() {
        this.mazo.inicializar();
        this.mazo.barajar();
        this.manos = this.mazo.repartir(2);
        this.miMano = this.manos[0];
        this.actualizarUI();
    }

    // Lógica de comparación (Regla del juego)
    procesarSeleccion(statKey) {
        if (this.estado !== 'SELECCIONANDO_STAT') return;
        
        const valorPropio = this.cartaActual.getStat(statKey);
        // Notificar al rival vía RedManager (se implementará en red.js)
        this.enviarJugadaAlRival(statKey, valorPropio);
    }

    resolverRonda(statKey, valorRival) {
        const valorPropio = this.cartaActual.getStat(statKey);
        
        if (valorPropio > valorRival) {
            console.log("¡Ganaste la ronda!");
            // Mover cartas al fondo del mazo...
        } else {
            console.log("Perdiste la ronda.");
        }
        
        this.estado = 'ESPERANDO_TURNO';
        this.actualizarUI();
    }

    actualizarUI() {
        const contenedor = document.getElementById('game-board');
        contenedor.innerHTML = '';
        this.cartaActual = this.miMano[0];
        contenedor.appendChild(RenderManager.crearElementoCarta(this.cartaActual));
    }
}


