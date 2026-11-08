# INFORME QA R12 — PLAN DE AUDITORÍA INDEPENDIENTE: DISEÑO A+B+D (MOLINOS I.8) Y ESCENAS NEUTRAS (H5 / D-6)

**Para:** R14 — Coordinación · **De:** R12 — QA y Pruebas de Aceptación
**Fecha:** 2026-11-08 · **Modalidad:** plan de auditoría QA; ejecuciones de solo lectura. **Sin modificar pruebas, esquemas, datos ni código productivo.**
**Encargo:** preparar auditoría QA independiente del diseño A+B+D para los molinos (segmentación de escena + consumidor con elegibilidad + fallback a neutro). El CI histórico **53/53 corresponde al contrato antiguo (v1.0.0/1.1.0)** y **no constituye prueba** de las nuevas cardinalidades ni de D-6.

**ESTADO: PLAN QA PREPARADO / CT-FP NUEVAS NO EJECUTADAS / RUNTIME SIN GO.**

---

## 0. Fuente de verdad verificada

| Verificación | Resultado |
|---|---|
| HEAD de `origin/main` | `afc72644dc4283ff72f45baa5f85ca79e0498930` — coincide con el SHA de referencia del encargo |
| CI de `main` en ese SHA | `validar-contrato` **success** (run 42364446890, 2026-11-07T10:33:20Z) |
| Trabajo en vuelo relevante | PR de `feature/r07-sonido-b06-b08-neutras` («diseño sonoro B06–B08 y escenas neutras tras I11, solo documentación»), CI verde en su rama (run 42466948220, 2026-11-08) — **sin fusionar en `main`** a la fecha de este informe |
| Esquema vigente de beat | `schemas/content/beat.schema.json`: `visual_asset_ids` en `required` **con `minItems: 1`** — la **opción 2 (`minItems: 0`, v1.2.0) NO está aplicada** |
| `ContractVersion` vigente | `enum: ["1.0.0", "1.1.0"]` (`_definitions.schema.json`) — `1.2.0` no existe aún |
| Datos de escena | **No existe** ningún registro de escena en `content/` (0 apariciones de `DQ.SC.`; sin directorio `scenes/`): los molinos existen solo como **ficha documental** (`FICHA_ESCENA_P1_C08_MOLINOS.md`, estado `GUIONIZADA_PROPUESTA`) |
| Reproductor | `app/src` sin lógica de beats/reproductor (0 coincidencias en `App.tsx`/`contrato.ts`) — **runtime SIN GO** |
| Los tres MediaAssets de molinos | `DQ.MA.900030` (`pre_pregunta`/`ninguno`), `DQ.MA.900005` (`pre_pregunta`/`ninguno`), `DQ.MA.900006` (`post_desenlace`/`leve`) — coincide con EVALUACION_R09 §0. Los tres con `review.state: borrador`, revisor nulo (**sin visado curatorial registrado**) |

---

## 1. Alcance, independencia y método

1. **Independencia:** R12 no modifica tests, esquemas, datos ni código productivo. Las comprobaciones propias se ejecutaron con **ficheros temporales fuera del repositorio** (sondas P1–P6, §2) y reejecución del CI local. Ninguna evidencia se fabrica: cada fila de la matriz cita su fuente.
2. **Método:** (a) reproducción íntegra local del workflow `validar-contrato` sobre `afc7264`; (b) sondas negativas puntuales contra el validador; (c) verificación criptográfica de los tres WebP (SHA-256 + git blob); (d) verificación de identificadores y referencias de las preguntas C21; (e) matriz trazable requisito→prueba→esperado→responsable→evidencia.
3. **Clasificación obligatoria de cada prueba:**
   - **EJECUTADA Y VERIFICADA** — R12 la ejecutó y verificó su resultado sobre `afc7264` en esta auditoría.
   - **EJECUTABLE AHORA, PENDIENTE** — sus insumos existen hoy en el repositorio; falta ejecutarla el responsable o cerrar la decisión que la habilita.
   - **BLOQUEADA POR IMPLEMENTACIÓN** — requiere artefactos inexistentes hoy (esquema v1.2.0, datos de escena, reproductor/GO de runtime, visados).
