# Catálogo de escenas — piloto visual v0.11

Las imágenes de este directorio son **recreaciones originales generadas con IA** para el videojuego *El Quijote*. Su lenguaje visual sigue el encargo maestro: realismo cinematográfico con influencias pictóricas, España de comienzos del siglo XVII, profundidad para un tratamiento 2.5D, personajes consistentes e interfaz discreta.

## Convenciones

- `part_1/chapter_XX/` y `part_2/chapter_XX/`: asociación **provisional** con parte y capítulo de la novela.
- `p1_c08_molinos_pre.webp`: imagen **anterior** al desenlace del episodio; `*_post.webp`: imagen **posterior**, que puede revelarlo.
- `_art_direction/personajes_referencia.webp`: referencia de continuidad, no escena de un pasaje concreto.
- `manifest.json`: origen, uso previsto, alertas de spoilers, texto alternativo y ruta relativa de cada imagen. El consumidor debe resolver las rutas respecto de la raíz del repositorio.
- `candidate_media_id`: identificador reservado **solo para este piloto** conforme al patrón `DQ.MED.######` del contrato editorial-técnico actual. Aún **no** es un registro `MediaAsset` validado: faltan referencias de fuente/licencia formales, URI lógica y conformidad con el esquema definitivo.

## Uso e integración

1. Leer `manifest.json` y cargar recursos por ID estable; no codificar rutas o nombres en los componentes de React.
2. No mostrar escenas `post` antes de que el jugador conozca el resultado. La marca `pre` **no garantiza** que cualquier pregunta pueda emplearla: el editor debe verificar las opciones concretas y que la imagen no adelante la solución.
3. En la interfaz, mostrar `RECREACIÓN ARTÍSTICA · IA`, separándola visual y semánticamente de fotografía patrimonial, ilustración histórica o documento de archivo.
4. Todas las escenas son **imágenes únicas** listas para cámara sutil (zoom/pan), *no* capas de parallax recortadas. Si se necesitan capas, se solicitará una producción artística separada y se medirá su rendimiento.
5. Mantener texto, subtítulos, preguntas, hotspots, créditos y controles en capas de interfaz accesibles, nunca incrustados en la imagen. Las áreas seguras propuestas deben comprobarse visualmente a distintos tamaños y con subtítulos.
6. Cargar WebP offline con `loading` adecuado; conservar el PNG maestro en el ZIP de entrega, no duplicarlo necesariamente en Git.

## Procedencia y derechos

Este piloto no incorpora ninguna de las acuarelas del EPUB ilustrado por Salvador Tusell ni imágenes de Gustave Doré. Atribución: **recreación artística generada mediante OpenAI ImageGen, noviembre de 2026, a petición del propietario del proyecto**. La obra literaria es la referencia temática, no un origen de píxeles. No se otorga licencia CC0 ni se afirma un permiso sobre obras de terceros. Revisar condiciones aplicables si cambia el ámbito personal del proyecto.

Por petición expresa del propietario, los **WebP optimizados de este piloto** se almacenan en Git normal (103 archivos en total); los PNG maestros de mayor tamaño permanecen fuera del repositorio y se entregan en ZIPs independientes por batería. Esta excepción está recogida en `.gitignore` y `docs/GOBERNANZA_GIT.md`. Las baterías tercera, cuarta y quinta se incorporaron directamente a `main` por autorización expresa, mediante commits comprobados y sin abrir ramas o PR específicos. Esto no modifica automáticamente la política de integración de otros cambios del proyecto.

**Historial del catálogo:** v0.1, 11 imágenes (10 escenas más referencia); v0.2, 12 escenas nuevas; v0.3, 12 escenas nuevas; v0.4, 12 escenas nuevas; v0.5, 12 escenas nuevas (6 de cada parte) en capítulos no ilustrados anteriormente, conservando IDs y hashes de los 47 recursos anteriores. El catálogo incluye escenas de relato intercalado (`p1_c33_*` y `p1_c41_*`) y narrador-marco (`p1_c09_*`), **que no deben confundirse con aventuras vividas por Don Quijote**. No se considera un catálogo editorial aprobado: la versión indica evolución del paquete artístico, no aprobación GO/NO-GO del videojuego.

Salvo los cinco recursos aprobados expresamente el 2026-11-09, los demás archivos quedan en `editorial_review_pending` hasta que se cotejen los capítulos, la indumentaria, la arquitectura y los detalles de utilería. Las asociaciones con la novela no constituyen una edición textual ni justifican preguntas por sí mismas.

**Batería sexta (2026-11-06):** seis nuevas escenas `pre`, en capítulos I.4, I.12, I.27, II.4, II.14 y II.43 antes no representados por recreaciones propias; 65 recursos en total. Se conservan los 59 anteriores sin alteración. Pendiente de validación editorial.

