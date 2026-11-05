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

Para regenerar o ampliar una escena, conservar el ID semántico si solo se reemplaza su versión gráfica y registrar una nueva revisión de fichero/hash en `manifest.json`. Si cambia el episodio, la pregunta asociada o la fase narrativa, asignar ID nuevo y revisar enlaces editoriales.
