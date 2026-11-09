# CONTRATO EDITORIAL-TÉCNICO — v0.2.0 (borrador integrado)

**Estado histórico:** consolidación editorial/técnica v0.2.0 de 2026-11-05, con contrafirma registrada en §12. La versión contractual real vigente debe verificarse **en los esquemas de GitHub**, no deducirse del título. **Actualización operativa 2026-11-08 (DC-23–DC-27):** Dirección integral decide requisitos editoriales y revisa; un desarrollador implementa/valida. No hay nuevas firmas de equipos R01–R16. Rondas de anticipación con preimagen propia, Historia visualmente rica, escenas prioritarias y acuarelas secundarias; la relajación de listas vacías de Scene/Beat requiere PR técnica versionada y pruebas, no se declara ya implementada.
**Fuente normativa:** `docs/ENCARGO_MAESTRO.md` §2.2, §4.3, §6.1–§6.3, Anexo A.
**Última actualización normativa:** 2026-11-08 (DC-23–DC-27); los hitos de reconciliación anteriores permanecen históricos.

---

## 0. Registro de reconciliación (borrador 0.1 editorial ⊕ v0.1.0 técnico)

Ambos equipos redactaron en paralelo el 2026-11-05. Divergencias detectadas y resolución adoptada:

| Punto | Propuesta editorial | Propuesta técnica | Resolución v0.2.0 |
|---|---|---|---|
| ID de episodio | `DQ.P{n}.E{nn}` (orden canónico) | `DQ.P{n}.C{nn}.E{nn}` (anclado al primer capítulo) | **Técnica**: el encargo §6.1 usa `DQ.P1.C08.E01` como ejemplo orientativo; el ancla al primer capítulo conserva trazabilidad. Los IDs provisionales del `MAPA_EPISODIOS_Y_CAPITULOS.md` (p. ej. `DQ.P1.E04`) migrarán al formalizar los episodios; el mapa ya declara sus IDs provisionales |
| ID de opción | `.O{a-z}` (letras) | `.O{nn}` (2 dígitos) | **Técnica**: uniforme, ordenable y sin límite de 26 |
| ID de descubrimiento | `DQ.A.{6}` | `DQ.DIS.{6}` | **Técnica**: `DIS` es autoexplicativo; el encargo no fija este prefijo |
| ID de medio | `DQ.IL/DEC/MED` (3 familias) | `DQ.MA.{6}` única | **Técnica**: una entidad MediaAsset con `media_class` distingue acuarela/decorativo/general; un solo patrón simplifica validación y referencias. El manifiesto del EPUB ya comprometido usa claves de documento (no IDs de contrato), sin coste de migración |
| ID de personaje | `DQ.PER.{6}` | `DQ.PER.{4}` | **Técnica**: 4 dígitos (1.999 personajes bastan con holgura); ampliable solo con versión MAJOR |
| ID de pasaje | `DQ.P1.C08.PS03` | `DQ.P1.C08.P{4d}` | **Técnica**: ordinal numérico uniforme |
| Clases de medio | `acuarela_historica, arte_historico, fotografia_actual, recreacion_ia, captura_ui` | `FOTOGRAFIA_ACTUAL, IMAGEN_HISTORICA, RECREACION_IA, ILUSTRACION_EDITORIAL` | **Editorial** (con ajuste): `ACUARELA_HISTORICA`, `ARTE_HISTORICO`, `FOTOGRAFIA_ACTUAL`, `RECREACION_IA`, `ILUSTRACION_EDITORIAL`. `captura_ui` no es evidencia editorial; las acuarelas Tusell requieren su propia clase (415 ficheros ya inventariados) |
| Tipos de evidencia | `cita_literal, parafraasis_localizada (sic), fuente_historica, estudio_academico, comentario_editorial` | `cita_literal, fuente_historica, estudio_academico, interpretacion_editorial` | **Fusión**: `cita_literal`, `parrafo_localizado` (ortografía corregida), `fuente_historica`, `estudio_academico`, `interpretacion_editorial` |
| spoiler_policy | enum simple: `capitulo_actual/episodios_anteriores/siempre/nunca` | estructura `safe_after_episodes[]` | **Técnica**: estructurada es comprobable por máquina; el enum editorial queda como abreviatura documental (tabla de equivalencias en §4) |
| difficulty | `facil/media/dificil` | entero 1–5 | **Técnica**: 1–5 alimenta el selector adaptativo (§5.4); equivalencia documentada 1–2=fácil, 3=media, 4–5=difícil |
| allowed_uses | `uso_interno, instalador, web_publica` | `uso_personal_app, almacenamiento_repo_git, redistribucion` | **Técnica**: alineado con el encargo §4.1/§4.7.8 (uso personal / repositorio / redistribución) y con las puertas de licencia implementadas |
| Opciones por ronda | minItems 3, maxItems 8 | minItems 3 (single) sin máximo | **Fusión**: 3–8 opciones; `true_false` exactamente 2 |
| evidence obligatoria | `passage_ids` minItems 1 en TODA pregunta | pasajes opcionales si hay fuente histórica | **Técnica**: el encargo §4.3.9 admite «capítulo/pasaje **o** fuente histórica»; `evidence[]` siempre ≥1 |

