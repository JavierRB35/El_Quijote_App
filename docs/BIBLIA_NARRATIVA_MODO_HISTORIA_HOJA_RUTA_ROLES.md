# EL QUIJOTE — Biblia narrativa y hoja de ruta por profesionales del Modo Historia

**Versión:** propuesta 0.1 · **Fecha:** 2026-11-06 · **Modo:** COORDINACIÓN/AUDITORÍA · **Estado:** documentación propuesta para revisión editorial, artística, UX y técnica; no autoriza implementación ni producción masiva.
**Documento común y único para todos los roles.** Ruta canónica: `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md`.
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

**Límites:** este documento es una hoja de ruta, no un guion de producción validado, catálogo auditado ni esquema aprobado. No afirmar que recursos, pasajes, derechos o QA están aprobados sin evidencia. La Fase 1 piloto está autorizada en la documentación actual del repositorio (DC-18), **pero esta solicitud no autoriza comenzar a implementarlo**; la producción completa de Fase 2 sigue pendiente de autorización.

## 1. Requisito transversal TS-001 — Texto siempre en pantalla

Para **cada intervención audible** (narrador, Don Quijote, Sancho, secundarios y voz narrativa dentro de relatos), el modo historia debe:
- Presentar **texto escrito visible, completo y asociado al hablante** en la misma secuencia, con su puntuación y atribución revisadas. No ofrecer interruptor para ocultar el texto de intervenciones habladas. El audio es opcional; la escritura no.
- Sincronizar bloques de texto y audio a nivel de intervención/beat y, si es viable, de segmento; no exigir karaoke palabra a palabra. Mantener el texto hasta que pueda leerse, permitiendo pausar, repetir y retroceder; no truncar diálogos. El ritmo automático respetará lectura y preferencias de accesibilidad. No fijar tiempos universales sin pruebas.
- Permitir volumen cero, audio ausente o fallo de reproducción **sin perder una sola intervención**. Una escena debe poder completarse sin sonido ni red.
- Mostrar tipografía escalable, contraste, caja sobre área segura, navegación por teclado, foco claro, identificación no basada solo en color y alternativa al movimiento. Evitar cubrir rostros, pistas visuales, acciones y opciones. En pantallas reducidas ajustar composición y paginar el texto si fuera preciso, sin omitirlo.
- Guardar avance coherente por beat, conservar historial de intervenciones accesible y repetir la intervención escrita y su audio si está disponible. Saltar manualmente afecta al tiempo de reproducción, no elimina el acceso al texto esencial.
- Distinguir en metadatos `CITA_LITERAL`, `ADAPTACION_FIEL` y `NARRACION_ENLACE`; los rótulos explicativos o interpretaciones editoriales no se atribuyen a Cervantes. La etiqueta puede estar disponible en la ficha/lector sin estorbar a la escena.
- Incluir en QA matriz **voz activa + texto**, **mute + texto**, **sin archivo de audio + texto**, **pausa/repetición + texto**, **lectura ampliada + texto**, **sincronía/subtítulos**, **teclado**, **movimiento reducido** y **retroceso desde transición**.
- No confundir este requisito con texto alternativo de imágenes, que también es obligatorio cuando corresponda. Los subtítulos incluirán información significativa de sonido cuando sea necesaria para comprender la escena, sin inventar conversaciones.

**Bloqueo de salida:** intervención con audio pero sin texto visible, texto ocultable, texto cortado o audio obligatorio = defecto P0. Texto de voz y texto visible deben partir del **mismo registro editorial**, evitando versiones divergentes.

## 2. Cadena de producción y puertas de calidad

