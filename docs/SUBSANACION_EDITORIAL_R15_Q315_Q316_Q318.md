# R15 — Subsanación editorial P0: Q.315, Q.316 y Q.318 (I,21)

**Responsable:** R15 — Preguntas y Control Antispoiler · **Autorización:** R14 · **Prioridad:** P0 · **Fecha:** 2026-11-07.  
**Estado:** **PROPUESTA PARA VISADO R01/R02; SIN GO PRODUCTIVO.**  
**Candidatos completos, en datos no productivos:** [`docs/data/propuestas_editoriales_q315_q316_q318_r15.json`](data/propuestas_editoriales_q315_q316_q318_r15.json). Allí constan los campos completos `id`, `prompt`, `interaction`, `rationale`, `evidence`, `episode_id`, `chapter_ids`, `passage_ids`, `cognitive_type`, `spoiler_policy`, `visual_requirements`, `review` y variantes.

## 1. Alcance, fuente y control de normas

Se han cotejado los JSON **reales** `content/piloto/questions/DQ.Q.000315.json`, `DQ.Q.000316.json`, `DQ.Q.000318.json`, los pasajes `DQ.P1.C21.P0001–P0004`, `content/piloto/package.json`, `docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md`, `docs/ENCARGO_MAESTRO.md` (§§2.2 y 4.3), `docs/VISION_Y_DECISIONES.md` (DC-04), `schemas/content/question.schema.json`, `schemas/content/_definitions.schema.json`, `docs/PAQUETE_REVISION_EDITORIAL.md` y su **sección D4 en la PR editorial #47** (abierta durante este cotejo). También se respetan las decisiones de PR #30, R06/PR #44 y R12/PR #45.

La **edición de base para el banco de preguntas es PG eBook #2000**, `DQ.ED.0003` / `DQ.SRC.0005` / `content/textos/gutenberg_2000/El_Quijote.txt`, según la ficha de edición vigente y la resolución PEND-01. La **edición del lector** sigue siendo `DQ.ED.0001` (Tusell/Tasso); sus variantes ortográficas no se han utilizado para construir citas híbridas. Todas las citas propuestas se obtuvieron del **blob real de PG #2000** del repositorio y se comprobaron mediante coincidencia exacta de subcadenas (normalizando únicamente los saltos CRLF→LF para la propuesta). **Ninguna cita inventada.** Posiciones orientativas en el archivo PG: I,10, líneas 3159–3163; I,21, líneas 6339–6420.

**Advertencia de alcance:** todos los `DQ.P1.C21.P0005`, `DQ.P1.C21.P0006` y `DQ.P1.C10.P0001` mencionados a continuación son **IDs candidatos de nuevos `Passage` aún inexistentes**; sus textos de trabajo literales están incluidos en el JSON de propuestas. No hay permisos en este encargo para escribirlos en `content/piloto/passages/` ni ampliar el catálogo de capítulos. Antes de una integración R02/R09 deberán asignarlos o reconciliarlos con pasajes canónicos efectivos, con trazabilidad y contrato intacto.

## 2. Q.315 — explicación incompleta del sombrero (A-11)

### Diagnóstico confirmado

- **Enunciado actual:** «¿Por qué llevaba el barbero la bacía sobre la cabeza?».
- **Respuesta actual:** lluvia y evitar que se manchase el sombrero que debía de ser nuevo. **Factualmente correcta** en PG #2000.
- **Defecto:** la cita de `DQ.P1.C21.P0003` termina en «así, el barbero del mayor servía»; **no llega al motivo de la bacía**. No basta sustituir `evidence.quote` manteniendo `passage_id=P0003`: esa relación quedaría falsa.

**Cita canónica comprobada (I,21, PG líneas 6396–6399):**

> «y traía una bacía de azófar; y quiso la suerte que, al tiempo que venía, comenzó a llover, y, porque no se le manchase el sombrero, que debía de ser nuevo, se puso la bacía sobre la cabeza; y, como estaba limpia, desde media legua relumbraba.»

El narrador informa el **motivo del barbero**, no una intención de hacerse pasar por caballero; «debía de ser nuevo» es una inferencia del narrador, no certeza histórica del objeto.

### Corrección completa propuesta

