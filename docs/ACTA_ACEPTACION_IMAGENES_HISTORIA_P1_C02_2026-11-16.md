# Acta DC-35 — 16 imágenes aceptadas del capítulo II de Historia

**Fecha:** 2026-11-16  
**Repositorio y destino:** `JavierRB35/El_Quijote_App`, rama `main`  
**Estado:** aprobación visual individual del propietario; alta de assets y catálogo, sin activación del guion  
**Directrices:** AGENTS.md; DC-29, DC-31–DC-36, DC-40 y DC-41; `docs/PROTOCOLO_ACEPTACION_E_INTEGRACION_IMAGENES.md`  
**Fuente narrativa:** `content/textos/gutenberg_2000/El_Quijote.txt`, `DQ.SRC.0005`, Primera parte, capítulo II; anclas exactas en `content/historia/parte_1/capitulo_02.json`

## Resultado y alcance

- 16 imágenes aprobadas visualmente, **solo las versiones definitivas** (sin descartadas), desde H01-I01 hasta H11-I02.
- Originales PNG identificados por SHA-256; derivados WebP de calidad 82 creados sin recorte ni deformación y verificados mediante SHA-256 y SHA de objeto Git.
- Altas `DQ.MED.900345`–`DQ.MED.900360` en `assets/scenes/manifest.json`. Inventario: 342 → 358. No se altera ninguna de las 342 entradas anteriores.
- Sin modificaciones en `content/historia/`, `content/aventura/` ni código; la asociación al guion sigue separada y requiere una orden específica si se desea activación.
- Formato y dimensiones preservados: 01 = 1672×941; 02 = 1602×981; 03–16 = 1602×982. La diferencia frente al objetivo 1672×941 no debe corregirse alterando una obra aprobada sin consentimiento.
- El puente temporal y privado utilizado para los binarios fue eliminado por cada recurso tras crear y verificar su objeto Git.

## Trazabilidad individual

