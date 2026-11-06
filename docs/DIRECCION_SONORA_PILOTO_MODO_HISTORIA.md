# R07 — DIRECCIÓN SONORA DEL PILOTO DEL MODO HISTORIA
## Los molinos de viento — Parte I, capítulo VIII

**Versión:** 0.1 (propuesta para revisión). **Fecha:** 2026-11-06. **Prioridad del encargo:** P1.  
**Responsabilidad asumida:** R07, dirección de audio, interpretación y edición de voz (modo Contenidos). La aprobación filológica, técnica, de accesibilidad y de derechos sigue correspondiendo a R01/R02, R09/R11, R08/R12 y R13, respectivamente. **No representa grabación, mezcla, prueba de usuario ni revisión humana independiente.**

**Alcance:** documentación de los beats B01–B09 de DQ.SC.P1.C08.01 (episodio DQ.P1.C08.E01), con **16 intervenciones: narrador 6, Don Quijote 6, Sancho 4**. Su listado verificable y los textos completos, sin parafraseos nuevos, están en [cue_sheet_molinos_i8.csv](data/cue_sheet_molinos_i8.csv).

## 1. Fuentes, decisiones y estado editorial

1. **Guion fuente:** [FICHA_ESCENA_P1_C08_MOLINOS.md](FICHA_ESCENA_P1_C08_MOLINOS.md), v1.1 (2026-11-06), §§1–9, especialmente intervenciones I01–I16 y localizadores PG #2000. No alterar su texto visible ni sus condensaciones aprobadas condicionalmente por R01.
2. **Marco vinculante:** [BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md](BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md), R07 y TS-001; [VISION_Y_DECISIONES.md](VISION_Y_DECISIONES.md), DC-19, DC-21 y DC-22; [HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md](HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md).
3. **Contrato vigente de referencia:** [schemas/content/beat.schema.json](../schemas/content/beat.schema.json), v1.1.0, y [COMPONENTES_NARRATIVOS_UX.md](COMPONENTES_NARRATIVOS_UX.md), estados y fallbacks; el ADR-0005 todavía requiere contrafirma editorial. Este R07 **no** modifica esquema, manifest, app ni reproductor.
4. **Edición:** citas literales de la ficha contrastadas por su autor contra PG #2000, identificadores DQ.ED.0003 / DQ.SRC.0005. La fuente está en content/textos/gutenberg_2000/El_Quijote.txt. No proclamar cotejo independiente nuevo: la ficha informa 16/16 PASS. DQ.ED.0001 (Tusell) y DQ.ED.0002 (Rico/IC) desempeñan papeles distintos.
5. **Bloqueos editoriales existentes:** pasajes DQ.P1.C08.P0013–P0017 están **localizados y propuestos**, pero faltan como entidades físicas del catálogo del piloto. La ficha sigue GUIONIZADA_PROPUESTA; no pasar a APTA_PARA_INTEGRAR ni asignar audio_asset_id real antes de R01/R02, R09/R11 y R13. No corregir por cuenta propia variantes («Frestón», «Non fuyades»).

### Atribución: regla operativa irrenunciable

- **texto_visible**: cita **íntegra** en pantalla, con raya, puntuación e incisos del narrador incorporados. Se mantiene en todo estado con sonido, mute, voz ausente o error. Es el texto de referencia de cada fila CSV.
- **texto_oral**: única secuencia que recibe el intérprete identificado en esa fila; para un personaje quita solo la raya inicial y los fragmentos de **incisos_narrador**, sin alterar las palabras del personaje. Para NARRADOR es idéntico al visible.
- **incisos_narrador**: están dentro del visible, pero no se atribuyen ni se graban con voz de Don Quijote o Sancho. **En este piloto se presentan escritos, sin segunda voz superpuesta**; locutarlos requeriría despiece y aprobación editorial adicionales, no inventar intervenciones invisibles.
- Los rótulos «Narrador», «Don Quijote», «Sancho» son etiquetas editoriales y no parte de la cita.
- La referencia a «las voces que su escudero Sancho le daba» dentro de I07 (B05) **la dice el narrador**; no autoriza un grito verbal adicional de Sancho. I12 (B07) es narración del socorro, no diálogo. I16 (B09) es narración, no voz compartida.