| Campo | Propuesta |
|---|---|
| `id` / `episode_id` / `chapter_ids` | Conservar `DQ.Q.000315` · `DQ.P1.C21.E01` · `[DQ.P1.C21]` |
| `prompt` | **«Según el narrador, ¿por qué se puso el barbero la bacía sobre la cabeza?»** |
| `interaction.type` | `single_choice` |
| `O01` **correcta** | «Porque empezó a llover y quería evitar que se manchase su sombrero, que debía de ser nuevo» |
| `O02` incorrecta | «Porque quería transportar en la bacía el agua necesaria para afeitar a un cliente» |
| `O03` incorrecta | «Porque pretendía hacerse pasar ante los viajeros por un caballero armado» |
| `correct_option_ids` | `[DQ.Q.000315.O01]` (única) |
| `rationale` | Llovía, y la bacía limpia protegía el sombrero para que no se manchase; la lectura caballeresca pertenece a don Quijote, no al barbero |
| `passage_ids` | `[DQ.P1.C21.P0003, DQ.P1.C21.P0005]` **(P0005 candidato)** |
| `evidence` | `cita_literal` del fragmento anterior con `passage_id=DQ.P1.C21.P0005` **(no P0003)** |
| `spoiler_policy` | `safe_after_episodes=[DQ.P1.C21.E01]` intacto; en pantalla solo después de la explicación narrativa del sombrero |
| `visual_requirements` | `pre_image_must_not_reveal=true`, **omitir `pre_image_media_id`** (sin imagen previa) |

**Distractores:** O02 confunde uso instrumental de la bacía con el motivo expresamente declarado; O03 atribuye al barbero el delirio perceptivo de don Quijote. Son plausibles en contexto y falsos respecto de la explicación literal. R01/R02 decidirán si conviene simplificar el léxico sin debilitar la distinción.

**Bloqueo A-11 preservado:** retirar `DQ.MA.900036` de `pre_question`. **No** recuperarla como explicación literal en `post_answer`: R12 y R01/R02 han constatado que la imagen muestra un cara a cara de Don Quijote y el barbero que no ocurre en la narración. La solución segura es texto tras respuesta, sin imagen de sustitución automática.

## 3. Q.316 — Sacripante pertenece a I,10, no a I,21 (A-12)

### Diagnóstico filológico y cronológico

El actual `DQ.P1.C21.P0004` está **mal atribuido internamente**: su `text_original` reproduce el diálogo de I,10 sobre la celada y el juramento (incluso antes de la mención a Sacripante); no es una prueba de lo dicho en I,21. El JSON de Q.316 se limita a esa cita truncada y formula la pregunta como si el precedente se invocara **al tomar la bacía**, algo que **no se pronuncia allí**.

**En I,10** (PG líneas 3159–3163), don Quijote renueva el juramento de conseguir «otra celada tal y tan buena como ésta a algún caballero» y evoca «el yelmo de Mambrino, que tan caro le costó a Sacripante». **En I,21** (PG líneas 6356–6358), al divisar al hombre, dice «hacia nosotros viene uno que trae en su cabeza puesto el yelmo de Mambrino, sobre que yo hice el juramento que sabes». **No menciona a Sacripante en ese diálogo de I,21.** La relación es un **recuerdo intercapitular**: el deseo previo del yelmo y la identificación imaginaria posterior de la bacía.

### Opción editorial A — recuperar referencia retrospectiva (preferida por preservar el aprendizaje original, pero **bloqueada**)

| Campo | Propuesta |
|---|---|
| `id` | `DQ.Q.000316` **provisional** (misma pregunta intercapitular, sujeta a control de identidad editorial) |
| `episode_id` | `DQ.P1.C21.E01` (se interroga después del encuentro narrado en I,21) |
| `chapter_ids` | `[DQ.P1.C10, DQ.P1.C21]` (I,10 como origen; I,21 como retorno del tema) |
| `prompt` | **«En I,10, al renovar su juramento de conseguir otra celada, don Quijote recuerda un yelmo célebre. ¿Cuál es el mismo yelmo que cree divisar después, en I,21?»** |
| `interaction.type` | `single_choice`; `correct_option_ids=[DQ.Q.000316.O01]` |
| O01 **correcta** | «El yelmo de Mambrino, que tan caro le costó a Sacripante» |
| O02 incorrecta | «La celada que se le rompió durante el combate con el vizcaíno» |
| O03 incorrecta | «Una armadura del marqués de Mantua, cuyo juramento había recordado» |
| `rationale` | En I,10 menciona a Mambrino y Sacripante al querer reemplazar su celada rota; en I,21 cree identificar ese yelmo en la bacía y alude al juramento, **sin repetir a Sacripante** |
| `passage_ids` | `[DQ.P1.C10.P0001, DQ.P1.C21.P0003]` — **P1.C10.P0001 candidato inexistente** |
| `evidence` | Dos `cita_literal` independientes: I,10 → `DQ.P1.C10.P0001`; I,21 → `DQ.P1.C21.P0003` (textos exactos en el JSON auxiliar) |
| `spoiler_policy` | `safe_after_episodes=[DQ.P1.C21.E01]` y exigir episodio I,21 concluido + alusión al juramento conocida |
| Visual | **`SIN_IMAGEN` editorial:** omitir `pre_image_media_id`, mantener `pre_image_must_not_reveal=true` |

