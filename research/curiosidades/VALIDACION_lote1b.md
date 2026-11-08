# VALIDACION — LOTE 1B (ejecutada el 2026-11-08)

## Comprobaciones ejecutadas (script Python, resultado real)

| Comprobación | Resultado |
|---|---|
| Sintaxis JSONL de los 4 ficheros JSONL | OK — 9 + 9 + 4 + 5 registros parseados sin errores |
| Unicidad de IDs (`CUR-L1B-*`, `SRC-L1B-*`, `IMG-L1B-*`, `REL-L1B-*`) | OK — sin duplicados |
| Referencias cruzadas: `claims[].sources` → `fuentes_lote1b.jsonl` | OK — todas las fuentes citadas existen |
| Referencias cruzadas: `visual_refs` → `catalogo_imagenes_lote1b.jsonl` | OK — todas las imágenes citadas existen |
| SHA-256 recalculado de los 3 binarios descargados vs. catálogo | OK — coinciden en los 3 casos |
| Tamaño en bytes de los 3 binarios vs. catálogo | OK — 1.884.607 / 2.057.192 / 423.402 |
| CSV de cobertura parseable con `csv` estándar | OK — 3 filas de datos, 6 columnas |
| Errores totales | **0** |

## Cotejos declarados y NO ejecutados (límites)

- Las citas del texto de referencia (`content/textos/gutenberg_2000/El_Quijote.txt`) fueron localizadas y leídas en el fichero, pero **no** se cotejaron contra la edición canónica de proyecto usada en `content/piloto/` (cotejo editorial pendiente; necesario antes de publicar cualquier cita).
- No se accedió a fuentes de pago (JSTOR) ni a ediciones críticas impresas.
- El estudio de e-Spania (SRC-L1B-005) se consultó solo por fragmento citado en resultados de búsqueda; lectura íntegra pendiente.
- El acta de entierro de Cervantes (SRC-L1B-008) se verificó vía transcripción referenciada en enciclopedia académica-citante, no en documento original.
- No se realizó revisión humana especializada. Todos los registros llevan `publishable: false` y requieren revisión de Dirección.

## Sinergia con la PR #82

- Ningún fichero de `research/curiosidades/` de la PR #82 fue modificado; todos los ficheros de este lote usan sufijo `_lote1b`.
- Los IDs `CUR-0001…0007`, `SRC-*`, `IMG-*` del primer lote se citan solo en `relaciones_lote1b.jsonl` como referencia de coordinación (verificados leyendo la rama `research/curiosidades-primer-lote` vía git fetch; no modificados).