**Batería séptima (2026-11-06):** seis escenas `pre` adicionales de capítulos I.10, I.13, I.15, II.12, II.31 y II.51, inéditos en el catálogo de recreaciones hasta esta tanda; colección total de 71 recursos, con 65 anteriores intactos. Pendiente de aprobación editorial.

**Batería octava (2026-11-06):** seis nuevas escenas `pre` para capítulos I.26, I.32, I.40, II.16, II.27 y II.38 sin recreación anterior. Inventario total de 77 recursos (71 previos intactos). La escena de I.40 corresponde a un relato intercalado; no atribuirla como experiencia directa de don Quijote. Pendiente de revisión editorial.

**Batería novena (2026-11-06):** seis escenas `pre` de I.29, I.34, I.43, II.19, II.34 y II.48, todos capítulos sin recreación propia anterior. Se conservan los 77 recursos previos; inventario 83. I.34 pertenece a la novela intercalada *El curioso impertinente*, no a la trama de los protagonistas. Revisión editorial pendiente.

**Décima batería (2026-11-06):** 20 nuevas escenas en capítulos sin recreación propia previa: I.28, 31, 37, 39, 42, 44, 47, 48, 49, 50, 51; II.2, 5, 6, 7, 9, 15, 23, 24, 25. Total: **103 activos** (83 anteriores conservados). I.39 representa el relato intercalado del cautivo; II.15 y II.23 se catalogan `post` con spoiler alto. Pendiente de cotejo editorial individual.

**Duodécima batería (2026-11-06):** 50 nuevas recreaciones WebP de momentos narrativos diferentes, alternando estados `pre` y `post` y perspectivas complementarias; total **203 recursos visuales** (202 escenas y referencia). Las 153 entradas previas se conservan. Todas las nuevas escenas quedan pendientes de cotejo editorial individual.

## Capítulo I — cinco escenas aprobadas por el propietario (2026-11-09)

Se incorporan cinco WebP originales de 1672 × 941 px para Aventura R01/R03/R04/R05 y su reutilización pertinente en Historia, con continuidad visual, fases `pre`/`post`, pasajes de `DQ.ED.0003` / `DQ.SRC.0005`, textos alternativos y SHA-256 en `manifest.json`. El propietario los ha revisado y validado expresamente. Su registro **no activa** por sí mismo las rondas ni el montaje de Historia; queda pendiente el QA de integración y composición DC-28 / TS-001 en la aplicación. La aprobación de estos cinco recursos **no se extiende** al resto del inventario artístico.

## Capítulo I — tres escenas adicionales de Historia aprobadas (2026-11-09)

El propietario aprobó las imágenes específicas H01 (presentación), H04 (desvelo nocturno) y H07 (primera media celada de cartón rota); H01 utiliza su elección expresa, H07 distingue el cartón destruido del morrión original intacto, y H04 no materializa fantasías. Son tres archivos WebP originales derivados de las imágenes aprobadas, a 1672 × 941 px y calidad perceptual 82, catalogados en `manifest.json` como `DQ.MED.900259`–`DQ.MED.900261` con SHA-256 y autoría `recreacion_ia`. No modifican ni reemplazan el recurso de celada reforzada de Aventura. Uso previsto: Historia H01/H04/H07, con H07 exclusivamente tras la rotura narrada. Integración artística autorizada no significa activación del guion ni QA de composición DC-28 y TS-001 en pantalla: ambos continúan pendientes. El cotejo textual directo con el corpus Gutenberg del repositorio sigue pendiente por limitación de extracción del fichero extenso; pasajes documentados en el guion canónico de Historia.

## Capítulo II — R03: temor de las mujeres (aceptación 2026-11-10)

El propietario aceptó expresamente mediante el protocolo DC-35 la **imagen 2** del encargo artístico del capítulo II. Se incorpora un único WebP original (`p1_c02_r03_mujeres_temor_pre.webp`, 1672 × 941 px, calidad 82), con ID `DQ.MED.900262`, SHA-256, texto alternativo y trazabilidad en `manifest.json`. El pasaje se cotejó directamente con `content/textos/gutenberg_2000/El_Quijote.txt` (DQ.ED.0003 / DQ.SRC.0005), Primera parte, capítulo II, líneas 1325–1338: las dos mujeres se disponen a entrar en la venta ante el caballero armado, antes de que alce la visera y les hable. La escena no revela esa respuesta ni muestra a Sancho, el ventero o acciones posteriores. Las particularidades de vestuario, luz y arquitectura son recreaciones artísticas plausibles.

Uso editorial previsto: **Aventura R03, preimagen**; reutilizable en Historia antes del primer diálogo. Este alta no modifica ni activa por sí sola rondas ni guiones. Aprobación visual del archivo no certifica aún legibilidad de superposiciones o composición DC-28/TS-001 dentro de la aplicación; esas pruebas quedan pendientes. No afecta a la revisión de los demás activos del catálogo.

## Capítulo II — R02: aproximación a la venta (aceptación 2026-11-10)

