# EL QUIJOTE — Biblia narrativa y flujo operativo del Modo Historia

> **Actualización vinculante DC-37 (2026-11-11):** Se conserva fidelidad, voces y texto íntegro, pero se actualiza la TS-001 histórica: ocultar voluntariamente un pergamino en modo contemplación **sí** es obligatorio y pausa voz/temporización/avance. La narración será imagen a superficie completa, no panel lateral. Consultar [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Las instrucciones históricas incompatibles se consideran sustituidas **solo en el ámbito indicado**; no se autoriza código ni producción de imágenes.

**Versión:** 0.2 · **Base:** 2026-11-06 · **Actualización vinculante:** 2026-11-08, decisiones DC-23–DC-27. FASE 1 piloto autorizada; FASE 2 y distribución pública sin autorización.
**Documento narrativo común a Dirección integral y al desarrollador único; las antiguas etiquetas R01–R16 son historia, no un circuito de trabajo.** Ruta canónica: `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md`.
**Repositorio:** `JavierRB35/El_Quijote_App`. No sustituye `docs/ENCARGO_MAESTRO.md`, `docs/VISION_Y_DECISIONES.md`, `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md`, `docs/CONTRATO_EDITORIAL_TECNICO.md`, `docs/ESPECIFICACION_FUNCIONAL.md` ni `docs/DIRECCION_ARTISTICA.md`; los complementa y solicita su reconciliación formal cuando corresponda.

## 0. Alcance, decisiones y compatibilidad

**Decisiones expresas del propietario para el modo narrativo, 2026-11-06:**
1. Aventura cinematográfica dramatizada, en 2.5D, con movimiento discreto y realismo pictórico; no película prerenderizada ni mundo 3D libre.
2. Narración B: adaptación fiel en castellano claro, citas originales verificadas cuando sostengan humor, voz, emoción o valor literario.
3. Narrador cervantino adaptado: conserva ironía, autoría ficticia, Cide Hamete y sus marcos cuando sean narrativamente pertinentes.
4. Relatos intercalados: tratamiento mixto según relevancia (dramatización, narración ilustrada o combinación); identificar quién relata, a quién y por qué.
5. Cinematografía con avance flexible: reproducción ordinaria automática, pausa, reanudación, retroceso, repetición y salto manual, con posición por perfil.
6. Adaptación integral selectiva: inventario exhaustivo de las dos partes (52 + 74 capítulos), representación de los acontecimientos significativos, humor y evolución de personajes; condensación motivada y trazada.
7. Antes de encargar nuevas imágenes: auditar las existentes por escena y función, incluida expresividad cómica, solemne, emotiva, paisajística y novelesca.
8. **Nueva decisión vinculante: TODA palabra hablada por narrador o personajes se muestra SIEMPRE como texto en pantalla.** Es requisito funcional y editorial, no una preferencia de subtítulos desactivable.

**Conciliación con DC-19:** el Modo Historia del proyecto está definido como **recorrido audiovisual condensado**, distinto de Aventura y del lector íntegro. «Integral selectiva» obliga a **inventariar íntegramente** los 126 capítulos y justificar toda condensación significativa; **no** obliga a recitar íntegramente todos los pasajes ni a filmar cada párrafo. No sustituir silenciosamente DC-19; si una escena planteada conduce a duración excesiva, elevar la decisión de síntesis al responsable editorial y registrar trazabilidad y alternativa de acceso al lector. Los hechos, el orden canónico, las causas, los desenlaces y las situaciones cómicas relevantes deben permanecer comprensibles. El Modo Histórico (DC-20) sigue separado.

**Límites:** este documento define criterios, no acredita por sí solo guiones, activos, licencias, pruebas ni código. La Fase 1 piloto y el vertical técnico de Historia han sido autorizados por el propietario; **un prototipo neutro no equivale a capítulo visualmente terminado** (DC-24–DC-26). Fase 2 y distribución siguen sin autorización.

## 1. Requisito transversal TS-001 (revisada por DC-37) — Texto completo disponible y visible por defecto

Para **cada intervención audible** (narrador, Don Quijote, Sancho, secundarios y voz narrativa dentro de relatos), el modo historia debe:
- Presentar **texto escrito visible, completo y asociado al hablante** en la misma secuencia, con su puntuación y atribución revisadas. **Ofrecer icono en la esquina superior derecha para ocultar/mostrar voluntariamente el pergamino**, deteniendo voz, temporizador y avance mientras está oculto y restaurando íntegro el texto. El audio es opcional; la escritura no.
- Sincronizar bloques de texto y audio a nivel de intervención/beat y, si es viable, de segmento; no exigir karaoke palabra a palabra. Mantener el texto hasta que pueda leerse, permitiendo pausar, repetir y retroceder; no truncar diálogos. El ritmo automático respetará lectura y preferencias de accesibilidad. No fijar tiempos universales sin pruebas.
- Permitir volumen cero, audio ausente o fallo de reproducción **sin perder una sola intervención**. Una escena debe poder completarse sin sonido ni red.
- Mostrar tipografía escalable, contraste, caja sobre área segura, navegación por teclado, foco claro, identificación no basada solo en color y alternativa al movimiento. Evitar cubrir rostros, pistas visuales, acciones y opciones. En pantallas reducidas ajustar composición y paginar el texto si fuera preciso, sin omitirlo.
- Guardar avance coherente por beat, conservar historial de intervenciones accesible y repetir la intervención escrita y su audio si está disponible. Saltar manualmente afecta al tiempo de reproducción, no elimina el acceso al texto esencial.
- Distinguir en metadatos `CITA_LITERAL`, `ADAPTACION_FIEL` y `NARRACION_ENLACE`; los rótulos explicativos o interpretaciones editoriales no se atribuyen a Cervantes. La etiqueta puede estar disponible en la ficha/lector sin estorbar a la escena.
- Incluir en QA matriz **voz activa + texto**, **mute + texto**, **sin archivo de audio + texto**, **pausa/repetición + texto**, **lectura ampliada + texto**, **sincronía/subtítulos**, **teclado**, **movimiento reducido** y **retroceso desde transición**.
- No confundir este requisito con texto alternativo de imágenes, que también es obligatorio cuando corresponda. Los subtítulos incluirán información significativa de sonido cuando sea necesaria para comprender la escena, sin inventar conversaciones.

**Bloqueo de salida:** intervención sin texto íntegro y recuperable, ocultación involuntaria, avance durante contemplación, texto cortado o audio obligatorio = defecto P0. Texto de voz y texto visible deben partir del **mismo registro editorial**, evitando versiones divergentes.

## 2. Cadena de producción y puertas de calidad

La división antigua de responsables queda **sustituida por DC-23**. Las especialidades de la antigua matriz son **criterios de competencia de Dirección**, no personas o aprobaciones que haya que esperar. Los hitos permanecen útiles para ordenar evidencia, sin convertir su revisión en un bucle documental.

| Hito | Resultado esperado | Responsable operativo | Aceptación |
|---|---|---|---|
| H0 — Fuentes, decisiones, derechos | Edición base, fuentes, usos declarados, riesgos | **Dirección integral** | Citas atribuibles y permisos no inventados |
| H1 — Inventario | 126 capítulos y relaciones con episodios, pasajes y personajes | **Dirección integral** | Catálogo trazable, sin exigir producción completa |
| H2 — Mapa narrativo | Secuencia condensada, arcos, transiciones, humor | **Dirección integral** | Fidelidad al canon y claridad |
| H3 — Guion | Texto, intervenciones, beats, criterios de plano | **Dirección integral**; desarrollador integra | TS-001, texto original verificado |
| H4 — Plan de arte | Escenas existentes primero, preguntas con imagen propia, acuarelas secundarias, huecos y prompts exactos | **Dirección integral**, director artístico bajo encargo del propietario | Cobertura y continuidad visual verificadas |
| H5 — Contrato/reproductor | Esquemas, escenas neutras, render, estados, guardado | **Desarrollador**, Dirección define/acepta | Pruebas ejecutadas y retrocompatibilidad |
| H6 — QA de vertical | Narración, imágenes, preguntas, derechos, accesibilidad, offline | **Desarrollador prueba; Dirección valida aceptación** | No confundir PASS técnico con arte publicable |
| H7 — Ampliación / lanzamiento | GO/NO-GO de fase o distribución | **Propietario**, informado por Dirección | Aprobación expresa; Fase 2 no autorizada |

**Proceso:** inspección del inventario en GitHub → decisión y especificación de Dirección → desarrollo y PR en GitHub → pruebas y aceptación por Dirección → encargo de imágenes puntuales si hay huecos → integración y aceptación visual. No se convocan R01–R16.

## 3. Organización operativa vigente — dos entidades y artista bajo encargo

### Dirección integral del proyecto (ChatGPT)

Asume y resuelve directamente las **competencias**, no las firmas ficticias, que históricamente se repartían entre R01–R16:

- **Literatura/filología:** cotejo con edición elegida, citas literales, secuencia canónica, narrador, fuentes, humor, adaptaciones y metadatos.
- **Guion y ritmo:** seleccionar los acontecimientos necesarios, controlar condensación, cambios de plano y continuidad, sin reducir el Modo Historia a texto estático.
- **Historia/patrimonio:** distinguir hecho de ficción, hipótesis geográfica, estilo recreado y evidencia histórica.
- **Preguntas y aprendizaje:** que cada pregunta sea verificable, distinta, sin spoilers, de respuesta seleccionada y **con imagen específica propia** antes de aceptar su acabado visual.
- **Curaduría y arte:** usar **primero `assets/scenes/`**, luego acuarelas solo como apoyo secundario de juego; registrar las acuarelas en sección artística propia. Decidir cuándo falta arte e indicar prompt exacto.
- **Derechos:** verificar declaraciones, licencias y riesgo; sin atribuirse certificación legal profesional cuando no exista. Bloquear la distribución si falta clearance.
- **UX, accesibilidad, contrato y QA:** especificación de estados, TS-001, rendimiento esperado, criterios medibles y evaluación de resultados; el desarrollador ejecuta y evidencia las pruebas.
- **Dirección de producto:** prioridades, resolución de incidencias, aceptación/rechazo de PR y cierre de decisiones sin abrir rondas entre especialistas.

### Desarrollador único

Es el **único destinatario de encargos de desarrollo**: código, datos canónicos, versionado de esquemas, importadores, pruebas, accesibilidad, reproducción audiovisual, catálogo, persistencia, CI e integración.

**En cada prompt: GitHub `https://github.com/JavierRB35/El_Quijote_App` como ÚNICA fuente de verdad del origen y destino del desarrollo.** Comprobar `main` y SHA, trabajar en rama, PR y pruebas; nunca dejar trabajo únicamente local. Las decisiones editoriales las firma Dirección, no antiguos responsables Rxx.

### Director artístico — tercera intervención limitada

Solo a través del propietario, cuando **Dirección** certifique huecos de arte y entregue un prompt **exacto** por imagen. El artista no redefine guion ni contrato y no sustituye al desarrollador: este recibe los activos aprobados y los integra en GitHub con metadatos/hashes/permisos.

### Propietario

Retiene decisiones de negocio, autorización de nuevas fases, distribución y comercialización. Los informes antiguos R01–R16 se conservan como evidencia de procedencia, no como mandatos operativos.

## 4. Plantilla mínima de unidad, episodio, escena y beat

**Unidad de fuente:** `unit_id`, `edition_id`, `part`, `chapter_ids[]`, `passage_ids[]`, `order`, `literary_kind`, `actors[]`, `facts`, `humor_mechanism?`, `emotional_tone[]`, `narrative_weight`, `proposed_treatment`, `condensation_reason?`, `source_review_state`.

**Episodio:** `episode_id` existente, `chapter_ids[]`, `narrative_order`, `unit_ids[]`, `prior_episode_id?`, `next_episode_id?`, `spoiler_policy`, `character_arcs[]`, `continuity_notes`, `review_state`.

**Escena:** `scene_id`, `episode_id`, `unit_ids[]`, `setting`, `story_intent`, `tone[]`, `scene_phase`, `beat_ids[]`, `media_ids[]`, `audio_cues[]`, `question_links[]`, `discoveries[]`, `transition`, `source_refs[]`, `review_state`.

**Beat/intervención (propuesta semántica a convertir en JSON Schema por ambos equipos; NO afirmar que ya es contrato aprobado):**
```json
{
  "beat_id": "EJEMPLO_NO_PUBLICABLE",
  "scene_id": "EJEMPLO_NO_PUBLICABLE",
  "order": 1,
  "kind": "NARRACION|DIALOGO|ACCION|SILENCIO",
  "utterances": [
    {
      "utterance_id": "EJEMPLO_NO_PUBLICABLE",
      "speaker_id": "PERSONAJE_O_NARRADOR",
      "visible_text": "Texto ilustrativo que debe verse aunque no haya audio.",
      "text_kind": "CITA_LITERAL|ADAPTACION_FIEL|NARRACION_ENLACE",
      "passage_ids": ["ID_DE_PASAJE_VALIDO"],
      "audio_asset_id": null
    }
  ],
  "visual_asset_ids": [],
  "manual_advance_allowed": true,
  "replay_allowed": true,
  "reduced_motion_fallback": true,
  "entry_condition": "SECUENCIA_CANONICA",
  "exit_condition": "FIN_DE_BEAT_O_AVANCE_MANUAL"
}
```
Ejemplo **sintético**, no cita de Cervantes, no ID real y no esquema validado. Para beats de acción sin voz se requiere descripción audiovisual/alternativa accesible cuando proceda, pero no inventar voz artificial. La duración es estimable mediante piloto; puede expresarse por rangos revisados, no segundo fijo arbitrario.

**Regla de trazabilidad:** unidad original → episodio → escena → beat → intervención y asset → licencia → prueba. Un elemento rechazado o condensado sigue en el inventario de fuente con motivo y tratamiento alternativo; ningún ID se reutiliza tras retirada.

## 5. Matriz audiovisual, encargos y criterios de expresión

Por cada plano o beat: `scene_id`, `beat_id`, objetivo expresivo (humor/solemnidad/drama/novela/paisaje), momento exacto antes/después de revelación, perspectiva, personaje/gesto, imagen existente, enlace a manifiesto, resultado de revisión, licencia, áreas seguras de texto, alt, movimiento, necesidades de voz/FX y responsable.
**Jerarquía:** (1) evaluar imágenes existentes legalmente utilizables, (2) combinación de planos/efectos/audio si expresa la escena, (3) encargar recreación nueva con brief comprobable, (4) mantener necesidad pendiente; nunca eliminar escena significativa por carecer de imagen. No exigir imagen nueva cuando el texto y ambiente comuniquen mejor la situación.
**Humor:** documentar preparación → mecanismo → reacción/consecuencia cuando aplique; no convertir un chiste en una nota explicativa ni imponer comicidad donde el texto tiene dolor o ambivalencia.
**Clasificación de media:** reproducir clases y estados reales del contrato, no importar IDs o cantidades del inventario histórico sin verificar en `main`.

## 6. Revisión y criterios verificables

**Puertas por escena:** INVENTARIADA → DOCUMENTADA → GUIONIZADA → REVISADA_CERVANTISTA → PLANIFICADA_AV → CONTRATO_COMPLETO → APTA_PARA_INTEGRAR (solo tras recursos/licencias y contrato aprobados) → VALIDADA_EN_EJECUCION (solo después de pruebas reales). Estados semánticos propuestos; no sobrescribir enumeraciones existentes sin migración.
**Control editorial:** secuencia, personajes, quién cuenta, citas cotejadas, ironía, mecanismo humorístico, sesgo de interpretación, condensación, relatos intercalados y arco. **Control visual:** fuente/licencia, plano adecuado, spoiler, continuidad y áreas seguras. **Control UX:** TS-001 y avance flexible. **Control técnico:** IDs, esquemas, referencias, guardado, offline, fallbacks. **Control QA:** prueba reproducible y sin P0.
**Métricas objetivas:** 126/126 capítulos inventariados; 100 % de citas declaradas literales cotejadas; 100 % de unidades significativas con tratamiento y referencia; 100 % de escenas cómicas registradas en inventario con decisión expresa; 100 % de intervenciones habladas con texto visible y hablante; 100 % de imágenes utilizadas con estado de licencia; 0 IDs huérfanos en paquetes aprobados. No prometer número de imágenes, escenas, horas o palabras antes del piloto.
**Piloto:** seleccionar los seis capítulos representativos ya previstos por el plan editorial; medir comprensibilidad, emoción y humor, legibilidad del texto permanente, material audiovisual reutilizado, huecos, duración, costes de validación, accesibilidad. Extrapolar por categorías ponderadas, no multiplicar seis por 126.

## 7. Formato único de encargo al desarrollador

No existe convocatoria de especialistas R01–R16. Cada especificación de Dirección al **desarrollador único** incluye:

1. **Fuente y destino únicos:** `https://github.com/JavierRB35/El_Quijote_App`, `main` remoto y SHA verificado; ignorar cualquier copia local no sincronizada.
2. Funcionalidad concreta que debe quedar **ejecutable** al terminar y su relación con decisiones DC-23–DC-27.
3. Evidencias literarias y requisitos visuales: **imagen exclusiva por pregunta, escenas primero y acuarelas secundarias**; uso de neutro únicamente como prototipo o fallback seguro.
4. Rutas esperadas, integridad de IDs, esquema/versión, compatibilidad, permisos y ausencia de spoilers.
5. Pruebas de aceptación reales; qué no pudo ejecutarse; no confundir documentación con funcionalidad.
6. Entrega a **GitHub** mediante rama/PR, SHA inicial/final, diff controlado, CI y notas de integración. Dirección decide la aceptación.

Para imágenes nuevas, el encargo lo prepara Dirección como **prompt visual completo** y se canaliza por el propietario al director artístico; no se piden automáticamente al desarrollador creaciones de arte.

## 8. Armonización y prioridades vigentes

1. **DC-23–DC-27 vigentes desde 2026-11-08**, registradas en `docs/VISION_Y_DECISIONES.md` y desarrolladas en `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md`. Sustituyen equipos/firmas R01–R16 y la aceptación de preguntas sin imagen propia.
2. El vertical técnico de molinos puede usar fondo neutro mientras se construye, pero **no está visualmente terminado** hasta contar con suficientes escenas y cubrir cada pregunta con imagen específica y segura.
3. El desarrollador adapta contratos, consumidor y pruebas en GitHub bajo decisiones de Dirección; no necesita recabar una doble firma de equipos separados, pero debe documentar compatibilidad y evidencia.
4. El inventario de escenas, primeros planos, acuarelas y preguntas se contrasta **antes** de solicitar nuevas imágenes. Las acuarelas tienen sección artística propia.
5. Se preservan los registros antiguos como evidencias históricas; no reactivar automáticamente sus circuitos de aprobación. No autorizar Fase 2, publicación ni redistribución sin decisión específica del propietario.

## 9. Definición de terminado y de aceptación de producto

**Documentación:** decisiones integradas en `main` vía PR, con trazabilidad, sin asumir que una propuesta sea funcionalidad terminada. **Vertical técnico:** reproductor utilizable, validadores y pruebas reales, con texto TS-001 completo, visible por defecto y recuperable, y fallback neutro técnico sin aceptación visual final según DC-37. **Capítulo terminado visualmente:** ritmo cinematográfico, escenas y primeros planos suficientes, **una imagen propia válida para cada pregunta**, licencias/comprobaciones de spoilers y accesibilidad. Dirección acepta la PR; el propietario conserva la autorización de Fase 2 y publicación. Una PR abierta **no equivale** a `main`.

