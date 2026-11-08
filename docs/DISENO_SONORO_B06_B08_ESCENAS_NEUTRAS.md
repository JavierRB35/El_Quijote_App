# R07 — Diseño sonoro de B06–B08, corte post-I11 y escena neutra (molinos I, 8)

**Fecha:** 2026-11-08 · **Para:** R14 Coordinación · **Modo:** CONTENIDOS · **Especialidad asumida:** R07 Dirección de Audio / diseño de voz, foley y mezcla (revisión documental propia, no visado independiente).

**Estado:** **DISEÑO SONORO PREPARADO / AUDIO OPCIONAL / RUNTIME SIN GO**.
**Repositorio:** [JavierRB35/El_Quijote_App](https://github.com/JavierRB35/El_Quijote_App).
**Fuente de verdad verificada al inicio:** `origin/main` @ `afc72644dc4283ff72f45baa5f85ca79e0498930` (coincide exactamente con la referencia aportada); este informe se propone en `feature/r07-sonido-b06-b08-neutras`, no sustituye la ficha ni el cue sheet original R07.
**Escena de partida:** `DQ.SC.P1.C08.01` · FICHA H3 v1.1 `GUIONIZADA_PROPUESTA`, I09–I15, B06–B08. **La división en dos escenas no se ejecuta aquí**: es una alternativa pendiente de R03/R01/R02, R09/R11, R06 y R14. No se crean nuevos `scene_id`, `beat_id` ni `DQ.INT.*`.

## 1. Inventario de fuentes efectivamente cotejadas

- `docs/FICHA_ESCENA_P1_C08_MOLINOS.md` · blob `028b96e83fb6ef07c83fff74857102e0d00d8c27`.
- `docs/DIRECCION_SONORA_PILOTO_MODO_HISTORIA.md` · blob `5c1ca33999ce971471f92fe36dcd01b60de20a41`.
- `docs/COMPONENTES_NARRATIVOS_UX.md` · blob `fd1ed775bdefcbefd3539ff20d4d13c535c48559`.
- `docs/EVALUACION_R09_D6_ELEGIBILIDAD_CADUCIDAD.md` · blob `14324d327a492ec92244d9ac9deae0cd0b0380aa`.
- `docs/ENTREGA_R11_H5_ADR0005.md` · blob `58c1dcb0ca0581d4c31c8312d6400c7f08faaa85`.
- `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` · blob `cab041e37c61139b2259144f5d0dc01961bafb92`.
- `docs/VISION_Y_DECISIONES.md` · blob `2a2d85a681e43c042f8b1d73f0ff1c31593f57e2`.
- `docs/ENCARGO_MAESTRO.md` · blob `e1514e54054cfa6997dba1618331acf640b673c9`.
- `docs/STORYBOARD_VISUAL_PILOTO.md` · blob `101b77f624ed006daf008106171007b3ec9fb580`.
- `docs/GOBERNANZA_GIT.md` · blob `e2490e83746f12831f85b5574ecbbfc6c607a351`.

**Prevalencia de este encargo:** el texto literal se extrae de la ficha H3; las reglas TS-001 y de lectura provienen de `COMPONENTES_NARRATIVOS_UX.md`; la evaluación **posterior y específica de R09 D-6** corrige el supuesto inicial de que `DQ.MA.900006` sería seguro en B06/B07. `ENTREGA_R11_H5_ADR0005.md` recoge propuestas previas no implementadas. El storyboard R06 es una propuesta visual, **no visado temporal definitivo**. El presente documento no modifica ni aprueba ningún activo.

## 2. Decisión de dirección de sonido para la segmentación posible

| Frontera | Propuesta sonora | Frontera de lectura y visual | Dependencia |
|---|---|---|---|
| **I09 → I10**, B06 | Viento algo más perceptible y giro sencillo de aspas, con ducking bajo la voz. | Mantener planos **pre-choque válidos** y texto completo por intervención. | No revelar golpe ni socorro. |
| **I10 → I11**, B06 | De reto a galope creciente **cuando el narrador lo enuncia**; efecto de aspa/rotura al punto semántico, nunca antes. | I11 visible completa antes de voz si hay voz; ninguna causa nace del FX. | Validación editorial de interpretación. |
| **Después de I11**, frontera B06|B07 | Extinguir galope y efecto de impacto. Transición de ambiente a viento mínimo; fundido de cola de 0,2–0,5 s **orientativo y no bloqueante**; no musicalizar como victoria. | **Cortar la escena únicamente tras avance confirmado fuera de B06**. Retirar imágenes pre-choque caducadas; **fondo neutro** para la nueva escena. I11 no desaparece antes de que I12 esté legible. | Segmentación propuesta A+D de R09, no implementada. |
| **Entrada I12**, B07 | Ambiente sobrio; cascos de asno opcionales, no nuevos parlamentos. | Fondo neutro y texto I12 íntegro. `900006` **prohibido durante I12**. | Umbral R09 D-6. |
| **Después de I12**, antes de B08 | **Opción**, no obligación: silencio narrativo de aprox. 1,5–3 s sin voz, con reducción de ambiente; mantener visible I12 con etiqueta de silencio editorial diferenciada. | Si se formaliza un beat `SILENCIO`, lo crean/aprueban R03/R01/R02 y lo valida R09/R11. El silencio no hace avanzar ni autoriza por sí mismo imagen alguna. | R08/R11 recomiendan texto persistente; no hay nuevo beat ahora. |
| **Entrada B08**, I13 → I15 | Retomar voz a escala íntima, viento bajo, sin risas, magia ni música cómica. | `900006` **solo sería elegible tras I12 íntegra y avance confirmado**, y aun así exige visado de luz/continuidad de R06. Si no se visa, **continuar con fondo neutro** y texto. | R06/R14; futuro runtime R09/R10/R12. |

**Distinción esencial:** **silencio sonoro ≠ imagen neutra**. El silencio no «convierte» una imagen en elegible; el fondo neutro no requiere una pista de audio. La ausencia de audio no equivale a ausencia de texto, ni la presencia de sonido valida un plano.

### Restricciones sonoras antispoiler

1. En **I09** no recrear un vendaval: el narrador dice «un poco de viento». El aspa no parece un monstruo; no hay rugidos, voces inventadas ni música de «gigante».
2. En **I10**, Briareo se pronuncia como referencia de Don Quijote; ningún FX sugiere que sea un personaje real que entra en escena.
3. En **I11**, el orden es narración de acometida → embestida → lanza rota → caída. La propuesta de silencio cercano a un segundo afecta **ambiente/FX** y una pausa dramática lícita de la voz, **sin eliminar ni ocultar palabras**. El chasquido sigue a la mención de «pedazos»; la lanza es madera, no un golpe de acero.
4. Después de I11, no persistir imágenes donde el caballero aparece montado con lanza íntegra. Tampoco mostrar el activo post `DQ.MA.900006` durante I12: **incluye la aproximación de Sancho y anticipa el auxilio**. La fuente R09 fija su umbral **después de I12 y de avance confirmado**, con objeción de luz pendiente.
5. El motor visual nunca debe usar el último sonido, la cola de reverberación, el silencio, la carga de una imagen o el final de locución como **único** disparador del avance. La posición narrativa y el texto gobernarán las transiciones.
6. Al volver atrás desde B08 a B07 o B06, el recurso `900006` pierde elegibilidad; el ambiente puede recomponerse al lugar apropiado **sin restituir imágenes spoiler**.

## 3. Cue sheet por intervención — texto original preservado

**Cobertura:** 7/7 intervenciones originales de B06–B08 (**NARRADOR 3, DON_QUIJOTE 2, SANCHO 2**); todas son `CITA_LITERAL` y se conservan en el orden I09–I15. En I13–I15, los incisos narrativos son **visibles** pero **no se atribuyen a la voz del personaje**. El CSV adjunto recoge estas mismas siete intervenciones en 17 campos, sin reemplazar el CSV general de I01–I16.

### B06 · I09 · NARRADOR

**Pasaje y localizador de la ficha:** `DQ.P1.C08.P0004` (el pasaje cubre narración + cita completa, 124058–124258); PG 2000, líneas 2594–2595 · offset 124058–124172.

> **Texto visible íntegro (ficha §3):** «Levantóse en esto un poco de viento y las grandes aspas comenzaron a moverse, lo cual visto por don Quijote, dijo:»

**Texto oral de referencia:** «Levantóse en esto un poco de viento y las grandes aspas comenzaron a moverse, lo cual visto por don Quijote, dijo:»

**Voz opcional / interpretación:** Narrador: registrar con naturalidad el pequeño aumento del viento; sin presagios de tormenta ni burla.

**Duración orientativa de locución:** 7–11 s (estimación de planificación, pendiente de prueba de voz y lectura; no temporizador de paso).

**Ambiente / efecto:** Viento leve de campo y giro suave de aspas; madera a distancia, sin ráfaga espectacular.

**Silencio / respiración:** Sin silencio escénico fijo; permitir pausa respiratoria tras «moverse».

**Sincronización propuesta:** Comenzar el viento solo al enunciado del cambio meteorológico y hacer perceptibles las aspas cuando el texto las nombra. No disparar planos ni progreso por el viento.

**Sin sonido:** La frase escrita establece viento y movimiento de aspas; no se necesita oír su giro.

**Restricción visual:** Solo recursos previos todavía vigentes y visados; nunca 900006.

### B06 · I10 · DON_QUIJOTE

**Pasaje y localizador de la ficha:** `DQ.P1.C08.P0004`; PG 2000, líneas 2597–2598 · offset 124174–124258.

> **Texto visible íntegro (ficha §3):** «— Pues, aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar.»

**Texto oral de referencia:** «Pues, aunque mováis más brazos que los del gigante Briareo, me lo habéis de pagar.»

**Voz opcional / interpretación:** Don Quijote: reto solemne y seguro, dicción limpia de «Briareo»; no convertir el nombre en efecto fantástico.

**Duración orientativa de locución:** 5–9 s (estimación de planificación, pendiente de prueba de voz y lectura; no temporizador de paso).

**Ambiente / efecto:** Mantener viento y giro en segundo plano, con atenuación bajo la voz. Ninguna voz de gigante ni rugido.

**Silencio / respiración:** Micro-respiración opcional de 0,2–0,4 s antes de I11, no bloqueo.

**Sincronización propuesta:** El reto se presenta completo antes de la voz, si existe; los efectos no confirman la existencia de gigante.

**Sin sonido:** Texto íntegro y hablante identifican la referencia a Briareo y el reto.

**Restricción visual:** Mantener imagen pre-choque autorizada, sin revelar lanza rota ni auxilio.

### B06 · I11 · NARRADOR

**Pasaje y localizador de la ficha:** `DQ.P1.C08.P0005` (ancla parcial de evidencia); PG 2000, líneas 2600–2606 · offset 124260–124715.

> **Texto visible íntegro (ficha §3):** «Y, en diciendo esto, y encomendándose de todo corazón a su señora Dulcinea, pidiéndole que en tal trance le socorriese, bien cubierto de su rodela, con la lanza en el ristre, arremetió a todo el galope de Rocinante y embistió con el primero molino que estaba delante; y, dándole una lanzada en el aspa, la volvió el viento con tanta furia que hizo la lanza pedazos, llevándose tras sí al caballo y al caballero, que fue rodando muy maltrecho por el campo.»

**Texto oral de referencia:** «Y, en diciendo esto, y encomendándose de todo corazón a su señora Dulcinea, pidiéndole que en tal trance le socorriese, bien cubierto de su rodela, con la lanza en el ristre, arremetió a todo el galope de Rocinante y embistió con el primero molino que estaba delante; y, dándole una lanzada en el aspa, la volvió el viento con tanta furia que hizo la lanza pedazos, llevándose tras sí al caballo y al caballero, que fue rodando muy maltrecho por el campo.»

**Voz opcional / interpretación:** Narrador: progresión de invocación íntima a acometida y desenlace físico; claridad de la relación viento→aspa→lanza→arrastre→caída, evitando recrearse en daño.

**Duración orientativa de locución:** 34–47 s (estimación de planificación, pendiente de prueba de voz y lectura; no temporizador de paso).

**Ambiente / efecto:** Galope de Rocinante tras «arremetió a todo el galope»; roce de aspa tras «embistió»; chasquido de madera quebrada tras «hizo la lanza pedazos»; arrastre/caída contenido. Metal solo en rodela o herrajes si se justifica, nunca la lanza como metal.

**Silencio / respiración:** Proponer 0,7–1,0 s de suspensión de ambiente/FX tras «la volvió el viento con tanta furia» y antes de proseguir «que hizo la lanza pedazos»; no silenciar ni omitir esa frase. Disparar el chasquido DESPUÉS de «pedazos». Reducir o suprimir si perjudica lectura.

**Sincronización propuesta:** I11 sigue visible íntegra durante la pausa y el desenlace. Corte B06→B07 exclusivamente tras presentación completa de B06 y avance confirmado, no por fin de voz, FX, silencio ni carga de imagen. Al salir, invalidar toda imagen de Quijote montado con lanza intacta.

**Sin sonido:** La misma I11 escrita describe la invocación, galope, choque, rotura y caída; todos los FX son redundantes.

**Restricción visual:** No mostrar 900006 durante I11 ni al terminar la voz. En frontera post-I11, cortar a escena neutra; conservar I11 hasta que I12 sea legible.

### B07 · I12 · NARRADOR

**Pasaje y localizador de la ficha:** `DQ.P1.C08.P0006` (ancla parcial de evidencia); PG 2000, líneas 2606–2608 · offset 124716–124866.

> **Texto visible íntegro (ficha §3):** «Acudió Sancho Panza a socorrerle, a todo el correr de su asno, y cuando llegó halló que no se podía menear: tal fue el golpe que dio con él Rocinante.»

**Texto oral de referencia:** «Acudió Sancho Panza a socorrerle, a todo el correr de su asno, y cuando llegó halló que no se podía menear: tal fue el golpe que dio con él Rocinante.»

**Voz opcional / interpretación:** Narrador: preocupación objetiva y socorro, sin sarcasmo ni una nueva frase atribuida a Sancho.

**Duración orientativa de locución:** 12–18 s (estimación de planificación, pendiente de prueba de voz y lectura; no temporizador de paso).

**Ambiente / efecto:** Viento reducido y pasos rápidos del asno solo después de nombrar «su asno»; roce de ropa o movimiento muy discreto, sin gemidos hablados ni música dramática.

**Silencio / respiración:** Breve decaimiento natural de ambiente al terminar; silencio narrativo adicional solo como opción editorial después de I12, nunca implícito en el archivo de voz.

**Sincronización propuesta:** Entrar en B07 con fondo neutro y texto I12 íntegro desde el inicio, sin heredar fotograma pre-choque ni presentar 900006. La salida B07→B08 exige lectura y avance confirmado; no sincronizar con final de locución.

**Sin sonido:** I12 nombra el auxilio, el asno y la inmovilidad causada por el golpe; el fondo neutro no añade información necesaria.

**Restricción visual:** Fondo neutro obligatorio en propuesta post-I11→fin I12; 900006 excluido hasta I12 completa más avance.

### B08 · I13 · SANCHO

**Pasaje y localizador de la ficha:** PROPUESTO `DQ.P1.C08.P0016`; PG 2000, líneas 2610–2612 · offset 124868–125063.

> **Texto visible íntegro (ficha §3):** «— ¡Válame Dios! —dijo Sancho—. ¿No le dije yo a vuestra merced que mirase bien lo que hacía, que no eran sino molinos de viento, y no lo podía ignorar sino quien llevase otros tales en la cabeza?»

**Texto oral de referencia:** «¡Válame Dios! ¿No le dije yo a vuestra merced que mirase bien lo que hacía, que no eran sino molinos de viento, y no lo podía ignorar sino quien llevase otros tales en la cabeza?»

**Inciso narrativo exclusivo del texto visible:** «—dijo Sancho—.» (no pronunciado por SANCHO).

**Voz opcional / interpretación:** Sancho: reproche alarmado, mezclado con alivio y afecto; sin triunfo histriónico; solo su texto oral, nunca «—dijo Sancho—».

**Duración orientativa de locución:** 15–22 s (estimación de planificación, pendiente de prueba de voz y lectura; no temporizador de paso).

**Ambiente / efecto:** Viento de reposo tenue; sin risas de audiencia ni percusión cómica.

**Silencio / respiración:** Pequeña respiración entre exclamación y pregunta; pausa de réplica aprox. 0,3–0,7 s, subordinada a lectura.

**Sincronización propuesta:** B08 empieza solo después de avance confirmado desde B07 (o SILENCIO autorizado). Si se usa 900006, requiere visado de umbral post-I12 y de luz/continuidad; si no, persistir fondo neutro.

**Sin sonido:** El reproche y el error previo están en texto; inciso completo sigue visible aunque Sancho no lo pronuncie.

**Restricción visual:** 900006 solo candidata en B08, nunca condición de entrada, lectura o voz.

### B08 · I14 · DON_QUIJOTE

**Pasaje y localizador de la ficha:** PROPUESTO `DQ.P1.C08.P0016`; PG 2000, líneas 2614–2619 · offset 125065–125492.

> **Texto visible íntegro (ficha §3):** «— Calla, amigo Sancho —respondió don Quijote—, que las cosas de la guerra, más que otras, están sujetas a continua mudanza; cuanto más, que yo pienso, y es así verdad, que aquel sabio Frestón que me robó el aposento y los libros ha vuelto estos gigantes en molinos por quitarme la gloria de su vencimiento: tal es la enemistad que me tiene; mas, al cabo al cabo, han de poder poco sus malas artes contra la bondad de mi espada.»

**Texto oral de referencia:** «Calla, amigo Sancho, que las cosas de la guerra, más que otras, están sujetas a continua mudanza; cuanto más, que yo pienso, y es así verdad, que aquel sabio Frestón que me robó el aposento y los libros ha vuelto estos gigantes en molinos por quitarme la gloria de su vencimiento: tal es la enemistad que me tiene; mas, al cabo al cabo, han de poder poco sus malas artes contra la bondad de mi espada.»

**Inciso narrativo exclusivo del texto visible:** «—respondió don Quijote—» (no pronunciado por DON_QUIJOTE).

**Voz opcional / interpretación:** Don Quijote: explicación coherente para él de la mutación por Frestón; tono sereno y convencido, no sátira autocomplaciente. Omitir oralmente «—respondió don Quijote—».

**Duración orientativa de locución:** 35–48 s (estimación de planificación, pendiente de prueba de voz y lectura; no temporizador de paso).

**Ambiente / efecto:** Viento casi quieto; pequeño roce de equipo opcional, nunca magia audible que confirme Frestón.

**Silencio / respiración:** Pausas sintácticas en «continua mudanza» y antes de «mas»; sin silencio impuesto para cargar imagen.

**Sincronización propuesta:** Mostrar texto íntegro, incluido inciso, antes y durante la voz; ninguna entrada de música o imagen certifica la explicación sobrenatural.

**Sin sonido:** La explicación de Frestón se entiende íntegramente por escrito y se distingue la voz del inciso narrativo.

**Restricción visual:** Fondo neutro aceptable si falla o no se visa el plano post; ninguna imagen se autoriza por el efecto.

### B08 · I15 · SANCHO

**Pasaje y localizador de la ficha:** PROPUESTO `DQ.P1.C08.P0016`; PG 2000, línea 2621 · offset 125494–125544.

> **Texto visible íntegro (ficha §3):** «— Dios lo haga como puede —respondió Sancho Panza.»

**Texto oral de referencia:** «Dios lo haga como puede»

**Inciso narrativo exclusivo del texto visible:** «—respondió Sancho Panza.» (no pronunciado por SANCHO).

**Voz opcional / interpretación:** Sancho: aceptación agotada y tierna, de volumen bajo inteligible; sin cola de voz de narrador para el inciso.

**Duración orientativa de locución:** 3–6 s (estimación de planificación, pendiente de prueba de voz y lectura; no temporizador de paso).

**Ambiente / efecto:** Ambiente muy tenue; sin remate cómico ni fanfarria.

**Silencio / respiración:** Reposo orientativo de 0,8–1,5 s antes de una transición posterior, siempre posterior a lectura y no usado como gatillo exclusivo.

**Sincronización propuesta:** Conservar «—respondió Sancho Panza.» en texto visible; voz dice solo «Dios lo haga como puede». No tratar la cola del audio como orden de avance.

**Sin sonido:** La réplica y el inciso aparecen completos y legibles, sin depender del cierre sonoro.

**Restricción visual:** No exigir 900006; respetar estado visual validado de B08 y continuidad al siguiente beat.


## 4. TS-001: lectura, sincronización y ausencia de sonido (**contrato documental, no función implementada**)

- **Primero datos de texto/hablante:** la intervención entra completa y legible antes de iniciar cualquier voz, fondo o FX. No se trunca el extenso I11 ni el I14; si el tamaño ampliado lo requiere, usar panel de texto separado/refluido con continuidad recuperable, no sobreponerlo a elementos decisivos.
- **Mismo registro para voz y pantalla:** `texto_visible` de la ficha prevalece, no una transcripción automática del archivo. `texto_oral` es igual para el narrador y sin rayas/incisos para personajes. Los rótulos de hablante y notas de ambiente no son citas de Cervantes.
- **Suelo temporal documentado en `COMPONENTES_NARRATIVOS_UX.md` §2.3:** `lectura_mínima = max(1500 ms, 800 ms + 35 ms × número de palabras de texto_visible)`; `lectura_minima_ms` específico solo **eleva** ese mínimo. Con voz, autoavance no antes de `max(duración real de voz, lectura_mínima)` y avance de contenido confirmado. **No trasladar** los rangos orientativos de este cue sheet a temporizadores fijos. La cadencia final se calibrará con el piloto; contemplar necesidades de lectura más lentas.
- **Sin voz / mute / fallo del archivo:** conservar igual orden, texto íntegro y escenas neutras; no retrasar avance por estados de voz. En modo manual no caduca la lectura; con autoavance sigue aplicándose el suelo de texto. Nunca depender del evento `ended` como gatillo exclusivo. El audio no es una señal editorial de permiso de imagen.
- **Pausa** congela voz y temporizador; **Repetir** y **Retroceder** recuperan íntegro el texto; **Continuar / avanzar manual** mantiene vía disponible sin voz. Las excepciones de ritmo por flags no constituyen un bloqueo permanente (R08/R11, contrato propuesto).
- **Silencio tras I12:** si R03/R01/R02 lo aprueban como `SILENCIO`, es **no hablado**, no una octava intervención; conservar I12 visible, no limpiar panel. En propuesta R11, mínimo del silencio `max(1500 ms, lectura_minima_ms si existe)`, revisable con UX. La duración de 1,5–3 s es **artística**, no sustituto del suelo ni un evento de navegación. No incluir audio ficticio.
- **Accesibilidad:** subtítulos de FX como metadatos no cervantinos separados del texto literal (p. ej., «[Viento y aspas]», «[Se rompe la lanza]», «[Pasos del asno]»), configurables sin apagar el texto TS-001; foco teclado, lector de pantalla, alto contraste, ampliación y reducción de movimiento. En fondo neutro, mantener panel sólido legible y texto principal inequívoco.
- **Recuperación / restauración:** recalcular la posición y la elegibilidad visual desde escena/beat, no desde audio escuchado; al volver de B08 a B07, `900006` no queda habilitado por historial de sonido.

## 5. Comprobaciones documentales y aceptación posterior

| Comprobación | Resultado actual / puerta futura |
|---|---|
| `main` y fuente | Verificado `afc72644dc4283ff72f45baa5f85ca79e0498930`; todos los textos extraídos de `FICHA_ESCENA_P1_C08_MOLINOS.md` v1.1. |
| Intervenciones y voces | I09–I15: **7/7**, 3 Narrador + 2 Quijote + 2 Sancho, sin voces fantasma. |
| Texto visible | **7/7** copiado íntegro; en I13–I15 se conservan los incisos del narrador y se excluyen de la voz de Sancho/Quijote. |
| Frontera después de I11 | **Definida solo documentalmente**: B06 completa + avance confirmado → escena neutra B07. No es disparador del último audio. |
| Umbral del plano post | **Condicionado**: `DQ.MA.900006` no entra hasta B08, después de I12 y del avance; pendiente R06 continuidad/luz. |
| Silencio después de I12 | **Opcional**, por aprobación editorial; no editado en ficha, catálogo ni esquema. |
| TS-001 sin audio | Diseñado para todos los casos; **no se afirma prueba funcional**, sincronía de clips, duración medida ni cumplimiento empírico. |
| Audio / código / esquemas / guion | **No producidos ni modificados** en este encargo. Solo informe y CSV documentales. |

**Pendientes y responsables:** R03/R01/R02 deciden segmentación final y existencia/posición del beat SILENCIO sin reescribir intervenciones; R06 valida vigencia y luz de imágenes (en especial `900006`); R09/R11 revisan contrato y semántica de escenas y temporización; R08/R10 implementarán/validarán interfaz cuando exista autorización; R12 medirá lectura, modo mute, retroceso, carga fallida, contrastes y antispoiler; R13 verifica derechos de cualquier futuro sonido. R14 resuelve la aprobación y coordinación. **Este documento no autoriza runtime ni integra recursos.**

**Dictamen propuesto R07:** **DISEÑO SONORO PREPARADO / AUDIO OPCIONAL / RUNTIME SIN GO**.
