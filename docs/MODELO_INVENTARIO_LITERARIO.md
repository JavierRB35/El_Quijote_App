# MODELO DE INVENTARIO LITERARIO — Modo Historia (R01 + R02)

**Versión:** propuesta 1.0 · **Fecha:** 2026-11-06 · **Modo:** CONTENIDOS · **Roles:** R01 (dirección editorial/cervantista) + R02 (filólogo/documentalista textual), con criterios de guion de R03.
**Estado:** documento metodológico y datos de demostración; **no** modifica esquemas ni contratos (pendientes de R09/R11); no autoriza producción.
**Encargo:** demostrar el método en un capítulo antes de inventariar los 126 (Biblia §2, hito H1). Capítulo demostrativo: **I, 8 — los molinos de viento**.
**Documentos rectores:** `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` (§1 TS-001, §2 H1/H3, §3 R01–R03, §4 contrato, §6 aceptación), `docs/ENCARGO_MAESTRO.md`, `docs/VISION_Y_DECISIONES.md`, `docs/CONTRATO_EDITORIAL_TECNICO.md`.

---

## 1. Objeto y alcance

Este modelo define la **matriz `unidad_narrativa`** (entregable R02, H1) y su protocolo de localización, de forma que:

1. Cubra obligatoriamente las seis dimensiones del encargo: **acontecimientos y personajes**, **situaciones cómicas y su mecanismo**, **diálogos a conservar literalmente**, **relatos intercalados y sus narradores**, **condensaciones justificadas** y **evolución emocional de don Quijote y Sancho**.
2. Cumpla el criterio de aceptación: **una persona independiente puede localizar cada fragmento de la escena en la edición textual de referencia** sin ayuda del autor del inventario (§5).
3. Sea compatible con el contrato actual (`Edition/Chapter/Passage/Question/MediaAsset`): las unidades **apuntan a pasajes existentes** y solo **proponen** pasajes nuevos, sin alterarlos.

## 2. Ediciones y registro de fuente (H0)

Arquitectura textual de tres capas, conforme a la resolución de PEND-01 (`docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md`, RESUELTA 2026-11-05; registro en `docs/VISION_Y_DECISIONES.md`):

| Rol de la capa | Identificador | Uso | Estado |
|---|---|---|---|
| **Edición de lectura** (lo que muestra el lector) | `DQ.ED.0001` — EPUB Tusell/Tasso 1905, ortografía modernizada | Texto del lector; correspondencia registrada en el `anchor` de cada pasaje | vigente, uso interno autorizado |
| **Fuente de extracción de citas** (base literal del paquete) | `DQ.ED.0003` / `DQ.SRC.0005` — PG eBook #2000 (`content/textos/gutenberg_2000/El_Quijote.txt`) | Todo `text_original` y toda cita literal se extraen VERBATIM de este fichero, con offsets y hash | vigente, almacenado |
| **Edición de cotejo académico** | `DQ.ED.0002` / `DQ.SRC.0004` — ed. Instituto Cervantes dir. Rico (2004, rev. 2015) | Cotejo puntual de variantes; requisito para estado `REVISADA_CERVANTISTA`; NO se almacena ni redistribuye | vigente, solo consulta/cita |
| **Respaldo princeps** (variantes) | Juan de la Cuesta 1605/1615 (BNE/BVPB) | Resolución de dudas de época | dominio público |

Variante documentada entre capas (motivo del cotejo obligatorio): el EPUB Tasso dice «Fristón» donde PG #2000 dice «Frestón» (registro completo en `docs/data/cotejo_texto_referencia.json`). Las citas de este inventario y de la ficha de escena proceden de la capa PG #2000; cualquier divergencia con el lector es variante de edición documentada, no error de transcripción.

**Convención de anclaje verificada empíricamente** (documentada porque el equipo la necesita para reproducir offsets): los `position.start_char/end_char` del catálogo de pasajes están calculados sobre el texto de PG #2000 **decodificado UTF-8 y con saltos `CRLF→LF` normalizados** (2.168.088 caracteres; el archivo físico pesa 2.225.775 bytes CRLF). El inventario usa esa misma convención y añade **números de línea** del archivo normalizado, que son la forma más práctica de localización humana.

## 3. La unidad narrativa

La **unidad** es la porción mínima de texto fuente con significado narrativo propio: un hecho, un intercambio de diálogo, una arenga, un acto cómico, una transición, un marco de narrador o un relato insertado. Un capítulo se desglosa en unidades en **orden canónico**; ninguna porción significativa queda fuera de una unidad (regla de cobertura, métrica §6 de la Biblia).

