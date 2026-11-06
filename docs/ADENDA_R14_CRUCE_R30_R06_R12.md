# Adenda R14 — cruce antiespoiler R15/PR30, dirección R06 y QA visual R12

**Fecha:** 2026-11-06 · **Carácter:** documentación técnica/editorial de trabajo.  
**Dependencia:** PR **#29** (GO documental, NO-GO integración), sin modificar su rama ni dictamen.  
**Rama de esta adenda:** `feature/r14-cruce-antiespoiler-arte-qa`, creada desde el commit `a89a724ced64e2cd5a6ace714c82581b07907bd5` de PR #29.  
**Salida única:** la misma `docs/data/matriz_consolidada_aprovechamiento_visual.csv`, ahora **759 filas × 69 columnas** (se añaden campos de procedencia y validación; no 14 nuevos vínculos). Esta PR es **apilada sobre #29**; no sustituye a #29 ni debe fusionarse en `main` antes que su base.

## 1. Fuentes y límites de evidencia

1. **R05/R15/R16**, matriz consolidada original de PR #29: **759 × 44**, Git blob `c7674dab3e149aaa518bca2309b6023e93326cdc`. Se conservan los IDs `CAV-0001`–`CAV-0759`, rutas, hashes declarados y justificaciones.
2. **PR #30 / R15**, `docs/data/propuesta_correcciones_visuales_pre_r15.csv`, **14 decisiones**, 13 `RETIRAR_PRE` y 1 `MANTENER_CONDICIONAL`; blob `15873ece47fd14c9c5542e3bc1ca88460bfa8259`. **PR #30 sigue abierta**: su contenido se incorpora como *propuesta documental*, no como corrección ejecutada.
3. **R12 / PR #27**, `docs/data/registro_revision_visual.csv`, **678 recursos únicos**, blob `3231e6b8bbecb8b40477251df38a278dced5bbe2`; `docs/INFORME_QA_PATRIMONIO_VISUAL.md`, `docs/PROPUESTAS_MEJORA_VISUAL.md`.
4. **R06 / PR #23**, `docs/STORYBOARD_VISUAL_PILOTO.md` y `docs/REVISION_ARTISTICA_BRIEFS_H4.md`, con fecha y límites de la propuesta original.
5. **Contrato y fuente de integración:** `schemas/content/question.schema.json`, `docs/CONTRATO_EDITORIAL_TECNICO.md` y `app/src/contrato.ts`. No se altera ninguno.

**Precedencia documental, no jurídica ni de producción:** la adenda de R15/PR30 y H4 v0.2.1 rectifican afirmaciones cronológicamente antiguas de R06/R12 sobre 026/027. El fallo real que queda es describir `027.jpg` como «vizcaíno» en H4 y declarar dimensiones `849×688` para 026 cuando el MediaAsset registra `833×1041`. **Q.112 ya referencia `026.jpg` correctamente** y la geometría sigue pendiente.

## 2. Estrategia de unión sin duplicaciones

La matriz no se expande: **759 filas**, los mismos cuatro tipos de registro de #29:
- `VINCULO_R15` **53**,
- `DECISION_SIN_IMAGEN_R15` **43**,
- `VINCULO_R16` **68**,
- `INVENTARIO_R05_SIN_ENLACE_ESPECIFICO` **595**.

Las **14 decisiones PR30** se unen por `pregunta_id` a **20 filas R15 existentes**, porque seis preguntas ya tienen una segunda asociación visual R15; las 20 anotaciones no son 20 decisiones distintas. La clave original `registro_id` permanece intacta, no se crean filas R30 ni imágenes duplicadas.

Las **678 filas R12** se cruzan por **ruta física exacta** (campo R12 `ruta` = campo consolidado `asset_path`), comprobando además igualdad de Git blob SHA y SHA-256 **declarado**. Cada vínculo contextual hereda el estado QA de su recurso sin inferir evaluación del vínculo. La ausencia de un objeto físico (43 decisiones sin imagen y ficha QBI externa) no se transforma en un falso PASS/FAIL.

Las reglas del storyboard R06 se anotan sobre **23 recursos físicos** individualizados por ruta (incluidos 10 closeups), mientras la política transversal **TS-001** se recuerda para las demás escenas. Estas anotaciones **no simulan 23 nuevas inspecciones**: la única inspección individual documentada sigue siendo la de R12.