| Hito | Resultado documental | Responsable principal | Dependencia / aceptación |
|---|---|---|---|
| H0 — Fuentes y decisiones | Edición base, registro de acuerdos, restricciones legales y criterios de cita | Director editorial + documentación | No adjudicar citas literales sin pasaje/edición exactos |
| H1 — Inventario exhaustivo | 126 capítulos desglosados en unidades: hechos, humor, personajes, diálogos, relatos, discursos, lugares, narradores | Filólogo + documentalista | 126/126 revisados; fuente y orden por unidad |
| H2 — Mapa narrativo | Episodios multicapítulo, transiciones, arcos de personajes, cobertura y condensaciones justificadas | Director narrativo + cervantista | No pérdida de hitos ni de humor significativo; compatibilidad DC-19 |
| H3 — Guion dramatizado | Guion continuo y fichas de escena/beat, narrador, diálogos y texto en pantalla | Guionista audiovisual | Distingue literal, adaptación y enlace; TS-001 |
| H4 — Dossier artístico | Matriz escena→plano→asset existente→idoneidad→encargo pendiente→licencia | Curador + dirección artística + derechos | No inventar imágenes aprobadas ni su disponibilidad |
| H5 — Contrato de reproducción | Estructura semántica e interacciones/tiempos/alt/audio/texto/guardado; propuesta de cambios de esquema | Arquitecto + frontend + editorial | Revisión conjunta; no codificar contenido en UI |
| H6 — Auditoría cruzada piloto | Seis capítulos representativos; criterios narrativos, visuales, legibilidad y viabilidad | QA + coordinación | Evidencia y defectos; estimación ponderada, no extrapolación simple |
| H7 — GO/NO-GO | Acta de aprobaciones, pendientes y alcance validado | Propietario + coordinación | Sin aprobación, no escalar a producción completa |

**Secuencia lógica:** H0→H1→H2→H3; H4 puede comenzar inventario de assets en paralelo, pero el juicio de idoneidad exige escenas definidas; H5 se diseña junto a H2–H4; H6 exige muestras coherentes de todos ellos. Las revisiones se registran con versión, evidencia, responsable y fecha. Evitar crear varios inventarios incompatibles.

## 3. Hoja de ruta por profesional y entregables

### R01 — Dirección editorial / director cervantista (MODO CONTENIDOS)
**Responsabilidad final:** autoridad sobre fidelidad, estructura de la obra, grado de condensación, voces de Cervantes y autorización editorial.
**Trabajo:** elegir/verificar edición de referencia y variantes; definir rúbrica de relevancia narrativa; aprobar catálogo de unidades y prioridades; conservar sentido, comicidad, marcos narrativos, arcos y desenlaces; firmar condensaciones; coordinar estudios académicos cuando una interpretación no sea textual.
**Entrega:** acta de edición; criterios de adaptación; matriz de decisiones de condensación; revisión firmada de episodios y guiones; lista de dudas filológicas.
**Recibe de:** filólogo, guionista, historiador, QA. **Entrega a:** guionista, arte, desarrollo, coordinación.
**Aceptación:** no hay citas sin edición/pasaje; no se cambian hechos; ninguna escena cómica relevante desaparece sin justificación; toda decisión editorial auditada.

### R02 — Filólogo cervantino / documentalista textual (CONTENIDOS)
**Trabajo:** desglose íntegro parte/capítulo/pasaje; identificar locutor/destinatario/autorías ficcionales; localizar bromas, equívocos, ironías, refranes, lenguaje y evolución; marcar ficción dentro de ficción; cotejar exactitud de citas y traducción ortográfica.
**Entrega:** matriz `unidad_narrativa` con IDs estables propuestos, pasajes, tipo, orden, evidencia, relevancia y spoilers; registro de citas originales y sus variantes.
**Aceptación:** 126 capítulos auditados con evidencia de cobertura; enlaces y atribuciones verificables; cada omisión potencial trazada a condensación aprobada.

### R03 — Guionista audiovisual / director narrativo (CONTENIDOS + ARTE)
**Trabajo:** construir guion continuo y beats reproducibles; redactar narrador cervantino adaptado; conservar diálogos originales expresivos y adaptar otros sin falsificar citas; elegir tratamiento de relatos intercalados; describir preparación, mecanismo y reacción del humor; señalar intención emotiva y ritmo.
**Entrega:** guion de episodios y fichas por escena/beat (texto visible exacto de cada intervención, hablante, versión, acción, entrada/salida, tono, continuidad, pregunta opcional, transición).
**Aceptación:** lectura autónoma sin preguntas; se entiende trama y evolución; cada intervención oral tiene texto visible íntegro (TS-001); condensaciones enlazadas a pasajes.

