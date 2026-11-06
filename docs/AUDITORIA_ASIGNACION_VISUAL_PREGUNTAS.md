# R15 — AUDITORÍA DE ASIGNACIÓN VISUAL A PREGUNTAS

**Fecha:** 2026-11-06 · **Prioridad:** P0  
**Modo:** Contenidos, Interacciones y Descubrimientos, con coordinación editorial.  
**Estado:** propuesta documental para revisión de R01/R05/R06/R09/R13/R14; **NO APROBADA PARA INTEGRACIÓN**.  
**Rama:** `feature/r15-auditoria-visual-preguntas`  
**Matriz:** `docs/data/propuesta_vinculos_visuales_preguntas.csv`.

## 1. Fuentes consultadas y método

Se ha contrastado en la rama `main` el paquete `content/piloto/package.json`, los 74 JSON reales de `content/piloto/questions/`, registros `content/piloto/media_assets/`, los manifiestos `assets/scenes/manifest.json`, `assets/closeups/manifest.json` y `assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json`; además de las dos fuentes obligatorias `docs/DC_IMG_001_ASIGNACION_INTEGRAL_ASSETS.md` y `docs/DOSSIER_ARTISTICO_H4.md`. Para decisiones se consultaron `AGENTS.md`, `docs/VISION_Y_DECISIONES.md` y `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md`.

**Alcance constatado:** 74 preguntas, 10 episodios y 53 registros de media en el paquete editorial; 253 imágenes del manifiesto de escenas, 10 planos expresivos de Don Quijote y un manifiesto de 376 acuarelas más 39 piezas auxiliares de edición. **Inspección visual directa de los bytes de `026.jpg` y `027.jpg`**. Las otras imágenes se han contrastado **por metadatos, rutas y descripciones**, no por inspección visual individual ni por pruebas en runtime. La etiqueta `review_state` de los manifests no constituye aprobación de cada asociación.

La decisión vinculante **DC-IMG-001** exige aprovechar integralmente las imágenes aptas y no forzar recursos donde empobrecen la pregunta; la presentación de respuestas es siempre seleccionada (DC-04). Las fases propuestas son `pre_question`, `question_focus`, `reveal`, `post_answer`, `discovery`; no se modifica el esquema actual ni se propone publicar un nuevo tipo de relación sin revisión técnica.

## 2. Inventario completo del paquete auditado

| Ámbito | Parte y capítulo | IDs de preguntas | Total |
|---|---|---|---:|
| Piloto, 6 capítulos | I, 6 | DQ.Q.000201–000208 | 8 |
| Piloto, 6 capítulos | I, 8 | DQ.Q.000101–000112 | 12 |
| Piloto, 6 capítulos | I, 11 | DQ.Q.000209–000216 | 8 |
| Piloto, 6 capítulos | I, 18 | DQ.Q.000217–000225 | 9 |
| Piloto, 6 capítulos | II, 1 | DQ.Q.000226–000231 | 6 |
| Piloto, 6 capítulos | II, 74 | DQ.Q.000232–000238 | 7 |
| **Subtotal piloto** | **6 capítulos** | | **50** |
| Precarga adicional | I, 1 | DQ.Q.000301–000306 | 6 |
| Precarga adicional | I, 16 | DQ.Q.000307–000312 | 6 |
| Precarga adicional | I, 21 | DQ.Q.000313–000318 | 6 |
| Precarga adicional | II, 10 | DQ.Q.000319–000324 | 6 |
| **Subtotal precarga** | **4 episodios** | | **24** |
| **TOTAL** | **10 episodios** | | **74** |

El paquete declara también 14 descubrimientos existentes, pero **no se ha redactado ningún descubrimiento ni una batería nueva de preguntas**.

### Cobertura de clasificación

| Necesidad visual | Preguntas | Criterio |
|---|---:|---|
| `imprescindible` | 1 | El tipo hotspot exige un referente visible y selección accesible alternativa |
| `util` | 14 | Contexto o detalle que mejora la comprensión sin adelantar la opción |
| `opcional` | 16 | Imagen agradable pero no necesaria; prescindible ante dudas |
| `mejor_sin_imagen` | 43 | Imagen en foco que distraería, no probaría un dato textual o revelaría solución |
| **Total de preguntas clasificadas** | **74/74 (100 %)** | Cada pregunta tiene una fila primaria en CSV |