El propietario aprobó expresamente mediante el protocolo DC-35 la **imagen 1** del encargo artístico del capítulo II, `p1_c02_r02_venta_llegada_pre.webp`, convertida del PNG original aprobado a WebP de 1672 × 941 px (calidad 82; 249.070 bytes), sin cambiar la composición. Se cataloga como `DQ.MED.900263` con SHA-256 y metadatos de procedencia en `manifest.json`. Pasaje verificado en `content/textos/gutenberg_2000/El_Quijote.txt`, `DQ.ED.0003` / `DQ.SRC.0005`, I.2, líneas 1305–1323. Representa a don Quijote montado en Rocinante aproximándose a una venta real al anochecer, con **dos mujeres** a la entrada, antes de que detenga las riendas; no hay ventero, porquero ni castillo sobrenatural. Arquitectura e iluminación específicas son recreaciones artísticas.

Uso previsto: **Aventura R02, preimagen antiespoiler**, con posible reutilización en Historia durante la llegada. La aprobación corresponde únicamente a este WebP y **no** modifica ni activa rondas, guiones o funcionalidad. La evaluación de composición DC-28/TS-001 y el QA de interfaz siguen pendientes.

## Capítulo II — R05: la cena imposible (aceptación 2026-11-10)

El propietario aprobó visualmente la **imagen 4** del encargo de Primera Parte, capítulo II, `p1_c02_r05_cena_sin_cana_pre.webp`, y solicitó su integración conforme a DC-35. Se incorpora como `DQ.MED.900264` (WebP original del lote aceptado, 1672 × 941 px, 182.170 bytes), sin sobrescribir imágenes existentes. El archivo tiene SHA-256 `f1f2ade765ea17e7a941cf99057405d5a9a7cb81db8da74f0508c1995f07a89c` y blob Git SHA-1 `1fc98e3e25b86a153205ac73008339c276dbbe09`. El PNG visualmente aprobado tiene SHA-256 `24dc53f2eb5289e2581d767217f96a231decc16860c79ca5c0828a59eaf543cf` y corresponde a la misma escena con diferencias de compresión WebP.

**Función:** Aventura R05, `pre` antiespoiler; posible reutilización en Historia durante la cena, **antes** de la solución del ventero para beber. Cotejo directo con el texto oficial `content/textos/gutenberg_2000/El_Quijote.txt` (`DQ.ED.0003` / `DQ.SRC.0005`), I.2, líneas 1433–1441: mesa a la puerta de la venta por el fresco, bacalao, pan oscuro, celada puesta **con la visera alzada**, mujer ayudando a comer y ventero aún sin horadar la caña. No se muestra el procedimiento de bebida ni intervenciones posteriores. La arquitectura, el vestuario, la luz del candil y el encuadre son recreaciones artísticas plausibles, no especificaciones literales de Cervantes.

**Estado:** aprobación visual específica del propietario; metadatos, procedencia, texto alternativo, derechos y hashes en `manifest.json`. **No implica activación de la ronda, del montaje de Historia ni publicación.** Pendiente QA de pantalla, composición DC-28/TS-001 y revisión de derechos para redistribución.

## Capítulo II — seis escenas de Historia aceptadas (2026-11-10; DC-35)

El propietario aprobó visualmente las seis imágenes para los planos **H03, H05, H06, H07, H10 y H11** de la Primera Parte, capítulo II. La imagen 4 es la versión **regenerada con don Quijote montado en Rocinante**, no las variantes desmontadas. Se incorporan seis WebP de las imágenes aprobadas, sin recortes ni alteración narrativa, identificados **DQ.MED.900265–DQ.MED.900270**. El inventario se amplía de **263 a 269 recursos**; el manifiesto registra hash SHA-256, Git blob SHA-1, dimensiones, tamaño, nombre del PNG original y autorización visual. Los PNG maestros permanecen fuera de Git.

Vinculación editorial, sin activación: **H03** cabalgata y monólogos; **H05** espera en la venta; **H06** risas tras el diálogo; **H07** recepción del ventero con el caballero todavía a caballo; **H10** vino administrado por caña; **H11** silbato del castrador. La secuencia sigue el [guion candidato de Historia I.2](../../docs/guiones/HISTORIA_P1_C02_CANDIDATA_2026-11-10.md) y el [informe técnico](../../docs/PRODUCCION_CAPITULO_P1_C02_ESTADO_TECNICO_2026-11-10.md). H06 y H10 muestran hechos posteriores: **no son preimágenes antiespoiler** de Aventura R03/R05. En H11, los cerdos visibles y el encuadre nocturno se consignan como contextualización artística, no como detalles explícitos del texto.

