# CATÁLOGO INICIAL DE NECESIDADES VISUALES — Entregable FASE 0.5 (encargo §8)

**Modo:** CONTENIDOS · **Fecha:** 2026-11-05 · **Alcance:** los seis capítulos del piloto.
**Fuentes cruzadas:** manifiesto de acuarelas (EPUB Tusell, 376) y manifiesto de escenas del equipo de arte (`assets/scenes/manifest.json`, recreaciones IA, commit `ae927a1`). Fases según `scene.schema.json`: before / question / reveal / after.

Regla aplicada (encargo §2.5/§4.7.5): las acuarelas pueden ilustrar `question/reveal` y el cuaderno; la imagen de contexto `before` preferible es recreación fotorrealista (evita revelar la respuesta); toda recreación queda rotulada `RECREACION_ARTISTICA`.

## Cobertura por capítulo del piloto

| Capítulo | before | question | reveal | after | Acuarelas disponibles | Recreaciones existentes | Huecos |
|---|---|---|---|---|---|---|---|
| **I.8** Molinos | DQ.MED.900005 ✔ | DQ.IL.0026 (hotspot candidato) | DQ.IL.0026/0029 ✔ | DQ.MED.900006 ✔ | 026–029 | 900005, 900006 | **ninguno** |
| **I.6** Escrutinio | DQ.IL.020 ◐ (era cierre de I.5) | DQ.IL.021 ✔ | DQ.IL.021 ✔ | — | 020–021 | — (900002 es del cap. 1) | **1 recreación: quema en el corral (after)** |
| **I.11** Edad de Oro | DQ.MED.900007 ✔ | DQ.IL.034 ✔ | DQ.IL.035 ✔ | DQ.IL.036 ✔ | 034–036 | 900007 | **ninguno** |
| **I.18** Rebaños | DQ.MED.900008 ✔ | DQ.IL.056 ⚠ (auditar, parece I.17) | DQ.IL.057 ✔ | DQ.IL.058 ✔ | 056–058 | 900008 | **auditoría de 056**; alternativa: recreación de la polvareda inicial |
| **II.1** Visita | DQ.IL.0170 ◐ | DQ.IL.0171 ✔ | — | — | 170–171 | — | **1 recreación: reacción/cierre (reveal-after)** |
| **II.74** Muerte | DQ.IL.0371 ✔ | DQ.IL.0372 ✔ | DQ.IL.0371/0373 ✔ | DQ.MED.900011 ✔ | 371–373 | 900011 | **ninguno** |

## Resumen

- **3 de 6 capítulos con cobertura completa** de fases combinando acuarelas y recreaciones existentes.
- **Huecos reales del piloto: 2 recreaciones nuevas** (I.6-after «quema en el corral»; II.1-reveal/after) + 1 decisión de auditoría (056) con posible recreación alternativa (polvareda).
- Las escenas no piloto ya producidas (caps. 1, 2, 41, 61 + referencia de personajes) quedan registradas para el resto del libro.

## Discrepancias alt↔capítulo a auditar (criterio a fijar en el piloto)

| Acuarela | alt | Colocada en | Contenido aparente |
|---|---|---|---|
| 043 | «Discurso de Don Quijote sobre la Edad Dorada.» | I.15 (3015.xhtml) | I.11 |
| 056 | «Sancho sale de la venta» | I.18 (1.18.xhtml) | cierre de I.17 |

Hipótesis: colocación deliberada del editor como imagen de apertura-recapitulación; el piloto decidirá si el catálogo vincula la acuarela al episodio **representado** (criterio curatorial recomendado) o al **documento donde aparece** (criterio de fuente). Mientras tanto, el manifiesto conserva la colocación real del EPUB.

## Nota técnica para DESARROLLO (extracto del dossier)

Las capitulares son PNG (A–Z), de modo que la extracción de texto pierde la inicial («N esto» por «En esto»). El pipeline del lector y FTS5 debe recomponerlas; afecta a citas, búsquedas y a los `text_indexable` de `Passage`.
