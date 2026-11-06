# Prompts de regeneración — piloto cinematográfico

Estas indicaciones sintetizan los requisitos artísticos empleados en la generación. No constituyen una transcripción literal completa de cada llamada ni garantizan la reproducción determinista de los píxeles.

## Prompt base común

> Recreación artística original de *Don Quijote de la Mancha* para videojuego narrativo premium Windows 2.5D. Fotograma horizontal 16:9 (entregado en 1672 × 941), realismo fotográfico cinematográfico con influencias suaves de pintura clásica, España de comienzos del siglo XVII, ropa y utilería plausibles, materiales naturales, luz atmosférica, paleta contenida de ocre/terracota/oliva/ámbar/azul grisáceo. Profundidad con primer plano, plano medio y fondo, personajes preferentemente a la izquierda y espacio libre a la derecha para UI. Don Quijote muy alto y enjuto, de unos 50 años, rostro largo, bigote y perilla entrecanos, armadura vieja funcional; Sancho más bajo y robusto, campesino con camisa de lino y chaleco ocre; Rocinante caballo viejo y flaco pardo claro; rucio burro gris. Mantener continuidad facial y de vestuario con `personajes_referencia.webp`. Sin letras, UI, rótulos, marcas de agua, collages, estética infantil, fantasía épica, anacronismos modernos ni escenas violentas innecesarias.

## Variaciones narrativas

| ID | Variación descriptiva sobre el prompt base | Uso |
|---|---|---|
| `personajes_ref` | Don Quijote y Sancho montados en Rocinante y el rucio, detenidos en un camino manchego amplio al atardecer. | Referencia artística de identidad. |
| `p1_c01_biblioteca_pre` | Alonso Quijano sin armadura, leyendo con pasión un libro de caballerías en una habitación modesta con libros encuadernados y vela. | Contexto temprano. |
| `p1_c02_primera_salida_pre` | Primera salida de Don Quijote **solo** con Rocinante, sin Sancho ni rucio; deja atrás un pueblo y cruza un puente al alba. | Antes del encuentro con otros personajes. |
| `p1_c02_venta_pre` | Don Quijote montado se aproxima a una **venta rural real** y humilde; la imagina grandiosa pero no debe dibujarse un castillo real. | Antes de entrar en la venta. |
| `p1_c08_molinos_pre` | Varios molinos manchegos históricos en el horizonte; Don Quijote señala, Sancho advierte; ninguno carga ni cae aún. | Antes del choque; preguntas compatibles solamente. |
| `p1_c08_molinos_post` | Una lanza quebrada en el suelo junto al molino; Don Quijote arrodillado y Sancho se acerca a socorrerlo, sin heridas gráficas. | Después del choque; revelación. |
| `p1_c11_cabreros_pre` | Reunión de Don Quijote, Sancho y cabreros junto a hoguera con pan, cuenco y cabras al fondo, noche clara. | Situación previa o durante diálogo. |
| `p1_c18_rebanos_pre` | Rebaños de ovejas, polvo y pastores de la Mancha; Don Quijote señala desde Rocinante, Sancho observa; sin batalla. | Antes de confusión/desenlace. |
| `p2_c41_clavileno_pre` | Jardín de un palacio ducal, caballo de **madera** sobre plataforma, Don Quijote y Sancho expectantes, servidores cómplices; ninguna magia real. | Antes de la falsa aventura aérea. |
| `p2_c61_barcelona_pre` | Primera vista del mar y Barcelona amurallada en el siglo XVII, barcos de vela y amanecer; protagonistas en camino costero, sin duelo. | Entrada en la ciudad. |
| `p2_c74_despedida_post` | Alonso Quijano sin armadura en cama de su hogar, lúcido y delicado; Sancho junto a él emocionado, escudo y lanza apartados. | Final de la obra; revelación máxima. |

## Segunda batería — ampliación por capítulos