4. **Regla de no mezcla C21/H5:** la batería de contenido C21 (Q.315/Q.316/Q.318, `ordering`, herencia visual) vive en §3.E con expediente propio. **Sus resultados no se combinan con los de H5/D-6 en ningún resumen, métrica ni veredicto.**
5. **Límite honesto:** no se afirma ninguna prueba de aplicación que no haya podido ejecutarse. No existe reproductor: todas las pruebas FP/AC de runtime están sin ejecutar.

---

## 2. Evidencia ejecutada por R12 (2026-11-08, sobre `main` @ `afc7264`)

| # | Ejecución | Resultado | Fuente |
|---|---|---|---|
| E-01 | Suite canónica de fixtures (`validate.py suite tests/contracts/fixtures`) | **53/53 PASS** | Reproducción local del paso 1 de CI |
| E-02 | Meta-validación de esquemas (`Draft202012Validator.check_schema`) | **17/17 OK** | Reproducción local del paso 2 de CI |
| E-03 | Paquete editorial real (`validate.py package content/piloto/package.json`) | **VÁLIDO** | Paso 3 de CI |
| E-04 | Cotejo textual batería ↔ texto almacenado | **130/130 OK** | Paso 4 de CI |
| E-05 | FTS5 castellano áureo (ADR-0001.1) | **9/9 SUPERADO** | Paso 5 de CI |
| E-06 | Vista de conciliación QA R12 (`test_vista_qa_r12.py`) | **VERIFICADA — 3564 filas, invariantes y recomputación coinciden** (recuentos v1: 168/44/28 · v2: 188/48/31) | Paso 6 de CI |
| E-07 | Paquete de precarga canónica (`tests/contracts/integration_precarga/package_precarga_canonica.json`) | **VÁLIDO — 73 registros** | Ejecución R12 |
| E-08 | SHA-256 de los 3 WebP físicos vs. `sha256` declarado en `DQ.MA.900030/900005/900006` | **3/3 COINCIDEN** (`7fbb9e37…`, `6bd172fc…`, `c7da1dbb…`) | `sha256sum` vs. JSON |
| E-09 | Blobs git de los 3 WebP vs. los declarados por R09 (EVALUACION_R09 §0) | **3/3 COINCIDEN**: `900030`→`7d77e6e2…`, `900005`→`bef44d15…`, `900006`→`653a3d9e…` | `git ls-tree HEAD` |
| E-10 | Sondas negativas P1–P6 (ficheros temporales fuera del repo, validador intacto) | Ver tabla §2.1 | Ejecución R12 |

### 2.1 Sondas negativas ejecutadas (contrato vigente v1.0.0/1.1.0)

| Sonda | Entrada (mutación sobre fixture válido) | Resultado observado | Lectura para la auditoría |
|---|---|---|---|
| P1 | `visual_asset_ids: []` | `SCHEMA_ERROR: [] should be non-empty` | **La nueva cardinalidad (opción 2/v1.2.0) NO está soportada hoy** — CT-R12-01 queda bloqueada |
| P2 | campo `visual_asset_ids` ausente | `SCHEMA_ERROR: 'visual_asset_ids' is a required property` | La obligatoriedad del campo ya se impone hoy (precondición de CT-2 verificada) |
| P3 | `visual_asset_ids: ["DQ.MA.999999"]` | Rechazo por patrón de ID (modo `file` no cruza referencias de beat) | La referencia beat→medio se valida **en modo paquete** — cubierta por la suite de paquetes negativos (15 `REFERENCE_ERROR` activos, E-01) |
| P4 | `contract_version: "1.2.0"` | `SCHEMA_ERROR: not one of ['1.0.0','1.1.0']` | El rechazo de versiones no soportadas está activo hoy; la aceptación de 1.2.0 exige la PR técnica |
| P5 | `kind: "TRANSICION"` (B09 de la ficha) | `SCHEMA_ERROR: not one of ['NARRACION','DIALOGO','ACCION','SILENCIO']` | **D-1 sigue abierto: el dato de B09 tal como está en la ficha no validaría hoy** |
| P6 | escena con `media_ids: []` | `SCHEMA_ERROR: [] should be non-empty` | El suelo de cobertura por escena (`minItems:1` escena) está activo hoy |

---

## 3. Matriz maestra: requisito → prueba → resultado esperado → responsable → evidencia → estado

Convención: **EV** = EJECUTADA Y VERIFICADA · **EP** = EJECUTABLE AHORA, PENDIENTE · **BI** = BLOQUEADA POR IMPLEMENTACIÓN.

