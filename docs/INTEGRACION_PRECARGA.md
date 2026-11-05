# INTEGRACIÓN REAL §6.5.10 — Precarga editorial → contrato canónico

**Fecha:** 2026-11-05 · **Modo responsable:** DESARROLLO (ingestión técnica)
**Objeto:** consumir el paquete representativo producido por el equipo editorial (`docs/data/piloto_precarga.json`, FASE 0.5) mediante el contrato canónico **sin reescritura manual ni preguntas improvisadas** (criterio de excelencia del encargo §9).

## 1. Resultado

| Métrica | Valor |
|---|---|
| Registros importados | **73** (1 episodio, 14 personajes, 5 lugares, 14 descubrimientos, 1 edición, 7 capítulos, 11 pasajes, 13 medios, 3 fuentes, 1 licencia, soportes) |
| Validación canónica (`validate.py package`) | **VÁLIDO** — 0 errores tras el mapeo |
| Suite principal del contrato | 42/42 PASS (sin regresión) |
| Herramienta | `tools/editorial_validation/importar_precarga.py` (determinista, re-ejecutable) |
| Salida | `tests/contracts/integration_precarga/` (paquete + manifest; **material de prueba, no publicable**) |

## 2. Cuestionario de verificación previa (lección de honestidad)

Antes de acusar un defecto de datos se verificó por **bytes crudos** que las citas verbatim de la precarga están en UTF-8 impecable («—¿Qué gigantes?…», tipografía de diálogo de la ed. Tasso). El aparente «mojibake» era **un artefacto de la consola local**, no del fichero. **No hay incidencia de codificación**; se registra aquí para que la falsa alarma no vuelva a plantearse.

## 3. Hallazgos y decisiones de mapeo

### 3.1 Defectos del CONTRATO canónico corregidos (la integración valida en ambos sentidos)

| Hallazgo | Corrección (MINOR, v0.2.0) |
|---|---|
| El encargo §4.5 lista «patrimonio asociado» como tipo de lugar; el esquema canónico lo había omitido. La precarga lo usaba correctamente | `place.status` añade `patrimonio_asociado` |
| Topónimos literarios amplios («La Mancha») son reales pero **no geolocalizables con honradez**; la precarga no traía geometría | `place.geometry` admite `null` con nota de pendiente (prohibido inventar coordenadas) |
| El paquete de escenas usa imágenes de referencia artística sin fase narrativa | `MediaAsset.function` añade `referencia` |

### 3.2 Normalizaciones aplicadas en importación (a alinear por el equipo editorial en producción)

| Divergencia precarga (borrador 0.1) | Decisión canónica | Nota |
|---|---|---|
| IDs `DQ.PER.000001` (6 dígitos), `DQ.LOC.000001`, `DQ.A.000002`, `DQ.IL.0026`, `DQ.MED.900005` | `DQ.PER.0001`, `DQ.LOC.0001`, `DQ.DIS.000002`, `DQ.MA.000026`, `DQ.MA.900005` | Convensión v0.2.0 §0; mapeo mecánico e irreversible solo en sentido 0.1→canónico |
| Episodio `DQ.P1.E04` | `DQ.P1.C08.E04` (anclado al primer capítulo) | Los IDs del MAPA siguen provisionales hasta formalizar episodios |
| Pasajes `DQ.P1.C08.PS001` | `DQ.P1.C08.P0001` | Numérico uniforme |
| Tipos de cápsula `humor`, `curiosidad`, `recepcion` | `humor_escena`, `curiosidad_recepcion` | Vocabulario de §4.4; el kind original se conserva en `notes`. **Pendiente de doble firma decidir el vocabulario definitivo del productor** |
| `bibliography` con texto libre («BVPB registro 463832…») | IDs `DQ.SRC.*` (heurística BVPB/Tasso→0002, Epublibre/EPUB→0001) | El texto original se preserva en `notes`; las referencias no reconocibles se marcan, nunca se inventan |
| `speaker` como texto («Sancho Panza y don Quijote») | objeto `{label}` | La vinculación a `DQ.PER.*` es editorial posterior |
| `condition_display: tras_capitulo` | `appearance.moment: desenlace` | Original conservado en `notes` |
| `appearance_chapter_ids` en personajes | `appearances` por episodio + capítulos en `notes` | Semántica del contrato §6.2 |
| Relaciones `target_id` | `person_id` | Renombre de campo |

### 3.3 Soportes sintetizados (honestos y marcados)

- `DQ.ED.0001`: edición EPUB Tusell **provisional** (`rights_status: pendiente`, PEND-01) con el **SHA-256 real** del EPUB.
- Capítulos del piloto + `DQ.P1.C09` (el episodio lo atraviesa aunque no sea del piloto — defecto de cobertura detectado y corregido en la herramienta): títulos reales desde `mapa_capitulos.json`.
- Pasajes: placeholders explícitos «pendiente de capa textual (PEND-01)» — nunca texto inventado.
- `DQ.SRC.0001/0002/0003` y `DQ.LIC.0001` según el expediente de derechos de CONTENIDOS (uso interno + repo privado autorizados por el propietario; **redistribución prohibida**).
- `DQ.MED.9000NN`: mapeo pendiente al manifiesto de escenas (`assets/scenes/manifest.json`), URI marcada como pendiente.
- Comprobación de existencia física de cada acuarela referenciada (`assets/ilustraciones_tusell/acuarelas/NNN.jpg`) con aviso si falta.

## 4. Pendientes que la integración deja señaladas

1. **Batería de preguntas** (rama `feature/cont-escenas-bateria-02`): cuando exista, se importa con el mismo adaptador; las reglas de pregunta son las más estrictas del contrato (§4).
2. Alinear el **vocabulario de kinds** de cápsulas y los nombres de campo del productor editorial con la v0.2.0 (o ajustar el contrato en doble firma).
3. Completar geometrías de lugares con fuentes (PEND-03/04) — hoy `null` honesto.
4. Formalizar episodios del piloto (IDs definitivos anclados) y sus `spoiler_flags`.
5. Capa textual real para pasajes (PEND-01) — hoy placeholder.

## 5. Conclusión para GO/NO-GO

La vía contrato → esquemas → validador → importador → paquete validado **funciona de extremo a extremo con datos reales de ambos equipos**. El cuello de botella detectado no es técnico sino de **vocabulario compartido**, y está acotado a una tabla de mapeo explícita pendiente de doble firma.
