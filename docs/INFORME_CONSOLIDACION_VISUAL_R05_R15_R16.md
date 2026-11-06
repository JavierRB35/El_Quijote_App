# R14 — Consolidación de R05, R15 y R16: matriz única de aprovechamiento visual

**Fecha:** 2026-11-06 · **Modo:** COORDINACIÓN / CONTENIDOS · **Estado:** propuesta documental para revisión, **sin autorización de integración**.  
**Fuente principal:** `docs/data/matriz_consolidada_aprovechamiento_visual.csv` · **Rama:** `feature/r14-consolidacion-visual-r05-r15-r16`.

## 1. Alcance y procedencia de datos

Se cruzaron **tres fuentes ya existentes**, sin alterar sus CSV ni los manifiestos originales:

- **R05:** `docs/data/matriz_aprovechamiento_visual.csv` (678 rutas físicas), derivada de snapshot de `main` `2e23b1cd27c764d946610716a4566a46ceda27cf`; contenido fuente con Git blob SHA `e90f603d09670ee6f29422c1b1823e63cae61a5b`.
- **R15:** `docs/data/propuesta_vinculos_visuales_preguntas.csv` (97 registros originales: 74 principales + 23 secundarios), Git blob SHA `13eef84cfa7e4cdcf645390de48c3e9c4afd051f`.
- **R16:** `docs/data/propuesta_vinculos_culturales_visuales.csv` (68 propuestas, 22 P1 / 46 P2), Git blob SHA `880eb2d4c18b67bac709950173a0158ca1d039a1`.

Se comprobaron las **53 fichas `content/piloto/media_assets/DQ.MA.*.json` existentes** por su `logical_uri` (27 acuarelas y 26 escenas). Por tanto, el ID canónico de salida se obtiene de la **URI física concreta registrada**, y **nunca** de una sustitución ciega `DQ.MED.900xxx` → `DQ.MA.900xxx`.

No se inspeccionaron ópticamente todos los binarios ni se recalcularon sus hashes, tal como declaran los expedientes originales.

## 2. Resultado cuantitativo

| Indicador | Resultado | Interpretación |
|---|---:|---|
| Recursos físicos de R05 cubiertos | **678/678** | Conservación íntegra del inventario por `asset_path` |
| Fichas canónicas verificadas por URI | **53/53** | Identificador vinculado al archivo exacto; no implica uso aprobado |
| Registros de la matriz consolidada | **759** | Una fila por vínculo contextual distinto y una fila residual por recurso sin vínculo explícito |
| Vínculos concretos de R15 sin duplicar | **53** | Uno de los 54 vínculos con imagen repetía físicamente otra propuesta |
| Decisiones R15 de foco sin imagen | **43** | Se conservan como decisiones editoriales, no como recursos físicos |
| Propuestas culturales R16 | **68** | 67 recursos físicos + 1 ficha QBI externa, sin binario |
| Recursos R05 solo con destinos genéricos | **595** | Ninguna asociación explícita R15/R16 para ese archivo; no se borran ni cuentan como uso aprobado |
| Recursos físicos con vínculo R15 | **34** | Mismo archivo puede servir a varias preguntas/fases |
| Recursos físicos con vínculo R16 | **67** | Uso selectivo cultural |
| Recursos físicos con vínculo preciso en R15 o R16 | **83** | Unión de ambos conjuntos; 18 coinciden entre R15 y R16 |
| Duplicados de relación concreta suprimidos | **1** | Mismo archivo + pregunta + fase; se documenta a continuación |
| Inconsistencias de ID numérico en R05 | **17** | Existencia del ID no prueba identidad del archivo |
| Inconsistencias de ID de origen en R16 | **1** | `R16-054`, resuelta por URI para esta matriz |

**Modelo de fila:** la relación se identifica mediante archivo físico + contexto editorial (pregunta concreta o propuesta cultural) + fase. Los **595** activos sin vínculo R15/R16 se mantienen como inventario R05 y sus tres posibles destinos originales como *candidatos sin asignación contextual*. Las 43 decisiones «sin imagen» conservan pregunta, fase y `imagen_actual_id` para que Desarrollo no confunda la decisión de no proponer imagen con la inexistencia de un fichero.

El CSV contiene tanto `id_canonico_uri_verificada` como las columnas que **preservan** el ID declarado por cada fuente. Las alertas de discrepancia no realizan migración, alias oficial ni cambios de catálogo.

## 3. Incidencia P0: 17 asignaciones numéricas engañosas de R05

En el CSV R05 aparecen **17 filas** de escenas cuyo `canonical_media_id_existing` existe formalmente, pero su `logical_uri` apunta a **otro archivo**. La cifra anterior «53 fichas existentes» era cierta como comprobación de existencia del identificador; no garantizaba equivalencia de archivo por número. Resulta esencial la comprobación cruzada por URI.