**Dependencias reales bloqueantes:** `content/piloto/package.json` **no contiene `DQ.P1.C10` ni pasajes de I,10** (sí existe II,10, que no debe confundirse). Por eso esta opción **no está lista para publicar**, aunque el enunciado sea filológicamente coherente. R01/R02 debe aceptar la asociación retrospectiva y R09 decidir el alta formal de capítulo/pasaje o el tratamiento de citas externas sin violar integridad referencial. Si la experiencia del piloto no ha presentado I,10 al jugador, R01 debe valorar su justicia didáctica; el simple `safe_after` de I,21 **no garantiza acceso previo al fragmento de I,10**.

### Opción editorial B — simplificar a hecho realmente pronunciado en I,21 (sin alta de I,10)

Candidato completo en `alternative_current_pilot` del JSON:

- `episode_id=DQ.P1.C21.E01`, `chapter_ids=[DQ.P1.C21]`, `passage_ids=[DQ.P1.C21.P0003]`.
- **`prompt`:** «Al divisar lo que cree el yelmo de Mambrino en I,21, ¿qué recuerda don Quijote haber hecho anteriormente?».
- **O01 correcta:** «Haber hecho un juramento relacionado con ese yelmo»; O02 falsa: «Haber recibido ese yelmo como regalo de Sancho»; O03 falsa: «Haber pactado con el barbero su entrega sin combate».
- `evidence.quote`: cita literal de I,21 que termina «sobre que yo hice el juramento que sabes», con `passage_id=DQ.P1.C21.P0003`.
- `cognitive_type=hecho`, una única respuesta correcta y sin imagen previa.

**Juicio:** solucionable con el catálogo actual, pero elimina el aprendizaje específico sobre **Sacripante** y cambia la semántica de Q.316; **no** reemplazar unilateralmente bajo el mismo ID sin la decisión R01/R02 de conservación de identidad y R09 de trazabilidad.

### Opciones editoriales C / D — traslado a I,10 o baja

- **Traslado a I,10:** formular «En I,10, al renovar su juramento de conseguir otra celada, ¿qué famoso yelmo evoca don Quijote?». Requiere `episode_id=DQ.P1.C10.E01` **candidato sin registro**, `chapter_ids=[DQ.P1.C10]`, `passage_ids=[DQ.P1.C10.P0001]` **candidato**, y `safe_after_episodes=[DQ.P1.C10.E01]` tras crear un episodio real y comprobar que el contenido se presenta. El identificador Q.316 no debe conservarse automáticamente si cambia el anclaje y la audiencia; decisión R01/R09.
- **Retirada del banco:** recomendación **operativa inmediata si no se aprueba A ni B**: no publicar ni mostrar Q.316; conservar el ID documentado como pendiente, evitando un test sin soporte canónico en el piloto.

**Dictamen A-12:** no mantener `DQ.MA.900025` como previa, ni siquiera condicional, mientras Q.316 esté bloqueada. La opción A es filológicamente preferida para preservar el objetivo original, pero no tiene GO. Una sola respuesta está marcada correcta en cada variante y las otras dos contradicen las referencias verificadas; ningún distractor se basa en una interpretación ambigua de Sacripante.

## 4. Q.318 — sujeto de la recogida, secuencia y discusión de formato

### Corrección de hechos y evidencia

**Error productivo:** opción `DQ.Q.000318.O04` afirma «don Quijote la recoge». El relato de I,21 (PG líneas 6415–6420) dice literalmente:

> «Mandó a Sancho que alzase el yelmo, el cual, tomándola en las manos, dijo:»

El pronombre «el cual» remite a **Sancho**, último destinatario de la orden. Antes, la narración confirma que el barbero se deja caer del asno, huye y **deja la bacía en el suelo**; don Quijote se contenta con ella y ordena recogerla.

