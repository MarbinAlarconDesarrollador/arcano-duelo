// js/personajes.js
export const PERSONAJES = [

    {

        id: 1,

        nombre: "Dragón Cósmico",

        imagen: "img/personajes/p1.png",

        descripcion: "Protector del planeta Helios.",

        categoria: "Dragón",

        rareza: "Legendario",

        stats: {

            vida: 92,
            ataque: 88,
            defensa: 74,
            velocidad: 61,
            magia: 99,
            inteligencia: 55,
            resistencia: 90,
            poder: 97

        }

    },

    {

        id: 2,

        nombre: "Robot Destructor",

        imagen: "img/personajes/p2.png",

        descripcion: "Construido para conquistar galaxias.",

        categoria: "Robot",

        rareza: "Épico",

        stats: {

            vida: 84,
            ataque: 95,
            defensa: 90,
            velocidad: 38,
            magia: 5,
            inteligencia: 76,
            resistencia: 93,
            poder: 89

        }

    }


]; // Tus datos
export const PERSONAJES_MAP = new Map(PERSONAJES.map(p => [p.id, p]));