| Nº | Beat | Versión | ID catálogo | WebP final | SHA-256 WebP | Git blob SHA |
|---:|---|---|---|---|---|---|
| 01 | H01-I01 | v1 | DQ.MED.900345 | `p1_c02_h01_i01_salida_corral_story.webp` | `1681b873c9f7670b26823b6f541bfde85fc8e3824d05c0e3b86938d1e52dc333` | `7d1ef41220103be919be19d5489bd6e72d3307f6` |
| 02 | H02-I01 | v1 | DQ.MED.900346 | `p1_c02_h02_i01_duda_investidura_story.webp` | `0110e0d18cd5d34cf5a2757d5d307f48b5bc047cb3f379d1159a9b8341a8296b` | `ec51f3264b61b0028d636229e028aeefa580ba54` |
| 03 | H02-I02 | v1 | DQ.MED.900347 | `p1_c02_h02_i02_resolucion_armarse_story.webp` | `b5ddc2cacb2c34f36dd01adf47f7ccdf1e2648151dad234960fe63c89c56bf8e` | `d32668f21277244f20d9976687559147f73e6384` |
| 04 | H03-I01 | v1 | DQ.MED.900348 | `p1_c02_h03_i01_cronista_hazanas_story.webp` | `e68bfe5d387f42c131b59ec332ccb61e26530ff3060d0505226d2d4fc12d3213` | `0e1b83941beaa84464aef7abf5a1ec2e75c44db5` |
| 05 | H03-I03 | v2 | DQ.MED.900349 | `p1_c02_h03_i03_dulcinea_sol_story.webp` | `aba356c112213b3c0570af4501dc92be05da7ade4e27ead7b59d44783d82af0c` | `705df9d6fc6ef91f16d79af3a9b634602dd053df` |
| 06 | H04-I01 | v2 | DQ.MED.900350 | `p1_c02_h04_i01_cansancio_hambre_story.webp` | `ee5bc252edd35781a7015f5f5d49c3836df0717f591719cfd0b8a58b7224b47f` | `63184722cc5217d4559fe4d3d18f29911fead214` |
| 07 | H05-I02 | v3 | DQ.MED.900351 | `p1_c02_h05_i02_cuerno_porquero_story.webp` | `9243b1462c2ed2489684d66b0c1c4071990c18eeb0ad4c4e5db54332b8ee4561` | `23dfb6077b8e26c7af5baf94062ceaf429372059` |
| 08 | H06-I01 | v2 | DQ.MED.900352 | `p1_c02_h06_i01_visera_alzada_temor_story.webp` | `355cdfc4543250d98b513e2056450f87ba5c5ffe184541dc069aabe71f276fe1` | `2c7b302cb227e842d49b12c6fe9fca5424a13278` |
| 09 | H06-I02 | v1 | DQ.MED.900353 | `p1_c02_h06_i02_discurso_doncellas_story.webp` | `787833386ecd274576d4da613c1f7dd8057cd17775d0f093e57e7187fd2232e3` | `4353cc0ff4207f968dc0e83ad21534eb8ae354c0` |
| 10 | H07-I01 | v2 | DQ.MED.900354 | `p1_c02_h07_i01_ventero_ofrece_posada_story.webp` | `63137fb5870234d63e9a3ce73dae2f456c0acb6b645340f46b96ba609592a13c` | `b12c82ed9439f0f56110e09adf84b1f4d6fce8f0` |
| 11 | H08-I01 | v7 | DQ.MED.900355 | `p1_c02_h08_i01_estribo_desmonta_story.webp` | `94511fe77de5d5344dff4c58e98f1bf9a13a31be36f507175a400204d60f4694` | `a15f02e6f72bd4a8a342d2ccac4f0f922a2dd7fd` |
| 12 | H08-I02 | v1 | DQ.MED.900356 | `p1_c02_h08_i02_cintas_verdes_celada_story.webp` | `38f345c2c199f30009068eaeb33f7fbda6a43516f680984a33b4553ab37db729` | `793d27760b047af1e24101cca0a9aaf976a97c65` |
| 13 | H09-I01 | v1 | DQ.MED.900357 | `p1_c02_h09_i01_romance_lanzarote_story.webp` | `f31eb4f0e5ad69bcec06976ee86829ddd19f92e55f224554c429f4b2987f939d` | `e0d391b707898c829e176079c78845dc99e1e06b` |
| 14 | H09-I02 | v1 | DQ.MED.900358 | `p1_c02_h09_i02_mujeres_desconcertadas_comida_story.webp` | `973172dd98066ad876598eb5f4586376f94fa476669c2fcd4095213acd963edd` | `bec603109d4a7c8697b7c331d7a66ce1a2030794` |
| 15 | H10-I01 | v1 | DQ.MED.900359 | `p1_c02_h10_i01_cena_imposible_inicio_story.webp` | `ed1ff5a280ded2a90554287f0024417d3f1ce6a538b17744d773ee91605f077d` | `62a11465d1861342c03506a9c2b115a7fe4c608a` |
| 16 | H11-I02 | v1 | DQ.MED.900360 | `p1_c02_h11_i02_castillo_imaginado_preocupacion_story.webp` | `45708eff000cda7d9a95c12e59c4fc1309f8da4d6e58073f9978bca1504eb3d8` | `020e754486f6104ee35feb45d0a0d02a90ec521b` |

## Comentarios de QA, fidelidad y derechos

El propietario aprobó expresamente cada fotograma. En los anteriores rechazos se corrigieron secuencias anacrónicas, la identidad del porquero, personajes ausentes y la mecánica del desmontaje. La imagen 11 aceptada es la **séptima versión** (celada metálica en lugar de corona y pie izquierdo dentro del estribo sostenido por el ventero). Solo se usan estas versiones finales.

**Pendientes no certificados:** (1) comprobación dentro de la aplicación de la colocación del pergamino, especialmente en escenas con rostros/gestos cerca del extremo inferior derecho (DC-28/DC-41); (2) cotejo textual directo de las anclas literarias en el fichero extenso, distintas de las localizaciones ya presentes en el guion canónico; (3) revisión de derechos antes de redistribución/publicación; (4) cualquier reutilización en Aventura necesita evaluación `pre/post` y antiespoiler independiente. **No declarar activación del capítulo, QA visual en pantalla ni licencia pública por esta acta.**

## Impacto transversal y reutilización

El alta aporta imágenes narrativas individuales de Historia I.2. Otros capítulos y recursos no se modifican. El contrato común del catálogo no cambia. Aventura y Museo conservan sus referencias y quedan fuera de este cambio; un eventual uso cruzado debe evaluarse en su propio contexto. La prueba sobre código y UI no se ejecuta, al no haber cambios funcionales.
