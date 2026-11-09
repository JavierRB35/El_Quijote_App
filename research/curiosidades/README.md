# EL QUIJOTE OCULTO — Repositorio de investigación

**Repositorio oficial:** `JavierRB35/El_Quijote_App`. **Rama de investigación:** `research/curiosidades-primer-lote`. **Base inicial:** `921237af0c364418d64f12735ce4c7231dc54c0a` (8 de noviembre de 2026). La rama `main` puede avanzar en paralelo; comprobar siempre su SHA remoto al integrar.

Esta carpeta contiene investigación **no productiva**, sin autorización de publicación automática. Los IDs `CUR-*`, `SRC-*` e `IMG-*` son IDs locales de investigación, nunca IDs canónicos `DQ.DIS.*` o `DQ.MA.*`. No se edita `content/piloto/`, `schemas/` ni `app/`. Las coincidencias y posibles ampliaciones de los 14 descubrimientos del piloto se enlazan mediante `related_discoveries`.

## Alcance y estado del lote

Se han revisado parcialmente los seis capítulos prioritarios: I.6, I.8, I.11, I.18, II.1 y II.74; 120 capítulos siguen sin investigar en este lote. El archivo `cobertura_capitulos.csv` enumera los 126 capítulos. La fecha de corte del lote es 2026-11-08.

Archivos: `catalogo_curiosidades.jsonl` (afirmaciones individualizadas, anclas y cautelas), `fuentes.jsonl`, `catalogo_imagenes.jsonl` (derechos, procedencia y estado binario), `relaciones.jsonl`, `cobertura_capitulos.csv`, `cobertura_visual_piloto.csv`, `registro_busquedas.md`, `hallazgos_descartados.md`, `DERECHOS_Y_DESCARGAS.md`, `informe_ejecutivo.md` y `VALIDACION.md`.

## Reglas documentales

1. `CONFIRMADO` es una afirmación contrastada por el pasaje o la ficha identificada, no una aprobación humana global de la curiosidad.
2. Si el pasaje interno del piloto es parcial y no contiene literalmente el hecho, usar `passage: null` y documentar el localizador externo; **no fingir una ancla exacta**.
3. Toda imagen posterior a Cervantes se describe como recepción artística, no como testimonio visual de 1605–1615. Una fotografía de 2025 de un libro de 1615 es una fotografía moderna de patrimonio antiguo.
4. `downloaded_at: null`, `sha256: null` y `stored_in_github: false` indican que **el binario no ha sido descargado ni incorporado**. La resolución física de un grabado en milímetros no es resolución digital.
5. Antes de descargar o publicar una imagen comprobar permiso de acceso, licencia del fichero y del repositorio de destino; diferenciar `DOMINIO_PUBLICO`, `LICENCIA_ABIERTA` y `DERECHOS_PENDIENTES`. Una ficha no concede licencia por sí sola.
6. No generar imágenes IA en sustitución de fuentes históricas auténticas ni duplicar físicamente una obra para varias curiosidades.
7. Los registros de II.74 y sus ilustraciones tienen **spoilers del desenlace**; su aparición en Historia debe esperar al final, aunque Museo y Atlas sigan abiertos.

## Límite técnico

En esta sesión se comprobó acceso a páginas de consulta, pero la descarga HTTP de imágenes desde el contenedor falló por DNS. Ningún binario histórico se ha publicado en GitHub. Los candidatos libres se mantienen localizados con sus licencias para una descarga legítima posterior, sin inventar hashes ni fechas.

Dirección integral debe revisar la investigación y resolver incorporación a catálogo productivo mediante encargo independiente.
