# CATÁLOGO INICIAL DE NECESIDADES VISUALES — Entregable FASE 0.5 (encargo §8)

**Modo:** CONTENIDOS · **Fecha:** 2026-11-05 · **Alcance:** los seis capítulos del piloto.
**Fuentes cruzadas:** manifiesto de acuarelas (EPUB Tusell, 376) y manifiesto de escenas del equipo de arte (`assets/scenes/manifest.json`, recreaciones IA, commit `ae927a1`). Fases según `scene.schema.json`: before / question / reveal / after.

Regla aplicada (encargo §2.5/§4.7.5): las acuarelas pueden ilustrar `question/reveal` y el cuaderno; la imagen de contexto `before` preferible es recreación fotorrealista (evita revelar la respuesta); toda recreación queda rotulada `RECREACION_ARTISTICA`.

## Cobertura por capítulo del piloto

| Capítulo | before | question | reveal | after | Acuarelas disponibles | Recreaciones existentes | Huecos |
|---|---|---|---|---|---|---|---|
| **I.8** Molinos | DQ.MED.900005 ✔ | DQ.IL.0026 (hotspot candidato) | DQ.IL.0026/0029 ✔ | DQ.MED.900006 ✔ | 026–029 | 900005, 900006 | **ninguno** |
| **I.6** Escrutinio | DQ.MED.900013 ✔ *(2.ª batería)* | DQ.IL.020 ◐ (era cierre de I.5) | DQ.IL.021 ✔ | — | 020–021 | 900013 | **1 recreación: quema en el corral (after)** |
| **I.11** Edad de Oro | DQ.MED.900007 ✔ | DQ.IL.034 ✔ | DQ.IL.035 ✔ | DQ.IL.036 ✔ | 034–036 | 900007 | **ninguno** |
| **I.18** Rebaños | DQ.MED.900008 ✔ | DQ.IL.056 ⚠ (auditar, parece I.17) | DQ.IL.057 ✔ | DQ.IL.058 ✔ | 056–058 | 900008 | **auditoría de 056**; alternativa: recreación de la polvareda inicial |
| **II.1** Visita | DQ.MED.900029 ✔ *(3.ª batería)* | DQ.IL.0171 ✔ | — | — | 170–171 | 900029 | **1 recreación: reacción/cierre (reveal-after)** |
| **II.74** Muerte | DQ.IL.0371 ✔ | DQ.IL.0372 ✔ | DQ.IL.0371/0373 ✔ | DQ.MED.900011 ✔ | 371–373 | 900011 | **ninguno** |

## Cobertura fuera del piloto — aprovechamiento de las 23 escenas producidas

El paquete visual acumula **23 recreaciones** (11 de la primera batería, `ae927a1`; 12 de la segunda, `f93f031`). Aprovechamiento por capítulo no piloto (acuarelas reales del EPUB como contrapunto histórico en `question/reveal`/cuaderno):

| Capítulo | Escena (fase) | Acuarelas disp. (primera) | Huecos aparentes |
|---|---|---|---|
| I.1 | DQ.MED.900002 (pre) | 3 (004) | reveal/after con acuarelas |
| I.2 | DQ.MED.900003 y 900004 (pre) | 3 (007) | cobertura amplia |
| I.3 | DQ.MED.900012 (post) | 3 (009) | pre con acuarela 009 |
| I.20 | DQ.MED.900014 (pre) | 3 (059) | reveal (batanes) con acuarela |
| I.22 | DQ.MED.900015 (pre) | 3 (067) | reveal con acuarela 067/068 |
| I.25 | DQ.MED.900016 (pre) | 6 (079) | cobertura amplia (penitencia) |
| I.35 | DQ.MED.900017 (post) | 2 (114) | pre con acuarela 114 |
| I.46 | DQ.MED.900018 (post) | 3 (144) | pre con acuarela 144 |
| II.10 | DQ.MED.900019 (pre) | 3 (190) | reveal con acuarela |
| II.17 | DQ.MED.900020 (pre) | 3 (207) | reveal (león) con acuarela |
| II.26 | DQ.MED.900021 (pre) | 3 (239) | reveal (retablo) con acuarela |
| II.41 | DQ.MED.900009 (pre) | 2 (276) | reveal (Clavileño) con acuarela 276 |
| II.45 | DQ.MED.900022 (pre) | 3 (286) | reveal con acuarela 286/287 |
| II.61 | DQ.MED.900010 (pre) | 4 (335) | reveal (Barcelona) con acuarela 335 |
| II.64 | DQ.MED.900023 (pre) | 3 (346) | reveal (Blanca Luna) con acuarela 346 |

Patrón recomendado: la recreación IA abre el episodio (`before`, spoiler `ninguno`) y las acuarelas Tusell documentan el `reveal` y alimentan cuaderno/museo — coincidente con la política `source_media_policy` del paquete visual y con la limitación de resolución de las acuarelas (mediana 849×688 px).

## Resumen

- **4 de 6 capítulos del piloto con cobertura completa** de fases combinando acuarelas y recreaciones existentes (I.8, I.6, I.11, II.74).
- **Huecos reales del piloto: 2 recreaciones nuevas** (I.6-after «quema en el corral»; II.1-reveal/after) + 1 decisión de auditoría (056) con posible recreación alternativa (polvareda).
- Fuera del piloto: 15 capítulos con recreación propia + acuarelas; las fases `reveal` de esos capítulos se cubren con acuarelas existentes.

## Auditoría de discrepancias alt↔capítulo (FASE 1, resuelta con criterio curatorial)

| Acuarela | alt | Colocada en | Contenido aparente | Veredicto de auditoría |
|---|---|---|---|---|
| 043 | «Discurso de Don Quijote sobre la Edad Dorada.» | I.15 (3015.xhtml) | I.11 | **Vincular a I.11** (el discurso está verbatim en 2011.xhtml): colocación del editor sin función puente identificable; criterio curatorial del episodio *representado* |
| 056 | «Sancho sale de la venta» | I.18 (1.18.xhtml) | cierre de I.17 | **Puente de apertura válido**: I.18 abre con Sancho llegando «marchito y desmayado» tras salir de la venta; acuarela funcional como imagen de transición |
| 171 | «Metáfora del loco sevillano» | II.1 (2.1.xhtml) | pasaje **AUSENTE** en esta digitalización (verificado: ni «loco de Sevilla» ni «Frestón» existen en el EPUB) | **Evidencia de abreviación**: la iconografía sigue el texto completo de la ed. Tasso 1905. Mostrar la acuarela con nota «pasaje completo en la edición de referencia» (RESOLUCION_PEND01) |

**Criterio adoptado:** el manifiesto conserva la colocación real del EPUB (capa de fuente, intacta); la vinculación editorial (museo, cuaderno, preguntas) usa el episodio *representado*. Consecuencia estructural registrada: la capa de texto del lector cotejará su integridad contra la edición de referencia (DQ.ED.0002).

## Nota técnica para DESARROLLO (extracto del dossier)

Las capitulares son PNG (A–Z), de modo que la extracción de texto pierde la inicial («N esto» por «En esto»). El pipeline del lector y FTS5 debe recomponerlas; afecta a citas, búsquedas y a los `text_indexable` de `Passage`.
