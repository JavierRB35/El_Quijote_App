# El_Quijote_App

Videojuego premium para PC basado en las **dos partes completas de Don Quijote de la Mancha**, con equilibrio real entre aventura narrativa interactiva, preguntas de respuesta seleccionada, atlas geográfico, museo histórico-literario y cuaderno personal de investigador. Proyecto personal, no destinado a distribución pública ni comercial en su fase actual.

> **Documento rector:** [`docs/ENCARGO_MAESTRO.md`](docs/ENCARGO_MAESTRO.md) — especificación íntegra de producción editorial y desarrollo. Todo trabajo debe ser conforme a él.

## Estado del proyecto

**FASE 0 — Auditoría y diseño.** No hay implementación del videojuego, producción de contenido ni código de aplicación. La implementación requiere la aprobación expresa del propietario en el punto de control GO/NO-GO (encargo maestro, §8).

Trabajo autorizado en esta fase: estudio, inventario, diseño documental, estimaciones y propuestas de esquema.

**Entrega 2026-11-05 (modo CONTENIDOS):** auditoría y extracción reales del EPUB ilustrado — **376 acuarelas de Salvador Tusell + 39 elementos de edición** en [`assets/ilustraciones_tusell/`](assets/ilustraciones_tusell/), con manifiestos (CSV/JSON), [informe de inventario](docs/INVENTARIO_ILUSTRACIONES_TUSELL.md) y [expediente de derechos](docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md). Corresponde a la decisión DP-03 y resuelve PEND-02 (`docs/VISION_Y_DECISIONES.md`). Excepción de `.gitignore` documentada en [`docs/GOBERNANZA_GIT.md`](docs/GOBERNANZA_GIT.md) §5.

**Continuación 2026-11-05 (FASE 0, entregables 3, 4 y 7):** [mapa de episodios y capítulos](docs/MAPA_EPISODIOS_Y_CAPITULOS.md) generado desde datos reales (126 capítulos, ~87 episodios propuestos, `docs/data/mapa_capitulos.json`), [plan del piloto editorial de seis capítulos](docs/PLAN_PILOTO_EDITORIAL_SEIS_CAPITULOS.md) (I.8, I.6, I.11, I.18, II.1, II.74 — justificados) y [borrador 0.1 del contrato editorial-técnico](docs/CONTRATO_EDITORIAL_TECNICO.md) desde el lado editorial (espera revisión del equipo técnico). Edición Tasso 1905 confirmada en [BVPB registro 463832](https://bvpb.mcu.es/cervantes/es/consulta/registro.do?id=463832).

## Repositorio

- **Principal y única fuente de verdad:** `JavierRB35/El_Quijote_App` en GitHub (privado), rama `main`.
- Regla del propietario (2026-11-05): **GitHub debe estar siempre actualizado** — ver [`docs/GOBERNANZA_GIT.md`](docs/GOBERNANZA_GIT.md).
- Registro de decisiones cerradas/provisionales/pendientes: [`docs/VISION_Y_DECISIONES.md`](docs/VISION_Y_DECISIONES.md). No reabrir decisiones cerradas.

## Estructura del repositorio

Estructura candidata del encargo (§6.4), sujeta a validación y evolución:

```
/docs/       Especificaciones, contratos, ADR, gobernanza y planes
/schemas/    JSON Schema: content / media / player / manifests
/content/    Catálogo cultural versionado (solo lectura en ejecución)
/assets/     Activos audiovisuales (maestros fuera de Git hasta decidir LFS)
/app/        Aplicación: ui / domain / storage / native / accessibility
/tools/      Validación editorial, empaquetado, procesado de activos
/tests/      Contratos / content / unit / integration / ui / offline / accessibility
```

## Reglas inmediatas

1. **Nada de secretos, claves de IA, el EPUB privado del propietario ni datos personales en Git** (`.gitignore` lo aplica; encargo §2.7 y §6.5.11).
2. Los medios pesados no se suben hasta decidir el mecanismo (Git LFS vs. releases) según §6.4.
3. Toda entrega acaba en commit + push a `origin/main` (o PR según fase). Ver [`docs/GOBERNANZA_GIT.md`](docs/GOBERNANZA_GIT.md).
