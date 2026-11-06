# R05 — Matriz consolidada de aprovechamiento visual

**Modo:** COORDINACIÓN / AUDITORÍA · **Prioridad:** P0 · **Fecha:** 2026-11-06.  
**Fuente de verdad:** `main@66d2f7d3a5c6a28b18fdc7cce5148375d277e21f`. Rama de entrega `feature/r05-consolidacion-maestra-visual`. **Estado:** documentación de coordinación, SIN nuevas aprobaciones ni migraciones.  
**Entradas:** PR #22 (R05), #25 (R15), #26 (R16), #27 (R12), todas integradas en `main` antes de este corte.

## 1. Modelo de consolidación y límites

El CSV `docs/data/vinculos_visuales_consolidados.csv` tiene **una fila por combinación imagen–destino–fase–destinatario–acción**. Un mismo fichero puede tener diferentes vínculos a capítulos, pasajes, preguntas, lector, museo, descubrimientos, cuaderno o Historia. **No es un segundo inventario físico**: el único inventario de ficheros sigue siendo `docs/data/matriz_aprovechamiento_visual.csv` (678 rutas).

Se despliegan los destinos múltiples de R05 (p. ej. `cuaderno / museo`) y R16 (`LECTOR_MUSEO`) en vínculos de destino independientes. Se conservan sus textos originales en `fase_o_politica_fuente`, sus justificaciones y referencias de origen; las claves son editoriales **temporales** (`R05C-######`) y **no son** `MediaBinding` ni IDs de contrato. Si varias fuentes describen exactamente el mismo recurso + destino + fase + destinatario + acción, se integran en **una fila** con varias evidencias; no se comprimen destinos diferentes por parecerse.

**Tres acciones:** `PROPUESTA_USO` (candidatura NO aprobada), `EVITAR_USO` (R15 pide no usar la imagen actualmente asignada como foco: no es una relación positiva), y `REFERENCIA_SIN_BINARIO` (QBI 10485; solo ficha de metadatos, sin recurso dentro de `assets/`). La inclusión de una decisión negativa o una ficha externa **no implica** que se haya creado un asset para el consumidor ni que deba renderizarse. Aun en filas `PROPUESTA_USO`, el campo `estado_aprobacion_destino` permanece `NO_APROBADO_PROPUESTA_DOCUMENTAL`.

## 2. Cobertura de las fuentes recibidas

| Fuente | Registros fuente procesados | Tratamiento |
|---|---:|---|
| R05 / PR #22 | 678 imágenes y 1973 propuestas por ranura de destino | Se desplegaron destinos compuestos y se conservaron ruta, hash, clase, fase y contexto |
| R15 / PR #25 | 97 filas; 74 preguntas | 54 propuestas visuales y 43 decisiones de no imagen; piloto y precarga claramente separados |
| R16 / PR #26 | 68 propuestas culturales | 67 vinculadas a `assets/`; una ficha QBI externa sin binario; destinos culturales desglosados |
| R12 / PR #27 | 678 fichas QA | **27** inspecciones visuales; **651** sin inspección; se adjunta dictamen, TS-001, corrección y riesgo por ruta |

**Resultado consolidado:** **2805 filas de vínculos/decisiones**, de ellas **2760** propuestas de uso, **43** decisiones de evitar imagen y **2** referencias externas sin binario. **678/678** rutas internas distintas aparecen en al menos un vínculo de origen R05. **5** filas combinan referencias de origen duplicadas de misma clave. No se proclaman relaciones aprobadas.

**Prioridad por relación:** **238** filas vinculadas a los seis capítulos del piloto (I.6, I.8, I.11, I.18, II.1 y II.74); las restantes se reservan documentalmente. Incluir las propuestas R05 para imágenes ya existentes en capítulos fuera del piloto **no constituye producción ni autorización de ampliar a los 126 capítulos**.

## 3. Resolución de identidades sin migrar

**Regla jerárquica de cruce:** 1) ID `DQ.MA.*` solo cuando existe una ficha MediaAsset con URI/hash del archivo; 2) `DQ.MED.*` / `DQ.IL.*` / `DQ.DEC.*` por ID exacto de manifiesto; 3) ruta física exacta y SHA-256 declarado para R16 y QA; 4) marcar ambiguos y discrepancias, nunca inventar alias ni renumerar. Hashes **declarados**, no recalculados de bytes.

Se han comprobado las **53 fichas MediaAsset del piloto** (27 acuarelas y 26 escenas) por su ruta `logical_uri` y SHA-256 de catálogo; **17 asignaciones `canonical_media_id_existing` de la matriz R05 eran falsas coincidencias numéricas** y apuntaban a otra imagen. Ejemplos clave:

| Origen / fichero | ID canónico correcto según URI/hash | ID que no debe inferirse |
|---|---|---|
| `DQ.MED.900231` · `p1_c08_molinos_siluetas_pre.webp` | `DQ.MA.900030` | `DQ.MA.900231` (nuevo alias no aprobado) |
| `DQ.MED.900029` · `p2_c01_recuperacion_pre.webp` | `DQ.MA.900038` | `DQ.MA.900029` (corresponde a frailes de I.8) |
| `DQ.MED.900030` · `p2_c20_bodas_camacho_pre.webp` | Sin ficha canónica existente | `DQ.MA.900030` (corresponde a siluetas de I.8) |
| `DQ.MED.900042` · `p2_c03_sanson_carrasco_pre.webp` | Sin ficha canónica existente | `DQ.MA.900042` (corresponde al testamento II.74) |
| `DQ.MED.900230` · `p1_c06_cura_barbero_libros_pre.webp` | `DQ.MA.900028` | `DQ.MA.900230` (nueva alta/alias sin justificar) |

