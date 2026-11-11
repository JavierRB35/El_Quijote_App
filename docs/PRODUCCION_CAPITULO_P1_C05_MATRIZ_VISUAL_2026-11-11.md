# Capítulo I.5 — Matriz editorial y visual conjunta Aventura / Historia

**Fecha:** 2026-11-11. **Estado:** inventario técnico y **candidaturas de uso**, NO dictamen de aptitud del propietario y NO autorización de prompts, generación ni activación.
**Precedencia:** DC-36: primero [Aventura candidata](PRODUCCION_CAPITULO_P1_C05_AVENTURA_CANDIDATA_2026-11-11.md), después [Historia candidata](guiones/HISTORIA_P1_C05_CANDIDATA_2026-11-11.md), **ahora** cruce visual conjunto para revisión del propietario. Corpus: content/textos/gutenberg_2000/El_Quijote.txt, blob 9d7a51e978dca96b11ba1d1b66eabd57c6ef5eb5, Primera Parte V, L1917–2077.

## 1. Medios localizados realmente en el repositorio

En assets/scenes/part_1/chapter_05/ constan **tres** WebP físicos. El manifiesto oficial assets/scenes/manifest.json los registra a **1672×941, media_class recreacion_ia, review_state borrador**, sin revisión de spoiler/locador terminada y con redistribución pendiente. Que existan **no equivale** a aptitud para uso en Aventura o Historia.

| Recurso | ID candidato / SHA-256 del manifiesto | Descripción catalogada | Estado de derechos/visual |
|---|---|---|---|
| p1_c05_quijote_romances_post.webp | DQ.MED.900156 / ce77dc313a936cba347ded8add1864b61bb50820ba464ee09f23279c7cc2c924 | «Quijote romances», fase post, spoiler_risk high; alt no describe una acción comprobable | **EXISTE_PENDIENTE_REVISION**, borrador; continuidad con I.4 y riesgo de fantasía no comprobados |
| p1_c05_labrador_auxilio_pre.webp | DQ.MED.900229 / 3bceef3c5be9d51111702d6dd25e1a9bf19f6ee810efe9c096259c29aca889ed | El vecino **ya reconoce** al herido y se inclina a ayudarlo; fase pre, spoiler_risk low declarado | **EXISTE_PENDIENTE_REVISION**. Posible spoiler de R02 si muestra reconocimiento/rostro antes de la acción |
| p1_c05_pedro_alonso_auxilio_post.webp | DQ.MED.900048 / 33aeb22c09faea12dca95f16bbe140d7173250a32b0ec7c0a875a3a2b92a3727 | Pedro Alonso ayuda al caballero sin sangre visible junto al camino al atardecer; fase post | **EXISTE_PENDIENTE_REVISION**. No demuestra por sí solo visera retirada, jumento ni un instante exacto |

También existe en el capítulo IV el plano **ya registrado como aprobado visualmente por el propietario** p1_c04_h14_solo_camino_story.webp (después del castigo), candidato de continuidad para R01 pre / H01.1; **no implica aprobación de su composición en una pregunta nueva**. El close-up assets/closeups/don_quixote_battered.webp y las acuarelas Tusell del tramo son recursos secundarios **sin aptitud acreditada aquí**. No se alteran medios ni manifiestos.

**Límites de esta auditoría:** se verificaron rutas, estados y metadatos del repositorio; **no se ha inspeccionado** visualmente el contenido de los píxeles de esos WebP en la pantalla del juego. No se ha ejecutado comprobación de bytes ni SHA-256 local, por lo que los hashes son los **declarados** en el manifiesto, no una nueva medición. Prohibido inferir que un título, fase o alt prueba que la imagen sea fiel.

## 2. Cruce de Aventura: diez posiciones / cinco preimágenes exclusivas

La **aptitud real** por pregunta depende del contexto, tres opciones, desenlace y espacio editorial en la **derecha** de cada fotograma (DC-28). Preimagen exclusiva por ronda; post solo después de «Descubrir qué sucede». La ausencia de selección no equivale a **FALTA_CONFIRMADA**.

