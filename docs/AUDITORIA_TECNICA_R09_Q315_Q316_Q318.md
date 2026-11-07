# R09 — Auditoría técnica de integración Q.315 / Q.316 / Q.318 (encargo P0)

**Responsable:** R09 — Desarrollo y Contratos · **Autorización:** R14 · **Prioridad:** P0 · **Fecha:** 2026-11-07
**Modalidad:** auditoría y propuesta. **No se ha ejecutado ninguna integración productiva.**
**SHA de referencia verificado en GitHub:** `fafbea20974c7452ddb8e1dcc20e244b55908014` (merge de PR #49; CI `validar-contrato` [run 42357944146 — success](https://github.com/JavierRB35/El_Quijote_App/actions/runs/42357944146)). Sincronizado localmente y comprobado vigente antes de empezar (`git ls-remote` ≡ local).

> **RECTIFICACIÓN FOCALIZADA (orden R14 sobre esta PR):** tras la revisión R14 se re-verificó todo contra `main` vigente `03829bc1fbca8f6d4ddac2a6f0d0dff80926389b` (avance `fafbea2..03829bc` = entrega documental R11/PR #50, **sin cambios** en `schemas/content/question.schema.json`, `app/src/App.tsx`, `validate.py` ni las preguntas). Correcciones introducidas en este documento:
> 1. **El esquema SÍ contiene la regla `if/then` para `ordering`** (`/properties/interaction/allOf[4]`): exige `correct_order`, restringe `shuffle_options` a `const false` **cuando se declara**, y `options.minItems 3`. La afirmación inicial de este informe de que «no hay condicionales if/then» era **errónea** (se buscaron condicionales solo en el nivel superior). Probado empíricamente (CASO1 «False was expected»; CASO3 «'correct_order' is a required property»).
> 2. Evaluación formal de las dos soluciones de presentación inicial (`A` datos / `B` presentador) con recomendación **A**, validada ahora también funcionalmente (D4a/D4b) y contra el validador de paquete (S2 VÁLIDO).
> 3. P0004/Q.317: medida transitoria, incidencia referencial **no cerrada**; decisión editorial R01/R02 sobre Q.317 requerida.
> 4. Q.316: distinción compatibilidad estructural vs semántica; necesidad futura de invalidación/versionado; sin autorización de borrado de progreso.
> 5. Antispoiler: añadido explícitamente que el **episodio C21 no es jugable** en el consumidor actual y que el PASS del validador **no equivale** a experiencia narrativamente segura.

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
1. **Recomendada como MEDIDA TRANSITORIA — conservar el registro, corregir la atribución referencial:** mantener `P0004` intacto (trazabilidad e identidad histórica; su `sha256` y `position` son coherentes con I,10), (a) aplicar las propuestas R15 que ya lo desligan de Q.316/Q.318; (b) añadir en `anchor` una nota documental de mis-atribución; (c) dejar el alta de `DQ.P1.C10.P0001` (texto ya localizado en PG offset 155723) para un encargo posterior coordinado con R01/R02, con eventual re-etiquetado/re-anclaje de P0004 (requeriría nuevo ID correcto o decisión de conservación documentada, porque el patrón del ID codifica el capítulo). **Esta medida NO cierra la incidencia referencial: la inconsistencia ID/capítulo (C21) ↔ texto/fuente (I,10) permanece mientras el registro siga así; la nota documental solo la hace visible y trazable.**
2. **Retirada total** de P0004 (episode+package): **bloqueada hoy** — rompería `REFERENCE_ERROR` a Q.317 (fuera de alcance, sin visado para tocarla).
3. **Corrección silenciosa del texto** (re-anclar P0004 a contenido real de I,21): **descartada** — destruiría la identidad histórica del registro y la trazabilidad de las citas ya publicadas en docs/PRs.

**Estado preciso de la incidencia: NO CERRADA.** Para su resolución definitiva se requieren:
- **Decisión editorial R01/R02 sobre Q.317:** Q.317 declara `passage_ids=[P0002, P0004]` pero su evidencia cita exclusivamente P0002 (I,21, diálogo de Sancho); **ninguna cita de Q.317 proviene de P0004**. R01/R02 deben pronunciarse sobre si la asociación documental de Q.317 con P0004 tiene alguna justificación (todo indica que es residuo de la misma ola de mis-atribución) y autorizar eliminar P0004 de sus `passage_ids`, dejando `[P0002]` que ya sostiene su evidencia.
- **Resolución definitiva de P0004 (vía coordinada, con visado, en encargo futuro):** (i) alta de `DQ.P1.C10.P0001` (texto I,10 exacto, offset 155723) como pasaje correctamente atribuido; (ii) actualización de los `passage_ids` restantes que aún lo citen (solo Q.317 tras la decisión anterior); (iii) **retirada de P0004 del paquete** (quitar de `episode.passages` y `files.passages`; el registro histórico permanece en la historia git) o, si Curaduría prefiere conservarlo, re-clasificación documental explícita como extracto I,10 bajo ID C21, que seguiría siendo una inconsistencia estructural asumida y rotulada. La alternativa de redefinir el texto de P0004 a contenido real de I,21 rompería su identidad (`sha256`) y la trazabilidad de citas publicadas: solo procedería con autorización expresa y documentación de migración.

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

**Determinación (matizada tras la orden R14):** mantener `DQ.Q.000316` es **compatible estructuralmente**, no semánticamente:
1. **Compatibilidad estructural — garantizada:** la restauración valida por ID de pregunta y por forma (`Array.isArray(seleccion)`); la candidata conserva `id` y los IDs de opción `O01–O03` → ninguna respuesta guardada produce referencias huérfanas, fallos ni corrupción.
2. **Compatibilidad semántica — NO garantizada:** una respuesta histórica (`acierto`, `seleccion`) fue emitida sobre otro contenido (la formulación «Sacripante»); tras el cambio, el mismo ID y los mismos IDs de opción remiten a textos y a un objetivo cognitivo distintos. El progreso almacenado quedaría asignado a un contenido semánticamente diferente — es exactamente el riesgo que la orden R14 señala.
3. **Ausencia de datos desplegados de usuarios:** acreditada en los canales oficiales de distribución — no existe GO runtime, ni empaquetado/release, ni distribución del reproductor; `progreso.json` solo surge en ejecuciones de desarrollo del repositorio. R09 no puede acreditar qué ficheros locales existen en entornos de desarrollo individuales.
4. **Necesidad futura:** si el piloto llega algún día a jugadores reales tras este cambio semántico, se requerirá **invalidación selectiva, versionado editorial o migración** del progreso de Q.316 (p. ej., marcador de revisión editorial en `review`, o comparación con `catalog_version_seen` del esquema `Profile`, hoy no implementado). No existe hoy ningún mecanismo; decidirlo antes de cualquier publicación a usuarios.
5. **No se autoriza ni se propone el borrado de ficheros de progreso** (se retira la sugerencia en ese sentido de la versión previa de este informe); cualquier tratamiento del progreso será decisión de Coordinación.

**Condiciones:** publicar Q.316-B solo tras (a) el gate narrativo real («tras narrar la alusión al juramento en I,21») — hoy sin mecanismo de datos (§5); (b) QA R12 de antispoiler; (c) decisión de Coordinación sobre el tratamiento del progreso histórico si existieran datos de usuarios; y sin reintroducir Sacripante (verificado).

## 5. Q.318 — viabilidad de `ordering` con orden inicial no resuelto

**Consumidor identificado:** reproductor Fase 1 (`app/src/App.tsx`, React+Tauri), con `ordering` implementado (selección secuencial por clic; `verificar()` compara `seleccion` vs `correct_order` por IDs). Hay 4 preguntas `ordering` en el catálogo y una **jugable hoy** (Q.000108 en el episodio inicial C08).

### 5.1 Las cinco capas (distinción exigida por R14)

| Capa | Qué establece realmente (verificado sobre `main` vigente) |
|---|---|
| **1. JSON Schema** (`schemas/content/question.schema.json`, `/properties/interaction/allOf[4]`) | **SÍ existe la regla `if/then`**: si `type=ordering` → `correct_order` es **required**, `shuffle_options` debe ser `const false` **cuando se declara**, y `options.minItems 3` (idéntico patrón para `matching` en `allOf[5]`). **NO** existe regla alguna que vincule el **orden** del array `options` con `correct_order`. *Corrección respecto de la versión previa de este informe, que negaba el condicional.* |
| **2. Validador semántico** (`validate.py`) | Para `ordering`: `correct_order` debe contener TODAS las opciones exactamente una vez (igualdad de conjuntos). No añade restricción sobre `shuffle_options` (esa es capa 1) ni sobre el orden de `options`. |
| **3. Orden de almacenamiento de `interaction.options`** | **Convención de autoría, no regla**: las 4 `ordering` del catálogo (Q.000108, Q.000225, Q.000318, Q.000324) almacenan `options` en el mismo orden que `correct_order`, con `shuffle_options: false`. Ni el esquema ni el validador lo imponen — **CASO2**: una pregunta `ordering` con `options` en derangement y `shuffle=false` es **VÁLIDA**. |
| **4. Orden visual presentado** | El reproductor muestra las opciones restantes en el orden del array almacenado (no consume `shuffle_options` en ninguna parte). Con la convención actual (capa 3), el orden inicial presentado **es el correcto**. |
| **5. Comportamiento del reproductor** | Modelo «clic = añadir a la secuencia»; evaluación por IDs contra `correct_order`; persistencia de `seleccion` por IDs; corrección solo mediante reset completo; sin arrastre ni teclas de reordenación. |

**Prueba empírica de la capa 1 (fixtures temporales, validador del repo):**
- CASO1 — `ordering` con `shuffle_options=true` → `SCHEMA_ERROR: False was expected` (1 error; el `if/then` dispara).
- CASO2 — `ordering` con `shuffle_options=false` y `options` desordenadas → **VÁLIDO** (ninguna regla de orden de almacenamiento).
- CASO3 — `ordering` sin `correct_order` → `SCHEMA_ERROR: 'correct_order' is a required property`.

### 5.2 Prueba funcional (arnés Vitest+jsdom, `App.tsx` real sin modificar, IPC Tauri simulado): **6/6 PASS**

- **D1** — Q.000108 (jugable hoy): orden inicial presentado = almacenado = `correct_order`; el recorrido descendente acierta sin leer. **El bloqueo es real, sistémico y está vivo en el episodio jugable.**
- **D2** — la evaluación es por IDs: un orden de clic no canónico falla con las mismas opciones → el contrato y la persistencia son compatibles con cualquier orden de presentación.
- **D3/E1** — la candidata R15 de Q.318 es consumible por el componente actual y reproduce D1; herencia de escenas 900025→900037 (§6).
- **ACC** — foco con Tab, Enter añade al orden; la única corrección es el reset completo.
- **D4a/D4b — SOLUCIÓN A demostrada de extremo a extremo:** con las `options` almacenadas en el derangement fijo `[O03,O01,O04,O02]` (solo datos), el **mismo componente sin una línea cambiada** presenta ese orden inicial ≠ `correct_order`; el recorrido descendente **YA NO acierta** (D4a); responder por contenido en el orden narrativo **acierta** y la persistencia sigue guardando IDs de `correct_order` (D4b).
- Alcance honesto: prueba a nivel de componente con WebView simulado (jsdom). La **prueba GUI completa en el runtime Tauri real queda PENDIENTE** (toolchain Rust/cargo no disponible en este entorno); no se declara GO de accesibilidad: corresponde a R12.

### 5.3 Evaluación formal de las dos soluciones

**Solución A — almacenar `interaction.options` en un orden fijo ≠ `correct_order`, conservando `shuffle_options=false`** (derangement documentado y estable por pregunta):
- Capa 1: compatible — el `if/then` solo restringe el valor declarado de `shuffle_options` (se mantiene `false`) y exige `correct_order` (intacto). Ninguna regla sobre el orden del array. **Probado: CASO2 y S2.**
- Capa 2: compatible — la igualdad de conjuntos de `correct_order` no mira el orden. **Probado: S2 VÁLIDO sobre el paquete completo con alta simulada.**
- Capa 3: es exactamente el cambio que propone (el orden de almacenamiento deja de coincidir con el resuelto).
- Capa 4/5: el reproductor actual presenta el orden almacenado → **el orden inicial deja de ser el resuelto SIN NINGÚN CAMBIO DE CÓDIGO**. Probado funcionalmente (D4a/D4b).
- Semántica de `shuffle_options=false`: se respeta íntegramente — «false» significa que el presentador **no aleatoriza ni reordena en runtime**; lo que se presenta es el orden fijo fijado en autoría, estable y revisable editorialmente. No hay aleatoriedad ni decisión de presentación delegada al jugador de la app.
- Riesgos: (a) rompe la convención de autoría vigente (las 4 `ordering` almacenan orden resuelto) → debe aplicarse como **decisión de datos documentada**, idealmente a las cuatro (ver alcance sistémico); (b) el orden de `options` pasa a ser dato semántico de presentación → el autor debe elegir un derangement real (ningún elemento en su posición resuelta) y documentarlo; (c) exigirlo por validador (p. ej. «ordering: options ≠ correct_order en orden») sería una mejora de `validate.py` posterior, no necesaria para que A funcione.

**Solución B — permutación determinista en el presentador** (orden de presentación derivado, p. ej., por hash estable del `question_id`):
- Capas 1–3: compatible en la letra (no toca esquema, validador ni datos almacenados).
- **Compatibilidad semántica con `shuffle_options=false`: cuestionable.** El `$comment` del esquema («El orden visual puede aleatorizarse; NUNCA cambia los identificadores») y el `const false` del `if/then` implican que, con `false`, el presentador **no altera el orden visual** — presenta lo almacenado. Una permutación del presentador, aunque determinista y no aleatoria, **sí es una alteración del orden visual decidida por el presentador**, que el contrato actual solo autoriza cuando `shuffle_options=true`. Por tanto **B, tal como está el contrato, contradice la semántica declarada del campo**: no porque use aleatoriedad, sino porque el presentador asume una facultad (`reordenar`) que `false` niega.
- Para legitimar B se requeriría una **decisión contractual explícita**, elegible entre: (i) enmendar el `$comment`/documentación (y el encargo §2.2 si procede) para definir que `shuffle_options=false` prohíbe solo la *aleatorización* y permite un *orden de presentación fijo derivado por el presentador*; o (ii) añadir un campo opcional declarativo (p. ej. `presentation_order` o un enum `fixed_derangement`) al esquema — ambos son **cambios de esquema/contrato que exceden la autoridad de este encargo** y exigen su propio ciclo de visado (R14 + equipos afectados + suite de fixtures actualizada).
- Requiere además cambio de código del reproductor, prueba R12 sobre runtime real y doble contabilidad (orden almacenado visible a editores ≠ orden mostrado), lo que añade superficie de error.

**Recomendación: SOLUCIÓN A.** Es la de menor riesgo: cero cambios de código y de esquema, semántica honesta con `shuffle_options=false` tal como está definido hoy, verificación ya obtenida (S2 + D4a/D4b) y efectividad inmediata. B solo procedería tras la enmienda contractual (i) o (ii) y con su propia prueba en runtime. **No se adopta B por el mero hecho de no usar aleatoriedad.**

### 5.4 Alcance de la incidencia sistémica

La incidencia (orden inicial presentado = resuelto) afecta a **las cuatro** preguntas `ordering`: `DQ.Q.000108` (**C08 — jugable hoy: la regla del sorteo está activa en el episodio con que se juega actualmente**), `DQ.Q.000225` (C18), `DQ.Q.000318` (C21 — episodio aún no jugable) y `DQ.Q.000324` (P2.C10). Corregir solo Q.318 con la solución A deja el *giveaway* vivo en Q.000108; la corrección de las otras tres es un **cambio de datos productivo ajeno a este encargo** que requiere su propia autorización (y, recomendablemente, aplicar A uniformemente a las cuatro en una misma PR de datos).

### 5.5 Nota adicional (hallazgo de la prueba)

Las 3 evidencias de Q.318 con el mismo par `kind`+`passage_id` (`cita_literal`+P0006) generan **claves React duplicadas** (`App.tsx:476`: `key={ev.kind + (ev.passage_id ?? '')}`) — React advierte «children may be duplicated/omitted». No bloquea el contrato (el esquema permite repeticiones), pero es un defecto de robustez del reproductor a resolver (clave por índice) o de composición de evidencias (fusionar citas de P0006), a decidir en la futura PR con R14/R15.

## 6. Antispoiler y referencias visuales (verificación técnica)

| Exigencia R14 | Verificación | Resultado |
|---|---|---|
| Eliminar imágenes previas prohibidas | Las 3 candidatas **omiten** `pre_image_media_id` (campo ausente, no `SIN_IMAGEN` como valor — correcto por contrato) | **OK** |
| No usar `900036` como post literal de Q.315 | No hay mecanismo `post_*` en el contrato; candidata no lo menciona; prueba funcional: `900036` nunca solicitado | **OK** |
| No rehabilitar `900025` para Q.316 | Candidata sin pre; activos `900025/900036/900037` intactos en catálogo (sin tocar) | **OK** |
| No mostrar Q.318 antes de narrar la recogida por Sancho | `safe_after_episodes=[DQ.P1.C21.E01]` solo; **no existe gate por beat** (sin `beats` en el paquete v1.0.0; sin campo de gate por pregunta en el contrato) | **NO ACREDITABLE POR DATOS HOY** — requiere mecanismo futuro (beats/v1.1 o gate en reproductor) y QA R12 |
| No usar `900037` antes del momento permitido | **Hallazgo ejecutable (E1):** con el modelo de escena persistente del reproductor, al omitir la pre de Q.318, la escena mostrada durante Q.318 **antes de responder** es la heredada de Q.317: **`900037`** (URI `…p1_c21_sancho_bacia_examen_post.webp`). Igual para Q.315/Q.316: heredan `900025` de Q.313/Q.314. | **RIESGO REAL** — la omisión de pre NO equivale a «sin imagen»; exige decisión: pre explícita segura, o mecanismo de escena por pregunta, o aplicar §D4 completo (A-09…A-13 retiran TODAS las pre de C21 → episodio sin escenas pre) |
| Restricciones por episodio vs por beat | `safe_after_episodes` = por episodio (lista). Por beat/hecho narrativo: **no existe representación en contrato v1.0.0**; §D4 lo confirma («el mero paso de respuesta o safe_after_episodes no basta») | Confirmado; `safe_after` **no acredita** cronología intrapregunta |

**Bloqueos explícitos que se mantienen (orden R14):**
1. **Herencia involuntaria de imágenes de preguntas anteriores** (modelo de escena persistente): probado — `900037` durante Q.318 y `900025` durante Q.315/Q.316 antes de responder (E1/D3).
2. **Falta de control por beat/hecho narrativo**: sin `beats` en el paquete y sin campo de gate en contrato v1.0.0.
3. **El episodio C21 no es jugable todavía en el consumidor actual**: `App.tsx` tiene `EPISODIO_INICIAL='DQ.P1.C08.E01'` fijo; las preguntas C21 solo fueron accesibles en la prueba funcional mediante un fixture de datos (reetiquetado de episodio), nunca en el reproductor real.
4. **Claves React duplicadas** para las evidencias de Q.318 (3× `cita_literal`+P0006).
5. **Accesibilidad completa no probada en Tauri** (jsdom solo cubre foco/Enter básicos; lector de pantalla, orden de foco real e indicación accesible de posición: R12 sobre runtime).

**Principio rector:** el PASS de los JSON en el validador (S1/S2) acredita conformidad estructural con el contrato; **no equivale a una experiencia narrativamente segura**. La seguridad narrativa exige los gates de momento, las decisiones de escena y el QA visual de R12 sobre el reproductor real.

## 7. Qué detectan realmente los validadores (relevante para esta integración)

**Detectan:** esquemas (campos/regex/patrón `sha256:`/posición entera, **y los condicionales `if/then` de `interaction` — incluida la regla de `ordering`: `correct_order` required, `shuffle_options` `const false` cuando se declara, `minItems 3`**); semántica de pregunta (prefijo e unicidad de opciones, correctas por tipo, **`correct_order` = todas las opciones exactamente una vez** — único guard semántico del ordering, hotspot en rango, certeza vs interpretación); **crossrefs de paquete** (episode/chapters/passage_ids/pre/hotspot/evidence); duplicación de `semantic_key`; pre-imagen con `spoiler_level ≠ ninguno`; beats v1.1 (fuera del paquete piloto actual).

**NO detectan (brechas que esta auditoría cubre manualmente):** el **orden del array `options` respecto de `correct_order`** (ni esquema ni semántica — es el hueco que habilita la Solución A); `evidence.quote` ∈ pasaje citado (el cotejo de CI compara citas con el texto completo PG, no con el pasaje declarado, y no valida el enlace `passage_id↔quote`); recomputación de `sha256` contra `text_original`; validez de `position` contra la fuente; derivación de `text_indexable`; `counts` del manifest vs ficheros reales; pasajes huérfanos (no listados en ningún episodio); gates narrativos por beat (no existen). *Nota de cobertura:* la regla `if/then` de `ordering` se aplica mecánicamente por jsonschema, pero **no existe fixture negativo dedicado** para ella en la suite (`EXPECTED_INVALID` no contempla una violación de `shuffle_options`/`correct_order` de tipo ordering); la protección es real pero sin caso de regresión propio.

## 8. Matriz PASS / FAIL / PENDIENTE

| Área | Prueba | Estado |
|---|---|---|
| Esquemas/contrato | Suite canónica sobre `fafbea2` | **PASS 53/53** (local) · CI main [42357944146] success |
| Regla `if/then` de `ordering` (shuffle `const false` declarado; `correct_order` required) | Prueba empírica CASO1/CASO2/CASO3 con validador del repo | **PASS — VERIFICADA** (corrige la v1 de este informe) |
| Paquete actual | `validate.py package` real | **PASS (VÁLIDO)** |
| Cotejo textual actual | `cotejar_texto_referencia` real | **PASS 130/130** |
| FTS5 (independiente de alta) | `fts5_castellano_aureo` | **PASS 9/9** (muestras embebidas) |
| Citas R15 | 7 citas vs PG y vs pasaje | **PASS 7/7 exactas** |
| Convenciones de pasaje | sha256/position/indexable vs catálogo | **PASS** (reglas verificadas) |
| Colisiones | IDs P0005/P0006/C10.P0001 y `semantic_key` (candidatas + variantes) | **PASS sin colisiones** |
| Integrabilidad sin alta | S0: paquete con candidatas | **FAIL esperado: 6 REFERENCE_ERROR** (demuestra que no es importable antes del alta) |
| Integrabilidad con alta | S1: paquete simulado completo | **PASS (VÁLIDO)** — sin regresión en 71 preguntas no tocadas |
| Solución A (options en derangement fijo) | S2: paquete simulado + A en Q.318 | **PASS (VÁLIDO)** — esquema y validador la aceptan |
| Cotejo post-integración | simulación S1 | **PASS 136/136** |
| Compatibilidad de candidata con reproductor | Arnés funcional App.tsx real | **PASS 6/6** (D1, D2, D3/E1, ACC, D4a, D4b) |
| Orden inicial no resuelto presentado por el componente | D4a/D4b con datos Solución A | **PASS a nivel componente** — pendiente el cambio de datos autorizado y la verificación en runtime Tauri (R12) |
| Presentación `ordering` en runtime Tauri real | GUI | **PENDIENTE (R12)** — cargo no disponible en este entorno |
| Accesibilidad GUI real (teclado/foco/lector) | WebView Tauri | **PENDIENTE (R12)** — jsdom solo básico |
| Gate narrativo por beat (Q.315/316/318) | datos/runtime | **PENDIENTE** — no existe en contrato v1.0.0 ni en el paquete |
| Epílogo `post_answer` con `900037` | contrato/reproductor | **PENDIENTE** — sin campo `post_*`; sin mecanismo por pregunta |
| Persistencia tras cambio semántico Q.316 | runtime con datos reales de usuario | **PENDIENTE (bajo riesgo hoy)** — compatibilidad estructural probada; compatibilidad semántica no garantizada (§4); sin datos desplegados acreditados |
| Antispoiler visual real (imágenes, momentos) | QA R12 | **PENDIENTE (R12)** |
| Deduplicación y claves de evidencia | reproductor | **ADVERTENCIA** — claves React duplicadas con la evidencia R15 de Q.318 (§5.5) |

## 9. Inventario exacto de archivos de la futura PR productiva

**Núcleo (alta + correcciones, tal como §3):** 2 pasajes nuevos; `episodes/DQ.P1.C21.E01.json`; `package.json` (files+counts); 3 preguntas (`DQ.Q.000315/000316/000318.json`) — **en la candidata de Q.318, con la Solución A recomendada, las `options` se almacenan en el derangement fijo documentado (`[O03,O01,O04,O02]`), con `correct_order` y `shuffle_options=false` intactos (validado en S2 y funcionalmente en D4a/D4b)**.
**Documental recomendada en la misma PR:** nota de mis-atribución en `passages/DQ.P1.C21.P0004.json` (solo `anchor`, medida transitoria — §2).
**Reproductor (PR técnica separada, no incluida):** clave de evidencia por índice (R-3), decisión sobre escena persistente C21 (R-2), gate por beat si se aprueba (R-1). **Con la Solución A, el orden inicial no resuelto NO requiere cambio de reproductor**; una permutación de presentador (Solución B) requeriría además la enmienda contractual descrita en §5.3.
**Excluidos por mandato:** `DQ.P1.C10.*`, Q.317, visados, matrices, MediaAssets, imágenes, esquemas, TS-001, ADR-0005/H5 (área de R11, independiente).

## 10. Riesgos, dependencias y orden recomendado

| # | Riesgo/dependencia | Mitigación |
|---|---|---|
| R-1 | Sin gate por beat, Q.315/316/318 aparecerían tras responder la pregunta anterior (modelo actual) — cronología intrapregunta no acreditada | Decisión R14: aceptar gate por orden de preguntas (débil), o habilitar beats/gate antes de publicar C21; R12 QA de momentos |
| R-2 | Herencia de escena muestra `900037` durante Q.318 (y `900025` durante 315/316) antes de responder; además **C21 no es jugable hoy** en el reproductor | Aplicar §D4 completo en C21 (retirar todas las pre) o pre explícita segura por pregunta; decidir con R06/R12 |
| R-3 | Claves React duplicadas con 3 evidencias de P0006 en Q.318 | Cambiar `key` a índice (reproductor) o fusionar evidencias (editorial); decidir antes de fusionar la PR productiva |
| R-4 | `ordering` con orden inicial resuelto (giveaway) — **sistémico en las 4 `ordering`; vivo en Q.000108, jugable hoy** | Aplicar Solución A en la PR productiva de datos (Q.318) y, con autorización separada, extender A a Q.000108/000225/000324; verificación R12 en runtime. La Solución B requeriría enmienda contractual previa (§5.3) |
| R-5 | P0004 y Q.317 (fuera de alcance) | **Incidencia NO cerrada**: P0004 se conserva solo como medida transitoria; R01/R02 deben pronunciarse sobre Q.317 (§2) antes de cualquier retirada |
| R-6 | Progreso histórico de Q.316 semánticamente desalineado si existieran datos de usuarios | Compatibilidad estructural probada; sin datos desplegados acreditados; decidir invalidación/versionado antes de publicar a usuarios (§4); sin borrado de progreso |
| R-7 | Brechas de validador (cita↔pasaje, sha256, offsets, counts, orden de options) no automatizadas; sin fixture negativo para la regla if/then de ordering | Para la futura PR: re-ejecutar los chequeos de esta auditoría (§8) o incorporarlos al validador con sus fixtures (PR técnica aparte) |

**Orden recomendado:** (1) fusión de esta auditoría rectificada (documental); (2) decisiones R14 sobre R-1/R-2/R-3, sobre §2 (P0004/Q.317) y sobre el alcance de la Solución A (¿solo Q.318 o las cuatro `ordering`?); (3) PR productiva documental-content (alta P0005/P0006 + 3 preguntas con Solución A en Q.318 + episodio + package) con re-ejecución de S1/S2+cotejo; (4) PR técnica del reproductor (clave de evidencia + escenas); (5) QA R12 sobre runtime real (teclado/foco/momentos/orden presentado); (6) entonces, y solo entonces, valoración de GO de contenido C21.

## 11. Dictamen

**INTEGRABLE CON CONDICIONES.** Las propuestas R15 son filológica y estructuralmente correctas (citas exactas verificadas, sin colisiones, consumibles por el contrato y por el reproductor actual tras el alta de P0005/P0006, simulación S1/S2 válida y cotejo 136/136). Las condiciones para publicar siguen siendo las ya declaradas (R14/R15/R01/R02/R12) más las aquí precisadas: resolver R-1 (gate narrativo), R-2 (herencia de escenas; C21 aún no jugable) y R-3 (claves de evidencia); aplicar la **Solución A** para el orden inicial no resuelto (validada en S2/D4) — o la alternativa que Coordinación elija con su enmienda contractual — y decidir el alcance sistémico sobre las cuatro `ordering`; P0004 en régimen transitorio con la decisión editorial R01/R02 sobre Q.317 pendiente (**incidencia referencial NO cerrada**); y el tratamiento del progreso de Q.316 decidido antes de cualquier publicación a usuarios. **No se ha ejecutado integración productiva alguna; el repositorio permanece intacto.**

---

*Trazabilidad R09: informe generado a partir del estado verificado de GitHub `fafbea20974c7452ddb8e1dcc20e244b55908014`; simulación y arnés funcional en directorios de trabajo externos al repositorio; ningún fichero productivo modificado.*