### 3.1 Campos obligatorios

| Campo | Tipo | Definición |
|---|---|---|
| `unit_id` | ID estable | Patrón `DQ.UN.P{1\|2}.C{nn}.U{nnn}`. Nunca se reutiliza tras retirada (Biblia §4). |
| `chapter_id` | ID | `DQ.P1.C08`, etc. |
| `orden_canonico` | entero | Posición de la unidad dentro del capítulo según el texto fuente. |
| `titulo` | texto | Rótulo operativo breve. |
| `literary_kind` | enum | `HECHO` · `DIALOGO` · `ARENGA` · `DESCRIPCION` · `TRANSICION` · `MARCO_NARRATIVO` · `RELATO_INTERCALADO`. |
| `segmento_refs[]` | IDs | Segmentos de `docs/data/piloto_segmentacion.json` cubiertos (no duplicar inventarios; enlazar). |
| `passage_ids[]` | IDs | Pasajes existentes del catálogo que contienen (total o parcialmente) la unidad. |
| `pasajes_propuestos[]` | objetos | Fragmentos fuente sin pasaje aún, con ID propuesto, texto verbatim y localizador verificado. Pendientes de alta editorial; **no se citan como literales sin este registro propuesto**. |
| `actores[]` | IDs | Personajes del catálogo (`DQ.PER.*`) presentes en la unidad (los citados o actuantes, no los meramente mencionados; marcados `mencion`). |
| `hechos[]` | texto | Acontecimientos narrativos, en orden, con causa y desenlace. |
| `humor` | objeto | Siempre presente; `presencia: false` si no hay comicidad (decisión expresa, métrica Biblia §6). Si hay: `preparacion`, `mecanismo`, `reaccion`, `registro`. |
| `dialogos_literales[]` | objetos | Intervenciones a conservar palabra por palabra: `speaker_id`, `texto`, `locator`, `motivo_conservacion` (humor, voz, emoción, valor literario). |
| `relato_intercalado` | objeto\|null | Si la unidad inserta una historia dentro de la historia (§3.4). |
| `condensacion` | objeto\|null | Si se comprime u omite en el guion (§3.5). |
| `arco_emocional` | objeto | Evolución de cada actor principal en la unidad: `DQ.PER.0001` (don Quijote), `DQ.PER.0002` (Sancho), otros. |
| `relevancia` | enum | `ESENCIAL` (sin ella se rompe hecho u humor) · `ALTA` · `MEDIA` · `BAJA`. |
| `spoiler_risk` | enum | `NINGUNO` · `LEVE` · `REVELADOR` (impacto si se dramatiza antes de tiempo). |
| `tratamiento_propuesto` | enum | `DRAMATIZACION` · `NARRACION_ILUSTRADA` · `MIXTO` · `ENLACE` · `OMISION_CONDENSADA` (decisiones R01/R03). |
| `localizacion_verificada` | objeto | Rango `start_char/end_char` + líneas del capítulo; `estado: PASS` solo tras verificación automática (§5). |
| `review_state` | enum | `INVENTARIADA` → `DOCUMENTADA` → `REVISADA_CERVANTISTA` → `GUIONIZADA`… (puertas Biblia §6). |

### 3.2 Acontecimientos y personajes

Los `hechos[]` se enuncian con **causa y desenlace** y se distinguen tres planos que no deben mezclarse en el guion: (a) **realidad diegética** (lo materialmente ocurrido: viento, aspas, caída), (b) **percepción de los personajes** (gigantes, encantadores, Frestón) y (c) **marco del narrador** (ironía, autorías ficcionales). Los `actores[]` usan los IDs del catálogo; para el piloto: `DQ.PER.0001` don Quijote, `DQ.PER.0002` Sancho, `DQ.PER.0003` Rocinante.

### 3.3 Situaciones cómicas: preparación → mecanismo → reacción

Toda unidad cómica documenta la cadena completa (Biblia §5):

- **Preparación:** qué instala el texto (expectativa, solemnidad, solemnización paródica, advertencia previa).
- **Mecanismo:** qué genera la risa, nombrado con precisión: equívoco perceptivo (aspas=brazos), desacuerdo de registros (épico/doméstico), lógica interna impecable sobre premisa falsa (Frestón), materialismo literal frente a abstracción (despojos = hábitos), parodia genérica (latinazo de arenga `Non fuyades`), contraste entre narrador neutro y personajes…
- **Reacción:** quién ríe o qué consecuencia cae (Sancho remeda, la caída física, la paliza mundana).