## 1. Versionado y compatibilidad

**Regla de integración vinculante (§6.2 del encargo):** un elemento editorial nunca se publica si apunta a un ID inexistente o si su imagen/cita/licencia requerida está pendiente.

### Cambios v0.2.0 registrados durante la integración real (§6.5.10)

Ejercicio con la precarga editorial real (`docs/INTEGRACION_PRECARGA.md`): 73 registros importados y **VÁLIDOS** contra el contrato canónico (suite principal: 42/42 PASS, sin regresión). Cambios MINOR que provocó:

1. `place.status` añade `patrimonio_asociado` (estaba en el encargo §4.5 y faltaba en el esquema — defecto del contrato, no de la precarga).
2. `place.geometry` admite `null` (topónimos literarios no geolocalizables con honradez; prohibido inventar coordenadas).
3. `MediaAsset.function` añade `referencia` (imágenes de referencia artística del paquete de escenas, sin fase narrativa).
4. Reglas de paquete del validador: `semantic_key` único por paquete e imagen previa con `spoiler_level: ninguno` (§4).

Pendiente de doble firma: el vocabulario de **producción** editorial (`humor` vs `humor_escena`, nombres de campo) se alineará con la canónica — o el contrato absorberá las variantes — al formalizar la batería de preguntas.

- Versión del contrato: **semver**. Soportadas actualmente: **`1.0.0` y `1.1.0`** (los borradores 0.x no fijan compatibilidad).
  - **v1.1.0 (2026-11-06, MINOR retrocompatible — R09/R11, DC-22/TS-001):** añade las entidades **Beat** (`DQ.BEAT.*`) e **Intervención** (anidada, ID global `DQ.INT.*`), `MediaFunction: voz`, `ContractVersion` como enum {1.0.0, 1.1.0} y la categoría opcional `beats` en el manifest de paquete. Ver §5 bis y ADR-0005. Registros 1.0.0 siguen siendo válidos sin cambios.
  - **MAJOR**: cambio incompatible (renombrar/eliminar campo, restringir enumeración, cambiar patrón de ID).
  - **MINOR**: añadido compatible (campo opcional nuevo, valor nuevo de enumeración, entidad nueva).
  - **PATCH**: correcciones de documentación o de validador sin efecto en datos.
- Cada registro declara `contract_version`; el paquete declara la suya en el manifest. Un consumidor **rechaza** paquetes con versión no soportada (error `CONTRACT_VERSION_UNSUPPORTED`): ningún equipo asume actualizaciones silenciosas ajenas (§6.5.8).
- Al cambiar el contrato: registrar versión, calendario de adaptación y pruebas de consumidor en este documento (§9).

## 2. Identificadores estables (§6.1)

Formato general `DQ.<TIPO>…`; separador `.`; ceros a la izquierda fijos. **Reglas:**

1. Los IDs son únicos, permanentes y **nunca se reutilizan** tras retirar un elemento.
2. Toda relación entre entidades se expresa **por ID**, jamás por texto visible, posición de opción, nombre de fichero o fila.
3. Los cambios editoriales que alteren IDs se resuelven con **alias/migraciones** (`content/manifests/aliases.json`, aún sin crear), no con renumeraciones masivas (§6.5.9).
4. El ID de un episodio se ancla a su **primer** capítulo, aunque el episodio atraviese varios (`chapters[]` los lista).

