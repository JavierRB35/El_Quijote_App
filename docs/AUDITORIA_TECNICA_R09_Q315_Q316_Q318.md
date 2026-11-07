# R09 — Auditoría técnica de integración Q.315 / Q.316 / Q.318 (encargo P0)

**Responsable:** R09 — Desarrollo y Contratos · **Autorización:** R14 · **Prioridad:** P0 · **Fecha:** 2026-11-07
**Modalidad:** auditoría y propuesta. **No se ha ejecutado ninguna integración productiva.**
**SHA de referencia verificado en GitHub:** `fafbea20974c7452ddb8e1dcc20e244b55908014` (merge de PR #49; CI `validar-contrato` [run 42357944146 — success](https://github.com/JavierRB35/El_Quijote_App/actions/runs/42357944146)). Sincronizado localmente y comprobado vigente antes de empezar (`git ls-remote` ≡ local).

**Registro de fuentes consultadas (repositorio remoto, no copias):** `docs/SUBSANACION_EDITORIAL_R15_Q315_Q316_Q318.md`; `docs/data/propuestas_editoriales_q315_q316_q318_r15.json`; `docs/PAQUETE_REVISION_EDITORIAL.md` (§D4, filas A-09…A-14); `content/piloto/package.json`; `content/piloto/questions/DQ.Q.000313–000318.json` y catálogo completo (74 preguntas); `content/piloto/passages/DQ.P1.C21.P0001–P0004.json` (54 pasajes); `content/piloto/episodes/DQ.P1.C21.E01.json`; `content/piloto/chapters/DQ.P1.C21.json`; `content/piloto/media_assets/DQ.MA.900025/900036/900037.json`; `schemas/content/{question,passage,_definitions}.schema.json`; `schemas/player/profile.schema.json`; `tools/editorial_validation/{validate.py,cotejar_texto_referencia.py}`; `tests/dev/{fts5_castellano_aureo.py}`; `app/src/{App.tsx,contrato.ts}`; `app/src-tauri/src/lib.rs`; `docs/ENCARGO_MAESTRO.md` (§2.2: «Ordenación de alternativas mediante selección/arrastre con alternativa accesible por teclado», y accesibilidad §afines); `content/textos/gutenberg_2000/El_Quijote.txt` (2.130.032 chars, LF).

---

## 1. Diagnóstico técnico individual

### Q.315 (bacía: motivo del barbero)

| Aspecto | Estado actual (`fafbea2`) | Propuesta R15 | Verificación R09 |
|---|---|---|---|
| `passage_ids` | `[P0003]`; la cita se trunca en «el barbero del mayor servía» — **no alcanza el motivo de la bacía** | `[P0003, P0005]`, evidencia en P0005 | P0005 candidato inexistente (alta necesaria); su texto contiene el motivo completo |
| `pre_image_media_id` | `DQ.MA.900036` (A-11: FAIL_CTX/NC) | **omitido** | Candidata sin `pre_image_media_id`; `900036` no se solicita en la prueba funcional |
| Opciones | O02/O03 actuales no evidenciadas por el pasaje citado | 3 opciones, O01 única correcta | Esquema+semántica OK; distractors falsos respecto del texto literal |
| Citas | — | 1 `cita_literal` (46 palabras) | **Subcadena exacta de PG #2000 y del texto candidato** (coincidencia verificada programa­ticamente; LF) |
| `semantic_key` | `mambrino bacía azófar lluvia sombrero` | `…lluvia sombrero motivo` | Sin colisión en los 74 registros (deduplicación del validador OK) |
| Momento narrativo | solo `safe_after_episodes` | tras narrar lluvia/motivo | Sin mecanismo de beat por pregunta (§5): **gate no acreditable hoy por datos** |

### Q.316 (juramento previo, variante B)

| Aspecto | Estado actual | Propuesta R15 (B) | Verificación R09 |
|---|---|---|---|
| `passage_ids`/evidencia | `[P0004]` — **P0004 contiene texto de I,10** y se corta antes de la mención a Sacripante; **no evidencia ni siquiera la respuesta actual** | `[P0003]`, cita I,21 «…sobre que yo hice el juramento que sabes» | Cita exacta en PG (offsets ~6356–6358) **y** dentro de `P0003.text_original` |
| Sacripante en I,21 | El enunciado actual lo presupone | Eliminado expresamente | Ni `prompt` ni opciones ni `rationale` de la variante B contienen «Sacripante» (verificado) |
| `pre_image_media_id` | `DQ.MA.900025` (A-12: NC) | **omitido (SIN_IMAGEN)** | Candidata sin pre; no rehabilita `900025` |
| `semantic_key` | `mambrino precedente sacripante palmerín` | `mambrino i21 alusion juramento previo sin sacripante` | Sin colisión; núcleo semántico (juramento previo/yelmo) se conserva |
| Identidad/progreso | mismo ID, mismos IDs de opción O01–O03 | conservar ID condicionado | Análisis en §4 (persistencia por ID probada) |
| Variante retrospectiva I,10 | — | NO seleccionada | `DQ.P1.C10.P0001` no existe; **no se incorpora**; capítulo `DQ.P1.C10` ausente del paquete (solo existe `DQ.P2.C10`) |

### Q.318 (secuencia, `ordering`)

| Aspecto | Estado actual | Propuesta R15 | Verificación R09 |
|---|---|---|---|
| O04 | **Error factual**: «don Quijote la recoge» | «Por mandato de don Quijote, Sancho recoge la bacía del suelo» | PG 6415–6420: «Mandó a Sancho que alzase el yelmo, el cual, tomándola en las manos, dijo» |
| `passage_ids` | `[P0001, P0002, P0004]` (P0004 = texto I,10) | `[P0001, P0003, P0006]` | P0006 candidato (alta necesaria); P0004 queda fuera |
| `evidence` | 1 cita truncada («…como si fuera de») | 5 citas (P0001/P0003/P0006×3) | Las 5 exactas en PG y en pasaje; **pero 3 comparten `kind`+`passage_id` → claves React duplicadas** (ver §5, riesgo R-3) |
| `interaction` | `ordering`, `shuffle=false`, `options`≡`correct_order` | idéntico patrón | Patrón sistémico: las 4 `ordering` del catálogo (108, 225, 318, 324) almacenan `options == correct_order` con `shuffle=false` |
| Orden inicial de presentación | **= orden correcto** (probado) | misma condición | **Bloqueo confirmado con prueba ejecutable** (§5) |
| `pre_image_media_id` | `DQ.MA.900036` | omitido; `900037` solo epílogo post | Sin pre; **el contrato no tiene campo `post_*`** → epílogo no implementable hoy |

## 2. Informe específico: pasaje P0004 y sus dependencias

**Contenido real:** `DQ.P1.C21.P0004` (`chapter_id=DQ.P1.C21`) tiene `position {152538, 156012}` — que **corresponde a I,10** (verificado: el texto está en el offset declarado del fichero PG del repo; los pasajes C21 auténticos viven en offsets ~332k–338k). Su `text_original` es el diálogo de I,10: bálsamo de Fierabrás, juramento al «grande marqués de Mantua», y termina en «…otra celada tal y tan buena como ésta a algún caballero» — **antes** de «…sobre el yelmo de Mambrino, que tan caro le costó a Sacripante». El `anchor` interno («la leyenda de Mambrino») es engañoso: la posición y el texto son I,10.

**Referencias entrantes (inventario completo, `content/`):**
| Consumidor | Uso de P0004 | Impacto si se toca P0004 |
|---|---|---|
| `content/piloto/package.json` | `files.passages` | alta/baja de la ruta |
| `episodes/DQ.P1.C21.E01.json` | `passages[3]` | crossref del episodio |
| `questions/DQ.Q.000316.json` | `passage_ids` + `evidence[].passage_id` con cita | la propuesta R15-B lo elimina ya |
| `questions/DQ.Q.000318.json` | `passage_ids` (sin cita suya) | la propuesta R15 lo elimina ya |
| `questions/DQ.Q.000317.json` | `passage_ids` (evidencia cita **P0002**, no P0004) | **fuera del alcance de este encargo**; solo afecta si P0004 se retirase del paquete |

**Opciones de subsanación (ninguna ejecutada; decisión R14/R01/R02):**
1. **Recomendada — conservar el registro, corregir la atribución referencial:** mantener `P0004` intacto (trazabilidad e identidad histórica; su `sha256` y `position` son coherentes con I,10), (a) aplicar las propuestas R15 que ya lo desligan de Q.316/Q.318; (b) añadir en `anchor` una nota documental de mis-atribución; (c) dejar el alta de `DQ.P1.C10.P0001` (texto ya localizado en PG offset 155723) para un encargo posterior coordinado con R01/R02, con eventual re-etiquetado/re-anclaje de P0004 (requeriría nuevo ID correcto o decisión de conservación documentada, porque el patrón del ID codifica el capítulo).
2. **Retirada total** de P0004 (episode+package): **bloqueada hoy** — rompería `REFERENCE_ERROR` a Q.317 (fuera de alcance, sin visado para tocarla).
3. **Corrección silenciosa del texto** (re-anclar P0004 a contenido real de I,21): **descartada** — destruiría la identidad histórica del registro y la trazabilidad de las citas ya publicadas en docs/PRs.

## 3. Propuesta de alta de P0005 / P0006 (campos calculados y verificados)

Convenciones verificadas sobre el catálogo real: `position` = offsets de caracteres **en `content/textos/gutenberg_2000/El_Quijote.txt` (LF, 2.130.032 chars)** con `end−start = len(text_original)`; `sha256` = SHA-256 UTF-8 de `text_original` (match probado en P0003); `text_indexable` = minúsculas + puntuación/símbolos→espacio **conservando letras con diacríticos y la comilla recta `"`** + colapso de espacios (regla inferida y validada contra P0003/P0001/C08.P0001).

| Campo | DQ.P1.C21.P0005 | DQ.P1.C21.P0006 |
|---|---|---|
| `chapter_id` | `DQ.P1.C21` (existe) | `DQ.P1.C21` |
| `position` | `{336432, 337042}` (610 chars) | `{337312, 338358}` (1.046 chars) |
| `sha256` | `sha256:e4b5c6e0af0bddfe06935f98855b1c07379237ffc1a50232dd56f5c43d9ddc3c` | `sha256:e2b0185f4e906fe03144adf06d775f23e9135ffb01a1d4c6512ec066195631d9` |
| `anchor` (propuesto) | `PG 2000 (DQ.SRC.0005) offset 336432-337042; ed. lector: EPUB Tusell (DQ.ED.0001) — narración de identidad y motivo de la bacía` | `…offset 337312-338358; … — ataque, huida, bacía abandonada y recogida por Sancho` |
| Solapes | Solapa 248 chars con el final de P0003 [333797–336680] — **patrón ya existente** (P0003 solapa P0001/P0002) | Sin solape con P0003; hueco 337042–337312 sin cubrir (continuación no necesaria para las propuestas) |
| Texto | Verificado: subcadena exacta de PG; la frase clave «bacía de azófar» **no existe en ningún pasaje actual** | Verificado: subcadena exacta de PG |

**Archivos que la futura PR productiva debe tocar (alta):**
1. `content/piloto/passages/DQ.P1.C21.P0005.json` (nuevo — campos de la tabla; `text_original` literal del JSON R15).
2. `content/piloto/passages/DQ.P1.C21.P0006.json` (nuevo — ídem).
3. `content/piloto/episodes/DQ.P1.C21.E01.json`: añadir los 2 IDs a `passages`.
4. `content/piloto/package.json`: añadir 2 rutas a `files.passages`; `counts.passages` 54→56.
5. `content/piloto/questions/DQ.Q.000315.json`, `DQ.Q.000316.json`, `DQ.Q.000318.json`: sustituir por las candidatas R15 (sin `pre_image_media_id`).

**Evidencia de integrabilidad (ejecutada sobre copia temporal, repo intacto):**
- S0 (preguntas sin alta): validador de paquete → **6 REFERENCE_ERROR**, todos sobre P0005/P0006. **Q.316-B pasa incluso sin alta** (solo usa P0003).
- S1 (alta completa): **`package.json: VÁLIDO`** — esquema, semántica (incl. `correct_order` completo, unicidad de `semantic_key`, pre-imágenes), crossrefs y deduplicación OK para los 74+2 registros; sin regresión en las 71 preguntas no modificadas.
- Cotejo textual post-integración (mismo método de CI): **136/136 OK** (130 actuales + 2 pasajes + 4 evidencias nuevas); 0 variantes.

## 4. Q.316 — identidad y progreso (mantener el mismo ID)

**Qué existe realmente (consumidor Fase 1, `app/`):**
- Persistencia: `progreso.json` en el directorio de datos de la app (Tauri, escritura atómica tmp→validar→rename, `lib.rs` §EF-AV-08). Forma: `{ [question_id]: { acierto: bool, seleccion: string[] } }`.
- Restauración (`App.tsx`): filtra por IDs presentes en el catálogo y retoma en la primera pregunta sin responder.
- Historial de respuestas: **solo** ese fichero local; no hay servidor, ni base de datos de estadísticas, ni perfiles activos (`profile.schema.json` existe pero el reproductor no implementa perfiles; además el esquema `Profile` no guarda respuestas por pregunta).
- Estadísticas: contador de aciertos solo en sesión (`aciertos`).
- Deduplicación: la única que existe es la **validación de `semantic_key` único** en `validate.py` (nivel paquete) — sin colisión con las claves propuestas.
- `semantic_key` no se consume en runtime (grep en `app/`: cero usos); `contract_version` es técnico (1.0.0 soportada; no incrementar como versión editorial — conforme con R15).

**Determinación:** mantener `DQ.Q.000316` **es seguro técnicamente** y sin migración de datos:
1. La restauración valida por ID y por forma (`Array.isArray(seleccion)`); la candidata mantiene `id` y los IDs de opción `O01–O03` → ninguna respuesta guardada se descarta ni rompe.
2. Efecto semántico residual: una partida antigua que respondiera la Q.316 «Sacripante» aparecería como respondida (con su `acierto` almacenado) sobre la redacción nueva. Como los IDs de opción se reutilizan, ni siquiera hay referencias huérfanas; solo una correspondencia opción↔texto distinta. **Sin GO runtime ni despliegue, ese fichero solo existe en entornos de desarrollo** — riesgo práctico nulo hoy; conviene declararlo y, si se desea limpieza, borrar `progreso.json` de desarrollo en la futura PR (acción local, no de catálogo).
3. No se necesita estrategia de versionado ni migración; si Coordinación quisiera trazabilidad editorial, el campo `review` (state/reviewer/date) de la pregunta es el lugar natural, sin tocar contrato.

**Condiciones:** publicar Q.316-B solo tras (a) el gate narrativo real («tras narrar la alusión al juramento en I,21») — hoy sin mecanismo de datos (§5); (b) QA R12 de antispoiler; y sin reintroducir Sacripante (verificado).

## 5. Q.318 — viabilidad de `ordering` con orden inicial no resuelto

**Consumidor identificado:** reproductor Fase 1 (`app/src/App.tsx`, React+Tauri), con `ordering` implementado (selección secuencial por clic; `verificar()` compara `seleccion` vs `correct_order` por IDs). Hay 4 preguntas `ordering` en el catálogo y una **jugable hoy** (Q.000108 en el episodio inicial C08).

**Prueba reproducible ejecutada (arnés Vitest+jsdom en directorio externo al repo; se carga el `App.tsx` real del repo sin una línea modificada, con el IPC de Tauri simulado y los datos reales del paquete): 4/4 PASS.** Evidencias:
- **D1** — Q.000108: el orden inicial de presentación es el array almacenado = `correct_order`; pulsar de arriba abajo sin leer acierta. **El bloqueo declarado por R15/R14 es real, sistémico y reproducible** (las 4 `ordering` comparten patrón).
- **D2** — la evaluación es por IDs (`correct_order`): un orden de clic no canónico falla aunque contenga las mismas opciones → **una presentación inicial no resuelta no rompe contrato, persistencia ni verificación**.
- **D3** — la candidata R15 de Q.318 es consumible por el componente actual y reproduce D1.
- **ACC** — foco con Tab y Enter añade al orden (botones nativos); **no existe reordenación** salvo «Comenzar de nuevo el orden» (reset completo); sin arrastre ni teclas de movimiento.
- Alcance honesto: prueba a nivel de componente con WebView simulado (jsdom). La **prueba GUI completa en el runtime Tauri real queda PENDIENTE** (toolchain Rust/cargo no disponible en este entorno); no se declara GO de accesibilidad: eso corresponde a R12.

**Determinación:** el reproductor **SÍ implementa `ordering`, pero NO implementa un orden inicial no resuelto** → estado exacto exigido por el encargo: funcionalidad parcialmente implementada; la capacidad exigida por R14/R15 (mostrar inicialmente las opciones en orden distinto del correcto, conservando IDs/`correct_order`/contrato/persistencia/accesibilidad) **no está implementada hoy**: **NO IMPLEMENTADO / PRUEBA FUNCIONAL PENDIENTE** en el runtime Tauri.

**Solución técnica mínima propuesta (sin tocar esquema ni `correct_order` ni IDs):**
- El contrato no define el orden de presentación cuando `shuffle_options=false` (solo prohíbe cambiar IDs; comentario del esquema: «El orden visual puede aleatorizarse; NUNCA cambia los identificadores»). El validador **no comprueba** el orden del array `options` ni el valor de `shuffle_options` (brecha documentada en §6).
- Opción A (recomendada, 0 cambios de contrato/datos): el **presentador** deriva un orden de presentación inicial determinista ≠ resuelto (permutación fija sembrada por hash estable del `question_id`, idéntica en cada ejecución; no aleatoria en runtime ⇒ honesta con `shuffle_options=false`), y muestra indicación explícita de posición. Evaluación, persistencia y accesibilidad quedan intactas (probado en D2/ACC).
- Opción B (datos, sin esquema): almacenar `interaction.options` en orden fijo no resuelto en el JSON de la pregunta (el esquema no exige orden). Requiere tocar la pregunta productiva y rompe el patrón sistémico de autoría; menos recomendable.
- En ambos casos: pendiente implementación del reproductor (no autorizada en este encargo) + verificación R12 (teclado, foco, indicación de posición, lectores de pantalla) sobre el runtime real.

**Nota adicional (hallazgo de la prueba):** las 3 evidencias de Q.318 con el mismo par `kind`+`passage_id` (`cita_literal`+P0006) generan **claves React duplicadas** (`App.tsx:476`: `key={ev.kind + (ev.passage_id ?? '')}`) — React advierte «children may be duplicated/omitted». No bloquea el contrato (el esquema permite repeticiones), pero es un defecto de robustez del reproductor a resolver (clave por índice) o de composición de evidencias (fusionar citas de P0006), a decidir en la futura PR con R14/R15.

## 6. Antispoiler y referencias visuales (verificación técnica)

| Exigencia R14 | Verificación | Resultado |
|---|---|---|
| Eliminar imágenes previas prohibidas | Las 3 candidatas **omiten** `pre_image_media_id` (campo ausente, no `SIN_IMAGEN` como valor — correcto por contrato) | **OK** |
| No usar `900036` como post literal de Q.315 | No hay mecanismo `post_*` en el contrato; candidata no lo menciona; prueba funcional: `900036` nunca solicitado | **OK** |
| No rehabilitar `900025` para Q.316 | Candidata sin pre; activos `900025/900036/900037` intactos en catálogo (sin tocar) | **OK** |
| No mostrar Q.318 antes de narrar la recogida por Sancho | `safe_after_episodes=[DQ.P1.C21.E01]` solo; **no existe gate por beat** (sin `beats` en el paquete v1.0.0; sin campo de gate por pregunta en el contrato) | **NO ACREDITABLE POR DATOS HOY** — requiere mecanismo futuro (beats/v1.1 o gate en reproductor) y QA R12 |
| No usar `900037` antes del momento permitido | **Hallazgo ejecutable (E1):** con el modelo de escena persistente del reproductor, al omitir la pre de Q.318, la escena mostrada durante Q.318 **antes de responder** es la heredada de Q.317: **`900037`** (URI `…p1_c21_sancho_bacia_examen_post.webp`). Igual para Q.315/Q.316: heredan `900025` de Q.313/Q.314. | **RIESGO REAL** — la omisión de pre NO equivale a «sin imagen»; exige decisión: pre explícita segura, o mecanismo de escena por pregunta, o aplicar §D4 completo (A-09…A-13 retiran TODAS las pre de C21 → episodio sin escenas pre) |
| Restricciones por episodio vs por beat | `safe_after_episodes` = por episodio (lista). Por beat/hecho narrativo: **no existe representación en contrato v1.0.0**; §D4 lo confirma («el mero paso de respuesta o safe_after_episodes no basta») | Confirmado; `safe_after` **no acredita** cronología intrapregunta |

## 7. Qué detectan realmente los validadores (relevante para esta integración)

**Detectan:** esquemas (campos/regex/patrón `sha256:`/posición entera); semántica de pregunta (prefijo e unicidad de opciones, correctas por tipo, **`correct_order` = todas las opciones exactamente una vez** — único guard real del ordering, hotspot en rango, certeza vs interpretación); **crossrefs de paquete** (episode/chapters/passage_ids/pre/hotspot/evidence); duplicación de `semantic_key`; pre-imagen con `spoiler_level ≠ ninguno`; beats v1.1 (fuera del paquete piloto actual).

**NO detectan (brechas que esta auditoría cubre manualmente):** valor de `shuffle_options` (ni esquema ni semántica — la «obligación» `shuffle_options=false` para ordering es convención documental, no verificada); orden del array `options` vs `correct_order`; `evidence.quote` ∈ pasaje citado (el cotejo de CI compara citas con el texto completo PG, no con el pasaje declarado, y no valida el enlace `passage_id↔quote`); recomputación de `sha256` contra `text_original`; validez de `position` contra la fuente; derivación de `text_indexable`; `counts` del manifest vs ficheros reales; pasajes huérfanos (no listados en ningún episodio); gates narrativos por beat (no existen).

## 8. Matriz PASS / FAIL / PENDIENTE

| Área | Prueba | Estado |
|---|---|---|
| Esquemas/contrato | Suite canónica sobre `fafbea2` | **PASS 53/53** (local) · CI main [42357944146] success |
| Paquete actual | `validate.py package` real | **PASS (VÁLIDO)** |
| Cotejo textual actual | `cotejar_texto_referencia` real | **PASS 130/130** |
| FTS5 (independiente de alta) | `fts5_castellano_aureo` | **PASS 9/9** (muestras embebidas) |
| Citas R15 | 7 citas vs PG y vs pasaje | **PASS 7/7 exactas** |
| Convenciones de pasaje | sha256/position/indexable vs catálogo | **PASS** (reglas verificadas) |
| Colisiones | IDs P0005/P0006/C10.P0001 y `semantic_key` (candidatas + variantes) | **PASS sin colisiones** |
| Integrabilidad sin alta | S0: paquete con candidatas | **FAIL esperado: 6 REFERENCE_ERROR** (demuestra que no es importable antes del alta) |
| Integrabilidad con alta | S1: paquete simulado completo | **PASS (VÁLIDO)** — sin regresión en 71 preguntas no tocadas |
| Cotejo post-integración | simulación S1 | **PASS 136/136** |
| Compatibilidad de candidata con reproductor | Arnés funcional App.tsx real | **PASS 4/4** (D1, D2, D3/E1, ACC) |
| Presentación `ordering` orden no resuelto | runtime Tauri real | **PENDIENTE — NO IMPLEMENTADO en el reproductor** (propuesta §5-Opción A) |
| Accesibilidad GUI real (teclado/foco/lector) | WebView Tauri | **PENDIENTE (R12)** — toolchain Rust no disponible; jsdom solo básico |
| Gate narrativo por beat (Q.315/316/318) | datos/runtime | **PENDIENTE** — no existe en contrato v1.0.0 ni en el paquete |
| Epílogo `post_answer` con `900037` | contrato/reproductor | **PENDIENTE** — sin campo `post_*`; sin mecanismo por pregunta |
| Persistencia tras cambio semántico Q.316 | runtime con datos reales de usuario | **PENDIENTE (bajo riesgo)** — análisis §4; solo datos locales de desarrollo |
| Antispoiler visual real (imágenes, momentos) | QA R12 | **PENDIENTE (R12)** |
| Deduplicación y claves de evidencia | reproductor | **ADVERTENCIA** — claves React duplicadas con la evidencia R15 de Q.318 (§5) |

## 9. Inventario exacto de archivos de la futura PR productiva

**Núcleo (alta + correcciones, tal como §3):** 2 pasajes nuevos; `episodes/DQ.P1.C21.E01.json`; `package.json` (files+counts); 3 preguntas (`DQ.Q.000315/000316/000318.json`).
**Documental recomendada en la misma PR:** nota de mis-atribución en `passages/DQ.P1.C21.P0004.json` (solo `anchor`, opción §2-1b) — requiere visado.
**Reproductor (PR técnica separada, no incluida):** orden inicial no resuelto (§5-A), clave de evidencia por índice, decisión sobre escena persistente C21 (pre explícitas o mecanismo nuevo), gate por beat si se aprueba.
**Excluidos por mandato:** `DQ.P1.C10.*`, Q.317, visados, matrices, MediaAssets, imágenes, esquemas, TS-001, ADR-0005/H5.

## 10. Riesgos, dependencias y orden recomendado

| # | Riesgo/dependencia | Mitigación |
|---|---|---|
| R-1 | Sin gate por beat, Q.315/316/318 aparecerían tras responder la pregunta anterior (modelo actual) — cronología intrapregunta no acreditada | Decisión R14: aceptar gate por orden de preguntas (débil), o habilitar beats/gate antes de publicar C21; R12 QA de momentos |
| R-2 | Herencia de escena muestra `900037` durante Q.318 (y `900025` durante 315/316) antes de responder | Aplicar §D4 completo en C21 (retirar todas las pre) o pre explícita segura por pregunta; decidir con R06/R12 |
| R-3 | Claves React duplicadas con 3 evidencias de P0006 en Q.318 | Cambiar `key` a índice (reproductor) o fusionar evidencias (editorial); decidir antes de fusionar la PR productiva |
| R-4 | `ordering` sin orden inicial no resuelto | Implementar §5-A (reproductor, PR técnica) + prueba R12 sobre runtime; sin ello **SIN GO** (ya declarado) |
| R-5 | P0004 y Q.317 (fuera de alcance) | No retirar P0004 del paquete sin visado que cubra Q.317; nota documental mientras tanto |
| R-6 | Brechas de validador (citas↔pasaje, sha256, offsets, counts) no automatizadas | Para la futura PR: re-ejecutar los chequeos de esta auditoría (§8) o incorporarlos al validador (PR técnica aparte) |

**Orden recomendado:** (1) fusión de esta auditoría (documental); (2) decisión R14 sobre R-1/R-2/R-3 y sobre §2 (P0004); (3) PR productiva documental-content (alta P0005/P0006 + 3 preguntas + episodio + package) con re-ejecución de S1+cotejo; (4) PR técnica del reproductor (orden inicial + clave evidencia + escenas); (5) QA R12 sobre runtime real (teclado/foco/momentos); (6) entonces, y solo entonces, valoración de GO de contenido C21.

## 11. Dictamen

**INTEGRABLE CON CONDICIONES.** Las propuestas R15 son filológica y estructuralmente correctas (citas exactas verificadas, sin colisiones, consumibles por el contrato y por el reproductor actual tras el alta de P0005/P0006, simulación S1 válida y cotejo 136/136). Las condiciones para publicar siguen siendo las ya declaradas (R14/R15/R01/R02/R12) más las tres halladas aquí: resolver R-1 (gate narrativo), R-2 (herencia de escenas) y R-3 (claves de evidencia), e implementar el orden inicial no resuelto de `ordering` (§5-A) con su prueba en runtime real. **No se ha ejecutado integración productiva alguna; el repositorio permanece intacto.**

---

*Trazabilidad R09: informe generado a partir del estado verificado de GitHub `fafbea20974c7452ddb8e1dcc20e244b55908014`; simulación y arnés funcional en directorios de trabajo externos al repositorio; ningún fichero productivo modificado.*
