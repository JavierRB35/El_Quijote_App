# ESPECIFICACIÓN FUNCIONAL — FASE 0

**Estado:** COMPLETA (v1.0, borrador para GO/NO-GO) — entregable FASE 0 (encargo §8); los requisitos se citan como `EF-<subsistema>-<nn>` y son **verificables** (prueba de aceptación incluida o referida al plan de QA).
**Modo responsable:** DESARROLLO, con validación de COORDINACIÓN.
**Fuente normativa:** encargo §3, §5.4, §7.2; decisiones cerradas DC-01…DC-17 (`VISION_Y_DECISIONES.md`); contrato editorial-técnico v0.2.0 (firmado por ambos lados).
**Última actualización:** 2026-11-06 (ampliación modos Historia e Histórico; resto de la especificación conserva su estado previo).

Convenciones: los datos editoriales provienen SIEMPRE del catálogo versionado (contrato), nunca de componentes con textos incrustados (encargo §5.3, §9 criterio de excelencia). «Piloto I.8» = `content/piloto/package.json` (12 preguntas reales, 21 medios, VÁLIDO).

---

## EF-INI — Pantalla de inicio

**Propósito:** entrada simple e inmersiva; nada administrativo delante.

- `EF-INI-01` Ofrecer: continuar, nueva partida, aventura aleatoria opcional, **Modo Historia**, **Modo Histórico**, atlas, museo, cuaderno, lector, perfiles, ajustes (§5.4 y DC-19/DC-20).
- `EF-INI-02` El tutorial es breve, **cancelable y recuperable**; su estado vive por perfil.
- `EF-INI-03` En primera partida, la introducción es breve y opcional (DC-05).
- `EF-INI-04` La pantalla de inicio no muestra avisos de actualización ni paneles de telemetría; lo relativo a red vive en ajustes.
- **Prueba:** recorrer inicio con teclado solo, sin puntero (QA §7.4, perfil «usuario de teclado»).

## EF-AV — Aventura (controlador narrativo)

**Propósito:** recorrer los episodios en orden canónico (DC-01) con etapas: situación previa → interacción opcional → pregunta → respuesta amable → desenlace → descubrimiento opcional → continuación (§3).

- `EF-AV-01` La secuencia canónica se lee del catálogo (`Episode.narrative_order`); la app no codifica el orden.
- `EF-AV-02` Cada escena se compone desde `Scene` (fases before/question/reveal/after, capas, hotspots); sin imagen, la fase muestra el fallback de accesibilidad (nunca un hueco).
- `EF-AV-03` Los puntos interactivos son SIEMPRE opcionales y accesibles por teclado (contrato `hotspots[]`); ignorarlos no bloquea nada.
- `EF-AV-04` Las preguntas se presentan en momentos significativos con ritmo adaptativo (EF-SEL); su frecuencia es ajustable por perfil.
- `EF-AV-05` Fallo una pregunta: explicación siempre visible, sin bloqueo narrativo, con nuevo intento o continuación (DC-05, §3.4).
- `EF-AV-06` Aventuras aleatorias: solo episodios compatibles con el conocimiento del jugador o con aviso explícito de spoilers (`Episode.spoiler_flags`, `Question.spoiler_policy`) (§3).
- `EF-AV-07` Nada reescribe el desenlace canónico; no existen decisiones contrafactuales en el hilo (§3).
- `EF-AV-08` Autoguardado transparente en transiciones y al salir; un cierre imprevisto recupera la partida sin corrupción (§7.3).
- **Prueba:** jugar el piloto I.8 end-to-end offline (instalador, VM limpia) — criterio de salida de FASE 1.

## EF-PRE — Preguntas

**Propósito:** presentar preguntas del catálogo con interacción determinada por descriptor; **exclusivamente respuesta seleccionada** (DC-04).

