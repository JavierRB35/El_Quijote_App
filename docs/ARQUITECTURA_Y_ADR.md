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