**Orden canónico de intervenciones:** B01 I01; B02 I02; B03 I03→I04; B04 I05→I06; B05 I07→I08; B06 I09→I10→I11; B07 I12; B08 I13→I14→I15; B09 I16.

## 2. Biblia de voces y dirección interpretativa

| Voz | Timbre y registro | Intención / conflicto | Ritmo, dicción, silencios |
|---|---|---|---|
| **Narrador** (I01/I07/I09/I11/I12/I16) | Cálido, sobrio, observador; ironía sin burla explícita; castellano comprensible, no imitación artificial de español del XVII | Certifica la realidad («molinos»), conduce la acción con precisión causal, deja que el contraste produzca el humor y recupera humanidad tras la caída | Medio y articulado; pausas sintácticas, separar subordinadas largas sin cortar el sentido; evitar aceleración ininteligible en I11. La gravedad no debe sonar trágica ni el golpe como remate cómico de sitcom |
| **Don Quijote** (I02/I04/I06/I08/I10/I14) | Presencia elevada pero humana; proyección en la arenga, no grito continuo ni voz ridículamente engolada | Euforia de la empresa → docencia segura → ímpetu de batalla → defensa de su interpretación («Frestón») | Periodos retóricos amplios, respiraciones en punto y coma; acelerar solo I08; I14 baja de intensidad física sin ceder convicción mental. Pronunciación literal de «Non fuyades», «Briareo», «Frestón» |
| **Sancho** (I03/I05/I13/I15) | Voz cercana, concreta, afectiva; sin caricatura campesina ni acento regional inventado | Perplejidad real → observación técnica → protesta angustiada → aceptación fatigada y cómplice | Frases breves, naturalidad, contraste de registro respecto a DQ; I05 explica sin balbucear, I13 reprende porque teme por él; I15 evita chiste de guiñol, deja resignación y cariño |

**Dirección de grabación futura (no ejecutada):** conservar formas y nombres de la edición de referencia, sin «normalizar» vocabulario arcaico dentro de citas. Marcar respiraciones en hoja de sesión sin convertirlas en texto literario. Un director editorial cotejará cada toma con texto_oral y mantendrá separados incisos y rótulos. El diseño admite voces humanas o síntesis supervisada, sin contratar ni seleccionar proveedor en R07.

### Notas específicas de dicción

- **I02:** sostener con convicción la paradójica mezcla de riquezas y servicio divino; no subrayar «gigantes» como gag.
- **I03–I04:** una pausa de extrañeza después de «¿Qué gigantes?»; DQ contesta como si su visión fuese obvia, enfatizando «de casi dos leguas» sin ironía propia.
- **I05–I06:** Sancho explica aspas y piedra con aplomo; DQ responde con seguridad didáctica y distancia, no crueldad.
- **I07–I08:** la sordera selectiva está en **voz del narrador**. I08 es desafío dirigido a molinos que DQ cree gigantes; frase alta y breve, sin gemidos sobre el final.
- **I09–I11:** «un poco de viento» se pronuncia sin catastrofismo. La invocación a Dulcinea y el galope crecen, pero I11 debe mantener inteligible la física: aspa, lanza, caída.
- **I12:** tono contenido y preocupado: Sancho se mueve a socorrer; evitar comentario burlón.
- **I13–I15:** en I13 el reproche de Sancho tiene miedo detrás; I14 racionaliza «Frestón» con certidumbre no burlona; I15 se dice bajo, con pequeña espera antes de pasar de beat.
- **I16:** alivio cansado y continuidad de viaje, no triunfo musical.

## 3. Mapa sonoro por beat (propuesta, no activos aprobados)

**Prioridades del diseño:** **P0 textual** = interlocutor, texto y secuencia correctos incluso sin sonido; **P1 sonora** = guía de voz y sincronización; **P2 de acompañamiento** = ambientes y foley prescindibles. Un efecto de P1 dramática nunca se convierte en dependencia de avance. No fijar duraciones de frases antes del piloto con voces.

