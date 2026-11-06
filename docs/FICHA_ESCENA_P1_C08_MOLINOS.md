# FICHA DE ESCENA — «Los gigantes que son molinos» (I, 8)

**Modo:** CONTENIDOS · **Roles:** R03 (guionista/director narrativo) con unidades de R02 y criterios de R01.
**Versión:** propuesta 1.0 · **Fecha:** 2026-11-06 · **Estado:** `GUIONIZADA_PROPUESTA` — no contrato aprobado ni recursos asignados; pendiente de revisión cervantista (R01) y de contratos (R09/R11).
**Demostración del método** para el hito H3 sobre el capítulo demostrativo I, 8 (inventario: `docs/data/inventario_literario_p1_c08.json`; modelo: `docs/MODELO_INVENTARIO_LITERARIO.md`).

---

## 1. Cabecera de escena

| Campo | Valor |
|---|---|
| `scene_id` | `DQ.SC.P1.C08.01` |
| `episode_id` | `DQ.P1.C08.E01` — *Los molinos de viento y la batalla con el vizcaíno* |
| `unit_ids[]` | `DQ.UN.P1.C08.U01` … `U05` (U06 queda como transición de salida) |
| `setting` | Campo de Montiel, media mañana; loma con molinos de viento al viento. Continuidad: primera salida con Sancho ya escudero (I, 7). |
| `story_intent` | El espectador debe entender (1) el mecanismo del equívoco gigantes/molinos, (2) que la derrota física no corrige la mente del héroe (Frestón), (3) cómo reacciona Sancho: advertencia → socorro → regañina → convivencia. |
| `tone[]` | cómico-solemne · épica paródica · ternura final |
| `scene_phase` | `aventura_pre_pregunta` (las preguntas del episodio se enlazan tras beats seguros; §7) |
| `beat_ids[]` | B01–B09 |
| `media_ids[]` (existentes, verificados en `assets/scenes/manifest.json`) | `DQ.MA.900005` (`p1_c08_molinos_pre` — señalamiento con advertencia de Sancho) · `DQ.MA.900030` (`p1_c08_molinos_siluetas_pre` — vista de la loma para el recuento de molinos) · `DQ.MA.900006` (`p1_c08_molinos_post` — caído junto a la lanza rota) |
| `audio_cues[]` | rumoreo de viento creciente (B01→B06); silencio de un segundo antes del golpe de aspa (B06); tañido metálico de la lanza rota; respiración tras la caída (B07) |
| `question_links[]` | ver §7 |
| `transition` | salida por `NARRACION_ENLACE` hacia el «Puerto Lápice» (unidades U06–U08, escena siguiente «La noche de la bota flaca» o condensación de enlace) |
| `source_refs[]` | `DQ.ED.0001` (edición del paquete) · `DQ.SRC.0005` PG 2000 (anclaje) · pasajes `DQ.P1.C08.P0001…P0006`, `P0012`; propuestos `P0013–P0016` |
| TS-001 | Cumplido por diseño: toda intervención audible lleva `visible_text` completo (§3). La escena es íntegra y comprensible sin audio. |

## 2. Mapa de beats

| Beat | Kind | Momento | Unidades | Fuente (PG 2000, líneas) |
|---|---|---|---|---|
| B01 | NARRACION | Descubrimiento de los molinos | U01 | 2560–2561 |
| B02 | DIALOGO | «La ventura va guiando…» (botín y servicio de Dios) | U01 | 2563–2568 |
| B03 | DIALOGO | «— ¿Qué gigantes?» / brazos «de casi dos leguas» | U02 | 2570–2573 |
| B04 | DIALOGO | «Mire vuestra merced…» / «…ponte en oración» | U02 | 2575–2582 |
| B05 | ACCION | Espuelas, sordera selectiva y «Non fuyades» | U03 | 2584–2592 |
| B06 | ACCION | El viento mueve las aspas; Briareo; embestida y caída | U04 | 2594–2606 |
| B07 | ACCION | Sancho acude al socorro | U04 | 2606–2608 |
| B08 | DIALOGO | Regañina de Sancho; Frestón; «Dios lo haga como puede» | U05 | 2610–2621 |
| B09 | TRANSICION | Enlace al Puerto Lápice | U06 | 2623–2625 |