### 3.A Contrato (CT)

| ID | Requisito | Prueba | Resultado esperado | Responsable | Evidencia | Estado |
|---|---|---|---|---|---|---|
| CT-R12-01 | Arrays vacíos **válidos** bajo v1.2.0 (opción 2: `visual_asset_ids: []` = persistencia declarada) | Fixture propuesto `beat_visual_vacio.json` (CT-1 de R11) | Registro **VÁLIDO** con `contract_version: 1.2.0` | R09 (esquema+fixture) / R12 (ejecución) | Hoy: sonda P1 → `SCHEMA_ERROR`. Esquema vigente `minItems: 1` | **BI** |
| CT-R12-02 | Campo obligatorio: ausencia de `visual_asset_ids` sigue inválida (también bajo v1.2.0) | Fixture propuesto `invalid_beat_sin_campo_visual.json` (CT-2 de R11) | `SCHEMA_ERROR` (campo en `required`) | R09 / R12 | Hoy: sonda P2 → rechazo activo en v1.1 (verificado); re-verificación bajo v1.2.0 en CT-R12-05 | **EV** (nivel v1.1) |
| CT-R12-03 | Referencias cruzadas: beat→medio, beat→pasaje, audio real o ausente | Suite de paquetes negativos (`package_invalid_missing_media.json`, `package_invalid_beats_audio_fantasma.json`, etc.) | `REFERENCE_ERROR` determinista; paquete real VÁLIDO | R09 / R12 | E-01 (53/53; 15 `REFERENCE_ERROR` + 6 `SEMANTIC_ERROR` activos) + E-03 + E-07 | **EV** |
| CT-R12-04 | Campos obligatorios y reglas semánticas de beat: `texto_visible` con contenido (`\S`), `lectura_minima_ms ≥ 1`, incisos ⇒ `texto_oral`, orden único | Fixtures `invalid_beat_texto_blanco.json`, `invalid_beat_lectura_cero.json`, `invalid_beat_incisos_sin_oral.json`, `negative_beat_orden_duplicado.json` | Rechazo con código claro (`SCHEMA_ERROR`/`SEMANTIC_ERROR`) | R09 / R12 | E-01 (todos los fixtures en la suite 53/53) | **EV** |
| CT-R12-05 | Compatibilidad de versiones y **regresión cero** al introducir v1.2.0 (CT-5 de R11): la suite 53/53 y los fixtures 1.0.0/1.1.0 siguen PASS; `1.2.0` aceptado; `2.0.0` rechazado | Suite completa tras la PR técnica v1.2.0 | 0 regresiones; enum ampliado sin invalidar registros previos | R09 (PR) / R12 (ejecución doble firma) | Hoy: sonda P4 (rechazo activo de `1.2.0`); la demostración formal exige el cambio de esquema | **BI** |
| CT-R12-06 | Rechazo de versiones no soportadas (comportamiento de puerta) | Sonda con `contract_version` fuera de enum | Rechazo explícito, sin aceptación silenciosa | R09 / R12 | Sonda P4 → `'1.2.0' is not one of ['1.0.0','1.1.0']` | **EV** |
| CT-R12-07 | Suelo de cobertura por escena: `scene.media_ids` ≥ 1 (sin relajación propuesta) | Escena con `media_ids: []` (CT-4 de R11) | `SCHEMA_ERROR` | R09 / R12 | Sonda P6 → rechazo activo | **EV** |
| CT-R12-08 | Elegibilidad verificable **en datos** (CT-6 / D-6): en una escena tipo molinos (`media_ids` = [pre, pre, `post_desenlace`]), el conjunto inicializable por beat excluye activos de momento posterior | Fixture escena molinos + regla de validador que R09 determine (señal `function`, designación E-3 o campo nuevo) | Informe R09 con regla elegida + fixtures positivos/negativos; el `post_desenlace` nunca inicializa ni entra en cascada antes de su momento | R09 (mecanismo D-6) con R01/R02/R05/R06 / R12 (ejecución) | Sin mecanismo decidido ni datos de escena — **D-6 abierto** | **BI** |
| CT-R12-09 | Enum de `kind` sin `TRANSICION` (D-1): B09 debe convertirse a `NARRACION` + transiciones de escena | Beat con `kind: TRANSICION` | `SCHEMA_ERROR` hoy; tras D-1, B09 convertido valida | R01/R02 (semántica) + R09 / R12 | Sonda P5 → rechazo activo (evidencia de que el dato de la ficha v1.1 no validaría) | **EV** (evidencia del bloqueo) |

