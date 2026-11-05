# MATRIZ DE TRAZABILIDAD — Entregable FASE 0.2 (encargo §8)

**Modo:** CONTENIDOS (redactor) — filas técnicas marcadas para su asunción por DESARROLLO/COORDINACIÓN.
**Fecha:** 2026-11-05 · Convención: requisito → responsable → dónde vive → prueba de aceptación.

Estado: `✔` implementado con evidencia · `◐` borrador/proposal · `○` pendiente (bloqueado o de otro modo).

## A. Contenidos editoriales

| Req. (encargo) | Responsable | Archivo / entidad | Prueba de aceptación | Estado |
|---|---|---|---|---|
| §2.5 Auditoría real del EPUB Tusell | CONTENIDOS | `docs/INVENTARIO_ILUSTRACIONES_TUSELL.md`, manifiestos CSV/JSON | 376 acuarelas con hash, dims, capítulo y alt; 0 huérfanas/0 duplicados; reproducible con script | ✔ |
| §4.7.3 Originales sin retoque + trazabilidad | CONTENIDOS | `assets/ilustraciones_tusell/` | Copia byte a byte (sha256 en manifiesto); derivados futuros con hash propio | ✔ |
| §8.3 Mapa de episodios y capítulos | CONTENIDOS | `docs/MAPA_EPISODIOS_Y_CAPITULOS.md`, `docs/data/mapa_capitulos.json` | 126 capítulos con título real y recuento; agrupación marcada como propuesta | ✔ |
| §8.4 Plan editorial de 6 capítulos | CONTENIDOS | `docs/PLAN_PILOTO_EDITORIAL_SEIS_CAPITULOS.md` | Muestra justificada con datos; métricas y criterios de salida definidos | ✔ |
| §6 Contrato editorial-técnico | AMBOS | `docs/CONTRATO_EDITORIAL_TECNICO.md`, `/schemas/` | Validador 37/37 PASS; revisión técnica pendiente | ◐ |
| §4.3 Requisitos de cada pregunta | CONTENIDOS | `schemas/content/question.schema.json` | Los 6 tipos con respuesta seleccionada; caso negativo «respuesta escrita» falla | ◐ |
| §4.4 Cápsulas de descubrimiento | CONTENIDOS | `schemas/content/discovery.schema.json` | kind + certainty + bibliography; cita/refrán exige pasaje (semántica) | ◐ |
| §2.4/4.5 Atlas con certeza tipada | CONTENIDOS | `schemas/content/place_route.schema.json` | status/precision/geometry; rutas nunca como hecho (DC-08) | ◐ |
| §2.4/4.6 Museo con ficha y licencia | CONTENIDOS | `schemas/content/museum_item.schema.json` | attribution con grado; sin atribuciones inequívocas de anónimos | ◐ |
| §8.2 Matriz de trazabilidad | CONTENIDOS | este documento | Revisado en cada entrega; filas técnicas se cierran con DESARROLLO | ◐ |
| PEND-01 Edición de referencia | CONTENIDOS | `docs/PLAN_PILOTO...` §3 | Selección documentada con URL, derechos y fecha de consulta | ○ |
| PEND-09 Fechas de Tusell / ficha Epublibre | CONTENIDOS | `docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md` | Fuente autoritativa con cita | ○ |

## B. Derechos y activos

| Req. | Responsable | Archivo / entidad | Prueba de aceptación | Estado |
|---|---|---|---|---|
| §4.7.8 Medios sin derechos ≠ repositorio remoto | CONTENIDOS | `docs/DERECHOS_Y_PROCEDENCIA*.md`, GOBERNANZA §5 | Excepción Tusell documentada con orden del propietario; resto excluido por .gitignore | ✔ |
| §2.5 Clases de evidencia (histórica/foto/recreación) | AMBOS | `media_class` en media_asset.schema | Enum cerrada; ROTULACIÓN por clase exigida en pantalla | ◐ |
| §6.4 Mecanismo LFS vs releases | DESARROLLO | PEND-05 | Decisión + prueba de clonado/instalación | ○ |
| BVPB como fuente oficial CC BY de la ed. 1905 | CONTENIDOS | expediente derechos | Registro 463832 citado con fecha de consulta | ✔ |

## C. Desarrollo (filas para DESARROLLO — no cerradas desde CONTENIDOS)

| Req. | Responsable | Archivo / entidad | Prueba de aceptación | Estado |
|---|---|---|---|---|
| §5.2 ADR del stack Tauri 2 | DESARROLLO | `docs/ARQUITECTURA_Y_ADR.md` | ADR con comparación Godot 4 y riesgos offline | ○ |
| §5.3 Separación catálogo/activos/perfil | DESARROLLO | arquitectura | Prueba de actualización de catálogo sin tocar perfil | ○ |
| §5.2 FTS5 castellano áureo | DESARROLLO | índice búsqueda | Búsqueda con «á»/«sabia» y ortografía 1905 | ○ |
| §2.7 Perfiles + backup atómico | DESARROLLO | storage | Restauración demostrable tras fallo simulado | ○ |
| §7.3 Claves IA en almacén seguro | DESARROLLO | security | Ningún secreto en repo/backup/logs (grep del release) | ○ |
| §7.2 Instalación offline en VM limpia | DESARROLLO + QA | instalador | Recorrido completo sin red | ○ |
| §7.4 Prueba de caja negra con usuarios | QA | plan de pruebas | Guiones por perfil de jugador; problemas registrados | ○ |
| Consumidor técnico del paquete editorial | DESARROLLO | importer | Integración sin preguntas improvisadas (criterio §9) | ○ |

## D. Coordinación / control

| Req. | Responsable | Archivo | Prueba de aceptación | Estado |
|---|---|---|---|---|
| §8.1 Documento maestro + registro de decisiones | COORDINACIÓN | `docs/ENCARGO_MAESTRO.md`, `VISION_Y_DECISIONES.md` | Tabla cerradas/provisionales/pendientes actualizada por entrega | ✔ |
| §6.5.3 Esquemas propiedad conjunta | AMBOS | `/schemas/` | Todo cambio de esquema con ADR + doble revisión | ◐ |
| §8 GO/NO-GO FASE 0 | PROPIETARIO | presentación final | Los 11 entregables presentados; sin aprobación no se ejecuta | ○ |
