import fs from 'fs';
import { esOperadorAritmetico, esOperadorRelacional, esPalabraReservada, esPuntuacion, esTipoDato } from './analizadorFunciones.js';
import { automata_asignacion } from './automatas/automata_asignacion.js';
import { automata_identificadores } from './automatas/automata_identificadores.js';
import { automata_reales, automata_enteros } from './automatas/automata_numeros.js';

// Expresión regular mejorada para tokenización
const regex = /(\s+|:=|<=|>=|<>|[+\-*/=<>]|[();:,]|\b\w+\b|\d+\.\d+|\d+\.?|\.\d+|'[^']*'|\{[^}]*\}|$$\*[\s\S]*?\*$$|#\w+)/g;

fs.readFile("validador2.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  const tokens = data.match(regex);

  if (tokens) {
    analizar(tokens);
  } else {
    console.error("No se encontraron tokens en el archivo.");
  }
});

function analizar(tokens) {
  let hayErrorLexico = false;
  let esUltimoToken = false;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim();
    
    if (token === '') continue;

    esUltimoToken = (i === tokens.length - 1);

    if (token.startsWith('#')) {
      console.log("ERROR LÉXICO ----->", token, "No se permite # en Pascal");
      hayErrorLexico = true;
    } else if (esPalabraReservada(token)) {
      console.log(token, "        --> Es una palabra reservada");
    } else if (/^\d/.test(token) && automata_identificadores(token)) {
      console.log("ERROR LÉXICO ----->", token, "No se permite número como nombre de función");
      hayErrorLexico = true;
    } else if (esPuntuacion(token)) {
      if (esUltimoToken && token === '.') {
        console.log("ERROR LÉXICO ----->", token, "No puede terminar con .");
        hayErrorLexico = true;
      } else {
        console.log(token, "        --> Es un signo de puntuación");
      }
    } else if (esTipoDato(token)) {
      console.log(token, "        --> Es un tipo de dato");
    } else if (automata_asignacion(token)) {
      console.log(token, "        --> Es un operador de asignación");
    } else if (automata_identificadores(token)) {
      console.log(token, "        --> Es un identificador");
    } else if (esNumeroRealOEntero(token)) {
      // La función esNumeroRealOEntero se encargará de imprimir el tipo correcto
    } else if (esOperadorAritmetico(token)) {
      console.log(token, "        --> Es un operador aritmético");
    } else if (esOperadorRelacional(token)) {
      console.log(token, "        --> Es un operador relacional");
    } else {
      console.log("ERROR LÉXICO ----->", token);
      hayErrorLexico = true;
    }
  }

  if (!hayErrorLexico) {
    console.log("EL CODIGO ES VALIDO");
  } else {
    console.log("SE ENCONTRARON ERRORES LÉXICOS EN EL CÓDIGO");
  }
}

function esNumeroRealOEntero(token) {
  if (automata_reales(token)) {
    console.log(token, "        --> Es un número real");
    return true;
  } else if (automata_enteros(token)) {
    console.log(token, "        --> Es un número entero");
    return true;
  } else if (/^\d+\.$/.test(token) || /^\d+\..*[eE]/.test(token)) {
    console.log("ERROR LÉXICO ----->", token, "Número no válido");
    return false;
  }
  return false;
}