### 3.B Narrativa (molinos I.8 — umbrales curariales NOT BEFORE / NOT AFTER)

> Los umbrales de referencia son los de EVALUACION_R09 §2 (tabla NOT BEFORE/NOT AFTER). La colocación de la **ficha v1.1** (`900005` en B02; `900006` en B06) es **propuesta no visada** y discrepa de esos umbrales — ver hallazgo H-A3. Ningún dato de escena existe todavía: todas las pruebas de este bloque requieren primero la segmentación A y la conversión ficha→datos, y, para los niveles de runtime, el reproductor.

| ID | Requisito | Prueba | Resultado esperado | Responsable | Evidencia | Estado |
|---|---|---|---|---|---|---|
| NT-R12-01 | `900030` (siluetas) solo desde **B01**, simultáneo a I01; nunca en prólogo anterior | Datos escena A: B01 declara `[900030]`, ningún beat anterior existe; runtime: primer fotograma = 900030 | El beat B01 muestra 900030; ningún momento previo lo muestra | R03/R01/R02 (dato) + R10 (runtime) + R12 (prueba) | Sin datos de escena ni reproductor (hallazgo H-A2) | **BI** |
| NT-R12-02 | `900005` **no antes de I05** (entrada en B05 verificable; alternativa B04 pendiente de ratificación R01/R02) | Datos escena A: B02–B03 sin `900005`; entrada solo en el beat ratificado ≥ I05; runtime: primera aparición ≥ I05 | Ninguna aparición de 900005 antes de I05; aparición correcta en el beat ratificado | R01/R02 (ratificación) + R03 (dato) + R10 + R12 | Ficha v1.1 lo coloca en **B02** (pre-I05) — discrepancia H-A3; sin datos ni runtime | **BI** |
| NT-R12-03 | Caducidad de planos anteriores **tras I11**: los pre-choque (900030/900005) no se representan como presentes después | Datos escena A: B06 = `[]` (cierre I11); runtime: tras el cierre de B06 el plano pre ya no se muestra como vigente | Tras I11 no aparece plano pre-choque; texto I11 íntegro aunque el plano quede obsoleto | R03/R01/R02 (dato) + R10 + R12 | Sin datos ni runtime; mecanismo B (consumidor) sin implementar | **BI** |
| NT-R12-04 | **B07 (narración de I12) inicialmente neutra**: frontera de escena reinicializa (R-V4); B07 = `[]` sin herencia de la escena A; `900006` no re-declarado aún | Datos escena B: B07 = `[]` como primer beat; runtime: primer fotograma de B = fondo neutro | Al entrar en la escena B no hay plano heredado ni `900006`: fondo neutro + texto íntegro | R03/R01/R02 (dato, con SILENCIO opcional) + R10 + R12 | Sin segmentación ni datos; FP-14/FP-4 de R11 sin ejecutar | **BI** |
| NT-R12-05 | `900006` **no antes de completar I12**: elegible solo al **arranque de B08** (avance B07→B08 confirmado); nunca entrada B06/B07; nunca tras I11 sin I12 | Runtime: cursor de intervenciones presentadas; datos escena B: B08 = `[900006]` | `900006` aparece exactamente al iniciar B08; en B06/B07 jamás | R10 + R12 (runtime); R05/R06 (visado de luz/continuidad) | Ficha v1.1 lo coloca en **B06** (pre-I12) — discrepancia H-A3; sin datos ni runtime | **BI** |
| NT-R12-06 | **Exclusión de recurso rechazado**: un recurso con visado curatorial negativo (o elegibilidad no verificable) nunca aparece por ninguna ruta de la cascada (fail-closed E-4) | Registro de visados trazable en datos/documentación de escena + runtime: cascada R-V6 con filtro | El recurso vetado queda excluido de inicialización, cascada y persistencia; neutro ante la duda | R05/R06 (visado) + R09 (mecanismo) + R10/R12 | Los 3 MA de molinos están `review.state: borrador` sin revisor (E-08/E-09 y §0); no existe registro de vetos ejecutable | **BI** |

### 3.C Consumidor (FP — reproductor)

