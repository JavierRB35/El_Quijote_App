# ARQUITECTURA Y ADR

**Estado:** EN REDACCIÓN — entregable FASE 0 (encargo §8, punto 6)
**Modo responsable:** DESARROLLO (director técnico/arquitecto principal)
**Última actualización:** 2026-11-05

## Índice de ADRs

| ADR | Título | Estado |
|---|---|---|
| [ADR-0001](#adr-0001-selección-del-stack-técnico-base) | Selección del stack técnico base | **Propuesto** — requiere aprobación del propietario |
| ADR-0002 | Estrategia de almacenamiento local y separación catálogo/perfil | Pendiente |
| ADR-003 | Distribución de medios pesados (Git LFS vs. releases) | Pendiente — depende de PEND-05 |

---

## ADR-0001: Selección del stack técnico base

- **Estado:** Propuesto (encargo §2.6 y §5.2). No autoriza por sí misma a escribir código de aplicación.
- **Contexto:** aplicación documental interactiva con escenas 2.5D, lector EPUB completo, gran catálogo estructurado, museo y atlas offline; sin necesidad de motor 3D ni físicas; Windows 11 x64 primero, instalador offline real.
- **Decisión propuesta:** Tauri 2 (escritorio, permisos, instalador) + React/TypeScript/Vite (UI) + Rust con comandos Tauri tipados (operaciones sensibles) + SQLite/FTS5 (catálogo) y SQLite separada (datos privados) + epub.js (visualización; texto indexable vía contrato editorial) + MapLibre GL JS + PMTiles local (atlas offline) + HTML/CSS y Web Animations API para escenas; audio con HTMLMediaElement/Web Audio. Pipeline editorial en Python + JSON Schema.
- **Criterios de validación antes de aprobar:** pruebas FTS5 con castellano original y modernizado; verificación de PMTiles por protocolo seguro/rangos y licencias; comprobación del modo WebView2 offline en VM limpia (PEND-07); benchmark de escena representativa antes de añadir cualquier motor 2D adicional (encargo §5.2.3).
- **Contingencia:** Godot 4 solo con evidencia comprobable de incapacidad esencial de accesibilidad, rendimiento o experiencia.
- **Consecuencias:** Riesgos — WebView2 en instalaciones sin red; rendimiento de capas CSS en equipos modestos; licencias de datos de mapas. Mitigaciones — smoke/e2e real en Windows con instalador (no solo Playwright web, §5.2.9); fallback local sin WebGL2 (§5.2.4).