El propietario ha resuelto el identificador de I.2 como **DQ.P1.C02.E01**; esta decisión es ajena al alta de imágenes y no activa el capítulo. Siguen pendientes la preimagen R04, selección/revisión de consecuencias de Aventura, cotejo textual directo y QA real de composición DC-28/TS-001, accesibilidad y derechos para redistribución. Ningún JSON jugable, pantalla, recurso ajeno o contenido del guion ha sido modificado ni activado por esta integración.

## Capítulo III — A01 y A02 aprobadas visualmente (2026-11-10)

El propietario ha aprobado los fotogramas **A01** (encuentro previo en la caballeriza, `pre`) y **A02** (don Quijote de rodillas y aceptación verbal del ventero, `post`) de la ronda Aventura `AV2-I3-01`. Se incorporan dos WebP de 1672 × 941 px, calidad 82, bajo `assets/scenes/part_1/chapter_03/`, con IDs de catálogo `DQ.MED.900271` y `DQ.MED.900272`. Los hashes SHA-256, SHA Git, fuentes, procedencia, alt y revisiones específicas constan en `manifest.json`.

**Regla de presentación:** A01 es preimagen y no anticipa la súplica; A02 revela el gesto de arrodillarse y la aceptación, por lo que se muestra solo después de «Descubrir qué sucede». Ambas pueden reutilizarse cronológicamente en Historia si superan las comprobaciones concretas de contexto. La aceptación es **solo visual** y no activa rondas, guiones ni publicación. Quedan pendientes el QA de composición DC-28/TS-001 en pantalla, comprobación cruzada de resolución/texto ampliado, cotejo literario directo de corpus extenso y revisión de derechos de redistribución. La imagen A04, si existe como candidato no aprobado, queda expresamente fuera de esta integración.

## Capítulo III — A04, A05 y A06 aprobadas visualmente (2026-11-10)

Por aprobación expresa del propietario se incorporan tres nuevas escenas WebP originales de 1672 × 941 px: **A04** (`POST`, golpe al primer arriero, `AV2-I3-02`), **A05** (`PRE`, silencio tras la pedrea, `AV2-I3-03`) y **A06** (`POST`, conversación para abreviar la investidura, `AV2-I3-03`). Los IDs provisionales `DQ.MED.900273`–`DQ.MED.900275`, rutas, hashes SHA-256, procedencia, textos alternativos y riesgo de spoiler quedan en `manifest.json`.

A04 solo puede revelarse tras la consecuencia del ataque; A05 es la preimagen que no revela la propuesta del ventero; A06 revela esa propuesta después de «Descubrir qué sucede», sin anticipar los elementos de la investidura. La integración artística no activa rondas o escenas de Historia, no acredita QA DC-28/TS-001 en pantalla ni autoriza redistribución. Queda pendiente el cotejo directo del texto extenso, pruebas con la interfaz y revisión de derechos. La imagen A07, aún candidata sin aprobación al preparar esta integración, no forma parte de este lote.

## Capítulo III — A07 y A08 aprobadas visualmente (2026-11-10)

Se integran dos WebP originales de la ronda `AV2-I3-04`, 1672 × 941 px (calidad 82): **A07** `pre`, preparativos de investidura sin golpear, y **A08** `post`, espaldarazo improvisado con la espada de don Quijote. IDs de catálogo `DQ.MED.900276`–`DQ.MED.900277`. Sus rutas, SHA-256, Git SHA, anclas de texto, alt, procedencia y aprobación constan en `manifest.json`.

La preimagen A07 no revela la respuesta de la ronda; la consecuencia A08 solo aparece después de «Descubrir qué sucede». Su eventual reutilización en Historia H09–H10 depende de respetar los textos exactos del guion y el instante narrado. **No se activan** rondas ni guiones, no se declara superado QA DC-28/TS-001, ni se autoriza distribución. H-A, en preparación artística y todavía pendiente de aceptación visual, no forma parte de esta integración.

## Capítulo III — H-A y H-B aprobadas visualmente (2026-11-10)

Se integran dos imágenes cinematográficas `STORY` para Historia: **H-A** (diálogo socarrón y consejos prácticos del ventero, H03–H04) y **H-B** (pedradas desde lejos, don Quijote protegido por la adarga junto al pozo y ventero pidiendo detenerse, H07). Los WebP originales de 1672 × 941 px a calidad 82 reciben IDs provisionales `DQ.MED.900278`–`DQ.MED.900279`; el catálogo documenta rutas, dimensiones, hashes, referencias literarias, alt, origen, aprobación y riesgos.

Estos planos pertenecen al **Modo Historia**, no sustituyen preimágenes específicas de Aventura y deben presentarse únicamente en sus beats exactos, con texto íntegro TS-001. La integración no activa guiones ni certifica QA de texto sobre imagen DC-28, derechos de redistribución o fidelidad literaria directamente cotejada con el corpus extenso. H-C, tras detectar un defecto anatómico, ha sido corregida como candidata, pero **su nueva versión todavía no tiene aprobación** y no forma parte de esta entrega.

## Capítulo III — H-C y H-D aprobadas visualmente (2026-11-10)

