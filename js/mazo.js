/**
 * Módulo de Mazo
 * Responsabilidad: Gestión de colecciones de cartas (barajar, repartir, eliminar).
 */
import { PERSONAJES_MAP } from './personajes.js';
import { Carta } from './carta.js';

export class Mazo {
    constructor() {
        this.cartas = []; // Stack de instancias de Carta
    }

    /**
     * Inicializa el mazo con todos los personajes disponibles.
     */
    inicializar() {
        this.cartas = Array.from(PERSONAJES_MAP.values()).map(data => new Carta(data));
    }

    /**
     * Algoritmo de Fisher-Yates para barajar de forma equitativa.
     */
    barajar() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    /**
     * Reparte cartas equitativamente entre los jugadores.
     * @param {number} numJugadores 
     */
    repartir(numJugadores = 2) {
        const manos = Array.from({ length: numJugadores }, () => []);
        let jugadorActual = 0;

        while (this.cartas.length > 0) {
            manos[jugadorActual].push(this.cartas.pop());
            jugadorActual = (jugadorActual + 1) % numJugadores;
        }
        return manos;
    }

    obtenerCartaSuperior() {
        return this.cartas.length > 0 ? this.cartas[0] : null;
    }

    eliminarCarta(id) {
        this.cartas = this.cartas.filter(carta => carta.id !== id);
    }

    resetear() {
        this.inicializar();
        this.barajar();
    }
}