## 3. Las 14 decisiones PR30 confrontadas con la matriz aceptada

| Pregunta | Decisión previa propuesta | Medio previo en JSON | Candidato posterior / fase | Conciliación |
|---|---|---|---|---|
| `DQ.Q.000217` | `RETIRAR_PRE` | `DQ.MA.900008` | `DQ.MA.900008` · `reveal` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000232` | `RETIRAR_PRE` | `DQ.MA.900011` | `DQ.MA.900011` · `discovery` | P1: R15 añade closeup sad en post_answer (CAV-0095); R06 desaconseja closeup armado en II,74 sin decisión artística. |
| `DQ.Q.000233` | `RETIRAR_PRE` | `DQ.MA.900011` | `DQ.MA.900011` · `discovery` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000234` | `RETIRAR_PRE` | `DQ.MA.900011` | `DQ.MA.900011` · `post_answer` | P0: post_answer de 900011 podría revelar despedida antes del cierre; exigir conocimiento efectivo del desenlace. |
| `DQ.Q.000235` | `RETIRAR_PRE` | `DQ.MA.900042` | `DQ.MA.900042` · `post_answer` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000236` | `RETIRAR_PRE` | `DQ.MA.900042` | `DQ.MA.000373` · `discovery` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000237` | `RETIRAR_PRE` | `DQ.MA.900042` | `DQ.MA.000373` · `discovery` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000238` | `RETIRAR_PRE` | `DQ.MA.900011` | `DQ.MA.000373` · `discovery` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000313` | `RETIRAR_PRE` | `DQ.MA.900025` | `DQ.MA.900025` · `post_answer` | P0: R15 conserva 900025 en pre_question (CAV-0063), R30 exige retirar previa; NO aplicar R15 antes del visado. |
| `DQ.Q.000314` | `RETIRAR_PRE` | `DQ.MA.900025` | `DQ.MA.900025` · `post_answer` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000315` | `RETIRAR_PRE` | `DQ.MA.900036` | `DQ.MA.900036` · `post_answer` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000316` | `MANTENER_CONDICIONAL` | `DQ.MA.900025` | `DQ.MA.900025` · `post_answer` | P1: previa 900025 solo bajo condición narrativa cumplida; fallback post_answer, no aprobación automática. |
| `DQ.Q.000317` | `RETIRAR_PRE` | `DQ.MA.900037` | `DQ.MA.900037` · `reveal` | Propuesta sin nuevos vínculos; mantener ambos expedientes y visados pendientes. |
| `DQ.Q.000318` | `RETIRAR_PRE` | `DQ.MA.900036` | `DQ.MA.900037` · `post_answer` | P1: R15 propone 900037 en reveal (CAV-0092), R30 propone post_answer; resolver orden real. |

**Lectura obligatoria de `SIN_IMAGEN`:** significa **omitir** `visual_requirements.pre_image_media_id` si se valida la corrección, **nunca** escribir la cadena `SIN_IMAGEN` como valor de un identificador `MediaAsset`. Al omitirlo, se debe mantener `pre_image_must_not_reveal: true`; revisar que la UI no use por defecto otra imagen que revele la solución. El campo `hotspot_media_id` de Q.112 **no se modifica**.

### Conflictos y alternativas que no se resuelven automáticamente

- **Q.313 — contradicción material:** en la fila `CAV-0063` R15 propone `DQ.MA.900025` como `pre_question`, mientras PR30 dicta `RETIRAR_PRE` y reserva la imagen para después. La matriz marca ambas evidencias y bloquea una activación directa del vínculo R15. **No borrar R15 ni imponer un binding.**
- **Q.318 — fase discordante:** `CAV-0092` usa `DQ.MA.900037` en `reveal`; PR30 lo mueve a `post_answer`. El contenido puede ser apropiado en ambos momentos según relato y evaluación, pero **la elección es editorial y requiere prueba temporal**, no concatenación de dos imágenes duplicadas.
- **Q.234 — desenlace:** el `post_answer` propuesto de `DQ.MA.900011` puede seguir siendo prematuro. Mantener la advertencia de coordinación: **solo cuando se conozca realmente el final completo**, según R01/R06.
- **Q.232 — estilo y tiempo:** R15 tiene `don_quixote_sad.webp` en `post_answer`. R06 desaconseja presentar a Alonso Quijano con **armadura de retrato genérico** durante II,74 sin continuidad artística; requiere revisión específica, no sustituirlo por defecto con otra imagen.
- **Q.316 — excepción condicional:** `MANTENER_CONDICIONAL` solo si ya se ha narrado el encuentro y se ha identificado el objeto; si no, previa omitida y alternativa tras responder.
- **Q.233 y otros casos con imágenes culturales distintas:** dos recursos diferentes en fase `discovery` pueden ser **alternativas curatoriales**, no duplicado físico automático; debe elegirse finalidad y momento antes de importar cualquier relación.