**97 filas CSV:** 74 decisiones primarias (una por pregunta) + 23 vínculos secundarios justificados. `mejor_sin_imagen` no supone eliminar todos los fondos narrativos; significa prescindir de imagen específica en **`question_focus`**, reservando las imágenes de resultado para fases posteriores. Las filas sin medio propuesto conservan `imagen_actual_id` como referencia de auditoría y dejan en blanco `imagen_propuesta_id` deliberadamente. Todas las filas de vínculo real o candidato llevan justificación y riesgo.

## 3. Reglas editoriales de utilización

**Antes de la pregunta:** pueden mantenerse paisajes, encuadres de transición o personajes no reveladores y no deben introducirse nombres, textos, bocadillos, objetos ya identificados ni el desenlace que constituye la respuesta. La imagen de ambiente debe elegirse según lo que el jugador conoce en esa fase, no por simple coincidencia de capítulo.

**Durante la pregunta:** una ilustración o comparación solo aparece si contribuye a seleccionar sin convertir la solución en obvia. Los `matching`, `ordering` y `multi_choice` merecen especial precaución; el catálogo no tiene más de un `hotspot` (Q.112) en este paquete.

**Después de responder:** `reveal` muestra la información narrativa que resuelve la incertidumbre; `post_answer` ayuda a explicar por qué se eligió una opción; `discovery` ofrece contexto artístico, patrimonial o literario opcional. Son papeles distintos, aunque reutilicen el mismo archivo por ID. No recortar una imagen para ocultar la solución sin documentar el cambio y sus derivados. Respetar TS-001 (texto hablado íntegro siempre visible), prioridad del diálogo y áreas seguras.

**Naturaleza:** una imagen de IA es `RECREACION_ARTISTICA` y no evidencia histórica; una acuarela de Tusell sobre Doré es una interpretación iconográfica con atribución. La existencia de un fichero en Git no equivale a autorización de redistribución o aptitud editorial para cada fase.

## 4. Incidencias prioritarias con impacto en preguntas

| Nivel | Preguntas / recursos | Problema constatado | Resolución propuesta |
|---|---|---|---|
| **P0** | **Q.112**, `DQ.MA.000026`, `027.jpg` | El dossier H4 §5 propone 027 como acuarela de embestida; **027 representa el encuentro con los frailes**. La imagen real 026 sí representa el aspa arrastrando caballo y caballero. El campo `hotspot_media_id` de Q.112 **ya apunta a 026**, pero el flujo visual de pregunta y el rectángulo aún requieren validación. | Conservar 026 como foco, con gating después del golpe. Revisión interactiva y fe de erratas del H4 en otra tarea. |
| **P0** | Q.232–234 y Q.238 / `DQ.MA.900011` | `pre_image_media_id` apunta a `p2_c74_despedida_post.webp` (fase `post`, riesgo `critical` en manifiesto). Anticipa el final. | Sustituir en una futura integración por fondo no revelador o foco sin imagen; reservar el post para después. |
| **P0** | Q.235–237 / `DQ.MA.900042` | El archivo de testamento tiene nombre de fase `post`, pero el registro en catálogo describe función `pre_pregunta`. | No usarlo como previa de preguntas sobre convocados, epitafio y cierre. Q.235 propone `post_answer`. |
| **P0** | Q.217 / `DQ.MA.900008` | La escena muestra literalmente el rebaño cuya identidad pregunta el jugador como causa de la polvareda. | Mover a `reveal`; en foco, sin imagen que responda. |
| **P0** | Q.314–317 / bacía | `DQ.MA.900025` y `900036` enseñan la bacía bajo lluvia y `900037` corresponde a examen `post` aunque se asigna como `pre`. Riesgo de responder perspectiva o motivo. | `question_focus` preferentemente textual; detalle/contraste después de seleccionar. |
| **P1** | Q.105–109, Q.222, Q.225, Q.310, Q.318, Q.324 | Montajes del desenlace, heridas o consecuencias adelantarían opciones de multiselección, ordenación o correspondencia. | Imagen ambiental solo si no revela; recurso explicativo en `reveal` / `post_answer`. |
| **P1** | Q.223 / `DQ.MA.900035` | El recurso de pastores y piedras es `post` y **no representa** el vómito preguntado. El `spoiler_level: ninguno` de su registro no elimina ese problema de fase. | Sin imagen en foco. `000058` ofrece examen bucal posterior, sin afirmar que pruebe el vómito. |
| **P1** | Q.309–310, Q.319–324 | Imágenes de cuidadores o campesinas pueden revelar quién interviene y cómo se produce el contraste de perspectivas. | Elegibilidad ligada a beat y diálogo efectivamente mostrado. |
| **P1** | `DQ.MED.*` vs. `DQ.MA.*` | El manifiesto de escenas usa la familia candidata `DQ.MED.*`; el catálogo del piloto usa `DQ.MA.*`. Ejemplo real: `DQ.MED.900231` y `DQ.MA.900030` describen el mismo fichero `p1_c08_molinos_siluetas_pre.webp`. | No sustituir IDs por similitud de número; reconciliar rutas y hashes en un PR de integración distinto. |
| **P1** | Calidad y derechos | Los manifiestos conservan estados borrador/pending; 253 escenas no están individualmente aprobadas para cada pregunta. | R05/R06/R13/R14 deben verificar imagen exacta, procedencia, rotulación, riesgos y ejecución offline. |