| ID | Variación sobre el prompt base | Uso |
|---|---|---|
| `p1_c03_investidura_post` | El ventero improvisa la investidura con una espada ante Don Quijote arrodillado, mujeres de la venta presentes, patio iluminado por antorchas, **sin Sancho**. | Desenlace de la investidura. |
| `p1_c06_escrutinio_pre` | Cura y barbero examinan libros de caballería en una casa manchega, sobrina y ama observan, **sin quema ni Don Quijote**. | Inicio del escrutinio. |
| `p1_c20_batanes_pre` | Don Quijote y Sancho escuchan ruidos nocturnos en una vaguada junto al agua; **mantener oculto el ingenio que los produce**. | Suspense previo. |
| `p1_c22_galeotes_pre` | Un grupo de presos conducidos por guardias en un camino, Don Quijote interroga a uno, Sancho observa; **sin liberar a nadie aún**. | Contexto del encuentro. |
| `p1_c25_sierra_morena_pre` | Don Quijote contemplativo y Sancho preocupado en un barranco boscoso de Sierra Morena, luz rasante, Rocinante cerca. | Antes de la penitencia. |
| `p1_c35_cueros_vino_post` | Don Quijote dormido en camisa con espada frente a odres de vino ya rajados, vino tinto en el suelo, Sancho y ventero alarmados; **no sangre**. | Resultado del equívoco. |
| `p1_c46_carro_enjaulado_post` | Don Quijote dentro de una jaula de madera sobre un carro tirado por bueyes y Sancho al lado en el rucio. | Después del fingido encantamiento. |
| `p2_c10_dulcinea_pre` | Sancho señala a tres campesinas montadas sobre burros camino del Toboso; Don Quijote mira desconcertado, **sin transformación mágica real**. | Inicio del engaño. |
| `p2_c17_leones_pre` | Un león en un carro con barrotes, Don Quijote desafiante, Sancho y el Caballero del Verde Gabán a distancia; **no mostrar la reacción final del animal**. | Antes del desenlace. |
| `p2_c26_retablo_pre` | Venta nocturna, teatro de títeres de maese Pedro, público atento, Don Quijote y Sancho observan, **espada envainada y títeres intactos**. | Antes de la interrupción. |
| `p2_c45_barataria_pre` | Sancho sentado como gobernador escucha a dos litigantes en una sala de justicia rural, sin vestuario judicial moderno. | Inicio del gobierno. |
| `p2_c64_blanca_luna_pre` | Don Quijote y el Caballero de la Blanca Luna a caballo se encaran en una playa histórica de Barcelona, **sin combate ni resultado**. | Desafío previo. |

## Tercera batería — escenas y personajes secundarios