Se integran las dos escenas restantes de Historia H11, `STORY`: **H-C** (la Molinera calza una espuela a don Quijote, de pie y con la espada ya ceñida) y **H-D** (don Quijote parte de noche montado en Rocinante, con lanza, adarga y espada envainada, ante el ventero aliviado). Reciben los IDs `DQ.MED.900280`–`DQ.MED.900281`. Solo se integran las versiones finales expresamente aceptadas por el propietario; quedan excluidos los candidatos H-C de anatomía defectuosa y la primera H-D sin armas.

El manifiesto registra rutas, anclas literarias, WebP 1672 × 941 px calidad 82, SHA-256, Git SHA, procedencia, alt y aceptación visual. Estas imágenes se reservan al instante narrativo correcto de Historia H11, sin uso automático como preimágenes de Aventura. Su integración no activa escenas ni guiones, no certifica aún QA DC-28/TS-001 de texto completo sobre imagen, ni licencia redistribución pública.

## Capítulo IV — A01, A02 y A03 aprobadas visualmente (2026-11-11)

Se integran tres escenas WebP originales de 1672 × 941 px, calidad 82, con aprobación visual expresa del propietario: **A01** (`PRE`, Juan Haldudo se explica ante don Quijote, `AV2-I4-01`), **A02** (`POST`, Andrés ya libre durante la discusión de la soldada, `AV2-I4-01`) y **A03** (`PRE`, promesa verbal de Haldudo antes de la partida, `AV2-I4-02`). Los IDs de catálogo `DQ.MED.900282`–`DQ.MED.900284` y las rutas, hashes SHA-256/Git SHA, procedencia, anclas, alt y estados están en `manifest.json`. Se conserva la continuidad de don Quijote, Rocinante, Haldudo y Andrés entre los planos, con Haldudo visualmente distinto del ventero del capítulo III.

En Aventura, A02 se muestra **únicamente tras «Descubrir qué sucede»**, mientras A01 y A03 son preimágenes que no anticipan sus consecuencias. En Historia se reservan para H03.1, H03.2/H04 y H05.3/H06.1 respectivamente, siempre después de los beats narrados. El alta del medio no activa automáticamente rondas ni guiones, no acredita todavía QA real DC-28/TS-001 de texto sobre imagen ni autoriza redistribución pública. Siguen pendientes cotejo directo del corpus extenso, pruebas visuales en el juego y revisión de derechos. A04 continúa sin imagen aceptada y no forma parte de esta integración.

## Capítulo IV — A04 aprobada visualmente con representación indirecta (2026-11-11)

Por aprobación expresa del propietario se integra **A04** (`POST`, `AV2-I4-02`, posible reutilización Historia H07.2) como WebP original de 1672 × 941 px, calidad 82, con ID de catálogo `DQ.MED.900285`. El fotograma retrata a Haldudo junto a la encina y a Andrés parcialmente oculto detrás del tronco, **sin mostrar la atadura explícita ni los golpes**. Se trata de una excepción de encuadre **expresamente autorizada** por el propietario tras el bloqueo de dos intentos de generación literal por seguridad y posteriormente aceptada visualmente por él. No debe presentarse como una representación literal completa del pasaje; el texto canónico sigue describiendo la represalia y la nueva atadura.

Esta imagen es consecuencia `POST` y **solo puede mostrarse después de «Descubrir qué sucede»**, nunca como preimagen antiespoiler. El manifiesto conserva fuente, ancla, derechos, procedencia, hashes, alt y autorización. La integración no activa automáticamente ronda ni guion, no acredita aún pruebas de UI DC-28/TS-001 ni permite redistribución pública. A05 sigue en fase de revisión y no se incorpora en este commit.


## Capítulo IV — A05 aprobada visualmente: encrucijada desde Rocinante (2026-11-11)

Se incorpora **A05** (`PRE`, `AV2-I4-03`, Historia H08.2 durante la pausa), WebP original de 1672 × 941 px a calidad 82, ID provisional `DQ.MED.900286`. La versión aceptada adopta la **vista subjetiva desde la montura de don Quijote**: exactamente tres ramales visibles delante del caballo, y el cuarto camino de llegada detrás de la cámara. Corrige las versiones descartadas con seis caminos y cámara exterior. La figura de Rocinante permanece detenida, con las riendas todavía sostenidas; ningún camino está elegido. El punto de partida literario es `content/textos/gutenberg_2000/El_Quijote.txt`, Primera Parte capítulo IV, líneas 1822–1825, cotejadas con el texto del repositorio.

A05 es preimagen **antiespoiler**: no revela la decisión posterior del caballo; se reserva para la pregunta previa en Aventura y el instante H08.2 de Historia antes de la resolución. Su incorporación no activa las rondas ni los guiones, no acredita QA DC-28/TS-001 en interfaz ni concede derechos de redistribución pública. Quedan pendientes esas verificaciones. A06 aún no cuenta con aprobación visual y queda fuera del commit.