> Todas requieren reproductor (R10) y GO de runtime. Referencias: FP-1…FP-18 (ENTREGA_R11 §5) y T5–T11 (COMPONENTES_NARRATIVOS_UX §4); pruebas 1–12 del encargo D-6 (EVALUACION_R09 §7).

| ID | Requisito (encargo) | Prueba | Resultado esperado | Responsable | Evidencia | Estado |
|---|---|---|---|---|---|---|
| FP-R12-01 | Precarga y primera escena con plano base **elegible**; el texto nunca espera a la imagen | FP-1 + FP-14 de R11 | Primer fotograma = plano base elegible; texto visible desde datos listos; `900006` excluido de la inicialización | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-02 | Fallo de imágenes: la cascada conserva el filtro de elegibilidad; un fallo previo **nunca promociona** una imagen posterior | FP-5 + FP-15 de R11 | Beat → escena (descarta post) → último fotograma → **fondo neutro + nota discreta única**; texto íntegro; avance disponible | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-03 | Restauración de partida: recomputación determinista con filtro (guardar pre-golpe ⇒ restaurar sin imágenes post) | FP-12 + FP-17 de R11 | Estado idéntico al previo al cierre; `900006` excluido antes de su momento; cumple EF-AV-08 | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-04 | Retroceso: revocación de imágenes posteriores al retroceder (el cursor reduce las presentadas) | FP-9 de R11; prueba 9 del encargo D-6 | Al retroceder a pre-golpe desaparece la imagen post; texto íntegro re-legible | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-05 | Avance manual y automático: `max(voz, lectura_mínima)`; I11 completa al avanzar B06→B07; I12 completa al avanzar B07→B08 (habilita `900006` en B08) | T10 + FP-7; pruebas 5 y 7 del encargo D-6 | La elegibilidad cambia solo con avance confirmado; pausa congela voz y temporizador; salto manual siempre disponible salvo espera de voz | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-06 | Audio ausente: recorrido completo sin voz, sin errores espurios, mismos umbrales narrativos | FP-6 + T5/T8; prueba 11 del encargo D-6 | Secuencia íntegra por texto; avance manual siempre disponible (P0-1) | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-07 | Texto íntegro y lectura mínima (TS-001): texto nunca oculto/truncado; suelo `max(1500 ms, 800 ms + 35 ms/palabra)` solo elevable | R-V8 + T6 | Transiciones no ocultan texto antes de ser legible; `lectura_minima_ms` nunca rebaja el suelo | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-08 | **Cero flashes con imágenes futuras en transiciones**: sin parpadeos ni alternancias neutro↔post; persistencia sin repintado (cero churn) | FP-18 + FP-2 de R11 | Fondo neutro estable ante fallos totales; el plano post aparece solo en B08, con transición vigente | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-09 | Cambio de escena sin herencia ajena (R-V4): el plano de la escena A nunca persiste como vigente tras la ventana | FP-4 de R11; prueba 12 del encargo D-6 | Al cerrar la ventana, vigente = plano de la escena entrante (o neutro) | R10 / R12 | Sin reproductor | **BI** |
| FP-R12-10 | Silencio narrativo (R-V9): panel nunca vacío; última intervención atenuada + marcador discreto | FP-8 de R11 | Sin vaciado de panel; duración ≥ 1500 ms; retroceso restaura íntegro | R10 / R12 (tratamiento a R06/R08 — D-4) | Sin reproductor | **BI** |

### 3.D Accesibilidad (AC — con reproductor)

| ID | Requisito | Prueba | Resultado esperado | Responsable | Evidencia | Estado |
|---|---|---|---|---|---|---|
| AC-R12-01 | Contraste AA con fondo neutro (panel opaco/sólido) | Recorrido en neutro + medición de contraste | Texto AA sobre neutro por diseño (DIRECCION_ARTISTICA) | R08 / R12 | Sin reproductor | **BI** |
| AC-R12-02 | Foco visible, orden lógico; nota de error cerrable con Esc sin robar el foco del texto | FP-11 + R-V7 | Nota única, no intrusiva, operable por teclado | R08 / R10 / R12 | Sin reproductor | **BI** |
| AC-R12-03 | Teclado puro: Pausa/Continuar/Repetir/Retroceder/Salto siempre operables | T7 | Recorrido completo solo con teclado | R08 / R12 | Sin reproductor | **BI** |
| AC-R12-04 | Lector de pantalla: rótulos de hablante, subtítulos accesibles (`subtitles_ref`), `alt` de medios | Recorrido con NVDA + EF-ACC-* | Toda la narración accesible sin visión | R08 / R12 | Sin reproductor | **BI** |
| AC-R12-05 | Movimiento reducido: corte instantáneo sin deriva; persistencia idéntica; parallax ignorado | T9 + FP-10; prueba 10 del encargo D-6 | Contenido idéntico sin movimiento | R08 / R12 | Sin reproductor (`reduced_motion_fallback: true` ya exigido por esquema — EV de dato, no de runtime) | **BI** |