| ID | Variación sobre el prompt base | Uso |
|---|---|---|
| `p1_c14_marcela_discurso_pre` | Marcela, pastora autónoma y de porte firme, defiende su libertad desde unas rocas del monte ante pastores que la escuchan; bosque y luz natural, **sin sexualización ni ilustrar un castigo**. | Discurso de Marcela. |
| `p1_c21_mambrino_pre` | Un barbero de pueblo cabalga bajo la llovizna con una **bacía de latón** brillante sobre la cabeza; Don Quijote lo divisa desde lejos y Sancho duda. **No mostrar conquista ni casco mágico real**. | Equívoco previo. |
| `p1_c23_maleta_sierra_morena_pre` | Sancho y Don Quijote encuentran una maleta abandonada entre piedras y matorrales de Sierra Morena; sin revelar contenido ni identidad del dueño. | Misterio previo. |
| `p1_c30_dorotea_micomicona_pre` | Dorotea caracterizada como la supuesta princesa Micomicona pide ayuda al caballero en un claro de Sierra Morena; Sancho escucha, utilería sobria, **sin palacio fantástico**. | Inicio de la farsa. |
| `p1_c38_armas_letras_pre` | Cena y conversación en la venta, Don Quijote reflexiona sobre armas y letras ante viajeros iluminados por velas; libros y armas sencillas, intimidad narrativa. | Discurso durante tertulia. |
| `p2_c01_recuperacion_pre` | En la casa de Alonso Quijano, cura y barbero lo visitan mientras descansa sin armadura; ambiente manchego cotidiano y luz de ventana. | Conversación inicial de la segunda parte. |
| `p2_c20_bodas_camacho_pre` | Festejo campesino de las bodas de Camacho con mesas, viandas y músicos del siglo XVII; Sancho contempla la comida y Don Quijote observa; **sin revelar el ardid de Basilio**. | Celebración previa. |
| `p2_c22_cueva_montesinos_pre` | Entrada rocosa a la cueva de Montesinos; Don Quijote ceñido con cuerda se prepara para bajar mientras Sancho y un guía lo sujetan, **sin interior onírico ni desenlace**. | Antes del descenso. |
| `p2_c29_barca_encantada_pre` | Orilla de río ancho y una pequeña barca de madera amarrada; Don Quijote pretende embarcar mientras Sancho duda, molino lejano sin destacar ningún peligro, **sin magia visible**. | Antes de navegar. |
| `p2_c30_duquesa_caceria_pre` | Encuentro de Don Quijote y Sancho con una duquesa aristocrática a caballo acompañada de cazadores y perros en un bosque; telas y armamento de caza verosímiles. | Primer encuentro ducal. |
| `p2_c54_ricote_sancho_pre` | Sancho se reúne con Ricote, antiguo vecino morisco retornado, y comparte un almuerzo campestre con otros viajeros; escena humana respetuosa, sin exotizar. | Reencuentro y diálogo. |
| `p2_c62_imprenta_barcelona_pre` | Taller de imprenta barcelonés del siglo XVII, prensa manual de madera, cajistas, pliegos y Don Quijote observando curiosamente el trabajo; **sin textos legibles ni tecnología industrial moderna**. | Visita a la imprenta. |

## Cuarta batería — capítulos adicionales sin ilustraciones previas

| ID | Variación sobre el prompt base | Uso |
|---|---|---|
| `p1_c07_segunda_salida_pre` | Don Quijote sale discretamente de su aldea acompañado **por primera vez** por Sancho montado en rucio; penumbra anterior al alba. | Inicio de la segunda salida, distinto del capítulo 2. |
| `p1_c09_manuscrito_toledo_pre` | En el Alcaná de Toledo un lector anónimo descubre y adquiere cuadernos manuscritos; **narrador-marco, sin Don Quijote ni Sancho**. | Hallazgo de la narración de Cide Hamete; letra ilegible. |
| `p1_c17_manteo_sancho_post` | En patio de venta varios hombres mantean a Sancho sobre una tela, Don Quijote impotente fuera; humor físico, sin heridas. | Desenlace: spoiler alto. |
| `p1_c19_cortejo_encamisados_pre` | De noche, cortejo de hombres con camisas blancas, antorchas y litera cubierta; Don Quijote y Sancho se detienen a observar. | Antes del enfrentamiento; sin fantasmas reales. |
| `p1_c33_curioso_impertinente_pre` | Patio renacentista florentino: conversan Anselmo y Lotario, Camila permanece al fondo; **novela intercalada, no aventura de Don Quijote**. | Presentación de personajes, sin revelar consecuencias. |
| `p1_c52_procesion_disciplinantes_pre` | Procesión penitencial castellana humilde con imagen devocional en andas; Don Quijote y Sancho la observan; sin flagelación ni ataque. | Antes del conflicto. |
| `p2_c03_sanson_carrasco_pre` | Sansón Carrasco, bachiller joven, conversa con Don Quijote y Sancho sobre un libro impreso en una casa modesta; portada sin palabras legibles. | Conversación sobre la fama de sus aventuras. |
| `p2_c08_toboso_noche_pre` | Don Quijote y Sancho recorren de noche calles reales y humildes del Toboso buscando el supuesto palacio de Dulcinea; **sin mostrar a Dulcinea ni castillo**. | Búsqueda nocturna. |
| `p2_c11_carreta_comediantes_pre` | Carro de cómicos ambulantes con **disfraces humanos teatrales** de Muerte y diablo; Don Quijote los observa, Sancho duda. | «Cortes de la Muerte», sin supernaturalidad. |
| `p2_c50_teresa_carta_pre` | Teresa Panza y Sanchica reciben de un paje una carta sellada en su hogar de aldea, **sin Sancho ni Don Quijote**, sin texto legible. | Carta del palacio ducal. |
| `p2_c60_roque_guinart_pre` | En un bosque catalán Roque Guinart y sus hombres con armas históricas bajas reciben a los viajeros, sin disparar. | Encuentro con el bandolero. |
| `p2_c63_galeras_barcelona_pre` | Cubierta de galera mediterránea a comienzos del XVII: remeros, marineros, aparejos, Don Quijote y Sancho; sin persecución ni revelación. | Visita marítima previa a la aventura de Ana Félix. |