| Entidad | Patrón (regex) | Ejemplo |
|---|---|---|
| Edition | `^DQ\.ED\.\d{4}$` | `DQ.ED.0001` |
| Chapter | `^DQ\.P1\.C(0[1-9]\|[1-4][0-9]\|5[0-2])$` o `^DQ\.P2\.C(0[1-9]\|[1-6][0-9]\|7[0-4])$` | `DQ.P1.C08` |
| Passage | `^DQ\.P[12]\.C\d{2}\.P\d{4}$` | `DQ.P1.C08.P0003` |
| Episode | `^DQ\.P[12]\.C\d{2}\.E\d{2}$` | `DQ.P1.C08.E01` |
| Scene | `^DQ\.P[12]\.C\d{2}\.E\d{2}\.S\d{2}$` | `DQ.P1.C08.E01.S02` |
| Question | `^DQ\.Q\.\d{6}$` | `DQ.Q.000123` |
| Option | `^DQ\.Q\.\d{6}\.O\d{2}$` | `DQ.Q.000123.O02` |
| Discovery | `^DQ\.DIS\.\d{6}$` | `DQ.DIS.000045` |
| Person | `^DQ\.PER\.\d{4}$` | `DQ.PER.0012` |
| Place / Route | `^DQ\.LOC\.\d{4}$` / `^DQ\.RTE\.\d{4}$` | `DQ.LOC.0007` / `DQ.RTE.0002` |
| MuseumItem | `^DQ\.MUS\.\d{4}$` | `DQ.MUS.0031` |
| Beat narrativo | `^DQ\.BEAT\.\d{6}$` | `DQ.BEAT.000012` |
| Intervención | `^DQ\.INT\.\d{6}$` (ID global único, anidada en su beat) | `DQ.INT.000045` |
| MediaAsset | `^DQ\.MA\.\d{6}$` | `DQ.MA.000567` |
| Source / License | `^DQ\.SRC\.\d{4}$` / `^DQ\.LIC\.\d{4}$` | `DQ.SRC.0014` / `DQ.LIC.0006` |
| Profile (jugador) | `^prf_[0-9a-f]{8}-(…){12}$` | `prf_12345678-…` |

Los patrones de capítulo ya codifican la realidad textual (P1: 52 capítulos, P2: 74): `DQ.P1.C99` es estructuralmente inválido.

## 3. Entidades y esquemas (§6.2)

| Entidad | Esquema | Notas de integración |
|---|---|---|
| Edition | `schemas/content/edition.schema.json` | Edición de referencia textual; `rights_status` exige `verificada` |
| Chapter | `schemas/content/chapter.schema.json` | `order` = posición canónica global (P1: 1–52, P2: 53–126) |
| Passage | `schemas/content/passage.schema.json` | `text_indexable` separado del original; `sha256` de estabilidad |
| Episode | `schemas/content/episode.schema.json` | Atraviesa capítulos; `spoiler_flags` gobierna aventuras aleatorias |
| Scene | `schemas/content/scene.schema.json` | Capas con `parallax` (se ignora con movimiento reducido); hotspots siempre opcionales y accesibles por teclado |
| Question | `schemas/content/question.schema.json` | El contrato más estricto; ver §4 |
| Discovery | `schemas/content/discovery.schema.json` | Cita/refrán exige pasaje + locutor; lectura/alusión exige bibliografía y certeza no textual |
| Person | `schemas/content/person.schema.json` | Clase `ficticio/historico/debatido` |
| Place/Route | `schemas/content/place.schema.json` | Ruta ⇒ `presented_as: hipotesis` **obligatorio** |
| MuseumItem | `schemas/content/museum-item.schema.json` | `attribution_status` controla si `authorship` puede estar vacío |
| Beat + Intervención | `schemas/content/beat.schema.json` | v1.1.0: unidad de reproducción con `utterances[]`; ver §5 bis y ADR-0005 |
| MediaAsset | `schemas/media/media-asset.schema.json` | `alt` obligatorio; clases de evidencia siempre rotuladas |
| Source / License | `schemas/media/source.schema.json`, `license.schema.json` | Fecha de consulta obligatoria |
| Profile | `schemas/player/profile.schema.json` | Dominio C del jugador; intercambio/backup, no catálogo |
| ContentPackage | `schemas/manifests/content-package.schema.json` | Manifest con rutas relativas, checksums opcionales y `counts` |

Definiciones compartidas (IDs, enumeraciones, Review, EvidenceItem, NormalizedArea): `schemas/content/_definitions.schema.json`.

## 4. Aventura narrativa — contrato de producto vigente

No existe la entidad `question` ni el banco de exámenes culturales en el manifiesto editorial vigente. El paquete conserva capítulos, episodios, pasajes, escenas, beats, medios, descubrimientos, personas, lugares, fichas museísticas, fuentes y derechos. Las **rondas de anticipación** del piloto I.8 se definen actualmente en `app/src/aventura/guionNarrativo.ts` y `motorNarrativo.ts`: cada ronda identifica un hecho inmediato, tres alternativas habituales, una acción canónica, consecuencia documentada, `pasajeId`, preimagen exclusiva antiespoiler, imagen posterior y checkpoint opcional.

