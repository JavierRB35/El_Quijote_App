# PLAN DE QA Y ACEPTACIÓN

**Estado:** PENDIENTE — entregable FASE 0 (encargo §8, punto 10)
**Modo responsable:** DESARROLLO (QA y automatización / release manager)
**Última actualización:** 2026-11-05

## Alcance previsto

- Estrategia de pruebas por capas: contratos editoriales (casos negativos §6.3.7), unidad, integración, UI, offline, accesibilidad (encargo §5.2 tabla QA).
- Herramientas de referencia: Vitest, React Testing Library, pruebas Rust, Playwright para UI web **más smoke/e2e nativo real en Windows con instalador y WebView2** (§5.2.9: Playwright web no basta para afirmar que funciona el ejecutable).
- Criterios de aceptación funcionales: §7.2 (instalación offline completa de un episodio, aislamiento de perfiles, lector, tipos de pregunta, atlas/museo sin red, no revelado por imagen previa…).
- Persistencia y seguridad: §7.3 (autoguardado, copia única verificada, actualizaciones con consentimiento, EPUB como contenido no confiable).
- Prueba integral de caja negra con perfiles de jugador inventados desde cero (§7.4).
- Criterios de salida de cada fase y evidencia verificable de calidad (§8).
