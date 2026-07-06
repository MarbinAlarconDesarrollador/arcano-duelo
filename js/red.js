/**
 * Módulo de Red (PeerJS Wrapper)
 * Responsabilidad: Gestión de conexiones P2P y comunicación de eventos.
 */
export class RedManager extends EventTarget {
    constructor() {
        super();
        // Configuración robusta para producción en GitHub Pages
        this.peer = new Peer(undefined, {
            host: '0.peerjs.com',
            port: 443,
            secure: true,
            path: '/',
            debug: 1
        });
        this.conn = null;
        this.init();
    }

    init() {
        this.peer.on('open', (id) => {
            console.log('Peer ID recibido:', id);
            this.dispatchEvent(new CustomEvent('conectado', { detail: id }));
        });

        this.peer.on('connection', (c) => {
            this.conn = c;
            this.setupListeners();
            this.dispatchEvent(new CustomEvent('rival_conectado'));
        });

        this.peer.on('error', (err) => {
            console.error('Error de PeerJS:', err);
        });
    }

    conectarConRival(idRival) {
        this.conn = this.peer.connect(idRival);
        this.setupListeners();
    }

    setupListeners() {
        if (!this.conn) return;
        this.conn.on('open', () => console.log('Conexión P2P establecida'));
        this.conn.on('data', (data) => {
            this.dispatchEvent(new CustomEvent('evento_recibido', { detail: data }));
        });
    }

    enviar(accion, payload = {}) {
        if (this.conn && this.conn.open) {
            this.conn.send({ accion, payload });
        }
    }
}