### 3.E Contenido C21 — batería independiente (Q.315 / Q.316 / Q.318, `ordering`, herencia visual)

> **Regla de no mezcla:** este bloque se informa y decide por separado de H5/D-6. Ningún resultado de §3.A–§3.D depende de estos tests ni viceversa. Episodio de las tres preguntas: `DQ.P1.C21.E01`.

| ID | Requisito | Prueba | Resultado esperado | Responsable | Evidencia | Estado |
|---|---|---|---|---|---|---|
| C21-R12-01 | Contrato vigente de las tres preguntas: esquema válido; Q318 `ordering` con `correct_order` = TODAS las opciones; `shuffle_options` no altera identificadores; sin campos de escritura | Validación de `content/piloto/package.json` (incluye Q.315/316/318) + inspección de `interaction` de Q318 | Paquete VÁLIDO; Q318: `ordering`, 4 opciones, `correct_order` [O01–O04] completa, `shuffle_options: false` | R12 (auditoría) / R15 (contenido) | E-03 + lectura directa de `DQ.Q.000318.json` (4 opciones, `correct_order` completa) — fixture `question_ordering.json` PASS en E-01 | **EV** |
| C21-R12-02 | Referencias visuales existentes y no reveladoras: `pre_image_media_id` existente; `pre_image_must_not_reveal: true`; `safe_after_episodes = [DQ.P1.C21.E01]` | Cruce Q.315→`DQ.MA.900036`, Q.316→`DQ.MA.900025`, Q.318→`DQ.MA.900036` contra `content/piloto/media_assets/` | Referencias resueltas; `900036`/`900025` existen (`pre_pregunta`/`ninguno`, cap. 21) | R12 | Lectura directa (900036: `p1_c21_bacia_lluvia_pre`; 900025: `p1_c21_mambrino_pre`) + validador de paquete con `REFERENCE_ERROR` activo (E-01) | **EV** |
| C21-R12-03 | Promoción al catálogo de las subsanaciones R15 (nuevo prompt/respuesta Q.315; Q.316-B; ajustes Q.318) con citas cotejadas contra PG #2000 | Re-validación de paquete tras integración editorial + cotejo textual de las citas propuestas | Paquete VÁLIDO con las tres preguntas rectificadas; altas `DQ.P1.C21.P0005/P0006` registradas como Passage canónicos con ancla/hash | R15 + R02/R09 (integración) / R12 (re-validación) | Insumos existen: `docs/data/propuestas_editoriales_q315_q316_q318_r15.json`; datos actuales aún **pre-R15** (`review: borrador`, prompts antiguos verificados hoy) — requiere decisión de integración y altas de pasajes no registradas | **EP** |
| C21-R12-04 | `ordering` en runtime: el orden visual puede barajarse sin alterar la respuesta; sin ningún campo de escritura | Prueba de consumidor de preguntas sobre el ejecutable | Respuesta inequívoca con y sin barajado; cero entrada de texto | R10 / R12 | Sin consumidor de preguntas implementado | **BI** |
| C21-R12-05 | Herencia visual según decisiones R30/R15: Q.315 `RETIRAR_PRE` ⇒ omitir `pre_image_media_id` (manteniendo `must_not_reveal: true`, sin serializar `SIN_IMAGEN`); Q.316 `MANTENER_CONDICIONAL` solo con condición narrativa cumplida; Q.318 fase (reveal vs post_answer) por resolver | Verificación documental de visados R05/R06/R12 individuales + validación de datos tras aplicar las omisiones condicionadas | Omisiones correctas sin romper respuestas/episode/safe_after; visados emitidos individualmente; sin activación de vínculos R15 no visados | R05/R06/R12 (visados) + R02/R09 (datos) / R14 (arbitraje) | ADENDA_R14 §3 (14 decisiones, estado «visados pendientes»); NO-GO productivo vigente | **EP** (nivel documental/datos) — la parte runtime es **BI** |

