# PLAN DE QA Y ACEPTACIÓN — FASE 0

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
- Los 6 tipos de pregunta; orden visual aleatorio sin alterar respuestas; **ningún campo de escritura**.
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
