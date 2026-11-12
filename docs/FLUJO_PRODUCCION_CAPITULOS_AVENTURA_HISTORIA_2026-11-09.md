# Flujo oficial de producción de capítulos — Aventura → Historia

> **Actualización vinculante DC-40 (2026-11-12):** toda evaluación conjunta de Aventura/Historia y futuro prompt autorizado para escenas cómicas deberá comprobar y potenciar el humor visual para buscar sonrisa/risa, manteniendo el estilo cinematográfico y la fidelidad. Queda desplazada la excesiva contención previa que anule la comicidad. Ver [norma específica](DIRECTRIZ_COMICIDAD_VISUAL_CERVANTINA_2026-11-12.md). No autoriza nuevas imágenes.

> **Actualización vinculante 2026-11-11, DC-37:** Se conserva estrictamente el orden editorial DC-36; la revisión conjunta de aptitud visual debe tener en cuenta imagen a superficie completa, zonas seguras del pergamino, cobertura específica por intervención de Historia y preimagen exclusiva de Aventura. La TS-001 revisada conserva texto completo visible por defecto, ocultable voluntariamente en contemplación pausada. Referencia prioritaria: [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Decisión **solo documental**; no autoriza implementación ni nuevas imágenes.

**Decisión del propietario:** 2026-11-09 · **Estado:** VIGENTE para todos los capítulos que se preparen a partir de esta fecha.

**Autoridad:** [AGENTS.md](../AGENTS.md), [DC-30 y DC-27](VISION_Y_DECISIONES.md), [reglas de Aventura narrativa](REGLAS_MODO_AVENTURA_V2_2026-11-08.md), [especificación editorial](ESPECIFICACION_EDITORIAL.md), [directriz ágil DC-29](DIRECTRIZ_DESARROLLO_AGIL_2026-11-09.md) y [norma visual DC-28](DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md). Las instrucciones posteriores del propietario prevalecen sobre procedimientos anteriores incompatibles.

## 0. Texto original de referencia (DC-31)

La **edición fiable para este flujo es la que ya está almacenada y registrada en el repositorio**, no una edición que el agente deba volver a seleccionar. Para Aventura, consecuencias, Historia y los futuros prompts de imágenes, utilizar `content/textos/gutenberg_2000/El_Quijote.txt` (Project Gutenberg #2000; `DQ.ED.0003` / `DQ.SRC.0005`), comprobar directamente las palabras y el orden de los hechos, y documentar parte, capítulo y ancla/offset. Conservar el original intacto.

El EPUB ilustrado Tusell (`DQ.ED.0001`) sigue cumpliendo la función de lector; la edición académica Rico (`DQ.ED.0002`) sirve solo para contraste editorial de variantes. No escoger una edición externa para sustituir el corpus local, no atribuir a Cervantes diálogos o detalles ausentes y no mezclar citas de ediciones distintas. Distinguir expresamente el texto literal de cualquier paráfrasis de jugabilidad. Aplicar `docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md` y la validación de derechos prevista.

## 0 bis. Conformidad vinculante de todo arte y contenido (DC-32)

**Condición previa obligatoria:** ninguna ronda, texto, consecuencia, prompt, imagen, escena, funcionalidad o integración de Aventura/Historia puede elaborarse como entrega válida ni publicarse si incumple las directrices oficiales vigentes de GitHub. Comprobar `AGENTS.md`, `docs/DIRECTRIZ_DESARROLLO_AGIL_2026-11-09.md`, `docs/VISION_Y_DECISIONES.md`, estas reglas de flujo, la norma narrativa de cada modo y los contratos pertinentes, además del corpus textual DC-31.

**Requisitos artísticos para cada imagen y prompt:** contrastar con `docs/DIRECCION_ARTISTICA.md`, `docs/DIRECCION_ARTISTICA_PILOTO.md`, `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md` y `docs/DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md`. Verificar por tipo de medio: exactitud del instante narrativo, personajes/objetos/época, continuidad, antiespoiler de la preimagen, imagen exclusiva por ronda, reutilización segura con Historia, espacio de texto y composición protegida, integridad sin recorte de acuarelas, procedencia/derechos, rutas y metadatos. Un archivo existente o un prompt redactado **no supone conformidad**. Se requieren además revisión/validación del propietario para imágenes nuevas y controles técnicos aplicables antes de integrarlas.

Ante una incompatibilidad real: indicar ruta y norma infringida, **no generar ni activar el entregable conflictivo** y subsanar primero; solo el propietario puede aprobar una excepción que se documentará en GitHub. La documentación histórica desplazada por decisiones más recientes no invalida trabajo conforme. Se pueden proponer rondas **candidatas** para revisión sin presentarlas como aprobadas, como exige el orden de trabajo.

**DC-34 (2026-11-09):** una vez revisadas y aprobadas las rondas, sus datos editoriales se registran en el JSON correspondiente de `content/aventura/` del mismo GitHub, bajo el esquema `schemas/content/adventure-round.schema.json`; los enunciados y respuestas nunca se hardcodean en componentes. El archivo separa `borrador`, `en_revision`, `piloto_integrado` y `aprobado`; la disponibilidad técnica de un piloto no sustituye la validación editorial ni visual. Más detalles en `content/aventura/README.md`.

**Actualización vinculante DC-36 (instrucción expresa del propietario, 2026-11-10):** la evaluación de si una imagen es apropiada o no necesita conocer primero las preguntas/consecuencias de Aventura **y** los textos e intervenciones de Historia. La antigua indicación de redactar Historia tras aprobar el inventario visual queda sustituida en ese aspecto. Se mantiene la revisión y aprobación del propietario para los medios, el inventario previo solo como localización técnica, y la prohibición de prompts/imágenes sin carencias confirmadas.

## 1. Flujo obligatorio capítulo a capítulo

**Aventura (preguntas, alternativas y consecuencias candidatas) → Historia (guion y textos por intervención/beat, también candidatos, con TS-001) → evaluación de aptitud visual conjunta por el propietario, cotejando imagen con cada pregunta y cada intervención → prompts exclusivamente para carencias confirmadas → validación, integración y QA.**

- **Se empieza por Primera Parte, capítulo I.** No abrir por iniciativa propia el capítulo siguiente antes de completar el tramo de revisión acordado del actual.
- **Primero se definen las rondas de Aventura; a continuación los textos completos de Historia**, antes de calificar imágenes como aptas o no aptas. El propietario revisa la propuesta editorial y después compara medios existentes con las dos necesidades narrativas; ambos textos siguen siendo candidatos, sin aprobación automática.
- Se puede consultar un **inventario técnico preliminar** para localizar archivos, pero la aptitud visual y la declaración FALTA_CONFIRMADA esperan a conocer las preguntas y textos concretos de ambos modos.
- Una ronda redactada no es una ronda aprobada ni publicada. Una imagen catalogada no es necesariamente apta. Una imagen candidata no se activa por incorporarse al repositorio.
- Este procedimiento autoriza la **preparación editorial secuencial**; no amplía la Fase 1 ni autoriza automáticamente publicar los 126 capítulos, activar contenidos no aprobados o iniciar Fase 2.

## 2. Aventura: anticipar acciones, nunca examinar conocimientos

Cada unidad jugable es una **ronda de anticipación narrativa**, conforme a la mecánica ya integrada:

1. **Antes del hecho:** presentar una situación verdadera del texto, el personaje que va a actuar y una preimagen que no revele la respuesta.
2. Preguntar de forma natural **qué hará a continuación**, con **tres opciones habitualmente** (cuatro solo con justificación), todas plausibles en la situación, pero con **una sola acción canónica inequívoca**.
3. El jugador elige: resultado de puntos (+1/−1), sin alterar jamás la historia. La partida empieza con 3 puntos, tope 5 y checkpoints según reglas vigentes.
4. Solo al solicitar **«Descubrir qué sucede»**, revelar el acontecimiento real y, cuando corresponda, la imagen de consecuencia. No anticipar desenlaces de capítulos posteriores.

**No se admiten** exámenes de memoria («¿Quién era...?», «¿Cómo se llamaba...?»), verdadero/falso retrospectivo, ordenación de hechos ya conocidos, preguntas de relleno ni recuperación del antiguo banco `DQ.Q.*`. Si un capítulo carece de suficientes actos previsibles, **se proponen menos rondas**: no se inventan decisiones para llegar a una cuota.

### 2.1 Formato de entrega inicial al propietario

Entregar **primero las rondas candidatas de Aventura**, con una ficha por ronda; antes de evaluar la aptitud visual, completar también las intervenciones de Historia de ese capítulo:

| Campo | Contenido obligatorio |
|---|---|
| Identificador | ID provisional de ronda, capítulo y episodio o tramo |
| Situación previa | Qué se sabe exactamente **antes** del acto; personaje, contexto y pista legítima |
| Anticipación | Pregunta sobre la acción inmediata futura, no sobre cultura literaria |
| Alternativas | Tres opciones verosímiles; una correcta e inequívoca |
| Respuesta y consecuencia | Acción realmente narrada y consecuencia canónica (oculta al jugador hasta la revelación) |
| Fuente | Parte, capítulo, pasaje o ancla verificable, edición/referencia y fragmento de evidencia limitado |
| Antiespoiler | Elementos prohibidos en la preimagen y momento en el que puede mostrarse la consecuencia |
| Preimagen requerida | Descripción del **instante anterior**, con uso principal en Aventura |
| Imagen de consecuencia | Descripción del **instante posterior**; indicar si resulta necesaria y si ya hay candidata |
| Reutilización | Uso potencial del mismo plano en Historia y en qué beat, sin revelar un hecho prematuramente |
| Estado | `CANDIDATA`, `REVISIÓN PROPIETARIO`, `APROBADA EDITORIALMENTE` o `PENDIENTE`; sin aprobar por defecto |

La entrega editorial **no contiene prompts de nuevas imágenes** mientras el propietario no haya indicado qué planos faltan.

## 3. Historia: textos y escenas después de Aventura, ANTES de juzgar la aptitud visual (DC-36)

Tras redactar Aventura y **antes de evaluar como apropiadas o no las imágenes**, se entrega un **guion candidato completo de Historia** del mismo capítulo:

- Desglose secuencial de escenas y beats; desarrollo condensado, claro, atractivo y **fiel a Cervantes**.
- Texto del narrador y parlamentos con procedencia localizable; distinguir cita literal de adaptación narrativa.
- Referencia del texto original para cada intervención o unidad narrativa relevante.
- Orden cronológico correcto, ritmo dramático, humor y desarrollo de personajes sin revelar escenas futuras.
- Imagen prevista para cada intervención/beat, identificando **cuáles ya están disponibles**, cuáles pueden reutilizarse desde Aventura y cuáles siguen faltando.
- **TS-001 revisada (DC-37):** todos los textos de voces de narrador/personajes deben estar completos y visibles **por defecto** incluso sin audio; el usuario podrá ocultar voluntariamente el pergamino solo con avance/voz/temporizador pausados, y recuperar íntegra la misma intervención. Nunca omitir contenido por existir sonido.

Como el borrador de Historia se prepara antes del control de aptitud, **la revisión del propietario es conjunta para Aventura e Historia**: contrastar recursos con ambos guiones, entregar listado de carencias, esperar su confirmación y redactar **solo** los prompts de las faltantes. La revisión final debe maximizar reutilización legítima Aventura/Historia sin degradar la puesta en escena.

## 4. Comprobación de imágenes y autoridad del propietario

Después de disponer de **las rondas y sus consecuencias de Aventura Y los textos/escenas/beat de Historia**, **el propietario revisa personalmente qué imágenes existen**, si son apropiadas para cada uno de esos momentos y cuáles faltan. Dirección puede facilitar una lista de necesidades y candidatos con referencias de catálogo, pero **no sustituye la validación del propietario** ni encarga arte automáticamente.

Orden de búsqueda y aprovechamiento: recursos ya registrados en `assets/scenes/` y `assets/closeups/` → acuarelas como recurso secundario cuando proceda y tengan derechos claros → **nuevo encargo solo si hay una carencia concreta confirmada por el propietario**.

Distinguir por unidad: `EXISTE_Y_APROBADA`, `EXISTE_PENDIENTE_REVISION`, `NO_APTA` y `FALTA_CONFIRMADA`. Relacionar cada candidato con su ruta/identificador, fase `pre` o `consecuencia`, escena, restricciones de spoilers, derechos y destino previsto.

**Reutilización intermodal:** preferir una misma imagen para Aventura e Historia cuando represente el mismo hecho y aparezca en el mismo punto cronológico; no duplicar archivos o encargos por modo. La preimagen de **cada ronda distinta** debe seguir siendo específica y no reveladora conforme a DC-24; reutilizar entre **modos** no autoriza usar una escena genérica repetida para diferentes rondas ni mostrar una consecuencia antes de tiempo. Historia puede requerir planos adicionales para sostener una narración visualmente rica.

## 5. Prompts artísticos: únicamente para las imágenes confirmadas como faltantes

**Solo después de que el propietario confirme las carencias**, Dirección entrega **un prompt independiente por imagen necesaria**, listo para enviar al diseñador. El propietario solicita las imágenes y **las valida personalmente**; el diseñador no debe generar variantes no pedidas, reemplazar originales ni activar medios por iniciativa propia.

Cada prompt incluirá:
- **Intención cómica, cuando proceda (DC-40):** mecanismo humorístico verificado en el pasaje, expresiones, contraste y fotograma más gracioso permitido por la fase pre/post; potenciar sonrisa/risa sin cambiar estilo, caricaturizar, inventar hechos ni revelar consecuencias anticipadas.
- **ID provisional y uso**: capítulo, escena/beat, ronda, fase previa o consecuencia, Aventura, Historia o ambos.
- **Fundamento textual**: parte, capítulo, pasaje y hecho concreto narrado por Cervantes; citas breves verificadas cuando sean pertinentes.
- **Descripción exacta de la escena**: quiénes están presentes **según el texto**, qué hacen, relaciones espaciales o temporales que sí estén descritas, objetos y ambiente sustentados; momento antes/después del hecho.
- **Composición funcional**: formato, plano, sujetos íntegros, proporciones, zona segura para texto si hace falta, continuidad visual de personajes y legibilidad en el diseño DC-28. Estas instrucciones gráficas **no pueden modificar la narración**.
- **Prohibiciones**: desenlaces adelantados, personajes o acciones inexistentes, detalles de vestuario/armas/época contradictorios, anacronismos, elementos de interfaz o rótulos incrustados, cabezas/gestos/objetos narrativos recortados.
- **Trazabilidad y aceptación**: recurso existente de referencia, capítulo/pasaje, función, alt y criterios observables que el propietario comprobará.

**Fidelidad total al libro original:** no inventar acciones, diálogos, causalidad, simultaneidad, personajes ni objetos como si Cervantes los hubiera descrito. Cuando el texto no precise un rasgo físico, vestuario, postura, hora o decorado, **indicar que es una decisión visual no especificada por la fuente** y proponer una solución sobria y compatible con el periodo; nunca presentarla como un dato textual. Si la escena no puede concretarse sin inventarla, elevar el problema al propietario en vez de generar un prompt engañoso.

No confundir las paráfrasis editoriales del juego con citas literales de la novela.

## 6. Integración GitHub de imágenes aprobadas

**Procedimiento técnico obligatorio (DC-35):** al recibir «revisadas y validadas. cataloga e incorpora a main», «sigue el protocolo de aceptación de imágenes» o equivalente para archivos identificables, ejecutar [`PROTOCOLO_ACEPTACION_E_INTEGRACION_IMAGENES.md`](PROTOCOLO_ACEPTACION_E_INTEGRACION_IMAGENES.md) sin solicitar nueva aprobación. Este procedimiento recoge el puente binario privado temporal Drive → Base64 → blobs Git, SHA, catálogo, commit atómico, comprobación de `main` y limpieza de temporales. No autoriza activar contenidos ni omitir QA o derechos.

**Excepción operativa permanente aprobada por el propietario:** una imagen nueva que **ya haya sido expresamente validada por él** puede incorporarse **directamente a `main`**, sin rama ni Pull Request creadas exclusivamente por el recurso artístico, de acuerdo con DC-29.

El diseñador/integrador deberá:
1. Confirmar autorización del propietario **para la imagen concreta** y comprobar HEAD remoto de `main`.
2. Guardar en la carpeta apropiada con nombre estable; **no sobrescribir originales** sin decisión explícita.
3. Verificar bytes reales, formato, resolución, tamaño y SHA-256; comprobar calidad de archivo, ausencia de duplicados y derechos/licencias de almacenamiento en el **repositorio público** y usos previstos.
4. Actualizar manifiesto y ficha de medio/derivada existente según el contrato, con ID estable, `logical_uri` si se ha autorizado su activación, fase narrativa, alt, referencia textual, licencias y estado de revisión correcto; no crear IDs duplicados ni declarar aprobación no concedida.
5. Comprobar integridad de rutas y referencias, spoilers, visualización y los controles pertinentes; **hacer commit identificable en `main`** y comunicar SHA, recurso y pruebas. Sin PR artificial.
6. **Si la imagen aún no ha sido validada, no integrarla bajo esta excepción.** La aprobación del recurso no implica por sí sola aprobación funcional/UX ni autoriza cambios de código grandes sin revisión.

La edición de código, contratos y sistemas de navegación sigue el criterio de riesgo de DC-29. Los recursos audiovisuales con restricciones de derechos no se subirán, aunque sean útiles narrativamente.

## 7. Estados de trabajo y criterio de cierre

Por capítulo conservar una matriz mínima de **ronda/beat → fuente → preimagen/imagen posterior → medios reutilizados → carencias confirmadas → prompt enviado → aprobación del propietario → commit SHA → QA**.

**Aventura lista editorialmente** solo si las rondas y consecuencias tienen apoyo textual verificable y el propietario revisó las necesidades visuales. **Historia lista editorialmente** solo con guion/TS-001 y cobertura visual revisados. **Capítulo integrado** solo si los archivos y datos autorizados constan en `main`, las pruebas pertinentes han pasado, los medios usados tienen derechos y la aceptación editorial/visual del propietario está registrada. No declarar terminado por tener una lista de escenas o prompts.

**Inicio vigente:** Primera Parte, capítulo I. La **primera entrega** presenta las rondas candidatas de anticipación de Aventura; **después** se prepara el guion candidato completo de Historia (TS-001). La evaluación de aptitud de imágenes existentes se realiza **solo con los contenidos de ambos modos disponibles** y por revisión del propietario. No redactar prompts de arte faltante antes de su confirmación ni generar imágenes sin encargo expreso.
