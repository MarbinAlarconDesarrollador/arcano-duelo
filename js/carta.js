// js/carta.js
export class Carta {
    constructor(personajeData) {
        this.id = personajeData.id;
        this.nombre = personajeData.nombre;
        this.stats = personajeData.stats;
        this.rareza = personajeData.rareza;
        this.imagen = personajeData.imagen;
        this.categoria = personajeData.categoria;
        
    }
    
    getStat(statName) {
        return this.stats[statName];
    }
}