## Capítulo IV — A06: aceptación retirada (2026-11-11)

El propietario retiró expresamente la aceptación visual de la primera A06 (`POST`, `AV2-I4-03`) tras su integración: la cámara exterior no respetaba la continuidad subjetiva desde la montura aprobada en A05. Se retira el WebP del catálogo y de `main` mediante commit no destructivo del historial. La sustituta será una nueva candidata, pendiente de aprobación expresa, desde los ojos de don Quijote a lomos de Rocinante. No se activa ninguna escena.


## Capítulo IV — A06 POV corregida y aprobada (2026-11-11)

Se incorpora la **A06 corregida**, `POST` de Aventura `AV2-I4-03` y reutilizable en Historia H08.2 después de la pausa, WebP original 1672 × 941 px a calidad 82, ID provisional `DQ.MED.900288`. El propietario aprobó esta nueva versión en **primera persona desde la montura de don Quijote**, continuidad exacta de A05: el cuello y las orejas de Rocinante giran hacia el ramal izquierdo, el caballo ya se dispone a avanzar y las riendas cuelgan flojas. Las otras dos salidas siguen visibles a la derecha; el cuarto ramal es el de llegada, detrás del jinete. El ramal específico es recreación artística, pues el texto solo dice que Rocinante tomó el camino de su caballeriza, que no se muestra. Fuente: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1825–1827.

Esta versión **sustituye** la A06 anterior con cámara exterior que el propietario rechazó posteriormente; se conserva esa revocación únicamente en historial, no como recurso vigente. Mostrar A06 solo después de revelar la consecuencia de A05. No se activan rondas/Historia, no se acredita aún QA DC-28/TS-001 en la aplicación ni redistribución pública. A07 queda fuera de este commit hasta su aceptación.


## Capítulo IV — A07 aprobada visualmente: primera petición del mercader (2026-11-11)

Se integra **A07** (`PRE`, Aventura `AV2-I4-04`, Historia H09.2 durante la petición), imagen WebP original de 1672 × 941 px, calidad 82, con ID provisional `DQ.MED.900289`. El mercader toledano se dirige a don Quijote y solicita ver a la dama; don Quijote escucha montado, con lanza y adarga en reposo, ante parte de la comitiva detenida y sus quitasoles de época. El fondo derecho deja espacio para la interfaz, sin tapar a los interlocutores o los quitasoles. Texto fuente: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1846–1855, cotejo directo.

Por ser PRE, la escena debe mostrarse antes de la respuesta del caballero y **no revela** ésta ni otras consecuencias; A08 aún no tiene aceptación visual y queda fuera del lote. La integración del activo no activa rondas ni guiones, no acredita aún QA DC-28/TS-001 en pantalla ni autoriza redistribución pública.


## Capítulo IV — A08 aprobada visualmente: respuesta de don Quijote (2026-11-11)

Se integra **A08** (`POST`, Aventura `AV2-I4-04`, Historia H10.1), WebP original 1672 × 941 px a calidad 82 con ID provisional `DQ.MED.900290`. Es el contraplano de A07: don Quijote afirma con solemnidad que deben creer en la incomparable Dulcinea sin verla; el mercader escucha, Rocinante sigue detenido, adarga visible y lanza vertical sin iniciar carga. La comitiva continúa inmóvil; no hay retrato, burla siguiente ni violencia. Fuente textual `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1857–1863, cotejo directo.

Por ser `POST`, no debe mostrarse hasta después de «Descubrir qué sucede» en Aventura. Su alta de imagen no activa rondas/Historia ni certifica aún QA visual DC-28/TS-001 en el juego o permisos de redistribución. A09 sigue fuera del catálogo aprobado hasta validación específica del propietario.


## Capítulo IV — A09 aprobada visualmente: réplica airada (2026-11-11)

Se integra **A09** (`PRE`, Aventura `AV2-I4-05`, Historia H11.1–H11.2), WebP original 1672 × 941 px a calidad 82 e ID provisional `DQ.MED.900291`. El plano medio corto desde el lado de los viajeros muestra a don Quijote indignado por las palabras del mercader contra Dulcinea. Rocinante sigue inmóvil y la lanza todavía vertical, sin amenazar físicamente. El encuadre modifica escala, eje y expresión respecto de A07 y A08, preservando el lateral derecho libre para un panel posterior. Fuente: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1877–1881, verificadas.

A09 es una preimagen antiespoiler: no revela la acometida ni el tropiezo posterior. Su integración no activa Aventura/Historia ni acredita QA de UI DC-28/TS-001 o redistribución pública. A10 continúa pendiente de aceptación visual y no se incluye en el commit.


## Capítulo IV — A10 aprobada visualmente: caída de Rocinante (2026-11-11)

Se integra exclusivamente la **versión corregida y aceptada de A10** (`POST`, Aventura `AV2-I4-05`, Historia H12), WebP original 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900292`. La candidata anterior fue rechazada por una postura antinatural de las piernas del caballero; la versión ahora aceptada presenta dos piernas anatómicamente coherentes sin cambiar el suceso, caballo, lanza ni mercader. Plano general lateral del instante después del tropiezo: Rocinante en el suelo, don Quijote separado e incapaz de incorporarse, adarga, espuelas y celada visibles, lanza todavía entera; mercader ileso a distancia y sin mozo golpeador ni auxilio. Fuente: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1885–1892, cotejadas.