La cadena completa verificada es **lluvia/rechazo de los batanes → avistamiento → acometida de don Quijote → caída, huida y abandono de la bacía por el barbero → recogida por Sancho**.

El `evidence.quote` actual de Q.318 solo recoge el comienzo de I,21 y se trunca incluso antes de completar el avistamiento. El `passage_ids` actual cita `DQ.P1.C21.P0004`, que **contiene texto de I,10, no el desenlace de I,21**. Es necesario sustituir los anclajes y ampliar la evidencia.

### Propuesta A — conservar `ordering` si rige el alcance general documentado

El **`docs/ENCARGO_MAESTRO.md` §2.2** enumera expresamente «ordenación de alternativas mediante selección/arrastre con alternativa accesible por teclado, si aporta valor». La decisión cerrada **DC-04** prohíbe respuestas escritas, no la ordenación de opciones; el esquema `QuestionType` **sí permite `ordering`** y exige `correct_order`. **No he encontrado en esas fuentes una prohibición MCQ-only vigente para todo el piloto.** Si R14 aporta un acuerdo posterior y más específico, prevalecerá después de confrontarlo formalmente. La validación del esquema, por sí sola, no sustituye el permiso editorial.

| Campo | Propuesta |
|---|---|
| `id` | `DQ.Q.000318` (mismo objetivo cognitivo de secuencia) |
| `episode_id` / `chapter_ids` | `DQ.P1.C21.E01` / `[DQ.P1.C21]` |
| `prompt` | **«Después de conocer la aventura del supuesto yelmo, ordena los hechos tal como suceden en I,21.»** |
| `interaction.type` | `ordering`, `shuffle_options=false` |
| O01 | Comienza a llover; Sancho propone entrar en los batanes y don Quijote se niega |
| O02 | Don Quijote divisa a un hombre con una cosa reluciente en la cabeza |
| O03 | Don Quijote arremete; el barbero cae del asno y huye, dejando la bacía |
| **O04 corregida** | **Por mandato de don Quijote, Sancho recoge la bacía del suelo** |
| `correct_order` | `[O01, O02, O03, O04]` (IDs completos en JSON auxiliar) |
| `rationale` | Secuencia documentada, distinguiendo al atacante (don Quijote), al fugitivo (barbero) y a quien recoge la bacía (Sancho) |
| `passage_ids` | `[DQ.P1.C21.P0001, DQ.P1.C21.P0003, DQ.P1.C21.P0006]` (**P0006 candidato**) |
| `evidence` | Cinco `cita_literal`: lluvia (P0001), avistamiento (P0003), acometida, huida y recogida (P0006). Todas cotejadas con PG #2000, texto íntegro en JSON auxiliar |
| `cognitive_type` / `difficulty` | `secuencia` / `2` |
| `spoiler_policy` | `safe_after_episodes=[DQ.P1.C21.E01]` |
| Visual | Eliminar `DQ.MA.900036` de previa; no proponer medio sustitutivo. `DQ.MA.900037` podría aparecer solo como **epílogo `post_answer` tras contestar, huir el barbero y recoger Sancho**, sujeto a R06/R12 |

**Alternativa de accesibilidad:** el formato `ordering` exige controles por teclado e indicadores legibles, según §2.2 y QA. Aunque la mecánica esté permitida en el contrato, R12 debe probarla; **ninguna aprobación editorial se presume**.

### Propuesta B — reformulación MCQ si R14 confirma restricción particular MCQ-only

Se incluye **`mcq_fallback_if_pilot_only_mcq`** como registro completo no productivo: `type=single_choice`, pregunta «¿Cuál es el orden correcto de estos hechos de la aventura del supuesto yelmo en I,21?», cuatro secuencias comparables, **única correcta O01** con orden lluvia → avistamiento → acometida/huida → Sancho recoge. O02, O03 y O04 alteran deliberadamente el orden, sin inventar un desenlace distinto. `correct_option_ids=[DQ.Q.000318.O01]`, `shuffle_options=true`; se conservan `episode_id`, `chapter_ids`, `passage_ids`, `evidence`, `rationale`, `cognitive_type=secuencia` y ausencia de pre-imagen.

**Identidad del ID:** recomendación inicial de R15: **conservar `DQ.Q.000318`** si R01/R02 confirman que el contenido y objetivo cognitivo siguen siendo los mismos y R09 establece un cambio compatible de interacción con trazabilidad de la versión editorial. **No incrementar `contract_version`** como sustituto de una versión editorial: ese campo designa el contrato técnico. Si R09 observa impactos en progreso, seguimiento de respuestas o deduplicación semántica, solicitar sustitución versionada al órgano competente; no inventar ID ni migración en esta PR. Al no existir decisión documentada MCQ-only en los documentos rectores consultados, **no se cambia el tipo de pregunta sin visado R14**.

