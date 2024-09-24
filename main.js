// Importación de módulos
import fs from 'fs';

// Importación de funciones de análisis léxico
import { esOperadorAritmetico, esOperadorRelacional, esPalabraReservada, esPuntuacion, esTipoDato } from './analizadorFunciones.js';

// Importación de autómatas
import { automata_asignacion } from './automatas/automata_asignacion.js';
import { automata_identificadores } from './automatas/automata_identificadores.js';
import { automata_reales, automata_enteros } from './automatas/automata_numeros.js';

// Lectura del archivo pascal.txt
fs.readFile("validador.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  // Separar el texto por espacios, saltos de línea y tabulaciones, manteniendo los delimitadores
  const regex = /(\b\w+\b|[^\s])/g;
  const text_separado = data.match(regex);

  if (text_separado) {
    analizar(text_separado);
  } else {
    console.error("No se encontraron tokens en el archivo.");
  }
});

// Función de análisis léxico
function analizar(contenido) {
  let hayErrorLexico = false;

  contenido.forEach(token => {
    // Verificar si es una palabra reservada
    if (esPalabraReservada(token)) {
      console.log(token, "        --> Es una palabra reservada");
    }
    // Verificar si es un tipo de dato
    else if (esTipoDato(token)) {
      console.log(token, "        --> Es un tipo de dato");
    }
    // Verificar si es un operador aritmético
    else if (esOperadorAritmetico(token)) {
      console.log(token, "        --> Es un operador aritmético");
    }
    // Verificar si es un operador relacional
    else if (esOperadorRelacional(token)) {
      console.log(token, "        --> Es un operador relacional");
    }
    // Verificar si es un signo de puntuación
    else if (esPuntuacion(token)) {
      console.log(token, "        --> Es un signo de puntuación");
    }
    // Verificar si es un paréntesis
    else if (token === ")" || token === "(") {
      console.log(token, "        --> Es un paréntesis");
    }
    // Verificar si es un corchete
    else if (token === "]" || token === "[") {
      console.log(token, "        --> Es un corchete");
    }
    // Verificar si es un signo de '
    else if (token === "'") {
      console.log(token, "        --> Es un signo de apostrofe");
    }
    // Verificar si es un número real mediante autómata
    else if (automata_reales(token)) {
      console.log(token, "        --> Es un número real");
    }
    // Verificar si es un número entero mediante autómata
    else if (automata_enteros(token)) {
      console.log(token, "        --> Es un número entero");
    }
    // Verificar si es una asignación mediante autómata
    else if (automata_asignacion(token)) {
      console.log(token, "        --> Es una asignación");
    }
    // Verificar si es un identificador mediante autómata
    else if (automata_identificadores(token)) {
      console.log(token, "        --> Es un identificador");
    }
    // Si no coincide con ningún patrón, se considera un error léxico
    else {
      console.log("ERROR LÉXICO ----->", token);
      hayErrorLexico = true;
    }
  });

  // Verificar si no hubo errores léxicos
  if (!hayErrorLexico) {
    console.log("EL CÓDIGO ES VÁLIDO");
  }
}
