# ARQUITECTURA Y ADR

**Modo responsable:** DESARROLLO (director técnico/arquitecto principal)
**Última actualización:** 2026-11-05

## Índice de ADRs

| ADR | Título | Estado |
|---|---|---|
| [ADR-0001](#adr-0001-selección-del-stack-técnico-base) | Selección del stack técnico base | **Propuesto** — validación empírica pendiente; requiere aprobación del propietario (GO/NO-GO) |
| ADR-0002 | Almacenamiento local y separación catálogo/perfil (SQLite, FTS5, migraciones) | Pendiente — tras ADR-0001 |
| ADR-0003 | Distribución de medios pesados (Git LFS vs. releases) | Pendiente — PEND-05 |
| ADR-0004 | Resolución de URIs lógicas de activos por dispositivo | Pendiente — absorbido parcialmente por ADR-0002 |
| [ADR-0005](#adr-0005-entidades-de-beat-e-intervención-narrativa) | Entidades de beat e intervención narrativa (DC-22, TS-001) | **Propuesto** — doble firma editorial pendiente |

---

## ADR-0001: Selección del stack técnico base

- **Fecha:** 2026-11-05 · **Estado:** Propuesto (encargo §2.6, §5.2). La aprobación de este ADR NO autoriza por sí sola a escribir código de aplicación (punto de control GO/NO-GO).
- **Decisor:** propietario, con propuesta del director técnico.

### Contexto

Aplicación documental interactiva premium para Windows 11 x64: escenas 2.5D con movimiento sutil (no mundo abierto, sin físicas), lector EPUB completo de 126 capítulos con búsqueda y anotaciones, catálogo estructurado grande de preguntas/entidades verificado por contrato (42/42), atlas offline (MapLibre/PMTiles), museo, cuaderno, perfiles locales con copia de seguridad, IA opcional bajo clave propia, instalador 100 % offline, accesibilidad real (teclado, lectores de pantalla) y proyecto personal no comercial. El encargo fija español como idioma de catálogo y exige separación catálogo/activos/perfil (DC-16).

### Opciones consideradas

| Criterio | **Tauri 2 + React/TS + Rust** | Godot 4 | Electron | WPF/WinUI (nativo) |
|---|---|---|---|---|
| Escenas 2.5D por capas con parallax | HTML/CSS + Web Animations API; suficiente según encargo §5.2.3 (motor 2D extra solo con benchmark) | Excelente (motor real) | Igual que Tauri (Chromium) | Requiere WebView2 incrustado para el mismo contenido web |
| Lector EPUB + texto indexable | epub.js + capa textual del contrato; ecosistema web maduro | Renderizado de texto largo y EPUB artesanal; sin epub.js | Igual que Tauri | WebView2 de nuevo |
| Búsqueda local (FTS5, castellano áureo) | SQLite en Rust, control total del tokenizer | SQLite vía GDScript possible pero periférico | better-sqlite3 (Node) | System.Data.SQLite |
| Atlas MapLibre + PMTiles | Nativo del ecosistema web | No aplica (portadas propias) | Igual que Tauri | WebView2 |
| Accesibilidad (lectores de pantalla, foco, teclado) | Hereda el árbol de accesibilidad del WebView (Chromium), más maduro | Mejorable; más trabajo específico | Igual que Tauri | Buena, pero contenido web igual via WebView |
| Binario y tamaño instalador | Mínimo (usa el WebView2 del sistema; bootstrapper offline cubre su ausencia) | Runtime propio (~100 MB+) | Empaqueta Chromium (~100 MB+) | Medio |
| Seguridad (claves IA, permisos, red mínima) | Modelo de capacidades/ACL de Tauri 2; backend Rust con superficie pequeña | Superficie de motor de juego no pensada para esto | Historial de seguridad peor; Node | Buena, pero no alinea con el stack propuesto |
| Portabilidad futura (macOS/Linux) | Prevista por Tauri | Buena | Buena | Prácticamente nula |
| Alineación con el encargo | §5.2 la propone explícitamente | Contingencia explícita del encargo | No mencionada | No mencionada |

### Decisión propuesta

**Tauri 2** como capa de escritorio; **React + TypeScript + Vite** para la interfaz; **Rust con comandos Tauri tipados** para ficheros, copia/restauración, importaciones y operaciones sensibles (sin SQL arbitrario desde la UI, encargo §5.2.1); **SQLite + FTS5** para el catálogo (solo lectura en ejecución) y **SQLite separada** para datos del jugador; **epub.js** para visualización con el texto indexable anclado en el contrato editorial; **MapLibre GL JS + PMTiles local** para el atlas con fallback sin WebGL2; escenas con **HTML/CSS + Web Animations API** (Canvas 2D o motor 2D solo si un benchmark de escena representativa lo justifica); audio con **HTMLMediaElement/Web Audio** y subtítulos; pipeline editorial **Python + JSON Schema** (ya operativa: validador 42/42, importador §6.5.10).

### Criterios de validación antes de la aprobación (evidencia exigida)

1. **FTS5 y castellano áureo — SUPERADO (2026-11-05, 9/9):** `tests/dev/fts5_castellano_aureo.py` + `tests/dev/last_fts5_report.json`. Diseño confirmado: búsqueda SOBRE la capa `text_indexable` normalizada; `text_original` se muestra intacto (integridad verificada). Consultas con/sin tilde equivalentes («sabia» ≡ «sabía»); sin stemming deliberado — la equivalencia de lemas se resuelve editorialmente si el piloto la exige. SQLite 3.50.4 con FTS5.
2. **PMTiles local:** acceso por protocolo seguro/rangos desde Tauri sin servidor; verificar licencia de los datos de teselas (PEND-04). — Pendiente.
3. **WebView2 offline:** instalador con bootstrapper en VM Windows 11 limpia **sin red** (PEND-07); ninguna descarga en primer arranque (encargo §5.2.6). — Pendiente.
4. **Benchmark de escena representativa:** episodio del piloto (molinos) con capas + parallax + hotspot en hardware modesto; medir RAM/VRAM/FPS y alternativa de movimiento reducido (PEND-06). — Pendiente.
5. **Smoke/e2e nativo:** instalador real en Windows, no solo Playwright web (encargo §5.2.9). — En curso: primer `cargo check` del stack Tauri en la máquina del propietario.

**Nota de entorno Windows (para CI futura):** el toolchain local es Node v24.20.0 + Rust 1.99.1 (MSVC) + VS 18 Community (MSVC 14.51) + Windows SDK 10.0.26100. Desde Git Bash, `cargo` debe ejecutarse dentro del entorno `vcvars64.bat` (sin `LIB`/`INCLUDE` el enlazador falla con `LNK1104: msvcrt.lib`). GitHub Actions `windows-latest` resuelve esto automáticamente.

### Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| WebView2 ausente/desactualizado en equipos sin red | Distribuir bootstrapper offline incluido en el instalador; probar en VM limpia |
| Rendimiento de capas CSS en equipos modestos | Benchmark previo (criterio 4); degradación a imagen estática con movimiento reducido |
| Curva de aprendizaje de Rust en el equipo | Comandos Tauri acotados y tipados; la lógica sensible es pequeña y verificable |
| Licencias de datos cartográficos | Verificación individual previa (PEND-04); fallback local sin teselas remotas |
| Deriva entre contrato editorial y app | Los esquemas y el validador canónicos ya operativos (42/42) y la importación §6.5.10 demostrada |

### Contingencia

**Godot 4** solo se reconsiderará con **evidencia comprobable de incapacidad esencial** de accesibilidad, rendimiento o experiencia del stack propuesto (encargo §5.2). La evidencia se produciría con los mismos criterios de validación (1–5). Electron y WPF/WinUI quedan descartados en esta fase por tamaño/seguridad y por no alinear con el contenido web del contrato.

### Consecuencias

Si se aprueba, FASE 1 arrancará con el sistema vertical mínimo (una escena end-to-end del episodio de los molinos con datos de la precarga importada), no con módulos aislados. Este ADR se revisará tras los criterios de validación; los cambios requieren nuevo ADR, no ediciones silenciosas.

---

## Registro de decisiones relacionadas

- Contrato editorial-técnico v0.2.0 (42/42 PASS) e importación real de la precarga: `docs/CONTRATO_EDITORIAL_TECNICO.md`, `docs/INTEGRACION_PRECARGA.md`.
- Los ADRs 0002–0004 se redactarán en cuanto el propietario apruebe el GO/NO-GO; sus decisiones no bloquean la presentación.

---

## ADR-0005: Entidades de beat e intervención narrativa (R09/R11, DC-22)

- **Fecha:** 2026-11-06 · **Estado:** Propuesto — doble firma editorial pendiente (la decisión de dirección es del propietario: DC-22/TS-001).
- **Contexto:** la hoja de ruta del Modo Historia (R09/R11) exige representar las intervenciones narrativas (narrador y personajes) con el **texto visible como elemento principal del contrato** y el audio como recurso opcional asociado (decisión de coordinación del propietario). La biblia narrativa §4 contiene la propuesta semántica de beat/intervención «a convertir en JSON Schema por ambos equipos»; CONTENIDOS ya produce el dato fuente (`dialogos_literales` en `docs/data/inventario_literario_p1_c08.json`, 25 intervenciones de I.8, y ficha de escena con 16 beats TS-001).
- **Decisión:** contrato **v1.1.0 (MINOR, retrocompatible)** con dos entidades:
  1. **Beat** (`DQ.BEAT.NNNNNN`, `schemas/content/beat.schema.json`): unidad de reproducción dentro de una escena — `kind` (NARRACION/DIALOGO/ACCION/SILENCIO), `order` único por escena, `utterances[]`, `visual_asset_ids[]` (**mínimo 1 perspectiva**: desviación de la biblia §4 **pendiente de doble firma editorial-técnica** — corrección de la reauditoría H5: no atribuible al propietario), `manual_advance_allowed`, `replay_allowed`, `reduced_motion_fallback` (siempre true), trazabilidad inversa `unit_ids[]`.
  2. **Intervención** (anidada; ID global `DQ.INT.NNNNNN` único): `speaker` ({tipo: narrador|personaje, person_id}), **`texto_visible` obligatorio e íntegro** (TS-001), `text_kind` (CITA_LITERAL/ADAPTACION_FIEL/NARRACION_ENLACE — las dos primeras exigen `passage_ids`), `audio_asset_id` opcional (MediaAsset de función `voz`, nuevo valor de enumeración), `localizador`, `nota_editorial`.
- **Alternativas consideradas:** (a) intervenciones como fichas independientes del paquete — rechazada: rompe la cohesión de reproducción del beat y multiplica ficheros sin beneficio; (b) `speaker_id` como cadena libre («narrador» o PER id) — rechazada: objeto tipado validable (el id suelto mezclaba dos dominios); (c) `visual_asset_ids` opcional como en el ejemplo de la biblia — rechazada: contradice la tabla del propietario («una o varias perspectivas»); (d) versionar todo a 2.0.0 — rechazada: no hay ruptura, MINOR basta.
- **Consecuencias / reglas R11 ya activas en el validador:** referencia rota se rechaza (scene/media/person/pasaje/audio fantasma → REFERENCE_ERROR); **audio sin texto es estructuralmente imposible** (texto_visible exigido en toda intervención); audio existente debe tener formato de voz (mp3/ogg) y función `voz`; `utterance_id` y `order` únicos; `contract_version` pasa a enum {1.0.0, 1.1.0} — los registros antiguos siguen válidos.
- **Mapeo desde el dato editorial (para la conversión futura):** `dialogos_literales[]` del inventario → intervención: `speaker_id: null` → `{tipo: narrador}`; `speaker_id: DQ.PER.*` → `{tipo: personaje}`; `texto` → `texto_visible`; `passage_id` → `passage_ids[]`; `locador.anchor` → `localizador`; `motivo_conservacion` → `nota_editorial`; `text_kind` → `CITA_LITERAL` (los diálogos del inventario son extractos verbatim).
- **Reproductor (R10):** solo especificación de consumidor en `docs/COMPONENTES_NARRATIVOS_UX.md` — **sin implementación en este encargo**, como ordena la hoja de ruta.
- **Addendum 2026-11-06 — subsanación del dictamen H5 (Coordinación):**
  - **P0-1:** eliminado `AVANCE_BLOQUEADO`; nuevo invariante: ninguna ruta de avance depende del audio (sub-estado `ESPERA_DE_VOZ` solo mientras hay voz sonando; sin voz, avance manual siempre disponible).
  - **P0-2:** política de autoavance cinematográfico (DC-21) definida: `max(voz, lectura_mínima)` con fórmula parametrizable por el piloto; el fin de la voz nunca oculta texto ni avanza por sí solo. Nuevos campos opcionales de beat: `avance_automatico` (bool|null) y `lectura_minima_ms`.
  - **P1-1:** `manual_advance_allowed`/`replay_allowed` re-semanticizados como sugerencias de ritmo; los cuatro controles existen siempre.
  - **P1-4:** la ejecución nunca gatea el texto por imágenes (fallback en cascada); `visual_asset_ids ≥ 1` se mantiene en el dato **marcado como pendiente de doble firma** (ya no como decisión del propietario).
  - **P1-5:** triada `texto_visible` / `incisos_narrador` / `texto_oral` con la semántica exacta de FICHA_ESCENA_P1_C08 §3 y regla verificable: ningún inciso en `texto_oral`.
  - **P1-6:** `texto_visible` rechaza solo-espacios (`pattern: \S`) sin normalizar el contenido (fidelidad de citas).
  - **Reauditoría H5 (2026-11-06):** (a) `incisos_narrador` presentes ⇒ `texto_oral` **obligatorio** — sin él, la voz leería verbatim un texto que contiene incisos del narrador («—respondió Sancho—»); (b) `lectura_minima_ms` mínimo 1 y **solo eleva** el suelo de la política §2.3 (≥1500 ms) — nunca lo rebaja, con o sin audio; (c) corregida la atribución antigua de la imagen mínima por beat (ver decisión 1).

## Política transversal de correcciones y reutilización

**Norma permanente de Dirección; vinculante para el desarrollador único.** Esta política no aprueba por sí sola un cambio de stack, nuevos esquemas ni producción fuera de la Fase 1. Se aplica junto con DC-23–DC-28 y con la [regla de AGENTS](../AGENTS.md#regla-permanente--correcciones-transversales-y-reutilización).

### Alcance y ubicación de la solución

- **Diagnóstico por capas:** (1) fuente/asset y licencia; (2) metadatos editoriales y contrato; (3) resolvedor de medios/encuadres; (4) primitivas y layouts compartidos; (5) consumidor de módulo; (6) estilos específicos. Localizar la causa real antes de editar. No usar CSS para «reparar» una fuente que ya viene recortada, ni alterar citas/rondas por un problema visual.
- **Principio de reutilización:** modificar el nivel compartido más bajo que sea semánticamente correcto y comprobar todos sus consumidores. Preferir un único sistema de composición (p. ej. `ContenedorCine` y descriptores comunes), tokens, patrones y políticas de medio. Evitar componentes por ID, reglas `if (round_id)`, rutas especiales o CSS condicionado a nombres de archivo.
- **Contratos declarativos:** diferencias legítimas se representan mediante categorías de medio, `fit_mode`, punto focal y zona segura **solo si existen en el contrato vigente**. Si falta un campo, proponerlo y revisar compatibilidad, validadores, datos existentes y aceptación de Dirección **antes** de cambiar esquemas o el catálogo; no incorporar campos inventados a producción unilateralmente.
- **Tipos de recursos:** imagen patrimonial/acuarela: integridad y proporciones (`contain` o equivalente); escena cinematográfica: encuadre flexible solo si ningún protagonista, gesto, acción u objeto esencial queda cortado u oculto. Validar imagen fuente y resultado real en viewport. Los hotspots se proyectan sobre el rectángulo efectivamente representado, descontando márgenes y escalados.
- **Layout y contenido:** preservar texto completo, controles, foco, alternativas y contraste; overlays cinematográficos sin scroll conforme a DC-28, panel ampliado voluntario cuando proceda. No sustituir scroll por truncamiento, `overflow: hidden`, tipografía ilegible ni scroll global. El Lector, el catálogo de Museo y otras vistas extensas pueden utilizar desplazamiento accesible cuando su propósito funcional lo requiere.
- **Coordinación:** revisar Aventura, Historia, Museo, Atlas, Lector, Cuaderno, inicio/menús y ajustes; registrar qué usa realmente el componente, qué comparte solo tokens y dónde corresponde una excepción. No forzar una única disposición visual donde se necesiten interacciones distintas.

### Contrato de cambio para una PR correctiva

Registrar una pequeña **matriz de impacto**: `defecto → causa → regla/componente común → consumidores → pruebas → excepción/pendiente`. Demostrar por lo menos el caso original y casos representativos de consumidores adicionales, según [QA §9](PLAN_QA_Y_ACEPTACION.md#9-gate-de-impacto-transversal-para-correcciones). Si no existen pruebas o evidencias suficientes, el estado es `PENDIENTE`, nunca `PASS`. Mantener separados la mejora arquitectónica documentada, su implementación real y su aceptación.

**Criterio de cierre:** la solución escala a los 126 capítulos por reglas y datos, sin replicar parches por capítulo; queda documentado el alcance funcional y no hay regresiones conocidas sin registrar.
