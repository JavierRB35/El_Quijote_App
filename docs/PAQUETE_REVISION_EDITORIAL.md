# PAQUETE ÚNICO DE REVISIÓN EDITORIAL — decisiones pendientes del piloto

**Fecha:** 2026-11-06 · **Preparado por:** DESARROLLO (R09/R11) a partir del dictamen de Coordinación sobre PR #35/#36.
**Objetivo:** un solo expediente que agrupe **todas** las decisiones editoriales pendientes del piloto, con **tabla común de visados por especialidad** (R05, R06, R12, R01/R02) y **comprobación técnica posterior (R09)** — según la recomendación expresa: «una única pasada de R01/R02 no sustituye los visados de R05, R06 y R12».
**Regla de cierre:** una fila queda decidida cuando las cuatro especialidades marcan conformidad (o rechazo con motivo) **y** R09 valida la viabilidad técnica del resultado. Ninguna fila de este paquete autoriza por sí sola integración en runtime.

**Nota de vigencia R14 — rectificación P0 aceptada (PR #44):** los balances o afirmaciones anteriores que aún describen **cuatro R06-NC** (incluidos §D0, las notas cronológicas de §D1 y los resúmenes del antiguo cierre) son **HISTÓRICOS**, no dictámenes activos. Prevalecen **la tabla A rectificada y §D2**: **25 R06-CC / 0 R06-NC / 1 R06-PEND**. Las anotaciones y contrafirmas R05 se conservan sin cambios; quedan pendientes los visados R12, R01/R02 y R09. **Sin GO de runtime ni de producción.**

## A. Las 14 propuestas antiespoiler (PR #30 — no incorporadas a la matriz #32)

Fuente: `docs/data/propuesta_correcciones_visuales_pre_r15.csv` (13 `RETIRAR_PRE` + 1 `MANTENER_CONDICIONAL`). Estado: **0/14 incorporadas, 0/14 aprobadas** (PR #35).

**Medios y condiciones temporales concretas** (extraídos del catálogo del piloto, `content/piloto/questions/`, para que cada especialidad revise sin reconstruir el contexto): la imagen pre actual de cada pregunta y su condición temporal declarada (`spoiler_policy.safe_after_episodes` = su propio episodio; el gating ya impide presentarlas antes de completarlo).

| # | Pregunta | Episodio | Pre-imagen actual | Condición temporal (safe_after) | Propuesta PR #30 | Visados |
|---|---|---|---|---|---|---|
| A-01 | Q.217 | DQ.P1.C18.E01 | `DQ.MA.900008` | C18.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-02 | Q.232 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-03 | Q.233 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-04 | Q.234 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-05 | Q.235 | DQ.P2.C74.E01 | `DQ.MA.900042` | C74.E01 | retirar pre | **R06-CC** (rectificación P0, §D2) · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-06 | Q.236 | DQ.P2.C74.E01 | `DQ.MA.900042` | C74.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-07 | Q.237 | DQ.P2.C74.E01 | `DQ.MA.900042` | C74.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-08 | Q.238 | DQ.P2.C74.E01 | `DQ.MA.900011` | C74.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-09 | Q.313 | DQ.P1.C21.E01 | `DQ.MA.900025` | C21.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-10 | Q.314 | DQ.P1.C21.E01 | `DQ.MA.900025` | C21.E01 | retirar pre | ☑ R06-CC · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-11 | Q.315 | DQ.P1.C21.E01 | `DQ.MA.900036` | C21.E01 | retirar pre | **R06-CC** (rectificación P0, §D2) · **R05-CC** · ☑ R12-FAIL_CTX · ☐ R01/R02 · ☐ R09 |
| A-12 | Q.316 | DQ.P1.C21.E01 | `DQ.MA.900025` | C21.E01 | **mantener condicional** | ☑ R06-PEND (cronología intrapregunta) · **R05-PEND** · ☑ R12-PEND · ☐ R01/R02 · ☐ R09 |
| A-13 | Q.317 | DQ.P1.C21.E01 | `DQ.MA.900037` | C21.E01 | retirar pre | **R06-CC** (rectificación P0, §D2) · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |
| A-14 | Q.318 | DQ.P1.C21.E01 | `DQ.MA.900036` | C21.E01 | retirar pre | **R06-CC** (rectificación P0, §D2) · **R05-CC** · ☑ R12-PASS_CTX · ☐ R01/R02 · ☐ R09 |

Nota técnica para el visado (R09/R12): la pre-imagen actual de todas ellas es una recreación `pre_pregunta` con `spoiler_level: ninguno` en el dato; la propuesta de PR #30 obedece a riesgos contextuales específicos (no al spoiler_level del catálogo). Retirar la pre en una pregunta no modifica su registro salvo en `visual_requirements.pre_image_media_id` (baja opcional del campo), y el gating temporal ya declarado sigue aplicando.

## B. Los 11 vínculos condicionados de las acuarelas 021/025 (adenda R12, PR #36)

Fuente: `docs/ADENDA_R12_TRATAMIENTO_ACUARELAS_021_025.md` + `INFORME_QA_PATRIMONIO_VISUAL.md` (R12-PIL-02). Condición ya vigente: **021 = alegoría (nunca documentación literal del escrutinio)**; **025 = apoyo ilustrado no literal** (recreación de la hoguera diferible).

| # | Vínculo | Destino/fase | Condición a visar | R05 | R06 | R12 | R01/R02 | R09 |
|---|---|---|---|---|---|---|---|---|
| B-01 | `R05C-000005` (021) | cuaderno · consulta | Rotulado «alegoría de expurgo» | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-02 | `R05C-000006` (021) | descubrimientos · discovery | Idem + sin uso como prueba del hecho | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-03 | `R05C-000007` (021) | lector · after | Idem, tras el desenlace | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-04 | `R05C-000008` (021) | lector · lectura contextual | Idem, anclada a su pasaje | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-05 | `R05C-000009` (021) | museo · after | Idem, ficha con atribución Tusell/Doré | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-06 | `R05C-000010` (021) | museo · consulta | Idem | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-07 | `R05C-000011` (021) | preguntas → discovery | Idem + `safe_after` del episodio | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-08 | `R05C-000505` (025) | cuaderno · consulta | Rotulado «apoyo ilustrado no literal» | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-09 | `R05C-000506` (025) | descubrimientos · discovery | Idem | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-10 | `R05C-000507` (025) | lector · lectura contextual | Idem (no recreación de la hoguera) | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |
| B-11 | `R05C-000508` (025) | museo · consulta | Idem, con atribución Tusell/Doré 1905 | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |

## C. El fallo contextual de `900157` (I,6)

Fuente: `INFORME_QA_PATRIMONIO_VISUAL.md` (2.ª auditoría R12) y `PROPUESTAS_MEJORA_VISUAL.md`. El fotograma `p1_c06_ama_sobrina_libros_pre.webp` (900157) deja de usarse entero en I,6; rescate posible con **recorte izquierdo** si pasa QA; el fichero original permanece íntegro.

| # | Decisión | Evidencia | R05 | R06 | R12 | R01/R02 | R09 |
|---|---|---|---|---|---|---|---|
| C-01 | Retirar 900157 del uso completo en I,6 y evaluar rescate por recorte | R12 2.ª auditoría | **R05-CC** | **R06-CC** | **R12-PASS_CTX** | ☐ | ☐ |

## D0. Pronunciamiento verificable R06 sobre A/B/C — 2026-11-06

> **Trazabilidad:** §D0 es el registro histórico de la PR #40; los cuatro antiguos R06-NC y la incorrecta equiparación por sufijo DQ.MA/DQ.MED se preservan solo como antecedente. Para A-05, A-11, A-13 y A-14 prevalecen las cuatro contrarrevisiones de §D2 y el estado vigente de la tabla A. Los otros 22 pronunciamientos y todas las firmas R05 de §D1 permanecen inalterados.


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

## D2. Rectificación extraordinaria R06 P0 — cuatro MediaAsset canónicos

**Origen:** encargo R14 posterior a la PR #40 (merge cabe1cdfd5bed8dd496a4aec9e9e78de2aa8a721), con evidencia de Curaduría R05 en PR #42. **Alcance único:** A-05, A-11, A-13 y A-14. La equivalencia por sufijo entre DQ.MA (ficha canónica de preguntas) y DQ.MED (inventario visual) **es falsa**. El antiguo rechazo de uso posterior por «imagen de otro capítulo» queda retirado, sin borrar su trazabilidad en §D0.

### Identidad verificada con URI real de cada MediaAsset

| MediaAsset en el JSON de pregunta | URI canónica real y SHA-256 declarado | Correspondencia y QA vigente |
|---|---|---|
| **DQ.MA.900042** | assets://scenes/part_2/chapter_74/p2_c74_testamento_quijano_post.webp — fc3fbcf60ff3312091805654ef1053ac07cf23eb9023c8688395fc7d859f2f26 | **DQ.MED.900202, II,74**; R12 abrió el WebP: testamento, figuras, escribiente; **PENDIENTE** continuidad e identificación de personajes |
| **DQ.MA.900036** | assets://scenes/part_1/chapter_21/p1_c21_bacia_lluvia_pre.webp — 67601cff8d6be75649ea0db578fc631efbc0cc2ade9122e5a6a1762742bd67d0 | **DQ.MED.900237, I,21**; R12 **PENDIENTE, sin inspección ocular**; ficha describe bacía bajo lluvia |
| **DQ.MA.900037** | assets://scenes/part_1/chapter_21/p1_c21_sancho_bacia_examen_post.webp — 54d78b8f56748bbf8cf693facf9e0a5228c72be08c4c475db58c96683083159b | **DQ.MED.900167, I,21**; R12 **PENDIENTE, sin inspección ocular**; ficha y manifiesto describen examen posterior de la bacía |

**Fuentes inspeccionadas documentalmente:** content/piloto/media_assets/DQ.MA.900042.json, DQ.MA.900036.json y DQ.MA.900037.json; content/piloto/questions/DQ.Q.000235.json, 000315.json, 000317.json y 000318.json; docs/data/propuesta_correcciones_visuales_pre_r15.csv; assets/scenes/manifest.json; docs/data/registro_revision_visual.csv (R12 v0.2); §D1 (R05, PR #42). Los SHA citados son **declarados**, no recalculados. El conector GitHub no permite decodificar esos WebP binarios en esta revisión: **no se declara inspección ocular nueva ni PASS de continuidad**. El campo function=pre_pregunta en las fichas es el estado actual, no autorización artística para anticipar la escena; spoiler_level=ninguno tampoco valida el instante intrapregunta.

### Veredictos artísticos R06 rectificados — dos decisiones separadas por fila

| Fila | Retirada antiespoiler | Posible imagen posterior | **Veredicto R06 vigente** y evidencia/condición |
|---|---|---|---|
| **A-05 / Q.235**: destinatarios convocados para confesar y testar (II,74) | **SÍ, RETIRAR_PRE**: mostrar el testamento desde el inicio anticipa convocatoria y acto. | **DQ.MA.900042 en post_answer** tras convocar a los testigos y **después de narrar el acto de testar**, no solo tras marcar respuesta. | **CONFORME CONDICIONADO (R06-CC)**. El recurso **sí es testamento II,74**, no Sansón II,3. R12 lo abrió pero lo mantiene PENDIENTE: comprobar rostros/roles del cura, barbero, bachiller, Sancho y escribiente; evitar superponer texto sobre escribiente, firmas o caras. Sin cronología R01 y TS-001 no se aprueba el montaje. |
| **A-11 / Q.315**: por qué el barbero lleva bacía sobre la cabeza (I,21) | **SÍ, RETIRAR_PRE**: la bacía expuesta bajo la lluvia adelanta la solución visual. | **DQ.MA.900036 en post_answer** solo tras explicación textual de la **lluvia y protección del sombrero**. | **CONFORME CONDICIONADO (R06-CC)**. La URI real corresponde a **bacía y lluvia I,21**, no a segunda salida I,7. El título/alt hacen plausible el apoyo visual pero **no demuestran por sí solos la causa del sombrero**; nunca presentar la imagen como prueba de esa intención. R12 debe abrir el recurso y revisar gesto, objeto, lluvia, anatomía, personajes y zona TS-001, antes de aprobarlo como post. |
| **A-13 / Q.317**: Sancho y el supuesto yelmo de oro desde el principio (I,21) | **SÍ, RETIRAR_PRE**: mostrar examen posterior anticipa fase y objeto. | **DQ.MA.900037 en reveal** únicamente tras responder «Falso», contrastar percepciones y alcanzar la escena de examen. | **CONFORME CONDICIONADO (R06-CC)**. La URI real corresponde al **examen posterior de la bacía I,21**, no manuscrito de Toledo I,9. No implica que Sancho creyera al principio en un yelmo de oro; texto y encuadre deben preservar la ironía. R12 aún **no** abrió el WebP: revisar gesto, identificación del objeto y coherencia de la fase reveal antes de dar conformidad visual. |
| **A-14 / Q.318**: ordenar lluvia → avistamiento → carga → huida y bacía (I,21) | **SÍ, RETIRAR_PRE** de DQ.MA.900036: anticipa la imagen intermedia de la aventura y puede sesgar la ordenación. | **DQ.MA.900037 en post_answer** **después de completar** correctamente el orden, como epílogo de examen, **no** como imagen que «prueba» los cuatro lances. | **CONFORME CONDICIONADO (R06-CC)**. Ambos MediaAsset son de I,21: 900036 corresponde a DQ.MED.900237 y 900037 a DQ.MED.900167. La escena de examen es una consecuencia y no una secuencia completa. R12 debe abrir ambas imágenes y contrastar cronología, actitud de Sancho, objeto, luz y reserva para TS-001; R01 valida el instante de aparición. |

**Condición transversal:** el safe_after_episodes del JSON únicamente cierra la puerta por episodio; **no valida el instante del beat ni el post_answer/reveal**. Toda presentación posterior requiere: hecho ya narrado, respuesta emitida, ausencia de spoiler retrospectivo, texto completo TS-001 y prueba visual/funcional R12/R08/R15. **Las cuatro R06-CC son criterios de aptitud artística potencial, no PASS de integración.** No se cambian recursos, bindings, preguntas, relaciones de medios, datos productivos ni estados QA.

**Precedencia y recuento:** PR #40 documenta históricamente **21 R06-CC / 4 R06-NC / 1 R06-PEND**. Tras esta **única** rectificación, el balance R06 vigente pasa a **25 R06-CC / 0 R06-NC / 1 R06-PEND**; las restantes 22 filas se mantienen sin revisión. §D1 y la columna R05 conservan **íntegros** los dictámenes R05 (25 CC, 1 PEND) y sus notas antiguas de «R06-NC a revisar», que son anteriores a §D2.

**NO-GO integración y producción:** R01/R02 deben validar hechos/instantes, R12 verificar continuidad ocular (solo 900202 consta abierto), R08/R12/R15 validar TS-001 y antiespoiler, R09 comprobar técnica únicamente tras los visados y R14 aceptar el cierre. Ningún alta de imágenes, generación artística ni modificación de MediaAsset está autorizada por esta rectificación.

---

## D. Comprobación técnica (R09) — tras los visados

1. Verificar que toda fila «conforme» tiene su condición registrada en el dato (o su alta tramitada por PR documental, sin retroeditar CSVs).
2. Ejecutar suite de contrato (49→51+) y paquetes reales tras cualquier alta.
3. Registrar el resultado de esta tabla en `VISION_Y_DECISIONES` (o el acta de hito que corresponda).

## Estado (actualizado tras el dictamen R14 — cierre R06)

> **Rectificación P0 R06 posterior al histórico PR #40 y al visado R05 PR #42:** **4 R06-NC pasan a R06-CC condicionadas** solo para A-05/A-11/A-13/A-14, con evidencia de URI en §D2. **Balance R06 actual: 25 CC / 0 NC / 1 PEND**. El texto histórico de los cierres anteriores se mantiene abajo como registro, pero **no debe usarse para atribuir rechazo vigente a las cuatro filas**. No cambia ningún estado de R05, R12, R01/R02 o R09.


- ☑ **HISTÓRICO — visado R06 de PR #40, SUPERADO POR LA RECTIFICACIÓN §D2:** 26 pronunciamientos (21 CC · 4 NC · 1 PEND), PR #40 fusionada `cabe1cd`, **ratificado por R14** (A-05/A-11/A-13/A-14: retirada procedente pero destinos NO aceptados; A-12 exige cronología intrapregunta; 021/025 condicionadas; 900157 excluido). **Reauditoría (dictamen R14 posterior): las 4 R06-NC están CUESTIONADAS por discrepancia de identidad canónica DQ.MA/DQ.MED (resolución por logical_uri + SHA-256 en PR #42); la rectificación corresponde exclusivamente a Dirección Artística — registro histórico preservado.**
- ☑ **R05: visado documental ratificado por R14**, 26/26 pronunciamientos (25 CC condicionadas y A-12 PEND). Se mantienen los estados R06 ya ratificados; las cuatro NC requieren contrarrevisión de identidad.
- ☐ Visado R12 — pendiente
- ☐ Visado editorial R01/R02 — pendiente (ejecutable en la misma pasada que la contrafirma de ADR-0005, H5)
- ☐ Comprobación técnica R09 — DESARROLLO la ejecutará **después** de los visados restantes, fila a fila, sobre las decisiones conjuntamente aprobadas

---

## D3. Visado independiente R12 — 26 decisiones P0 (2026-11-06)

**Estados:** `R12-PASS_CTX` = PASS de idoneidad **contextual y condicionada**, no de runtime; `R12-FAIL_CTX` = FAIL de una modalidad de uso visual (no archivo corrupto); `R12-PEND` = no hay prueba decisiva. **24 PASS contextuales, 1 FAIL contextual (A-11), 1 PENDIENTE (A-12); cero aprobaciones conjuntas.** Retirada de `pre` y autorización de destino `post_answer` son decisiones independientes.

**Trazabilidad del registro visual:** esta fase añadió **3 aperturas** de recursos distintos en I,21 (DQ.MED.900025/900237/900167), pasando de **53 a 56 inspecciones directas de 678**; **622 continúan sin abrir**. Los estados del inventario **18 PASS / 2 FAIL / 658 PENDIENTE** no cambian, porque las tres nuevas imágenes siguen PENDIENTE de validación integral. Los 26 estados de la tabla son **dictámenes de vínculo/contexto**, no sustituyen los estados del activo. Se corrigió la nota obsoleta de Q.112 en el mismo registro original, sin tocar su asociación.

**Prueba y trazabilidad:** se cotejaron las 14 preguntas `content/piloto/questions/DQ.Q.*.json`, las 14 propuestas en `docs/data/propuesta_correcciones_visuales_pre_r15.csv`, fichas `DQ.MA`, `assets/scenes/manifest.json` y aperturas visuales efectivas de los WebP del capítulo I,21 y II,74. Las acuarelas 021/025 y las escenas I,6/I,8 constan inspeccionadas visualmente; se reabrieron 900013/900230 y secuencia molinos. **La identidad se resuelve con MediaAsset ID + URI + SHA-256 declarado**, no igualdad del número de `DQ.MA` y `DQ.MED`. No se recalcularon SHA-256 binarios.

| Fila | Dictamen R12 | Evidencia canónica y apertura visual | Condición, prueba y bloqueo |
|---|---|---|---|
| **A-01** | **R12-PASS_CTX** | MA.900008 = p1_c18_rebanos_pre.webp; ovejas visibles en apertura directa R12. | PASS retirar pre Q.217, porque la respuesta a la polvareda aparece a derecha; reveal después de responder; tiempo runtime pendiente. |
| **A-02** | **R12-PASS_CTX** | MA.900011 = p2_c74_despedida_post.webp; Alonso en cama y Sancho enlazando su mano. | PASS retirar pre Q.232: anuncia muerte; discovery tras desenlace II,74; R01 y TS-001 pendientes. |
| **A-03** | **R12-PASS_CTX** | MA.900011; rostro de Alonso y despedida visible. | PASS retirar pre Q.233, pues anticipa recuperación de identidad final; usar después de renuncia al nombre; gating no probado. |
| **A-04** | **R12-PASS_CTX** | MA.900011; despedida terminal y manos entrelazadas. | PASS retirar pre Q.234; post_answer sólo tras confesión, veredicto y sucesos ya narrados; texto externo TS-001. |
| **A-05** | **R12-PASS_CTX** | **MA.900042** = **MED.900202**, `assets/scenes/part_2/chapter_74/p2_c74_testamento_quijano_post.webp`; SHA256 declarado `fc3fbcf60f...`. WebP abierta: Alonso postrado, Sancho llorando y escribiente. | PASS retirar pre Q.235 y posible post_answer únicamente después de llamar a testigos/testar. No se han verificado todas las identidades de figurantes; R01 fase y R06 decisión pendientes. |
| **A-06** | **R12-PASS_CTX** | MA.900042 testamento abierto no representa autor del epitafio; acuarela 373 abierta = alegoría pluma/libro. | PASS retirar pre Q.236; 373 sólo discovery posterior, rotulada como alegoría, nunca prueba del autor. |
| **A-07** | **R12-PASS_CTX** | MA.900042 testamento y 373 alegoría, ambos observados. | PASS retirar pre Q.237; respuesta epitafio es textual, 373 epílogo simbólico posterior. |
| **A-08** | **R12-PASS_CTX** | MA.900011 despedida y 373 alegoría de cierre previamente visualizadas. | PASS retirar pre Q.238; descubrir alegoría sólo después de advertencia contra tercera parte. |
| **A-09** | **R12-PASS_CTX** | MA.900025 = p1_c21_mambrino_pre.webp; WebP abierta, barbero con bacía al fondo. | PASS retirar pre Q.313: pregunta inicialmente por batanes, imagen anticipa el encuentro con barbero; after condicionado. |
| **A-10** | **R12-PASS_CTX** | MA.900025; bacía metálica visible sobre cabeza del barbero. | PASS retirar pre Q.314: la imagen revela el objeto real antes de responder contraste de percepciones. |
| **A-11** | **R12-FAIL_CTX** | **MA.900036** = **MED.900237**, `assets/scenes/part_1/chapter_21/p1_c21_bacia_lluvia_pre.webp`; SHA256 declarado `67601cff8d...`. WebP abierta: DQ examina bacía sostenida por el barbero bajo lluvia. | FAIL del destino **post_answer como representación literal** en Q.315: no muestra bacía llevada sobre cabeza y escenifica cara a cara mientras el relato de Q.318 afirma huida y abandono. **Retirar pre sí procede**. R01 debe cotejar si hay justificación artística; R12 no cambia R06. |
| **A-12** | **R12-PEND** | MA.900025 abierta muestra barbero y bacía, no al Sacripante preguntado. | PENDIENTE mantener pre Q.316 hasta confirmar que encuentro y objeto se narraron antes de la pregunta; fallback SIN_IMAGEN y R01/R15. |
| **A-13** | **R12-PASS_CTX** | **MA.900037** = **MED.900167**, `assets/scenes/part_1/chapter_21/p1_c21_sancho_bacia_examen_post.webp`; SHA256 declarado `54d78b8f...`. WebP abierta: Sancho sostiene bacía ante DQ. | PASS retirar pre Q.317; reveal sólo después de responder que Sancho no reconoció yelmo de oro; R01 secuencia. |
| **A-14** | **R12-PASS_CTX** | PRE MA.900036 (DQ y barbero con bacía) y POST MA.900037 (Sancho con bacía), ambas WebP abiertas. | PASS retirar 036 pre Q.318, pues adelanta secuencia; 037 post_answer sólo tras ordenar los cuatro hechos; sin aprobar invención de escena de 036. |
| **B-01** | **R12-PASS_CTX** | 021.jpg JPEG abierta: figura gigante barre diminutos caballeros, no aparecen cura/barbero. | PASS cuaderno consulta sólo rotulada «alegoría de expurgo»; nunca documentación literal. |
| **B-02** | **R12-PASS_CTX** | 021.jpg, composición alegórica constatada. | PASS discovery tras relato con etiqueta alegórica; nunca pista fáctica. |
| **B-03** | **R12-PASS_CTX** | 021.jpg, figura simbólica en acuarela vertical. | PASS lector after con rótulo y texto externo; TS-001 no ejecutado. |
| **B-04** | **R12-PASS_CTX** | 021.jpg alegoría del espurgo, no una acción física de personajes. | PASS lector contextual si R01 fija pasaje I,6 y se indica alegoría. |
| **B-05** | **R12-PASS_CTX** | 021.jpg con figura gigante y caballeros miniatura. | PASS museo after sólo como símbolo literario rotulado; presentación no probada. |
| **B-06** | **R12-PASS_CTX** | 021.jpg; alegoría y no escena del cura/barbero. | PASS museo consulta con contexto interpretativo no literal; validación de ficha pendiente. |
| **B-07** | **R12-PASS_CTX** | 021.jpg no muestra veredictos concretos de libros. | PASS preguntas→discovery tras responder/desbloquear; nunca como material para contestar. |
| **B-08** | **R12-PASS_CTX** | 025.jpg JPEG abierta: mujer arroja libros al fuego **en interior**, no corral nocturno. | PASS cuaderno consulta como «apoyo ilustrado no literal»; no aceptable como documento literal. |
| **B-09** | **R12-PASS_CTX** | 025.jpg quema en hogar interior, directa. | PASS discovery sólo tras narración y nota de libertad artística; cronología R01. |
| **B-10** | **R12-PASS_CTX** | 025.jpg lugar y luz no coinciden con corral nocturno. | PASS lector contextual de I,7 con advertencia no literal; montaje after I,6 pendiente de R01/R06. |
| **B-11** | **R12-PASS_CTX** | 025.jpg mujer junto a fuego doméstico. | PASS museo consulta con ficha artística no literal; no atribuir corral/nocturnidad. |
| **C-01** | **R12-PASS_CTX** | MED.900157 abierta: DQ armado y Sancho observan escrutinio I,6, fallo cronológico. 900013 y 900230 reabiertas: cura con capelo/barba vs casquete/cabeza más calva y barbero con edad/cabello distintos. | PASS retirar plano completo 900157 (FAIL de uso literal). Alternativas 900013/900230 son pertinentes por separado, pero **continuidad entre ambas PENDIENTE**; recorte izquierdo no ejecutado; R06/TS-001 pendientes. |

### P0 transversal sin visado de integración

- **Q.112**: la asociación actual ya es `DQ.MA.000026` como hotspot y `DQ.MA.900005` como pre, `safe_after_episodes=[DQ.P1.C08.E01]`. **No reasignar 026**. Acuarela 026 observada, **833×1041 px**. Rectángulo normalizado `x=.30,y=.22,w=.45,h=.50` equivale aprox. a x=250–625 px, y=229–749 px; abarca caballo y caballero y **solo parte del aspa** que se extiende hacia esquina superior izquierda. **PENDIENTE precisión geométrica**, zoom, escalado, teclado, alternativa accesible y momento efectivo de presentación; nada de esto se probó en runtime.
- **I,6:** `MED.900013 ↔ MED.900230` reabiertas: hay **discrepancia de fisonomía/edad del cura y del barbero** entre planos; continuidad en montaje PENDIENTE. No se ejecutó recorte de 900157. Conservar un plano por diálogo o buscar transición validada con R06.
- **Molinos:** secuencia `MED.900231 → MED.900005 → MED.900006` abierta: plano distante, señalamiento/advertencia, desenlace con lanza rota. **PASS contextual de orden**; no mostrar 900006 antes de conocer la caída, no ocultar molinos (derecha) por TS-001.
- **Primeros planos:** los 10 se observaron en primera revisión, de lenguaje más pictórico que escenas. Solo candidatos para **insertos diferenciados**; integración y proporciones pendientes de R06.
- **TS-001 y accesibilidad**: **NO EJECUTADO** con texto narrativo real, letra ampliada, subtítulos, audio apagado, teclado ni movimiento reducido; por tanto todas las 26 filas **SIN GO runtime**. Proteger rostro/manos en despedida, escribiente en MA.900042, bacía y rostros de MA.900036/037. Sin caja derecha universal. R01/R02 define la fase exacta y R08/R09 verifican la puesta en escena.
- **Histórico y competencias**: R06-NC de A-05/A-11/A-13/A-14 se preservan íntegros; su rectificación es exclusiva de R06 (PR #44). No se cambian visados R05/R06/R01/R02/R09, las matrices congeladas, la vista de conciliación, preguntas, fichas, interfaces ni activos.

**Bloqueos expresos:** A-11 destino post literal incongruente con huida del barbero, sujeto a R01; A-12 cronología intrapregunta; C-01 continuidad/recorte; Q.112 geometría/teclado/gating; todos los casos TS-001 y validación cruzada. **No generar imágenes nuevas.**
---

## D4. Visado editorial R01/R02 — 26 decisiones y contrafirma H5 (2026-11-07)

**Alcance y autoría:** pronunciamiento documental desde las funciones R01 (dirección editorial) y R02 (filología/documentación textual), ejercidas por un **agente de IA**; no se hace pasar por revisión humana presencial ni sustituye la decisión final de R14. Rama editorial independiente nacida de \`main\`. **No se alteran ni se refrendan por representación** las firmas/estados de R05, R06, R12 o R09, las evidencias R12, las matrices CSV, los JSON de pregunta y MediaAsset, las imágenes ni el runtime. La anotación D4 funciona como **columna de visado editorial complementaria** a la tabla única A/B/C, sin reescribir sus celdas mientras otros equipos trabajan en paralelo.

**Convención:** \`R01/R02-CC\` = conforme con el *uso editorial y el momento* expresamente acotados, **no** aprobación productiva ni corrección automática de fallos del catálogo; \`R01/R02-NC\` = no conforme con la alternativa examinada, y se documenta salida segura. En todos los \`CC\`, el momento de \`post_answer\`, \`reveal\` o \`discovery\` significa **respuesta emitida + hecho ya narrado**; el mero paso de respuesta o \`safe_after_episodes\` no basta. Ante ausencia de beat confirmado, usar \`SIN_IMAGEN\` sin anticipar desenlaces. **Balance: 24 CC condicionadas y 2 NC (A-11, A-12); 0 GO runtime.** Esta cifra no debe sumarse a los visados de otras especialidades.

### D4.1. Fila a fila — sección A, 14 propuestas antiespoiler

| Fila | R01/R02 | Pronunciamiento narrativo, puerta de aparición y condición |
|---|---|---|
| **A-01 / Q.217** | **CC** | I,18: la imagen de rebaños resuelve la causa de la polvareda. **Retirar pre**; \`DQ.MA.900008\` solo en \`reveal\` tras contestar y explicar que son ovejas/carneros. |
| **A-02 / Q.232** | **CC** | II,74: la despedida anticipa la muerte; **retirar pre** \`900011\`. En \`discovery\` después del fallecimiento y desenlace completo, no tras una simple alusión a la enfermedad. |
| **A-03 / Q.233** | **CC** | II,74: no revelar visualmente la identidad recuperada antes de que Alonso Quijano se nombre. **Retirar pre** \`900011\`; por su contenido de despedida, mostrar como \`discovery\` tras el cierre, no inmediatamente tras la respuesta nominal. |
| **A-04 / Q.234** | **CC** | II,74: el veredicto del cura se pronuncia **tras la confesión, antes del testamento y de la muerte**. Retirar \`900011\` de \`pre\`. La escena terminal solo puede aparecer cuando el desenlace pertinente se ha narrado; **no** autorizar post_answer inmediato tras el veredicto. Si el motor no puede aplazarlo, no mostrarla. |
| **A-05 / Q.235** | **CC** | II,74: \`DQ.MA.900042\` corresponde al **testamento** (URI/identidad canónica de §D2), no a Sansón II,3. Retirar pre. En \`post_answer\` solo **después de la convocatoria, confesión y testamento efectivamente narrados**; identidades de figuras y reserva TS-001 siguen en R06/R12. |
| **A-06 / Q.236** | **CC** | II,74: la autoría del epitafio se acredita **por texto** y pertenece al epílogo posterior a la muerte. Retirar la imagen de testamento como pre; \`373.jpg\` exclusivamente \`discovery\` alegórico y rotulado **tras epitafio/cierre**, no evidencia de quién lo escribió. |
| **A-07 / Q.237** | **CC** | II,74: la paradoja del epitafio no debe anticiparse con una imagen de testamento ni acreditarse con la acuarela 373. Retirar pre; \`373.jpg\` en descubrimiento posterior a lectura/explicación del epitafio y cierre. |
| **A-08 / Q.238** | **CC** | II,74: la advertencia metanarrativa contra resucitar al personaje/continuarlo pertenece al final. Retirar despedida \`900011\` pre; \`373.jpg\` alegórica solo **tras narrar la advertencia final**, nunca como prueba literal. |
| **A-09 / Q.313** | **CC** | I,21: la pregunta de los batanes precede al avistamiento del barbero. Retirar \`900025\` pre; su posible aparición \`post_answer\` debe diferirse **hasta narrar el primer avistamiento**, aunque la pregunta ya esté respondida. No activar inmediatamente después de la respuesta. |
| **A-10 / Q.314** | **CC** | I,21: pregunta por el **contraste entre lo visto por don Quijote y Sancho**; \`900025\` revela la bacía real. Retirar pre; \`post_answer\` después de elegir opciones **y** de que se expliquen ambas percepciones; la imagen no reemplaza el texto. |
| **A-11 / Q.315** | **NC** | **Retirar pre: SÍ. Destino \`900036\` como \`post_answer\` literal: NO.** El texto de I,21 presenta al barbero **con bacía sobre su propia cabeza**; al verse embestido, **cae del asno, huye y deja la bacía**; después Sancho la levanta por orden de don Quijote. La imagen realmente asociada a \`DQ.MA.900036\` (\`DQ.MED.900237\`) muestra, según apertura directa R12 D3, un **cara a cara con don Quijote examinando la bacía que sostiene el barbero**, situación no narrada ni justificada por un momento posterior de I,21. Ni el cambio de fase ni una etiqueta \`RECREACION_IA\` legitiman hacer pasar ese encuentro por hecho cervantino. **Descartar este asset para ese uso**; explicar verbalmente lluvia/sombrero y, si se propone alternativa fiel, abrir revisión R06/R12/R09 separada. No borrar el archivo ni revocar los dictámenes R06-CC/R12-FAIL_CTX ya emitidos. |
| **A-12 / Q.316** | **NC** | **No mantener la pre \`900025\` en el registro actual.** El antecedente del **yelmo de Mambrino que costó a Sacripante** se menciona en **I,10**, al prometer sustituir la celada rota, **no** como justificación pronunciada ante el barbero en I,21. El JSON \`DQ.Q.000316\` declara \`DQ.P1.C21.P0004\` pero su evidencia transcribe el diálogo de **I,10** y se corta antes de la frase clave. Son defectos de **atribución, pasaje y formulación temporal**, además de faltar un beat verificado que garantice que el encuentro y la bacía ya se conocen antes del foco de pregunta. **Salida segura: SIN_IMAGEN + inmovilizar publicación de Q.316** hasta reanclar evidencia a I,10, reformular el enunciado o documentar explícitamente el recuerdo intercapitular, y revalidar con R15/R09. No basta afirmar \`safe_after\` de I,21. |
| **A-13 / Q.317** | **CC** | I,21: Sancho describe un hombre/asno/objeto reluciente, no reconoce un yelmo de oro. Retirar \`900037\` pre; solo \`reveal\` después de la respuesta «Falso» **y** de la huida, recogida y examen de la bacía. \`DQ.MA.900037\` es examen posterior de I,21 por URI (no manuscrito de Toledo); no mostrarlo como creencia inicial de Sancho. |
| **A-14 / Q.318** | **CC, con incidencia P0 de contenido** | I,21: retirar \`900036\` pre. \`900037\` puede servir como **epílogo** en \`post_answer\` tras completar los cuatro lances y **narrar huida/recogida**, no como representación de todos. **Corregir antes de publicar** la opción \`DQ.Q.000318.O04\`: el JSON dice «don Quijote la recoge», pero en el texto **Sancho recoge la bacía por mandato de don Quijote**. Las citas actuales del JSON no cubren íntegramente el orden. Este CC solo avala la secuencia visual condicionada, **no** la redacción de Q.318 ni el runtime. |

### D4.2. Fila a fila — sección B, once vínculos 021/025

| Fila | R01/R02 | Anclaje filológico y aparición autorizable |
|---|---|---|
| **B-01 / 021 / cuaderno** | **CC** | Consulta relativa al escrutinio **I,6** tras conocer su naturaleza; rótulo obligatorio **«alegoría de expurgo»**, nunca escena literal de personajes. |
| **B-02 / 021 / descubrimientos** | **CC** | \`discovery\` tras explicar el escrutinio y su selección/discusión de libros **I,6**; interpretación simbólica atribuida, sin afirmar gesto físico documentado. |
| **B-03 / 021 / lector after** | **CC** | \`after\` del tramo del escrutinio **I,6**, después de narrar el juicio de los libros; texto literario íntegro fuera del área ilustrada. |
| **B-04 / 021 / lector contextual** | **CC** | Anclar en **I,6** al pasaje donde cura y barbero **examinan los libros uno a uno** y resuelven su suerte, no a un supuesto gigante del texto; abrirlo como alegoría **después** del pasaje, no como prueba de un acto visual. Localizador estable exacto pendiente R02/dato; no inventarlo. |
| **B-05 / 021 / museo after** | **CC** | Ficha de **iconografía alegórica del escrutinio I,6** con atribución explícita; aparición automática solo tras contexto. **La consulta voluntaria del museo sigue abierta desde el inicio**, con aviso de contexto si conviene. |
| **B-06 / 021 / museo consulta** | **CC** | Consulta libre; diferenciar la sátira/representación alegórica de los actos del cura y el barbero. Procedencia/derechos R13 no sustituidos. |
| **B-07 / 021 / pregunta→discovery** | **CC** | Después de responder la pregunta de I,6 **y** de explicar el escrutinio, nunca en \`pre\` ni para deducir el título/veredicto de un libro. |
| **B-08 / 025 / cuaderno** | **CC** | **Origen textual I,7:** la narración informa de la **quema nocturna** que ejecuta el ama; la imagen observada R12 muestra un **interior**, no el corral: «apoyo ilustrado no literal». |
| **B-09 / 025 / descubrimientos** | **CC** | \`discovery\` **tras** el pasaje «Aquella noche quemó y abrasó el ama...», en **I,7**, con aviso de libertad compositiva. No anticipar ese desenlace en I,6. |
| **B-10 / 025 / lector contextual** | **CC** | **Anclaje correcto I,7**, tras la mención de la quema, no en I,6. **No** validar \`after\` inmediato de I,6 ni presentarla como imagen literal de hoguera en corral. Cualquier montaje anticipatorio requiere revisión aparte R01/R06. |
| **B-11 / 025 / museo consulta** | **CC** | Consulta libre vinculada **a I,7** como representación posterior/no literal; sin afirmar hogar real, corral representado, nocturnidad visual ni soledad del ama. La ficha debe conservar atribución y procedencia sujetas a R13. |

**Distinción canónica:** **I,6** incluye el escrutinio y la propuesta de arrojar libros al patio/corral; el **acto de quemarlos** se cuenta retrospectivamente **al inicio de I,7** («Aquella noche...»). No trasladar a I,6 la consumación del fuego, aunque la propuesta del fuego ya aparezca allí. Los museos abiertos no se convierten en recursos bloqueados por progreso; las restricciones se aplican a su **presentación dramática automática** y a las advertencias de spoilers.

### D4.3. Sección C — uso completo de 900157

| Fila | R01/R02 | Pronunciamiento |
|---|---|---|
| **C-01 / I,6 / 900157** | **CC de retirada, NO de recorte** | Durante el escrutinio de **I,6**, don Quijote **duerme** y Sancho no participa en la reunión de cura, barbero, ama y sobrina. El plano \`DQ.MED.900157\`, con don Quijote armado y Sancho como observadores, no puede emplearse **entero** como representación literal de ese episodio. Retirarlo de ese destino sin borrar archivo. \`900013\` y \`900230\` son alternativas **separadas** pertinentes para I,6, pero R12 D3 documenta discontinuidad de facciones/edad/atuendo al montarlas juntas: **no visadas en secuencia continua**. Un recorte izquierdo de \`900157\` es hipótesis artística **sin ensayo ni aprobación**; no se autoriza derivado, recorte ni cambio del original. |

### D4.4. Incidencias filológicas P0 de la documentación de preguntas

1. **Q.316:** discordancia entre \`passage_id=DQ.P1.C21.P0004\`, fragmento de evidencia textual **I,10** y enunciado que sitúa la invocación de Sacripante como justificación de la toma efectiva en I,21. No editar la pregunta desde este visado; abrir corrección editorial específica R15/R02 y revalidar fuente/edición/localizador.
2. **Q.315:** \`DQ.P1.C21.P0003\` y la cita literal almacenada en su JSON **se interrumpen antes** de la explicación del barbero «por que no se le manchase el sombrero». La respuesta coincide con I,21, pero **la evidencia registrada es insuficiente**: ampliar/reanclar al pasaje exacto antes de aprobarla.
3. **Q.318:** la opción ordenada O04 atribuye la recogida a don Quijote, pero el texto la encomienda a **Sancho**. Corregir sujeto y completar evidencia de huida y recogida; no asumir que la aprobación de \`post_answer\` sanea ese error.
4. **Referencias compartidas:** revisar los registros de I,21 que apuntan a \`P0004\` como respaldo de hechos posteriores al encuentro; la evidencia que figura en Q.316 apunta en realidad a **I,10**. Los recortes de cita que terminan antes del hecho probado no satisfacen los mínimos de la auditoría textual.

**No se ha aprobado ni reparado ningún JSON aquí.** Estos defectos afectan la **publicabilidad de contenido**, no cambian retroactivamente los visados visuales y no autorizan que R09 modifique el contrato sin acuerdo.

### D4.5. Contrafirma editorial ADR-0005 / H5 (TS-001)

**Dictamen editorial R01/R02: CONFORMIDAD PARCIAL CON SALVEDAD BLOQUEANTE; contrafirma integral PENDIENTE.** Se valida documentalmente la semántica de \`Beat\` e \`Intervención\` (ADR-0005, contrato 1.1.0) **solo** bajo estos invariantes vinculantes:

- \`texto_visible\` íntegro, no ocultable, ligado al hablante, trazado a edición/pasaje y distinguir \`CITA_LITERAL\`, \`ADAPTACION_FIEL\`, \`NARRACION_ENLACE\`. Ninguna voz sin texto; audio facultativo y no bloqueante. Los incisos que en el original son narrador siguen **visibles**; \`texto_oral\` de personaje no los interpreta como propios, y requiere revisión R02/R07 del desglose.
- La política de lectura con y sin audio mantiene el **suelo** \`max(1500 ms, 800 ms + 35 ms/palabra)\`; \`lectura_minima_ms\` solo lo puede elevar. Pausa, repetición, retroceso y avance manual no pueden perder el acceso al texto.
- **Salvedad H5:** el requisito de esquema actual \`visual_asset_ids\` **obligatorio y \`minItems:1\` en cada beat** no se considera firmado editorialmente. La biblia prescribe escenas con perspectivas, pero admite intervenciones o transiciones con plano persistente, silencio, texto sin activo nuevo y fallback. Forzar un MediaAsset exclusivo/referenciado en todos los beats genera duplicación o obliga a inventar imágenes para narrar. **Propuesta a R09/R11/R10/R06**: permitir \`visual_asset_ids: []\` o ausente a nivel de beat, con **persistencia del plano de escena/beat anterior**; validar cobertura visual **a nivel de escena** y nunca bloquear texto/audio por error visual. Un cambio de schema requiere coaprobación editorial-técnica y pruebas de consumidor; **no se cambia desde esta rama**.
- \`SILENCIO\` sin intervención hablada no contraviene TS-001; \`DIALOGO/NARRACION/ACCION\` con intervención deberán tener texto cuando haya voz. Exigir integridad de cita antes de considerar publicada cualquier conversión de inventario literario a intervenciones.
- No se emite **contrafirma humana** ni aceptación conjunta R09; queda pendiente que el equipo técnico tramite la salvedad y R14 documente el acuerdo. Esta firma documental del agente significa **pronunciamiento editorial motivado**, no certificación profesional presencial.

### D4.6. Evidencias, límites y entrega a Coordinación

**Fuentes internas cotejadas:** tabla A/B/C y precedencia D0–D3 de este expediente; \`docs/data/propuesta_correcciones_visuales_pre_r15.csv\`; las 14 preguntas \`content/piloto/questions/DQ.Q.*.json\`; fichas \`DQ.MA.900025\` y \`DQ.MA.900036\`, identidades canónicas de §D2; \`docs/ADENDA_R12_TRATAMIENTO_ACUARELAS_021_025.md\`; \`docs/ARQUITECTURA_Y_ADR.md\` (ADR-0005), \`schemas/content/beat.schema.json\`, \`docs/COMPONENTES_NARRATIVOS_UX.md\` y biblia narrativa R01/R02/H5. **No** se declaran nuevas aperturas de WebP/JPG; la observación visual de cara a cara, acuarelas 021/025 y discontinuidad I,6 procede de **R12 D3**, no de inspección ocular independiente.

**Fuentes primarias de contraste textual consultadas (ediciones de consulta, no reemplazan la edición canónica del proyecto):**
- I,6: https://es.wikisource.org/wiki/El_ingenioso_hidalgo_Don_Quijote_de_la_Mancha_(1905)/Tomo_I/Cap%C3%ADtulo_VI
- I,7: https://es.wikisource.org/wiki/El_ingenioso_hidalgo_Don_Quijote_de_la_Mancha_(1905)/Tomo_I/Cap%C3%ADtulo_VII
- I,10: https://es.wikisource.org/wiki/El_ingenioso_hidalgo_Don_Quijote_de_la_Mancha_(1905)/Tomo_I/Cap%C3%ADtulo_X
- I,21: https://es.wikisource.org/wiki/El_ingenioso_hidalgo_Don_Quijote_de_la_Mancha_(1905)/Tomo_I/Cap%C3%ADtulo_XXI
- II,74: https://www.cervantesvirtual.com/obra-visor/el-ingenioso-hidalgo-don-quijote-de-la-mancha-de-como-don-quijote-cayo-malo-y-del-testamento-que-hizo-y-su-muerte/html/30f4d320-487c-4eaa-be8d-86103deb270d_2.html

**Límites y pruebas no ejecutadas:** sin lectura del EPUB privado; sin hash binario propio; sin ejecución de validadores locales, UI, audio, teclado, TS-001, zoom o controles antiespoiler; no se afirma autorización jurídica de acuarelas ni conformidad de R13. El cotejo es textual, documental y de lógica narrativa. **Runtime SIN GO** y R09 CI/subsanación técnica independiente: no anticipar resultados.

**Entrega solicitada a R14:** conciliar **A-11 NC editorial** con R06-CC artístico y R12-FAIL_CTX; corregir/reescribir **Q.316** antes de reconsiderar A-12; resolver P0 textual de Q.315/Q.318; mantener la 025 anclada a **I,7**, la 021 a **I,6**, y \`900157\` completo fuera de I,6; arbitrar H5 \`visual_asset_ids\` con R09/R11 antes de contrafirma integral. **Ninguna fila se declara cerrada conjuntamente** sin las firmas restantes y comprobación de consumo. La PR editorial se eleva a Coordinación sin fusión unilateral.
