# ESPECIFICACIÓN FUNCIONAL — FASE 0

**Estado:** COMPLETA (v1.0, borrador para GO/NO-GO) — entregable FASE 0 (encargo §8); los requisitos se citan como `EF-<subsistema>-<nn>` y son **verificables** (prueba de aceptación incluida o referida al plan de QA).
**Modo responsable:** DESARROLLO, con validación de COORDINACIÓN.
**Fuente normativa:** encargo §3, §5.4, §7.2; decisiones cerradas DC-01…DC-17 (`VISION_Y_DECISIONES.md`); contrato editorial-técnico v0.2.0 (firmado por ambos lados).
**Última actualización:** 2026-11-06 (ampliación modos Historia e Histórico; resto de la especificación conserva su estado previo).

Convenciones: los datos editoriales provienen SIEMPRE del catálogo versionado (contrato), nunca de componentes con textos incrustados (encargo §5.3, §9 criterio de excelencia). «Piloto I.8» = guion de anticipación de `app/src/aventura/guionNarrativo.ts` y paquete editorial de pasajes, personajes, imágenes y fuentes.

---

## EF-INI — Pantalla de inicio

**Propósito:** entrada simple e inmersiva; nada administrativo delante.

- `EF-INI-01` Ofrecer: continuar, nueva partida, aventura aleatoria opcional, **Modo Historia**, **Modo Histórico**, atlas, museo, cuaderno, lector, perfiles, ajustes (§5.4 y DC-19/DC-20).
- `EF-INI-02` El tutorial es breve, **cancelable y recuperable**; su estado vive por perfil.
- `EF-INI-03` En primera partida, la introducción es breve y opcional (DC-05).
- `EF-INI-04` La pantalla de inicio no muestra avisos de actualización ni paneles de telemetría; lo relativo a red vive en ajustes.
- **Prueba:** recorrer inicio con teclado solo, sin puntero (QA §7.4, perfil «usuario de teclado»).

## EF-AV — Aventura narrativa (normativa vigente)

**Propósito:** anticipar la acción inmediata de un personaje a partir de la escena anterior al acontecimiento; no examinar conocimientos de la obra. El canon permanece siempre invariable.

- **EF-AV-01:** presentar antes del hecho imagen específica, contexto breve, personaje, anticipación y tres opciones usuales verosímiles, una canónica, dificultad moderada uniforme.
- **EF-AV-02:** resultado inmediato exclusivamente +1/−1 punto; solo tras la acción voluntaria «Descubrir qué sucede» mostrar consecuencia real e imagen posterior.
- **EF-AV-03:** nueva partida con 3 puntos, máximo 5, checkpoints por momentos narrativos; +1 al cruzarlos, guardado después del bono y mínimo 3 al restaurar tras agotamiento.
- **EF-AV-04:** los errores no cambian los hechos ni abren ramas alternativas; al saldo 0 mostrar consecuencia antes de retroceder. En reintentos se reordenan las opciones sin cambiar la respuesta.
- **EF-AV-05:** imagen previa propia, cronología sin spoilers, continuidad; la solicitud de imágenes nuevas depende de revisión previa del propietario de activos existentes.
- **EF-AV-06:** sin scroll interno en paneles, con texto completo, teclado/foco, contraste y movimiento reducido conforme a DC-28.
- **EF-AV-07:** datos y guion de cada ronda vinculados a pasaje real y evidencia. El piloto es I,8; cualquier expansión por los 126 capítulos requiere revisión editorial y contrato declarativo adecuado.
- **EF-AV-08:** partidas y checkpoints persistentes separados del progreso de Historia. No conservar la partida del cuestionario eliminado como versión paralela.

La autoridad funcional es [REGLAS_MODO_AVENTURA_V2_2026-11-08.md](REGLAS_MODO_AVENTURA_V2_2026-11-08.md). Los subsistemas de Museo, Lector y Modo Histórico no pasan a ser examen por esta revisión.

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
- `EF-HIS-02` Debe mantener **ritmo visual cinematográfico con suficientes escenas y planos relevantes**; priorizar recursos `assets/scenes/` y primeros planos aptos; acuarelas secundarias en gameplay y protagonistas de sección artística propia. Audio opcional, texto TS-001 íntegro y distinción entre cita/adaptación. Neutro solo como prototipo/fallback o transición justificable, **no aceptación final de capítulo sin imágenes suficientes** (DC-25/26).
- `EF-HIS-03` Flujo continuo sin preguntas obligatorias; pausa, reanudación, posición por perfil y acceso voluntario a lector, museo, atlas y cuaderno.
- `EF-HIS-04` La extensión final se determina tras piloto midiendo comprensión, ritmo y duración; no imponer cuotas fijas de escenas, pero sí verificar **suficiencia visual y enganche** frente a tramos estáticos injustificados.
- **Prueba:** guion de continuidad trazable + recorrido piloto con enlaces y QA de fidelidad, comprensión, accesibilidad y offline (DC-19).

- **`EF-HIS-05` (DC-26):** la galería artística de acuarelas se ofrece como sección propia y opcional, con autoría, fuentes, licencias y enlace a episodios; la navegación contextual desde Historia respeta spoilers y no mezcla arte con evidencia histórica.

## EF-HCT — Modo Histórico-cultural (incorporado a la hoja de ruta; pendiente de implementación)

- `EF-HCT-01` Recorridos explicativos sobre el contexto real de la época, organizados por temas y vinculados a obra, atlas y museo, sin sustituirse por una mera lista de fichas.
- `EF-HCT-02` Toda afirmación factual tiene fuentes y grado de certeza; distinguir expresamente hecho, interpretación, hipótesis, ficción y recreación.
- `EF-HCT-03` Acceso desde inicio, sin progreso obligatorio, soporte offline, licencias, atribuciones, accesibilidad y avisos de spoiler al enlazar con la narración.
- **Prueba:** tema piloto con fuentes verificadas, medios etiquetados y navegación completa offline (DC-20).

**Plan por fases y responsabilidades:** ver `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md` y DC-23–DC-27. Dirección integral fija contenido, arte, producto, QA y aceptación; desarrollador único implementa/versiona/prueba en GitHub; el director artístico solo produce recursos bajo prompt encargado por el propietario. Un documento no demuestra implementación. La Fase 1 tiene autorización; Fase 2/distribución no.
