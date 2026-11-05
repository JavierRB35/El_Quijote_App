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

Para regenerar o ampliar una escena, conservar el ID semántico si solo se reemplaza su versión gráfica y registrar una nueva revisión de fichero/hash en `manifest.json`. Si cambia el episodio, la pregunta asociada o la fase narrativa, asignar ID nuevo y revisar enlaces editoriales.