- `EF-PRE-01` Los 6 tipos (`single_choice`, `multi_choice`, `true_false`, `ordering`, `matching`, `hotspot`) se renderizan desde `interaction`; NO existe ningún campo de texto libre (prohibición §2.2).
- `EF-PRE-02` `multi_choice` muestra el aviso de «puede haber varias correctas» solo con `multi_declared: true`; el juego no lo añade por su cuenta.
- `EF-PRE-03` La corrección es local y determinista desde `correct_option_ids`/`correct_order`/`pairs`/`hotspot_area`; la aleatorización del orden visual (`shuffle_options`) nunca altera la identidad de la respuesta.
- `EF-PRE-04` Toda pregunta muestra tras responder `rationale` (breve) y, si existe, `rationale_extended`, con enlace a pasaje/cita (§4.3.8).
- `EF-PRE-05` La imagen previa de una pregunta (`visual_requirements.pre_image_media_id`) nunca revela la respuesta: garantizado por contrato (`spoiler_level: ninguno`) y verificable en pantalla (§7.2).
- `EF-PRE-06` La interacción se completa sin puntería precisa; todo control responde a teclado (§3, §7.2).
- **Prueba:** los 6 tipos del piloto I.8 en pantalla; casos negativos del contrato como pruebas de UI (respuesta imposible de escribir).

## EF-SEL — Selector adaptativo

**Propósito:** elegir qué pregunta mostrar; algoritmo local determinista y documentado, sin LLM (§5.4).

- `EF-SEL-01` Entradas: historial del perfil (vistas/acertadas/falladas), intervalo de repaso, episodio actual, afinidades temáticas, preferencia de frecuencia.
- `EF-SEL-02` Garantías: sin repetición exacta en la misma sesión; sin spoilers (`spoiler_policy` respeta lo jugado); preguntas agotadas no rompen el flujo (continúa sin pregunta).
- `EF-SEL-03` El repaso inteligente prioriza fallos recientes con espaciado creciente; desactivable por perfil.
- `EF-SEL-04` Sin presión temporal por defecto; la dificultad ajusta complejidad conceptual, nunca bloquea (DC-05).
- `EF-SEL-05` El algoritmo y sus parámetros están documentados y son reproducibles (misma entrada → misma salida dado el mismo historial).
- **Prueba:** simulación con historiales sintéticos + verificación de no-spoiler sobre el piloto.

## EF-LEC — Lector

**Propósito:** las dos partes completas (126 capítulos, DC-06), lectura continua, búsqueda, marcadores, anotaciones, tipografía ajustable, conservación de posición y enlaces bidireccionales.

- `EF-LEC-01` Navegación por parte/capítulo y lectura continua; la posición se conserva al salir y volver.
- `EF-LEC-02` Búsqueda sobre la capa `text_indexable` (FTS5, ADR-0002) con resultados que llevan al pasaje; el texto mostrado es siempre el `text_original` de la edición (nunca el normalizado).
- `EF-LEC-03` Marcadores y anotaciones por perfil, vinculados a `Passage.id` (estables ante correcciones ortográficas, §6.1).
- `EF-LEC-04` Tamaño de letra, interlineado y ancho de medida ajustables; persisten por perfil.
- `EF-LEC-05` Enlace bidireccional: pregunta/cita/museo → pasaje; pasaje → episodios/preguntas que lo citan.
- `EF-LEC-06` Las ilustraciones asociadas (acuarelas Tusell, clase `ACUARELA_HISTORICA`) muestran atribución obligatoria en pantalla (expediente de derechos).
- `EF-LEC-07` Las ilustraciones del lector/apoyo nunca se presentan como evidencia histórica: rotulación por `media_class` (§2.5, §4.7.6).
- **Pendiente:** edición de referencia definitiva (PEND-01) — la edición provisional EPUB Tusell permite desarrollar mientras tanto.

## EF-ATL — Atlas

**Propósito:** geografía literaria y patrimonio, **abierto desde el inicio** (DC-08), sin red (§2.6).