| Beat / voces | Función narrativa | Ambiente y efecto propuestos | Respiración / silencio y espacio de mezcla | Alternativa silenciosa |
|---|---|---|---|---|
| **B01 · I01 Narrador** | Situar el equívoco: molinos reales | Viento manchego tenue y constante; aspas aún lejanas. Sin coro ni épica. | Dar paso limpio a «treinta o cuarenta molinos»; respiración breve al final | Paisaje y texto íntegro, sin depender de molino audible |
| **B02 · I02 Don Quijote** | Descubrimiento imaginario y voluntad de combate | Mantener viento bajo; leve roce de monturas, opcional. Nada que confirme «gigantes» | Frase larga con respiración después de «desear» y de «vidas»; ambiente reducido bajo voz | El delirio y su justificación están escritos |
| **B03 · I03 Sancho / I04 Don Quijote** | Pregunta incrédula y exageración | Viento neutro, ningún efecto de «gigante» | Micro-pausa natural después de «¿Qué gigantes?»; no añadir risas ni redoble | Texto completo de ambas intervenciones e incisos |
| **B04 · I05 Sancho / I06 Don Quijote** | Advertencia física frente a certeza caballeresca | Viento perceptible y giro de aspas muy sutil, sin tapar «aspas»/«piedra» | Sancho articula la explicación; antes de la réplica de DQ, pausa corta no cronometrada | Las aspas y su función quedan explicitadas en I05 |
| **B05 · I07 Narrador / I08 Don Quijote** | Espuelas, arranque y arenga | Galope creciente, herrajes y roce de cuero plausibles; no producir nueva voz verbal de Sancho | Bajar galope bajo I07 y especialmente I08; energía de la frase final | I07 conserva íntegro «ni oía las voces…»; I08 visible y legible |
| **B06 · I09 Narrador / I10 DQ / I11 Narrador** | Aspas que se mueven; Briareo; lanza quebrada y caída | Soplo de viento moderado al activarse aspas, giro y crujido de madera; aceleración de Rocinante; **chasquido de madera** de lanza rota; golpe amortiguado/arrastre. El tañido metálico de la ficha, si se usa, debe atribuirse al equipo/armadura y nunca representar una lanza totalmente metálica | **Ventana de 1 s aproximado sin FX/ambiente antes del impacto**, propuesta en I11 en pausa sintáctica previa a «hizo la lanza pedazos»; evitar cortar palabras de I11. Después, golpe breve, sin fanfarria ni efecto de videojuego. Ajustar con prueba de lectura | I11 describe íntegramente causa, rotura y caída; el efecto no comunica un hecho nuevo. Imagen post solo **después** del desenlace |
| **B07 · I12 Narrador** | Socorro real, cambio de registro | Reducir viento; pasos o carrera del rucio, movimiento de ropa; respiración física **sin palabras**, muy discreta si expresa agotamiento | Evitar música triste, gemidos verbales o exposición adicional; breve espacio de recuperación | I12 nombra el socorro y la gravedad del golpe; no exige oír jadeo |
| **B08 · I13 Sancho / I14 Don Quijote / I15 Sancho** | Reproche, explicación por Frestón y pacto afectivo | Viento leve, roce de armadura si procede; prescindir de gestos cómicos añadidos | Dejar un pequeño silencio tras I13; I14 largo y sereno; después de «Dios lo haga como puede» sostener un breve reposo, sin remate musical | La paradoja y su respuesta están completas por escrito |
| **B09 · I16 Narrador** | Retomar el camino al Puerto Lápice | Viento decreciente y pasos de monturas tranquilos; fundido corto, no triunfo | Cadencia de salida y punto de respiración tras «Rocinante»; respetar la coma final de la cita (continúa la obra) | Texto de transición accesible y enlace al lector; sonido prescindible |

**Jerarquía de mezcla (diseño):** voz en primer plano; ambiente por debajo de la inteligibilidad; FX breves solo donde el guion los respalda. Ducking reversible en las voces, sin automatizaciones vinculantes definidas aquí. Sin música en este piloto por defecto; cualquier música original/licenciada requerirá decisión narrativa y expediente R13. Nada debe revelar la caída antes de B06. No fijar LUFS, dBFS, tiempos de crossfade ni relaciones de compresión sin escuchar muestras y probar el hardware.

### Silencios con intención