### R04 — Historiador del Siglo de Oro / asesor de cultura material (CONTENIDOS)
**Trabajo:** verificar entorno, armas, indumentaria, oficios, escenarios y vida cotidiana; separar ficción y documentación histórica; revisar anacronismos y escenas de relato insertado.
**Entrega:** notas históricas vinculadas a escena, fuentes, grados de evidencia y checklist de anacronismos.
**Aceptación:** no se presentan reconstrucciones como prueba; dudas históricas expresamente marcadas.

### R05 — Curador iconográfico / documentalista patrimonial (CONTENIDOS)
**Trabajo:** inventariar imágenes ya disponibles (incluidas ilustraciones extraídas y recreaciones) con evidencia real del árbol y manifiestos; relacionarlas con episodio/pasaje/plano; evaluar encuadre, función, spoiler, tamaño, licencia y estado.
**Entrega:** matriz `escena–plano–asset` de cobertura: APTA / APTA_CON_APOYO / SUSTITUIR / CREAR / NO_REQUIERE_IMAGEN; procedencia y derechos de cada archivo.
**Aceptación:** no confundir número de archivos con cobertura de escenas ni copiar resultados de auditorías históricas sin revalidación; ninguna imagen inexistente o jurídicamente pendiente se marca aprobada.

### R06 — Director artístico / supervisor de recreaciones (ARTE + CONTENIDOS)
**Trabajo:** biblia de continuidad (fisonomía, edad aparente, vestuario, monturas, decorados, luz y tono); planificar puntos de vista y áreas seguras para texto permanente; auditar humor/solemnidad/novela/paisaje; elaborar encargos solo para huecos reales; revisar recreaciones.
**Entrega:** storyboard textual por beat, brief por imagen pendiente (pasaje, instante, cámara, gesto, personajes, texto que debe caber, restricciones, negative prompts si procede), checklist de continuidad.
**Aceptación:** coherencia canónica y expresiva, sin anacronismos flagrantes; el texto persistente no tapa el foco visual; recursos IA identificados.

### R07 — Dirección de audio / intérpretes y edición de voz (CONTENIDOS + AUDIO)
**Trabajo:** plan de voces del narrador y personajes, dicción, intención dramática, pausas cómicas, sonido, música y silencios; versiones de guion para grabación; segmentación por beat; sincronización con texto escrito, sin divergencia.
**Entrega:** cue sheet por intervención (`utterance_id`, `speaker_id`, `visible_text`, guion de voz, temporalidad sugerida, archivo lógico pendiente, subtítulos de efectos); plan de licencias.
**Aceptación:** cada voz tiene texto visible sincronizable, sin alterar citas; narrativa comprensible en mute; ningún audio necesario para avanzar.

### R08 — Responsable UX/UI y accesibilidad (DESARROLLO + DISEÑO)
**Trabajo:** sistema de texto siempre visible; tamaños, contraste, tipografías, áreas seguras por imagen; políticas de avance automático según legibilidad, pausa/repetición, historial, mando/teclado y movimiento reducido; pruebas con público real, incluidas personas mayores.
**Entrega:** especificación de componentes narrativos y estados (hablante, panel de texto, audio mudo, progreso, controles), wireframes anotados y matriz de pruebas de accesibilidad.
**Aceptación:** TS-001 observable en todos los estados; nunca requiere oír; no se corta texto; no se ocultan opciones, rostros o gestos decisivos.

### R09 — Arquitecto técnico / responsable de contrato de datos (DESARROLLO)
**Trabajo:** revisar contrato existente `Scene/Episode/MediaAsset/Passage`; proponer entidades de beat/intervención y versionado, eventos, estado de reproducción, anclajes y migraciones; detectar si el catálogo o recursos no soportan TS-001. Registrar ADR si exige modificar esquemas.
**Entrega:** propuesta de esquema y casos válidos/inválidos, mapa de dependencias, estrategia offline, guardado por perfil y reglas de compatibilidad.
**Aceptación:** no asumir que el esquema propuesto ya existe; cambios conjuntos editorial-técnico aprobados antes de código; nada hardcodeado.