| ID origen de manifiesto | ID canónico asignado por R05 (incorrecto para ese archivo) | Canónico realmente correspondiente al archivo, si existe | Archivo físico R05 |
|---|---|---|---|
| `DQ.MED.900026` | `DQ.MA.900026` | Sin ficha | `p1_c23_maleta_sierra_morena_pre.webp` |
| `DQ.MED.900027` | `DQ.MA.900027` | Sin ficha | `p1_c30_dorotea_micomicona_pre.webp` |
| `DQ.MED.900028` | `DQ.MA.900028` | Sin ficha | `p1_c38_armas_letras_pre.webp` |
| `DQ.MED.900029` | `DQ.MA.900029` | `DQ.MA.900038` | `p2_c01_recuperacion_pre.webp` |
| `DQ.MED.900030` | `DQ.MA.900030` | Sin ficha | `p2_c20_bodas_camacho_pre.webp` |
| `DQ.MED.900031` | `DQ.MA.900031` | Sin ficha | `p2_c22_cueva_montesinos_pre.webp` |
| `DQ.MED.900032` | `DQ.MA.900032` | Sin ficha | `p2_c29_barca_encantada_pre.webp` |
| `DQ.MED.900033` | `DQ.MA.900033` | Sin ficha | `p2_c30_duquesa_caceria_pre.webp` |
| `DQ.MED.900034` | `DQ.MA.900034` | Sin ficha | `p2_c54_ricote_sancho_pre.webp` |
| `DQ.MED.900035` | `DQ.MA.900035` | Sin ficha | `p2_c62_imprenta_barcelona_pre.webp` |
| `DQ.MED.900036` | `DQ.MA.900036` | Sin ficha | `p1_c07_segunda_salida_pre.webp` |
| `DQ.MED.900037` | `DQ.MA.900037` | Sin ficha | `p1_c09_manuscrito_toledo_pre.webp` |
| `DQ.MED.900038` | `DQ.MA.900038` | Sin ficha | `p1_c17_manteo_sancho_post.webp` |
| `DQ.MED.900039` | `DQ.MA.900039` | Sin ficha | `p1_c19_cortejo_encamisados_pre.webp` |
| `DQ.MED.900040` | `DQ.MA.900040` | Sin ficha | `p1_c33_curioso_impertinente_pre.webp` |
| `DQ.MED.900041` | `DQ.MA.900041` | Sin ficha | `p1_c52_procesion_disciplinantes_pre.webp` |
| `DQ.MED.900042` | `DQ.MA.900042` | Sin ficha | `p2_c03_sanson_carrasco_pre.webp` |

**Regla corregida para consolidación:** conservar `legacy_id_r05` y `id_canonico_r05_declarado` como evidencia histórica de la propuesta; usar solo `id_canonico_uri_verificada` cuando `logical_uri` coincida con la ruta. Las demás relaciones se dejan sin ID canónico confirmado, aunque R05 proponga un `canonical_candidate_unapproved`. No crear alias por semejanza de título, capítulo, numeración o nombre del fichero.

Ejemplos de referencia verificados:
- `DQ.MED.900029` identifica en el **manifiesto de escenas** la recuperación de don Quijote (II.1), pero `DQ.MA.900029` en el catálogo enlaza **frailes y carreta** (I.8), archivo originado como `DQ.MED.900159`. La ficha canónica de la recuperación es **`DQ.MA.900038`**.
- `DQ.MA.900030` corresponde a **molinos en siluetas (I.8)**, recurso del manifiesto `DQ.MED.900231`, no al archivo `DQ.MED.900030` de las bodas de Camacho (II.20).
- `DQ.MA.900042` es el recurso de **testamento de II.74** que R15 restringe por spoiler, no la escena `DQ.MED.900042` del bachiller en II.3.

## 4. Rectificación de cruce R16 y duplicado R15

### R16-054 — Identificador corregido **solo en la matriz consolidada**

La propuesta `R16-054` (recreación `assets/scenes/part_2/chapter_01/p2_c01_recuperacion_pre.webp`) declara `DQ.MA.900029`. La URI de **ese archivo** corresponde en realidad a **`DQ.MA.900038`**. El valor original se conserva en `id_r16_declarado`; la salida documenta `id_canonico_uri_verificada=DQ.MA.900038` y marca `ID_PROPUESTA_DISTINTA_A_URI`. La propuesta cultural de II.1 sigue siendo **candidata**, no se altera su descripción ni se modifica R16 en esta entrega.

### R15, pregunta DQ.Q.000308 — Duplicación por dos nombres de un mismo WebP

- Principal: `DQ.MA.900034`, fase `post_answer`, archivo `p1_c16_venta_cama_quijote_pre.webp`.
- Secundaria: `DQ.MED.900164`, **misma** pregunta, fase **y archivo físico**; lo llama «cama alternativa», pero no es un segundo plano.

La matriz mantiene **una sola relación contextual** (`DQ.MA.900034`) y no duplica el consumo de ese archivo. La segunda justificación y el ID de origen permanecen recuperables en el CSV R15 y registrados en este informe; no puede presentarse como alternativa visual independiente sin identificar una imagen realmente distinta.