## 3. Beats e intervenciones (texto visible exacto)

Convención: `visible_text` se transcribe **íntegro y literal** del texto fuente; el guionista solo puede ajustar la presentación (páginas de texto, rótulo de hablante), nunca las palabras. Las etiquetas de hablante (`NARRADOR`, `DON_QUIJOTE`, `SANCHO`) van fuera del texto visible. `passage_id` = ancla de evidencia existente (puede ser un recorte parcial del fragmento); `locador` = localización completa verificada. Los pasajes marcados `PROPUESTO` requieren alta editorial (pendiente R01) antes de integrar.

### B01 — Descubrimiento (NARRACION)
- `utterance`: `U01` · `speaker`: NARRADOR · `text_kind`: `CITA_LITERAL`
- `visible_text`: «En esto, descubrieron treinta o cuarenta molinos de viento que hay en aquel campo; y, así como don Quijote los vio, dijo a su escudero:»
- `locador`: PG 2000, líneas 2560–2561 · offset 122425–122560 · ancla parcial: `DQ.P1.C08.P0001`
- `media`: DQ.MA.900030 (siluetas: la hilera de molinos desde la loma)
- Nota: el narrador da la realidad **antes** que el delirio: la distancia narrador/personaje es el motor del humor de toda la escena (inventario U01, `humor.preparacion`).

### B02 — «La ventura va guiando…» (DIALOGO)
- `utterance`: `U02` · `speaker`: DON_QUIJOTE · `text_kind`: `CITA_LITERAL`
- `visible_text`: «— La ventura va guiando nuestras cosas mejor de lo que acertáramos a desear, porque ves allí, amigo Sancho Panza, donde se descubren treinta, o pocos más, desaforados gigantes, con quien pienso hacer batalla y quitarles a todos las vidas, con cuyos despojos comenzaremos a enriquecer; que ésta es buena guerra, y es gran servicio de Dios quitar tan mala simiente de sobre la faz de la tierra.»
- `locador`: PG 2000, líneas 2563–2568 · offset 122562–122954 · ancla parcial: `DQ.P1.C08.P0002`
- `media`: DQ.MA.900005 (señalamiento con advertencia de Sancho)
- Humor: lógica interna impecable sobre premisa falsa; doble motivación (despojos + servicio divino). Tono: solemnidad expansiva.
- Emoción: euforia expansionista (arco DQ).

### B03 — «¿Qué gigantes?» / «brazos de casi dos leguas» (DIALOGO)
- `utterance`: `U03` · `speaker`: SANCHO · `text_kind`: `CITA_LITERAL` · **pasaje PROPUESTO `DQ.P1.C08.P0013` (pendiente de alta)**
- `visible_text`: «— ¿Qué gigantes? —dijo Sancho Panza.»
- `locador`: PG 2000, línea 2570 · offset 122956–122992
- `utterance`: `U04` · `speaker`: DON_QUIJOTE · `text_kind`: `CITA_LITERAL` · PROPUESTO `DQ.P1.C08.P0013`
- `visible_text`: «— Aquellos que allí ves —respondió su amo— de los brazos largos, que los suelen tener algunos de casi dos leguas.»
- `locador`: PG 2000, líneas 2572–2573 · offset 122994–123107
- Humor: pregunta naïf → hipérbole materializadora. Tono: maestro y discípulo.