## 5. Condiciones antispoiler y compatibilidad del piloto

| Pregunta | Estado visual | Instante mínimo requerido | Salida segura |
|---|---|---|---|
| **Q.315** | Sin previa `900036`; prohibido su `post_answer` literal (A-11) | Se han narrado lluvia, motivo del sombrero y función real de la bacía; `safe_after` de I,21 cumplido | Texto de explicación, no imagen nueva |
| **Q.316** | **SIN_IMAGEN**; `900025` no rehabilitada (A-12) | Si versión retrospectiva, el jugador ha tenido acceso a I,10 y se ha narrado la alusión en I,21; `safe_after` cumplido | **No mostrar la pregunta** hasta validación editorial y registral |
| **Q.318** | Sin previa `900036`; `900037` solo post/epílogo | Orden completo narrado hasta recogida por Sancho, `safe_after` cumplido | Texto y opciones; ninguna secuencia visual que revele la solución antes de responder |

`SIN_IMAGEN` es una instrucción de propuesta editorial y **no** un ID `MediaAsset`; en contrato el campo `pre_image_media_id` es **opcional**, por lo que se **omite** en candidatos. No escribir `SIN_IMAGEN` como valor de `pre_image_media_id`. Q.315 mantiene bloqueo contextual R12-FAIL_CTX/R01-R02-NC hasta solventar la identidad del asset o retirar su uso; Q.316 permanece R01/R02-NC y pendiente de revisión R05/R06/R12/R09. El CC visual condicionado de Q.318 en D4 **no** equivale a aprobación de la redacción original con error factual.

## 6. Verificación de integridad de la propuesta y responsables

**Comprobaciones realizadas al crear la propuesta:**
- **3 IDs únicos de pregunta** del catálogo; **2 formatos completos propuestos** para Q.318 y **2 variantes coherentes** para Q.316.
- Todas las citas del JSON de propuestas existen literalmente en el archivo PG #2000 y en el texto del pasaje señalado (existente o **candidato expresamente declarado**). La fuente **no** se ha reconstruido manualmente ni se ha pegado una frase de I,10 bajo ID de I,21.
- Para cada variante `single_choice`, exactamente **una** `correct_option_id` pertenece a sus propias opciones. Para `ordering`, `correct_order` contiene todos y solo los IDs de las opciones.
- Los `passage_id` candidatos **no** están presentes en el catálogo productivo; las propuestas que dependen de ellos no están listas para importar directamente a runtime.

**Visados y bloqueos para liberar producción:**

| Responsable | Pendiente obligatorio |
|---|---|
| **R01/R02 — Editorial y filología** | Revisar tres enunciados, literalidad de evidencias, atribución I,10/I,21, plausibilidad y unicidad de distractores, opción A/B de Q.316 y alcance MCQ-only vs `ordering` junto a R14 |
| **R12 — QA/accesibilidad** | Revalidar A-11/A-12, momentos de disparo, opción `ordering` por teclado, fallback MCQ, ausencia de revelaciones, legibilidad sin imagen |
| **R05/R06 — Curaduría/arte** | Mantener prohibición de literalizar `900036`; revisar cualquier epílogo futuro con `900037`, sin alterar assets |
| **R09 — Integración posterior** | Conciliar IDs/altas de pasajes I,10/I,21, compatibilidad de referencias y tipo de interacción, progreso/versionado, efecto de la ausencia de `pre_image_media_id` |

**Alcance Git:** este PR **solo añade** el presente documento y `docs/data/propuestas_editoriales_q315_q316_q318_r15.json`. Ningún JSON de pregunta, pasaje, episodio, capítulo, opción ni MediaAsset productivo se ha editado; ningún contrato, esquema, recurso o enlace visual se ha actualizado; ninguna imagen se ha generado. **No fusionar ni aplicar automáticamente los candidatos.**

**Dictamen R15:** propuestas **completas y preparadas para R01/R02**; Q.315 y Q.318 técnicamente condicionadas al alta editorial de nuevos pasajes, Q.316 retrospectiva condicionada además al capítulo I,10 y su presentación; **SIN GO** de publicación hasta resolver dependencias y pasar los visados.