### Comparaciones de perspectivas auditadas

- **Q.109 (molinos):** el contraste gigante imaginario/molino real se aprende después del emparejamiento; una composición reveladora no puede ser pista previa.
- **Q.217–225 (rebaños):** polvo, ovejas, ejércitos fabulosos y consecuencias deben presentarse en orden narrativo; la oveja real revela la naturaleza del supuesto ejército.
- **Q.314, Q.315, Q.317 (Mambrino):** no utilizar el plano cercano de bacía como respuesta visual a lo que cada cual percibe o al motivo práctico de llevarla en la cabeza. Mostrarlo tras explicar realidad e imaginación.
- **Q.319–324 (Dulcinea):** perspectivas de Sancho, don Quijote y las labradoras no deben permitir inferir la reacción antes de responder; una imagen de campesinas no certifica por sí sola la precisión textual del narrador.
- **Q.232–238 (final):** testamento, despedida y duelo solo son seguros cuando la revelación correspondiente ya ha ocurrido; evitar spoilers emocionales además de los factuales.

## 5. Expediente específico Q.112 — molinos

**Enunciado original (intacto):** «Sobre la acuarela de la embestida, señale la zona donde el aspa arrastra a caballo y caballero».

**Metadatos y fuente contrastados:** `content/piloto/questions/DQ.Q.000112.json` indica `interaction.type=hotspot`, `hotspot_media_id=DQ.MA.000026`, `pre_image_media_id=DQ.MA.900005`, y `safe_after_episodes=[DQ.P1.C08.E01]`. `content/piloto/media_assets/DQ.MA.000026.json` resuelve a `assets://ilustraciones_tusell/acuarelas/026.jpg` (833 × 1041; `spoiler_level: revelador`). Su ficha de imagen y la inspección visual de **los bytes reales de 026** confirman caballo, caballero y aspa durante la caída; **026 es el candidato correcto** para el objeto preguntado. **Los bytes de 027** (857 × 653) muestran el episodio de los frailes, no el aspa; el manifiesto `DQ.IL.0027` también lo describe así.

**Contradicción H4:** su §5 recomienda 027 para Q.112, pero esa recomendación es materialmente errónea. La formulación de H4 sobre «la imagen asignada es `p1_c08_molinos_pre`» solo corresponde al campo previo, **no al campo `hotspot_media_id` del JSON**. Son dos relaciones diferentes. No debe corregirse un campo adecuado con otro recurso que no contiene el objeto.

**Coordenadas:** registro vigente `x=0.30, y=0.22, w=0.45, h=0.50` (normalizadas). Son un rectángulo **existente, no aprobado**. La inspección visual permite ubicar cualitativamente la interacción en el primer plano central bajo el aspa, pero **no demuestra que este rectángulo cubra correctamente toda la región ni descarte clics ambiguos**. Como ensayo alternativo, se podría evaluar `x≈0.27, y≈0.19, w≈0.48, h≈0.54` **solo como punto de partida no validado**, sin sobrescribir el valor actual.

