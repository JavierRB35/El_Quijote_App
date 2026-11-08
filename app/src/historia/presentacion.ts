// Transformación de PRESENTACIÓN para el Modo Historia (solo lectura):
// convierte los saltos mecánicos de maquetación del txt de PG #2000 en
// espacios, preservando los saltos con valor literario — párrafos (\n\n),
// parlamentos (línea que empieza por «—») y versos/estrofas (bloques de
// líneas cortas sin corte mecánico). Espejo de presentación de
// tools/editorial_validation/estructura_texto.py (PR #59): mismas reglas y
// mismos umbrales, medidos sobre el fichero fuente.
//
// INVARIANTE: las PALABRAS y SIGNOS de texto_visible no se alteran NUNCA;
// solo cambia el whitespace interior. El dato (texto_visible, texto_oral,
// hashes, offsets) permanece intacto; esta transformación es de pantalla.
// Idempotente: sobre un texto ya presentado no cambia nada.

// Ancho del envoltorio mecánico de PG #2000: un corte es de maquetación solo
// si la primera palabra de la línea siguiente NO cabía (holgura >= 76).
const ANCHO_LINEA = 76;
// Línea «corta» (podría ser verso). La prosa envuelta de PG siempre supera
// este ancho en alguna línea de cada párrafo; un bloque de verso, no.
const UMBRAL_VERSO = 60;

const PAR = "\n\n"; // párrafo / título / cambio de bloque
const VERSO = "\n"; // salto de verso dentro de una estrofa

function palabrasDe(linea: string): string {
  const m = /\S+/.exec(linea);
  return m ? m[0] : "";
}

/** Cortes semánticos de un párrafo completo → separador tras líneas[i].
 *  El resultado[i] es el separador entre líneas[i] y líneas[i+1]; " " = unir. */
function clasificarParrafo(lineas: string[]): string[] {
  if (lineas.length < 2) return [];
  const candidatos: string[] = new Array(lineas.length - 1).fill(" ");
  let noMecanicos = 0;
  for (let i = 0; i < lineas.length - 1; i++) {
    const l1 = lineas[i];
    const l2 = lineas[i + 1];
    const p2 = palabrasDe(l2);
    const cabe = l1.length + 1 + p2.length < ANCHO_LINEA;
    if (l2.startsWith("—")) {
      candidatos[i] = PAR; // parlamento nuevo
      noMecanicos += 1;
    } else if (cabe && esFronteraDeBloque(l1, l2)) {
      candidatos[i] = PAR; // límite de párrafo del original comprimido a un \n
      noMecanicos += 1;
    } else if (cabe) {
      candidatos[i] = VERSO; // candidata a verso
      noMecanicos += 1;
    }
  }
  // Bloque de verso: TODAS las líneas cortas y ningún corte mecánico que
  // atraviese la estrofa. En prosa, solo sobreviven los saltos de bloque.
  if (
    lineas.length >= 3 &&
    lineas.every((l) => l.length < UMBRAL_VERSO) &&
    noMecanicos === lineas.length - 1
  ) {
    return new Array(lineas.length - 1).fill(VERSO);
  }
  return candidatos.map((c) => (c === PAR ? PAR : " "));
}

function esFronteraDeBloque(linea1: string, linea2: string): boolean {
  return /[.!?…»"]\s*$/.test(linea1) && /^[A-ZÁÉÍÓÚÜÑ¿¡«\u2014]/.test(linea2);
}

/**
 * Presentación en pantalla de `textoVisible`: une los saltos mecánicos de
 * maquetación con espacios y conserva párrafos (\n\n), parlamentos (—) y
 * versos (\n). Las líneas resultantes se ajustan solas al ancho disponible
 * (CSS `white-space: pre-line`). Identidad íntegra de palabras y signos.
 */
export function textoParaPantalla(textoVisible: string): string {
  const bloques = textoVisible.replace(/\r\n/g, "\n").split("\n\n");
  const presentados = bloques.map((bloque) => {
    const lineas = bloque
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (lineas.length < 2) return lineas.join(" ");
    const cortes = clasificarParrafo(lineas);
    let salida = "";
    for (let i = 0; i < lineas.length; i++) {
      salida += lineas[i];
      if (i < lineas.length - 1) salida += cortes[i];
    }
    return salida;
  });
  return presentados.join("\n\n");
}
