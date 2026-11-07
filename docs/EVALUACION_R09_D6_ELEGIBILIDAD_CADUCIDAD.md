# EVALUACIÓN R09 — D-6: Elegibilidad y caducidad narrativa de imágenes (adenda P0 a ADR-0005/H5)

**Para:** R14 — Coordinación (cierre H5) · **De:** R09 — Desarrollo y Contratos
**Fecha:** 2026-11-07 · **Modalidad:** evaluación técnica; **sin implementación productiva, sin cambios de esquema, sin fusionar nada**
**Encargo:** adenda P0 del dictamen R14 sobre PR #50 (elegibilidad y caducidad visual; alternativa A/B/C/D; mecanismo de «presentado»; CT-6/FP)

## 0. Fuente de verdad verificada

| Verificación | Resultado |
|---|---|
| SHA de referencia `03829bc1fbca…389b` | **VIGENTE**: es la cabeza de `main` (fusión de PR #50) en el momento de esta evaluación |
| Blobs físicos de los tres WebP (`git ls-tree`) | **3/3 coinciden** con los declarados por R05/R06: `900030`→`7d77e6e2…`, `900005`→`bef44d15…`, `900006`→`653a3d9e…` |
| Datos de los tres MediaAssets | `900030`/`900005`: función `pre_pregunta`, `spoiler_level: ninguno` · `900006`: función `post_desenlace`, `spoiler_level: **leve**` — coincide con ambos dictámenes |
| Evidencias leídas íntegras | Dictamen curatorial R05/R06 (inspección visual real 3/3, umbrales I01/I05/I11/I12) · Dictamen editorial R01/R02 (contrafirma condicionada; B06 comprende I09-I11; salvedad intra-beat) |
| Documentos contrastados | `ENTREGA_R11_H5_ADR0005.md` (opción 2, R-V1…R-V12, E-1…E-4, D-1…D-6) · `FICHA_ESCENA_P1_C08_MOLINOS.md` (9 beats, 16 intervenciones) · `beat.schema.json` / `scene.schema.json` vigentes · las tres fichas de MediaAsset y `assets/scenes/manifest.json` |

## 1. Contraste: la entrega R11 frente a los dictámenes curatorial y editorial

| Elemento de ENTREGA_R11 | Veredicto R09 | Fundamento |
|---|---|---|
| **E-1** («declarado en beat j ⇒ elegible en beats ≥ j») | **RECUSADA como regla automática** | Ambos dictámenes coinciden: la colocación es **asignación propuesta, no visado**. Caso real: 900006 declarado en B06 revela I12 (contenido del plano: auxilio de Sancho) mientras B06 narra I09-I11. La colocación correcta es un acto curatorial/editorial con umbral posterior al hecho narrado |
| **E-2** (`function`/`spoiler_level` como señales) | **Degradada a orientativa** (como ya advertía la propia R11; D-6) | `spoiler_level: leve` de 900006 NO refleja el riesgo alto real antes de I11/I12 (el manifiesto registra `spoiler_risk: high`); `pre_pregunta` no acredita idoneidad para B01. Ni una ni otra fijan el instante |
| **R-V2** (primer elemento con carga exitosa) | **Reformulada**: la inclusión en el beat es asignación propuesta; el primer fotograma del beat requiere **visado de umbral** | Dictamen editorial §C/D-6 y curatorial D-6.2 |
| **R-V3** (`[]` = persistencia incondicional) | **Condicionada**: solo persiste un plano **vigente en el instante actual** | Curatorial D-6.3: tras I11, la pre (DQ montado, lanza íntegra) contradice el texto recién narrado — no debe heredarse |
| **R-V6** (cascada fail-closed) | **Principio validado por ambos dictámenes**; el ORDEN se reescribe | Nuevo orden: (a) declarado en beat **y validado para ese umbral**; (b) plano mostrado antes **solo si sigue válido**; (c) recursos de escena **solo con visado positivo de fase/ventana**; (d) neutro. Ni `media_ids`, ni `function`, ni `spoiler_level`, ni carga exitosa saltan el veto |
| **D-3** (plano base = orden del array) | **Corregido**: base = primera perspectiva **narrativamente elegible** (con visado), no orden de cobertura | La escena lista `[900005, 900030, 900006]` pero B01 pide 900030: «orden de cobertura ≠ prioridad temporal» |

## 2. Requisitos de diseño fijados por la curaduría (tabla NOT BEFORE / NOT AFTER)

| Recurso | NOT BEFORE (primer momento) | NOT AFTER / VIGENCIA | Condición |
|---|---|---|---|
| `DQ.MA.900030` (siluetas/pre) | Entrada en B01, simultánea a I01 (nunca en prólogo anterior) | No representar como presente **tras I11** (DQ montado, lanza íntegra contradice la caída narrada) | Fallback pre-choque válido |
| `DQ.MA.900005` (señalamiento/advertencia) | Tras **I05** (advertencia de Sancho, en B04) — no automáticamente en B02; alternativa verificable: entrada en B05. Pendiente ratificación R01/R02 sobre lectura contemporánea en B02 | No representar como presente **tras I11** | Plano de preparación/diálogo entre I05 y I11; no metraje literal del galope en B05 |
| `DQ.MA.900006` (post: caído, lanza rota, **Sancho acudiendo**) | Tras **I12 completo + avance confirmado** (nunca entrada B06, nunca tras I11, nunca entrada B07) | Vigencia sujeta a **revisión de luz/continuidad** (atardecer vs media mañana — R06) | REQUIERE AJUSTE VISUAL O NARRATIVO; sin nuevas imágenes |
| **Intervalo post-I11 → cierre de I12** | — | **Fondo neutro + texto I11/I12 íntegro** (salvo otra solución aprobada) | Obligación P0 del dictamen |

La pertenencia a `scene.media_ids` o a un beat **no acredita autorización temporal** (evidencia: la escena lista `[900005, 900030, 900006]` mezclando momentos).

## 3. Análisis de alternativas (encargo §4)

| | **A. Segmentación de beats/escenas** | **B. Expiración en el consumidor** | **C. Anclaje temporal en contrato** | **D. Montaje sin 900006** |
|---|---|---|---|---|
| **En qué consiste** | Cortar la escena en fronteras narrativas seguras (p. ej. tras I11) y re-declarar los recursos en beats posteriores a su umbral; la frontera de escena reinicializa la perspectiva (R-V4/R-V1 ya especificados) | El reproductor mantiene el **conjunto de intervenciones presentadas** y evalúa la elegibilidad de cada plano contra umbrales; los umbrales deben provenir del catálogo (si viven solo en código = hardcoding editorial, rechazable por §5.3) | Campos contractuales nuevos (`visible_desde`/`visible_hasta` anclados a `DQ.INT.*`/beats, en MediaAsset o beat) — MINOR v1.2.0 | La cadena de fallback termina en **fondo neutro con texto íntegro** siempre que no haya plano elegible; sin imágenes nuevas |
| **Cambios necesarios** | Reestructuración editorial de la ficha→datos (dos escenas en I.8; re-declaración de 900005 en B05 y 900006 en B08); opción 2 (`minItems: 0`) ya propuesta por R11 | Estado de reproducción con `presentadas[]`; evaluador de elegibilidad; nada en el contrato | Esquema + validadores (anclas existentes y ordenadas) + consumidor + fixtures; doble firma | Ninguno (es el fallback ya especificado R-V6) |
| **Validabilidad** | Total: la frontera de escena es **anti-revelación estructural** (el estado no consulta datos posteriores) | Conductual (pruebas CT-6); los umbrales en código no son auditables editorialmente | Alta: el validador comprueba anclas; pero la corrección literaria del umbral sigue siendo editorial (no automatizable) | Total |
| **Compatibilidad** | Total con R-V1…R-V12 vigentes | Total con la especificación R11 | Requiere versión v1.2.0 y consumidores nuevos | Total |
| **Complejidad** | Baja-media (editorial); **cero en contrato** más allá de la opción 2 | Media (motor de elegibilidad); **alta si los umbrales viven en código** | Alta (esquema, migración conceptual, doble mantenimiento con la colocación por beat) | Nula |
| **Riesgos** | Requiere que exista frontera de beat en el umbral (I11 es el cierre de B06 ✓; I12 cierra en B07 ✓); si un umbral cayera intra-beat, exigiría re-segmentación editorial | Divergencia dato/código; dos fuentes de verdad | Doble fuente de verdad con la colocación por beat; anclas frágiles ante re-segmentaciones | Ninguno |
| **Retroceso / restauración** | ✓ derivado: la posición restaura la escena y su base | ✓ si el estado de presentadas se deriva de la posición; ✗ si se guarda acumulativo sin reconciliar | ✓ derivado de anclas | ✓ |
| **Capacidad para el caso I.8** | **Completa**: I11 cierra B06 (frontera exacta); I12 se narra en B07 | Completa (con umbrales del catálogo) | Completa pero redundante con A | Completa |

## 4. Recomendación R09

**A + D, con B como mecanismo de ejecución y C diferida.** Es la «propuesta técnica mínima A+D» que el propio dictamen curatorial anticipa (D-6.5):

1. **Segmentación editorial de I.8 en dos escenas** en la frontera B06|B07 (exactamente tras I11: B06 contiene I09-I11 con I11 como cierre). Escena A: B01–B06 con `900030` en B01, `900005` en B05 (umbral post-I05 verificable; alternativa B04 pendiente de ratificación R01/R02), `[]` en B02–B03 y B06. Escena B: B07 con `[]` → **fondo neutro** (nada elegible al inicio: 900006 no re-declarado aún; los planos previos no heredan entre escenas — R-V4), B08 con `[900006]` (post-I12), B09 `[]` (persistencia o neutro según luz — R06).
2. **Consumidor (B)**: elegibilidad evaluada contra el **cursor de intervenciones presentadas** (§5) — necesario en todo caso para el avance, el retroceso y la restauración; los umbrales no viven en código sino en la colocación editorial y las futuras anclas.
3. **Opción 2** (`minItems: 0`, `[]` = persistencia declarada) **es condición habilitante** de todo lo anterior: sin ella, B07/B06 no pueden declarar persistencia o neutro sin falsificar el dato. Mi evaluación de la CT-5 solicitada por R11: **favorable** — la retrocompatibilidad es estructural (todo registro 1.0.0/1.1.0 declara ≥1 y sigue válido bajo `minItems: 0`); su demostración formal se tramita con la PR técnica de v1.2.0 tras la coaprobación.
4. **C diferida con criterio de reactivación**: si un futuro guion exige caducidad **intra-beat** (un plano que deba cesar sin frontera de beat), la segmentación deja de bastar y se propondrá el anclaje temporal como MINOR v1.3.x. No existe ese caso en el piloto.
5. **`[]` no cambia de semántica unilateralmente**: persiste el plano vigente **sujeto a caducidad** — y la caducidad se materializa por frontera de escena (A), no reinterpretando `[]` como «neutro voluntario» (lo que prohibiría el dictamen y reabriría la Opción 3 rechazada).

## 5. Mecanismo temporal: «intervención presentada» (encargo §5)

- **Definición (presentada):** una intervención queda **presentada** cuando su beat ha mostrado el `texto_visible` íntegro (invariante TS-001/P1-4) y el jugador ha **avanzado más allá del beat** — por avance manual, o por autoavance con `lectura_mínima` cumplida. **Sin dependencia de audio, reloj desnudo, fin de voz, `function`, `spoiler_level` ni carga de imagen.**
- **Cursor narrativo:** la posición (escena, beat) **determina** el conjunto de intervenciones presentadas = las contenidas en beats anteriores al cursor. No requiere registro acumulativo: se **deriva** de la posición, por lo que retroceder, avanzar, cambiar de escena o restaurar una partida **recalculan la elegibilidad automáticamente y sin estados residuales**.
- **¿Cuándo está completa I11?** Al completarse la presentación de B06 (su último texto visible es I11: lanzada, lanza rota y caída) y producirse el avance a B07. Con avance manual: al pulsar «Seguir»; con autoavance: al vencer `max(voz si la hay, lectura_mínima)` de B06. **En ambos casos sin anticipar hechos** (la imagen nunca muestra la caída antes) **y sin bloquear el texto** (el texto de I11 se muestra íntegro aunque el plano quede obsoleto — el costo es solo visual).
- **¿Cuándo está completa I12?** Igual, con B07 (que narra la llegada/auxilio de Sancho): al avanzar de B07 a B08, la cualificación de 900006 se activa **en el arranque de B08** — coincidiendo con el condicionado curatorial («beat habilitador que comience después de I12», p. ej. un `SILENCIO` entre B07 y B08 si R03/R01/R02 lo prefieren).
- **Recálculo:** la elegibilidad es **función pura** de (catálogo, posición, datos del beat): retroceso reduce el cursor (900006 vuelve a quedar excluida), restauración recarga la posición y recomputa (idéntico resultado que la ejecución continua, salvo ficheros ausentes → R-V7), cambio de escena reinicializa (R-V4). Cumple EF-AV-08 y R-V10.

## 6. Consecuencia sobre E-1/R-V2 (redacción propuesta para la coaprobación)

- **E-1 (sustituida):** «Un activo declarado en `visual_asset_ids` de un beat j **puede** ser mostrado desde el beat j **siempre que su umbral curatorial (último hecho narrado que el plano representa) esté contenido en los beats ≤ j**. La colocación es propuesta de R03/R01/R02 sujetas a visado R05/R06; el validador no certifica corrección literaria (E-4 fail-closed en ejecución).»
- **R-V2 (condicionada):** el plano del beat es el primer elemento cargable cuya elegibilidad esté **visada**; en caso de duda, E-4 → neutro.
- Esta reformulación, junto con la segmentación A, resuelve el caso 900006/B06 **sin rechazar la colocación en nombre de R06** (la rectificación es de Dirección Artística, ya en curso).

## 7. Matriz de pruebas CT-6/FP (encargo §6 — diseñadas; **no ejecutadas**: sin reproductor)

| # (encargo) | Prueba | Tipo | Estado |
|---|---|---|---|
| 1 | B01: 900030 inicial; 900005/900006 excluidos | Funcional (reproductor) | Diseñada |
| 2 | B02 antes de I05: 900005 no autorizado | Funcional | Diseñada |
| 3 | Tras I05: 900005 elegible **si la curaduría lo ratifica** | Funcional | Diseñada |
| 4 | B06/I09-I10: 900006 excluido | Funcional | Diseñada |
| 5 | Tras I11, antes de I12: anterior caducada, 900006 excluida → **neutro** | Funcional | Diseñada |
| 6 | Entrada en B07: 900006 continúa excluido | Funcional | Diseñada |
| 7 | Tras I12 y avance confirmado: 900006 elegible condicionada a visado visual | Funcional | Diseñada |
| 8 | Fallos de carga: una imagen posterior nunca sustituye a una anterior | Funcional | Diseñada |
| 9 | Retroceso y restauración: revocación correcta de imágenes posteriores | Funcional | Diseñada |
| 10 | Silencio y movimiento reducido: conservación solo si el plano sigue válido | Accesibilidad | Diseñada |
| 11 | Recorrido sin audio: mismos umbrales narrativos | Usabilidad | Diseñada |
| 12 | Cambio de escena: reinicio de elegibilidad, sin herencia ajena | Funcional | Diseñada |

Todas quedan especificadas para el reproductor (R10) y la batería de caja negra (R12/R08); **ninguna está ejecutada**. La evidencia contractual que las alimenta (colocaciones, umbrales, adenda) queda cubierta por la suite vigente 53/53.

## 8. Lo que esta evaluación NO hace

- No modifica `beat.schema.json`, `scene.schema.json`, `media-asset.schema.json` ni ningún dato (la opción 2/`minItems: 0` y la segmentación se tramitarán por PR técnica **tras** la coaprobación editorial-técnica y autorización R14).
- No ejecuta el reproductor ni las pruebas 1–12.
- No rectifica los veredictos de R06 (luz/continuidad de 900006 es de R06) ni ratifica umbrales que el dictamen deja a R01/R02 (lectura contemporánea de 900005 en B02 vs B05; SILENCIO entre B07 y B08).
- No fusiona ni modifica la PR #44/#45 ni el registro maestro R12.

## 9. Solicitudes a R14

1. **Coaprobación editorial-técnica** de esta evaluación (recomendación A+D + opción 2 + E-1 reformulada).
2. **Encargo a R03/R01/R02** de la segmentación de I.8 en dos escenas y del re-anclaje (900005→B05; 900006→B08), con su línea de SILENCIO opcional.
3. **Autorización para tramitar la PR técnica v1.2.0** (opción 2 + CT-1…CT-6) una vez coaprobada, con doble firma.
4. **Canal R06** para la resolución de luz/continuidad de 900006 antes de cualquier uso post-I12.
