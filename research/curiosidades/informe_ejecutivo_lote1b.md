# Informe ejecutivo — subsanación final del lote 1B (2026-11-08)

## Identidad y alcance

- Repositorio oficial: `JavierRB35/El_Quijote_App`; PR **#84** (rama ya existente `research/curiosidades-lote1b-p2c01-p2c74`).
- SHA base de `main` desde el que se creó originalmente: `909479db65ae04836c6dec7ae8e602c66866e1e9`.
- **SHA inicial de esta subsanación (HEAD PR #84 antes de cambios):** `6d5239610ca83fad23b4bade2b78dd6666688f95`.
- El SHA de cierre se documenta en la PR después del último commit de validación. `main` debe verificarse nuevamente antes de integrar.
- No se amplía el número de registros ni se modifican imágenes binarias, aplicación, contratos, archivos productivos o ficheros de la PR #82.

## Resultado después de la subsanación

| Indicador | Estado |
|---|---:|
| Curiosidades | **9**: 4 sobre II,1 y 5 sobre II,74 |
| Fichas `contrastado` (afirmaciones principales documentadas) | **5** |
| Fichas `candidato` (hipótesis/no verificadas) | **4** |
| Afirmaciones `CONFIRMADO` | **25** |
| Afirmaciones `INTERPRETACIÓN ACADÉMICA` | **3** |
| Afirmaciones `SIN VERIFICAR` | **4** |
| Fuentes registradas | **17** (incluidos estudios consultados solo por resumen y pistas pendientes) |
| Imágenes descargadas conservadas | **3** (sin cambio de binario, nombre o huella SHA-256 declarada) |
| Candidatas iconográficas no descargadas | **1** |
| Relaciones | **5** |
| Registros publicables | **0** |

## Rectificaciones sustantivas

**CUR-L1B-001:** Hay coincidencia verificable de la fórmula «tercera salida» en la portada apócrifa de 1614 y en II,1 de 1615. La imagen de portada BNE fue examinada directamente. No existe en este lote prueba de que el inicio fuera redactado **por causa** del apócrifo. Pontón (2016) y Pedraza (2015) investigan la relación entre obras, pero se distinguió hipótesis general de prueba concreta. `status: candidato`.

**CUR-L1B-002:** Descripción textual del arbitrio de don Quijote, con lectura contextual de la crítica a los arbitristas; estudio histórico-jurídico de Marina Rojo Gallego-Burín (2019) consultado. No se afirma intencionalidad literaria única.

**CUR-L1B-003:** La identificación Barahona de Soto/Lope se basa en Fernández de Navarrete y documentación bibliográfica de 1602; la referencia al escrutinio de I,6 se ha contrastado con un estudio de Marcella Trambaioli que cita la edición Rico. El posible dardo irónico a Lope queda `SIN VERIFICAR`.

**CUR-L1B-008:** «Tordesillesco» se describe como dato textual vinculado a II,70 y a la portada apócrifa; se elimina un consenso académico no documentado.

**CUR-L1B-009:** BNE, Libro 4.º de difuntos, fol. 270r: fallecimiento **22 de abril de 1616**, sepelio **23 de abril** entre las Trinitarias. La fórmula del asiento del 23 se transcribe correctamente y se explica. Rescate por Juan Gil y entierro se registran separadamente; no se atribuyen motivos. Comparaciones calendáricas y excavaciones de 2015 no aparecen como hechos divulgativos sin fuente institucional cotejada.

**IMG-L1B-003:** óleo **anónimo**, atribuido de manera controvertida a Jáuregui, BNE `¿siglo XIX?`, primera difusión pública **1911**. La fecha 1600 es una **inscripción**, no datación acreditada. Se conserva el archivo JPG original sin modificación.

## Límites y entrega

La investigación no acredita autenticidad del retrato, intenciones de Cervantes ni hechos históricos extrapolados desde la ficción. Las tres imágenes permanecen físicamente en el mismo repositorio. Todas las curiosidades siguen con `publishable:false`. Los resultados estructurales y el alcance real de la comprobación de integridad se registran en `VALIDACION_lote1b.md`; la CI se verifica por el SHA final de la rama en GitHub.

**No fusionar automáticamente.**
