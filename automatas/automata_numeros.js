import { numeros } from './utilidades.js';

const automata_numeros = (numero, esReal = false) => {
  const digitos = numeros();
  const punto = ".";
  let estado_actual = "A";
  const estados = ["A", "B", "C", "D", "E", "M"];
  const estado_final_entero = "B";
  const estados_finales_real = new Set(["D", "E"]);
  const estado_inicial = "A";
  const tamano_numero = numero.length;

  for (let i = 0; i < tamano_numero; i++) {
    const char = numero[i];

    switch(estado_actual) {
      case "A": // Estado inicial
        if (digitos.includes(char)) estado_actual = "B";
        else if (char === punto) estado_actual = "C";
        else estado_actual = "M";
        break;
      case "B": // Dígitos antes del punto
        if (digitos.includes(char)) estado_actual = "B";
        else if (esReal && char === punto) estado_actual = "C";
        else estado_actual = "M";
        break;
      case "C": // Punto
        if (digitos.includes(char)) estado_actual = "D";
        else estado_actual = "M";
        break;
      case "D": // Primer dígito después del punto
        if (digitos.includes(char)) estado_actual = "E";
        else estado_actual = "M";
        break;
      case "E": // Dígitos después del punto
        if (digitos.includes(char)) estado_actual = "E";
        else estado_actual = "M";
        break;
      case "M": // Estado muerto
        return false;
    }
  }

  // Verificación final
  if (!esReal && estado_actual === estado_final_entero) {
    return true; // Número entero válido
  } else if (esReal && estados_finales_real.has(estado_actual)) {
    return true; // Número real válido
  }

  return false; // No es un número válido
};

export const automata_reales = (real) => automata_numeros(real, true);
export const automata_enteros = (entero) => automata_numeros(entero, false);