Esta consecuencia `POST` **solo se muestra después de «Descubrir qué sucede»**. El alta no activa la ronda ni los guiones de Historia, no certifica el QA de UI DC-28/TS-001 ni derechos de distribución pública. La H01 solicitada posteriormente será imagen autónoma pendiente de aceptación.


## Capítulo IV — H01 aprobada visualmente: salida al alba (2026-11-11)

Se integra **H01** (`STORY`, Historia H01.1–H01.2) como WebP original 1672 × 941 px y calidad 82, ID provisional `DQ.MED.900293`. Don Quijote parte de una venta modesta a la primera luz del día, montado en Rocinante, armado y satisfecho por la investidura. Esta imagen de **amanecer** se diferencia de la despedida nocturna del capítulo III: no presenta ventero destacado, luna, ceremonia, dinero, camisas nuevas o escudero. Fuente literaria: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1672–1681, cotejadas.

H01 es material para Modo Historia, no sustituye una preimagen específica de Aventura. Su catalogación no activa contenido, ni certifica todavía QA visual DC-28/TS-001 o derechos de distribución pública. H02A está aún pendiente de aceptación y no se incluye en el commit.

## Capítulo IV — H02A aprobada visualmente: voces del bosque (2026-11-11)

Se integra **H02A** (`STORY`, Historia H02.1) como WebP original de 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900294`. Tras escuchar voces de queja a su derecha, don Quijote guía a Rocinante hacia las encinas; la causa de esas voces sigue fuera de plano. Plano de entrada al bosque con el caballero de perfil, celada, lanza y adarga; sin Andrés, Haldudo, yegua ni consecuencias futuras. Fuente: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1683–1693, cotejadas.

La aprobación es visual y específica. No activa guiones ni contenido de juego, no acredita todavía QA de interfaz DC-28/TS-001 ni derechos de redistribución. La imagen H02B se generará como candidata independiente y no se integra sin aceptación posterior.

## Capítulo IV — H02B aprobada visualmente: descubrimiento entre las encinas (2026-11-11)

Se integra **H02B** (`STORY`, Historia H02.2) como WebP 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900295`. Es continuación de H02A: desde la entrada del encinar don Quijote acaba de descubrir al joven Andrés atado a una encina, al labrador Juan Haldudo con la pretina baja y una yegua amarrada a otra encina distinta. No aparece azote en ejecución, lesión gráfica, desafío al amo ni liberación. Fuente: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1693–1705, contrastadas con texto íntegro en repositorio.

La imagen se registra por aceptación visual expresa. No activa escenas ni garantiza QA de interfaz DC-28/TS-001 o derechos de distribución; H06 queda como candidata independiente hasta nueva validación del propietario.

## Capítulo IV — H06 aprobada visualmente: el caballero se aleja (2026-11-11)

Se integra **H06** (`STORY`, Historia H06.2) como WebP 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900296`. La cámara mira desde el encinar hacia su salida: Haldudo sigue con la vista a don Quijote, que se aleja montado en Rocinante y aparece a escala reducida al fondo; Andrés sigue libre y la yegua permanece junto a otra encina. No hay represalia, monedas entregadas ni regreso a la venta. Fuente: `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1778–1780, cotejadas con el texto del repositorio.

Aprobación visual específica del propietario, sin activación de Modo Historia ni de Aventura. QA de interfaz DC-28/TS-001 y revisión de derechos de distribución pendientes. H07A no forma parte de esta integración y queda pendiente de aceptación visual independiente.

## Capítulo IV — H07A aprobada visualmente: falso ofrecimiento (2026-11-11)

Se integra **H07A** (`STORY`, Historia H07.1) como WebP 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900297`. Ya sin don Quijote a la vista, Haldudo se dirige a Andrés como si fuera a cumplir el pago prometido. Andrés permanece libre, sin ataduras; el camino de salida está vacío y no aparecen monedas, cobro ni represalia posterior. La expresión cordial-ambigua del amo y la esperanza del muchacho son recreaciones plausibles del diálogo. Fuente `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1783–1792, cotejadas.

La aceptación visual es específica de H07A. No se activa Historia/Aventura ni se acredita todavía QA DC-28/TS-001 en el juego o derechos para redistribución. H07B necesita aceptación visual propia.

## Capítulo IV — H07B aprobada visualmente: Andrés se marcha (2026-11-11)

