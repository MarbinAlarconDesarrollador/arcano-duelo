import { Juego } from './juego.js';
import { RedManager } from './red.js';

class App {
    constructor() {
        this.juego = new Juego();
        this.red = new RedManager();
        this.init();
    }

    init() {
        // Manejo del ID y copiado rápido
        this.red.addEventListener('conectado', (e) => {
            const display = document.getElementById('mi-id-display');
            display.innerHTML = `Tu ID: <code>${e.detail}</code> <button id="btn-copiar">Copiar</button>`;
            document.getElementById('btn-copiar').onclick = () => {
                navigator.clipboard.writeText(e.detail);
                const btn = document.getElementById('btn-copiar');
                btn.innerText = "¡Copiado!";
                setTimeout(() => btn.innerText = "Copiar", 2000);
            };
        });

        // Puente de comunicación Red -> Juego
        this.red.addEventListener('evento_recibido', (e) => {
            const { accion, payload } = e.detail;
            if (accion === 'JUGADA') this.juego.resolverRonda(payload.stat, payload.valor);
        });

        // Puente de comunicación Juego -> Red
        this.juego.enviarJugadaAlRival = (stat, valor) => {
            this.red.enviar('JUGADA', { stat, valor });
        };

        document.getElementById('btn-conectar').onclick = () => {
            const id = document.getElementById('peer-id-input').value.trim();
            if(id) this.red.conectarConRival(id);
        };
    }
}

document.addEventListener('DOMContentLoaded', () => window.app = new App());