1. **B03:** pausa natural después de la pregunta de Sancho: deja vivir la distancia entre mundo real y mundo imaginado. Silenciar únicamente adornos, no mutilar texto.
2. **B05→B06:** tensión sin subida artificial de banda sonora; la entrada del «poco de viento» debe percibirse como hecho cotidiano, no apocalipsis.
3. **B06:** principal silencio de diseño: **~1 s antes del chasquido**. Suspender ambiente/FX; voz hace pausa dramática lícita en I11, sin eliminar ni posponer el texto escrito. Si la prueba encuentra pérdida de claridad, reducir o suprimir esta pausa.
4. **B07:** no añadir una voz de Sancho, lloros o voz de DQ no presentes; el contenido basta. Se puede dejar solo un viento casi imperceptible.
5. **B08 tras I15:** pausa de resignación más expresiva que música cómica; el jugador puede leer la última intervención sin caducidad.

## 4. Cue sheet — estructura, sincronía y criterios de conformidad

**Archivo:** [docs/data/cue_sheet_molinos_i8.csv](data/cue_sheet_molinos_i8.csv), UTF-8, cabecera, **una fila por I01–I16** y ninguna intervención fantasma. Campos: beat, intervención, hablante, origen textual, pasaje y estado, texto de referencia visible completo, texto oral completo, incisos, intención, emoción, ritmo, ambiente/efecto, prioridad, subtítulo sonoro, sincronización y localizador.

- La tabla CSV es **documento de dirección de grabación**, no archivo de audio, recurso runtime ni JSON canonizado. El productor futuro deberá resolver IDs DQ.INT.* estables con R09/R11 antes de incorporar registros al paquete.
- No se asignan nombres de archivo de voz definitivos ni audio_asset_id. Referencia lógica **pendiente:** voz/scene_id/beat_id/utterance_id, sujeta al contrato de activos y licencias; no simular que el medio existe.
- Para cada intervención: (1) cargar speaker y texto_visible del **mismo registro editorial**, (2) presentar íntegro el texto con hablante **antes de iniciar voz**, (3) reproducir si existe voz aprobada, (4) hacer coincidir inicio/fin de la intervención, opcionalmente segmentar frases manteniendo a la vista el texto completo, (5) mantener la lectura hasta su tiempo mínimo, (6) permitir pausa, repetición, retroceso y avance permitido por la política acordada.
- Sin karaoke obligatorio. Las respiraciones, silencios y sonidos no alteran el texto fuente. Un inciso de narrador visible **no genera automáticamente un clip narrativo ni se pronuncia por personaje**. Solo los I01/I07/I09/I11/I12/I16 son voces explícitas de NARRADOR en la ficha.
- Referencias compartidas: scene_id **DQ.SC.P1.C08.01**; episodios/unidades en la ficha; texto de origen PG #2000; IDs de pasaje P0013–P0017 **pendientes de alta física**, no utilizables como enlaces productivos hasta validación.
- **Momento de impacto:** no disparar chasquido o imagen post antes del segmento de I11 que explica la rotura. La propuesta «1 s» es ventana escénica, **no** delay fijo que bloquee avance o marque tiempo de lectura.
- **Autoavance:** adherirse a COMPONENTES_NARRATIVOS_UX §2.3: mínimo editorial indicativo max(1500 ms, 800 ms + 35 ms/palabra del texto_visible), ajustable mediante piloto y preferencias; el tiempo efectivo no será inferior a la duración de la voz ni a la lectura mínima. Terminar la voz **nunca** es razón suficiente para ocultar texto. Pausa congela voz y temporizador. En modo manual el texto no caduca.
- El campo **prioridad** del CSV es de **producción sonora**: P1 para dirección de intervención y su sincronización, **no indica que la voz sea obligatoria para jugar**. El ambiente/FX es generalmente P2 y está detallado en el mapa de beats; efectos estructurales no cambian el P0 textual.

## 5. Estados de ausencia de audio, accesibilidad y experiencia silenciosa