### B04 — La corrección técnica de Sancho y el despacho a orar (DIALOGO)
- `utterance`: `U05` · `speaker`: SANCHO · `text_kind`: `CITA_LITERAL`
- `visible_text`: «— Mire vuestra merced —respondió Sancho— que aquellos que allí se parecen no son gigantes, sino molinos de viento, y lo que en ellos parecen brazos son las aspas, que, volteadas del viento, hacen andar la piedra del molino.»
- `locador`: PG 2000, líneas 2575–2577 · offset 123109–123332 · ancla de evidencia: `DQ.P1.C08.P0003` (el catálogo ancla sin la raya inicial de diálogo, offset 123111; la ficha la incluye)
- `utterance`: `U06` · `speaker`: DON_QUIJOTE · `text_kind`: `CITA_LITERAL` · **pasaje PROPUESTO `DQ.P1.C08.P0014` (pendiente de alta)**
- `visible_text`: «— Bien parece —respondió don Quijote— que no estás cursado en esto de las aventuras: ellos son gigantes; y si tienes miedo, quítate de ahí, y ponte en oración en el espacio que yo voy a entrar con ellos en fiera y desigual batalla.»
- `locador`: PG 2000, líneas 2579–2582 · offset 123334–123565
- Humor: colisión de epistemologías; descalificación de la competencia del testigo en lugar de discutir los datos.
- Emoción: Sancho incredulidad práctica; DQ seguridad magisterial.

### B05 — Espuelas, sordera selectiva, «Non fuyades» (ACCION)
- `utterance`: `U07` · `speaker`: NARRADOR · `text_kind`: `CITA_LITERAL` · **pasaje PROPUESTO `DQ.P1.C08.P0015` (pendiente de alta)**
- `visible_text`: «Y, diciendo esto, dio de espuelas a su caballo Rocinante, sin atender a las voces que su escudero Sancho le daba, advirtiéndole que, sin duda alguna, eran molinos de viento, y no gigantes, aquellos que iba a acometer. Pero él iba tan puesto en que eran gigantes, que ni oía las voces de su escudero Sancho ni echaba de ver, aunque estaba ya bien cerca, lo que eran; antes, iba diciendo en voces altas:»
- `locador`: PG 2000, líneas 2584–2589 · offset 123567–123968
- `utterance`: `U08` · `speaker`: DON_QUIJOTE · `text_kind`: `CITA_LITERAL`
- `visible_text`: «— Non fuyades, cobardes y viles criaturas, que un solo caballero es el que os acomete.»
- `locador`: PG 2000, líneas 2591–2592 · offset 123970–124056 · ancla de evidencia: `DQ.P1.C08.P0012` (sin la raya inicial, 123972)
- Humor: ironía del narrador (certifica la sordera) + parodia de arenga épica (latinazo contra aspas).
- Condensación propuesta (U03): fundir `U07` en acción visual con narración mínima; conservar SIEMPRE el «Non fuyades». Riesgo documentado: que el arrojo se lea como valentía. `aprobacion: PROPUESTA`.
- Emoción: furia belicosa (DQ); impotencia alarmada (Sancho).

### B06 — El golpe: Briareo y la caída (ACCION)
- `utterance`: `U09` · `speaker`: NARRADOR · `text_kind`: `CITA_LITERAL`
- `visible_text`: «Levantóse en esto un poco de viento y las grandes aspas comenzaron a moverse, lo cual visto por don Quijote, dijo:»
- `locador`: PG 2000, líneas 2594–2595 · offset 124058–124172 · ancla de evidencia: `DQ.P1.C08.P0004` (el pasaje cubre narración + cita completa, 124058–124258)
- `utterance`: `U10` · `speaker`: DON_QUIJOTE · `text_kind`: `CITA_LITERAL`
- `visible_text`: «— Pues, aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar.»
- `locador`: PG 2000, líneas 2597–2598 · offset 124174–124258 · ancla de evidencia: `DQ.P1.C08.P0004`
- `utterance`: `U11` · `speaker`: NARRADOR · `text_kind`: `CITA_LITERAL`
- `visible_text`: «Y, en diciendo esto, y encomendándose de todo corazón a su señora Dulcinea, pidiéndole que en tal trance le socorriese, bien cubierto de su rodela, con la lanza en el ristre, arremetió a todo el galope de Rocinante y embistió con el primero molino que estaba delante; y, dándole una lanzada en el aspa, la volvió el viento con tanta furia que hizo la lanza pedazos, llevándose tras sí al caballo y al caballero, que fue rodando muy maltrecho por el campo.»
- `locador`: PG 2000, líneas 2600–2606 · offset 124260–124715 · ancla parcial: `DQ.P1.C08.P0005`
- `media`: DQ.MA.900006 (molinos_post: caído junto a la lanza rota) — como imagen posterior al golpe, no anticipatoria
- Humor: la física gana sin discusión; el «enemigo» ni siquiera registra el ataque. Silencio de audio de 1 s antes del impacto (reacción cómica por contraste, no por gag añadido).
- Emoción: fervor devoto → derrota física sin registro mental.

