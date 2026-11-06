# PLAN DEL PILOTO EDITORIAL — Seis capítulos representativos (entregable FASE 0.4, encargo §4.8)

**Modo:** CONTENIDOS · **Fecha:** 2026-11-05 · **Estado:** PLAN (la ejecución del piloto es FASE 1 y requiere GO/NO-GO).

Base de datos: `docs/data/mapa_capitulos.json` (real, generada del EPUB). Ninguna cifra extrapolada.

---

## 1. Selección de la muestra y justificación

| # | Capítulo | Perfil tipológico (encargo §4.8) | Justificación | Acuarelas |
|---|---|---|---|---|
| 1 | **I.8** — Los molinos de viento | Acción/aventura | Aventura canónica por excelencia; es el caso ilustrativo de diseño del propio encargo (§3); contrasta la imaginación de don Quijote con la advertencia de Sancho y la reinterpreta después («los gigantes eran molinos…»). Iconografía Doré/Tusell presente. | 4 |
| 2 | **I.6** — Escrutinio de la librería | Referencias históricas | Sátira bibliográfica con decenas de libros de caballerías reales citados (Amadís, Tirant, Felixmarte…): exige metodología de fuentes históricas externas a la ficción, como el banco completo deberá practicar. | 2 |
| 3 | **I.11** — Discurso de la Edad de Oro | Diálogo / reflexión discursiva | Diálogo con los cabreros + discurso programático del personaje: prueba el tratamiento de citas largas, tono y parodia retórica, sin acción. | 3 |
| 4 | **I.18** — La batalla de los rebaños | Humor | Equívoco visual de los rebaños por ejércitos, con catálogo onomástico disparatado (Alifanfarón, Pentapolín…): humor cervantino puro, ideal para cápsulas de descubrimiento y preguntas de actitud/reacción. | 3 |
| 5 | **II.1** — La visita del cura y el barbero | Reflexión + recepción histórica | Meta-literatura: conversación sobre la falsa Quijote de Avellaneda — alusión a un hecho histórico real documentado (1614) que el banco debe tratar con grado de evidencia, no como chisme. | 2 |
| 6 | **II.74** — Muerte de Alonso Quijano | Etapa final de la obra | Cierre canónico: testamento, renuncia a los libros de caballerías, tono elegíaco. Prueba el manejo de spoilers (todo el banco anterior queda «seguro» solo tras este punto). | 3 |

Cobertura de la muestra: ambas partes (4+2), tipos acción/diálogo/humor/reflexión/historia/final, capítulos con densidad baja (2 acuarelas) y media (4), y el capítulo con más acuarelas cercano (I.23, 7) queda fuera a propósito para no sesgar la extrapolación hacia lo visual.

## 2. Qué inventariará el piloto por capítulo (entregable FASE 1)

Por cada uno de los seis capítulos: segmentación en episodios/escenas con localizadores de pasaje; hechos narrativos; personajes (ficticios/alusiones reales con grado de evidencia); lugares; citas literales cotejadas; cápsulas de humor/curiosidad; necesidades de imagen por fase (before/question/reveal/after/lector/museo/cuaderno/atlas); preguntas candidatas con opciones seleccionadas, explicación, evidencia y `semantic_key`; grado de certeza por afirmación (estados del Anexo A del encargo).

## 3. Matriz de fuentes (a fijar antes de ejecutar)

| Fuente | Uso previsto | Estado |
|---|---|---|
| Texto del EPUB Tusell (base ed. Tasso 1905, ortografía modernizada) | Texto conservado del lector y localización de pasajes | DISPONIBLE en el proyecto (auditoría 2026-11-05) |
| Edición crítica de referencia (candidatas: BVC/Institut Cervantes 2016 dir. Rico; RAE/Alfaguara 2004; ed. Cátedra) | Cotejo de citas literales y variante | **PEND-01**: seleccionar y verificar derechos |
| QBI — Banco de imágenes del Quijote (cervantesvirtual) | Relación de las acuarelas con episodio y tradición Doré | A verificar por recurso |
| BVPB, registro 463832 (ed. Tasso 1905 digitalizada, CC BY) | Procedencia de las acuarelas y cotejo visual | CONFIRMADO (2026-11-05) |
| Estudios académicos sobre Avellaneda, libros de caballerías, Edad de Oro | Preguntas históricas e interpretativas | A citar obra y páginas por registro |

Regla: el texto del EPUB nunca sustituye a la edición de referencia para afirmar cita literal; se conservará capa separada de texto normalizado para búsqueda (encargo §4.2).

## 4. Criterios de revisión y deduplicación

- Revisión cruzada filológica + histórica por cada pregunta (dos roles del modo, firmados en el registro).
- `semantic_key`: normalización (minúsculas, sin signos, lemas de protagonista) + comparación de pares (enunciado, opciones); colisión → fusión o descarte con motivo.
- Rechazos documentados con motivo taxonomizado: duplicado, trivial, ambigua, spoiler incontrolado, no verificable, respuesta múltiple indebida.

## 5. Plan de licencias del piloto (por tipo de recurso)

| Recurso | Condición |
|---|---|
| Acuarelas Tusell (EPUB/BVPB) | Dominio público presunto + uso interno no comercial (expediente `DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md`); atribución obligatoria en pantalla |
| Recreaciones fotorrealistas IA | Propias; rotuladas RECREACION_ARTISTICA; sin estilo «fotografía histórica» |
| Fotografía patrimonial actual | Verificación individual (autor, fecha, permiso) — 0 sin licencia |
| Fragmentos de texto de la ed. de referencia | Según derechos de la edición elegida (PEND-01) |