### Punto preservado de R15: Q.112

`DQ.Q.000112` sigue requiriendo `DQ.MA.000026` (acuarela 026 de la embestida) **en el momento permitido**, no la 027 de los frailes. La geometría del hotspot, los spoilers y la accesibilidad aún exigen QA; esta consolidación no toca preguntas ni sus JSON.

## 5. Comprobación de capítulos, fases y conflictos narrativos

Tras resolver IDs por URI, los **vínculos R15 que proponen una imagen** corresponden a archivos cuyo capítulo de manifiesto **no presenta nuevas discrepancias frente al capítulo de pregunta**; anteriormente aparecían aparentes cruces de capítulo por usar únicamente números R05 equivocados. Esta prueba **no valida** si una imagen anticipa la respuesta.

Las fases originales `pre_question`, `question_focus`, `reveal`, `post_answer` y `discovery` se conservan, igual que la política R16 (`DESPUES_DESENLACE`, `ANTES_PREGUNTA_CON_REVISION`, etc.). Son **dominios temporales distintos**: no traducir de forma automática una intención de lector/museo en permiso para mostrarla durante una pregunta.

Advertencias sin corregir automáticamente:
1. **II.74:** `DQ.MA.900011` y `900042` son recursos de desenlace; R15 detectó usos prematuros. Los campos de la app requieren corrección futura y prueba real.
2. **I.18:** la imagen de rebaños puede revelar identidad de la polvareda (Q.217); no ponerla en foco antes de resolver el contraste imaginado/real.
3. **I.21 y II.10:** bacía y labradoras son pistas que pueden responder preguntas visualmente; el nombre del archivo no asegura seguridad.
4. **R16 acuarela 043:** ubicación del EPUB I.15 frente al discurso de la Edad de Oro I.11; mantener ambas capas, sin alterar el manifiesto.
5. **Atlas:** referencias topográficas de ficción se mantienen como vínculos literarios o interpretativos; ningún punto ni ruta nuevos se han añadido.

## 6. Claves de la matriz y política de decisión

Las **44 columnas** combinan: identidad física (Git SHA/manifest SHA-256, procedencia, familia), IDs existentes por URI y candidatos sin migrar; contexto (capítulo, pregunta, pasaje, fase y tema), tres destinos generales R05 y justificaciones, propuesta específica R15/R16, riesgo de spoiler, derechos, estado de revisión, alertas y fuentes de origen.

Reglas operativas:
- `VINCULO_R15`: asociación por pregunta y fase. `DECISION_SIN_IMAGEN_R15`: decisión editorial explícita de prescindir de foco visual, conservando el medio actual como dato de auditoría.
- `VINCULO_R16`: vínculo por propuesta R16; el mapa QBI 10485 se representa como **URL de metadatos**, no imagen local.
- `INVENTARIO_R05_SIN_ENLACE_ESPECIFICO`: una fila por recurso no relacionado en R15 ni R16, con destinos generales **no aprobados** de R05.
- `id_canonico_uri_verificada` procede de **53 MediaAsset existentes con URI cotejada**; dejar vacío cuando no hay tal registro.
- La columna `alertas` identifica discrepancias de ID y riesgos; una celda vacía **no** autoriza publicación.
- `estado_revision` conserva el estado documental de origen y nunca dice «aprobado» a partir de la consolidación.
- `uso_personal`, `redistribucion` y `procedencia` arrastran los estados documentados; no se reabre una nueva auditoría general de licencias como condición de **aceptación de esta matriz**, atendiendo a la instrucción de coordinación sobre uso estrictamente personal.

## 7. Criterios de QA y siguientes acciones

**Verificado documentalmente:** fuentes R05/R15/R16 parseables, recuentos originales 678/97/68, todos los recursos locales vinculados presentes en el inventario, 53 referencias canónicas contrastadas por URI, 678 rutas físicas distintas representadas, 1 duplicado exacto de relación contextual excluido y 17+1 discrepancias de ID documentadas.

**Pendiente:** revisión visual de todas las combinaciones, hashes recalculados, geometría real del hotspot, corrección de `pre_image_media_id` en preguntas, adaptación a un contrato de vínculos que Desarrollo apruebe, accesibilidad, secuencia de beats y prueba de ejecución offline. Ninguna propuesta individual adquiere un nuevo permiso de uso por figurar en esta matriz.

**Decisión solicitada a Coordinación/R14:** revisar las alertas, aceptar la **tabla de correspondencia por URI** como referencia de trabajo y asignar a R05/R09/Desarrollo una migración posterior de las asociaciones canónicas que deban entrar en el producto. El informe y su CSV son **documentación de integración**, no cambios productivos ni una aprobación implícita de los 759 registros.

**Límites respetados:** no se modificaron medios, paquetes de preguntas, esquemas, originales R05/R15/R16, atlas, lector ni museo; no se descargaron nuevos assets ni se fusionó esta rama.