## Quinta batería — ampliación de capítulos

| ID | Variación sobre el prompt base | Uso |
|---|---|---|
| `p1_c05_pedro_alonso_auxilio_post` | Pedro Alonso, labrador, socorre al hidalgo exhausto junto a un camino manchego; Rocinante cerca, **sin Sancho**. | Rescate tras el percance; desenlace. |
| `p1_c16_maritornes_venta_pre` | Maritornes y las mujeres de la venta cuidan a Don Quijote en un lecho humilde, con Sancho en segundo término. | Hospitalidad previa al equívoco nocturno; sin sexualizar. |
| `p1_c24_cardenio_sierra_morena_pre` | Cardenio, joven noble desaliñado y afligido, habla con Don Quijote y Sancho entre rocas y encinas. | Inicio de su relato; sin revelar conflictos. |
| `p1_c36_dorotea_reencuentro_post` | Dorotea, Luscinda, Cardenio y don Fernando se reconocen con emoción en la venta. | **Spoiler alto:** reencuentro y reconciliación. |
| `p1_c41_zoraida_cautivo_barca_pre` | Zoraida y el cautivo Ruy Pérez viajan con acompañantes en una embarcación mediterránea nocturna; **relato interpolado, no aventura vista por Don Quijote**. | Travesía del relato del cautivo. |
| `p1_c45_bacia_disputa_post` | Debate cómico y abarrotado en la venta; el barbero muestra una bacía de latón, Don Quijote defiende su supuesto yelmo. | **Spoiler alto** del equívoco de Mambrino. |
| `p2_c13_escuderos_bosque_pre` | Sancho y otro escudero comparten pan y conversación junto a una pequeña hoguera nocturna; no mostrar identidad posterior. | Coloquio de los dos escuderos. |
| `p2_c18_lorenzo_poesia_pre` | Lorenzo lee versos sin palabras legibles a Don Quijote en el patio de don Diego de Miranda. | Conversación sobre la poesía. |
| `p2_c21_basilio_bodas_post` | Basilio representa su ardid ante Quiteria e invitados a las bodas; gesto teatral, **sin sangre ni desenlace final**. | **Spoiler alto:** giro del episodio. |
| `p2_c35_merlin_mascarada_pre` | En el bosque de los duques aparece un **actor humano** vestido de Merlín en una función nocturna con antorchas y decorados. | Mascarada cortesana, no magia real. |
| `p2_c47_pedro_recio_mesa_pre` | El médico Pedro Recio ordena retirar los platos ante el hambriento Sancho gobernador en Barataria; sin vestimenta médica moderna. | Humor de gobierno. |
| `p2_c55_sancho_rucio_sima_post` | Sancho protege al rucio desde el fondo de una sima rocosa con luz y una cuerda desde la abertura, sin heridas. | **Spoiler alto:** consecuencia de la caída. |

Para regenerar o ampliar una escena, conservar el ID semántico si solo se reemplaza su versión gráfica y registrar una nueva revisión de fichero/hash en `manifest.json`. Si cambia el episodio, la pregunta asociada o la fase narrativa, asignar ID nuevo y revisar enlaces editoriales.

## Sexta batería — nuevos capítulos sin recreación previa (2026-11-06)

