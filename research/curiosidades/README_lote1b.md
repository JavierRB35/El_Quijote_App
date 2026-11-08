# Investigación El Quijote oculto — LOTE 1B (P2.C01 y P2.C74)

Lote complementario al primer lote en curso en la PR #82 (`research/curiosidades-primer-lote`), coordinado según issue #83: este lote cubre **exclusivamente** los capítulos **Segunda Parte, capítulo I** y **Segunda Parte, capítulo 74**, no incluidos en la PR #82, y añade **descargas reales de imágenes de dominio público** con SHA-256 y procedencia verificada.

## Principios operados

- **Base textual:** `content/textos/gutenberg_2000/El_Quijote.txt` (fuente canónica del proyecto, `DQ.SRC.0005`). Todas las citas literales están localizadas y verificadas en ese fichero. No se sustituyó la edición textual del proyecto.
- **IDs de investigación, no productivos:** `CUR-L1B-*`, `SRC-L1B-*`, `IMG-L1B-*`. No crean `DQ.DIS.*` ni modifican `content/piloto/**`. Nombres de fichero con sufijo `_lote1b` para no colisionar con los ficheros del primer lote (PR #82).
- **Trazabilidad de afirmaciones:** cada afirmación factual lleva fuente y grado de certeza (`CONFIRMADO`, `INTERPRETACIÓN ACADÉMICA`, `HIPÓTESIS PLAUSIBLE`, `DISCUTIDO`, `SIN VERIFICAR`, `DESCARTADO`). Lo no publicable queda marcado como tal.
- **Imágenes:** solo se han incorporado ficheros realmente descargados (3), con SHA-256, dimensiones verificadas y página de ficha en Wikimedia Commons; dominio público declarado en la ficha de origen. Una candidata adicional (portada del *Segundo tomo* de Avellaneda, 1614) queda registrada **sin descarga** por ser un PDF de libro completo.
- **Honestidad de fuentes:** no se declara ninguna consulta, lectura o verificación no realizada. Véanse limitaciones en `registro_busquedas_lote1b.md` y `VALIDACION_lote1b.md`.
- Sin revisión humana especializada; investigador automatizado, fecha de trabajo 2026-11-08.

## Contenido de este lote

| Fichero | Contenido |
|---|---|
| `catalogo_curiosidades_lote1b.jsonl` | 9 curiosidades (4 de P2.C01, 5 de P2.C74) |
| `fuentes_lote1b.jsonl` | 9 fuentes registradas |
| `catalogo_imagenes_lote1b.jsonl` | 3 imágenes descargadas + 1 candidata |
| `relaciones_lote1b.jsonl` | relaciones entre curiosidades y con el primer lote |
| `cobertura_lote1b.csv` | estado de los 2 capítulos cubiertos |
| `registro_busquedas_lote1b.md` | búsquedas realizadas, infructuosas y pendientes |
| `hallazgos_descartados_lote1b.md` | identificaciones desestimadas y observaciones textuales |
| `VALIDACION_lote1b.md` | comprobaciones ejecutadas |
| `informe_ejecutivo_lote1b.md` | resumen, estadísticas y SHA inicial/final |

Los IDs `CUR-0001…0007`, `SRC-001…009` e `IMG-001…008` del primer lote (PR #82) no se alteran. La consolidación futura de ambos lotes en ficheros únicos corresponde a un encargo posterior bajo decisión de Dirección.
