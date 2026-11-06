# R15 — Adenda de cierre documental y propuesta de correcciones antiespoiler

**Fecha:** 2026-11-06 · **Prioridad:** P0 · **Rol:** Contenidos / Preguntas e Interacciones, coordinación con R05 (iconografía), R06 (arte) y R12 (QA y accesibilidad).  
**Estado:** **AUDITORÍA DOCUMENTAL ACEPTADA POR COORDINACIÓN; PROPUESTAS DE ASIGNACIÓN NO APROBADAS NI INTEGRADAS**.  
**Origen:** PR #25 (fusionada). Esta adenda se publica mediante PR independiente.  
**Matriz acotada:** `docs/data/propuesta_correcciones_visuales_pre_r15.csv` (14 registros). La matriz ya aceptada `docs/data/propuesta_vinculos_visuales_preguntas.csv` (74 preguntas, 97 registros) **no se modifica**.

## 1. Rectificación cronológica: H4 v0.2.1 y acuarelas

La anterior auditoría R15 atribuía al dossier H4 una propuesta de utilizar `027.jpg` para el arrastre por el aspa. **Esa afirmación corresponde a una versión anterior y queda rectificada**: `docs/DOSSIER_ARTISTICO_H4.md` **v0.2.1, §5, ya recomienda correctamente `026.jpg`** para Q.112. R15 no debe reclamar como corrección propia lo que H4 ya subsanó.

Persiste **una errata diferente en H4 v0.2.1**: describe `027.jpg` como «duelo con el vizcaíno». La identificación de la acuarela en `assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json` y la inspección directa registrada durante R15 indican que la **027 representa el encuentro con los frailes**; no representa ni el arrastre de los molinos ni el duelo con el vizcaíno. **Responsable propuesto de rectificar el dossier H4:** R06, con cotejo iconográfico R05. **No se edita H4 en esta PR**, para respetar su propiedad editorial/artística.

Existe además un **dato geométrico por reconciliar**: H4 v0.2.1 §5 menciona `849×688` como «resolución real» de la 026, pero `content/piloto/media_assets/DQ.MA.000026.json` registra **833×1041** y la acuarela observada tiene formato vertical. R05/R06 deberán cotejar el binario real y corregir en el dossier cualquier dimensión que corresponda a otra ilustración; no trasladar `849×688` a la geometría del hotspot.

## 2. Q.112 — recurso correcto preservado y pruebas obligatorias

| Campo | Valor constatado / dictamen |
|---|---|
| Pregunta | `DQ.Q.000112`, interacción `hotspot` |
| Recurso de foco **existente** | **`hotspot_media_id = DQ.MA.000026`** → `assets://ilustraciones_tusell/acuarelas/026.jpg` |
| Recurso de contexto **existente** | `pre_image_media_id = DQ.MA.900005` (escena antes del golpe) |
| Política de spoiler **vigente** | `safe_after_episodes = ["DQ.P1.C08.E01"]`; acuarela 026 marcada `spoiler_level: revelador` |
| Geometría **actual** | `x=0.30, y=0.22, w=0.45, h=0.50` normalizados; **no validada** |
| Estado | El contenido de la acuarela sí representa el aspa arrastrando caballo y caballero. **Ni coordenadas, ni área interactiva, ni momento de ejecución están validados.** |
| Decisión de R15 | Mantener sin cambios `DQ.MA.000026`; **no sustituir por 027** ni modificar el JSON. |

**Secuencia de presentación candidata, sujeta al contrato y a R06/R12:** `DQ.MA.900005` ambienta una fase `pre_question` anterior a la embestida; después de narrar efectivamente el choque **y cumplir `safe_after_episodes`**, `DQ.MA.000026` se presenta como `question_focus` para que el jugador **señale** la región. Se distingue el **`reveal` del acontecimiento narrativo** del `post_answer` posterior a contestar Q.112: no es posible usar la acuarela únicamente **después de que el jugador conteste al hotspot**, porque constituye el soporte de la selección. Si el flujo actual plantea Q.112 antes de finalizar el episodio que exige `safe_after_episodes`, **hay conflicto de temporalidad pendiente de decisión editorial/técnica**, no permiso para ignorar la política.

**Pruebas a documentar antes de pasar a `VALIDADA`:**