| Ronda / posición | Instante y fuente | Candidato técnico / riesgo | Historia reutilizable | Estado |
|---|---|---|---|---|
| R01 A01 pre | Solo en tierra, aún sin recitar, L1920–1926 | p1_c04_h14_solo_camino_story.webp; revisar que no muestre labrador y que panel no tape lo esencial | H01.1 | EXISTE_PENDIENTE_REVISION |
| R01 A02 post | Recita Valdovinos, L1927–1941 | p1_c05_quijote_romances_post.webp; catalogado high spoiler; comprobar ausencia de marqués físico | H01.2–H01.3 | EXISTE_PENDIENTE_REVISION |
| R02 A03 pre | Pedro se aproxima, visera aún sobre rostro, L1942–1951 | p1_c05_labrador_auxilio_pre.webp solo si **no** revela la identificación; título catalogado indica lo contrario | H02.1–H02.2 | EXISTE_PENDIENTE_REVISION |
| R02 A04 post | Visera retirada, vecino lo reconoce, L1951–1960 | p1_c05_pedro_alonso_auxilio_post.webp candidato sin cotejo de instante | H02.3 | EXISTE_PENDIENTE_REVISION |
| R03 A05 pre | Examen sin sangre, intenta alzarlo, antes de subirlo al asno, L1960–1963 | p1_c05_pedro_alonso_auxilio_post.webp puede servir de apoyo, no garantiza pre exclusiva | H03.1 | EXISTE_PENDIENTE_REVISION |
| R03 A06 post | Don Quijote sobre jumento, armas en Rocinante, L1963–1969 | Ningún plano específico seleccionado; comprobar sin inventar cobertura | H03.2 | PENDIENTE_SELECCION |
| R04 A07 pre | Anochece, Pedro espera en exterior del pueblo, L2001–2003 | Sin recurso específico seleccionado | H06.1 | PENDIENTE_SELECCION |
| R04 A08 post | Entra de noche a la casa alborotada, L2003–2006 | Sin recurso específico seleccionado | H06.2 / H07.1 | PENDIENTE_SELECCION |
| R05 A09 pre | En cama, familia pregunta, aún no pide descanso, L2063–2073 | Sin recurso específico seleccionado | H10.2–H11.1 | PENDIENTE_SELECCION |
| R05 A10 post | Reposa; cura escucha a Pedro, L2071–2077 | Sin recurso específico seleccionado | H11.1–H11.2 | PENDIENTE_SELECCION |

**Aviso de exclusividad:** p1_c05_pedro_alonso_auxilio_post.webp se menciona en A04/A05 **como alternativa a evaluar**, no como asignación doble confirmada; si ambas preimágenes de rondas distintas lo necesitansen, prevalece la exclusividad de A03/A05. Una misma imagen sí puede compartirse Aventura/Historia para el **mismo instante**.

## 3. Cruce de Historia: cobertura de sus 30 intervenciones