Se integra **H07B** (`STORY`, Historia H07.3) como WebP 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900298`. Tras la segunda liberación, Andrés se aleja llorando por un sendero de la arboleda, mientras Juan Haldudo permanece más atrás junto a una encina. Se muestra la tristeza mediante el gesto, sin heridas visibles, golpes, nueva atadura, regreso de don Quijote o pago. Fuente `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1801–1806, cotejadas.

Por revelar el efecto del episodio, esta imagen no debe exponerse antes de H07.3 ni usarse como preimagen de una ronda de Aventura. Su alta no activa historias ni acredita QA de interfaz DC-28/TS-001 o derechos para redistribución. H08 permanece fuera hasta aceptación individual.

## Capítulo IV — H08 aprobada visualmente: satisfacción del caballero (2026-11-11)

Se integra **H08** (`STORY`, Historia H08.1) como WebP 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900299`. Don Quijote avanza solo sobre Rocinante por un camino rural único, satisfecho de su supuesta intervención por Andrés y hablando para sí en voz baja. Sin Dulcinea representada, sin Andrés o Haldudo, sin encrucijada ni comitiva de mercaderes. Fuente `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1808–1820, cotejadas con el texto del repositorio.

La aceptación es visual y exclusiva de H08; su alta no activa la Historia ni la Aventura y no acredita QA de UI DC-28/TS-001 o derechos de redistribución pública. H09 sigue pendiente de validación individual.

## Capítulo IV — H09 aprobada visualmente: la comitiva se acerca (2026-11-11)

Se integra **H09** (`STORY`, Historia H09.1) como WebP 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900300`. Don Quijote, firme en los estribos en mitad del camino, espera montado sobre Rocinante, con adarga al pecho y lanza erguida, mientras se aproxima el frente visible de la comitiva de mercaderes con quitasoles. **No se muestra la comitiva completa**; el texto describe seis mercaderes, cuatro criados montados y tres mozos de mulas a pie. No se anticipa el diálogo, burla, carga ni caída. Fuente `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1829–1840, cotejadas.

La aceptación es solo visual de H09; no activa rondas ni Modo Historia y no sustituye QA de interfaz DC-28/TS-001 o revisión de derechos. H10 continúa fuera de `main` hasta aceptación individual.

## Capítulo IV — H10 aprobada visualmente: petición burlona del retrato (2026-11-11)

Se integra **H10** (`STORY`, Historia H10.2–H10.3) como WebP original 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900301`. El mismo mercader, ante la exigencia de creer sin ver, pide con cortesía fingida un retrato de Dulcinea. Sus dos manos están vacías, don Quijote escucha montado y la comitiva con sus quitasoles queda en segundo plano. No aparece retrato, grano literal, réplica airada ni acción violenta posterior. Fuente `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1865–1875, cotejadas.

Esta aceptación visual específica de H10 no activa guiones ni contenido ni certifica QA de UI DC-28/TS-001 o derechos de redistribución. H11 permanecerá fuera del catálogo hasta su aceptación individual.

## Capítulo IV — H11 aprobada visualmente: la acometida (2026-11-11)

Se integra **H11** (`STORY`, Historia H11.3) como WebP original 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900302`. Don Quijote arremete montado en Rocinante con la lanza baja contra el mercader que se ha burlado de Dulcinea; en el plano lateral abierto ambos siguen separados y no hay contacto. Rocinante avanza erguido y todavía no tropieza. Los compañeros con quitasoles quedan al fondo. No hay caballo caído, lanza rota, heridos ni agresión posterior. Fuente `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1883–1885, cotejadas.

La aceptación de H11 es exclusivamente visual, no activa el Modo Historia ni Aventura ni certifica QA de interfaz DC-28/TS-001 o derechos de redistribución. H13 continúa pendiente de aceptación específica.

## Capítulo IV — H13 aprobada visualmente: los pedazos de la lanza (2026-11-11)

Se integra **H13** (`STORY`, Historia H13.1–H13.2 y cierre posterior de Aventura) como WebP 1672 × 941 px, calidad 82, ID provisional `DQ.MED.900303`. Tras la caída y la rotura de la lanza, don Quijote yace sin poder incorporarse; el mozo de mulas está junto a él con un fragmento del asta rota. Otros pedazos aparecen en el suelo y los mercaderes gesticulan al fondo para que el mozo se detenga. Se sugiere la agresión por las posturas, sin impacto en cuadro, heridas ni sangre. Fuente `DQ.SRC.0005`, Primera Parte capítulo IV, líneas 1894–1904, cotejadas.

Imagen posterior a la rotura: no emplear como preimagen de anticipación. La aprobación es exclusivamente visual, sin activación de Aventura/Historia, sin QA de interfaz DC-28/TS-001 acreditado y con revisión de derechos pendiente. H14 queda fuera de `main` hasta su aceptación individual.