| ID | Escena | Uso |
|---|---|---|
| `p1_c04_mercaderes_pre` | Don Quijote solo ante unos mercaderes de Toledo en un camino manchego; conversación tensa, antes del desenlace, sin Sancho. | Previo al conflicto. |
| `p1_c12_grisostomo_relato_pre` | El cabrero Pedro relata junto al fuego la historia de Grisóstomo ante Don Quijote y Sancho; sin funeral ni aparición de Marcela. | Presentación de relato. |
| `p1_c27_cura_barbero_disfraz_pre` | Cura y barbero preparan su estratagema en Sierra Morena, con ropas humildes, antes de ejecutarla. | Planificación. |
| `p2_c04_sancho_sanson_pre` | Sansón Carrasco conversa con Sancho y Don Quijote en patio rural; sin imprenta ni libros legibles. | Diálogo. |
| `p2_c14_caballero_espejos_pre` | Encuentro a caballo en bosque entre Don Quijote y caballero de los Espejos, identidad oculta y sin choque. | Previsto al duelo. |
| `p2_c43_consejos_sancho_pre` | Don Quijote aconseja afectuosamente a Sancho antes de su gobierno, estancia ducal sin trono. | Consejos. |

Todas siguen el prompt base, son recreaciones originales IA y requieren cotejo textual/editorial antes de uso jugable.

## Séptima batería — nuevos capítulos (2026-11-06)

| ID | Variación narrativa del prompt base | Función |
|---|---|---|
| `p1_c10_dialogo_victoria_pre` | Don Quijote y Sancho conversan en camino manchego tras encuentro con el vizcaíno, sin representar batalla. | Diálogo y transición. |
| `p1_c13_camino_entierro_pre` | Viajeros y pastores de camino al entierro de Grisóstomo conversan con los protagonistas; sin cadáver ni sepultura. | Contexto previo. |
| `p1_c15_rocinante_yeguas_pre` | Rocinante se acerca a unas yeguas que pacen; Sancho y Don Quijote descansan lejos, sin agresión. | Inicio del incidente. |
| `p2_c12_caballero_bosque_noche_pre` | Don Quijote conversa a oscuras junto al fuego con caballero desconocido; identidad oculta. | Suspense. |
| `p2_c31_recepcion_duques_pre` | Entrada solemne de Don Quijote y Sancho en estancia de los duques, indumentaria cortesana plausible. | Recepción. |
| `p2_c51_sancho_gobernador_cartas_pre` | Sancho gobernador considera una carta y gestiones ante vecinos en Barataria; sin elementos modernos. | Gobierno. |

Recreaciones IA originales, no fuentes históricas; pendiente cotejo con el texto y examen de spoilers.

## Octava batería — capítulos sin recreación anterior (2026-11-06)

| ID | Variación narrativa del prompt base | Uso |
|---|---|---|
| `p1_c26_sancho_mision_pre` | Sancho, solo con rucio y el encargo de Dulcinea, atraviesa un sendero de Sierra Morena. | Tránsito narrativo. |
| `p1_c32_venta_libros_pre` | Un ventero saca libros y escritos que examinan cura, barbero y huéspedes de la venta, a la luz de velas. | Historia de los libros. |
| `p1_c40_relato_cautivo_pre` | En un relato intercalado, un cautivo cristiano contempla el puerto norteafricano desde una terraza; no es aventura de don Quijote. | Marco del relato del cautivo. |
| `p2_c16_verde_gaban_pre` | Encuentro de don Quijote y Sancho con don Diego de Miranda, caballero con indumentaria verde de época. | Presentación. |
| `p2_c27_maese_pedro_identidad_pre` | Maese Pedro junto a su retablo, su mono y sus bultos de titiritero en venta, sin revelar identidad. | Contexto del titiritero. |
| `p2_c38_duena_dolorida_pre` | Presentación teatral de la Dueña Dolorida en palacio, acompañantes veladas, mascarada humana sin magia real. | Entrada de personaje. |

Todas son recreaciones originales con IA, de uso contextual previo y pendientes de cotejo filológico y validación editorial.
