# R05 — Auditoría maestra del patrimonio visual

**Modo:** CONTENIDOS / Curaduría Iconográfica · **Prioridad:** P0 · **Fecha:** 2026-11-06  
**Instantánea inmutable inspeccionada:** `2e23b1cd27c764d946610716a4566a46ceda27cf` (`main` en el inicio); árbol Git `7acff9f34e49d28c3338bd6db9fa8b5e201e0549`.  
**Documento de trabajo:** propuesta de asignación; **no supone aprobación editorial, jurídica ni técnica**.

## 1. Alcance, evidencia y restricciones
Se cotejaron recursivamente todas las extensiones visuales en `assets/` con los manifiestos `assets/scenes/manifest.json` (253), `assets/closeups/manifest.json` (10) y `assets/ilustraciones_tusell/manifests/manifest_ilustraciones.json` (415); también `content/piloto/package.json`, fichas MediaAsset del piloto, `AGENTS.md`, `ENCARGO_MAESTRO.md`, `VISION_Y_DECISIONES.md`, `DC_IMG_001_ASIGNACION_INTEGRAL_ASSETS.md`, `BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` (R05) y el expediente de derechos de Tusell. Los identificadores del manifiesto no son necesariamente IDs definitivos del contrato.

**Limitación material:** la matriz precedente `docs/MATRIZ_IMAGENES_2026-11-06.xlsx` (95.933 bytes) y `docs/BANCO_IMAGENES_REPOSITORIO.xlsx` (74.171 bytes) están en GitHub, pero su contenido binario XLSX no se pudo abrir con el conector de texto. Por tanto **no se afirma una conciliación fila a fila con la cifra histórica de 697**. Tampoco se extrajeron bytes de todos los JPEG/WebP para recalcular SHA-256, comprobar similitud perceptual o certificar contenidos pictóricos: se validaron rutas, tamaños Git y hashes *declarados* en manifiestos.