### R10 — Ingeniero frontend de escenas 2.5D (DESARROLLO)
**Trabajo posterior a autorización de ejecución:** diseñar reproductor genérico de beats y capas, texto visible obligatorio, controles, transición y subtítulos/audio vinculados; fallback sin imágenes/voz, sin red y con movimiento reducido.
**Entrega ahora (solo documentación):** contrato de consumidor, tabla de eventos/estados y criterios de rendimiento/legibilidad. **No implementar en este encargo.**
**Aceptación futura:** escenas cambiables mediante datos, sin código específico por capítulo; avance y mute coherentes.

### R11 — Ingeniería de datos y pipeline editorial (DESARROLLO)
**Trabajo ahora:** diseñar validadores para IDs, fuente/pasaje, referencias cruzadas, `visible_text` obligatorio, `speaker_id`, `text_kind`, orden, duración/segmentación, spoiler, licencias y estado; proponer exportación reproducible única del guion hacia datos.
**Entrega:** especificación de validadores, compatibilidad con SQLite/catálogo, catálogo de errores P0/P1.
**Aceptación:** un audio sin texto visible y referencia rota se rechazan; no mantener guion literario y JSON como verdades divergentes.

### R12 — Ingeniería de QA, accesibilidad y pruebas (DESARROLLO + COORDINACIÓN)
**Trabajo:** diseñar matriz de cobertura 126/126, auditoría de humor, continuidad narrativa, verificación de original/adaptación, visuales y legalidad; pruebas narrativas y de TS-001; piloto de seis capítulos con perfiles diversos, casos sin audio y movimiento reducido.
**Entrega:** plan de prueba, checklist, evidencias, incidencias con severidad y matriz requisito→prueba.
**Aceptación:** 100 % de intervenciones habladas con texto en pantalla en el catálogo aprobado; capítulos inventariados 126/126; ningún P0 abierto en paquete declarado apto.

### R13 — Responsable de derechos/licencias (CONTENIDOS + LEGAL)
**Trabajo:** verificar cada edición, ilustración, fotografía, recreación, voz, efectos, música y permisos de repositorio/empaquetado; separar uso personal de redistribución y verificar procedencia por derivado.
**Entrega:** manifiesto de licencias, restricciones de uso y bloqueos por asset.
**Aceptación:** licencia desconocida no equivale a autorizada; nunca incluir medios inseguros en entregables.

### R14 — Coordinación / auditoría / dirección de producto
**Trabajo:** mantener esta hoja de ruta y registro de decisiones; verificar coherencia con DC-19, DC-20 y documentos actuales; resolver dependencias y colisiones de IDs; arbitrar alcance y estados; controlar PR y revisiones entre equipos; elevar únicamente bloqueos reales al propietario.
**Entrega:** matriz requisito→rol→fichero→prueba, tablero de hitos H0–H7, acta GO/NO-GO, resumen de qué se aprobó y quién lo revisó.
**Aceptación:** cada paquete narrativo incluye trazabilidad, pruebas y los visados necesarios; no certificar revisiones humanas inexistentes.

### R15 — Especialista de preguntas y descubrimientos (CONTENIDOS)
**Trabajo:** vincular preguntas de **respuesta exclusivamente seleccionada** y descubrimientos opcionales a beats seguros sin spoilers; mantener fluidez del Modo Historia y distinguirlo de Aventura; conservar citas y explicaciones verificadas.
**Entrega:** matriz de enlaces beat↔pregunta/descubrimiento/pasaje/atlas/museo/cuaderno.
**Aceptación:** sin respuestas escritas, bloqueos narrativos ni revelación de desenlaces antes de tiempo. La ausencia de preguntas no rompe ninguna escena.

### R16 — GIS / museo / patrimonio (CONTENIDOS + DESARROLLO, enlace transversal)
**Trabajo:** verificar lugares y rutas hipotéticas, asociar contexto patrimonial y fichas sin confundir ficción con hechos; enlaces opcionales desde escenas, funcionales offline y sin bloquear secuencias.
**Entrega:** tabla escena↔lugar/ruta/museo/fuente y etiqueta de certeza.
**Aceptación:** no asumir exactitud geográfica no demostrada; atlas y museo siguen abiertos desde el inicio.

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

## 7. Referencia común y textos de encargo listos para copiar

Todos los especialistas deben leer la **misma ruta** del repositorio, en su rama vigente y preferiblemente una vez incorporada a `main`, además de `AGENTS.md`, `docs/ENCARGO_MAESTRO.md` y `docs/VISION_Y_DECISIONES.md`. **La sección Rxx es el punto de entrada de cada profesional, no un documento diferente.** Enlace canónico tras aprobación: `https://github.com/JavierRB35/El_Quijote_App/blob/main/docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md`.

