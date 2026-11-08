# FICHA DE ESCENA — «Los gigantes que son molinos» (I, 8)

**Modo:** CONTENIDOS · **Roles:** R03 (guionista/director narrativo) con unidades de R02 y criterios de R01.
**Versión:** propuesta 1.1 (subsanación del dictamen de coordinación: recuento de intervenciones, estructura de intervención con separación de incisos, resolución de condensaciones) · **Fecha:** 2026-11-06 · **Estado:** `GUIONIZADA_PROPUESTA` — no contrato aprobado ni recursos asignados; pendiente de revisión cervantista independiente y de contratos (R09/R11).
**Demostración del método** para el hito H3 sobre el capítulo demostrativo I, 8 (inventario: `docs/data/inventario_literario_p1_c08.json`; modelo: `docs/MODELO_INVENTARIO_LITERARIO.md`).

---

## 1. Cabecera de escena

| Campo | Valor |
|---|---|
| `scene_id` | `DQ.SC.P1.C08.01` |
| `episode_id` | `DQ.P1.C08.E01` — *Los molinos de viento y la batalla con el vizcaíno* |
| `unit_ids[]` | `DQ.UN.P1.C08.U01` … `U05` (U06 queda como transición de salida) |
| `intervenciones` | **16 en el total de la escena: 15 en B01–B08 + 1 en B09** — 6 del NARRADOR, 6 de DON_QUIJOTE, 4 de SANCHO. Cada una con hablante, `texto_visible`, `texto_oral`, `incisos_narrador`, `text_kind` y `passage_ref` (§3). |
| `setting` | Campo de Montiel, media mañana; loma con molinos de viento al viento. Continuidad: primera salida con Sancho ya escudero (I, 7). |
| `story_intent` | El espectador debe entender (1) el mecanismo del equívoco gigantes/molinos, (2) que la derrota física no corrige la mente del héroe (Frestón), (3) cómo reacciona Sancho: advertencia → socorro → regañina → convivencia. |
| `tone[]` | cómico-solemne · épica paródica · ternura final |
| `scene_phase` | `aventura_pre_pregunta` (las preguntas del episodio se enlazan tras beats seguros; §7) |
| `beat_ids[]` | B01–B09 |
| `media_ids[]` (existentes, verificados en `assets/scenes/manifest.json`) | `DQ.MA.900005` (`p1_c08_molinos_pre` — señalamiento con advertencia de Sancho) · `DQ.MA.900030` (`p1_c08_molinos_siluetas_pre` — vista de la loma para el recuento de molinos) · `DQ.MA.900006` (`p1_c08_molinos_post` — caído junto a la lanza rota) |
| `audio_cues[]` | rumoreo de viento creciente (B01→B06); silencio de un segundo antes del golpe de aspa (B06); tañido metálico de la lanza rota; respiración tras la caída (B07) |
| `question_links[]` | ver §7 |
| `transition` | salida literal por B09 (unidades U06) hacia el «Puerto Lápice» |
| `source_refs[]` | edición de extracción de citas: `DQ.ED.0003`/`DQ.SRC.0005` (PG #2000); edición de lectura: `DQ.ED.0001` (Tusell); edición de cotejo: `DQ.ED.0002` (Rico/IC). Pasajes `DQ.P1.C08.P0001…P0006`, `P0012`; propuestos validados `P0013–P0017` |
| TS-001 | Cumplido por diseño: las 16 intervenciones llevan `texto_visible` completo asociado al hablante; la escena es íntegra y comprensible sin audio (§6). |

## 2. Mapa de beats

| Beat | Kind | Momento | Intervenciones | Unidades | Fuente (PG 2000, líneas) |
|---|---|---|---|---|---|
| B01 | NARRACION | Descubrimiento de los molinos | I01 | U01 | 2560–2561 |
| B02 | DIALOGO | «La ventura va guiando…» (botín y servicio de Dios) | I02 | U01 | 2563–2568 |
| B03 | DIALOGO | «— ¿Qué gigantes?» / brazos «de casi dos leguas» | I03–I04 | U02 | 2570–2573 |
| B04 | DIALOGO | «Mire vuestra merced…» / «…ponte en oración» | I05–I06 | U02 | 2575–2582 |
| B05 | ACCION | Espuelas, sordera selectiva y «Non fuyades» | I07–I08 | U03 | 2584–2592 |
| B06 | ACCION | El viento mueve las aspas; Briareo; embestida y caída | I09–I11 | U04 | 2594–2606 |
| B07 | ACCION | Sancho acude al socorro | I12 | U04 | 2606–2608 |
| B08 | DIALOGO | Regañina de Sancho; Frestón; «Dios lo haga como puede» | I13–I15 | U05 | 2610–2621 |
| B09 | TRANSICION | Salida literal hacia el Puerto Lápice | I16 | U06 | 2623–2625 |

Total: 9 beats, 16 intervenciones (15 en B01–B08; 1 en B09).

## 3. Beats e intervenciones (texto visible exacto y texto oral)

Convenciones (modelo §3.4, obligatorias):
- `texto_visible`: lo que se muestra en pantalla — **íntegro y literal**, incluidos los incisos del narrador («—respondió Sancho—»), que forman parte del texto literario (TS-001).
- `incisos_narrador`: fragmentos del inciso dentro de la cita literaria; pertenecen al narrador, no al personaje.
- `texto_oral`: lo que se entrega al intérprete de voz — **solo las palabras del hablante**, con los incisos retirados y la raya de diálogo eliminada. En las intervenciones del NARRADOR coincide con `texto_visible`.
- `text_kind`: `CITA_LITERAL` / `ADAPTACION_FIEL` / `NARRACION_ENLACE`.
- `passage_ref`: pasaje de evidencia existente o propuesto validado (localizador verificado; los P0013–P0017 requieren alta física en el catálogo, pendiente de contrato R09/R11).
- Los IDs `I01…I16` son de intervención (no confundir con las unidades `DQ.UN.P1.C08.U01…U12` del inventario).

### B01 — Descubrimiento (NARRACION)
- **I01** · hablante: NARRADOR · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0001` (ancla parcial de evidencia)
- texto_visible: «En esto, descubrieron treinta o cuarenta molinos de viento que hay en aquel campo; y, así como don Quijote los vio, dijo a su escudero:»
- incisos_narrador: —
- texto_oral: idéntico al texto_visible (intervención del narrador)
- locador: PG 2000, líneas 2560–2561 · offset 122425–122560
- media: DQ.MA.900030 (siluetas: la hilera de molinos desde la loma)
- Nota: el narrador da la realidad **antes** que el delirio: la distancia narrador/personaje es el motor del humor de toda la escena (inventario U01, `humor.preparacion`).

### B02 — «La ventura va guiando…» (DIALOGO)
- **I02** · hablante: DON_QUIJOTE · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0002` (ancla parcial: la cita íntegra empieza en el rango declarado)
- texto_visible: «— La ventura va guiando nuestras cosas mejor de lo que acertáramos a desear, porque ves allí, amigo Sancho Panza, donde se descubren treinta, o pocos más, desaforados gigantes, con quien pienso hacer batalla y quitarles a todos las vidas, con cuyos despojos comenzaremos a enriquecer; que ésta es buena guerra, y es gran servicio de Dios quitar tan mala simiente de sobre la faz de la tierra.»
- incisos_narrador: —
- texto_oral: «La ventura va guiando nuestras cosas mejor de lo que acertáramos a desear, porque ves allí, amigo Sancho Panza, donde se descubren treinta, o pocos más, desaforados gigantes, con quien pienso hacer batalla y quitarles a todos las vidas, con cuyos despojos comenzaremos a enriquecer; que ésta es buena guerra, y es gran servicio de Dios quitar tan mala simiente de sobre la faz de la tierra.»
- locador: PG 2000, líneas 2563–2568 · offset 122562–122954
- media: DQ.MA.900005 (señalamiento con advertencia de Sancho)
- Humor: lógica interna impecable sobre premisa falsa; doble motivación (despojos + servicio divino). Emoción: euforia expansionista (arco DQ).

### B03 — «¿Qué gigantes?» / «brazos de casi dos leguas» (DIALOGO)
- **I03** · hablante: SANCHO · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0013` (validado, alta física pendiente)
- texto_visible: «— ¿Qué gigantes? —dijo Sancho Panza.»
- incisos_narrador: «—dijo Sancho Panza.»
- texto_oral: «¿Qué gigantes?»
- locador: PG 2000, línea 2570 · offset 122956–122992
- **I04** · hablante: DON_QUIJOTE · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0013`
- texto_visible: «— Aquellos que allí ves —respondió su amo— de los brazos largos, que los suelen tener algunos de casi dos leguas.»
- incisos_narrador: «—respondió su amo—»
- texto_oral: «Aquellos que allí ves de los brazos largos, que los suelen tener algunos de casi dos leguas.»
- locador: PG 2000, líneas 2572–2573 · offset 122994–123107
- Humor: pregunta naïf → hipérbole materializadora. Tono: maestro y discípulo.

### B04 — La corrección técnica de Sancho y el despacho a orar (DIALOGO)
- **I05** · hablante: SANCHO · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0003` (el catálogo ancla sin la raya inicial, offset 123111; la intervención la incluye)
- texto_visible: «— Mire vuestra merced —respondió Sancho— que aquellos que allí se parecen no son gigantes, sino molinos de viento, y lo que en ellos parecen brazos son las aspas, que, volteadas del viento, hacen andar la piedra del molino.»
- incisos_narrador: «—respondió Sancho—»
- texto_oral: «Mire vuestra merced que aquellos que allí se parecen no son gigantes, sino molinos de viento, y lo que en ellos parecen brazos son las aspas, que, volteadas del viento, hacen andar la piedra del molino.»
- locador: PG 2000, líneas 2575–2577 · offset 123109–123332
- **I06** · hablante: DON_QUIJOTE · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0014`
- texto_visible: «— Bien parece —respondió don Quijote— que no estás cursado en esto de las aventuras: ellos son gigantes; y si tienes miedo, quítate de ahí, y ponte en oración en el espacio que yo voy a entrar con ellos en fiera y desigual batalla.»
- incisos_narrador: «—respondió don Quijote—»
- texto_oral: «Bien parece que no estás cursado en esto de las aventuras: ellos son gigantes; y si tienes miedo, quítate de ahí, y ponte en oración en el espacio que yo voy a entrar con ellos en fiera y desigual batalla.»
- locador: PG 2000, líneas 2579–2582 · offset 123334–123565
- Humor: colisión de epistemologías; descalificación de la competencia del testigo en lugar de discutir los datos. Emoción: Sancho incredulidad práctica; DQ seguridad magisterial.

### B05 — Espuelas, sordera selectiva, «Non fuyades» (ACCION)
- **I07** · hablante: NARRADOR · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0015`
- texto_visible: «Y, diciendo esto, dio de espuelas a su caballo Rocinante, sin atender a las voces que su escudero Sancho le daba, advirtiéndole que, sin duda alguna, eran molinos de viento, y no gigantes, aquellos que iba a acometer. Pero él iba tan puesto en que eran gigantes, que ni oía las voces de su escudero Sancho ni echaba de ver, aunque estaba ya bien cerca, lo que eran; antes, iba diciendo en voces altas:»
- incisos_narrador: —
- texto_oral: idéntico al texto_visible (intervención del narrador)
- locador: PG 2000, líneas 2584–2589 · offset 123567–123968
- **I08** · hablante: DON_QUIJOTE · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0012` (el catálogo ancla sin la raya inicial, offset 123972)
- texto_visible: «— Non fuyades, cobardes y viles criaturas, que un solo caballero es el que os acomete.»
- incisos_narrador: —
- texto_oral: «Non fuyades, cobardes y viles criaturas, que un solo caballero es el que os acomete.»
- locador: PG 2000, líneas 2591–2592 · offset 123970–124056
- Humor: ironía del narrador (certifica la sordera) + parodia de arenga épica (latinazo contra aspas).
- Condensación resuelta (R01_FIRMADA): el beat puede fundirse visualmente con I08, pero el texto de I07 permanece íntegro y visible — «ni oía las voces de su escudero Sancho» es la causa del mecanismo y no se recorta.
- Emoción: furia belicosa (DQ); impotencia alarmada (Sancho).

### B06 — El golpe: Briareo y la caída (ACCION)
- **I09** · hablante: NARRADOR · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0004` (el pasaje cubre narración + cita completa, 124058–124258)
- texto_visible: «Levantóse en esto un poco de viento y las grandes aspas comenzaron a moverse, lo cual visto por don Quijote, dijo:»
- incisos_narrador: —
- texto_oral: idéntico al texto_visible (intervención del narrador)
- locador: PG 2000, líneas 2594–2595 · offset 124058–124172
- **I10** · hablante: DON_QUIJOTE · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0004`
- texto_visible: «— Pues, aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar.»
- incisos_narrador: —
- texto_oral: «Pues, aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar.»
- locador: PG 2000, líneas 2597–2598 · offset 124174–124258
- **I11** · hablante: NARRADOR · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0005` (ancla parcial de evidencia)
- texto_visible: «Y, en diciendo esto, y encomendándose de todo corazón a su señora Dulcinea, pidiéndole que en tal trance le socorriese, bien cubierto de su rodela, con la lanza en el ristre, arremetió a todo el galope de Rocinante y embistió con el primero molino que estaba delante; y, dándole una lanzada en el aspa, la volvió el viento con tanta furia que hizo la lanza pedazos, llevándose tras sí al caballo y al caballero, que fue rodando muy maltrecho por el campo.»
- incisos_narrador: —
- texto_oral: idéntico al texto_visible (intervención del narrador)
- locador: PG 2000, líneas 2600–2606 · offset 124260–124715
- media: DQ.MA.900006 (molinos_post: caído junto a la lanza rota) — como imagen posterior al golpe, no anticipatoria
- Humor: la física gana sin discusión; el «enemigo» ni siquiera registra el ataque. Silencio de audio de 1 s antes del impacto (reacción cómica por contraste, no por gag añadido).
- Emoción: fervor devoto → derrota física sin registro mental.

### B07 — Sancho al socorro (ACCION)
- **I12** · hablante: NARRADOR · text_kind: `CITA_LITERAL` · passage_ref: `DQ.P1.C08.P0006` (ancla parcial de evidencia)
- texto_visible: «Acudió Sancho Panza a socorrerle, a todo el correr de su asno, y cuando llegó halló que no se podía menear: tal fue el golpe que dio con él Rocinante.»
- incisos_narrador: —
- texto_oral: idéntico al texto_visible (intervención del narrador)
- locador: PG 2000, líneas 2606–2608 · offset 124716–124866
- Emoción: la impotencia se convierte en acción (arco Sancho).

### B08 — Regañina, Frestón y capitulación (DIALOGO)
- **I13** · hablante: SANCHO · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0016`
- texto_visible: «— ¡Válame Dios! —dijo Sancho—. ¿No le dije yo a vuestra merced que mirase bien lo que hacía, que no eran sino molinos de viento, y no lo podía ignorar sino quien llevase otros tales en la cabeza?»
- incisos_narrador: «—dijo Sancho—.»
- texto_oral: «¡Válame Dios! ¿No le dije yo a vuestra merced que mirase bien lo que hacía, que no eran sino molinos de viento, y no lo podía ignorar sino quien llevase otros tales en la cabeza?»
- locador: PG 2000, líneas 2610–2612 · offset 124868–125063
- **I14** · hablante: DON_QUIJOTE · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0016`
- texto_visible: «— Calla, amigo Sancho —respondió don Quijote—, que las cosas de la guerra, más que otras, están sujetas a continua mudanza; cuanto más, que yo pienso, y es así verdad, que aquel sabio Frestón que me robó el aposento y los libros ha vuelto estos gigantes en molinos por quitarme la gloria de su vencimiento: tal es la enemistad que me tiene; mas, al cabo al cabo, han de poder poco sus malas artes contra la bondad de mi espada.»
- incisos_narrador: «—respondió don Quijote—»
- texto_oral: «Calla, amigo Sancho, que las cosas de la guerra, más que otras, están sujetas a continua mudanza; cuanto más, que yo pienso, y es así verdad, que aquel sabio Frestón que me robó el aposento y los libros ha vuelto estos gigantes en molinos por quitarme la gloria de su vencimiento: tal es la enemistad que me tiene; mas, al cabo al cabo, han de poder poco sus malas artes contra la bondad de mi espada.»
- locador: PG 2000, líneas 2614–2619 · offset 125065–125492
- **I15** · hablante: SANCHO · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0016`
- texto_visible: «— Dios lo haga como puede —respondió Sancho Panza.»
- incisos_narrador: «—respondió Sancho Panza.»
- texto_oral: «Dios lo haga como puede»
- locador: PG 2000, línea 2621 · offset 125494–125544
- Humor: núcleo de la escena — la factura doméstica contra la inmunidad psicológica del delirio (Frestón). No explicar el chiste en pantalla: las tres intervenciones se dejan hablar solas.
- Emoción: Sancho regañina triunfal → resignación cariñosa; DQ identidad blindada. La ternura final prepara la convivencia de toda la novela.

### B09 — Salida hacia el Puerto Lápice (TRANSICION)
- **I16** · hablante: NARRADOR · text_kind: `CITA_LITERAL` · passage_ref: PROPUESTO `DQ.P1.C08.P0017`
- texto_visible: «Y, ayudándole a levantar, tornó a subir sobre Rocinante, que medio despaldado estaba. Y, hablando en la pasada aventura, siguieron el camino del Puerto Lápice,»
- incisos_narrador: —
- texto_oral: idéntico al texto_visible (intervención del narrador)
- locador: PG 2000, líneas 2623–2625 · offset 125546–125705
- Condensación resuelta (R01_FIRMADA): se **descarta** la redacción propia de enlace de la versión 1.0 y se adopta el texto literal completo (P0017); la variante de enlace solo se usaría si el ritmo lo exige, con el literal como referencia.

## 4. Condensaciones de la escena — resueltas por R01

| Qué | Dictamen R01 | Condición | Traza |
|---|---|---|---|
| B05: fundir el beat de acción con la arenga | **APROBADA CON CONDICIÓN** | el texto de I07 permanece íntegro y visible («ni oía las voces…» es la causa del mecanismo); la fusión afecta solo a la puesta en beats | inventario U03 `condensacion.resolucion_r01` |
| B09: salida al Puerto Lápice | **RESUELTA POR SUSTITUCIÓN** | se descarta la redacción propia (v1.0) y se adopta el literal P0017 como CITA_LITERAL | inventario U06; I16 |

Regla DC-19: el hecho, el orden, la causa y el humor significativo (equívoco + caída + Frestón) permanecen íntegros. Alternativa de acceso: lector íntegro.

## 5. Arcos emocionales de la escena (verificación H2)

- **Don Quijote:** euforia expansionista (B02) → seguridad magisterial (B03–B04) → furia belicosa (B05) → fervor devoto y derrota física (B06) → identidad blindada por Frestón (B08). *Invariante: la evidencia no corrige al héroe.*
- **Sancho:** pregunta naïf (B03) → corrección técnica (B04) → advertencia impotente (B05) → socorro (B07) → regañina triunfal → resignación cariñosa (B08). *Invariante: se opone con datos y acaba obedeciendo con condición — ahí nace la sociedad.*

## 6. TS-001 — verificación de la escena

- **16 intervenciones con voz: 15 en B01–B08 + 1 en B09** — 6 del NARRADOR, 6 de DON_QUIJOTE, 4 de SANCHO. Todas con `texto_visible` íntegro y hablante etiquetado; todas con `texto_oral` derivado (solo palabras del hablante, incisos retirados — verificado por script, §8).
- La escena es completa y comprensible sin audio (mute/sin archivo de audio = misma secuencia de texto). El principio se aplica también a narraciones y a cualquier texto adaptado.
- Avance manual permitido en todos los beats; repetición y retroceso por beat; sin truncamiento de diálogo.
- Los rótulos de hablante no se atribuyen a Cervantes (TS-001 §1: distinción `CITA_LITERAL`/`NARRACION_ENLACE` en metadatos, no en el texto visible).

## 7. Preguntas del episodio enlazadas a beats seguros (R15)

| Pregunta | Beat de enlace | Sin spoiler porque |
|---|---|---|
| DQ.Q.000101 (brazos=aspas) | B04 (tras oír la corrección de Sancho) | la pregunta pide la explicación que Sancho acaba de dar; la imagen no la contiene |
| DQ.Q.000103 (justificación del botín) | B02 | el enunciado cita «gigantes» tal como el texto; la imagen muestra el señalamiento |
| DQ.Q.000105 (por qué cae) | B06, tras el golpe | la imagen post muestra el desenlace, no la causa (viento en aspas) |
| DQ.Q.000109 (percepción vs realidad) | B04 | el matching se responde con lo ya escuchado |

Las demás preguntas del episodio (U07/U09 y comparativas de sucesos) se enlazan en las escenas siguientes. Ninguna pregunta bloquea el avance (Biblia R15).

## 8. Localización independiente — tabla de verificación

**Cómo verificar sin ayuda del autor:** abrir `content/textos/gutenberg_2000/El_Quijote.txt`; las líneas indicadas corresponden al fichero con saltos `\n` (conversión `CRLF→LF`, 2.168.088 caracteres). El capítulo VIII ocupa las líneas 2556–2857 (el IX arranca en la 2864).

| Intervención | Líneas | Offset | Coincidencia exacta del `texto_visible` |
|---|---|---|---|
| I01 | 2560–2561 | 122425–122560 | PASS |
| I02 | 2563–2568 | 122562–122954 | PASS |
| I03 | 2570 | 122956–122992 | PASS |
| I04 | 2572–2573 | 122994–123107 | PASS |
| I05 | 2575–2577 | 123109–123332 | PASS |
| I06 | 2579–2582 | 123334–123565 | PASS |
| I07 | 2584–2589 | 123567–123968 | PASS |
| I08 | 2591–2592 | 123970–124056 | PASS |
| I09 | 2594–2595 | 124058–124172 | PASS |
| I10 | 2597–2598 | 124174–124258 | PASS |
| I11 | 2600–2606 | 124260–124715 | PASS |
| I12 | 2606–2608 | 124716–124866 | PASS |
| I13 | 2610–2612 | 124868–125063 | PASS |
| I14 | 2614–2619 | 125065–125492 | PASS |
| I15 | 2621 | 125494–125544 | PASS |
| I16 | 2623–2625 | 125546–125705 | PASS |

Verificación automática 2026-11-06: las 16 citas cotejadas carácter a carácter contra `DQ.SRC.0005` (SHA-256 `afa1a638…fb6e239`), además de la comprobación incisos→texto_oral de las 16 intervenciones (16/16 PASS). Ver `docs/INFORME_SUBSANACION_H1_H3_I8.md`.

## 9. Pendientes para elevar de estado

1. Revisión cervantista independiente de esta ficha (esta subsanación la firma el mismo agente que la redactó; el dictamen de coordinación exige revisión humana).
2. Alta física de los pasajes propuestos validados `DQ.P1.C08.P0013–P0017` en `content/piloto/passages/` + `package.json` (requiere el contrato de beats R09/R11 para no divergir del catálogo).
3. Storyboard de planos por beat sobre los 3 assets existentes (R06); huecos (B05 carga, B08 diálogo post-caída) a la matriz escena→plano→asset.
4. Cue sheet de las 16 intervenciones con los `texto_oral` ya fijos (R07).

---

## ADENDA MONTAJE A01 (PR #72 — decisión de Dirección, 2026-11-08)

El montaje cinematográfico del episodio queda así en datos (v1.2.0): B07
(I12) muestra N11 caída tras I11; **B08 queda con únicamente I13** y muestra
N12 socorro; **beat nuevo (order 9) con I14+I15** muestra N13 diálogo; B09
(I16, order 10) muestra N16 camino (simultaneidad autorizada). IDs de
intervención, textos verbatim, pasajes y hashes sin alteración. Los beats
B01–B06 permanecen en neutro editorial deliberado. Ver
`docs/ASIGNACION_VISUAL_P1_C08.md` §2b.