**Condiciones de publicación y prueba obligatorias:** (1) renderizar exactamente 026 con su relación de aspecto real, sin recorte que invalide la geometría; (2) overlay y ensayo de rectángulos sobre la imagen renderizada, en distintas resoluciones/zoom; (3) clics de control, falsos positivos, bordes y transformación `object-fit`; (4) alternativa accesible por teclado y lectura textual de las opciones originales; (5) mostrar 026 como `question_focus` solo una vez narrado el arrastre, nunca en fase previa a la embestida; (6) atribución completa Tusell/Doré, procedencia y licencia según ficha; (7) evidencia de QA firmada y registrada. Si no se cumple, Q.112 **permanece pendiente de integración**; no se sustituye furtivamente por 027 ni se declara validada.

**Veredicto:** identificación del recurso **comprobada visualmente**; idoneidad de su geometría, experiencia y flujo temporal **PENDIENTES**.

## 6. Recursos para descubrimientos (sin crear preguntas ni fichas nuevas)

Candidatos documentados en `discovery` después del hecho: `DQ.MA.000021` (escrutinio), `DQ.MA.000026` (molinos), `DQ.MA.000034` y `000035` (cabreros y Edad de Oro), `DQ.MA.000057` y `000058` (rebaños y examen bucal), `DQ.MA.000371`, `000372`, `000373` (fin de Alonso Quijano, duelo y alegoría). Los vínculos del CSV señalan las preguntas junto a las que podrían consultarse; **no crean una nueva cápsula** ni certifican correspondencia con los 14 registros existentes. Antes de integrar, verificar cuál de esos descubrimientos contiene el texto pertinente, y que la licencia y atribución permiten el uso.

Perspectivas complementarias **solo como IDs candidatos del manifiesto**: `DQ.MED.900159` (frailes), `DQ.MED.900164` (cama), `DQ.MED.900211` (Maritornes), `DQ.MED.900230` (libros), `DQ.MED.900237` (bacía), `DQ.MED.900145` (campesinas). No equivalen automáticamente a un `DQ.MA.*` operativo; precisan cotejo de ruta/hash y registro canónico.

Los 10 close-ups de Don Quijote (`DQ.MED.901001–901010`) pueden servir para reacciones en `post_answer` si mantienen edad, vestuario, expresión y época; no son pruebas literarias ni deben transformarse en ilustración obligatoria de cada pregunta. Uno aparece **solo como candidato** secundario en Q.232 y requiere especial revisión de tono ante la muerte.

## 7. Condiciones de aceptación y límites

Esta rama **solo añade estos dos documentos**. No se ha cambiado `content/piloto/questions/`, el enunciado ni las opciones de Q.112, respuestas, escenas, `MediaAsset`, manifiestos, esquemas, consumo por UI ni asignaciones productivas. La tabla CSV es una **propuesta no importable directamente al runtime**. Sus IDs `DQ.MA.*` refieren al catálogo existente; los `DQ.MED.*` se declaran expresamente candidatos pendientes de mapeo; campo de imagen propuesta vacío significa decisión `mejor_sin_imagen`.

Puertas de revisión: **R01** exactitud y momento narrativo; **R05** ID/ruta/hash, imagen física y alt; **R06** composición, tono y zonas seguras TS-001; **R13** procedencia, atribución, permisos de Git/uso local y redistribución; **R09** compatibilidad con esquema sin dos fuentes de verdad; **R14** prueba antiespoiler por fase, orden, ratios, teclado, lector de pantalla, offline y Q.112 con captura de evidencia.

**Métricas honestas:** 74/74 preguntas clasificadas (100 %); 97 filas CSV (74 primarias + 23 secundarias); 0 relaciones integradas; 0 coordenadas Q.112 validadas mediante interacción; 0 revisiones profesionales humanas externas atribuidas en esta entrega; 0 propuestas sin justificación editorial. Los problemas conocidos de fase, recurso, perspectiva e identificadores quedan identificados, aunque la revisión exhaustiva píxel a píxel de todos los activos **sigue pendiente**.

**Dictamen:** **GO para revisión conjunta del PR; NO-GO para importar las asociaciones o declarar aprobado Q.112** antes de resolver las verificaciones registradas.
