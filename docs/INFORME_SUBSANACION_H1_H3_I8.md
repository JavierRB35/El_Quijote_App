# INFORME DE SUBSANACIÓN — Entregables H1/H3 del capítulo I, 8 (R01+R02+R03)

**Fecha:** 2026-11-06 · **Destinatario:** Coordinación/Auditoría (R14) · **Contexto:** respuesta al dictamen «ENTREGABLES ACEPTADOS CON CORRECCIONES PENDIENTES».
**Entregables corregidos (mismas rutas):** `docs/MODELO_INVENTARIO_LITERARIO.md` · `docs/data/inventario_literario_p1_c08.json` · `docs/FICHA_ESCENA_P1_C08_MOLINOS.md`.
**No se inicia el inventario de los 126 capítulos** (conforme a la instrucción).

## 1. Incidencias resueltas

| # | Incidencia (dictamen) | Resolución aplicada |
|---|---|---|
| 1 | **Reconciliar edición de referencia (P1)** — el modelo declaraba PEND-01 abierta | §2 del modelo reescrita con la arquitectura de tres capas de `docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md` (RESUELTA 2026-11-05): lectura `DQ.ED.0001` (Tusell) · extracción de citas `DQ.ED.0003`/`DQ.SRC.0005` (PG #2000) · cotejo académico `DQ.ED.0002`/`DQ.SRC.0004` (Rico/IC, sin almacenamiento) + respaldo princeps 1605/1615. El inventario fija `edition_id: DQ.ED.0003` y declara las tres capas en `ediciones`. |
| 2 | **Recuento de intervenciones (P1)** — declaraba 12; había 15 en B01–B08 y 16 con B09 | Cabecera, mapa de beats y §6 TS-001 corregidos: **16 totales = 15 (B01–B08) + 1 (B09)**, 6 NARRADOR + 6 DON_QUIJOTE + 4 SANCHO. El recuento declarado se verifica por script contra las intervenciones reales del documento. |
| 3 | **Revisar y aprobar pasajes propuestos (P1)** | Los **24 fragmentos** de los 13 pasajes propuestos `DQ.P1.C08.P0013–P0025` fueron recotejados por script (texto verbatim carácter a carácter + línea inicial + unicidad) contra `DQ.SRC.0005`. Estado actualizado en el inventario: `VALIDADO_PENDIENTE_ALTA_FISICA_EN_CATALOGO` con `revision_r01_r02` (locador PASS, texto PASS, clasificación revisada, aprobación R01 2026-11-06) y `clase` por pasaje (NARRACION/DIALOGO/MIXTO). La **alta física** en `content/piloto/passages/` + `package.json` queda expresamente pendiente del contrato de beats (R09/R11) para no divergir del catálogo. |
| 4 | **Resolver condensaciones (P1)** | Las 3 del inventario (U03 espuelas, U09 frailes, U12 combate/suspensión) y las 2 de la ficha (B05, B09) quedan resueltas con dictamen R01 firmado (`R01_FIRMADA_2026-11-06`): U03 y B05 APROBADAS CON CONDICIÓN (el texto íntegro, incluida «ni oía las voces…», permanece visible; la fusión es solo de puesta en beats); U09 APROBADA CON CONDICIÓN (se conservan las 4 réplicas íntegras y el hecho completo de la paliza; solo se comprime la narración de carga); U12 APROBADA CON CONDICIÓN (la suspensión del autor NUNCA se condensa: llave de I, 9); B09 RESUELTA POR SUSTITUCIÓN (se descarta la redacción propia de la v1.0 y se adopta el texto literal P0017 como CITA_LITERAL). Cada dictamen registra la verificación de contenido: acontecimiento, intención literaria, mecanismo humorístico y reacción. |
| 5 | **Precisar intervenciones del guion (P1)** | Las 16 intervenciones de la ficha reestructuradas con los 5 campos exigidos: `speaker_id`, `texto_visible` (en pantalla, íntegro, incluidos los incisos del narrador), `texto_oral` (para el intérprete: solo palabras del hablante, incisos retirados), `text_kind` y `passage_ref`. Campo `incisos_narrador` explícito en las **7 intervenciones con inciso** (I03–I06, I13–I15; un inciso cada una). TS-001 aplicado también a narraciones: si se pronuncia, se muestra. IDs de intervención renombrados `I01…I16` para no colisionar con las unidades `DQ.UN.*.U01…U12`. |

## 2. Verificaciones realmente ejecutadas (no declaradas sin evidencia)

Script de verificación (localización v1.1) sobre `content/textos/gutenberg_2000/El_Quijote.txt` normalizado (`CRLF→LF`, 2.168.088 caracteres; SHA-256 de la copia `afa1a638…fb6e239`):

1. **16/16 texto_visible** de la ficha: coincidencia exacta con el rango de offsets declarado y línea inicial correcta.
2. **7/7 incisos** contenidos en su texto_visible; **16/16 texto_oral** equivalentes al texto_visible con incisos retirados y raya de diálogo eliminada.
3. **Recuento 16 = 15+1** y reparto por hablantes (6/6/4) contrastados contra las intervenciones reales del documento.
4. **24 fragmentos** de los 13 pasajes propuestos P0013–P0025: cotejo verbatim + línea inicial + unicidad del arranque.
5. **9 passage_ids** existentes citados por el inventario: presencia comprobada en `content/piloto/passages/`; citas literales cotejadas contra su pasaje.
6. **Capas de edición** del inventario: extracción DQ.ED.0003 / lectura DQ.ED.0001 / cotejo DQ.ED.0002.
7. **Resolución previa** (entrega 1.0): suite de fixtures del validador editorial 42/42 PASS y `validate_package` 0 errores — no re-ejecutada en esta subsanación porque no se ha modificado ningún fichero de `content/` (los pasajes propuestos siguen fuera del catálogo hasta el contrato).

**Resultado agregado de esta subsanación: 79 PASS / 0 FAIL.**

## 3. Pendientes que permanecen abiertas

1. **Revisión cervantista humana e independiente** de los tres entregables: la presente subsanación está firmada por el mismo agente que los redactó (R01+R02+R03 en un solo equipo); el dictamen de coordinación exige revisión con ese carácter antes de la aceptación editorial definitiva.
2. **Alta física de P0013–P0025** en el catálogo (`content/piloto/passages/` + `package.json` + validador): bloqueada por diseño hasta que R09/R11 formalicen el contrato de beats/intervención (la Biblia prohíbe editar esquemas en solitario).
3. **Cotejo puntual contra la edición académica** (Rico/IC, `DQ.ED.0002`): requisito para elevar unidades y citas a `REVISADA_CERVANTISTA`; hoy el estado de las unidades es `INVENTARIADA`/`GUIONIZADA_PROPUESTA` con cotejo PG completo.
4. **Storyboard de planos (R06)** y **cue sheet (R07)** sobre los textos ya fijos — no iniciados en este encargo.
5. **Extensión del método a los 126 capítulos**: bloqueada por instrucción expresa hasta la aceptación editorial definitiva del modelo corregido.

## 4. Traza

- Correcciones aplicadas sobre las mismas rutas de los tres entregables (sin ficheros duplicados).
- Commits: rama `feature/cont-h1-subsanacion-h1-h3-i8` → merge a `main` (ver historial); este informe acompaña a la versión corregida.
- Método de verificación documentado en `docs/MODELO_INVENTARIO_LITERARIO.md` §5; tabla de localización de la ficha en su §8.
