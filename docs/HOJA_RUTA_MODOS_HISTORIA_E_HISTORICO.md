# HOJA DE RUTA — MODOS HISTORIA E HISTÓRICO-CULTURAL

> **Actualización vinculante 2026-11-11, DC-37:** La TS-001 revisada permite ocultar voluntariamente el pergamino y volver a mostrarlo, con voz y avance pausados; imagen a superficie completa, ningún acabado final neutro y cobertura apta por intervención en Historia. La función del Modo Histórico se mantiene. Referencia prioritaria: [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Decisión **solo documental**; no autoriza implementación ni nuevas imágenes.

**Fecha de incorporación:** 2026-11-06 · **Estado:** requisitos de producto aprobados; implementación pendiente.  
**Origen:** instrucción expresa del propietario, decisiones DC-19 y DC-20 en `VISION_Y_DECISIONES.md`.  
**Alcance:** nuevos modos complementarios a Aventura, Preguntas, Lector, Atlas, Museo y Cuaderno; **no sustituyen** esos módulos ni alteran las decisiones anteriores.

## 1. Modo Historia — narración condensada de la novela

**Objetivo vinculante:** la aplicación contará la historia de *Don Quijote* mediante una selección de fragmentos y episodios suficientemente representativa para mantener la continuidad, inteligibilidad y fidelidad de la trama de las dos partes, **sin reproducirla íntegramente ni producir una secuencia excesivamente larga**.

**Reglas funcionales:**
- Relato lineal en orden canónico con comienzo, transiciones indispensables, evolución de protagonistas y desenlace. No cambiar hechos, cronología esencial, motivaciones documentadas ni el final; distinguir claramente narración redactada/adaptada de cita literal.
- Seleccionar escenas por **necesidad narrativa**, no por igualdad de tiempo por capítulo: incluir episodios que expliquen acontecimientos posteriores y omitir/reducir los que no impidan comprender el conjunto. Registrar las omisiones y enlaces al texto completo.
- **Primero escenas cinematográficas existentes** `assets/scenes/` y primeros planos aptos, con **suficientes imágenes y variación expresiva para sostener interés y ritmo**; **después acuarelas** como apoyo secundario en gameplay y material principal de una **sección artística propia**. Si faltan imágenes aptas, Dirección redacta prompts exactos para el director artístico. No mostrar spoilers ni recursos no autorizados. Registrar cobertura, procedencia, continuidad, derechos y accesibilidad (DC-24–DC-27).
- Combinar **varios planos pertinentes**, reacciones y transiciones narrativas con texto íntegro, audio opcional, música y ambiente cuando estén aprobados; mantener ritmo, movimiento sutil y reducción/desactivación accesible. **Fondo neutro como recurso técnico/transitorio de seguridad, no cierre visual del capítulo final**. TS-001 permite seguir íntegramente el contenido sin sonido ni imágenes.
- Avance, pausa, reanudación y navegación sencilla por episodios; posición guardada por perfil. Enlaces opcionales al lector, fichas del museo, atlas y cuaderno.
- **Modo Historia distinto de Aventura:** su recorrido principal es la narración fluida. Las preguntas, retos y exploraciones no interrumpen obligatoriamente la narración; pueden ofrecerse aparte y mediante enlaces voluntarios.
- **Duración:** deliberadamente acotada, definida *después* de elaborar un guion piloto y probar comprensión/ritmo con usuarios; no inventar ahora horas totales ni imponer un número uniforme de escenas o palabras.

**Contrato editorial propuesto para revisión conjunta (aún no implementado):** un itinerario ordenado de unidades de narración con `sequence_order`, `episode_ids`, `passage_ids`, sinopsis/guion y tipo de texto, duración estimada tras piloto, `media_ids`, subtítulos/audio, `spoiler_policy`, enlaces culturales, `review_state` y fuentes. Reutilizar IDs y manifiestos existentes, no duplicar sin justificación el catálogo cultural.

**Criterio de aceptación:** una persona que no haya leído la novela puede explicar los hitos fundamentales y la evolución de Don Quijote y Sancho tras recorrer la narración completa, sin lagunas graves ni confundir escenas recreadas con texto original; las dos partes y el desenlace están representados; existe trazabilidad de cada fragmento y acceso al texto íntegro.

## 2. Modo Histórico — contexto real histórico-cultural

**Objetivo vinculante:** ofrecer una experiencia específica para conocer el **contexto histórico y cultural real de la época de Cervantes y del mundo representado en la novela**, relacionada con la obra pero distinta de la ficción.

**Líneas temáticas iniciales para curaduría, no temario cerrado:** sociedad y estamentos; vida cotidiana, alimentación, oficios y costumbres; economía, comercio y caminos; instituciones, política y justicia; religión y mentalidades; educación, literatura, imprenta, teatro y arte; armamento, viajes, arquitectura y cultura material; marco biográfico y temporal de Cervantes y publicación/recepción de las dos partes.

**Reglas funcionales:**
- Fichas, secuencias y recorridos temáticos opcionales, accesibles desde inicio y enlazados con episodios, pasajes, lugares y piezas de museo. **El Modo Histórico no debe limitarse a un listado de fichas del museo**: debe permitir recorrer explicaciones contextualizadas y visualmente comprensibles.
- Cada afirmación factual ha de apoyarse en **fuente histórica o académica verificable**; diferenciar época de la acción literaria, biografía de Cervantes, representación ficcional y contexto de publicación. No tratar como hechos históricos los dichos de Don Quijote, rutas imaginadas o recreaciones IA.
- Distinguir explícitamente **HECHO_HISTORICO_DOCUMENTADO**, **INTERPRETACION_ACADEMICA**, **HIPOTESIS_PLAUSIBLE** y **DISCUTIDO/NO_ESTABLECIDO**, con procedencia, fechas y licencia por recurso; identificar imágenes modernas e históricas.
- Reutilizar atlas, museo, corpus y medios lícitos, sin crear repositorios paralelos de datos ni dependencias online. Acceso abierto, sin desbloqueo por progreso.
- El contenido histórico debe poder consultarse sin haber avanzado en la aventura; advertir de posibles spoilers narrativos en vínculos a la obra. Cualquier pregunta opcional respeta el contrato de respuestas exclusivamente seleccionadas.
- Accesibilidad, subtítulos cuando haya audio, créditos y funcionamiento íntegro offline.

**Contrato editorial propuesto para revisión conjunta (aún no implementado):** tema/unidad didáctica con ID, orden opcional, periodo, localización, entidades y capítulos relacionados, texto divulgativo, `sources[]`, `certainty`, `media_ids[]`, `license_ids[]`, enlaces a museo/atlas y estado de revisión.

**Criterio de aceptación:** completar un recorrido temático de ejemplo y distinguir inequívocamente hechos reales, interpretaciones, ficción e imágenes recreadas; abrir sus fuentes y conexiones con obra, museo y atlas sin red.

## 3. Hoja de ruta e integración entre equipos

| Etapa | Modo Historia | Modo Histórico | Estado / puerta |
|---|---|---|---|
| Fase 1 — Diseño detallado | Mapa de continuidad imprescindible de ambas partes; selección preliminar de episodios, guion y recursos disponibles; prototipo narrativo de un episodio | Temario priorizado, dossier de fuentes y recorrido piloto temático enlazado a una escena y ficha de museo | **Pendiente**: exige contratos y revisión editorial-técnica |
| Fase 1 — Validación | Probar comprensión, duración, ritmo, contraste narración/citas y licencias de medios; enlace al lector y guardado | Verificar rigor, separación ficción/realidad, licencias, navegación y funcionamiento offline | **Pendiente**: no declarar piloto cerrado sin evidencia |
| Fase 2 — Producción | Completar itinerario narrativo condensado de ambas partes, voz/subtítulos y medios seleccionados | Completar recorrido cultural seleccionado con temas reales, fuentes, recursos y conexiones | **Pendiente de autorización Fase 2** |
| Fase 3 — Entrega | QA de continuidad, escenas, accesibilidad, desempeño y duración real | Auditoría histórica y legal, accesibilidad y funcionamiento offline | **Pendiente** |

**Responsabilidades vigentes desde 2026-11-08 (DC-23):** **Dirección integral (ChatGPT)** resuelve guion, filología, investigación histórica, imágenes aptas, UX, derechos documentales, prioridades y aceptación; el **desarrollador único** implementa contratos, catálogo, presentación, pruebas, offline, integridad y entrega mediante PR en **GitHub como fuente y destino únicos**. El **director artístico** interviene solo mediante prompt de imagen preciso canalizado por el propietario. R01–R16 son etiquetas históricas, no equipos activos.

**Dependencias críticas:** no convertir el lector íntegro en narración interminable; **cada pregunta definitiva requiere imagen propia y cada capítulo narrativo suficiente cobertura de escenas**; no usar activos sin pertinencia temporal/derechos; no crear texto histórico sin fuentes ni presentar IA como prueba; no introducir respuestas escritas ni producir Fase 2 sin autorización.

**Decisiones de diseño aún abiertas (no bloquean su incorporación a la hoja de ruta):** duración objetivo de la experiencia una vez medido el piloto; estructura final de las unidades narrativas y temáticas; voz y densidad audiovisual definitiva; cobertura temática y profundidad histórica tras curaduría; versión final de los esquemas. Son propuestas para los equipos, no decisiones del propietario ya cerradas.


## 4. Actualización de coordinación — Biblia Narrativa y TS-001 (2026-11-06)

**Referencias vinculantes:** DC-21, DC-22 en `VISION_Y_DECISIONES.md` y [Biblia Narrativa por profesionales](BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md). El texto de este epígrafe complementa el §1 sin modificar el alcance independiente del Modo Histórico (§2).

- **Adaptación integral selectiva en un modo condensado:** inventario fuente de 126/126 capítulos; guion audiovisual selecciona y condensa con justificación, preservando trama, evolución, humor significativo, marcos de relato y desenlaces. No es lectura audiovisual literal del libro completo.
- **Narración y puesta en escena:** aventura cinematográfica dramatizada 2.5D, narrador cervantino adaptado, citas originales cotejadas, relatos intercalados de tratamiento mixto, avance automático con controles flexibles.
- **TS-001 obligatorio:** toda intervención verbal tendrá texto escrito íntegro, legible, vinculado al hablante, **visible por defecto y recuperable** aun sin audio; permitir ocultación voluntaria **solo** en contemplación pausada DC-37. No permitir desaparición involuntaria ni desactivación de la transcripción. Pausa, repetición, retroceso y preferencias de tamaño/contraste sin omitir texto. El texto escrito parte del registro editorial de la intervención y no de una transcripción secundaria divergente.
- **Recursos y galería artística (DC-24–DC-27):** cada pregunta final con imagen exclusiva; narración con variedad suficiente de escenas y primeros planos seguros; acuarelas prioritarias para **sección artística propia**, secundarias para gameplay. Inventariar antes de producir y solicitar al propietario prompt exacto solo para huecos reales. Fondo neutro para prototipos/incidencias puntuales, no suficiencia visual final.
- **Integración:** cambios de schema, datos y validador requieren decisión editorial/funcional de Dirección integral, implementación y pruebas verificables del desarrollador único; no afirmar que propuestas ya están ejecutadas. Los hitos H0–H7 de la Biblia son referencias de proceso, sin convocar roles R01–R16. GitHub remoto es única fuente y destino.
- **Estado:** decisiones de producto cerradas; diseño de esquema, duración y producción audiovisual sujetos a piloto y revisión; Fase 2 no autorizada.