## 2. Conciliación del patrimonio físico y editorial
| Grupo | Archivos Git | Identificadores | Lectura de uso |
|---|---:|---|---|
| Acuarelas Tusell | 376 | `DQ.IL.0001–0376` | Ilustraciones de EPUB; su presencia en texto no implica validación narrativa individual |
| Paratextos, capitulares, orlas y marcas | 39 | `DQ.DEC.0001–0039` | Material editorial, no 39 escenas nuevas |
| Escenas IA narrativas | 252 | `DQ.MED.900002–900253` (según manifiesto) | 208 fase `pre`, 44 `post`; cubren formalmente 126 capítulos |
| Referencia de dirección artística | 1 | `DQ.MED.900001` | `reference_only`, no escena jugable |
| Primeros planos IA | 10 | `DQ.MED.901001–901010` | 10 expresiones de Quijote, sin episodio asignado |
| **Total único de rutas en assets/** | **678** | **678 registros de manifiesto** | **Sin rutas huérfanas ni archivos de imagen fuera de los tres manifiestos** |

Suma física: `376 + 39 + 252 + 1 + 10 = 678`. Diferencia numérica frente a la **referencia histórica de 697**: **19 registros**, **causa no demostrada**. Esa cifra puede incluir repeticiones de asignación o una instantánea distinta; no puede clasificarse como 19 archivos perdidos sin abrir el XLSX y contrastar su clave por fila. Esta discrepancia permanece **ABIERTA/P0**. La matriz R05 registra **una fila por ruta física actual**, no una fila por cada destino ni por cada formato derivado.

**Originales/derivados:** los 263 WebP (252 escenas + 1 referencia + 10 closeups) son versiones optimizadas de producciones IA cuyo PNG maestro no se aloja en este Git. No contar el PNG externo como otro fichero presente. Las 415 imágenes del EPUB son copias extraídas de la edición digital, sin derivados físicos adicionales detectados en `assets/`. `assets/thumbnails/` no contiene imágenes. **No se ha probado** que las 678 rutas equivalgan a 678 composiciones visualmente distintas.

## 3. Integridad y deduplicación
- **678/678** rutas tienen correspondencia con un registro en el manifiesto respectivo. **678/678** tienen Git blob SHA y tamaño físico en el árbol; ninguna longitud declarada en manifiesto discrepa del tamaño Git cuando existe.
- **669/678** poseen SHA-256 declarado, sin repetir entre sí (**0** grupos de hash idéntico). **9** carecen de SHA-256 declarado. El Git blob SHA es SHA-1 de objeto Git, **no sustituye** al SHA-256 del archivo.
- **21** grupos de acuarelas comparten alt normalizado (p.ej., personajes o situaciones semejantes): **candidatos de inspección visual**, no duplicados binarios comprobados.
- No se ha ejecutado hashing binario independiente, detección perceptual ni cotejo cuadro por cuadro. No inventar duplicados ni dar por verificada la fidelidad histórica.

### Nueve escenas con SHA-256 pendiente
| ID histórico | Ruta |
|---|---|
| `DQ.MED.900111` | `assets/scenes/part_2/chapter_42/p2_c42_sancho_despedida_pre.webp` |
| `DQ.MED.900113` | `assets/scenes/part_2/chapter_46/p2_c46_gatos_cencerros_pre.webp` |
| `DQ.MED.900117` | `assets/scenes/part_2/chapter_56/p2_c56_lacayo_duelo_pre.webp` |
| `DQ.MED.900118` | `assets/scenes/part_2/chapter_57/p2_c57_altisidora_despedida_pre.webp` |
| `DQ.MED.900119` | `assets/scenes/part_2/chapter_58/p2_c58_santos_tallados_pre.webp` |
| `DQ.MED.900120` | `assets/scenes/part_2/chapter_59/p2_c59_venta_quijote_apocrifo_pre.webp` |
| `DQ.MED.900121` | `assets/scenes/part_2/chapter_65/p2_c65_antonio_moreno_pre.webp` |
| `DQ.MED.900122` | `assets/scenes/part_2/chapter_66/p2_c66_regreso_arboleda_pre.webp` |
| `DQ.MED.900123` | `assets/scenes/part_2/chapter_67/p2_c67_pastoril_proyecto_pre.webp` |

## 4. Asignaciones editoriales propuestas
La **matriz CSV** constituye la fuente operativa de R05: ruta, SHA de Git y SHA-256 cuando consta, ID histórico, correspondencia canónica existente o propuesta, parte/capítulo, clave de episodio de manifiesto, representación/alt, fase, riesgo de spoiler, **hasta tres destinos con justificación individual**, revisión, derechos, excepción y siguiente acción. No se inventan IDs de `Question`, `Episode` o `Scene` canónicos donde aún no se ha cotejado su relación.

| Familia | Propuesta prioritaria | Regla editorial |
|---|---|---|
| Escenas `pre` | Modo Historia, contexto de pregunta | El nombre `pre` no acredita ausencia de spoiler; revisar por pregunta |
| Escenas `post` | Revelación / explicación posterior / cuaderno | Jamás mostrarlas antes de responder o conocer el desenlace |
| Acuarelas por capítulo | Lector → descubrimientos → cuaderno/museo | Respeto al pasaje original; evitar anticipación de respuestas |
| Acuarelas de prólogo o frontispicio | Lector y museo de recepción iconográfica | No asociar arbitrariamente a un capítulo |
| Capitulares y orlas | Lector ornamental, eventualmente ficha de museo | Nunca sustituir texto indexable ni convertir un adorno en escena |
| Cubiertas, logotipos, marcas y otros | Referencia o museo solo tras curaduría | Excluir de aventura/preguntas salvo función acreditada |
| Primeros planos | Reacciones/diálogos del Modo Historia | Elegir emoción por beat, no insertarlos en capítulos al azar |
| Referencia de personajes | `reference_only` | Excluida de pantalla narrativa del jugador |

**Incidencias de contexto conocidas:** `DQ.IL.0043` está colocado en I.15 aunque la iconografía del discurso corresponde a I.11; conservar colocación del EPUB y proponer destino en I.11 tras cotejo. `DQ.IL.0056` acompaña el tránsito I.17→I.18 (no es por ello error). `DQ.IL.0171` figura legítimamente en II.1. Estas advertencias proceden de `docs/CATALOGO_NECESIDADES_VISUALES.md` y no alteran el manifiesto fuente. Otras propuestas permanecen sin validación visual/filológica individual.

## 5. Correspondencia `DQ.MED.*` / `DQ.MA.*`, sin migraciones
El contrato v0.2.0 y DC-IMG-001 definen `DQ.MA.######` para `MediaAsset`; los manifiestos anteriores preservan `DQ.MED.######`, `DQ.IL.####` y `DQ.DEC.####`. La matriz distingue **`canonical_media_id_existing`** (ficha ya presente en `content/piloto/media_assets/`) de **`canonical_candidate_unapproved`** (propuesta **sin escritura de catálogo**).

| Origen | Regla candidata, no ejecutada | Estado |
|---|---|---|
| `DQ.MED.900005` | `DQ.MA.900005` | Registrada en piloto, URI de molinos `pre` cotejada |
| `DQ.MED.900029` | `DQ.MA.900029` | Registrada en piloto: **I.8 frailes/carreta**, no II.1 como figura en una tabla histórica |
| `DQ.IL.0026` | `DQ.MA.000026` | Registrada en piloto, acuarela `026.jpg` |
| `DQ.MED.901001` | `DQ.MA.901001` | Solo propuesta para primer plano, no registrado en piloto |
| `DQ.DEC.0001` | **Sin ID asignado** | Evitar colisión con `DQ.MA.000001` (acuarela `001.jpg`) |

**Resultado:** 53 fichas canónicas existentes cruzadas por numeración y correspondencia observada (27 acuarelas + 26 escenas); 586 equivalencias candidatas sin ficha existente y 39 decorativos sin asignación propuesta por riesgo de colisión. Una coincidencia de número **no es por sí sola migración ni aprobación**. Antes de migrar: revisar URI/hash por ID, reservar IDs sin choque, documentar alias y ejecutar doble revisión editorial/técnica. No se han modificado esquemas ni registros `MediaAsset`.

## 6. Derechos y estado editorial
- **Tusell y paratextos:** `docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md` recoge uso personal/repositorio privado autorizado por propietario y **redistribución no autorizada sin cerrar derechos**; quedan por resolver detalles de la atribución Tusell y condiciones de edición Epublibre. El estado `license_status=verificada` en fichas del piloto no debe extenderse automáticamente a distribución pública.
- **Recreaciones IA:** identificar como `RECREACION_ARTISTICA`; revisar fidelidad de indumentaria/escena y condiciones si se pretende redistribuir. Todas las escenas del manifiesto figuran `borrador`, igual que los primeros planos.
- **Fase de publicación:** toda asociación nueva de esta matriz está `PROPUESTA_R05_NO_APROBADA`. Un recurso existente o documentado **no** está por ese hecho autorizado para todos los destinos o fases. Las referencias de arte y marcas no se presentan al jugador por defecto.

## 7. Indicadores DC-IMG-001 (honestos)
| KPI | Observado en esta auditoría | Interpretación |
|---|---|---|
| KPI-1: cobertura inventario | **678/678 = 100 %** | Universo: imágenes `assets/` en el commit fijado |
| KPI-2: aprobado **o** excepción motivada | **678/678 = 100 % de trazabilidad de excepción provisional** | Cada fila tiene causa de no aprobación y acción; **0 aprobaciones nuevas** se atribuyen a R05. No es cobertura de usos aprobados |
| KPI-3: imágenes aptas con uso aprobado / imágenes aptas | **NO DETERMINABLE** | No se ha cerrado universo de aptitud ni verificado el número de bindings aprobados; **no publicar 100 % ficticio** |
| KPI-4: incidencias en recursos publicados | **NO AUDITADO** | Requiere validar consumidor, licencias, coherencia y anti-spoiler en producto |

**Métricas auxiliares:** 53/678 (7.82 %) con ficha canónica existente en el paquete piloto; 9 SHA-256 pendientes; 21 grupos de descripciones similares sujetos a inspección visual; 1 discrepancia histórica de inventario (697 frente a 678) no resuelta.

## 8. Puertas para aceptación definitiva
1. Abrir ambos XLSX y comparar **filas por ID, ruta, hash y fecha de snapshot** con la matriz R05; explicar expresamente cada uno de los 19 registros de diferencia, sin presuponer que son imágenes faltantes.
2. Recalcular SHA-256 de los 678 archivos, cubrir los 9 vacíos, pasar detector perceptual y registrar falsos positivos de similitud.
3. Validar cada vínculo imagen–episodio/pasaje/beat/pregunta, incluidos spoilers y fases; incorporar fecha, responsable editorial y evidencia de revisión real.
4. Resolver las excepciones de paratextos, marcas, referencia artística y limitaciones de derechos. Registrar aprobaciones y bindings solamente después de revisión cruzada.
5. Recalcular KPI-2 estricto, KPI-3 y KPI-4 con el catálogo y el consumidor real, sin mezclar propuestas con usos efectivos.

**Límites de R05:** no se han creado imágenes, alterado código, aprobado contenidos, cambiado esquemas ni ejecutado migración de IDs; este PR documenta hallazgos y propuestas, no integración funcional.