- `EF-ATL-01` Mapa base local (PMTiles); cero llamadas a servicios de teselas remotos en ejecución (§4.5, §5.2.4).
- `EF-ATL-02` Fichas de lugar desde `Place`/`Route` del catálogo: nombres literario/moderno, estado (`explicito/probable/debatido/interpretativo/patrimonio_asociado`), certeza, fuentes, capítulos.
- `EF-ATL-03` Sin geometría (`geometry: null`), la ficha se muestra sin punto en el mapa, con nota honesta de pendiente — jamás una coordenada inventada.
- `EF-ATL-04` Rutas SIEMPRE rotuladas como hipótesis (`presented_as: hipotesis`) con sus variantes (§2.4).
- `EF-ATL-05` Fotografías actuales rotuladas «aspecto actual» con autor/fecha/licencia; diferenciadas de imágenes históricas y recreaciones.
- `EF-ATL-06` Degradación elegante sin WebGL2: vista de lista de fichas funcional (§5.2.4).
- **Prueba:** atlas completo operativo en VM sin red; fallback forzado sin GPU.

## EF-MUS — Museo

**Propósito:** colección curada, abierta desde el inicio (DC-09), ligada a la novela/Cervantes/su tiempo.

- `EF-MUS-01` Fichas desde `MuseumItem`: autoría con `attribution_status`, procedencia, técnica, contexto, relación con el Quijote, capítulos, medios, fuente y licencia.
- `EF-MUS-02` Anónimos (`attribution_status: anonima`) jamás muestran autoría inventada (contrato §3).
- `EF-MUS-03` Zoom adecuado y texto alternativo en toda pieza (`MediaAsset.alt` obligatorio).
- `EF-MUS-04` Filtros pertinentes (capítulo, tipo, personaje) sin sensación de archivo infinito; navegación con teclado.
- **Prueba:** fichas del piloto con créditos visibles y zoom operativo offline.

## EF-CUA — Cuaderno

**Propósito:** reunir descubrimientos automáticos + notas propias, separando fuente verificada / interpretación / IA / anotación del usuario (§5.4).

- `EF-CUA-01` Entrada automática por cada descubrimiento mostrado (`Discovery`), con su certeza y fuente.
- `EF-CUA-02` Notas propias del jugador editables, marcadas como tales y nunca mezcladas con contenido verificado.
- `EF-CUA-03` Favoritos y filtros por episodio/personaje/lugar/tipo.
- `EF-CUA-04` Cada entrada enlaza a pasaje/escena/pieza de museo/ficha de atlas.
- **Prueba:** completar I.8 genera entradas trazables; aislar dos perfiles (§7.2).

## EF-VOZ — Voces y sonido

- `EF-VOZ-01` Audios precocinados locales; subtítulos sincronizados desde `Scene.subtitles_ref`.
- `EF-VOZ-02` Volúmenes separados (voz/ambiente/música) + silencio global, por perfil (`Profile.settings.volumes`).
- `EF-VOZ-03` Control de avance/repetición de la narración; omitible.
- `EF-VOZ-04` Sin audio no hay bloqueo: todo contenido con voz tiene texto (§4.7).
- **Prueba:** reproducir escena con subtítulos y sin dispositivos de audio.

## EF-PER — Perfiles y copia de seguridad

- `EF-PER-01` Perfiles locales múltiples totalmente aislados (progreso, ajustes, favoritos, anotaciones) — DC-13.
- `EF-PER-02` Autoguardado por perfil; esquema `player/profile` para intercambio/backup (contrato dominio C).
- `EF-PER-03` Copia en UN único archivo elegido por el usuario: instantánea coherente → validación → sustitución atómica (o mecanismo recuperable); nunca marca éxito una copia fallida (§2.7).
- `EF-PER-04` Restauración completa demostrable; la copia NO incluye claves de IA ni medios grandes (§2.7).
- `EF-PER-05` Verificación de estado de la copia consultable por el usuario; cambio de ruta soportado.
- **Prueba:** §7.3 completo (permisos, disco lleno, interrupción entre escritura y reemplazo).

## EF-IA — IA opcional

- `EF-IA-01` Inactiva por defecto; se activa solo bajo petición expresa con clave propia del usuario de un proveedor configurable (DC-12).
- `EF-IA-02` Antes de enviar nada: consulta el corpus local y muestra lo ya fundamentado; el envío de contexto exige consentimiento explícito por consulta.
- `EF-IA-03` Claves SOLO en el almacén seguro del sistema (DC-14); jamás en repositorio, recursos, logs ni backup.
- `EF-IA-04` Las respuestas de IA se identifican visualmente y NO se incorporan automáticamente al catálogo ni al museo (§2.7).
- `EF-IA-05` Sin conexión: estado claro, sin reintento silencioso; red usada solo para consulta explícita o comprobación de actualizaciones según ajustes (§2.7).
- **Prueba:** jugar todo el piloto sin red y sin clave — experiencia completa intacta.