El paso a contrato de datos declarativo para 126 capítulos está pendiente de diseño/QA; no recuperar el esquema `question.schema.json`, sus validadoras ni su banco, y no inventar IDs productivos sin aprobación. Fidelidad textual, derechos y trazabilidad siguen siendo vinculantes.

## 5 bis. Intervenciones narrativas y beats (v1.1.0 — R09/R11, DC-22/TS-001)

**Decisión de coordinación del propietario:** el **texto es el elemento principal del contrato** y el **audio un recurso asociado opcional**. Estructura de una intervención (tabla del propietario → campos del contrato):

| Concepto (propietario) | Campo del contrato |
|---|---|
| Identificador: intervención única y estable | `utterance_id` (`DQ.INT.NNNNNN`, único global) dentro de su **Beat** (`DQ.BEAT.NNNNNN`) |
| Personaje: Narrador, Don Quijote, Sancho u otro | `speaker: {tipo: narrador \| personaje, person_id?, label?}` — «personaje» exige `DQ.PER.*` |
| Texto visible: obligatorio, íntegro, siempre disponible | `texto_visible` (obligatorio, `minLength` 1) — **nunca hay beat sin texto** |
| Origen literario: cita, adaptación o narración de enlace | `text_kind: CITA_LITERAL \| ADAPTACION_FIEL \| NARRACION_ENLACE` — las dos primeras exigen `passage_ids` existentes |
| Audio: opcional, asociado | `audio_asset_id` → MediaAsset de **función `voz`** (formato mp3/ogg); opcional o `null` |
| Imagen: una o varias perspectivas | `visual_asset_ids` del beat (`minItems` 1) |
| Controles: pausa, continuar, repetir y retroceder | `manual_advance_allowed`, `replay_allowed` + especificación de consumidor (`docs/COMPONENTES_NARRATIVOS_UX.md`) |

Reglas vinculantes (validador activo, §8 CI):

1. **TS-001 por construcción**: toda intervención exige `texto_visible`; un «audio sin texto visible» es estructuralmente imposible.
2. Referencias rotas se rechazan (escena, perspectivas, hablante, pasajes, audio fantasma → `REFERENCE_ERROR`).
3. El audio debe ser real: formato de voz (mp3/ogg) en el MediaAsset referenciado.
4. `order` del beat único por escena; `utterance_id` único global.
5. `reduced_motion_fallback: true` obligatorio en todo beat.
6. Trazabilidad inversa a la fuente: `unit_ids[]` del inventario literario (biblia §3) y `localizador` por intervención.

Mapeo desde el inventario editorial (`dialogos_literales[]` → intervención) documentado en ADR-0005. **El reproductor NO se implementa en este encargo (R10)**: su contrato de consumidor y matriz de pruebas están en `COMPONENTES_NARRATIVOS_UX.md`.

### Rev. 2 de v1.1.0 — subsanación del dictamen H5 (2026-11-06, Coordinación → DESARROLLO)