### B07 — Sancho al socorro (ACCION)
- `utterance`: `U12` · `speaker`: NARRADOR · `text_kind`: `CITA_LITERAL`
- `visible_text`: «Acudió Sancho Panza a socorrerle, a todo el correr de su asno, y cuando llegó halló que no se podía menear: tal fue el golpe que dio con él Rocinante.»
- `locador`: PG 2000, líneas 2606–2608 · offset 124716–124866 · ancla parcial: `DQ.P1.C08.P0006`
- Emoción: la impotencia se convierte en acción (arco Sancho).

### B08 — Regañina, Frestón y capitulación (DIALOGO)
- `utterance`: `U13` · `speaker`: SANCHO · `text_kind`: `CITA_LITERAL` · **pasaje PROPUESTO `DQ.P1.C08.P0016` (pendiente de alta)**
- `visible_text`: «— ¡Válame Dios! —dijo Sancho—. ¿No le dije yo a vuestra merced que mirase bien lo que hacía, que no eran sino molinos de viento, y no lo podía ignorar sino quien llevase otros tales en la cabeza?»
- `locador`: PG 2000, líneas 2610–2612 · offset 124868–125063
- `utterance`: `U14` · `speaker`: DON_QUIJOTE · `text_kind`: `CITA_LITERAL` · PROPUESTO `DQ.P1.C08.P0016`
- `visible_text`: «— Calla, amigo Sancho —respondió don Quijote—, que las cosas de la guerra, más que otras, están sujetas a continua mudanza; cuanto más, que yo pienso, y es así verdad, que aquel sabio Frestón que me robó el aposento y los libros ha vuelto estos gigantes en molinos por quitarme la gloria de su vencimiento: tal es la enemistad que me tiene; mas, al cabo al cabo, han de poder poco sus malas artes contra la bondad de mi espada.»
- `locador`: PG 2000, líneas 2614–2619 · offset 125065–125492
- `utterance`: `U15` · `speaker`: SANCHO · `text_kind`: `CITA_LITERAL` · PROPUESTO `DQ.P1.C08.P0016`
- `visible_text`: «— Dios lo haga como puede —respondió Sancho Panza.»
- `locador`: PG 2000, línea 2621 · offset 125494–125544
- Humor: núcleo de la escena — la factura doméstica contra la inmunidad psicológica del delirio (Frestón). No explicar el chiste en pantalla: las tres intervenciones se dejan hablar solas.
- Emoción: Sancho regañina triunfal → resignación cariñosa; DQ identidad blindada. La ternura final prepara la convivencia de toda la novela.

### B09 — Transición (TRANSICION)
- `utterance`: `U16` · `speaker`: NARRADOR · `text_kind`: `NARRACION_ENLACE` (redacción propia, alternativa verificada abajo)
- `visible_text` (propuesta de enlace): «Y, ayudado por Sancho, don Quijote tornó a subir sobre Rocinante; y, hablando en la pasada aventura, siguieron el camino del Puerto Lápice.»
- `texto fuente literal equivalente`: «Y, ayudándole a levantar, tornó a subir sobre Rocinante, que medio despaldado estaba. Y, hablando en la pasada aventura, siguieron el camino del Puerto Lápice,» — PG 2000, líneas 2623–2625 · offset 125546–125705 · **pasaje PROPUESTO `DQ.P1.C08.P0017`**
- Alternativa recomendada (R03): usar el literal completo como `CITA_LITERAL` y evitar redacción propia; el enlace queda como opción si el ritmo lo exige. Condensación de U06–U08 documentada en el inventario.

