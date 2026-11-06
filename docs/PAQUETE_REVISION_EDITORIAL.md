# PAQUETE ÚNICO DE REVISIÓN EDITORIAL — decisiones pendientes del piloto

**Fecha:** 2026-11-06 · **Preparado por:** DESARROLLO (R09/R11) a partir del dictamen de Coordinación sobre PR #35/#36.
**Objetivo:** un solo expediente que agrupe **todas** las decisiones editoriales pendientes del piloto, con **tabla común de visados por especialidad** (R05, R06, R12, R01/R02) y **comprobación técnica posterior (R09)** — según la recomendación expresa: «una única pasada de R01/R02 no sustituye los visados de R05, R06 y R12».
**Regla de cierre:** una fila queda decidida cuando las cuatro especialidades marcan conformidad (o rechazo con motivo) **y** R09 valida la viabilidad técnica del resultado. Ninguna fila de este paquete autoriza por sí sola integración en runtime.

## A. Las 14 propuestas antiespoiler (PR #30 — no incorporadas a la matriz #32)

Fuente: `docs/data/propuesta_correcciones_visuales_pre_r15.csv` (13 `RETIRAR_PRE` + 1 `MANTENER_CONDICIONAL`). Estado: **0/14 incorporadas, 0/14 aprobadas** (PR #35).

**Medios y condiciones temporales concretas** (extraídos del catálogo del piloto, `content/piloto/questions/`, para que cada especialidad revise sin reconstruir el contexto): la imagen pre actual de cada pregunta y su condición temporal declarada (`spoiler_policy.safe_after_episodes` = su propio episodio; el gating ya impide presentarlas antes de completarlo).

| # | Pregunta | Episodio | Pre-imagen actual | Condición temporal (safe_after) | Propuesta PR #30 | Visados |
|---|---|---|---|---|---|---|
| A-01 | Q.217 | DQ.P1.C18.E01 | `DQ.MA.900008` | C18.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-02 | Q.232 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-03 | Q.233 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-04 | Q.234 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-05 | Q.235 | DQ.P2.C74.E01 | `DQ.MA.900042` | C74.E01 | retirar pre | **R05-CC** · **R06-NC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-06 | Q.236 | DQ.P2.C74.E01 | `DQ.MA.900042` | C74.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-07 | Q.237 | DQ.P2.C74.E01 | `DQ.MA.900042` | C74.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-08 | Q.238 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-09 | Q.313 | DQ.P1.C21.E01 | `DQ.MA.900025` | C21.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-10 | Q.314 | DQ.P1.C21.E01 | `DQ.MA.900025` | C21.E01 | retirar pre | **R05-CC** · **R06-CC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-11 | Q.315 | DQ.P1.C21.E01 | `DQ.MA.900036` | C21.E01 | retirar pre | **R05-CC** · **R06-NC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-12 | Q.316 | DQ.P1.C21.E01 | `DQ.MA.900025` | C21.E01 | **mantener condicional** | **R05-PEND** · **R06-PEND** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-13 | Q.317 | DQ.P1.C21.E01 | `DQ.MA.900037` | C21.E01 | retirar pre | **R05-CC** · **R06-NC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |
| A-14 | Q.318 | DQ.P1.C21.E01 | `DQ.MA.900036` | C21.E01 | retirar pre | **R05-CC** · **R06-NC** · ☐ R12 · ☐ R01/R02 · ☐ R09 |

Nota técnica para el visado (R09/R12): la pre-imagen actual de todas ellas es una recreación `pre_pregunta` con `spoiler_level: ninguno` en el dato; la propuesta de PR #30 obedece a riesgos contextuales específicos (no al spoiler_level del catálogo). Retirar la pre en una pregunta no modifica su registro salvo en `visual_requirements.pre_image_media_id` (baja opcional del campo), y el gating temporal ya declarado sigue aplicando.

## B. Los 11 vínculos condicionados de las acuarelas 021/025 (adenda R12, PR #36)

Fuente: `docs/ADENDA_R12_TRATAMIENTO_ACUARELAS_021_025.md` + `INFORME_QA_PATRIMONIO_VISUAL.md` (R12-PIL-02). Condición ya vigente: **021 = alegoría (nunca documentación literal del escrutinio)**; **025 = apoyo ilustrado no literal** (recreación de la hoguera diferible).

| # | Vínculo | Destino/fase | Condición a visar | R05 | R06 | R12 | R01/R02 | R09 |
|---|---|---|---|---|---|---|---|---|
| B-01 | `R05C-000005` (021) | cuaderno · consulta | Rotulado «alegoría de expurgo» | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-02 | `R05C-000006` (021) | descubrimientos · discovery | Idem + sin uso como prueba del hecho | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-03 | `R05C-000007` (021) | lector · after | Idem, tras el desenlace | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-04 | `R05C-000008` (021) | lector · lectura contextual | Idem, anclada a su pasaje | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-05 | `R05C-000009` (021) | museo · after | Idem, ficha con atribución Tusell/Doré | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-06 | `R05C-000010` (021) | museo · consulta | Idem | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-07 | `R05C-000011` (021) | preguntas → discovery | Idem + `safe_after` del episodio | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-08 | `R05C-000505` (025) | cuaderno · consulta | Rotulado «apoyo ilustrado no literal» | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-09 | `R05C-000506` (025) | descubrimientos · discovery | Idem | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-10 | `R05C-000507` (025) | lector · lectura contextual | Idem (no recreación de la hoguera) | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |
| B-11 | `R05C-000508` (025) | museo · consulta | Idem, con atribución Tusell/Doré 1905 | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |

## C. El fallo contextual de `900157` (I,6)

Fuente: `INFORME_QA_PATRIMONIO_VISUAL.md` (2.ª auditoría R12) y `PROPUESTAS_MEJORA_VISUAL.md`. El fotograma `p1_c06_ama_sobrina_libros_pre.webp` (900157) deja de usarse entero en I,6; rescate posible con **recorte izquierdo** si pasa QA; el fichero original permanece íntegro.

| # | Decisión | Evidencia | R05 | R06 | R12 | R01/R02 | R09 |
|---|---|---|---|---|---|---|---|
| C-01 | Retirar 900157 del uso completo en I,6 y evaluar rescate por recorte | R12 2.ª auditoría | **R05-CC** | **R06-CC** | ☐ | ☐ | ☐ |

## D0. Pronunciamiento verificable R06 sobre A/B/C — 2026-11-06

**Modo:** DIRECCIÓN ARTÍSTICA R06 · **Sólo visado artístico documental**. La marca de esta columna no constituye aprobación de otro rol, integración, prueba de runtime, nueva inspección píxel a píxel ni autorización para modificar recursos. Se respeta el único expediente de visados de la PR #37 y la fe de erratas R06 aceptada por R14 en PR #38.

**Leyenda:** **R06-CC** = conforme **condicionado al uso y las verificaciones indicadas**; **R06-NC** = **no conforme con la propuesta visual completa** (sí se recomienda retirar la imagen previa; no se aprueba el nuevo destino visual); **R06-PEND** = falta evidencia de cronología y **no se permite mantener pre sin comprobarla**. **Resultado: 21 CC, 4 NC, 1 PEND; 0 aprobaciones conjuntas.**

### Evidencia y alcance de la verificación

- **14 propuestas y 14 preguntas cotejadas:** `docs/data/propuesta_correcciones_visuales_pre_r15.csv` (PR #30) y los JSON `content/piloto/questions/DQ.Q.000217.json`, `000232.json`–`000238.json`, `000313.json`–`000318.json`. En los JSON actuales persiste `pre_image_media_id`; **no** se han aplicado aún las propuestas. El `safe_after_episodes` del episodio completo **no acredita por sí solo** qué imagen puede aparecer en cada instante de pregunta.
- **Identidad de recursos cotejada** con `assets/scenes/manifest.json`: `900008`=rebaños I,18, `900011`=despedida II,74 (post), `900025`=Mambrino I,21, `900042`=Sansón Carrasco II,3, `900036`=segunda salida I,7, `900037`=manuscrito Toledo I,9, `900013`/`900230`=escrutinio I,6. Los JSON emplean `DQ.MA` y el manifiesto `DQ.MED`: el cotejo es por **sufijo numérico/identidad declarada**, sujeto a comprobación canónica R05/R09 antes de cualquier binding. **900042/900036/900037 no tienen apertura visual directa R12 registrada; por tanto NO se afirma PASS artístico de píxeles.**
- **QA y restricciones vigentes:** `docs/data/registro_revision_visual.csv`, `docs/INFORME_QA_PATRIMONIO_VISUAL.md` (R12 #31), `docs/ADENDA_R12_TRATAMIENTO_ACUARELAS_021_025.md` (PR #36), `docs/FE_ERRATAS_R06_POST_QA.md` (PR #38). R12 registró `021` **FAIL si se presenta como gesto literal**, `025` **PENDIENTE como hoguera literal**, `373` **PASS solo como alegoría de cierre**, y `900157` **FAIL en uso completo I,6**. `900013`/`900230` tienen continuidad conjunta **pendiente**.
- **Límite de esta revisión:** criterio artístico basado en metadatos de contenido y evidencia R12 ya documentada; **no** se han ejecutado pruebas TS-001, accesibilidad, zoom, hotspot, animatic ni contraste ocular independiente de los 26 enlaces. Ningún estado QA se modifica.

### Evidencia y decisión, fila por fila

| Fila | R06 | Fundamento y restricción |
|---|---|---|
| **A-01** | **CC** | Q.217 pregunta la causa de la polvareda; 900008 = rebaños I,18 según manifiesto, visibles antes de responder. Retirar pre; reveal solo tras describir la causa. |
| **A-02** | **CC** | Q.232 trata el anuncio de muerte; 900011 es despedida **post** II,74 (R12 la abrió). No anticiparla; discovery tras desenlace. |
| **A-03** | **CC** | Q.233 pregunta por la identidad Alonso Quijano; 900011 anticipa el cierre afectivo. Solo después de la renuncia al nombre y del relato completo. |
| **A-04** | **CC** | Q.234 pregunta el veredicto del cura. No presentar 900011 antes de confesión/veredicto; post_answer tras ambos y el hecho narrado. |
| **A-05** | **NC** | Retirar pre 900042 resulta prudente, pero **NO** reutilizar 900042 en post_answer II,74: el manifiesto lo identifica como **Sansón Carrasco, II,3**. Requiere medio alternativo pertinente. |
| **A-06** | **CC** | Retirar 900042 (II,3) de pre II,74. 373.jpg tiene PASS R12 **como alegoría del fin de los libros**, no prueba del autor del epitafio; discovery final y rotulada. |
| **A-07** | **CC** | Q.237: la paradoja del epitafio se transmite **en texto**. 373.jpg solo epílogo alegórico después de leerlo, no transcripción del epitafio. |
| **A-08** | **CC** | Retirar 900011 de pre II,74; 373.jpg se admite solo como comentario alegórico en discovery **tras la advertencia final**. |
| **A-09** | **CC** | Q.313 se refiere a los batanes; 900025 figura en I,21 **Mambrino** y anticipa episodio posterior. Retirar pre; post_answer solo cuando barbero ya haya aparecido. |
| **A-10** | **CC** | Q.314 compara percepciones: 900025 describe a barbero con bacía y adelanta la solución. Retirar pre; mostrar después de responder y de narrar ambas percepciones. |
| **A-11** | **NC** | Retirar 900036 de pre; **NO** recolocarlo en post_answer de Q.315: 900036 corresponde a la **segunda salida I,7**, no a la bacía I,21. |
| **A-12** | **PEND** | Q.316 permitiría pre 900025 **solo si** el encuentro con el barbero y objeto real ya están narrados. **No hay prueba de orden de puesta en escena**, por tanto **pre bloqueada hasta cotejo R01/R15**. |
| **A-13** | **NC** | Retirar 900037 de pre; **NO** usarlo en reveal de Q.317: 900037 es **manuscrito de Toledo I,9**, sin relación factual con bacía/yelmo I,21. |
| **A-14** | **NC** | Q.318 ordena hechos de I,21; ambos IDs sugeridos son ajenos: 900036 **segunda salida I,7**, 900037 **Toledo I,9**. Retirar pre; rechazar el post propuesto. |
| **B-01** | **CC** | 021 cuaderno/consulta: rotular **«alegoría de expurgo»**; no certificar cura/barbero examinando libros. |
| **B-02** | **CC** | 021 descubrimiento: mostrar como interpretación satírica tras situar el escrutinio; nunca prueba del gesto factual. |
| **B-03** | **CC** | 021 lector after: imagen alegórica **tras** la secuencia; texto completo en panel independiente (TS-001 pendiente). |
| **B-04** | **CC** | 021 lector contextual: anclar a I,6 **como alegoría**; R01 verifica el pasaje y su instante, sin fingir figuras literales. |
| **B-05** | **CC** | 021 museo after: ficha con atribución Tusell/Doré y etiqueta simbólica; no evento factual del escrutinio. |
| **B-06** | **CC** | 021 museo consulta: separar expresamente simbolismo del hecho novelístico; control de procedencia pendiente R13. |
| **B-07** | **CC** | 021 preguntas→discovery: después de responder y desbloquear episodio; no usar como evidencia de veredictos literales. |
| **B-08** | **CC** | 025 cuaderno consulta: **apoyo ilustrado no literal**, quema en **interior**, no corral nocturno; procedencia textual I,7. |
| **B-09** | **CC** | 025 descubrimiento: tras narrar el acto, con atribución y advertencia de libertad artística; no escena literal nocturna. |
| **B-10** | **CC** | 025 lector contextual: origen I,7; montaje after I,6 **requiere acuerdo R01/R06**, no cambio del origen textual; TS-001 no probado. |
| **B-11** | **CC** | 025 museo consulta: ficha Tusell/Doré 1905 con etiqueta no literal; no describir como hoguera inequívoca en corral ni inferir soledad del ama. |
| **C-01** | **CC** | 900157 **FAIL contextual R12**: DQ armado y Sancho en escrutinio I,6. Excluir plano completo; base 900013+900230 **candidata**, continuidad de rostros/luz/TS-001 pendiente; recorte izquierdo NO aprobado. |

**Regla para las cuatro NC (A-05/A-11/A-13/A-14):** separar aprobación de **retirada de `pre`** de aprobación del **medio que después se quiere mostrar**. R05/R15 revisarán identificador y destino; R01 verificará episodio/instante; R12 comprobará imagen y continuidad; R09 contrastará datos solo **tras** visados. No reasignar `media_ids` por este documento.

**Acciones pendientes de otras especialidades:** R01/R02 (texto y puertas de fase), R05 (vínculo e identidad canónica), R12 (QA/continuidad), R08/R12/R15 (TS-001 y presentación), R13 (atribución/derechos), R09 (contrato técnico tras visados), R14 (cierre global). **No se ha marcado ninguna columna ajena a R06 ni alterado CSV/JSON/manifiestos/activos**. Las cuatro ilustraciones H4 siguen **sin autorizar**.

---

## D1. Visado iconográfico R05 — 26 decisiones del expediente

**Fecha:** 2026-11-06. **Resultado: 25 R05-CC (conformidad documental condicionada), 1 R05-PEND (A-12)**. La conformidad valora la propuesta de retirada o su *posible* destino iconográfico, no acredita un uso ejecutable ni autoriza un nuevo MediaAsset. No hay inspección ocular propia nueva ni pruebas de aplicación; se usa evidencia R12 v0.2 y catálogo por URI/hash declarados. Los estados R06/R12/R01/R02/R09 **no se sustituyen**.

### Alerta P0 — R06 ha confundido DQ.MA con DQ.MED en cuatro rechazos

**Identidad cotejada por `logical_uri` y SHA-256 declarado en fichas del piloto**, frente al manifiesto y el registro maestro R12:

| ID que tienen las preguntas | Ruta de su MediaAsset **real** | ID de manifiesto correcto |
|---|---|---|
| `DQ.MA.900042` | `assets/scenes/part_2/chapter_74/p2_c74_testamento_quijano_post.webp` (SHA `fc3fbcf60f...`) | **`DQ.MED.900202`**, no `DQ.MED.900042` (Sansón II,3) |
| `DQ.MA.900036` | `assets/scenes/part_1/chapter_21/p1_c21_bacia_lluvia_pre.webp` (SHA `67601cff8d...`) | **`DQ.MED.900237`**, no `DQ.MED.900036` (segunda salida I,7) |
| `DQ.MA.900037` | `assets/scenes/part_1/chapter_21/p1_c21_sancho_bacia_examen_post.webp` (SHA `54d78b8f...`) | **`DQ.MED.900167`**, no `DQ.MED.900037` (manuscrito Toledo I,9) |

Los `R06-NC` actuales en **A-05/A-11/A-13/A-14** se basan en imágenes **distintas de las referenciadas por el JSON**. **Solicitar contrarrevisión R06** con URI/hash correctos; R05 no modifica el dictamen ajeno. Su corrección de identidad **no da PASS a la propuesta**: R12 inspeccionó la imagen real de `DQ.MA.900042` y la mantiene **PENDIENTE**; `DQ.MA.900036` y `DQ.MA.900037` siguen **PENDIENTE sin inspección visual directa**.

Fuentes: `content/piloto/media_assets/DQ.MA.900042.json`, `DQ.MA.900036.json`, `DQ.MA.900037.json`; los 14 JSON de preguntas, `docs/data/propuesta_correcciones_visuales_pre_r15.csv` (PR #30), `docs/data/registro_revision_visual.csv` (R12 v0.2), `docs/data/vinculos_consolidados_estado_qa_r12.csv` (**vista QA v2 corregida en PR #39**, 3.564 filas), `docs/ADENDA_R12_TRATAMIENTO_ACUARELAS_021_025.md`, `docs/FE_ERRATAS_R06_POST_QA.md`. Hashes **declarados**, no recalculados sobre bytes.

### Pronunciamiento y condición individual por fila

| Fila | R05 | Evidencia y condiciones para decisión conjunta |
|---|---|---|
| A-01 | **R05-CC** | Q.217: rebaños visibles en `DQ.MA.900008` (I,18; R12 inspeccionada). Retirar del foco que pregunta causa de polvareda; `reveal` únicamente tras respuesta/explicación. TS-001 y orden pendiente. |
| A-02 | **R05-CC** | Q.232: `DQ.MA.900011` despedida **post** II,74, spoiler crítico, inspeccionada R12. Retirar pre; `discovery` tras desenlace completo. |
| A-03 | **R05-CC** | Q.233: 900011 adelanta identidad y despedida; retirar pre y reservar `discovery` tras renuncia al nombre y cierre del relato. |
| A-04 | **R05-CC** | Q.234: retirar 900011 antes de veredicto del cura. `post_answer` solo si muerte/despedida ya narradas; de otro modo posponer hasta cierre, sin adelantar desenlace. |
| A-05 | **R05-CC** | Q.235: `DQ.MA.900042` es **testamento II,74** (manifiesto `DQ.MED.900202`), no Sansón II,3. Retirar pre; `post_answer` candidato tras testar, R12 la vio pero dictamen PENDIENTE. **R06-NC a revisar por URI.** |
| A-06 | **R05-CC** | Q.236: retirar testamento 900042 de previa: no prueba autoría del epitafio. `DQ.MA.000373` es alegoría de epílogo (R12 PASS para ese uso); solo `discovery` final rotulada. |
| A-07 | **R05-CC** | Q.237: respuesta del epitafio es textual. Retirar 900042 previa; `373.jpg` alegoría tras leer texto, no prueba del verso. |
| A-08 | **R05-CC** | Q.238: retirar despedida 900011 antes de la advertencia final; 373 solo como `discovery` alegórico tras fin II,74. |
| A-09 | **R05-CC** | Q.313: `DQ.MA.900025` = encuentro Mambrino/barbero I,21, futuro respecto a pregunta de lluvia/refugio. Retirar pre; mostrar tras encuentro. Sin inspección R12. |
| A-10 | **R05-CC** | Q.314: 900025 anticipa bacía y perspectivas. Retirar foco; `post_answer` tras contestar y narrar ambas percepciones, pendiente inspección R12. |
| A-11 | **R05-CC** | Q.315: `DQ.MA.900036` es **bacía bajo lluvia I,21** (`DQ.MED.900237`), no segunda salida I,7. Retirar pre; `post_answer` tras explicar protección del sombrero, pendiente apertura R12. **R06-NC a revisar.** |
| A-12 | **R05-PEND** | Q.316: mantener `DQ.MA.900025` antes de pregunta SOLO si se acreditan encuentro y objeto ya narrados; no hay prueba de orden real. **No visar mantener pre** hasta R01/R15 y R12; fallback sin pre y 900025 después. |
| A-13 | **R05-CC** | Q.317: `DQ.MA.900037` es examen de bacía **post** I,21 (`DQ.MED.900167`), no Toledo I,9. Retirar pre; `reveal` tras respuesta y reconocimiento, R12 sin inspección. **R06-NC a revisar.** |
| A-14 | **R05-CC** | Q.318: retirar 900036 (bacía lluviosa) si adelanta orden. 900037 (examen posterior, I,21) candidato `post_answer` tras ordenar lances, ambos pendientes de inspección R12. **R06-NC a revisar por ID.** |
| B-01 | **R05-CC** | 021 cuaderno/consulta: **alegoría de expurgo** (R12 vio gigante barriendo miniaturas caballerescas), no cura/barbero examinando libros de forma literal. |
| B-02 | **R05-CC** | 021 descubrimiento: contextualizar como sátira alegórica tras relato del escrutinio, nunca prueba del hecho. |
| B-03 | **R05-CC** | 021 lector/after: después de pasaje; rotulado alegórico y texto íntegro sin superposición (TS-001 pendiente). |
| B-04 | **R05-CC** | 021 lector/lectura contextual: anclar a pasaje I,6 verificado por R01, no usar como imagen literal del gesto de expurgo. |
| B-05 | **R05-CC** | 021 museo/after: atribución Tusell/Doré, edición Tasso 1905; distinguir símbolo literario de registro histórico. |
| B-06 | **R05-CC** | 021 museo/consulta: rotular alegoría, fuente/atribución y carácter no documental; revisión concreta R13. |
| B-07 | **R05-CC** | 021 pregunta Q.204/discovery: solo tras respuesta y `safe_after` I,6; nunca en foco como prueba de decisiones sobre libros. |
| B-08 | **R05-CC** | 025 cuaderno: R12 vio mujer quemando libros en **interior**, no corral nocturno. **Apoyo ilustrado no literal**, fuente textual I,7. No existe ficha canónica aprobada `DQ.MA.000025`. |
| B-09 | **R05-CC** | 025 descubrimiento: tras narrar quema, con crédito y nota de libertad artística; nunca reconstrucción nocturna literal. |
| B-10 | **R05-CC** | 025 lector: anclaje I,7; montaje `after` I,6 exige acuerdo R01/R06, no falsear origen; TS-001 pendiente. |
| B-11 | **R05-CC** | 025 museo: ficha Tusell/Doré/Tasso 1905, quema en interior y carácter no literal; no afirmar que ocurrió en corral ni quiénes estaban presentes. |
| C-01 | **R05-CC** | `DQ.MED.900157` fue FAIL contextual R12: DQ armado y Sancho/rucio observan escrutinio I,6. **Prohibir plano entero** sin borrar fichero. Probar 900013+900230 (canónicos `DQ.MA.900013`+`DQ.MA.900028`); continuidad y TS-001 por R06/R12. Recorte izquierdo x≈0.00–0.49 es hipótesis **NO VISADA**. |

**Reglas vinculantes para este visado:** (1) `safe_after_episodes` no demuestra por sí solo el instante del *beat*; (2) retirar `pre_image_media_id` **no** implica aprobar una imagen para `reveal`, `post_answer` o `discovery`; (3) `spoiler_level: ninguno` en MediaAsset no prevalece sobre la coherencia visual de la pregunta; (4) `021.jpg` permanece **FAIL en interpretación literal**, aunque puede consultarse como alegoría; `025.jpg` permanece **PENDIENTE para hoguera literal**, aunque sirve como apoyo no literal; (5) la 025 requiere alta canónica futura si se integrase, sin inferir IDs por nombre; (6) `900157` entero queda excluido de I,6 y su recorte no está visado; (7) no se alteran los CSV congelados ni contratos, imágenes, preguntas o código.

**Cierre parcial R05:** pronunciamiento **26/26** documentado, **25 CC + 1 PEND**; las cuatro NC de R06 deben reevaluarse por identidad, y están pendientes R12, R01/R02, R09 y resolución de Coordinación. **GO de valoración iconográfica documental condicionada / NO-GO integración productiva**.

---

## D. Comprobación técnica (R09) — tras los visados

1. Verificar que toda fila «conforme» tiene su condición registrada en el dato (o su alta tramitada por PR documental, sin retroeditar CSVs).
2. Ejecutar suite de contrato (49→51+) y paquetes reales tras cualquier alta.
3. Registrar el resultado de esta tabla en `VISION_Y_DECISIONES` (o el acta de hito que corresponda).

## Estado

- ☑ **R05: pronunciamiento 26/26 (25 CC / 1 PEND)**; R06 conserva sus estados (cuatro NC requieren reauditoría de identidad); ☐ R12 pendiente. No hay aprobación conjunta.
- ☐ Visado editorial R01/R02 — **pendiente** (puede ejecutarse en la misma pasada que la contrafirma de ADR-0005, H5)
- ☐ Comprobación técnica R09 — la realizará DESARROLLO cuando la tabla vuelva con los visados