## 4. Dirección artística R06 y evidencia R12

| Tema | Evidencia documental | Decisión de trabajo (no producción) |
|---|---|---|
| **TS-001** | Las 253 entradas de escenas declaran preferencia de texto derecha; las nueve escenas observadas relevantes por R12 tienen contenido sensible en derecha/centro. R06 no demostró máscaras verificadas. | Exigir texto de intervención **íntegro**, legibilidad sin audio, ampliación, pausa y `prefers-reduced-motion`; reservar **panel externo/banda inferior o vista dividida** cuando tape gestos, aspas, personas o libros; no considerar `preferred_overlay_side` una máscara aprobada. |
| **Acuarela 025** | R12 inspeccionó `assets/ilustraciones_tusell/acuarelas/025.jpg` y la encontró apta para mostrar la quema. R06 recuerda que la **quema consumada se narra en I,7**, distinta del escrutinio en I,6. | Reutilizar 025 **después de narrar la quema en I,7**, con pasaje/atribución cotejados y texto TS-001; no encargos nuevos de hoguera basados únicamente en el brief H4-03. **No inventar ID `DQ.MA.000025`**: no consta una ficha canónica equivalente en las 53 revisadas. |
| **Q.112, 026/027** | R12 inspeccionó ambas; la 026 muestra el aspa, la 027 el encuentro con frailes. H4 v0.2.1 ya aconseja 026; quedan errata de 027 y dimensiones incorrectas en H4. | Conservar `DQ.MA.000026` como medio del hotspot **en `question_focus` tras la embestida narrada y tras cumplir `safe_after_episodes=[DQ.P1.C08.E01]`**. Exigir prueba de rectángulo y escalado sobre el bitmap 833×1041, teclado/lector de pantalla. Ni 027 ni `molinos_pre` sustituyen su soporte. |
| **Molinos B01–B09** | R06 dispone de storyboard: siluetas B01; plano `molinos_pre` en B02–B05; `molinos_post` solo tras golpe (B06–B09). | Mantener luz de media mañana, continuidad de lanza, monturas y gestos; no imponer imagen literal de carga si la narración ilustrada es suficiente. |
| **Diez closeups** | R12 examinó 10/10: rasgos consistentes, estética pictórica frente a escenas de imagen naturalista. R06 asigna a `proud` B02, `determined` B04, `battle` B05, `battered` B07/B08; los demás carecen de beat en el piloto. | Candidatos a **tarjetas o paneles de reacción diferenciados**, con contraste de continuidad, luz y emoción. No insertar como rostros fotorrealistas ni usar closeup armado en II,1/II,74 sin autorización artística específica. |
| **R12 evidencia global** | **27/678** imágenes abiertas: **6 PASS limitados**, **1 FAIL de asociación** (027 vinculada erróneamente al aspa) y **671 PENDIENTE**. | Un `PASS` R12 no implica aprobación para otra pregunta, fase o formato. El `FAIL` sobre 027 **no significa que su binario deba descartarse**: la imagen de los frailes es reutilizable. Hay **651/678** imágenes todavía sin inspección visual individual. |

Las 17 inconsistencias entre `DQ.MED` y `DQ.MA` y la rectificación `R16-054` de #29 permanecen intactas en las columnas originales de identidad por URI. Ninguna línea añade un ID canónico inexistente o promueve `DQ.MED` a `DQ.MA`.

## 5. Puerta obligatoria de Desarrollo: contrato y migración de IDs

