/**
 * Módulo de Red (PeerJS Wrapper)
 * Responsabilidad: Gestión de conexiones P2P y comunicación de eventos.
 */
export class RedManager extends EventTarget {
    constructor() {
        super();
        // Configuración explícita para evitar bloqueos
        this.peer = new Peer(undefined, {
            host: '0.peerjs.com',
            port: 443,
            path: '/',
            secure: true,
             debug: 3 // Esto te dará más info en la consola
        });
        this.conn = null;
        this.init();
    }

    init() {
        this.peer.on('open', (id) => {
            console.log('Peer ID recibido:', id);
            this.dispatchEvent(new CustomEvent('conectado', { detail: id }));
        });

        // IMPORTANTE: Escuchar cuando alguien se conecta a ti
        this.peer.on('connection', (c) => {
            console.log('Rival conectado!');
            this.conn = c;
            this.setupListeners();
            this.dispatchEvent(new CustomEvent('rival_conectado'));
        });

        this.peer.on('error', (err) => {
            console.error('Error de PeerJS:', err);
        });
    }

    conectarConRival(idRival) {
        console.log('Intentando conectar con:', idRival);
        this.conn = this.peer.connect(idRival);
        this.setupListeners();
    }

    setupListeners() {
        if (!this.conn) return;

        // Listener cuando la conexión se abre
        this.conn.on('open', () => {
            console.log('Conexión P2P establecida con éxito');
        });

        // Listener de datos
        this.conn.on('data', (data) => {
            console.log('Evento recibido:', data);
            this.dispatchEvent(new CustomEvent('evento_recibido', { detail: data }));
        });
    }

    enviar(accion, payload = {}) {
        if (this.conn && this.conn.open) {
            this.conn.send({ accion, payload });
        } else {
            console.error('No hay conexión activa para enviar datos.');
        }
    }
}