# Fuente textual candidata — Don Quijote, Project Gutenberg eBook 2000

**Fecha de recepción y verificación:** 2026-11-05. **Modo:** COORDINACIÓN/AUDITORÍA (proveniencia editorial + QA técnico).

## Resultado y localización

Se incorpora una **copia íntegra, sin alteraciones**, del TXT entregado por el propietario:

- **Fichero en Git:** `content/textos/gutenberg_2000/El_Quijote.txt`.
- **Registro Source canónico:** `content/sources/DQ.SRC.0004.json`.
- **Manifiesto de integridad:** `content/manifests/gutenberg_2000_source.json`.
- **Fuente original pública:** https://www.gutenberg.org/ebooks/2000
- **TXT de referencia:** https://www.gutenberg.org/cache/epub/2000/pg2000.txt
- **Obra / autor:** *Don Quijote*, Miguel de Cervantes Saavedra.
- **Créditos de digitalización indicados en el archivo:** voluntariado anónimo de Project Gutenberg y Joaquin Cuenca Abela.
- **Fuente distinta de:** EPUB ilustrado Tusell/Tasso 1905, catalogado como `DQ.SRC.0001` y edición del piloto `DQ.ED.0001`.

## Verificación de integridad del archivo entregado

| Comprobación | Resultado |
|---|---|
| Tamaño exacto | **2.225.775 bytes** |
| SHA-256 | `afa1a638df7a27c343ee2d786036f5b52a0669fb75c09ac3ae594ff04fb6e239` |
| Identificador Git blob | `9d7a51e978dca96b11ba1d1b66eabd57c6ef5eb5` |
| Codificación / saltos de línea | UTF-8 sin BOM; **CRLF** |
| Número de líneas físicas | 38.056 |
| Capítulos narrativos | **126**: primera parte **52**, segunda parte **74** |
| Cabeceras Gutenberg de inicio y fin | Presentes exactamente una vez |
| Cotejo con EPUB Tusell | **Pendiente** |

El hash Git de la copia reconstruida y el hash Git del archivo recibido coinciden, por lo que el material guardado mantiene exactamente los bytes del adjunto. **No se elimina la licencia ni se moderniza la ortografía del archivo fuente.**

**Advertencia sobre segmentación:** el encabezado «Segunda parte del ingenioso hidalgo don Quijote de la Mancha» en la línea **2.859** no es el inicio de la parte publicada en 1615, sino una subdivisión interna de la primera parte; la **verdadera segunda parte** empieza en la línea **18.044** y su capítulo primero en la **18.398**. El capítulo primero de 1605 está en la línea **1.069**. El parser debe basarse en un estado de parte inequívoco, no en una búsqueda ingenua de la frase «Segunda parte». Los títulos de capítulo primero aparecen con capitalización distinta (`primero` / `Primero`).

## Derechos: dos planos distintos

1. **Obra literaria subyacente:** Miguel de Cervantes (fallecido en 1616), en dominio público. La ficha Gutenberg indica dominio público **en EE. UU.**; esa indicación no sustituye por sí sola una evaluación de usos en otros países.
2. **Copia digital con identificación Gutenberg:** contiene la licencia completa y menciones a la marca registrada Project Gutenberg. Al conservarla, deben respetarse las condiciones de uso y, especialmente, las exigencias aplicables al acceso/distribución de un libro identificado como Gutenberg. Consulta: https://www.gutenberg.org/policy/license.html. **La incorporación al repositorio privado para evaluación y uso personal no autoriza por sí sola su redistribución pública en un instalador comercial.** Cualquier lanzamiento público se someterá a una revisión específica.

## Relación con el catálogo y el juego

- `DQ.SRC.0004` es **Source**, no una aprobación automática como **Edition**. No se crea aquí `DQ.ED.0002`: el esquema de Edition exige derechos verificados y la selección canónica sigue pendiente (**PEND-01**).
- El texto de Gutenberg puede ser candidato al lector completo y al índice local offline, pero **no está todavía segmentado en 126 registros de capítulos ni indexado**; estos son entregables separados de FASE 1.
- Los **pasajes, preguntas, citas y offsets ya producidos del piloto** se derivan de `DQ.ED.0001` (Tusell). **No cambiar silenciosamente `edition_id`, hashes de pasaje, anclas, redacción de citas ni la atribución de fuentes**.
- Las acuarelas Tusell son activos iconográficos independientes: se conectan por capítulo/episodio y, cuando proceda, por pasaje **cotejado**, nunca por igualdad presumida de offsets o texto.
- No se debe confundir una **errata de extracción del EPUB** (p. ej., duplicación de una inicial capitular) con una variante de Cervantes: exige revisión sobre ambas fuentes.

## Próxima puerta de calidad antes del lector

1. **Cotejo editorial de los seis capítulos del piloto** contra ambos textos: variantes de palabras, acentuación, puntuación, omisiones, prólogos y división de capítulos, clasificadas sin alterar ninguna fuente. Revisar especialmente el pasaje de molinos y las aparentes ausencias del EPUB Tusell.
2. **Decisión documentada de edición de referencia** (**PEND-01**), con revisión legal de la modalidad de distribución prevista. No asumir que una transcripción Gutenberg corresponde íntegramente a la edición Tasso 1905.
3. **Segmentación reproducible** en 126 capítulos y pasajes con offsets locales, hash por capítulo y enlaces estables `DQ.P1.C01 … DQ.P2.C74`; excluye paratextos editoriales de las búsquedas narrativas o los clasifica expresamente.
4. **Pruebas de integración**: cobertura 126/126, no pérdida de párrafos, navegación por parte/capítulo, búsqueda/acento, enlaces desde preguntas y constancia de fuente/edición por cita.

**Estado de aceptación:** fuente recibida e integrada físicamente en una rama de Git con trazabilidad de bytes; **no** edición canonizada, lector implementado ni licencia general de redistribución.