**Plantilla universal:**
> Actúa en **MODO [CONTENIDOS / DESARROLLO / COORDINACIÓN-AUDITORÍA]**, como **[nombre del rol Rxx]**. Lee íntegramente `AGENTS.md`, `docs/ENCARGO_MAESTRO.md`, `docs/VISION_Y_DECISIONES.md` y `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md`, especialmente **§3 Rxx**, **§1 TS-001**, **§2 hitos**, **§4 contrato** y **§6 aceptación**. Contrasta el estado real del repositorio y los documentos conexos; no des por implementado lo documentado. Tu entregable es **[nombre]**, con fuentes, IDs, evidencias, dependencias y aprobación pendiente. En este encargo, **solo documentación, sin implementar ni producir recursos**. No modifiques esquemas compartidos unilateralmente.

**Referencias breves por perfil:**
- Director editorial: **R01**, H0/H2/H3.
- Filólogo: **R02**, H1.
- Guionista/director narrativo: **R03**, H2/H3.
- Historiador: **R04**, H1/H4.
- Curador iconográfico: **R05**, H4.
- Director artístico: **R06**, H4.
- Dirección audio/intérpretes: **R07**, H3/H4; siempre TS-001.
- UX/accesibilidad: **R08**, H5; siempre TS-001.
- Arquitecto/contratos: **R09**, H5.
- Frontend 2.5D: **R10**, H5; siempre TS-001.
- Datos/validación: **R11**, H5.
- QA: **R12**, H6; siempre TS-001.
- Licencias: **R13**, H0/H4.
- Coordinación/auditoría: **R14**, H0–H7.
- Preguntas/descubrimientos: **R15**, H3/H5.
- GIS/museo: **R16**, H4/H5.

**Orden recomendado de convocatoria documental:** R14/R01/R02/R13 al inicio; R03/R04 con primer inventario; R05/R06/R07 con guiones; R08/R09/R10/R11 antes de formalizar contratos; R12 transversal y antes del piloto; R15/R16 para enriquecimiento vinculado. Roles pueden agruparse en un agente, pero no atribuir revisiones humanas no realizadas.

## 8. Incidencias y cambios pendientes de armonización

1. Registrar estas decisiones nuevas en `docs/VISION_Y_DECISIONES.md` con IDs nuevos **sin reutilizar ni alterar** DC existentes; revisar posibles solapamientos con DC-19.
2. Revisar `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md` para expresar la adaptación integral selectiva como *inventario completo + guion cinematográfico condensado y trazable*; conservar Modo Histórico.
3. Revisar `docs/ESPECIFICACION_FUNCIONAL.md`, `docs/UX_ACCESIBILIDAD.md` y `docs/DIRECCION_ARTISTICA.md`: TS-001 debe prevalecer para Modo Historia frente a cualquier control de «ocultar subtítulos». Aclarar si afecta a otros modos mediante decisión específica, no asumir ampliación automática.
4. Proponer, con revisión editorial y técnica, extensiones a `docs/CONTRATO_EDITORIAL_TECNICO.md` y schemas para beats, texto visible y audio opcional. **No editar esquemas en solitario**.
5. Actualizar matriz de trazabilidad y QA después de acordar contrato; inspeccionar activos y edición real para no basarse solo en auditorías anteriores.
6. Conservar historial, cambios ajenos y gobernanza Git. Fase de documentación en rama/PR para revisión cuando el flujo actual de Fase 1 lo exige. No fusionar a `main` sin revisión/autorización.

## 9. Definición de terminado para esta hoja de ruta (solo documentación)

Se considera completa como propuesta cuando: todos los roles conocen responsabilidades, entregables y dependencias; requisitos de guion/humor/texto permanente/ritmo están explícitos; hitos y criterios de aceptación son medibles; no se ha creado código o paquete audiovisual; y existe una ruta común única para su referencia. **Su aprobación final** requiere revisión de contenidos, desarrollo, UX y coordinación. Una PR abierta **no equivale** a documento incorporado a `main`.