| Escenario | Resultado exigido, independientemente de la tecnología |
|---|---|
| Voz disponible y activa | Texto íntegro + speaker visible antes y durante voz; sincronía por intervención; rótulos no dependen del timbre |
| Preferencia mute o volumen 0 | Mismos 9 beats y 16 textos; control de avance sin esperas de voz ni huecos de lectura |
| Archivo inexistente/corrupto, códec incompatible o reproducción fallida | Pasar al estado de voz no disponible, aviso discreto no intrusivo; no omitir, duplicar, recortar ni reordenar la intervención; avance disponible |
| Pausa, repetición, retroceso | Texto recuperable completo, sin desaparición durante pausa; el usuario nunca depende del clip de voz para reabrir una intervención |
| Lectura lenta, ampliación de fuente y alto contraste | Reflujo/paginación accesible **sin truncamiento** y con speaker persistente; el ritmo automático respeta preferencias; sin controles montados sobre texto |
| Movimiento reducido o imagen no disponible | Mismo texto y orden, sin animación requerida; fondo alternativo neutro y descripciones de acción esenciales |
| Sordera o ambiente/sfx mute | Captions descriptivos **sin inventar diálogo** para los sonidos narrativamente pertinentes, p. ej. «[Viento; aspas en movimiento]», «[Galope]», «[Se rompe la lanza; caída]». No duplicar innecesariamente hechos ya literales; ningún FX debe ser pista exclusiva |
| Teclado y lector de pantalla | Speaker y texto anunciables por orden correcto; acciones de pausa/repetir/atrás/siguiente con foco visible, sin dependencia de ratón ni del color |

**Calidad de captions:** las descripciones entre corchetes son contenido editorial **no cervantino**, claramente diferenciado del texto literal. No introducirlas dentro de texto_visible ni texto_oral; son metadatos de sonido y accesibilidad sujetos a R08/R12. El usuario con sonido desactivado no necesita leerlos para entender causas y desenlace ya narrados.

**Prueba silenciosa editorial de R07 (inspección documental, no UX real):** leer únicamente texto_referencia_visible del CSV de I01 a I16, ignorando ambiente_efecto y texto_oral. Deben poder identificarse molinos reales, gigantes imaginados, explicación de aspas, arenga, viento y rotura de lanza, socorro, Frestón y continuación. La legibilidad visual, sincronización empírica y control mediante teclado solo podrán comprobarse con reproductor (R10/R12).

## 6. Derechos y producción futura (R13)

- **Voces:** asignación y autorización contractual del intérprete/servicio, consentimiento relativo a usos y síntesis, territorio, plazo, almacenamiento local, distribución y reutilización; prohibida grabación/clonación no autorizada. Sin casting ni contratación ahora.
- **Ambientes/FX:** grabación propia u obtención con cadena de licencia documentada (titular, URL, derechos de transformación, comercialidad futura si aplica, atribución, permisos de empaquetado offline y repositorio, archivos maestros y derivados con hashes).
- **Música:** no se propone pista preexistente; no reutilizar música con derechos inciertos. La ausencia de música es decisión de dirección para este piloto, no una prohibición global.
- **Producción:** originales masters fuera del paquete ejecutable; solo derivados autorizados, versionados con IDs y checksums cuando R13 y R09/R11 den el visto bueno. Ningún audio definitivo se produce en R07.

## 7. QA de salida, responsabilidades y pendientes

**Control de escritorio de la entrega (sin proclamar QA empírico):**
- 9/9 beats B01–B09 representados; 16/16 intervenciones dirigidas; recuento exacto 6/6/4; orden I01–I16 sin saltos ni duplicados.
- 16/16 filas incluyen texto_visible completo y texto_oral según la ficha; no hay incisos de narrador en las voces de personajes; los siete diálogos con inciso lo conservan en la referencia visible.
- 16/16 filas tienen intención, emoción, ritmo/pausa, contexto de ambiente/efecto, prioridad y sincronización. La palabra «silencio» no sustituye texto ni interacción.
- La documentación no altera el guion, esquemas, contenido editorial, manifest, reproductor, configuraciones ni recursos.

**Dependencias antes de aceptar sonido como producción:** R01/R02 deben aprobar literalidad, dirección y pronunciaciones; R09/R11 deben resolver IDs de intervención y pasajes P0013–P0017 y contrafirmar el contrato; R06/R08 deben confirmar sincronía escena/planos y captions; R12 debe realizar pruebas de comprensión con/sin audio y con teclado; R13 verifica permisos de cada recurso.

**Estado de entrega R07:** **DIRECCIÓN SONORA DOCUMENTADA, NO INTEGRADA NI GRABADA.** El PR es una propuesta para revisión, no una certificación de producción ni la fase siguiente. No fusionar automáticamente a main.
