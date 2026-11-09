# Issue #90 — QA de cobertura, preguntas, Historia y activos (corte 2026-11-09)

## Contexto y método reproducible

- **Fuente única de inventario:** `main` de `JavierRB35/El_Quijote_App`, **commit `ea6ad7aa0f10f253c82a6ab8f10cd2c81d92959e`** (sin mezclar archivos de PR #79/#87/#89).
- **Rutas leídas:** `AGENTS.md`; `docs/ENCARGO_MAESTRO.md`; `docs/VISION_Y_DECISIONES.md`; `docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md`; `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md`; `docs/data/mapa_capitulos.json`; `schemas/content/question.schema.json`; `content/piloto/package.json`; los **74** `content/piloto/questions/DQ.Q.*.json` y muestras de `passages/` y `media_assets/`.
- **Blob SHA de referencias:** `AGENTS.md=cca85b1f7eac7a7bbc394ee133bbe6862f8dafa6`; `docs/data/mapa_capitulos.json=d9905bd5141e924063defea38710acab0d5b6818`; `schemas/content/question.schema.json=ce24a6e70c4e5c45492f92be6368cd6669528eaa`; `content/piloto/package.json=e99b94fcfed224b2a190301847b27a266807d445`; `docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md=bf4a0f7001fcfece5a0b3bcbc4bd321c3de13af1`.
- **Estado editorial:** todas las fichas leídas dicen `review.state=borrador`. La clasificación PASS de abajo significa **solo el chequeo especificado**, nunca aprobación editorial, filológica o de calidad visual.
- **Edición de base de batería:** `DQ.ED.0003` / `DQ.SRC.0005` (PG 2000), según PEND-01 **resuelta**; lector Tusell `DQ.ED.0001`; edición Rico para cotejo puntual. Las seis nuevas propuestas se contrastaron en capítulos I.7/I.9 de https://www.gutenberg.org/cache/epub/2000/pg2000-images.html; no se han generado citas literales contractuales.
- **Límite técnico:** inspección de datos y comprobaciones JS de estructura/referencias; no se ejecutaron `pytest`, `npm test`, `cargo test`, build, CI ni consumidor de la aplicación. Tampoco se cotejaron en bloque todas las `evidence.quote` contra el archivo íntegro ni se evaluaron licencias individualizadas.

## Resultados PASS / FAIL / PENDIENTE

| Control | Estado | Resultado observado | Consecuencia |
|---|---|---|---|
| Capítulos del mapa | **PASS** | 126 registros: Parte I = 52; Parte II = 74 | Inventario total, no textos ni guiones terminados |
| Cobertura de preguntas | **PASS (inventario)** | 74 fichas, 10 capítulos con ≥1 pregunta; **116 sin ficha** | `cobertura_126_capitulos.csv`; no cuota artificial |
| Referencias a paquete | **PASS (referencial)** | 74/74 IDs de pregunta, episodio y los IDs declarados de pasaje/medio existen en las listas del `package.json` | No verifica contenidos de cada pasaje |
| Solución de respuesta | **PASS (básico)** | 74/74: opciones e IDs referenciados existen; `ordering` y `matching` con solución estructural; `multi_choice` declarada | NO prueba unicidad semántica ni calidad de distractores |
| Enlace `evidence.passage_id` ↔ `passage_ids` | **FAIL** | **73/74** coherentes; **Q.312** incoherente | Reparar en expediente separado con cotejo textual |
| `semantic_key` exactamente repetida | **PASS (exactitud literal)** | 0 claves idénticas dentro de las 74 | No demuestra ausencia de duplicados semánticos |
| Similitud textual aproximada | **PENDIENTE HUMANO** | `Q.225` y `Q.318` comparten plantilla «Ordena los lances...», pero tratan episodios diferentes | Posible falso positivo; no declarar duplicado sin revisión |
| Distractores, explicación y citas | **PENDIENTE** | Explicaciones no vacías en matriz; no cotejo íntegro de cita, justicia de distractores ni interpretación | QA literario por ficha antes de elevar `review.state` |
| Antiespoiler y secuencia | **PENDIENTE** | Política declarada, pero momento preciso de `Beat` e imagen previa no verificados conjuntamente | Prohibido cerrar como integrable |
| Exclusividad visual DC-24 | **FAIL para producto final / PENDIENTE selección** | 58 preguntas comparten imagen con otra; 16 tienen ID de medio único **dentro del lote** (incluido hotspot Q.112); 0 sin medio declarado | 17 IDs reutilizados. Necesita encargo artístico específico y QA |
| Licencias por imagen | **PENDIENTE** | Solo se verificó existencia declarativa de IDs; no se hizo clearance individual | No inferir permiso de redistribución |
| Revisión editorial | **PENDIENTE** | 74/74 `borrador`; 0 revisadas/aprobadas por esta tarea | No mover a catálogo final |
| Historia TS-001 | **PENDIENTE VALIDACIÓN** | 11 beats propuestos con texto completo en `historia_I07_I09_beats_y_ts001.md` | No hay audio ni ejecución; no equivale a Historia terminada |
| Contrato JSON Schema y pruebas reales | **NO EJECUTADAS** | No se ha corrido la suite original del repositorio | `PASS_BASICO` en CSV no es `PASS` de CI |

**Distribución real de tipos del piloto:** `single_choice=49`; `true_false=9`; `multi_choice=9`; `ordering=4`; `matching=2`; `hotspot=1` (total 74).

**Capítulos con preguntas:** I.1 (6), I.6 (8), I.8 (12), I.11 (8), I.16 (6), I.18 (9), I.21 (6), II.1 (6), II.10 (6), II.74 (7). Los restantes 116 no contienen fichas de pregunta en el inventario de piloto ni `content/questions/` (solo `.gitkeep`).

## Incidencias verificables

### P0 editorial — Q.312: evidencia fuera de lista de pasajes

`content/piloto/questions/DQ.Q.000312.json` declara `passage_ids=[DQ.P1.C16.P0001]` y simultáneamente `evidence[0].passage_id=DQ.P1.C16.P0002`. El registro `DQ.P1.C16.P0002.json` existe, pero la relación contractual en Question es inconsistente. Debe verificarse **qué pasaje respalda realmente el enunciado** y solo entonces corregir la ficha mediante propuesta específica; no añadir el ID a ciegas para hacer pasar validación. Este issue **no modifica** el JSON productivo.

### P0 visual — reutilización de imágenes en preguntas distintas

`backlog_visual_74.csv` identifica 58 preguntas asociadas a uno de 17 recursos compartidos. El mismo `DQ.MA.*` no satisface la exclusividad exigida para cada pregunta definitiva (DC-24) sin una variante realmente distinta y trazada. Las otras 16 tienen ID único **solo dentro de la muestra**: necesitan comprobar composición antiespoiler, clasificación, derechos, relación con beat y disponibilidad real.

**Precisión Q.112:** es `hotspot`; **sí tiene** recurso `hotspot_media_id=DQ.MA.000026` y no necesita ser falsamente clasificada como «sin imagen». Su uso de una acuarela de la embestida requiere verificar **el momento de presentación** y la no revelación de respuestas anteriores, además de geometría y accesibilidad. En la matriz, `pre_imagen_id` se mantiene correctamente vacío y `hotspot_media_id` se registra por separado.

### Riesgo de trabajo paralelo — Q.315/Q.316/Q.318 y guion existente

`docs/SUBSANACION_EDITORIAL_R15_Q315_Q316_Q318.md` mantiene propuestas documentales condicionadas y pasajes candidatos. Su redacción y estados **no se han sobrescrito**. Tampoco se toca `app/src/`, `assets/scenes/`, `assets/closeups/` ni `content/piloto/`.

### Visibilidad del repositorio

La consulta de metadatos GitHub del 2026-11-09 devuelve `visibility=public` para este repositorio, mientras varios documentos antiguos dicen «privado». Debe tratarse el estado real de permisos con prioridad antes de subir materiales no redistribuibles; esta rama contiene únicamente texto editorial original y metadatos. **No se ha cambiado la visibilidad**.

## Prioridad por lotes (propuesta, no orden de publicación)

| Lote | Capítulos | Objetivo y razón |
|---|---|---|
| **L1 ahora** | **I.7, I.9** | Lagunas contiguas al piloto I.8: nacimiento de la pareja, segundo narrador, Cide Hamete y desenlace del combate; máxima continuidad con escenas actuales |
| **L2 después** | I.12, I.14, I.20, I.22 | Marcela/Grisóstomo, miedo y batanes, galeotes; diálogo, ética, humor y acción variados |
| **L3 tras L2** | II.23, II.41, II.42, II.53 | Cueva de Montesinos, Clavileño, consejos de gobierno, cierre del gobierno de Sancho; balance Parte II |
| **Restantes** | 116 capítulos sin fichas menos los priorizados | Pendientes de priorización semántica real, fuentes y capacidad visual; **no** se fija cuota por capítulo |

Los lotes no confieren autorización de Fase 2 ni de integración en el juego. Las seis candidatas I.7/I.9 de `lote_candidatas_I07_I09.json` están fundamentadas en lectura puntual, con IDs **ISS90** provisionales, opciones seleccionadas, `semantic_key`, explicación, antiespoiler y necesidades visuales; siguen no publicables.

## Siguiente puerta de calidad

1. Resolver Q.312 con cotejo de pasajes y autoridad de edición; revisar en paralelo las rectificaciones ya abiertas Q.315/Q.316/Q.318 sin colisión.
2. Cotejar preguntas candidatas con PG #2000 del repositorio y edición Rico; crear anclas y pasajes contractuales legítimos sin editar el texto del lector.
3. Deduplicación conceptual y revisión de distractores en los 74 registros más los seis candidatos.
4. Dirección decide medios aprovechables y prompts artísticos por pregunta; auditar imágenes previas, licencias, variantes y TS-001.
5. Desarrollador único ejecuta validación JSON Schema, tests, integración y capturas/QA; Dirección aprueba por puertas.
6. Solo entonces admitir cambio de estado e integración, mediante PR propia y sin merge automático.