Reglas: no explicar el chiste en la escena (la explicación va en la ficha, no en el texto visible); no comicizar donde hay dolor o ambivalencia (la caída también lastima); conservar el mecanismo aunque se condense el texto.

### 3.4 Diálogos a conservar literalmente

Criterios para declarar `CITA_LITERAL` (R01): (a) sostiene el **mecanismo humorístico** o su punto exacto; (b) define la **voz** del personaje (modo de hablar de Sancho, hipergenia de don Quijote); (c) carga la **emoción** del giro de escena; (d) valor literario reconocido. Todo lo demás se adapta (`ADAPTACION_FIEL`) o se enlaza (`NARRACION_ENLACE`) — triple etiqueta exigida por TS-001 §1. La cita literal exige registro: pasaje existente o `pasajes_propuestos` con localizador verificado. **Nunca** se redacta una cita «de memoria».

**Estructura mínima de cada intervención del guion** (obligatoria; aplicada desde la ficha demostrativa): toda intervención declara (1) `speaker_id` correctamente identificado; (2) `texto_visible` — lo que se muestra en pantalla, íntegro, incluidos los incisos del narrador («—respondió Sancho—»), que forman parte del texto literario; (3) `texto_oral` — lo que se entrega al intérprete de voz: solo las palabras del hablante, con los incisos retirados y la puntuación de diálogo regularizada; (4) `text_kind` (`CITA_LITERAL`/`ADAPTACION_FIEL`/`NARRACION_ENLACE`); (5) `passage_ref` (pasaje existente o propuesto con localizador). En las intervenciones del narrador, `texto_oral` coincide con `texto_visible` y `incisos_narrador` es vacío. TS-001 aplica también a narraciones y diálogos adaptados: si se pronuncia, se muestra.

### 3.5 Relatos intercalados y sus narradores

Cuando una unidad inserta una historia dentro de la historia se rellena:

```json
{
  "titulo": "…",
  "narrador_intradiegetico": "ID/roles: quién cuenta",
  "destinatarios": ["…"],
  "situacion_narrativa": "dónde y por qué se cuenta ahora",
  "funcion": "espejo/contraste/pausa/parodia…",
  "marcos_de_autoria": ["primer autor", "Cide Hamete", "traductor de moriscos…"],
  "tratamiento_propuesto": "DRAMATIZACION|NARRACION_ILUSTRADA|MIXTO",
  "extension_relacion": "capítulos ocupados"
}
```

Ejemplo de referencia del método (fuera del alcance de esta demostración; se inventariará en H1): la historia de **Marcela y Grisóstomo** (I, 12–14) la cuenta **un cabrero** a don Quijote y Sancho a la puerta de su choza; función: contraste entre mundo pastoril literario y realidad; tratamiento `MIXTO`. En I, 8 no hay relato insertado, pero sí un **marco de autorías ficcionales** (unidad `U-10`: el primer autor suspende la batalla por falta de escrito y el «segundo autor» encuentra el fin — semilla de Cide Hamete en I, 9), que el modelo registra con `MARCO_NARRATIVO`.

### 3.6 Condensaciones justificadas

Toda condensación u omisión relevante se registra **en la unidad, no en el guion suelto**:

```json
{
  "que_se_condensa": "…",
  "motivo": "duración | redundancia | ritmo | TS-001/legibilidad …",
  "que_se_pierde": "… (con honestidad: si se pierde humor o matiz, se dice)",
  "riesgo": "…",
  "compensacion": "… (qué se conserva del mecanismo)",
  "aprobacion": "PROPUESTA | R01_APROBADA_CON_CONDICION_<fecha> | R01_FIRMADA",
  "aprobacion_historico": "estado anterior, si lo hubo (nunca contradice al vigente)",
  "condiciones_obligatorias": ["… lista explícita de condiciones cuando el dictamen es CON CONDICION …"],
  "alternativa_acceso": "lector íntegro (DC-19)"
}
```

Regla de univocidad de estados (dictamen de coordinación, 2026-11-06): el campo `aprobacion` expresa **el estado vigente** y no puede contradecir a `resolucion_r01`; cuando una propuesta se eleva por resolución R01, el estado anterior se conserva en `aprobacion_historico` y las condiciones de la aprobación se listan en `condiciones_obligatorias`.

Regla DC-19: el hecho, el orden canónico, las causas, los desenlaces y el humor significativo permanecen comprensibles. Una unidad `ESENCIAL` no puede terminar en `OMISION_CONDENSADA` sin firma de R01 y decisión expresa de coordinación.