Esta fase **no acredita que Desarrollo haya validado el contrato**. Se ofrece la lista de comprobaciones que debe resolver R09/Desarrollo, conjuntamente con R05/R06/R12, antes de cambiar JSON o pantallas:

1. **Contrato de relaciones:** decidir si las relaciones para museo, lector, storyboards y enlaces alternativos son únicamente metadatos de una tabla externa o requieren esquema versionado. **No incluir las 69 columnas de auditoría en Question ni MediaAsset**. Especificar clave compuesta `recurso/medio canónico + destino + fase + ancla (pregunta/pasaje/beat)`, cardinalidad, orden, nulabilidad, exclusividad y precedencia R15/PR30.
2. **Migración de identidad:** definir tabla explícita `legacy_id / physical_path / git_blob_sha / canonical_media_id / estado_revision`, con **17 colisiones numéricas** y resolución por URI; no admitir `DQ.MED.900029 == DQ.MA.900029` por número. Los 586 candidatos R05 sin ficha y 39 decorativos requieren reserva y revisión, no renumeración inferida.
3. **Cambio de imágenes previas:** según `schemas/content/question.schema.json`, `visual_requirements.pre_image_media_id` es opcional, pero `pre_image_must_not_reveal` es obligatorio y `true`. La transición `RETIRAR_PRE` es **omisión condicionada** del campo, sin serializar `SIN_IMAGEN` ni cambiar respuestas, `episode_id`, opción correcta o `spoiler_policy.safe_after_episodes`.
4. **Relación temporal y foco:** definir eventos `episodio_completado`, `hecho_narrado`, `pregunta_mostrada`, `respuesta_registrada`, `descubrimiento_desbloqueado`. Q.112 necesita soporte 026 antes de que la persona responda al hotspot, pero solo tras satisfacer ambas condiciones narrativas y de episodio; Q.234 requiere un gate más tardío si su imagen anuncia la muerte.
5. **Pruebas de integración:** R09/R12 deben añadir casos de contrato (IDs inexistentes, colisiones, `SIN_IMAGEN` inválido, recurso post en fase previa, Q.112 + zoom + teclado, alternancia audio/no audio, texto TS-001, sin red, retorno/repetición) sin romper rutas `assets://` ni los 74 registros de Question. El diseño del QA debe preservar el estado `NO_GO` hasta que **visados R05/R06/R12** estén emitidos individualmente.

**Veredicto propuesto para esta adenda:** **GO exclusivamente documental** para discusión entre Coordinación, R05, R06, R09/Desarrollo y R12; **NO-GO** para catálogo productivo, componentes, preguntas, atlas o museo. La discrepancia histórica **697/678** y los **9 SHA-256 no declarados** continúan en expedientes separados. No se reabre auditoría general de licencias como prerrequisito de esta consolidación de uso personal.

## 6. Comprobaciones reproducibles de la adenda

- CSV nuevo: **759 filas × 69 columnas**, mismo `registro_id`, mismas 678 rutas locales y mismas 53/43/68/595 filas por clase.
- **14 decisiones PR30 distintas** cruzadas por `pregunta_id` sin generar filas ni asociar un recurso nuevo, presentes en **20** filas R15 ya existentes; se conservan `RETIRAR_PRE`/ `MANTENER_CONDICIONAL`, medios actuales y posteriores, puertas y **visados pendientes**.
- Registro QA R12: **678/678** rutas coinciden, Git blob SHA y SHA-256 declarado cotejados como campos documentales; estados de origen **6 PASS / 1 FAIL / 671 PENDIENTE**, inspección directa de **27** (20 no concluyentes).
- **23 recursos** tienen anotación artística focalizada (10 closeups y 13 rutas singulares); el resto de las escenas recibe únicamente una restricción TS-001 **transversal** no basada en inspección individual.
- **Sin duplicaciones de vínculos**, sin revisión de los binarios no abiertos y sin cambios sobre otras fuentes, preguntas, esquemas, binarios, manifest, app, atlas ni museo. El documento no altera ni reinterpreta el dictamen de PR #29 o PR #30.

**Acción pendiente:** firma de criterios de relación/migración por Desarrollo y revisión R05/R06/R12 de cada decisión. La publicación de esta adenda **no** satisface esos visados.
