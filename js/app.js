import { Juego } from './juego.js';
import { RedManager } from './red.js';

class App {
    constructor() {
        this.juego = new Juego();
        this.red = new RedManager();
        this.miId = "";
        this.init();
    }

    init() {
        // 1. Mostrar ID y preparar copiado rápido
        this.red.addEventListener('conectado', (e) => {
            this.miId = e.detail;
            const display = document.getElementById('mi-id-display');
            display.innerHTML = `Tu ID: <code>${this.miId}</code> <button id="btn-copiar">Copiar</button>`;
            
            document.getElementById('btn-copiar').addEventListener('click', () => {
                navigator.clipboard.writeText(this.miId);
                const btn = document.getElementById('btn-copiar');
                btn.innerText = "¡Copiado!";
                setTimeout(() => btn.innerText = "Copiar", 2000);
            });
        });

        // 2. Conectar eventos del juego
        this.red.addEventListener('evento_recibido', (e) => {
            const { accion, payload } = e.detail;
            if (accion === 'JUGADA') this.juego.resolverRonda(payload.stat, payload.valor);
        });

        // 3. Botones UI
        document.getElementById('btn-conectar').addEventListener('click', () => {
            const idRival = document.getElementById('peer-id-input').value.trim();
            if(idRival) {
                this.red.conectarConRival(idRival);
            } else {
                alert("Por favor, ingresa el ID de tu rival.");
            }
        });

        document.getElementById('btn-iniciar').addEventListener('click', () => {
            this.juego.iniciar();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});