En las filas del CSV el `media_asset_existente_uri_verificada` prevalece sobre cualquier número histórico; `id_numerico_en_colision` deja explícito el alias peligroso. **No se han alterado los 53 registros, ningún JSON de esquema ni los manifiestos.** Los 39 decorativos sin ficha no reciben un ID por mera homonimia.

## 4. Reglas de prioridad para el piloto

1. **I.8 — Molinos / Q.112:** `026.jpg` visualmente corresponde al aspa; `027.jpg` representa frailes y **no** sirve para el hotspot de molino. R15 propone 026 en `question_focus`; R12 exige `reveal`/después de embestida. Es conflicto de fase **P0**, no aprobación de 026 en foco. Verificar geometría real, texto, opción accesible y orden de beats. Conservar escenas de siluetas → molinos previos → caída posterior.
2. **I.6 — Escrutinio:** `025.jpg` muestra quema de libros; R12 recomienda probarla en fase posterior I.6–I.7 antes de generar nuevas imágenes, conservando ubicación real de EPUB en I.7.
3. **I.18 — Rebaños:** `DQ.MA.900008` revela ovejas; evitar imagen específica cuando la pregunta exige descubrir identidad. Usarla como revelación solo tras responder, con panel TS-001 externo.
4. **II.74 — Final:** `DQ.MA.900011` y `900042` son escenas posteriores. No trasladarlas a la fase previa por el valor artístico de la imagen; revisión especial de spoilers críticos y legibilidad.
5. **I.11 y II.1:** aprovechar escena, lector y acuarelas solo donde la relación con pasaje/beat esté verificada. No deducir capítulo a partir del número `DQ.MED` ni de una ilustración decorativa.
6. **R16 lector/museo/atlas:** el lector contextualizado y el museo con atribución pueden reutilizar acuarelas y escenas, pero la edición Tusell no constituye evidencia material histórica; el mapa QBI 10485 **es ficha bibliográfica, no archivo offline ni ruta probada**.

## 5. QA R12 y derechos

R12 examina **678 rutas**, pero abrió visualmente **27**: PASS visual limitado 6, FAIL de asignación 1 (027/Q112), PENDIENTE 671. **Ningún PASS visual equivale a aprobación editorial, jurídica o de integración.** Para TS-001, nueve escenas observadas tienen motivos significativos centro/derecha; no dar por segura la sugerencia de superposición `right`. Los diez primeros planos mantienen identidad pero divergen en estilo de fondo; R06 debe decidir retrato independiente. Los SHA-256 declarados no se han recalculado por bytes; nueve escenas carecen de hash en R05 y la similitud perceptual no está auditada. Los alt de 50 escenas y cinco decorativos requieren revisión.

Todas las propuestas sobre recursos Tusell están sujetas al expediente de derechos: uso privado documentado no equivale a licencia para redistribuir. Las recreaciones IA deben rotularse. En R16, QBI no puede incorporarse al repositorio ni al instalador por esta propuesta. Responsables por fila en CSV; ninguna aprobación humana externa se presume.

## 6. Indicadores honestos

| Control | Resultado |
|---|---|
| Cobertura documental R05 | 1973/1973 propuestas + 678/678 rutas |
| Cobertura documental R15 | 97/97 decisiones fuente |
| Cobertura documental R16 | 68/68 propuestas fuente |
| R12 vinculado por ruta | 678/678 |
| Filas consolidadas | 2805 (incluye decisiones negativas y referencia externa) |
| Conflictos/incidencias individualizados | 26 en `INFORME_CONFLICTOS_VINCULOS_VISUALES.md` |
| Colisiones numéricas R05 | 17 |
| Cruces R05/R12 con discrepancia de ruta/hash declarado | 0 |
| Usos editoriales aprobados nuevos | **0** |
| KPI-3 uso efectivo / KPI-4 cero errores | **No verificables** sin relaciones aprobadas y pruebas de runtime |

## 7. Discrepancia histórica separada: **697 vs 678**

La cifra **697** corresponde a una referencia histórica de matriz XLSX; **678** es el conjunto de rutas físicas de `assets/` auditadas en el corte R05/R12. La diferencia aritmética es **19**, pero no se puede atribuir a desaparición, derivados, reutilizaciones ni filas repetidas sin abrir `docs/MATRIZ_IMAGENES_2026-11-06.xlsx` y `docs/BANCO_IMAGENES_REPOSITORIO.xlsx`, preservar sus hojas/fechas/IDs y hacer cruce de claves. **No se suma 697 al universo de vínculos ni se crean 19 assets ficticios.** Incidencia documental **P0 ABIERTA** que no invalida la conciliación de 678 rutas actuales.

## 8. Puertas para integración posterior (fuera de este PR)

- R01/R03: validar episodios y beats, pasajes y spoilers de cada uso prioritario; resolver Q.112 antes de cualquier prueba de hotspot.
- R05/R06: validar contenido visual, continuidad y zonas TS-001 por asociación y escala; no convertir recomendaciones en aprobación tácita.
- R13: cerrar derechos individualizados por medio y destino; separar Git privado de redistribución.
- R09/desarrollo: acordar alias/contrato con cambios versionados en otro PR, sin hardcodear ni sustituir esquemas con este CSV.
- R12/QA: probar consumidor offline y antiespoiler en la aplicación, teclados y textos visibles, completar 651 inspecciones visuales si se exige cobertura gráfica exhaustiva.
- Coordinación: cerrar conciliación XLSX 697/678, registrar resolución y recalcular métricas con aprobaciones verificables.

**Esta entrega solo modifica documentación CSV/Markdown. No modifica imágenes, binarios, manifiestos, código, esquemas, IDs ni catálogo ejecutable.**
