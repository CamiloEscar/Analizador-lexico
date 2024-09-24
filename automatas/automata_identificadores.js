import {numeros, ABCMayuscula, ABCMinuscula} from './utilidades.js';

export const automata_identificadores = (identificador) => {
    const numero = numeros();
    const LetrasMinusculas = ABCMinuscula();
    const LetrasMayusculas = ABCMayuscula();

    let estado_actual = "A";
    const estados = ["A","B","M"];  // M --> ESTADO MUERTO
    const estado_final = "B";
    const estado_inicial = "A";
    const alfabetoentrada = [numero, LetrasMayusculas, LetrasMinusculas, "_"];

    const tamano_identificador = identificador.length;
    let cadena_aceptada = false;

    for (let i = 0; i < tamano_identificador; i++) {
        let iden = identificador[i];

        switch(estado_actual) {
            case "A":
                if (LetrasMayusculas.includes(iden) || LetrasMinusculas.includes(iden) || iden === "_") {
                    estado_actual = "B";
                } else {
                    estado_actual = "M";
                }
                break;
            case "B":
                if (LetrasMayusculas.includes(iden) || LetrasMinusculas.includes(iden) || numero.includes(iden) || iden === "_") {
                    estado_actual = "B";
                } else {
                    estado_actual = "M";
                }
                break;
            case "M":
                return false;
        }
    }

    return estado_actual === estado_final;
};