1. **R05 / integridad:** cotejar ruta, hash de archivo, dimensiones efectivas de 026, `MediaAsset`, versión de fichero, autoría y crédito Tusell/Doré; no confundir `DQ.IL.0026` del manifiesto con el ID canónico `DQ.MA.000026`. Dejar evidencia reproducible.
2. **R06 / geometría:** cargar 026 sin recorte distorsionador, superponer sobre el **mismo bitmap** el rectángulo normalizado vigente; registrar con captura qué parte del aspa, caballo y caballero cubre y qué distracciones excluye. Probar escalado, márgenes, `object-fit`, proporción vertical original, zoom y paneles de texto sin tapar el objeto.
3. **R12 / interacción:** ensayar puntos dentro, fuera y sobre el borde en varios tamaños de pantalla, ratón y teclado. Documentar falsos positivos y fallos de acierto; ensayar alternativa accesible de selección entre regiones/opciones sin exigir puntería fina ni usar escritura libre. Comprobar foco visible, texto alternativo, lector de pantalla y movimiento reducido.
4. **R06 + R12 / temporalidad:** recorrido con y sin audio y con controles de repetir/retroceder; garantizar que `026` no aparece antes de la embestida narrada ni antes de permitirlo `safe_after_episodes`. Comprobar que `900005` no intenta actuar como imagen del hotspot.
5. **R12 / evidencia de aceptación:** captura con overlay, geometría exacta probada, escena y orden de beats, resolución, accesibilidad y resultado de pruebas; registrar estado y revisión **sin declarar PASS** si falta algún requisito.

El informe R15 conserva los cuatro valores originales **solo como coordenadas auditadas**; no se proponen números sustitutos sin prueba.

## 3. Propuesta editorial concreta: 14 preguntas de riesgo

La siguiente tabla distingue **imagen previa actual** (campo `visual_requirements.pre_image_media_id`) de la **decisión futura recomendada**. `SIN_IMAGEN` significa **sin imagen específica en el foco de respuesta**; se mantiene libre la posibilidad de continuidad narrativa neutra si R06 la acredita. No se cambia la solución, el tipo de interacción, los enunciados ni las escenas de Modo Historia. Toda asociación posterior es candidata, no binding publicado.

| Pregunta | Imagen previa actual | Alternativa previa / foco | Imagen posterior candidata y fase | Justificación / condición |
|---|---|---|---|---|
| **Q.217** | `DQ.MA.900008` (rebaños) | `SIN_IMAGEN` en `question_focus` | **900008**, `reveal` | Mostrar ovejas antes de identificar la polvareda revela su causa. Presentarlas tras elegir la respuesta. |
| **Q.232** | `DQ.MA.900011` (despedida post) | `SIN_IMAGEN` | **900011**, `discovery` | No insinuar el desenlace fatal antes del anuncio de los seis días; usarla solo después de II,74. |
| **Q.233** | `DQ.MA.900011` | `SIN_IMAGEN` | **900011**, `discovery` | No anticipar el reconocimiento final de Alonso Quijano mediante despedida. |
| **Q.234** | `DQ.MA.900011` | `SIN_IMAGEN` | **900011**, `post_answer` condicionado | Mostrar solo tras confesión y dictamen del cura, sin anticipar la declaración o muerte. |
| **Q.235** | `DQ.MA.900042` (testamento post) | `SIN_IMAGEN` | **900042**, `post_answer` | El documento visual del testamento es adecuado tras convocar a los intervinientes y testar, no antes. |
| **Q.236** | `DQ.MA.900042` | `SIN_IMAGEN` | **000373**, `discovery` | El testamento no demuestra quién compone el epitafio; una alegoría tras el cierre sí aporta contexto. |
| **Q.237** | `DQ.MA.900042` | `SIN_IMAGEN` | **000373**, `discovery` | La paradoja del epitafio se resuelve mediante texto y puede acompañarse después con iconografía. |
| **Q.238** | `DQ.MA.900011` | `SIN_IMAGEN` | **000373**, `discovery` | No revelar el final de la obra antes de seleccionar la advertencia metanarrativa. |
| **Q.313** | `DQ.MA.900025` (barbero/bacía) | `SIN_IMAGEN` | **900025**, `post_answer` diferido | El encuentro del barbero sucede después del deseo de Sancho de refugiarse por lluvia; no anticipar el episodio. |
| **Q.314** | `DQ.MA.900025` | `SIN_IMAGEN` | **900025**, `post_answer` | El objeto real visible resuelve el contraste entre lo que creen ver ambos personajes. |
| **Q.315** | `DQ.MA.900036` (primer plano de bacía) | `SIN_IMAGEN` | **900036**, `post_answer` | La lluvia y la bacía sobre la cabeza hacen evidente el motivo de proteger el sombrero. |
| **Q.316** | `DQ.MA.900025` | **900025**, `pre_question` **solo si ya se narró el encuentro y reconoció el objeto**; si no, `SIN_IMAGEN` | **900025**, `post_answer` como fallback | La imagen no revela el precedente literario de Sacripante, pero no puede adelantarse al reconocimiento de la bacía. |
| **Q.317** | `DQ.MA.900037` (examen post) | `SIN_IMAGEN` | **900037**, `reveal` | El archivo físico `p1_c21_sancho_bacia_examen_post.webp` es posterior aunque el registro `MediaAsset` indica función `pre_pregunta`. |
| **Q.318** | `DQ.MA.900036` | `SIN_IMAGEN` | **900037**, `post_answer` | El examen del objeto confirma la última fase de la secuencia solo después de ordenar los lances. |