### 3.7 Evolución emocional de don Quijote y Sancho

Cada unidad anota `arco_emocional` por actor: **estado previo → giro → estado resultante**, con la **causa textual** (qué línea lo provoca). La suma de las unidades debe permitir verificar los arcos de episodio (`Episodio.character_arcs`, Biblia §4) sin relecturas: el inventario es la fuente del mapa de arcos (H2). Convenciones mínimas: nombrar la emoción con precisión (euforia expansiva, fervor devoto, indignación doméstica, resignación…) y no confundir emoción del personaje con efecto en el lector (eso es `humor.reaccion` o nota de guion).

## 4. Tipos de tratamiento y puerta de estados

`DRAMATIZACION` (se encarna en beats con voz) · `NARRACION_ILUSTRADA` (narrador + imagen) · `MIXTO` · `ENLACE` (`NARRACION_ENLACE`, costo mínimo) · `OMISION_CONDENSADA` (queda en inventario, con motivo; nunca desaparece).

Puertas (Biblia §6): `INVENTARIADA` (esta entrega) → `DOCUMENTADA` (metadatos completos) → `REVISADA_CERVANTISTA` (R01) → `GUIONIZADA` (R03) → … Una unidad entregada hoy queda en `INVENTARIADA` salvo verificación de localización (`estado: PASS` del localizador, que sí se ejecuta).

## 5. Protocolo de localización independiente (criterio de aceptación)

Cada unidad, diálogo literal y beat de la ficha lleva un **localizador doble**:

1. **Líneas:** `PG 2000 · líneas L1–L2` sobre `content/textos/gutenberg_2000/El_Quijote.txt` normalizado a `\n` (una persona abre el fichero y cuenta líneas: localización humana directa).
2. **Caracteres:** `offset A–B` con la convención de §2 (compatible con el catálogo `Passage.position`).

El paso **«capítulo → líneas»** queda verificado por la tabla del §7 (línea 2556 = cabecera del capítulo VIII; línea 2864 = cabecera del IX). La verificación automática (`scripts` de este encargo) comprueba para cada fragmento: (a) que el texto del rango coincide exactamente con la cita declarada (normalizando solo espacios finales de línea), (b) unicidad del arranque del fragmento dentro del capítulo, (c) que los pasajes citados existen en el catálogo. Resultado: `estado: PASS`.

## 6. Relación con otros entregables (sin duplicar)

- Con `docs/data/piloto_segmentacion.json`: la unidad **enlaza** `segmento_refs` (misma verdad, más fina). No se crean segmentaciones paralelas.
- Con `content/piloto/passages/`: los pasajes siguen siendo la única fuente de citas cotejadas; el inventario solo los referencia o **propone** nuevos.
- Con la ficha de escena (`docs/FICHA_ESCENA_P1_C08_MOLINOS.md`): la ficha consume unidades (`unit_ids`); si la ficha necesita texto sin pasaje, lo toma de `pasajes_propuestos` de esta matriz, nunca de una transcripción libre.

## 7. Verificación del capítulo demostrativo

| Ancla | Líneas PG 2000 | Verificación |
|---|---|---|
| Cabecera del capítulo VIII | 2556–2558 | PASS |
| «En esto, descubrieron treinta o cuarenta molinos…» | 2560–2561 | PASS |
| «— Non fuyades, cobardes y viles criaturas…» | 2591–2592 | PASS |
| Embestida y caída («…fue rodando muy maltrecho por el campo») | 2600–2606 | PASS |
| «— ¡Válame Dios! —dijo Sancho…» | 2610–2612 | PASS |
| «— Calla, amigo Sancho…» (Frestón) | 2614–2619 | PASS |
| Transición del Puerto Lápice | 2623–2625 | PASS |
| Frailes y coche | 2708–2726 | PASS |
| Presentación ante la señora del coche | 2775–2783 | PASS |
| Desafío del vizcaíno | 2791–2806 | PASS |
| Suspensión de la batalla y marco de autorías | 2848–2857 | PASS |
| Cabecera del capítulo IX | 2864 | PASS |

Datos del capítulo demostrativo: `docs/data/inventario_literario_p1_c08.json` (12 unidades, cobertura continua de las líneas 2556–2857; verificación automática: **77 PASS / 0 FAIL**, 2026-11-06). Ficha de escena resultante: `docs/FICHA_ESCENA_P1_C08_MOLINOS.md` (9 beats, 16 intervenciones con texto visible, 16/16 localizadores verificados).
