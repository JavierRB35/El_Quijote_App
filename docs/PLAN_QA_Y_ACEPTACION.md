# PLAN DE QA Y ACEPTACIÓN — FASE 0

> **Actualización vinculante 2026-11-11, DC-37:** Incorporar gate nuevo de imagen completa, pergamino sin desbordamiento, control contemplación reversible, tipografía histórica, ausencia de fondos neutros finales y menú manchego. TS-001 debe comprobar texto íntegro visible por defecto pero ocultable voluntariamente con avance pausado. Referencia prioritaria: [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Decisión **solo documental**; no autoriza implementación ni nuevas imágenes.

**Estado:** COMPLETO (v1.0, borrador para GO/NO-GO) — entregable FASE 0 (encargo §8, punto 10)
**Modo responsable:** DESARROLLO (QA y automatización / release manager)
**Fuente normativa:** encargo §5.2 (tabla QA), §7 (criterios), §8 (fases); ESPECIFICACION_FUNCIONAL (`EF-*`).
**Última actualización:** 2026-11-05.

## 1. Estrategia por capas

| Capa | Qué cubre | Herramientas | Estado |
|---|---|---|---|
| **Contrato editorial** | Esquemas, semántica de preguntas, puertas de licencia, referencias cruzadas, versión de contrato | `tools/editorial_validation/validate.py` (Python + jsonschema) | **OPERATIVA: 42/42 PASS** + paquete real del piloto I.8 VÁLIDO (verificado por ambos equipos) |
| **Importación** | Precarga/paquetes editoriales → canónico sin reescritura | `tools/editorial_validation/importar_precarga.py` | **OPERATIVA** (73 registros VÁLIDOS) |
| **Unidad** | Lógica de dominio: selector adaptativo, corrección de preguntas, migraciones, backup atómico | Vitest (TS), `cargo test` (Rust) | FASE 1 |
| **Integración** | Catálogo SQLite/FTS5, resolución de URIs lógicas, lector↔pasajes | Vitest + SQLite en memoria; pruebas Rust | FASE 1 |
| **UI** | Componentes con datos del catálogo; teclado, foco, estados de carga/error | Vitest + React Testing Library + Playwright (web) | FASE 1 |
| **Offline** | Todo el flujo sin red: juego, atlas, museo, lector, backup | Playwright con red bloqueada + VM limpia | FASE 1 |
| **Accesibilidad** | EF-ACC-01…04: teclado puro, contraste, escalado, movimiento reducido, alt | axe-core + recorridos manuales de teclado | FASE 1 |
| **Nativa (ejecutable)** | Instalador real + WebView2: smoke/e2e del binario, no solo web | Prueba manual scriptada + Playwright/Electron-style si aplica; VM Windows 11 limpia | FASE 1 (criterio ADR-0001.5) |

Regla del encargo §5.2.9: **Playwright web no basta** para afirmar que funciona el ejecutable; ninguna afirmación de calidad cubre el binario sin smoke nativo.

## 2. Perfiles de prueba de caja negra (§7.4 — se inventan desde cero, sin aprenderse la app)

| Perfil | Objetivo de observación |
|---|---|
| Adolescente sin Cervantes | Entiende opciones y explicaciones sin ayuda externa; dónde se atasca |
| Adulto lector | Ritmo de preguntas, profundidad de descubrimientos |
| Usuario solo de teclado | EF-ACC-01: todo alcanzable y operable sin ratón |
| Usuario sin internet | Offline real: nada pide red encubierta; IA opcional avisa |
| Aficionado al atlas | Fichas, rutas rotuladas como hipótesis, sin teselas remotas |
| Jugador que restaura tras reinstalar | Copia/restauración §7.3 sin pérdida |
| Jugador que falla mucho | Sin bloqueos punitivos; repaso útil; explicaciones presentes |

Registro de sesiones: dónde se atascan, si distinguen hechos de conjeturas, si localizan descubrimientos sin instrucciones. Corregir y repetir.

## 3. Criterios de aceptación por subsistema

Se verifican contra los requisitos `EF-*` de `ESPECIFICACION_FUNCIONAL.md` (cada uno con su prueba referida). Mínimos de encargo §7.2 que GATEAN cualquier «listo»:

- Instalación y primera ejecución **sin red**; un episodio completo con escena, pregunta seleccionada, explicación, voz/subtítulos, descubrimiento, cuaderno y guardado.
- Cambio de perfil con aislamiento demostrado.
- Lector: búsqueda en ambas partes, pregunta→pasaje→volver sin perder posición.
- Rondas de anticipación narrativa con dificultad media uniforme; puntuación 3/5, checkpoints, retorno tras agotamiento, opciones reordenadas al reintentar y canon inalterable; **sin cuestionario ni campos de escritura**.
- Atlas y museo completos sin red; IA opcional reporta sin conexión.
- Imagen previa que no revela y **una imagen propia, exclusiva y elegible para cada pregunta de un capítulo final**; hotspots teclado-amigables. **Escenas cinematográficas suficientes** para que la narración no sea mayormente estática sin justificación; escenarios `sin imagen` se prueban como **fallback técnico**, no cobertura audiovisual aceptada.
- Clases de evidencia siempre distinguidas (histórica/foto/recreación); rutas hipotéticas rotuladas.
- Rendimiento medido en hardware objetivo (picos RAM/VRAM, tiempos de escena/atlas/búsqueda) — objetivos definitivos SOLO tras medir (DP-02).

## 4. Casos negativos editoriales aún sin automatizar (deuda declarada)

1. Pasaje con hash distinto al del texto de la edición — requiere capa textual (PEND-01).
2. Cobertura visual real por episodio/beat, con cambios de plano significativos, y **cobertura exclusiva por pregunta**: `question_id → imagen propia → momento seguro → identidad/blob/hash → derechos → QA`. El paquete visual definitivo aún requiere completar; los fallbacks neutros siguen siendo funcionales pero no cierran esta deuda.
3. Pasaje → «hash distinto» y duplicados semánticos entre paquetes distintos (el detector actual opera por paquete).
Estas deudas viven en el backlog de QA y bloquean FASE 2, no el GO/NO-GO.

## 4 bis. Pruebas TS-001 — intervenciones narrativas (DC-22, R12)

De la matriz completa en `docs/COMPONENTES_NARRATIVOS_UX.md` §4: **automáticas y activas** (T1–T4: texto obligatorio, pasajes de respaldo, audio real o ausente pero nunca sustituto, unicidad de IDs/orden — integradas en la suite de contrato, 49/49) y **de usabilidad/accesibilidad al implementar el reproductor** (T5–T9: comprensión con sonido desactivado, persistencia de texto en transiciones, controles por teclado, voz fallida sin bloqueo, movimiento reducido). El criterio de aceptación del propietario queda así convertido en casos verificables desde el contrato.

## 5. Criterios de salida por fase (§8)

| Fase | Salida exige |
|---|---|
| **0 → GO/NO-GO** | Los 11 entregables presentados (ver `GO_NO_GO_FASE0.md`); contrato firmado por ambos lados (HECHO); suite de contrato verde (HECHO); ADR-0001 con criterios de validación definidos (HECHO — la validación empírica misma es de FASE 1). **Aprobación expresa del propietario.** |
| **1 (piloto)** | I.8 end-to-end en instalador offline en VM limpia; 7 perfiles de caja negra registrados; mediciones reales y replanificación. **Distinguir vertical técnico jugable (aceptable con neutro seguro) de capítulo visualmente terminado (imagen propia por pregunta y escenas suficientes)**. No declarar cierre de calidad audiovisual sin evidencia |
| **2 (producción)** | CI con suite de contrato obligatoria; revisiones por lotes con manifiestos versionados; cero preguntas sin respuesta inequívoca; 0 duplicados semánticos aprobados; 100 % activos con licencia registrada |
| **3 (entrega)** | Auditoría editorial y legal de cada recurso final; todas las rutas funcionales probadas; instalador autónomo documentado; lista de decisiones y limitaciones |

## 6. Gestión de evidencia

- Cada ejecución de suite produce informe versionado (`tests/contracts/last_validation_report.json`).
- Los informes de sesión de caja negra se commitean como evidencia (sin datos personales reales).
- CI (GitHub Actions sobre Windows, cuando el propietario lo autorice): suite de contrato + build + smoke; obligatoria para fusionar PRs que toquen `/schemas`, `/content`, `/app`, `/tools` (contrato §10.5).

## 7. Fuera de alcance de este plan

- Números de requisitos mínimos (RAM/GPU) sin medición previa.
- Seguridad de proveedores de IA externos (depende del proveedor elegido por el usuario; solo se garantiza el manejo local de la clave).
- Distribución pública/comercial (proyecto personal, DC-11).

## 8. Gate de aceptación visual — DC-28 (2026-11-08)

La [checklist canónica de composición](DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md#5-checklist-mínima-de-validación-visual-obligatoria) pasa a formar parte del QA de Historia, Aventura y cualquier cuadro de texto **sobre imagen**. Evidencia por escena y estado: captura del viewport real, escala de texto, zona crítica y justificación de `PASS/FAIL/PENDIENTE`.

- [ ] **Sin scroll** vertical/horizontal interno ni truncamiento; texto y controles completos visibles.
- [ ] **Ensanchamiento horizontal previo** realizado solo en espacio seguro, antes de reducir fuente.
- [ ] **Fondo semitransparente** y contraste real suficiente en claro/oscuro y sin blur.
- [ ] **Ningún elemento narrativo relevante tapado**: rostros, acciones, pistas, objetos o hotspots.
- [ ] **Tipografía legible y accesible**, con preferencias de tamaño normal/grande/muy grande y teclado.
- [ ] **Calidad conjunta tipo póster**, sin panel dominante, encuadre incoherente ni pérdida del hecho visual principal.
- [ ] **TS-001 y funcionalidad**: texto íntegro, progreso, controles y estados no regresan.

**Pruebas inicialmente pendientes:** 1920×1080, 1365/1366×768, 1280×800, viewport estrecho; Windows 125 % y 150 %; Historia breve/larga, MCQ, multiopción, ordering, matching, hotspot, feedback, Descubrir abierto. Los tests de contrato o el mero `overflow: hidden` **no** prueban aceptación visual; prohibido cerrar esta lista sin capturas y revisión real.

## 9. Gate de impacto transversal para correcciones

**Obligatorio en toda PR que corrija diseño, composición, interfaz, accesibilidad o comportamiento.** Un PASS del caso original no equivale a aprobación global. Aplicar la [regla permanente de AGENTS](../AGENTS.md#regla-permanente--correcciones-transversales-y-reutilización), la [política técnica](ARQUITECTURA_Y_ADR.md#política-transversal-de-correcciones-y-reutilización) y [UX §8](UX_ACCESIBILIDAD.md#8-aplicación-transversal-y-diferencias-por-módulo).

### Evidencia mínima por cambio correctivo

| Campo de la matriz `IMPACTO TRANSVERSAL Y REUTILIZACIÓN` | Evidencia exigida |
|---|---|
| Reproducción y causa raíz | Pasos, estado/viewport, asset original vs. representación si aplica, diagnóstico verificable |
| Regla o componente modificado | Ruta(s), justificación del nivel compartido elegido, efecto antes/después |
| Inventario de consumidores | Módulos que utilizan el componente/patrón y módulos revisados no afectados, con motivo |
| Pruebas del caso inicial | Capturas reales y recorrido funcional; texto, controles, imagen y foco |
| Pruebas cruzadas | Por lo menos **otro consumidor real de un módulo distinto**, cuando exista; si no hay segundo consumidor, probar otra variante de datos/estado y justificarlo |
| Casos límite | Resolución, zoom, texto grande, contenido largo, fallos de medios, teclado y movimiento reducido según aplique |
| Excepciones y deuda | Excepción acotada y motivo funcional; evidencia pendiente identificada como `PENDIENTE`, nunca como superada |
| Integración y no regresión | Suites existentes ejecutadas, resultado real de CI y comportamiento de perfiles/progreso/contrato si resulta afectado |

### Matriz mínima de pruebas visuales cuando haya imagen o texto sobre ella

- **Viewports:** 1920×1080, 1366×768, 1280×800 y ventana estrecha representativa; Windows 125 % y 150 % cuando haya entorno disponible. Registrar dimensiones efectivas y estado del navegador/aplicación.
- **Tamaño de texto:** normal, grande y muy grande; enunciados y alternativas largos; TS-001 íntegro en Historia.
- **Formatos y estados:** situación de Aventura, tres alternativas, puntuación, consecuencia canónica, checkpoint y, en sus módulos pertinentes, hotspots y panel de lectura; en vistas pertinentes, acuarela vertical y horizontal, escena cinematográfica, foco de teclado y movimiento reducido.
- **Comprobaciones:** sin scroll interno/truncamiento en overlays, alternativas simultáneamente visibles, sin recorte del sujeto/acción esencial, sin distorsión patrimonial, hotspots alineados, contraste legible, foco operativo, sin regresiones de navegación y persistencia. El scroll propio de Lector, listados o fichas extensas es compatible con UX §8.
- **Regresión intermodular:** después de cambiar un componente/estilo compartido, repetir una escena de Aventura **y** otra de Historia si ambos consumen la regla; ampliar a Museo/Atlas/Lector/Cuaderno/menús según matriz de dependencias. Si el alcance incluye solo un módulo, documentar por qué.

### Estados y aceptación

- `PASS`: evidencia real disponible y criterio verificado.
- `FAIL`: criterio incumplido, bloquea cierre.
- `PENDIENTE`: prueba no ejecutada, entorno no disponible o resultado inconcluso; **nunca** presentarlo como aprobado.

**Gate:** Dirección no acepta un cierre que solo demuestre «se ve bien en la captura original» sin diagnóstico, matriz de alcance, pruebas cruzadas y explicación de excepciones. Un test unitario o CI verde no sustituye la comprobación visual con capturas reales. Todo cambio correctivo documentará, en el commit o PR, la sección **«IMPACTO TRANSVERSAL Y REUTILIZACIÓN»** con esta evidencia. Esta regla no implica afirmar que las pruebas estén ya ejecutadas ni altera los gates de fases vigentes.

## Gate DC-37 — Aceptación de experiencia visual premium (aprobada, pruebas pendientes)

Todas las verificaciones son **PASS / FAIL / PENDIENTE** con captura real, viewport y estado probado. No se han ejecutado al formalizar esta directriz.

1. **Historia y Aventura:** fotografía/escena ocupa toda superficie útil de juego, sin columna de texto independiente ni vacíos neutros. Imagen no distorsionada, encuadre sin pérdida de rostros, gestos, acciones, pistas o hotspots.
2. **Pergamino:** material histórico semitransparente y legible; contexto, hablante, texto, opciones, consecuencia y controles dentro de bordes. Sin scroll interno, contenido cortado, elipsis automática ni opción oculta; verificar cajas reales y captura.
3. **Contemplación:** icono presente arriba a la derecha con texto visible; ocultación elimina solo pergamino; mantiene el icono recuperable, pausa voz, temporizador y avance, conserva estado, no responde en Aventura ni altera puntuación, restaura contenido íntegro, foco y reanudación explícita.
4. **Tipografía:** carácter editorial de época, offline, legibilidad y preferencias de tamaño normal/grande/muy grande. Contraste medido WCAG AA (4,5:1 normal, 3:1 grande/controles) sobre composición real.
5. **Menú y global:** pueblo y paisaje manchego de época de fondo a pantalla completa, pergamino de navegación semitransparente; fondos artísticos contextuales en restantes módulos, sin neutros como acabado final.
6. **Cobertura:** 100 % intervenciones de Historia con imagen narrativamente apta y asociación validada, reutilización justificada; preimagen propia y sin spoiler por ronda final de Aventura; derechos y procedencia verificados.
7. **Matriz mínima:** 1920×1080, 1366×768, 1280×800, 2560×1440, 3840×2160, ventanas pequeñas admitidas, Windows 100/125/150 %, ratón/teclado, audio ausente, movimiento reducido, textos largos, imágenes claras/oscuras y fallos de recursos.
8. **Regresión:** navegación, selección, puntuación, revelación, pausa, repetición, guardados, perfiles y offline.

**Bloqueo:** una prueba P0 en FAIL impide declarar aprobada visualmente la pantalla/capítulo. Un fallback técnico neutro no es PASS artístico. QA de esta implementación queda **PENDIENTE** hasta que exista nueva versión ejecutable y pruebas reales.
