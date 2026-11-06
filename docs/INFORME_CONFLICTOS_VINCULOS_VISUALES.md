# R05 — Informe de conflictos en vínculos visuales

**Corte:** `main@66d2f7d3a5c6a28b18fdc7cce5148375d277e21f` · **Origen:** R05 (#22), R15 (#25), R16 (#26), R12 (#27).  
**Estado:** diagnóstico documental, **sin correcciones automáticas ni autorizaciones**. El detalle completo por vínculo se encuentra en `docs/data/vinculos_visuales_consolidados.csv`.

**Subsanación del dictamen de Coordinación de PR #32:** C018/C019 se rectifican como **precisiones P1 de cronología documental y QA de Q.112**, sin reasignar su `MediaAsset`. PR #30 queda fuera del conjunto fuente de 2.805 relaciones; la función de PR #29 y la precedencia documental se explicitan más abajo. PR #32 ya está fusionada: esta corrección se tramita en una PR documental de seguimiento, sin alterar el CSV.

## Resumen verificable
- **26 incidencias explícitas** (incluidas **17 colisiones de identidad** por número histórico). Cada incidencia del inventario de recursos se cuenta una vez por clave, no por cantidad de destinos donde aparece.
- **0 cruces R15 con capítulos diferentes** de la ubicación del archivo; no todos prueban fallo, pero requieren justificación textual o corrección.
- **1 propuestas R16** con capítulo propuesto distinto de la colocación original; pueden corresponder a lectura de episodio frente a ubicación EPUB.
- **0 conflictos R15 entre propuesta positiva y «sin imagen» en la misma pregunta/fase**.
- **0 discrepancias de hash Git o SHA-256 declarado** entre R05 y R12; hashes no recalculados independientemente.
- **43 decisiones consolidadas de evitar imagen**, no contadas como uso aprobado.
- **2 vínculos de metadatos externos** para una ficha cartográfica QBI sin binario.
- **27 imágenes examinadas directamente por R12**, 651 pendientes. QA PASS/FAIL son dictámenes limitados, no estado editorial.

## Conflictos prioritarios y política

**P0 — ID origen ≠ ID canónico por mero número.** Diecisiete filas de R05 decían tener `DQ.MA.*` existente con el mismo sufijo que `DQ.MED.*`, pero la URI/hash del MediaAsset canónico corresponde a otro fichero. El CSV deja en blanco esa relación falsa y marca `id_numerico_en_colision`. Se añade correspondencia verdadera solo si coinciden ruta/hashes de catálogo. No se cambian contratos ni se declara migración.

**P1 documental — Q.112, cronología H4 y QA real (C018/C019).** La acuarela 026 ya está asignada al campo `hotspot_media_id` del JSON. H4 v0.2.1 ya proponía 026 y H4 v0.2.2 (PR #33) ha corregido además la descripción de 027 (frailes) y 030 (vizcaíno). No existe contradicción automática entre fase `question_focus` y revelación narrativa: **el jugador debe ver 026 como soporte del hotspot durante la pregunta, pero solo después de narrar la embestida y satisfacer `safe_after_episodes=[DQ.P1.C08.E01]`**. Pendientes: verificar cronología de beats, rectángulo vigente, escalado 833×1041, interacción con teclado/puntero, accesibilidad y ejecución. La imagen 900005 es contexto previo, **no** hotspot. No cambiar el ID de la pregunta por esta corrección.

**P0 — final II.74 y revelaciones prematuras.** Imágenes `post` de despedida/testamento no deben aparecer en `pre_question` o pregunta que desconozca el desenlace. Las propuestas R15 negativas preservan esa decisión de no uso y no se traducen en asociación positiva.

**P1 — TS-001, lectores, derechos.** La regla del texto hablado siempre visible impide aprobar `preferred_overlay_side:right` sin ver imagen y texto juntos. La selección de R16 de acuarelas para lector/museo requiere procedencia/atribución y fecha; las obras literarias ilustradas no son registros históricos de la época de Cervantes. El mapa QBI externo es solo ficha, jamás archivo utilizable offline sin permiso.

**P1 — 025 y reuso antes de generar.** La ilustración de hoguera tiene un destino posterior candidato (I.6/I.7) y no justifica por sí misma producción nueva. La discrepancia EPUB/episodio debe quedar registrada, no mutada.

## Registro de incidencias identificadas
Las advertencias R12 de alcance global (208 escenas `pre` con clasificación provisional de spoiler, 50 alt genéricos, cinco decorativos sin alt, nueve SHA-256 faltantes y 651 imágenes no vistas) **no se convierten en 923 fallos individualmente certificados**: se mantienen como riesgos sistémicos para validación posterior.

| # | Prioridad | Código | Recurso / pregunta | Evidencia / divergencia | Decisión pendiente |
|---|---|---|---|---|---|
| C001 | P0 | ID_NUMERIC_R05 | `DQ.MED.900036` | R05 declara DQ.MA.900036 para DQ.MED.900036, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_21/p1_c21_bacia_lluvia_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C002 | P0 | ID_NUMERIC_R05 | `DQ.MED.900037` | R05 declara DQ.MA.900037 para DQ.MED.900037, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_21/p1_c21_sancho_bacia_examen_post.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C003 | P0 | ID_NUMERIC_R05 | `DQ.MED.900038` | R05 declara DQ.MA.900038 para DQ.MED.900038, pero la ficha canónica de ese ID localiza assets/scenes/part_2/chapter_01/p2_c01_recuperacion_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C004 | P0 | ID_NUMERIC_R05 | `DQ.MED.900039` | R05 declara DQ.MA.900039 para DQ.MED.900039, pero la ficha canónica de ese ID localiza assets/scenes/part_2/chapter_01/p2_c01_locura_caballerias_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C005 | P0 | ID_NUMERIC_R05 | `DQ.MED.900026` | R05 declara DQ.MA.900026 para DQ.MED.900026, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_01/p1_c01_armas_limpieza_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C006 | P0 | ID_NUMERIC_R05 | `DQ.MED.900027` | R05 declara DQ.MA.900027 para DQ.MED.900027, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_06/p1_c06_ama_sobrina_libros_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C007 | P0 | ID_NUMERIC_R05 | `DQ.MED.900040` | R05 declara DQ.MA.900040 para DQ.MED.900040, pero la ficha canónica de ese ID localiza assets/scenes/part_2/chapter_10/p2_c10_labradoras_camino_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C008 | P0 | ID_NUMERIC_R05 | `DQ.MED.900028` | R05 declara DQ.MA.900028 para DQ.MED.900028, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_06/p1_c06_cura_barbero_libros_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C009 | P0 | ID_NUMERIC_R05 | `DQ.MED.900041` | R05 declara DQ.MA.900041 para DQ.MED.900041, pero la ficha canónica de ese ID localiza assets/scenes/part_2/chapter_10/p2_c10_sancho_campesinas_perspectiva_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C010 | P0 | ID_NUMERIC_R05 | `DQ.MED.900029` | R05 declara DQ.MA.900029 para DQ.MED.900029, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_08/p1_c08_frailes_carreta_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C011 | P0 | ID_NUMERIC_R05 | `DQ.MED.900042` | R05 declara DQ.MA.900042 para DQ.MED.900042, pero la ficha canónica de ese ID localiza assets/scenes/part_2/chapter_74/p2_c74_testamento_quijano_post.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C012 | P0 | ID_NUMERIC_R05 | `DQ.MED.900030` | R05 declara DQ.MA.900030 para DQ.MED.900030, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C013 | P0 | ID_NUMERIC_R05 | `DQ.MED.900031` | R05 declara DQ.MA.900031 para DQ.MED.900031, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_08/p1_c08_vizcaino_camino_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C014 | P0 | ID_NUMERIC_R05 | `DQ.MED.900032` | R05 declara DQ.MA.900032 para DQ.MED.900032, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_11/p1_c11_edad_oro_discurso_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C015 | P0 | ID_NUMERIC_R05 | `DQ.MED.900033` | R05 declara DQ.MA.900033 para DQ.MED.900033, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_16/p1_c16_maritornes_venta_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C016 | P0 | ID_NUMERIC_R05 | `DQ.MED.900034` | R05 declara DQ.MA.900034 para DQ.MED.900034, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_16/p1_c16_venta_cama_quijote_pre.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C017 | P0 | ID_NUMERIC_R05 | `DQ.MED.900035` | R05 declara DQ.MA.900035 para DQ.MED.900035, pero la ficha canónica de ese ID localiza assets/scenes/part_1/chapter_18/p1_c18_pastores_piedras_post.webp. SHA/URI de ambas imágenes diferentes. | No convertir el identificador por número; usar el MediaAsset solo donde coincidan URI y hash; reservar nuevo ID tras doble revisión. |
| C018 | P1 | Q112_H4_CRONOLOGIA | `DQ.Q.000112` | **Fe de erratas del informe anterior:** H4 v0.2.1 ya recomendaba 026 para la embestida, no 027; en esa versión 027 se describía incorrectamente como vizcaíno. H4 v0.2.2, incorporada en PR #33, ya corrige 027 = frailes y 030 = vizcaíno. Q.112 ya tiene `hotspot_media_id=DQ.MA.000026`; 900005 es solo fondo de contexto. | **CERRADA la atribución documental**, sin reescribir H4 ni reasignar la imagen. Mantener la referencia histórica de versiones y QA pendiente de C019. |
| C019 | P1 | Q112_GATING_INTERACCION_PENDIENTE | `DQ.MA.000026` | `question_focus` es correcto para un hotspot **después de que el relato haya mostrado la embestida**. El JSON exige `safe_after_episodes=[DQ.P1.C08.E01]` y mantiene `hotspot_area` normalizada (`x=0.30,y=0.22,w=0.45,h=0.50`), **sin QA**. Si la pregunta se presenta antes de completar el episodio, se produciría un conflicto temporal no validado. | Probar 026 como foco activo **durante Q.112**, tras narración y gating. R06/R12: geometría a 833×1041, escalado, puntero/teclado, accesibilidad, texto y audio; registrar PASS/FAIL. **No cambiar el MediaAsset ya asignado.** |
| C020 | P0 | R16_MEDIA_ID_NO_CORRESPONDE | `R16-054` | R16 indica DQ.MA.900029 pero la URI/hash corresponde a DQ.MA.900038. | Corregir propuesta tras cotejo de URI y hash; no crear alias automático. |
| C021 | P1 | Cobertura QA | `general` | R12 visualizó directamente 27 de 678 archivos; 651 no vistos. Dictamen PASS 6/FAIL 1/PENDIENTE 671, no 678 aprobados. | No asumir aprobación por dictamen QA ni por catálogo existente. |
| C022 | P1 | Huellas SHA | `general` | R05 identifica 9 escenas sin SHA-256 declarado; R12 no recalculó binarios. | Completar SHA-256 binario y revisión de duplicados perceptivos. |
| C023 | P1 | Primeros planos | `assets/closeups/don_quixote_angry.webp` | Los 10 closeups comparten identidad pero estilo más ilustrativo que la escena cinematográfica. | R06 debe decidir formato de tarjeta de reacción separada antes de incorporar. |
| C024 | P1 | Quema 025 | `assets/ilustraciones_tusell/acuarelas/025.jpg` | R12 observó quema de libros en 025 y recomienda probarla como after I.6–I.7, aunque el EPUB la coloca en I.7. | Probar recurso existente y pasaje antes de solicitar nuevas imágenes. |
| C025 | P1 | R16_CAPITULO_DIFERENTE | `R16-016` | R16 propone DQ.P1.C11; colocación original R05 DQ.P1.C15. Puede ser puente narrativo o error. | Cotejar ilustración y pasaje; distinguir colocación EPUB de episodio realmente representado. |
| C026 | P1 | TS001 overlays | `assets/scenes/part_1/chapter_08/p1_c08_molinos_pre.webp` | R12 documentó nueve escenas con motivos imprescindibles en centro/derecha; preferred_overlay_side:right no valida TS-001. | Panel externo, máscaras específicas y pruebas texto real con audio desactivado. |

## Correspondencias numéricas erróneas R05 (detalle de las 17)
| ID de manifiesto | DQ.MA. incorrectamente inferido | Ruta física afectada | Ruta real del DQ.MA. |
|---|---|---|---|
| `DQ.MED.900036` | `DQ.MA.900036` | `assets/scenes/part_1/chapter_07/p1_c07_segunda_salida_pre.webp` | `assets/scenes/part_1/chapter_21/p1_c21_bacia_lluvia_pre.webp` |
| `DQ.MED.900037` | `DQ.MA.900037` | `assets/scenes/part_1/chapter_09/p1_c09_manuscrito_toledo_pre.webp` | `assets/scenes/part_1/chapter_21/p1_c21_sancho_bacia_examen_post.webp` |
| `DQ.MED.900038` | `DQ.MA.900038` | `assets/scenes/part_1/chapter_17/p1_c17_manteo_sancho_post.webp` | `assets/scenes/part_2/chapter_01/p2_c01_recuperacion_pre.webp` |
| `DQ.MED.900039` | `DQ.MA.900039` | `assets/scenes/part_1/chapter_19/p1_c19_cortejo_encamisados_pre.webp` | `assets/scenes/part_2/chapter_01/p2_c01_locura_caballerias_pre.webp` |
| `DQ.MED.900026` | `DQ.MA.900026` | `assets/scenes/part_1/chapter_23/p1_c23_maleta_sierra_morena_pre.webp` | `assets/scenes/part_1/chapter_01/p1_c01_armas_limpieza_pre.webp` |
| `DQ.MED.900027` | `DQ.MA.900027` | `assets/scenes/part_1/chapter_30/p1_c30_dorotea_micomicona_pre.webp` | `assets/scenes/part_1/chapter_06/p1_c06_ama_sobrina_libros_pre.webp` |
| `DQ.MED.900040` | `DQ.MA.900040` | `assets/scenes/part_1/chapter_33/p1_c33_curioso_impertinente_pre.webp` | `assets/scenes/part_2/chapter_10/p2_c10_labradoras_camino_pre.webp` |
| `DQ.MED.900028` | `DQ.MA.900028` | `assets/scenes/part_1/chapter_38/p1_c38_armas_letras_pre.webp` | `assets/scenes/part_1/chapter_06/p1_c06_cura_barbero_libros_pre.webp` |
| `DQ.MED.900041` | `DQ.MA.900041` | `assets/scenes/part_1/chapter_52/p1_c52_procesion_disciplinantes_pre.webp` | `assets/scenes/part_2/chapter_10/p2_c10_sancho_campesinas_perspectiva_pre.webp` |
| `DQ.MED.900029` | `DQ.MA.900029` | `assets/scenes/part_2/chapter_01/p2_c01_recuperacion_pre.webp` | `assets/scenes/part_1/chapter_08/p1_c08_frailes_carreta_pre.webp` |
| `DQ.MED.900042` | `DQ.MA.900042` | `assets/scenes/part_2/chapter_03/p2_c03_sanson_carrasco_pre.webp` | `assets/scenes/part_2/chapter_74/p2_c74_testamento_quijano_post.webp` |
| `DQ.MED.900030` | `DQ.MA.900030` | `assets/scenes/part_2/chapter_20/p2_c20_bodas_camacho_pre.webp` | `assets/scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre.webp` |
| `DQ.MED.900031` | `DQ.MA.900031` | `assets/scenes/part_2/chapter_22/p2_c22_cueva_montesinos_pre.webp` | `assets/scenes/part_1/chapter_08/p1_c08_vizcaino_camino_pre.webp` |
| `DQ.MED.900032` | `DQ.MA.900032` | `assets/scenes/part_2/chapter_29/p2_c29_barca_encantada_pre.webp` | `assets/scenes/part_1/chapter_11/p1_c11_edad_oro_discurso_pre.webp` |
| `DQ.MED.900033` | `DQ.MA.900033` | `assets/scenes/part_2/chapter_30/p2_c30_duquesa_caceria_pre.webp` | `assets/scenes/part_1/chapter_16/p1_c16_maritornes_venta_pre.webp` |
| `DQ.MED.900034` | `DQ.MA.900034` | `assets/scenes/part_2/chapter_54/p2_c54_ricote_sancho_pre.webp` | `assets/scenes/part_1/chapter_16/p1_c16_venta_cama_quijote_pre.webp` |
| `DQ.MED.900035` | `DQ.MA.900035` | `assets/scenes/part_2/chapter_62/p2_c62_imprenta_barcelona_pre.webp` | `assets/scenes/part_1/chapter_18/p1_c18_pastores_piedras_post.webp` |

## Conciliación histórica independiente
**697 ≠ 678 (diferencia 19)** sigue **ABIERTA**. Los XLSX de origen requieren extracción estructurada y contraste fila a fila; ninguna diferencia se interpreta como medio perdido o vínculo duplicado en ausencia de prueba. El universo de la presente consolidación son 678 rutas existentes, no 697 imágenes distintas.

**Responsables de cierre:** R05 + R15 + R16 para pertinencia; R01/R03 para texto/guion; R06/UX para TS-001; R13 para derechos; R09 para identidad y contrato; R12 para QA; Coordinación para aceptación. **Ninguna relación se aprueba automáticamente.**

## Adenda R15 PR #30 — expresamente no incorporada en la matriz de 2.805 vínculos

La PR #30 (`docs/data/propuesta_correcciones_visuales_pre_r15.csv`) aporta **14 propuestas adicionales** para Q.217, Q.232–238 y Q.313–318: **13 `RETIRAR_PRE` y una `MANTENER_CONDICIONAL` (Q.316)**. No forman parte de las 97 filas fuente de PR #25 que alimentaron la consolidación #32, aunque las PR estén ya fusionadas en `main`. **0/14 incorporadas a la matriz #32 y 0/14 aprobadas para integración**. R05/R06/R12 deben revisarlas individualmente antes de tramitar un ajuste del producto. `SIN_IMAGEN` expresa ausencia de imagen específica y **nunca** es un identificador MediaAsset; el campo `pre_image_media_id` es opcional. No añadir 14 bindings automáticamente ni contar dos veces asociaciones de la misma pregunta/fase.

## Precedencia entre tres capas documentales (decisión de Coordinación)

1. **Inventario físico maestro:** `docs/data/matriz_aprovechamiento_visual.csv` — PR #22, **678 rutas**.
2. **Matriz maestra de propuestas de asociación:** `docs/data/vinculos_visuales_consolidados.csv` — PR #32, **2.805 vínculos/decisiones**, por recurso, destino, fase y destinatario; **no** un esquema de implementación ni relaciones aprobadas.
3. **Vista auxiliar de conciliación y trazabilidad:** `docs/data/matriz_consolidada_aprovechamiento_visual.csv` — PR #29, **759 registros**, **no** segunda matriz operativa ni tabla importable directamente al runtime.

Los CSV se mantienen inalterados. Los **759** y **2.805** recuentan unidades editoriales distintas y no representan recuentos de imágenes. Esta precedencia se anota también en `docs/INFORME_CONSOLIDACION_VISUAL_R05_R15_R16.md` (PR #29). Ninguna fusión documental sustituye el dictamen individual sobre spoiler, TS-001, derechos específicos, QA y aprobación editorial.

