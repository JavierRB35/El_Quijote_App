# VALIDACIÓN — Lote 1B, subsanación editorial (2026-11-08)

**Rama:** `research/curiosidades-lote1b-p2c01-p2c74`, **PR #84**. **SHA inicial de subsanación:** `6d5239610ca83fad23b4bade2b78dd6666688f95`.

## Controles realmente reejecutados sobre archivos de la rama GitHub

Validación programática JavaScript sobre contenido recuperado de la rama por GitHub: parseo de cada línea JSONL, unicidad de IDs por tipo, existencia de los IDs de fuentes referidos por cada afirmación, existencia de imágenes referidas, imágenes vinculadas a curiosidades, referencias de relación internas y a la PR #82, coherencia de estados `publishable`, presencia de metadatos de los binarios y cotejo básico del CSV.

| Prueba | Resultado |
|---|---:|
| `catalogo_curiosidades_lote1b.jsonl` | PASS: 9 registros |
| `fuentes_lote1b.jsonl` | PASS: 17 registros |
| `catalogo_imagenes_lote1b.jsonl` | PASS: 4 registros (3 descargados, 1 candidato) |
| `relaciones_lote1b.jsonl` | PASS: 5 registros |
| Afirmaciones `claims` | 32: 25 CONFIRMADO, 3 INTERPRETACIÓN ACADÉMICA, 4 SIN VERIFICAR |
| Referencias de afirmaciones a fuentes | 35 enlaces; todas las fuentes existen |
| IDs, visual_refs, origen/destino de relaciones | PASS: sin duplicados ni referencias ajenas inesperadas |
| `cobertura_lote1b.csv` | PASS: 3 filas; total de II,1 = 4; II,74 = 5 |
| `publishable` | PASS: 9/9 false |
| Imágenes almacenadas | PASS: 3/3 con filename, dimensiones, formato, bytes, fecha y SHA-256 declarados |
| **Errores estructurales** | **0** |

## Integridad de los tres binarios — conservación comprobada

Se comparó el árbol Git de la rama **antes** de iniciar la subsanación (HEAD `6d5239610ca83fad23b4bade2b78dd6666688f95`) con el árbol del nuevo HEAD tras los cambios documentales. Las tres rutas tienen exactamente los mismos Git blob SHA-1 y bytes:

| Imagen existente | Git blob SHA-1 inalterado | Bytes |
|---|---|---:|
| `assets/ediciones_antiguas/portada_segunda_parte_1615.png` | `8d48b3c187596b243f74b07665ced2413f928580` | 1.884.607 |
| `assets/recepcion_artistica/muerte_de_don_quijote_lalanne_ormsby_1885.png` | `37450d0d2dd1b173e5082d15cb1faccb4a5d0169` | 2.057.192 |
| `assets/personajes_historicos/retrato_cervantes_atribuido_jauregui.jpg` | `b5c3462649e38a564379b2a7956223d1f5b28d5a` | 423.402 |

Los SHA-256 anteriores de catálogo (`3290d4...`, `05d42d...`, `37ad26...`) **permanecen sin cambio**. El conector GitHub en esta sesión **no admite obtener los bytes no-UTF-8** de las imágenes: la lectura directa de blob arrojó `UnicodeDecodeError` y la API de fetch rechazó contenido binario. No se ha recalculado el SHA-256 en esta sesión, por lo que no se declara falsamente que se hizo. La igualdad estricta de blob Git SHA-1 y tamaño constituye prueba independiente de que los archivos no se han modificado respecto al lote original, donde sí se calcularon los SHA-256.

## Validación editorial y límites

- Se documentó la coincidencia de «tercera salida» por consulta visual de portada BNE y texto primario, **sin atribuir intención de redacción a Cervantes**.
- La partida de enterramiento se cotejó en la transcripción analítica BNE, libro 4.º fol. 270r: fecha del sepelio 23 y fallecimiento 22 de abril de 1616.
- Se comprobó la ficha del retrato BNE: anónimo, `¿siglo XIX?`, inscripción año 1600, exposición pública 1911; se impidió representar la imagen como retrato auténtico.
- Las lecturas críticas basadas solo en resumen o fragmento están marcadas como tales; las interpretaciones sin respaldo suficiente se degradaron o se excluyeron de los textos divulgativos.
- **No se cotejaron físicamente fuentes primarias en archivos, artículos de pago ni los binarios de imagen.** No hubo revisión humana especializada, y todos los registros siguen `publishable: false`.

## CI de GitHub

Los cambios en esta rama disparan `validar-contrato` mediante GitHub Actions. Al realizar la primera consulta de esta subsanación, el run `42517948313` figuraba `in_progress` sobre HEAD `12590cab493f7070502694f2f6ab5ae308b31b24`. El estado definitivo de la CI se consultará por el **HEAD final** de la PR; la ejecución sobre un SHA anterior no certifica el último commit. No se declara SUCCESS sin ver el resultado.

## Alcance del diff

La PR mantiene únicamente cambios bajo `research/curiosidades/**`; no modifica código de aplicación, esquemas, contratos, datos productivos ni archivos de la PR #82. Los tres binarios se conservan inalterados.

**Dictamen:** integridad estructural PASS; dictamen de publicación editorial **pendiente**; recálculo directo de SHA-256 no disponible por limitación técnica de acceso binario (compensado por comparación exacta de objetos Git).