## 4. Condensaciones de la escena

| Qué | Motivo | Qué se pierde | Riesgo | Compensación | Aprobación |
|---|---|---|---|---|---|
| B05: narración de espuelas → beat de acción + narración mínima | ritmo | «ni oía las voces» | leer arrojo como valentía | Sancho gritando en primer término; narración breve | PROPUESTA (R01) |
| B09: enlace propio en vez del literal | ritmo | «que medio despaldado estaba» | bajo | mención en escena siguiente | PROPUESTA (R01) |

Regla DC-19: el hecho, el orden, la causa y el humor significativo (equívoco + caída + Frestón) permanecen íntegros. Alternativa de acceso: lector íntegro.

## 5. Arcos emocionales de la escena (verificación H2)

- **Don Quijote:** euforia expansionista (B02) → seguridad magisterial (B03–B04) → furia belicosa (B05) → fervor devoto y derrota física (B06) → identidad blindada por Frestón (B08). *Invariante: la evidencia no corrige al héroe.*
- **Sancho:** pregunta naïf (B03) → corrección técnica (B04) → advertencia impotente (B05) → socorro (B07) → regañina triunfal → resignación cariñosa (B08). *Invariante: se opone con datos y acaba obedeciendo con condición — ahí nace la sociedad.*

## 6. TS-001 — verificación de la escena

- 12 intervenciones con voz en B01–B08 (3 hablantes: NARRADOR, DON_QUIJOTE, SANCHO): todas con `visible_text` íntegro y hablante etiquetado.
- La escena es completa y comprensible sin audio (mute/sin archivo de audio = misma secuencia de texto).
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

| Beat | Líneas | Offset | Coincidencia exacta del `visible_text` |
|---|---|---|---|
| B01 | 2560–2561 | 122425–122560 | PASS |
| B02 | 2563–2568 | 122562–122954 | PASS |
| B03 | 2570 | 122956–122992 | PASS |
| B03 | 2572–2573 | 122994–123107 | PASS |
| B04 | 2575–2577 | 123109–123332 | PASS |
| B04 | 2579–2582 | 123334–123565 | PASS |
| B05 | 2584–2589 | 123567–123968 | PASS |
| B05 | 2591–2592 | 123970–124056 | PASS |
| B06 | 2594–2595 | 124058–124172 | PASS |
| B06 | 2597–2598 | 124174–124258 | PASS |
| B06 | 2600–2606 | 124260–124715 | PASS |
| B07 | 2606–2608 | 124716–124866 | PASS |
| B08 | 2610–2612 | 124868–125063 | PASS |
| B08 | 2614–2619 | 125065–125492 | PASS |
| B08 | 2621 | 125494–125544 | PASS |
| B09 | 2623–2625 | 125546–125705 | PASS |

Verificación automática: cada fila se comprobó por script contra el TXT (coincidencia literal del rango, normalizando solo los saltos de línea internos). Script y resultados: verificación ejecutada el 2026-11-06 sobre `main` (`DQ.SRC.0005`, SHA-256 `afa1a638…fb6e239`).

## 9. Pendientes para elevar de estado

1. R01: revisión cervantista de esta ficha y firma de las 2 condensaciones (§4).
2. R02/R01: alta editorial de los pasajes propuestos `DQ.P1.C08.P0013–P0017` (texto verbatim + locadores ya verificados en `docs/data/inventario_literario_p1_c08.json`).
3. R09/R11: contrato de beats (`beat/utterance`) antes de convertir esta ficha en datos; esta ficha es la referencia editorial, no el contrato.
4. R06: storyboard de planos por beat sobre los 3 assets existentes; huecos (B05 carga, B08 diálogo post-caída) a la matriz escena→plano→asset.
5. R07: cue sheet de las 12 intervenciones (texto ya fijo).