## 6. Métricas que medirá el piloto (para dimensionar, no para presumir)

- Preguntas candidatas → aprobadas → publicables, con motivos de rechazo.
- Minutos/hora de investigación+validación por pregunta aprobada, separando tipos de capítulo.
- Recursos visuales por episodio/fase: histórica disponible vs recreación necesaria.
- Tamaño en disco por capítulo y tiempo de integración con el contrato técnico.
- **No se publicará estimación global sin intervalo y supuestos** (encargo §4.8).

## 7. Criterios de salida del piloto

1. Seis capítulos con expediente completo y validado por los dos roles.
2. ≥ 20 preguntas publicables por capítulo de acción/diálogo y ≥ 12 en capítulos introspectivos, **o** justificación de por qué el capítulo no da más sin inflar.
3. Contrato editorial-técnico ajustado con los hallazgos reales (entregable FASE 0.7).
4. Estimación razonada con intervalo para el total del banco y del coste de validación.

## 8. Dimensionamiento del banco de preguntas — acuerdo de producto (2026-11-06)

**Decisión aprobada por el propietario (DC-07):** sustituir la antigua aspiración de 10.000 por **1.200 preguntas originales como objetivo de planificación**, con **rango orientativo de 900 a 1.500**. **No es una cuota mínima ni una autorización para inflar registros**: si el corpus verificado solo permite menos, prevalece la calidad. El objetivo se recalibrará con métricas del piloto y aprobación de alcance antes de producción masiva (encargo §4.8 y Fases 1→2).

**Evidencia y límite de inferencia.** El paquete de los seis capítulos del piloto contiene 50 preguntas válidas para el contrato (I.8: 12; I.6: 8; I.11: 8; I.18: 9; II.1: 6; II.74: 7), equivalentes a 8,33 por capítulo. Multiplicar por 126 da **1.050**, únicamente como referencia aritmética: la muestra es intencional, no aleatoria, y la validación contractual no demuestra por sí sola revisión literaria o experiencia jugable completa. Los aproximadamente 87 episodios son agrupación editorial provisional, no denominador de cuota.

### Reparto funcional orientativo del objetivo de 1.200

| Uso principal de la pregunta | Propuesta | Observación |
|---|---:|---|
| Aventura narrativa | 700 | Acontecimientos, personajes, decisiones, diálogo, consecuencias, humor, observación |
| Desafíos y profundización voluntarios | 350 | Comparaciones, citas, comprensión compleja, interpretaciones atribuidas y repaso |
| Atlas, historia y museo | 150 | Geografía literaria, patrimonio, arte y contexto histórico documentado |
| **Total** | **1.200** | **Reparto orientativo, no cupos rígidos ni tres bases de datos separadas** |

Las categorías son **usos de presentación**, no clasificaciones temáticas excluyentes; una pregunta de aventura puede abordar historia o literatura. No deben mostrarse las 1.200 en una sola partida: selección contextual y adaptativa, sin repeticiones inmediatas ni spoilers, con desafíos voluntarios.

### Bandas orientativas por capítulo, no requisitos de completitud

| Tipología | Banda de preguntas posibles |
|---|---:|
| Transición narrativa o capítulo breve | 3–6 |
| Diálogo / reflexión | 5–10 |
| Narración convencional | 7–12 |
| Gran aventura / capítulo rico en hechos | 12–20 |
| Excepcionalmente complejo | Hasta 25, solo si se justifica |

Para episodios multicapítulo se contará la **unidad semántica** de la pregunta sin forzar asignación artificial por capítulo. Las bandas nunca sustituyen el inventario real ni son objetivos de producción.

### Puertas de calidad y seguimiento

1. **Singularidad:** toda pregunta debe añadir un conocimiento o razonamiento diferente; sin clones semánticos y con `semantic_key`/revisión de duplicados.
2. **Evidencia:** fuente exacta (pasaje, fuente histórica o interpretación atribuida), explicación verificable, certeza documentada y licencias de medios cuando correspondan.
3. **Experiencia:** valor de descubrimiento, respuesta exclusivamente seleccionada y clara, sin spoilers ni interrupciones de ritmo innecesarias.
4. **Métricas del piloto:** candidatas, aprobadas, rechazadas por motivo, esfuerzo por pregunta, diversidad por capítulo y tipo, uso real en la aventura y coste de integración visual/técnica.
5. **Primer hito de producción controlada:** **300 preguntas realmente aprobadas e integradas**, sin fecha ni cuota por capítulo impuestas. Se trata de un hito de planificación posterior a la aceptación correspondiente; la decisión de tamaño **no autoriza por sí sola Fase 2**.
6. **Revisión de alcance:** actualizar previsión global y mix funcional tras los seis capítulos y cada lote revisado; informar desvíos razonados respecto de 900–1.500 sin crear preguntas de relleno.

**Compatibilidad con el encargo maestro:** queda intacto el principio «tantas preguntas realmente diferentes, útiles y verificables como permita un trabajo riguroso» (§2.3). Esta decisión concreta un **objetivo operativo flexible**, no modifica la exigencia de calidad ni la prohibición de números mínimos artificiales. Los umbrales previos de §7.2 de este plan son criterios exploratorios con cláusula de justificación, no cuotas por capítulo.
