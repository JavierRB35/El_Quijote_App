# DOSSIER GO/NO-GO — FASE 0 (Auditoría y diseño)

**Fecha:** 2026-11-05 · **Preparado por:** COORDINACIÓN con aportes verificados de los modos DESARROLLO y CONTENIDOS
**Decisión solicitada al propietario:** aprobar la especificación auditada de FASE 0 y **autorizar la FASE 1 (piloto coordinado)**. Sin aprobación, todo queda detenido aquí (encargo §8, punto de control).

---

## 1. Los 11 entregables de FASE 0 — estado

| # | Entregable (encargo §8) | Dónde vive | Estado |
|---|---|---|---|
| 1 | Documento maestro de alcance + tabla de decisiones | `docs/ENCARGO_MAESTRO.md` (íntegro) + `docs/VISION_Y_DECISIONES.md` (17 cerradas, 7 provisionales, 9 pendientes; sin reaperturas) | ✔ |
| 2 | Matriz de trazabilidad | `docs/MATRIZ_TRAZABILIDAD.md` (secciones A/B de CONTENIDOS cerradas; sección C de DESARROLLO cerrada en esta sesión) | ✔ |
| 3 | Mapa de episodios y capítulos | `docs/MAPA_EPISODIOS_Y_CAPITULOS.md` + `docs/data/mapa_capitulos.json` (126 capítulos reales, ~87 episodios propuestos, estimación por método) | ✔ |
| 4 | Plan editorial de seis capítulos | `docs/PLAN_PILOTO_EDITORIAL_SEIS_CAPITULOS.md` (muestra justificada) + `docs/DOSSIER_PILOTO_EDITORIAL.md` + paquete real `content/piloto/` (12 preguntas, VÁLIDO) | ✔ |
| 5 | Catálogo de necesidades visuales + auditoría EPUB | `docs/CATALOGO_NECESIDADES_VISUALES.md` + `docs/INVENTARIO_ILUSTRACIONES_TUSELL.md` (415 imágenes auditadas con evidencia) | ✔ |
| 6 | ADR del stack | `docs/ARQUITECTURA_Y_ADR.md` — **ADR-0001 completo** con comparativa Godot 4/Electron/nativo y 5 criterios de validación empírica (la validación misma es de FASE 1) | ✔ (propuesto) |
| 7 | Primer contrato editorial-técnico | `docs/CONTRATO_EDITORIAL_TECNICO.md` **v0.2.0 — firmado por ambos equipos**; 15 esquemas canónicos; suite 42/42 PASS; integración real demostrada (`docs/INTEGRACION_PRECARGA.md`) | ✔ |
| 8 | Dirección artística y UX | `docs/DIRECCION_ARTISTICA_PILOTO.md` + `docs/UX_ACCESIBILIDAD.md` (principios y recorridos; los mockups finos son de FASE 1) | ✔ (nivel FASE 0) |
| 9 | Plan de producción y dimensionamiento | `docs/PLAN_PILOTO_EDITORIAL_SEIS_CAPITULOS.md` (métricas reales por pregunta/escena del piloto) + estimaciones con intervalo, sin cifras infladas | ✔ |
| 10 | Plan de pruebas y criterios de salida | `docs/PLAN_QA_Y_ACEPTACION.md` (completo, esta sesión) | ✔ |
| 11 | Registro de dudas bloqueantes | `docs/VISION_Y_DECISIONES.md` §3 (PEND-01…PEND-09) + `docs/RIESGOS_Y_PENDIENTES.md` | ✔ |

## 2. Pruebas objetivas que sostienen el GO

1. **El pipeline funciona de extremo a extremo con datos reales:** precarga editorial → importador → contrato canónico → VÁLIDO (73 registros); piloto I.8 con 12 preguntas reales (los 6 tipos de respuesta seleccionada) y 21 medios con sha256 → VÁLIDO verificado por ambos equipos (encargo §6.5.10, §9 criterio de excelencia).
2. **Suite de contrato: 42/42 PASS**, con 16 casos negativos que fallan como deben (sin respuesta inequívoca, cita sin pasaje, licencia desconocida, imagen previa reveladora, paquete incompatible…).
3. **Derechos documentados:** Tasso 1905 confirmado en BVPB (CC BY); expediente Tusell con incertidumbres honestas (PEND-09); nada de licencia desconocida dentro de paquetes.
4. **La decisión cerrada más sensible está protegida por máquina:** no existe ni puede existir un mecanismo de respuesta escrita (DC-04) — el contrato lo impide por esquema.
5. **Cero implementación del videojuego hasta ahora:** todo el trabajo es especificación, contrato y datos de prueba no publicables.

## 3. Lo que NO está resuelto (honestidad de informe)

| PEND | Cuestión | Por qué no bloquea el GO |
|---|---|---|
| PEND-01 | Edición textual de referencia definitiva | El piloto puede avanzar con la edición provisional EPUB Tusell y capa normalizada |
| PEND-03/04 | Licencias de fotografía/mapas, teselas PMTiles | Se verifican recurso a recurso en FASE 1, antes de incluir nada |
| PEND-05 | LFS vs. releases para medios pesados | Solo afecta a medios futuros grandes; las acuarelas ya tienen excepción autorizada |
| PEND-06/07 | Requisitos hardware y WebView2 offline | Son exactamente los criterios de validación de FASE 1 (ADR-0001) |
| PEND-09 | Fecha de muerte de Tusell, ficha Epublibre | Bloquea redistribución pública, no el uso interno (DC-11) |

## 4. Qué autoriza exactamente el GO (y qué no)

**Autoriza (FASE 1):**
1. El sistema vertical mínimo end-to-end: una escena del episodio de los molinos jugable en el ejecutable, con datos del piloto I.8, offline, con autoguardado.
2. Los 5 criterios de validación empírica del ADR-0001 (FTS5 castellano áureo, PMTiles local, WebView2 offline en VM, benchmark de escena, smoke nativo).
3. Producción editorial de los 6 capítulos del piloto con revisiones por lote y validadores.
4. QA con los 7 perfiles de caja negra y mediciones reales.

**NO autoriza:** producción completa del catálogo (FASE 2), distribución pública, comercialización, ni cambios de decisiones cerradas (DC-01…DC-17). El replanificado de alcance tras el piloto decidirá el tamaño real (DC-07).

## 5. Firma y registro

| Rol | Estado |
|---|---|
| Contrato editorial-técnico v0.2.0 | **Firmado** por CONTENIDOS (b1cb2fe) y consolidado por DESARROLLO |
| Este dossier | Pendiente de decisión del propietario: **GO** / NO-GO / GO con condiciones |

La decisión del propietario se registrará en `VISION_Y_DECISIONES.md` como DC-18 (GO FASE 1) o su equivalente, con fecha.