### 3.F Precarga / integración (insumo del consumidor)

| ID | Requisito | Prueba | Resultado esperado | Responsable | Evidencia | Estado |
|---|---|---|---|---|---|---|
| PC-R12-01 | Paquete de precarga canónica válido (73 registros) | `validate.py package package_precarga_canonica.json` | VÁLIDO | R12 | E-07 | **EV** |
| PC-R12-02 | Importación precarga → canónico sin reescritura (`importar_precarga.py`) | Ejecución del importador | 73 registros importados íntegros | R09/R12 | No re-ejecutada en esta auditoría: el importador escribe artefactos canónicos y queda fuera de una auditoría de solo lectura (operativa según PLAN_QA v1.0) | **EP** |

---

## 4. Hallazgos de auditoría

| ID | Gravedad | Hallazgo | Evidencia |
|---|---|---|---|
| H-A1 | **Bloqueante para CT/NT** | La opción 2 (v1.2.0, `minItems: 0`) **no está aplicada**: el esquema vigente rechaza `[]` y `1.2.0`. Todo el bloque CT de las nuevas cardinalidades está bloqueado hasta la PR técnica coaprobada | Sondas P1 y P4; `beat.schema.json` (líneas 34–40); `ContractVersion` enum |
| H-A2 | **Bloqueante para NT/FP** | No existen datos de escena en `content/` (0 registros `DQ.SC.`): la escena de molinos y su segmentación A/B solo existen como documento. Las pruebas narrativas a nivel dato no tienen objeto que validar | `find`/`grep` sobre `content/` (§0) |
| H-A3 | **Alta (discrepancia documental)** | La ficha v1.1 coloca `900005` en **B02** (antes de I05) y `900006` en **B06** (antes de completar I12), en contra de los umbrales curariales NOT BEFORE/NOT AFTER (EVALUACION_R09 §2). La colocación es propuesta, no visado: la corrección (re-anclaje 900005→B05/B04-ratificado; 900006→B08; B07 neutra) debe tramitarse antes de convertir ficha→datos | `FICHA_ESCENA_P1_C08_MOLINOS.md` §3 (B02/B06); EVALUACION_R09 §2 y §4.1 |
| H-A4 | Media (contrato) | B09 `kind: TRANSICION` no valida hoy (D-1 abierto) | Sonda P5 |
| H-A5 | **P0 (identidad de medios)** | **Colisión de espacios DQ.MED/DQ.MA sobre los mismos ficheros físicos**: `assets/scenes/manifest.json` mapea `p1_c08_molinos_pre`→`DQ.MED.900005`, `p1_c08_molinos_post`→`DQ.MED.900006` (spoiler_risk **high**), `p1_c08_molinos_siluetas_pre`→**`DQ.MED.900231`**; mientras `content/piloto/media_assets/` usa `DQ.MA.900005/900006/900030` para las mismas imágenes, y **`DQ.MED.900030` es «bodas de Camacho» (P2C20)**. Un consumidor que resuelva por sufijo numérico entre espacios mostraría la **imagen equivocada** (las siluetas de molinos resolverían a bodas de Camacho). Las pruebas NT/FP deben fijar espacio canónico (`DQ.MA.*` por `logical_uri`), nunca el número | Comparación directa de ambos ficheros + E-08 (SHA-256 por URI) |
| H-A6 | Media (señales antispoiler) | Divergencia de señales entre espacios para el mismo fichero: manifiesto de escenas `spoiler_risk: high` para `molinos_post` vs `DQ.MA.900006 spoiler_level: leve`. Confirma la degradación de E-2 a orientativa (D-6): **ninguna señal actual basta sola**; rige fail-closed E-4 | `assets/scenes/manifest.json` vs. `DQ.MA.900006.json`; EVALUACION_R09 §1 |
| H-A7 | Media (visados) | Los tres MA de molinos están en `review.state: borrador` sin revisor ni fecha: **no existe visado curatorial registrado** que habilite E-3; NT-R12-06 (exclusión de recursos rechazados) no tiene hoy ni siquiera registro de vetos | §0 (review de los tres JSON) |
| H-A8 | Informativa (alcance del CI) | El CI verde 53/53 en `afc7264` se reproduce localmente (E-01…E-06) pero **cubre exclusivamente el contrato v1.0/1.1**: no prueba D-6, cardinalidades nuevas, herencia visual ni runtime — coherente con el encargo | E-01…E-06 + sondas |
| H-A9 | Informativa (C21) | Los datos de Q.315/Q.316/Q.318 están **pre-R15** (`review: borrador`, prompts antiguos); las rectificaciones R15 viven como propuestas documentales (`docs/data/propuestas_editoriales_…json`) con altas de pasajes P0005/P0006 sin registrar. La batería C21 se mantiene independiente y no contamina H5 | C21-R12-01/03; SUBSANACION_EDITORIAL_R15 |

