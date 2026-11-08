# INFORME TÉCNICO R11 — Especificación de validadores: escenas neutras, versionado `[]` y antispoiler

**Para:** R14 — Coordinación · **De:** R11 — Pipeline Editorial / Validadores (MODO DESARROLLO, biblia §3 R11)
**Fecha:** 2026-11-08 · **Prioridad:** P0 · **Runtime:** SIN GO
**Encargo:** diseñar la validación necesaria para que, si se aprueba el cambio de contrato, el pipeline rechace referencias inconsistentes y recursos no publicables. **No editar código, esquemas ni fixtures en este encargo** — este documento es especificación.
**Alcance exclusivamente documental:** no modifica `schemas/`, `tools/`, `tests/`, datos ni documentos vigentes (tampoco `ENTREGA_R11_H5_ADR0005.md` ni `EVALUACION_R09_D6_ELEGIBILIDAD_CADUCIDAD.md`).

## 0. Fuente de verdad verificada

| Verificación | Resultado |
|---|---|
| `main` remoto al iniciar | `afc72644dc4283ff72f45baa5f85ca79e0498930` (merge PR #52) — SHA de referencia del encargo confirmado |
| Commits revisados desde la fusión anterior | `03829bc1fbca…389b` (PR #50, entrega R11 fusionada) → `681591a` (R09: evaluación D-6) → `afc7264` |
| Esquemas vigentes | `beat.schema.json` y `scene.schema.json` **intactos en v1.1.0**: `visual_asset_ids` y `media_ids` en `required` con `minItems: 1`; `ContractVersion` = {1.0.0, 1.1.0} |
| Documentación base leída | `docs/ENTREGA_R11_H5_ADR0005.md` @ `main` (reglas R-V/E, D-1…D-6, CT/FP), `docs/EVALUACION_R09_D6_ELEGIBILIDAD_CADUCIDAD.md` (PR #52), `AGENTS.md`, `schemas/content/*.json`, `tests/contracts/fixtures/` |
| Propuesta conjunta R11/R09 de escena neutra | **REGISTRADA y no repetida aquí**: ENTREGA_R11 (opción 2, cascada con neutro, E-1…E-4) + EVALUACION_R09 (recomendación A+D, cursor de «intervención presentada» §5, reformulación E-1/R-V2 §6, umbrales NOT BEFORE/NOT AFTER §2). Este informe la **toma como entrada** y especifica su validación |

**Hipótesis de trabajo (solo si se coaprobA y R14 autoriza la PR técnica):** contrato v1.2.0 MINOR con `beat.visual_asset_ids` y `scene.media_ids` **obligatorios** y `minItems: 0` — `[]` = declaración explícita (persistencia en beat; escena neutra en escena). Todo el diseño de validación de este informe está condicionado a esa aprobación; nada está implementado.

---

## 1. Modelo de validación: despacho por versión declarada

Cada registro declara `contract_version`. El validador **no aplica un único perfil**: despacha según la versión declarada por el propio registro (los registros antiguos siguen validándose bajo sus reglas). Esto es lo que hace demostrable la retrocompatibilidad (CT-5) y resuelve de una vez las reglas 1–4 del encargo.

| Versión declarada | `beat.visual_asset_ids` | `scene.media_ids` | Efecto |
|---|---|---|---|
| 1.0.0 / 1.1.0 | `required`, `minItems: 1` | `required`, `minItems: 1` | Comportamiento vigente exacto |
| 1.2.0 (futura, hipótesis) | `required`, `minItems: 0` | `required`, `minItems: 0` | `[]` válido en ambos; **el campo sigue siendo obligatorio** |
| Versión desconocida | — | — | Rechazo inmediato |

**Regla transversal T-0 (coherencia de versión):** el perfil se elige por el valor declarado en el registro, nunca por el del paquete contenedor; una mezcla de versiones dentro de un paquete es legal (retrocompatibilidad) pero se reporta en el informe de cobertura.

---

## 2. Catálogo de reglas de validación (respuestas 1–12 del encargo)

Convención de identificadores: `V-<ÁMBITO>-<nn>` con severidad **ERROR** (rechaza el paquete y rompe CI), **WARN** (no rompe CI; exige justificación documental) o **INFO** (trazabilidad). Las familias existentes `SCHEMA_ERROR` y `REFERENCE_ERROR` se conservan; las nuevas se suman a ellas.

### 2.1 — Regla encargo 1: beat con `visual_asset_ids: []` válido en v1.2.0

| Aspecto | Especificación |
|---|---|
| Qué valida (estático) | Bajo perfil 1.2.0: campo presente, array, elementos con patrón `DQ\.MA\.\d{6}`, `uniqueItems`, cardinalidad 0 permitida |
| Identificador | PASS esperado; fallos capturados por V-BEAT-001/002 (§2.3) |
| Fixture positivo | `tests/contracts/fixtures/valid/beat_visual_vacio_v120.json` — beat NARRACION/DIALOGO con `visual_asset_ids: []` y `contract_version: 1.2.0` |
| Límite | El validador certifica **forma**, no corrección editorial del `[]`: que B02–B03 deban persistir es decisión de guion/visado (R03/R01/R02 + R05/R06), no automatizable |

### 2.2 — Regla encargo 2: escena con `media_ids: []` válido en v1.2.0 (escena neutra)

| Aspecto | Especificación |
|---|---|
| Qué valida (estático) | Bajo perfil 1.2.0: `media_ids` presente, puede ser `[]`. Escena neutra = `media_ids: []` **y** sin referencias visuales en sus beats (interacción con §2.5) |
| Identificadores | PASS esperado; encadenado a V-SCENE-003/004 (§2.6) si la escena «neutra» arrastra capas u hotspots |
| Fixture positivo | `tests/contracts/fixtures/valid/scene_neutral_v120.json` — escena v1.2.0 con `media_ids: []`, sin `layers`, sin `hotspots`, beats todos con `[]` |
| Semántica fijada | Escena neutra **no significa** «sin visuales permitidos»: significa que la escena **no declara inventario propio**; su reproducción discurre por la cascada hasta fondo neutro (R-V6/evaluación R09) o por los activos que sus beats declaren — pero entonces la escena deja de ser neutra (ver §2.5) |

### 2.3 — Reglas encargo 3 y 4: campo omitido inválido; `[]` rechazado donde la versión antigua no lo admite

| Aspecto | Especificación |
|---|---|
| Campo omitido | **ERROR `V-BEAT-001`** (beat sin `visual_asset_ids`) y **ERROR `V-SCENE-001`** (escena sin `media_ids`) en **todas** las versiones — la obligatoriedad de presencia nunca se relaja (cierra la puerta a la Opción 3 rechazada) |
| `[]` bajo versión antigua | **ERROR `V-BEAT-002`** — «`visual_asset_ids: []` incompatible con `contract_version` ≤ 1.1.0 (declara `minItems: 1`)»; **ERROR `V-SCENE-002`** — equivalente en escena. Mensaje obligatorio: «o eleva `contract_version` a 1.2.0 o declara al menos un activo» |
| Versión desconocida | **ERROR `V-VER-001`** — `contract_version` fuera del enum conocido |
| Fixtures negativos | `invalid_beat_sin_campo_visual.json` · `invalid_scene_sin_media_ids.json` · `invalid_beat_vacio_v110.json` · `invalid_scene_vacia_v110.json` · `invalid_beat_version_desconocida.json` |
| Garantía | Estas cuatro comprobaciones son **100 % estáticas y deterministas**: misma entrada → mismo veredicto, sin contexto editorial |

### 2.4 — Regla encargo 5: referencias visuales de beat coherentes con el inventario de escena

| Aspecto | Especificación |
|---|---|
| Qué valida (estático) | (a) Todo id referenciado por un beat existe como MediaAsset del paquete — `REFERENCE_ERROR` (familia existente, se conserva). (b) **Ámbito**: todo `visual_asset_ids[j]` de un beat de la escena S debe figurar en `S.media_ids` — **ERROR `V-BEAT-005`** «referencia visual fuera del inventario de su escena» |
| Dirección inversa | Activos de `S.media_ids` no referenciados por ningún beat de S: **INFO `V-COV-003`** — legítimos como reserva de cascada (R-V6 nivel c) si tienen visado de fase; no son error |
| Justificación del ámbito como ERROR | La evaluación R09 (§2) demuestra que el inventario de escena sin coherencia con beats mezcla momentos (`[900005, 900030, 900006]`); el ámbito obliga a que la colocación por beat y el inventario cuenten la misma historia. *Severidad final sujeta a coaprobación: si R09/R01/R02 prefieren WARN transitorio durante la conversión de fichas, el cambio es de configuración, no de diseño* |
| Interacción con escena neutra | Escena con `media_ids: []` y algún beat con lista no vacía ⇒ **ERROR `V-BEAT-005`** (la referencia no puede estar en un inventario vacío). La escena «neutra con activos declarados en beats» es una contradicción de datos: o la escena declara sus medios, o sus beats declaran `[]` |
| Fixture negativo | `invalid_beat_ref_fuera_de_escena.json` — beat con `DQ.MA.900030` en escena cuyo `media_ids` no lo incluye |

### 2.5 — Regla encargo 6: escena neutra incompatible con capas y hotspots que exigen medios

| Aspecto | Especificación |
|---|---|
| Qué valida (estático) | Si `S.media_ids == []` (perfil 1.2.0): (a) `S.layers` ausente o vacío — cada `layer` exige `media_id`; **ERROR `V-SCENE-003`**; (b) `S.hotspots` ausente o vacío — cada hotspot exige `media_id` + área sobre imagen; **ERROR `V-SCENE-004`**; (c) `accessibility.reduced_motion_fallback: imagen_estatica` se informa como **WARN `V-SCENE-005`** «fallback de accesibilidad sin imagen declarada: la alternativa estática es el fondo neutro — confirmar con R08/R06 que es aceptable para esta escena» |
| No afectado | `subtitles_ref`, `audio_ref`, `entry/exit_transition` (válido en neutra: la transición rige la frontera) |
| Fixtures negativos | `invalid_scene_neutral_con_capas.json` · `invalid_scene_neutral_con_hotspots.json` |
| Garantía | 100 % estática: la contradicción estructural es verificable sin conocer el momento narrativo |

### 2.6 — Regla encargo 7: referencias rotas o duplicadas rechazadas

| Aspecto | Especificación |
|---|---|
| Rotas | `REFERENCE_ERROR` (existente, se conserva y amplía): id inexistente en MediaAssets del paquete — beat, escena, capas, hotspots, `audio_asset_id` |
| Duplicadas — dentro de una entidad | **ERROR `V-BEAT-004`** (id repetido en un mismo `visual_asset_ids`; redundante con `uniqueItems` del esquema — se mantiene como comprobación semántica explícita para el informe) · **ERROR `V-SCENE-006`** (id repetido en un mismo `media_ids`) · `utterance_id`/`order` duplicados (existentes) |
| Duplicadas — entre entidades | **NO es error** que dos escenas o beats distintos referencien el mismo activo (reutilización legítima; DC-03); el informe de cobertura lo lista como reutilización INFO |
| Fixtures | `invalid_beat_visual_duplicado.json` · `invalid_scene_media_duplicado.json` |

### 2.7 — Regla encargo 8: `review.state` borrador/descartado no computan como publicables

| Aspecto | Especificación |
|---|---|
| Qué valida (estático, sobre metadatos) | Para un paquete que se declara **publicable** (paquete VÁLIDO / escena APTA_PARA_INTEGRAR): todo MediaAsset referenciado (por beat, escena, capa o hotspot) debe tener `review.state ∈ {revisada, aprobada}`. **ERROR `V-MEDIA-001`** si `borrador` o `descartada`; **WARN `V-MEDIA-002`** si `documentada` (en revisión) |
| Umbrales configurables | El perfil de validación acepta el umbral de publicabilidad como parámetro del paquete (`--umbral-publicable=revisada|aprobada`); por defecto `revisada` para paquetes de piloto. La política es de Coordinación; el validador solo la aplica |
| No computan en cobertura | Un activo no publicable referenciado **no suma** a la métrica de cobertura (§2.11) y su referencia se reporta — la cobertura no puede «maquillarse» con borradores |
| Se validan también las entidades | `review.state` del propio beat/escena: `descartada` en una entidad **referenciada** por el paquete ⇒ **ERROR `V-STATE-001`** (referencia a entidad retirada) |
| Fixture negativo | `invalid_media_borrador_referenciado.json` — beat v1.2.0 referenciando MediaAsset con `review.state: borrador` |
| Límite | El estado de revisión es un **dato declarado**: el validador no re-audita su verdad (eso es revisión humana, §3) |

### 2.8 — Regla encargo 9: validación diferenciada de licencias y derechos

| Aspecto | Especificación |
|---|---|
| Tres planos diferenciados | (a) **Presencia en repo**: activo en `assets/` ⇒ `allowed_uses` debe incluir `almacenamiento_repo_git`; **ERROR `V-LIC-001`**. (b) **Reproducción en app**: `uso_personal_app` requerido; **ERROR `V-LIC-002`**. (c) **Redistribución** (futuro, FASE 2+): `redistribucion` — fuera de alcance del piloto, se reporta INFO si falta |
| Estado de licencia | `license_status` de todo activo **referenciado** en paquete publicable: `verificada` exigido — **ERROR `V-LIC-003`** si `restringida` o `desconocida` («desconocida NO equivale a autorizada», contrato §6.3.4); **WARN `V-LIC-004`** si `pendiente` (bloquea promoción a publicable, no rompe CI de propuesta) |
| Atribución | ACUARELA_HISTORICA sin `author`/`source_id` ⇒ **WARN `V-LIC-005`** (atribución obligatoria en pantalla, EF-LEC-06 — el validador avisa, la presentación la garantiza el consumidor) |
| Fixtures negativos | `invalid_media_licencia_desconocida.json` · `invalid_media_uso_repo_no_permitido.json` |
| Límite | El validador comprueba **coherencia de los metadatos declarados**; la verificación jurídica real es de R13 (humana, §3) |

### 2.9 — Regla encargo 10: pruebas negativas contra promoción automática de imágenes posteriores

| Aspecto | Especificación |
|---|---|
| Principio | **El validador no tiene concepto de «promoción»**: la elegibilidad no se calcula en el pipeline, vive en (i) la colocación editorial por beat + umbrales visados (R09 §2/§6) y (ii) el cursor de intervenciones presentadas del consumidor (R09 §5). El pipeline se limita a **no avalar** colocaciones contradictorias y a **no certificar** las que no pueda juzgar |
| Negativa estática 1 | Paquete donde la tabla de montaje (§2.10) ancla `900006` a «tras I12» pero el dato lo declara en un beat anterior al que contiene I12 ⇒ **ERROR `V-MONT-001`** (contradicción montaje↔datos) — el pipeline rechaza, no promueve |
| Negativa estática 2 | Activo `function: post_desenlace` declarado en un beat cuyo orden precede a cualquier beat que la tabla de montaje marque como desenlace ⇒ **WARN `V-MONT-002`** «colocación anterior al desenlace declarado — requiere visado» |
| Sin tabla de montaje | **INFO `V-MONT-003`** «sin umbrales visados en datos: la elegibilidad queda indefinida y la ejecución aplica fail-closed (E-4)» — el pipeline nunca asume elegibilidad por defecto |
| Pruebas de consumidor | La promoción/revocación real en runtime la cubren las pruebas 1–12 de la evaluación R09 (§7) y FP-14…FP-18 de la ENTREGA_R11 — todas **diseñadas, ninguna ejecutada** (sin reproductor) |

### 2.10 — Regla encargo 11: contradicciones entre montaje editorial y datos

| Aspecto | Especificación |
|---|---|
| Requisito previo | Una **tabla de umbrales legible por máquina** propuesta como artefacto del visado curatorial/editorial (p. ej. `docs/data/umbrales_visuales_escenas.csv`: `scene_id, media_id, not_before_anchor, not_after_anchor, visado_por, fecha`) — materializa la tabla NOT BEFORE/NOT AFTER de la evaluación R09 §2. **Proponer su creación es parte de esta especificación; crearla no corresponde a este encargo** (es de R05/R06 con R01/R02) |
| Qué cruza el validador (estático) | (a) `not_before_anchor = DQ.INT.x` ⇒ el activo solo puede estar declarado en beats cuyo **orden** sea ≥ el orden del beat que contiene la intervención `x` — **ERROR `V-MONT-001`** si se viola; (b) `not_after_anchor = DQ.INT.y` ⇒ no declarado en beats posteriores al que contiene `y` — **ERROR `V-MONT-004`**; (c) activo con umbral visado ausente del inventario de su escena ⇒ **WARN `V-MONT-005`** (inventario desalineado con el visado); (d) colocación en beat coherente pero sin fila de umbral ⇒ **INFO** (colocación sin visado: legítima como propuesta, pendiente de curaduría) |
| Coherencia con la evaluación R09 | La colocación es **propuesta** (R03/R01/R02) sujeta a visado (R05/R06) — la tabla es el registro del visado; el validador la consume, no la produce, y **no certifica corrección literaria** (R09 §6: el juicio de «qué hecho narra el plano» sigue siendo editorial) |
| Sin ancla válida | Anchor `DQ.INT.*` inexistente en los beats de la escena ⇒ **ERROR `V-MONT-006`** (tabla desalineada con la segmentación — típico tras una re-segmentación A de R09) |
| Fixture negativo | `invalid_montaje_umbral_contradicho.json` — `900006` declarado en B06 con `not_before_anchor: DQ.INT.0012` |
| Límite | Estático garantiza **consistencia declarativa** (tabla ↔ colocación); la verdad literaria del umbral es de revisión humana (§3) |

### 2.11 — Regla encargo 12: cobertura con escenas neutras, sin error automático

| Aspecto | Especificación |
|---|---|
| Estados de cobertura por escena (informe, no veredicto) | **CON_MEDIA** (`media_ids ≥ 1` bajo cualquier versión) · **NEUTRA** (`media_ids: []`, v1.2.0, sin capas/hotspots — estado válido por diseño) · **NEUTRA_INCOHERENTE** (neutra con capas/hotspots/referencias — es error por §2.5/§2.4, no un estado de cobertura) |
| Nunca error automático | `NEUTRA` ⇒ **INFO `V-COV-001`** «escena neutra declarada — reproducción por cascada hasta fondo neutro; verificar intención editorial». La ausencia de imagen en una escena neutra **no es defecto**: es la decisión A+D registrada |
| Cobertura por beat | Beat con `[]` ⇒ INFO (persistencia declarada); beat con lista ⇒ el activo se cuenta si es publicable (§2.7) |
| Métrica agregada | El informe CI publica: nº escenas por estado, nº beats con `[]`, activos reutilizados, activos con WARN de licencia/revisión — **el informe no puede convertir INFO/WARN en fallo**; solo ERROR rompe CI |
| Métrica para QA | «Cobertura visual por escena» queda definida como: escenas CON_MEDIA con ≥1 activo publicable y elegible-inicial verificable (tabla presente) / total de escenas CON_MEDIA — las NEUTRA se reportan aparte, jamás como hueco |

---

## 3. Límite de la validación: estático / consumidor / humano

| Puede garantizarlo un validador estático | Requiere pruebas de consumidor (R10/R12) | Requiere revisión humana |
|---|---|---|
| Presencia y cardinalidad por versión declarada (V-BEAT-001/002, V-SCENE-001/002) — determinista | Que la cascada respeta el orden R-V6 en runtime (falla de carga, timing) | Corrección literaria de los umbrales («qué hecho narra el plano») — R01/R02 con R03 |
| Existencia y ámbito de referencias (REFERENCE_ERROR, V-BEAT-005) — determinista | Promoción/revocación contra el cursor de intervenciones presentadas (R09 §5: pruebas 1–12) | Visado curatorial de colocación y umbral — R05/R06 |
| Coherencia estructural de escena neutra (V-SCENE-003/004/005) — determinista | Fondo neutro estable sin parpadeos; TS-001 en pantalla; movimiento reducido; teclado (T5–T11, FP-1…FP-18) | Aceptabilidad del neutro como alternativa estática de accesibilidad — R08/R06 |
| Unicidad de identificadores (V-BEAT-004, V-SCENE-006) — determinista | Restauración de partida con recomputación de elegibilidad (R-V10; EF-AV-08) | Verificación jurídica de licencias y permisos — R13 |
| Coherencia de metadatos de publicabilidad/licencia (V-MEDIA-*, V-LIC-*, V-STATE-001) — determinista **sobre los metadatos declarados** | Comportamiento offline real (instalador, VM limpia — ADR-0001) | Decisión editorial de segmentación A y líneas SILENCIO — R03/R01/R02 |
| Consistencia tabla-de-umbrales ↔ colocación (V-MONT-001/004/005/006) — determinista **si la tabla existe** | Nada de lo anterior: el consumidor no puede suplir visados ausentes | Ratificación de lecturas contemporáneas (900005 en B02 vs B05) — R01/R02 |
| Informes de cobertura sin error automático para neutras (V-COV-*) — determinista | | |

**Principio rector:** el validador **nunca otorga elegibilidad** — solo detecta contradicciones entre datos declarados y visados registrados, y degrada a INFO/WARN lo que no puede juzgar. La ejecución aplica fail-closed (E-4). Nadie automatiza lo que los dictámenes de R01/R02 y R05/R06 solo pueden pronunciar humanos (o agentes con visado registrado como tal).

---

## 4. Catálogo de fixtures (propuesta — no creados en este encargo)

| Fichero propuesto | Tipo | Resultado esperado del validador | Regla |
|---|---|---|---|
| `valid/beat_visual_vacio_v120.json` | Positivo | PASS (perfil 1.2.0) | §2.1 |
| `valid/scene_neutral_v120.json` | Positivo | PASS + INFO V-COV-001 | §2.2, §2.11 |
| `valid/paquete_mixto_versiones.json` | Positivo | PASS: beats 1.0.0 con ≥1 y beats 1.2.0 con `[]` coexisten | §1, CT-5 |
| `invalid/invalid_beat_sin_campo_visual.json` | Negativo | `V-BEAT-001` (ERROR) | §2.3 |
| `invalid/invalid_scene_sin_media_ids.json` | Negativo | `V-SCENE-001` (ERROR) | §2.3 |
| `invalid/invalid_beat_vacio_v110.json` | Negativo | `V-BEAT-002` (ERROR) | §2.3 |
| `invalid/invalid_scene_vacia_v110.json` | Negativo | `V-SCENE-002` (ERROR) | §2.3 |
| `invalid/invalid_beat_version_desconocida.json` | Negativo | `V-VER-001` (ERROR) | §1 |
| `invalid/invalid_beat_ref_fuera_de_escena.json` | Negativo | `V-BEAT-005` (ERROR) | §2.4 |
| `invalid/invalid_scene_neutral_con_capas.json` | Negativo | `V-SCENE-003` (ERROR) | §2.5 |
| `invalid/invalid_scene_neutral_con_hotspots.json` | Negativo | `V-SCENE-004` (ERROR) | §2.5 |
| `invalid/invalid_beat_visual_duplicado.json` | Negativo | `V-BEAT-004` (ERROR) | §2.6 |
| `invalid/invalid_scene_media_duplicado.json` | Negativo | `V-SCENE-006` (ERROR) | §2.6 |
| `invalid/invalid_media_borrador_referenciado.json` | Negativo | `V-MEDIA-001` (ERROR) | §2.7 |
| `invalid/invalid_entidad_descartada_referenciada.json` | Negativo | `V-STATE-001` (ERROR) | §2.7 |
| `invalid/invalid_media_licencia_desconocida.json` | Negativo | `V-LIC-003` (ERROR) | §2.8 |
| `invalid/invalid_media_uso_repo_no_permitido.json` | Negativo | `V-LIC-001` (ERROR) | §2.8 |
| `invalid/invalid_montaje_umbral_contradicho.json` | Negativo | `V-MONT-001` (ERROR; requiere tabla de umbrales) | §2.9, §2.10 |
| `invalid/invalid_montaje_anchor_inexistente.json` | Negativo | `V-MONT-006` (ERROR) | §2.10 |

Los positivos `beat_cita.json`/`beat_silencio.json`/`beat_oral_incisos.json` vigentes (v1.1.0) **deben seguir pasando sin cambios** — es la demostración formal de CT-5 cuando R09 tramite la PR técnica.

---

## 5. Propuesta de integración CI (especificación — sin implementar)

Extensión del pipeline existente (`tools/editorial_validation/validate.py`, workflow `validar-contrato.yml`) en **cinco fases secuenciales**, todas con veredicto determinista y registro por registro:

| Fase | Contenido | Familias de error | Rompe CI si |
|---|---|---|---|
| **P1 — Esquema por perfil** | Despacho de versión (§1) y validación sintáctica del registro | `SCHEMA_ERROR`, `V-BEAT-001/002`, `V-SCENE-001/002`, `V-VER-001` | Cualquier ERROR |
| **P2 — Referencias y unicidad** | Existencia de ids, ámbito de inventario, duplicados | `REFERENCE_ERROR`, `V-BEAT-004/005`, `V-SCENE-006` | Cualquier ERROR |
| **P3 — Coherencia estructural** | Escena neutra vs capas/hotspots/fallback de accesibilidad | `V-SCENE-003/004/005` | Cualquier ERROR |
| **P4 — Publicabilidad y derechos** | `review.state`, `license_status`, `allowed_uses`, entidades retiradas referenciadas | `V-MEDIA-001/002`, `V-LIC-001…005`, `V-STATE-001` | ERROR (WARN solo reporta) |
| **P5 — Montaje y cobertura** | Cruce con tabla de umbrales si existe; informe de cobertura con estados NEUTRA/CON_MEDIA | `V-MONT-001…006`, `V-COV-001…003` | ERROR (INFO/WARN → artefacto) |

Detalles de operación especificados:

1. **Artefacto de informe** en cada run: `informe_validacion.md` con tabla registro→fase→veredicto→identificadores; los WARN/INFO se listan siempre (trazabilidad), los ERROR con mensaje accionable (fichero, campo, valor, corrección sugerida).
2. **Determinismo exigido:** misma entrada ⇒ mismo informe (sin reloj, sin red, sin orden de directorio en los resultados — orden canónico por id). Es condición para que el informe sea evidencia auditable.
3. **Sin red y offline:** todas las fases operan sobre el árbol del paquete; ninguna fase consulta servicios externos (DC-12).
4. **Umbral de publicabilidad** como parámetro del run (`--umbral-publicable`), no hardcodeado (§2.7).
5. **La tabla de umbrales** (§2.10) se pasa por ruta (`--tabla-umbrales`); si no se pasa, P5 degrada a informe de cobertura con `V-MONT-003` — nunca falla por ausencia de tabla, nunca asume elegibilidad.
6. **Suite de fixtures:** los 20 artefactos de §4 se registran en la batería de contrato (positivos → PASS completo; negativos → veredicto y **único** identificador esperado — un negativo que devuelva dos errores es fallo de la propia batería).
7. **Retrocompatibilidad verificable:** la suite vigente 53/53 debe seguir en verde sin modificación — su ejecución intacta ES la demostración de CT-5 que la evaluación R09 declaró favorable.

---

## 6. Especificación de correcciones E-1 / R-V2 / R-V3 / R-V6 (sin modificar documentos vigentes)

Fuente única: evaluación R09 (PR #52) §1 y §6, contrastada con los dictámenes curatorial y editorial. R11 las especifica aquí como **redacción objetivo** para su incorporación futura en la revisión coaprobada de `ENTREGA_R11_H5_ADR0005.md` — **no se edita ese documento en este encargo**.

| Regla vigente (ENTREGA_R11 @ `03829bc`) | Corrección especificada (fuente R09) | Consecuencia en validación |
|---|---|---|
| **E-1:** «declarado en beat j ⇒ elegible en beats ≥ j» | **Sustituida por:** «Un activo declarado en `visual_asset_ids` de un beat j **puede** mostrarse desde j **siempre que su umbral curatorial (último hecho narrado que el plano representa) esté contenido en los beats ≤ j**. La colocación es propuesta de R03/R01/R02 sujeta a visado R05/R06; el validador no certifica corrección literaria (E-4 fail-closed en ejecución)» | Genera V-MONT-001/004 (coherencia tabla↔colocación) y elimina cualquier regla que trate la declaración como autorización |
| **R-V2:** «primer elemento con carga exitosa» | **Condicionada:** el plano del beat es el primer elemento **cargable y con elegibilidad visada para ese umbral**; en caso de duda, E-4 → neutro | El consumidor (R10) no puede usar «carga exitosa» como criterio; sus pruebas (R09 §7.1–12) lo verifican |
| **R-V3:** «`[]` = persistencia incondicional» | **Condicionada:** solo persiste un plano **vigente en el instante actual**; tras un hecho que contradice el plano mostrado (caso: pre con DQ montado y lanza íntegra tras I11), el plano **caduca** y la persistencia desemboca en neutro; la caducidad se materializa por **frontera de escena** (segmentación A), no reinterpretando `[]` como neutro voluntario | El validador no valida caducidad intra-escena (es de segmentación/consumidor); sí valida que la tabla de umbrales y la segmentación sean coherentes (V-MONT-006) |
| **R-V6:** cascada «beat → escena → fotograma → neutro» | **Orden reescrito:** (a) declarado en beat **y visado para ese umbral**; (b) plano mostrado antes **solo si sigue válido** (no caducado); (c) recursos de escena **solo con visado positivo de fase/ventana**; (d) fondo neutro. Ni `media_ids`, ni `function`, ni `spoiler_level`, ni carga exitosa saltan el veto | Confirmado por ambos dictámenes (principio fail-closed); P5 CI implementa la parte comprobable (tabla↔datos); el resto es consumidor (R09 §7) |

Coherencia con el resto de la especificación: estas correcciones **no alteran** la Opción 2 aceptada (`[]` = persistencia declarada, campo obligatorio), ni D-1…D-5, ni la semántica de la frontera de escena R-V4/R-V1 (que es anti-revelación estructural y permanece intacta).

---

## 7. Impactos y dependencias

| Responsable | Acción derivada de esta especificación |
|---|---|
| **R09** | Implementar P1–P5 y los fixtures de §4 **tras** coaprobación y autorización R14 (PR técnica v1.2.0); confirmar o ajustar la severidad de V-BEAT-005 (ERROR vs WARN transitorio); definir el formato exacto de la tabla de umbrales junto a R05/R06 |
| **R05/R06 + R01/R02** | Producir la tabla de umbrales visados (NOT BEFORE/NOT AFTER, anclada a `DQ.INT.*`) empezando por molinos; es el insumo de P5 y del visado de colocaciones |
| **R01/R02** | Pronunciamiento pendiente sobre semántica `[]`-exclusiva (D-5), B09/TRANSICION (D-1) y lecturas contemporáneas (900005 en B02 vs B05) |
| **R10/R12** | Ejecutar la batería de consumidor (R09 §7.1–12; FP-1…FP-18) cuando exista reproductor — ninguna ejecutada a la fecha |
| **R08** | Pronunciarse sobre V-SCENE-005 (neutra como alternativa estática de accesibilidad) |
| **R13** | Mantener `license_status`/`allowed_uses` al día: el validador consume sus metadatos, no los sustituye |
| **R14** | Autorizar (o no) la PR técnica v1.2.0 con este catálogo como especificación de su batería de pruebas |

## 8. Qué NO hace este informe

- No edita código, esquemas, fixtures, workflows ni datos (solo especifica).
- No modifica `ENTREGA_R11_H5_ADR0005.md` ni `EVALUACION_R09_D6_ELEGIBILIDAD_CADUCIDAD.md` (las correcciones de §6 quedan especificadas, no aplicadas).
- No ejecuta ninguna prueba (todas las referidas están diseñadas, no ejecutadas).
- No reabre decisiones cerradas (DC-21/DC-22/TS-001, Opción 2 aceptada, P0-1/P0-2/P1-1…P1-6).
- No declara resuelto ADR-0005/H5 ni concede GO.

*R11 — Pipeline Editorial / Validadores. Informe técnico trazable remitido a R14. SIN GO.*