Dictamen: **estructura aceptada; subsanación funcional necesaria** (registrado en PR #19). Cambios aplicados, todos retrocompatibles y sin implementar el reproductor:

1. **P0-1:** eliminado el estado `AVANCE_BLOQUEADO`; invariante nuevo: ninguna combinación de estados/flags bloquea el avance por ausencia, silenciamiento o error de voz (`COMPONENTES_NARRATIVOS_UX.md` §2.1).
2. **P0-2:** política de autoavance cinematográfico (DC-21): duración del beat = `max(voz, lectura_mínima)` con fórmula `max(1500 ms, 800 ms + 35 ms/palabra)` parametrizable por el piloto; el fin de la voz nunca oculta texto ni avanza por sí solo. Nuevos campos opcionales de beat: `avance_automatico`, `lectura_minima_ms`.
3. **P1-1:** `manual_advance_allowed`/`replay_allowed` re-semanticizados como sugerencias de ritmo (solo difieren el salto con voz sonando / solo silencian la repetición de voz); los cuatro controles del propietario existen siempre.
4. **P1-4:** el texto no espera imágenes (carga en paralelo + fallback en cascada); `visual_asset_ids ≥ 1` se mantiene en el dato **pendiente de doble firma**.
5. **P1-5:** triada `texto_visible` / `incisos_narrador` / `texto_oral` con la semántica de FICHA_ESCENA_P1_C08 §3; regla verificable activa: ningún inciso del narrador aparece en `texto_oral` (caso «—respondió Sancho—»).
6. **P1-6:** `texto_visible` con `pattern: \S` — se rechazan los textos de solo espacios, sin normalizar el contenido (fidelidad de citas).
7. **P1-7:** pendiente la **contrafirma editorial** de ADR-0005 (desviaciones de la biblia §4 incluidas); solicitud formal registrada — la fusión en `main` y el CI verde no la sustituyen.

Evidencia: suite **51/51 PASS** (+2 fixtures: `beat_oral_incisos`, `invalid_beat_texto_blanco`), paquetes reales VÁLIDOS, informe en `docs/INFORME_SUBSANACION_H5.md`.

## 5. Enumeraciones formales (§6.3.4)

| Enumeración | Valores |
|---|---|
| Certainty (Anexo A) | `TEXTO_EXPLICITO`, `HECHO_HISTORICO_DOCUMENTADO`, `INTERPRETACION_ACADEMICA`, `HIPOTESIS_PLAUSIBLE`, `DISCUTIDO`, `RECREACION_ARTISTICA` |
| ReviewState | `borrador`, `documentada`, `revisada`, `aprobada`, `descartada` |
| LicenseStatus | `verificada`, `pendiente`, `restringida`, `desconocida` — **«desconocida» ≠ autorizada** |
| AllowedUse | `uso_personal_app`, `almacenamiento_repo_git`, `redistribucion` |
| MediaClass | `ACUARELA_HISTORICA`, `ARTE_HISTORICO`, `FOTOGRAFIA_ACTUAL`, `RECREACION_IA`, `ILUSTRACION_EDITORIAL` |
| QuestionType | `single_choice`, `multi_choice`, `true_false`, `ordering`, `matching`, `hotspot` |
| CognitiveType | `hecho`, `secuencia`, `causa_consecuencia`, `actitud_reaccion`, `dialogo`, `humor`, `cita`, `interpretacion`, `historia`, `lugar`, `arte` |
| ScenePhase | `before`, `question`, `reveal`, `after` |
| SpoilerLevel | `ninguno`, `leve`, `revelador` |

Ampliar una enumeración = versión MINOR del contrato con registro aquí.

## 6. Puertas de licencia y publicación

| Puerta | Exige al MediaAsset | Aplica a |
|---|---|---|
| `app` | `license_status = verificada` ∧ `uso_personal_app ∈ allowed_uses` | Empaquetado del instalador |
| `repo` | lo anterior ∧ `almacenamiento_repo_git ∈ allowed_uses` | Cualquier subida al Git remoto |

Reglas derivadas (encargo §4.7.8, §6.5.11, §6.3.4): un activo puede ser legítimo en el instalador y aun así **prohibido en el repositorio**; ningún registro se publica apuntando a un ID inexistente o a un activo/cita/licencia pendiente; los maestros audiovisuales pesados no se commitean. **Excepción vigente:** las ilustraciones Tusell (~29 MB) se alojan en Git normal **por orden expresa del propietario (2026-11-05)**, con expediente de derechos en `docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md` (uso interno autorizado; redistribución bloqueada hasta PEND-09). Ver `.gitignore` y `docs/GOBERNANZA_GIT.md` §5.

## 7. Ejemplos sintéticos NO publicables (§6.3.2)

`tests/contracts/fixtures/` — **todo su contenido es sintético y jamás entra al catálogo**:

- `valid/` — 25 registros: uno por entidad y uno por cada tipo de pregunta (single, multi, true_false, ordering, matching, hotspot), más perfil de jugador.
- `package_valid.json` — manifest de paquete íntegro con referencias cruzadas resueltas.
- Los `sha256:000…0` de los fixtures son marcadores; los hashes reales los calcula el pipeline de importación.

## 8. Casos negativos y pruebas de contrato (§6.3.7)

Cada caso negativo debe FALLAR con el código esperado. Batería: `python tools/editorial_validation/validate.py suite tests/contracts/fixtures` → **42/42 PASS (2026-11-05, puerta repo)**; informe: `tests/contracts/last_validation_report.json`.

| Fixture | Código esperado | Regla del encargo |
|---|---|---|
| `invalid/invalid_question_no_correct.json` | `SCHEMA_ERROR` | Sin respuesta inequívoca (§7.1) |
| `invalid/invalid_question_single_option.json` | `SCHEMA_ERROR` | Elección real exige ≥3 opciones |
| `invalid/invalid_question_multi_not_declared.json` | `SCHEMA_ERROR` | Multi solo con declaración explícita (§2.2) |
| `invalid/invalid_question_option_ids_mismatch.json` | `SEMANTIC_ERROR` | Relaciones por ID existente (§6.1) |
| `invalid/invalid_question_bad_chapter.json` | `SCHEMA_ERROR` | Capítulo mal referenciado (§6.3.7) |
| `invalid/invalid_question_certainty_mismatch.json` | `SEMANTIC_ERROR` | No fabricar verdad única (§2.2) |
| `invalid/invalid_question_hotspot_out_of_bounds.json` | `SEMANTIC_ERROR` | Punto fuera de imagen (§6.3.7) |
| `invalid/invalid_discovery_cita_without_passage.json` | `SCHEMA_ERROR` | Cita sin pasaje (§6.3.7) |
| `invalid/invalid_media_unknown_license.json` | `LICENSE_NOT_VERIFIED` | «Desconocido» ≠ autorizado (§6.3.4) |
| `invalid/invalid_media_repo_only.json` | `ALLOWED_USE_MISSING` (puerta repo; válido bajo app) | Legítimo en instalador, no en Git (§4.7.8) |
| `invalid/invalid_place_no_certainty.json` | `SCHEMA_ERROR` | Topónimo sin certeza (§7.1) |
| `invalid/invalid_route_not_hypothesis.json` | `SCHEMA_ERROR` | Ruta sin grado de hipótesis (§2.4) |
| `package_invalid_missing_media.json` | `REFERENCE_ERROR` | Escena con imagen inexistente (§6.3.7) |
| `package_invalid_stale_contract.json` | `CONTRACT_VERSION_UNSUPPORTED` | Paquete incompatible (§6.5.8) |
| `package_invalid_duplicate_semantic.json` | `SEMANTIC_ERROR` | Duplicado semántico (§4.3.13) |
| `package_invalid_revealing_preimage.json` | `SEMANTIC_ERROR` | Imagen previa reveladora (§4.3.4, §7.2) |

Códigos del validador: `SCHEMA_ERROR`, `SEMANTIC_ERROR`, `REFERENCE_ERROR`, `LICENSE_NOT_VERIFIED`, `ALLOWED_USE_MISSING`, `CONTRACT_VERSION_UNSUPPORTED`.

Casos negativos definidos por el equipo editorial aún **sin automatizar** (requieren la capa de texto o el build): pasaje con hash distinto al de la edición; cobertura de fases de escena por episodio. Quedan en el plan de QA.

## 9. Respuestas del equipo técnico a los puntos abiertos del borrador editorial

1. **`ordering`/`matching`/`hotspot`:** definidos en `question.schema.json` (`correct_order`, `pairs`, `hotspot_area` + `visual_requirements.hotspot_media_id`); no se reutiliza `correct_option_ids` para la secuencia.
2. **URI lógica de MediaAsset:** `logical_uri` (`assets://…`) resuelta por la app vía manifiestos de paquete; la tabla de resoluciones físicas por dispositivo se decide en ADR-0002 (almacenamiento local), no en este contrato.
3. **FTS5 y castellano áureo:** la capa `text_indexable` del Passage lleva el texto normalizado (diacríticos, ortografía modernizada) separado del `text_original`; la configuración del tokenizador (variantes de la ed. 1905: «á», qu/gu, etc.) se fija en ADR-0002 tras elegir la edición (PEND-01).
4. **Dónde vive el catálogo:** JSON validado en el repositorio → conversión a **SQLite de solo lectura en el build/importación** (encargo §5.3.A); el runtime nunca escribe en el catálogo.
5. **Parche cultural versionado:** paquetes de catálogo versionados con manifest propio; los datos de perfil viven en SQLite independiente y solo guardan `catalog_version_seen` (migraciones separadas).

## 10. Evolución, migraciones y protocolo de cambio

1. **Propuesta:** el desarrollador único presenta PR versionada que modifique `/schemas` y documentación/consumidor/validadores; **Dirección integral** verifica requisitos editoriales, UX, QA y producto. Se reemplaza la revisión obligatoria por dos equipos externos (DC-23), sin renunciar a pruebas técnicas reales.
2. **Registro:** nueva versión en §1 con lista de cambios y compatibilidad; si es MAJOR, calendario de adaptación y pruebas de consumidor antes de fusionar.
3. **Migración de datos:** nunca renumerar en masa; `aliases.json` registra `id_viejo → id_nuevo` con motivo y versión.
4. **Retirada de IDs:** los retirados quedan en `aliases.json` como `estado: retirado` y jamás se reasignan.
5. **Validación obligatoria en CI** (cuando se autorice GitHub Actions): la suite de contrato debe estar en PASS para fusionar cualquier PR que toque `/schemas`, `/content` o `/tools`.

## 11. Divergencias del paquete visual de escenas (`ae927a1`) — análisis editorial y respuesta técnica

Divergencias detectadas por CONTENIDOS entre el manifiesto de escenas cinematográficas del primer paquete visual y el esquema MediaAsset. **Respuesta técnica (DESARROLLO), sujeta a doble revisión:**

| Campo escenas (ae927a1) | Campo contrato v0.2.0 | Respuesta técnica |
|---|---|---|
| `id: "personajes_ref"` + `candidate_media_id: "DQ.MED.900001"` | `id` contractual único | Clave de relaciones = `id` contractual (`DQ.MA.*`); las etiquetas descriptivas viven en `slug`/`title`. El pipeline de escenas migrará `candidate_media_id` → `id` al regenerar el manifiesto (lado editorial) |
| `width_px` / `height_px` | `width` / `height` (en `derivatives`) | Adoptar `width`/`height` — ya es lo que hace el contrato; el manifiesto de escenas se ajustará al importar |
| `mime_type` | `format` (enum) en `derivatives` | Se añadirá campo opcional `mime` a `derivatives` en MINOR (útil para empaquetado); `format` permanece como clave de variante |
| `phase: "reference"` | Scene.phase = `before/question/reveal/after` (encargo §6.2) | `reference` NO entra en Scene.phase; las imágenes de referencia de recreación usarán `MediaAsset.function: referencia` (valor nuevo, MINOR) |
| `title_es` / `alt_es` / `attribution_es` | `alt` / `author` neutros + `language: es` | El contrato mantiene campos neutros (castellano canónico, DC-10); la internacionalización futura cambiará el TIPO de los campos a objeto por idioma (MINOR/MAJOR), no sufijos. El manifiesto de escenas puede conservar sufijos internos y mapearlos en importación |
| `rights_status` + `source_class` | `source_id` + `license_id` obligatorios | Acuerdo: las recreaciones propias obtienen `DQ.SRC.*` (producción propia) y `DQ.LIC.*` (derechos propios) reales; su expediente se registra en `DERECHOS_Y_PROCEDENCIA` |
| — (no existe) | `derivatives[].size_bytes` | El manifiesto de escenas añadirá tamaños en bytes al importar (empaquetado/actualizaciones lo requieren) |

## 12. Consolidación de implementaciones paralelas (2026-11-05)

Durante FASE 0 ambos equipos implementaron en paralelo esquemas y validador (riesgo previsto por el encargo §6.5.2). Estado consolidado:

- **Canónico (único vigente):** los esquemas de `/schemas/**` (incl. `_definitions.schema.json`, `Profile` y `ContentPackage`) y el validador `tools/editorial_validation/validate.py` (suite 42/42 PASS), conforme a las resoluciones de §0.
- **Borrador 0.1 editorial — RETIRADO:** los esquemas paralelos, ejemplos y `validar_contrato.py` del modo CONTENIDOS estuvieron aislados temporalmente en `schemas/_borrador_0.1/` y `tools/editorial_validation/_borrador_0.1/`; **retirados formalmente el 2026-11-05 tras la firma editorial** (ver abajo). Su contenido histórico y sus ideas conservadas viven en el historial Git y en este contrato.
- Los artefactos editoriales de trabajo (matriz de trazabilidad, dossier del piloto, precarga, paquete de escenas) **no se alteran**; su adaptación al contrato canónico se hará en importación, no editando su formato (§11).

### Firma editorial de la consolidación (2026-11-05, modo CONTENIDOS)

Revisadas las resoluciones de §0 y las respuestas técnicas de §9/§11 **desde el lado editorial**, con verificación práctica: el paquete real `content/piloto/package.json` (12 preguntas del piloto I.8, migración completa de la precarga, 21 medios reales) **valida VÁLIDO** contra el validador canónico con cero errores, incluidas las reglas de paquete v0.2.0 (semantic_key único, pre-imagen sin spoiler). Con esa evidencia:

1. **Se aprueba el contrato v0.2.0 como canónico** desde el rol editorial: las resoluciones de §0 (ID contractual único + slug, `derivatives`, campos neutros con internacionalización futura por tipo, `function` de media) **preservan todos los requisitos editoriales del encargo** (§2.2 respuesta seleccionada, §4.3 evidencia y certeza, §4.7.6 clases de evidencia, DC-04).
2. **Se autoriza la retirada formal de `_borrador_0.1/`** (esquemas, ejemplos y `validar_contrato.py`) tal como prevé este §12; su contenido histórico queda en el historial Git y la referencia editorial viva es este contrato.
3. **Nota editorial pendiente (MINOR futura):** `MediaFunction` aún no incluye el valor `referencia` previsto en §11 para las imágenes de referencia de recreación (usado provisionalmente `interfaz`); añadir cuando se ejecute la migración del manifiesto de escenas.
4. La numeración de episodios de los primeros borradores (`DQ.P1.E04`) queda migrada al patrón canónico anidado (`DQ.P1.C08.E01`); `docs/data/mapa_capitulos.json` se ajustará en su próxima regeneración para emitir IDs canónicos directamente.

### Validación pre-integración definitiva (2026-11-06, modo CONTENIDOS — a petición del propietario)

Batería completa documentada en `docs/VALIDACION_CONTRATO_INTEGRACION.md`. **Veredicto: integrable**, con un fix de defecto pendiente de contrafirma técnica:

1. **Defecto detectado y corregido:** `chapter.schema.json` y `episode.schema.json` incluían claves espurias `"$comment_order"` / `"$comment_id"` (valor string) dentro de `properties` — inválidas como esquema (`check_schema` fallaba) y sin efecto sobre instancias. Las restricciones reales (`order: integer 1–126`, `id: $ref → episodeId`) estaban intactas; el texto se conservó como `$comment` de la propiedad correcta.
2. **Evidencia tras el fix:** `check_schema` 16/16 · suite canónica 42/42 · paquete real `content/piloto` (74 preguntas) VÁLIDO · cotejo textual 130/130 · versiones coherentes (`1.0.0`).
3. **Clasificación:** corrección de defecto (PATCH de esquema, sin cambio de comportamiento para instancias válidas) — **contrafirma técnica requerida** para el cierre definitivo de integración.
4. **Validación continua:** workflow `.github/workflows/validar-contrato.yml` ejecuta suite + meta-validación + paquetes + cotejo en cada push/PR; el estado verde en Actions es parte de la puerta de integración.

### Contrafirma técnica (2026-11-06, modo DESARROLLO) — INTEGRACIÓN DEFINITIVA CERRADA

Verificada de forma independiente y en local la batería completa tras los fixes de esquema:

1. `check_schema` draft 2020-12: **16/16 OK** — confirmado que los defectos (`$comment_order`/`$comment_id` como pseudo-propiedades) eran defectos de autoría técnica original y que su corrección es **PATCH puro**: mismas restricciones (`order` 1–126, `$ref` de ID), textos conservados como `$comment`, sin cambio de comportamiento para instancias válidas.
2. Suite canónica: **42/42 PASS** · paquetes reales de `content/`: **VÁLIDO** · cotejo textual: **130/130** · FTS5 (ADR-0001.1): **9/9**.
3. El cotejo confirma la **hipótesis de abreviación** del EPUB Tusell («Frestón» y el loco de Sevilla presentes en PG 2000, ausentes en el EPUB): la edición de referencia para DC-06 debe ser el texto completo; se registra como condición crítica de PEND-01.
4. CI consolidada en el workflow único `validar-contrato` (+ paso FTS5 añadido por DESARROLLO); el duplicado `contrato.yml` se retira. Protección de `main` con este check obligatorio (ver `GOBERNANZA_GIT.md` §8).

**El contrato editorial-técnico queda firmado por ambas partes y validado pre-integración: integración definitiva aprobada.**

## 13. Qué DEBEN hacer Dirección integral y desarrollador único (DC-23)

| | Dirección integral (ChatGPT) | Desarrollador único |
|---|---|---|
| Debe | Decidir contenido, fidelidad, imágenes propias por pregunta, suficiencia audiovisual, elegibilidad visual y criterios de aceptación; documentar fuentes/derechos y límites | Consumir contratos sin hardcodear contenido, implementar esquemas/datos/validadores/UI y pruebas en rama/PR, registrar evidencias y regresar a GitHub |
| No debe | Declarar pruebas, permisos o visados humanos no realizados; convertir una auditoría en autorización de distribución | Cambiar decisiones editoriales o inventar recursos/IDs/contratos sin versión y aprobación de Dirección; entregar solo archivos locales |

**Intervención artística puntual:** Dirección redacta el prompt exacto; el propietario lo envía al director artístico; el desarrollador integra activos revisados. `assets/scenes/` es prioritario, acuarelas secundarias en gameplay y principales en galería (DC-24–DC-27).

**Regla de oro (§6.2):** un elemento editorial nunca se publica si apunta a un ID inexistente o si su imagen/cita/licencia requerida está pendiente.