---

## 5. Condiciones de desbloqueo (orden de tramitación)

1. **Coaprobación editorial-técnica** de la evaluación R09 (A+D + opción 2 + E-1 reformulada) — R01/R02 + R09 + arbitraje R14.
2. **PR técnica v1.2.0** (`minItems: 0` + enum `1.2.0` + fixtures CT-1/CT-2/CT-6 + regresión CT-5), doble firma, autorización R14 → habilita CT-R12-01, CT-R12-05, CT-R12-08.
3. **Segmentación editorial I.8** en escenas A/B y re-anclaje (900005→B05 o B04 ratificado; 900006→B08; B07 neutra; SILENCIO opcional; B09→NARRACION por D-1) — R03/R01/R02, visado R05/R06.
4. **Conversión ficha→datos** (JSON de escenas + paquete) con validación de contrato → habilita NT-R12-01…NT-R12-05 a nivel dato.
5. **Registro trazable de visados/vetos** de recursos por escena (E-3) — R05/R06 → habilita NT-R12-06 a nivel dato.
6. **GO de runtime y reproductor (R10)** — propietario/R14 → habilita FP-R12-01…10 y AC-R12-01…05.
7. **Integración C21** (aplicación de propuestas R15 + altas P0005/P0006 + visados individuales) — R02/R09/R15/R14 → habilita C21-R12-03 y C21-R12-05 (nivel datos); su runtime sigue dependiendo de 6.

Mientras no se cumplan 1–2 y 6, el estado del proyecto sigue siendo: **PLAN QA PREPARADO / CT-FP NUEVAS NO EJECUTADAS / RUNTIME SIN GO.**

---

## 6. Reglas de evidencia y trazabilidad

- Cada ejecución de suite deja informe versionado (`tests/contracts/last_validation_report.json`); las pruebas FP exigirán capturas por beat y recorrido completo registrado.
- Ninguna afirmación de calidad cubre el binario sin smoke nativo (encargo §5.2.9): Playwright web no basta para el ejecutable.
- Las clasificaciones de esta matriz solo cambian con evidencia nueva citada (SHA de commit + salida).
- La batería C21 mantiene expediente y veredictos propios; ningún resumen H5 agregará resultados C21.

## 7. Resumen numérico y estado

| Estado | Pruebas |
|---|---|
| EJECUTADA Y VERIFICADA | **9** — CT-R12-02, 03, 04, 06, 07, 09 · C21-R12-01, 02 · PC-R12-01 |
| EJECUTABLE AHORA, PENDIENTE | **3** — C21-R12-03, C21-R12-05 (nivel datos) · PC-R12-02 |
| BLOQUEADA POR IMPLEMENTACIÓN | **25** — CT-R12-01, 05, 08 · NT-R12-01…06 · FP-R12-01…10 · AC-R12-01…05 · C21-R12-04 |
| **Total** | **37** |

**ESTADO: PLAN QA PREPARADO / CT-FP NUEVAS NO EJECUTADAS / RUNTIME SIN GO.**

*Solicitudes a R14: (1) tomar esta matriz como base de la auditoría QA del diseño A+B+D; (2) ordenar la tramitación de las condiciones §5 en el orden indicado; (3) resolver H-A5 (identidad DQ.MED/DQ.MA) antes de cualquier consumidor que resuelva medios; (4) confirmar que la batería C21 se gestiona en expediente separado.*

*R12 — QA y Pruebas de Aceptación. Documento de trabajo remitido a R14. Sin modificar pruebas ni código productivo. Sin GO de runtime.*