## EF-ACT — Actualizaciones

- `EF-ACT-01` Software y contenido se actualizan por separado (DC-15); comprobación prudente solo con conexión y consentimiento.
- `EF-ACT-02` Validación de integridad y compatibilidad (`contract_version` del contrato) antes de instalar; paquete incorrecto rechazado sin destruir progreso (§7.3).
- `EF-ACT-03` Actualizar el catálogo jamás toca la base de perfil (DC-16); migraciones de ID vía `aliases.json` (§6.5.9).
- `EF-ACT-04` Rollback si un paquete falla; nunca se sustituyen bases de perfil.
- **Prueba:** actualizar catálogo con partida en curso; verificar marcadores y progreso intactos.

## EF-ACC — Accesibilidad y preferencias

- `EF-ACC-01` Navegación completa por teclado con orden de foco visible (§7.2).
- `EF-ACC-02` Contraste legible, escalado de texto, subtítulos, alt en imágenes, reducción de movimiento (fallback estático obligatorio del contrato) — guardado por perfil.
- `EF-ACC-03` Opción de omitir animaciones/intros; equilibrio estética/comodidad documentado en UX_ACCESIBILIDAD.
- `EF-ACC-04` Interfaz objetivo 1920×1080 con adaptación a 1440p/4K — números NO publicados como requisitos hasta medir (DP-02).
- **Prueba:** batería de accesibilidad del plan de QA (teclado puro, lector de pantalla cuando aplique).

## Dependencias y contratos

- Con CONTENIDOS: todo consumo es vía contrato v0.2.0 (firmado); cambios = versión + doble revisión (§10 del contrato).
- Con ADR-0001/0002: FTS5, almacenamiento y resolución de URIs lógicas se concretan en arquitectura tras la aprobación GO/NO-GO.
- Criterios de aceptación detallados y perfiles de prueba de caja negra: `PLAN_QA_Y_ACEPTACION.md`.

## EF-HIS — Modo Historia (incorporado a la hoja de ruta; pendiente de implementación)

- `EF-HIS-01` Narración condensada y suficiente de ambas partes, secuencia canónica y continuidad editorial revisada; sin obligar a recorrer los 126 capítulos íntegros.
- `EF-HIS-02` Utiliza recursos visuales disponibles pertinentes y aprobados, variedad contextual de planos, texto narrativo, audio/subtítulos cuando estén disponibles y distinción entre cita literal y adaptación.
- `EF-HIS-03` Flujo continuo sin preguntas obligatorias; pausa, reanudación, posición por perfil y acceso voluntario a lector, museo, atlas y cuaderno.
- `EF-HIS-04` La extensión final se determina tras piloto midiendo comprensión, ritmo y duración; nunca por acumulación artificial de escenas o ilustraciones.
- **Prueba:** guion de continuidad trazable + recorrido piloto con enlaces y QA de fidelidad, comprensión, accesibilidad y offline (DC-19).

## EF-HCT — Modo Histórico-cultural (incorporado a la hoja de ruta; pendiente de implementación)

- `EF-HCT-01` Recorridos explicativos sobre el contexto real de la época, organizados por temas y vinculados a obra, atlas y museo, sin sustituirse por una mera lista de fichas.
- `EF-HCT-02` Toda afirmación factual tiene fuentes y grado de certeza; distinguir expresamente hecho, interpretación, hipótesis, ficción y recreación.
- `EF-HCT-03` Acceso desde inicio, sin progreso obligatorio, soporte offline, licencias, atribuciones, accesibilidad y avisos de spoiler al enlazar con la narración.
- **Prueba:** tema piloto con fuentes verificadas, medios etiquetados y navegación completa offline (DC-20).

**Plan por fases y responsabilidades:** ver `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md`. Cualquier ampliación de los esquemas compartidos requiere coordinación con CONTENIDOS y DESARROLLO; **no hay implementación aprobada por el mero registro documental**.
