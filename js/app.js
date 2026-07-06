import { Juego } from './juego.js';
import { RedManager } from './red.js';

class App {
    constructor() {
        this.juego = new Juego();
        this.red = new RedManager();
        this.init();
    }

    init() {
        // Conexión Red -> Juego
        this.red.addEventListener('evento_recibido', (e) => {
            if (e.detail.accion === 'JUGADA') this.juego.resolverRonda(e.detail.payload.stat, e.detail.payload.valor);
        });

        // Inicio automático al conectar
        this.red.addEventListener('rival_conectado', () => this.juego.iniciar());

        // Conexión Juego -> Red
        this.juego.enviarJugadaAlRival = (stat, valor) => this.red.enviar('JUGADA', { stat, valor });
    }
}
window.app = new App();