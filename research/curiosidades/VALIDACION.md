# Validación del lote — 2026-11-08

## Comprobaciones ejecutadas contra la rama en GitHub

Se leyeron `catalogo_curiosidades.jsonl`, `catalogo_imagenes.jsonl`, `fuentes.jsonl`, `relaciones.jsonl` y `cobertura_capitulos.csv` directamente desde la rama y se validaron en JavaScript: parseo de cada línea JSONL, unicidad de IDs por catálogo, existencia de los enlaces de curiosidad a imagen, de claims a fuente, de ficha de imagen a curiosidad, integridad del catálogo de relaciones, conteos de curiosidades por capítulo y reglas de imágenes almacenadas.

| Control | Resultado |
|---|---:|
| Curiosidades parseadas | 11 |
| Imágenes parseadas | 13 |
| Fuentes parseadas | 21 |
| Relaciones imagen-curiosidad | 19 |
| Capítulos de cobertura | 126 |
| Capítulos con revisión parcial | 6 |
| Archivos gráficos almacenados en GitHub | 0 |
| Errores de integridad detectados | **0** |

## Límites de la comprobación

- **No se han descargado imágenes**, por fallo DNS de las peticiones HTTPS desde el contenedor; las fichas de catalogación no prueban integridad binaria.
- **No se ejecutaron pruebas de interfaz ni de empaquetado** porque no se modifica código ni contenido productivo.
- Las afirmaciones textuales se han cotejado en las fuentes indicadas, pero la validación JSONL **no** equivale a revisión filológica humana ni certifica una licencia de reproducción.
- Las anclas internas del piloto no cubren todos los detalles: cuando el hecho exacto está en el capítulo completo pero no en el extracto, se ha dejado `passage: null` o se ha identificado expresamente el alcance de la referencia.
- `SRC-007` no se usa para justificar ninguna afirmación confirmada, pues la sección exacta quedó sin consulta íntegra fiable.
- La revisión editorial y los controles finales de derechos permanecen pendientes; todas las curiosidades tienen `publishable: false`.

**Estado general:** integridad estructural conforme a las comprobaciones indicadas; publicación editorial y audiovisual bloqueada hasta autorización.