| Beats | Necesidad visual / ancla | Ruta o candidato y restricción | Estado |
|---|---|---|---|
| H01.1–H01.3 | Solo herido, recitación, L1920–1941 | I.4 H14 para comienzo; romances_post solo al recitar. Evitar figuras del romance en plano real | EXISTE_PENDIENTE_REVISION |
| H02.1–H02.3 | Regreso del molino, interrogación, rostro reconocido, L1942–1960 | labrador_auxilio_pre / pedro_alonso_auxilio_post; comprobar orden antes/después de visera | EXISTE_PENDIENTE_REVISION |
| H03.1–H03.2 | Retira armadura, lo sube a asno, Rocinante lleva armas, L1960–1969 | pedro_alonso_auxilio_post no acredita transporte; no mostrar herida abierta | PENDIENTE_SELECCION |
| H04.1–H04.3 | Traslado y nuevo relato del Abencerraje, L1967–1987 | Sin plano de camino seleccionado; no corporeizar personajes de ficción | PENDIENTE_SELECCION |
| H05.1–H05.3 | Pedro Alonso se identifica y don Quijote se reafirma, L1989–1999 | Posible alternancia de closeups por revisar, sin reusar un plano de auxilio como garantía | PENDIENTE_SELECCION |
| H06.1–H06.2 | Espera al oscurecer, entrada discreta, L2001–2006 | Sin plano exterior/entrada seleccionado | PENDIENTE_SELECCION |
| H07.1–H07.3 | Ama, cura y barbero preocupados en casa, L2006–2019 | Sin grupo aprobado; don Quijote aún no entra en plano | PENDIENTE_SELECCION |
| H08.1–H08.3 | Sobrina cuenta recuerdos, cura anuncia decisión, L2019–2040 | Conversación presente; **NO** quemar libros ni convertir recuerdos en presente | PENDIENTE_SELECCION |
| H09.1–H09.3 | Grito de Pedro, abrazo, caballero aún en asno, Urganda invocada, L2041–2062 | Sin plano seleccionado; Urganda no aparece físicamente | PENDIENTE_SELECCION |
| H10.1–H10.3 | En cama, cura y ama, ninguna herida visible, L2057–2070 | Sin recurso aprobado; no proyectar gigantes reales | PENDIENTE_SELECCION |
| H11.1–H11.2 | Comer/dormir; conversación cura-labrador, L2071–2077 | Sin plano seleccionado; capítulo VI queda pendiente | PENDIENTE_SELECCION |

**Necesidad global:** mantener variedad narrativa (establecimiento, aproximación, inspección, traslado, camino, reacción, interior, reposo), continuidad rostro/armadura/visera/asno/Rocinante, imágenes en su instante cronológico y al menos una solución visual legible por intervención. No se impone una imagen nueva por intervención; se pueden encadenar beats del mismo plano solo si su sentido no cambia.

## 4. Revisión reservada al propietario y límites obligatorios

| Control | Resultado actual |
|---|---|
| Guion Aventura | **5 rondas CANDIDATAS**, con tres alternativas, una canónica y referencias cotejadas |
| Guion Historia | **11 escenas / 30 intervenciones CANDIDATAS**, con TS-001 especificado |
| Inventario localizable | **3 WebP de I.5 en borrador** + **1 imagen final de I.4** como candidato intercapitular; closeups/acuarelas secundarios a revisar |
| Aprobación de imágenes para I.5 | **No concedida**; el estado del manifiesto es borrador |
| Aptitud visual y DC-28 | **Pendiente de revisión del propietario** por R01–R05 y H01–H11; sin capturas/QA |
| Carencias FALTA_CONFIRMADA | **Ninguna**: el propietario todavía no ha revisado y confirmado las ausencias |
| Prompts / imágenes nuevas | **0**. No redactar ni generar por iniciativa del coordinador |
| JSON / registro / reproductores de I.5 | **Sin activar ni modificar**. Su integración necesita revisión editorial, medios aprobados y pruebas |
| QA visual / licencia de redistribución | **Pendientes**; los assets de I.5 tienen estado de derechos de redistribución pendiente |

**Aplicar al comparar imágenes:** 1672×941, cine realista premium, continuidad de personajes, época y objetos; preimagen de Aventura específica sin spoilers y con zona de texto segura a la derecha, Historia con TS-001 íntegro; no scroll/truncamiento en overlays, composición DC-28 y acceso por teclado; fuente literaria DC-31 y respeto de obras de arte secundarias sin recorte. El propietario decide para cada posición **EXISTE_Y_APROBADA / EXISTE_PENDIENTE_REVISION / NO_APTA / FALTA_CONFIRMADA**. Una posición **PENDIENTE_SELECCION** no es un dictamen de ausencia.

**Resultado de esta fase:** documentos editoriales candidatos integrables en GitHub para revisión; **no** se declara capítulo terminado ni se han saltado la aprobación visual, DC-35 o la activación/QA. El siguiente avance permitido depende de decisiones visuales explícitas sobre estos instantes concretos, no de una cuota de imágenes.