**Nota sobre identificación:** `900008/900011/900025/900036/900037/900042` de la tabla son abreviaturas de los ID canónicos completos `DQ.MA.######` existentes en `content/piloto/media_assets/`; `000373` equivale a `DQ.MA.000373`. El CSV auxiliar escribe siempre el ID completo.

### Tensiones de coordinación a resolver

- **R12 recomienda reutilizar `p1_c18_rebanos_pre.webp` como plano narrativo** (con texto externo); R15 pide **no presentarlo como pista previa de Q.217**. **No son necesariamente decisiones incompatibles**: puede conservarse el plano en Modo Historia tras informar qué es el ganado, y suspender su presencia durante la pregunta evaluativa previa. R06 y R12 deben fijar el beat concreto, sin ocultar ovejas con recortes arbitrarios.
- **R05 distingue `DQ.MED.*` de `DQ.MA.*`** y exige cotejo de ruta/hash antes de declarar correspondencia. Esta adenda usa solo los `DQ.MA.*` existentes para las 14 preguntas y **no crea IDs nuevos**.
- **R06/H4 parte de una cronología de escena, no de la interfaz aislada.** En II,74, no usar un `post` emocional como `pre_question`, aunque el registro `MediaAsset` erróneamente marque `spoiler_level: ninguno`.
- **R12 inspeccionó visualmente una muestra, no todos los fotogramas.** Esta adenda propone fases editoriales a partir de rutas, manifiestos y fichas; para cada sustitución el cotejo visual individual y QA siguen pendientes.

## 4. Solicitud de revisión por responsables (sin firma presunta)

| Rol | Revisión solicitada | Evidencia esperada | Estado |
|---|---|---|---|
| **R05 — Iconografía** | Confirmar imagen real, alt, hash/ruta/licencia, exactitud de 026/027 y correspondencias de los seis `DQ.MA.*` de escenas más 000373. Verificar dimensiones 026 vs H4. | Matriz de cotejo por ID y nota de erratas H4, con referencia de commit y medios revisados. | **PENDIENTE** |
| **R06 — Dirección artística** | Revisar fases de Q.217 / II,74 / Mambrino, continuidad entre beats, posible fondo neutro, TS-001 y zona de texto, tono de imágenes funerarias, Q.112. Rectificar en su documento H4 la descripción de 027 cuando corresponda. | Dictamen de plano y fase por cada una de las 14 filas; geometría de Q.112 marcada sobre captura si pasa. | **PENDIENTE** |
| **R12 — QA y accesibilidad** | Conformidad antiespoiler antes/después, foco y orden, teclado/lector de pantalla, resoluciones, hotspot, reversión narrativa y offline. | Casos PASS/FAIL reproducibles, capturas y riesgos P0 abiertos. | **PENDIENTE** |

No se han realizado aprobaciones cruzadas nuevas ni se ha invitado a revisores identificables por cuenta: **R05, R06 y R12 designan responsabilidades, no cuentas de GitHub conocidas**. El PR se deja abierto para que coordinación asigne los visados. R01 revisará consistencia con el texto cuando la fase exacta cambie el sentido y R09 revisará cualquier futura representación técnica, pero **ningún cambio de esquema se solicita aquí**.

## 5. Alcance del PR y puerta de salida

**Documentación que sí cambia:** rectificación de afirmaciones antiguas en `docs/AUDITORIA_ASIGNACION_VISUAL_PREGUNTAS.md`, la presente adenda y el CSV acotado de **14 registros**.  
**Documentación deliberadamente inalterada:** `docs/DOSSIER_ARTISTICO_H4.md` (su errata debe tramitar R06), matriz R15 original de **97 registros**, propuestas de R05/R16.  
**No se altera:** ningún JSON de pregunta, opción, respuesta, `hotspot_area`, `MediaAsset`, esquema, binding, manifiesto, imagen productiva ni código. **No se generan imágenes.**

La siguiente fase, **posterior y diferenciada**, consistirá en consolidar R05 + R15 + R16 en **una sola matriz de aprovechamiento visual**. No debe confundirse este CSV de incidencias focales con esa matriz consolidada ni importar automáticamente sus valores al runtime.

**Dictamen:** `GO` para revisión editorial de esta PR y registro de responsables; `NO-GO` para modificar asignaciones productivas hasta cerrar los tres visados R05/R06/R12 y las pruebas específicas de Q.112.
