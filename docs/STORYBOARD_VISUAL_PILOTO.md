# R06 — STORYBOARD VISUAL DEL PILOTO (Modo Historia)

**Versión:** 0.1, propuesta de dirección artística · **Fecha:** 2026-11-06 · **Prioridad:** P0  
**Responsabilidad:** R06 (dirección artística); revisión vinculante pendiente de R01/R05/R08/R09/R12/R13/R14.  
**Ámbito:** piloto de seis capítulos (I,6; I,8; I,11; I,18; II,1; II,74). Desarrollo B01–B09 **solo** para DQ.SC.P1.C08.01.  
**Estado general:** STORYBOARD_PROPUESTO; no modifica catálogo, manifiestos, interfaces ni estado de aprobación de las imágenes. No autoriza producir imágenes nuevas.

## 1. Fuentes, nivel de evidencia y decisiones no reabiertas

Fuentes consultadas en la rama principal de JavierRB35/El_Quijote_App (2026-11-06): docs/ENCARGO_MAESTRO.md; AGENTS.md; docs/VISION_Y_DECISIONES.md; docs/GOBERNANZA_GIT.md; docs/FICHA_ESCENA_P1_C08_MOLINOS.md (v1.1); docs/DOSSIER_ARTISTICO_H4.md (v0.1); docs/DIRECCION_ARTISTICA.md (especialmente §9); docs/DIRECCION_ARTISTICA_PILOTO.md; docs/DC_IMG_001_ASIGNACION_INTEGRAL_ASSETS.md; docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md; docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md; docs/REVISION_EDITORIAL_ESCENAS.md; assets/scenes/manifest.json (paquete visual v14); assets/closeups/manifest.json (v1); assets/scenes/PROMPTS_REGENERACION.md. Comprobaciones de fidelidad: texto PG 2000 citado y cotejado en ficha H3; para las incidencias I,6/I,7 y II,1 se cotejaron además las ediciones accesibles de Cervantes (véase docs/REVISION_ARTISTICA_BRIEFS_H4.md).

**Reglas cerradas:** dramaturgia fiel a Cervantes; 2.5D mediante imágenes inmóviles con movimiento sutil *solo cuando el asset lo permita*; narración de historia fluida y preguntas voluntarias; no alterar el desenlace; TS-001 (cada intervención íntegra, siempre legible con o sin voz); ningún texto sobre rostro, gesto, lanza, aspas ni información necesaria; respetar reducción de movimiento; licencia y spoiler por fase; uso contextual, no forzado, de imágenes. La documentación del piloto **no equivale a aprobación de recursos**.

**Alcance real de esta inspección:** se leyeron las fichas y metadatos de los dos manifiestos; las 253 entradas del manifiesto de escenas y los 10 primeros planos mantienen review_state=borrador; closeups.catalog_status=editorial_review_pending. H4 registra dos inspecciones anteriores con PASS (referencia de personajes y molinos_pre), pero ninguna elevación editorial. **No se realiza aquí una nueva certificación de píxeles, máscaras/zonas seguras, vestuario ni montaje reproducido.** Las regiones espaciales siguientes son *candidatas de composición*, no medidas de píxel verificadas.

## 2. Diccionario de recursos reales y reconciliación provisional

El campo candidate_media_id del manifiesto visual es **DQ.MED.***, no el identificador canónico final **DQ.MA.*** del contrato. Referenciar en producción por ruta física + ID candidato hasta que R05/R09 validen tabla de alias; **no crear un alias definitivo a partir de una similitud numérica**.

| Clave de storyboard | Recurso físico en GitHub | ID candidato del manifiesto | Función permitida |
|---|---|---|---|
| M-SIL | assets/scenes/part_1/chapter_08/p1_c08_molinos_siluetas_pre.webp | DQ.MED.900231 | Plano de establecimiento, molinos reales y monturas lejanas; antes del choque |
| M-PRE | assets/scenes/part_1/chapter_08/p1_c08_molinos_pre.webp | DQ.MED.900005 | Plano medio/general del señalamiento y advertencia; no contiene carga ni caída |
| M-POST | assets/scenes/part_1/chapter_08/p1_c08_molinos_post.webp | DQ.MED.900006 | Don Quijote caído, lanza rota y Sancho aproximándose; después de narrar el impacto |
| CU-PR | assets/closeups/don_quixote_proud.webp | DQ.MED.901007 | Orgullo/euforia, posible inserto en B02 |
| CU-DE | assets/closeups/don_quixote_determined.webp | DQ.MED.901004 | Resolución de actuar, posible B04 |
| CU-BA | assets/closeups/don_quixote_battle.webp | DQ.MED.901003 | Tensión heroica durante B05 o **antes** del impacto de B06 |
| CU-MA | assets/closeups/don_quixote_battered.webp | DQ.MED.901002 | Consecuencia física en B07/B08, nunca antes de la caída |

**Incidencia de identidad:** la ficha H3 menciona DQ.MA.900030 para M-SIL, mientras su ruta física consta con DQ.MED.900231. El manifiesto no autoriza equiparar ambos IDs. No usar DQ.MA.900030 como clave de archivo sin migración verificada; véase revisión H4 §3.

## 3. Gramática del montaje, duración y TS-001

**Unidad de duración:** U = duración relativa de un tramo sencillo de narración, no segundos fijos. Cada beat mantiene en pantalla I01–I16 exactamente como consta en ficha H3, incluidos incisos del narrador y rótulo de hablante, con control de pausa/repetición/retroceso. La duración real es **máximo de voz y lectura accesible**, nunca una cuenta atrás; cifras U son pesos de montaje para planificación, no límites de lectura. No se omitirá I07 al montar el ataque ni I16 al transicionar. Ninguna locución está disponible actualmente; los cues son propuestas para R07.

**Tipología de planos:** G=general amplio; M=medio de personajes; PP=primer plano; D=detalle/recorte; NI=narración ilustrada (texto+ambiente con escena estable). Alternar G/M/PP por necesidad expresiva, no por cuota. Los recortes sobre un mismo WebP son **alternativas de encuadre**, no cámaras reales ni capas 3D existentes. Ningún parallax o animación de aspa, polvo o ropa se presenta como recurso ya producido.

**Zona TS candidata (coordenadas normalizadas del fotograma 0–1):**
- **Z-R**: lateral derecho, x≈0,64–0,98; ancho útil sujeto a comprobación de caras, aspas y lanza. Los textos largos de I02, I07, I11 e I14 necesitan panel opaco/estable y espacio ampliable; no afirmar que Z-R basta sin layout y accesibilidad reales.
- **Z-I**: banda *externa* bajo fotograma, separando imagen y texto; preferida cuando los molinos, manos o gestos ocupen la zona derecha. Mantener relación de aspecto o reencuadrar sin ocultar evidencia.
- **Z-D**: vista dividida: imagen íntegra en zona propia y texto en lateral propio. Obligatoria si no cabe texto ampliado de forma simultánea con acción.

En todos los casos se protege el rostro y la mano de Sancho, mirada/lanza de Don Quijote, silueta/aspas relevantes, Rocinante, lanza rota y gesto de socorro. **Ninguna región Z-R está aprobada por píxel**; los 253 preferred_overlay_side=right del manifiesto son preferencia, no máscara geométrica. Un zoom solo existe si se acepta el recorte en 16:9 a 1080p/1440p/4K y con texto aumentado. Movimiento reducido: fotogramas inmóviles y corte/disolvencia sin desplazamiento, mismo texto y orden. Las preguntas optativas son hitos de pausa, nunca requieren responder para avanzar.

## 4. Mapa de montaje B01–B09

| Beat / intervenciones | Imagen principal y alternativa | Emoción / función narrativa | Plano, duración U y transición | Spoiler / TS-001 / validación |
|---|---|---|---|---|
| **B01 · I01** | **M-SIL**; alternativo M-PRE en G distante | Calma, realidad objetiva antes del delirio; instalar geografía | G 0,8–1,1 U; entrada por disolvencia, acercamiento apenas perceptible opcional | Antes de conflicto; Z-I si los molinos ocupan derecha. **CANDIDATA** |
| **B02 · I02** | **M-PRE**; inserto opcional CU-PR | Euforia y grandilocuencia del «botín»; paradoja del caballero | M/G 1,8–2,4 U; corte desde loma, inserto PP solo en pausa natural | Imagen enseña molinos, no gigantes; evitar anteponer respuesta a preguntas sobre percepción; Z-R o Z-D para I02 larga. **CANDIDATA** |
| **B03 · I03–I04** | **M-PRE** mantenida; alternativa M-SIL como contraplano amplio | Incredulidad de Sancho y «brazos» hiperbólicos de DQ | M sostenido 0,9–1,3 U; corte únicamente entre réplicas si aporta claridad | Antes del ataque; Z-R inferior si no cubre manos/aspas. **NARRACIÓN ILUSTRADA SUFICIENTE, pendiente QA** |
| **B04 · I05–I06** | **M-PRE**; opcional CU-DE en respuesta final de DQ | Sabiduría práctica versus certeza autosuficiente; punto de no retorno | M→PP corto o M sostenido 1,7–2,3 U; corte sobrio | Reproducción del diálogo previo sin ataque; Z-D si la corrección completa no cabe. **CANDIDATA/NI** |
| **B05 · I07–I08** | **M-PRE** en recorte lateral + CU-BA **candidato**; M-SIL de orientación | Advertencia desoída; coraje desproporcionado; progresión hacia peligro | M→PP→G 1,8–2,5 U; encadenar ritmo con voz y viento, **no simular galope inexistente** | Prohibido M-POST aquí. Z-R/Z-D sin tapar lanza ni aspas. **SOLUCIÓN NARRADA CON APOYO, sin toma literal de carga** |
| **B06 · I09–I11** | **M-PRE** o M-SIL *hasta* que I11 narre el impacto; **M-POST solo después** | Aspas indiferentes, choque físico y derrumbe de la épica | G estable→corte/silencio 1 s propuesto→M-POST, 2,1–2,8 U; ningún golpe inventado | Spoiler alto a partir del impacto; Z-I o Z-D durante I11. **CANDIDATA MIXTA; VALIDACIÓN DE REVEAL PENDIENTE** |
| **B07 · I12** | **M-POST**; opcional CU-MA al final | Sancho pasa del aviso al socorro; cuidado real | M estable 0,8–1,2 U; ligero acercamiento no requerido | Solo after; Z-R/Z-I evitando a Sancho y la lanza. **CANDIDATA** |
| **B08 · I13–I15** | **M-POST** sostenida + CU-MA (dolor físico); **CU-PR** solo si la dignidad coincide con vestuario y luz | Regañina, racionalización de Frestón, ternura resignada | M→PP breve→M/NI, 2,7–3,8 U; espacio respirado entre I13/I14/I15 | Spoiler alto; NO mostrar a Frestón ni gigantes como hecho. I14 exige Z-D o Z-I amplio, sin ocultar gestos. **COBERTURA DRAMÁTICA PARCIAL, sin contraplano propio de Sancho** |
| **B09 · I16** | **M-POST** en salida; alternativa recorte neutro de paisaje de M-SIL **solo tras revisar que no “resetea” monturas/lanza** | Restituir vínculo; salida hacia Puerto Lápice, sin anticipar frailes | G/NI sostenido 0,7–1 U; disolvencia a negro / próximo plano del camino solo en episodio siguiente | Post y enlace; Z-I. No utilizar M-SIL si devuelve a DQ antes del golpe. **NARRACIÓN ILUSTRADA SUFICIENTE** |

**Clave de validación:** “candidata” significa archivo referenciado y plausible por sus metadatos y por el informe visual histórico limitado de M-PRE, **NO** recurso editorial o artísticamente aprobado. La ficha H3 mantiene GUIONIZADA_PROPUESTA. Las duraciones U no pueden validarse sin pruebas con 16 intervenciones completas, audio/sin audio y texto ampliado.

## 5. Planos y decisiones expresivas por beat

### B01 — Ver antes de interpretar
M-SIL introduce el terreno como testigo objetivo; la narración dice «treinta o cuarenta molinos». No intercalar gigante fantaseado: se perdería la doble focalización del narrador. Un avance mínimo de cámara es admisible **solo si existe margen real de recorte**. Mantener lectura íntegra de I01 en Z-I; los molinos del horizonte son zona protegida. Validación editorial: el número visible de molinos no sirve para contestar preguntas sobre cantidad (la evidencia es el texto).

### B02 — El orgullo en una sola apuesta
Cortar a M-PRE cuando DQ señala los molinos; conservar el brazo en cuadro. CU-PR puede dar expresividad *solo si* su armadura, casco, dirección de luz y ángulo se corresponden con M-PRE; un retrato genérico de orgullo no debe romper la escena. I02 es extensa: mantener composición estática o pasar a Z-D en lugar de acelerar el diálogo. No dibujar gigantes ni mostrar consecuencia.

### B03 — Contraplano verbal, no montaje nervioso
Las réplicas breves I03/I04 funcionan mejor con plano sostenido: el texto y el contraste entre brazos imaginados y aspas reales cuentan el chiste. Alternar a M-SIL únicamente si ayuda a orientar al espectador. Evitar CU-SURPRISED: DQ no se asombra, sostiene una certeza falsa. Sancho necesita presencia legible; no existe PP de Sancho inventariado.

### B04 — Razón frente a voluntad
Mantener rostro/gesto de Sancho y la respuesta de DQ dentro de M-PRE. CU-DE se reserva a las palabras finales «fiera y desigual batalla», no a la explicación técnica; la inserción evitará sugerir que Sancho cambia de opinión. TS-001 íntegro para I05/I06, incluidos los incisos de narrador en el texto visible. Las preguntas voluntarias vinculadas por ficha (Q.101, Q.109) pueden ofrecerse **al terminar** el diálogo.

### B05 — Decidir la carga sin falsificar movimiento
El dossier H4 solicitaba imagen inédita. Para R06 se ensaya primero una **elipsis cinematográfica documentada**: el último gesto de M-PRE, inserto CU-BA si supera continuidad, encuadre G de M-SIL y arenga I07/I08 acompañada de ambiente. Esto cuenta decisión, advertencia y amenaza **pero no prueba visualmente la carrera ni el brazo alzado de Sancho**. No deformar una foto fija mediante desplazamientos grandes ni montar un falso choque. La falta de un plano literal queda como **mejora opcional condicionada a test de comprensión**, no recurso creado. Nunca suprimir «ni oía las voces de su escudero Sancho».

### B06 — Causa, choque y consecuencia separados
Mientras se oyen I09/I10, mostrar aspas y mantener el mundo físico. El silencio de 1 segundo antes del golpe es **cue de audio propuesto**, no reemplazo del texto. Durante la narración I11 mantener fotograma seguro hasta que el texto establezca el impacto; solo entonces pasar a M-POST. No adelantar la lanza rota ni al caído por acelerar el montaje. CU-BA, si se usa, entra **antes** del golpe; CU-MA, **después**. Si no es posible un corte sincronizado con el texto, preferir NI con montaje pausado.

### B07 — Del reproche futuro al auxilio presente
M-POST contiene en su alt a Sancho aproximándose al caído; no crear una segunda escena. Un acercamiento a CU-MA es opcional y solo después de que el texto describa las consecuencias. La zona de texto debe respetar la figura del escudero que avanza. El vínculo humano prima sobre cualquier animación de impacto.

### B08 — La herida no modifica la creencia
El valor está en la oposición entre el reproche de Sancho y el recurso al encantador Frestón. M-POST mantiene continuidad física y CU-MA permite leer sufrimiento, pero **un PP de DQ no sustituye por sí mismo un gesto de Sancho**. CU-PR podría representar la convicción intacta, nunca victoria triunfal. No elegir CU-THOUGHTFUL si sugiere revisión escéptica de los hechos. Mantener completos I13, I14, I15; la réplica larga de Frestón requiere panel de lectura dedicado o vista dividida que conserve rostros. La falta del contraplano exacto (Sancho regañando junto a DQ sentado) se mantiene registrada como **opción de acabado**, no bloqueo narrativo.

### B09 — Salida sin borrar la caída
I16 exige que Don Quijote vuelva a montar un Rocinante maltrecho; no debe implicarse mágicamente una lanza restaurada. Conservar M-POST mientras el narrador presenta la ayuda y fundir hacia un tramo de camino neutro si existe encuadre revisado. No usar imagen de frailes o vizcaíno como si perteneciera a B09: esos acontecimientos llegan después. Final legible y reposado, con transición al siguiente episodio.

## 6. Evaluación de los diez primeros planos (candidatos, no obligatoriedad de uso)

Manifest: assets/closeups/manifest.json; **todos borrador**, 1254×1254, sin adscripción por episodio. Un primer plano *puede* aportar reacción, pero no demuestra continuidad de indumentaria, época de luz ni un evento con varios personajes.

| Primer plano / ID candidato | Uso justificado en molinos o piloto | Decisión actual |
|---|---|---|
| quixote_angry / DQ.MED.901001 | B04/B05 solo si “enfadado” se lee como determinación ante molinos y no agresión a Sancho | **Descartar de primera versión**: battle/determined son más precisos |
| quixote_battered / DQ.MED.901002 | B07/B08, nunca antes del choque; debe casar con herida/armadura de M-POST | **Candidato prioritario post**, condicionado a continuidad |
| quixote_battle / DQ.MED.901003 | B05/B06 antes de la caída; pone rostro a arenga épica | **Candidato**, no prueba de carga física |
| quixote_determined / DQ.MED.901004 | Final B04, certeza/decisión del caballero | **Candidato breve**, solo si no tapa a Sancho |
| quixote_frightened / DQ.MED.901005 | DQ no expresa miedo en B01–B09 | **No usar en molinos** |
| quixote_happy / DQ.MED.901006 | No hay alegría equivalente en el núcleo de molinos | **No usar en molinos** |
| quixote_proud / DQ.MED.901007 | B02 e, hipotéticamente, un matiz de B08 | **Candidato**; B08 exige cautela para no falsear la derrota |
| quixote_sad / DQ.MED.901008 | DQ no acepta su derrota como tristeza consciente | **No usar en molinos**; no reutilizar automáticamente en II,74 por armadura impropia |
| quixote_surprised / DQ.MED.901009 | Su interpretación de los molinos no es sorpresa durante el intercambio | **No usar en molinos** |
| quixote_thoughtful / DQ.MED.901010 | La invocación de Frestón no implica duda autocrítica | **No usar en B08**; candidato solo en otro guion validado |

**No existe primer plano de Sancho en este manifiesto.** El hecho no crea automáticamente un encargo: solo justificaría uno tras comprobar que los planos M-PRE/M-POST y recortes admitidos no cubren la función dramática exigida.

## 7. Piloto de seis capítulos: evaluación preliminar **por escena/fase**, no por beat

En esta sección la expresión “cubre” significa **cobertura narrativa candidata mediante archivos inventariados**; no significa veredicto visual APROBADO ni prueba de maquetación. No extender granularidad de B01–B09 a capítulos sin ficha H3.

| Capítulo y demanda | Recursos existentes y perspectiva alternativa | Uso de closeup / texto / spoiler | Cobertura y decisión R06 |
|---|---|---|---|
| **I,6 — escrutinio** | DQ.MED.900013 (cura, barbero, dos mujeres), 900230 (títulos/mesa), 900157 (ama/sobrina/libros) | Fases pre y diálogo; sin closeup de DQ, que no participa en el escrutinio. Tusell 020–021 para reveal con atribución | **Cubierto como escena I,6**. El fuego efectivo ocurre en **I,7**, por lo que el brief H4-03 no debe venderse como hueco intrínseco de I,6. |
| **I,8 — molinos** | 900231 G, 900005 M, 900006 post; frailes 900159 y vizcaíno 900133 **solo en sus escenas posteriores** | CU-PR/DE/BA/MA condicionales; B05/B08 con NI y PP, sin fingir toma literal | **9/9 beats con solución visual documentada**; dos aspiraciones de plano propio quedan pendientes de prueba, no bloquean comprensión |
| **I,11 — cabreros** | 900007 (hoguera/cena) → 900134 (discurso de Edad de Oro); Tusell 034–036 reveal contextual | No forzar closeup cuadrado de DQ por ruptura de luz nocturna; TS sobre plano estable | **Cobertura candidata completa**; revisar continuidad nocturna y rostros antes de aprobar |
| **I,18 — rebaños** | 900008 vista y polvareda pre; 900136 piedras post; Tusell 056 como puente de I,17, 057–058 solo tras revelación | No insertar CU-BA antes de justificar que el DQ de la carga armoniza con ovejas y fase. Humor en nombres y texto | **Cobertura candidata completa**; la carga puede narrarse ilustrada sin nuevo asset |
| **II,1 — conversación/relato interpolado** | 900029 sala/visita; 900179 discurso sobre caballerías. Los dos planes deben compartir espacio y luz | **Sin PP con armadura** del DQ ya convaleciente. La anécdota de Sevilla puede contarse sobre el rostro del barbero en el plano de visita; ninguna escena actual la representa literalmente | **Relato comprensible sin recreación**; vigneta específica solo si R01 aprueba guion fiel a Júpiter/Neptuno (revisión H4-04) |
| **II,74 — lucidez, testamento, muerte** | 900011 despedida, 900202 testamento; Tusell 371–373 tras la revelación y con crédito | **No usar closeups de DQ con armadura** en cama como Alonso Quijano; spoiler critical estrictamente al final | **Cobertura candidata suficiente**; validar vestuario de cama y grado de spoiler por estado |

**Prohibición de extrapolación:** los cuatro episodios adicionales con preguntas (I,1; I,16; I,21; II,10) citados en H4 son *contexto de inventario*, no cuatro nuevos capítulos del encargo de seis. Este documento no pretende guionizarlos a nivel beat ni presupone producción de los 126 capítulos.

## 8. Reapertura crítica de necesidades de imagen, después de la reutilización

| Necesidad originalmente declarada en H4 | Solución documental R06 actual | ¿Qué falta realmente? |
|---|---|---|
| BRIEF-H4-01, carga B05 | 900005 + 900231 + CU-BA *si pasa continuidad* + I07/I08 íntegros | Falta **imagen literal de carrera con Sancho advirtiendo**. **No bloqueante** por NI; optar a nueva imagen solo tras prueba de comprensión visual |
| BRIEF-H4-02, regañina B08 | 900006 + CU-MA/PR condicionados + I13–I15 íntegros | Falta **contraplano de Sancho reprendiéndolo**. **No bloqueante** si la actuación textual se sostiene; posible mejora expresiva, no necesidad demostrada |
| BRIEF-H4-03, hoguera I,6 | 900013/157/230 cubren I,6; su consecuencia real se cuenta en I,7 | **No es hueco propio de I,6**. Si H3 requiere visualizar la quema en I,7, redactar y revisar allí un brief nuevo, sin ventero |
| BRIEF-H4-04, Sevilla II,1 | 900029/179 + narración de barbero con TS-001; relato interpolado sin imagen literal | La vigneta del licenciado/Júpiter/Neptuno es **opcional**, nunca reutilizar la descripción errónea de la caña/abad |

**Dictamen R06 provisional:** **cero imágenes nuevas demostrablemente imprescindibles para contar estos seis capítulos con los recursos actuales**; permanecen **dos tomas específicas de molinos** (carga y contraplano de Sancho) y **una vigneta de II,1** como *posibles mejoras cinematográficas*, condicionadas a lectura de guion, inspección visual y QA. La hoguera se remite al tramo I,7 si se decide incluirlo como puente. “Cero imprescindibles” describe suficiencia narrativa *planificada*, **no** acredita satisfacción visual premium, licencias redistributivas, recortes ni integración técnica. La matriz se revisará solo con evidencias de fallo.

## 9. Riesgos, pruebas y puertas de aceptación

1. **Identidad de medio P0** — R05/R09/R14: tabla de equivalencias trazable ruta física → DQ.MED.* candidato → DQ.MA.* canónico, sin colisión, en especial M-SIL; no actualizar catálogo ni manifest desde este PR documental.
2. **Cervantes P0** — R01/R02: verificar cambio de fase I,6/I,7 y reescribir relato interpolado II,1; impedir ejecución de briefs H4-03/H4-04 vigentes.
3. **TS-001 P0** — R08/R09/R12: máscaras reales por plano; prueba I02/I07/I11/I14 con texto completo, 200 % de tamaño, mute, sin voz y en movimiento reducido; cero oclusiones, cero truncamientos, ninguna lectura obligada a velocidad fija.
4. **Revisión visual P0** — R06/R12: inspección de 900231/900005/900006 y closeups 901002/003/004/007 por separado y en secuencia; comprobar rostro, peinado, armadura, monturas, luz y posiciones; registrar capturas y veredicto, no ascender automáticamente review_state.
5. **Spoiler P0** — R15/R12: ninguna aparición de M-POST o CU-MA antes de I11; revisión específica de Q.112 (hotspot atribuido a acuarela Tusell 027 *solo tras revelar* o reformulación editorial) y de Q.101/Q.109.
6. **Continuidad P1** — R06/R04: misma media mañana B01–B09 (el “media tarde” de BRIEF-H4-02 es inconsistente); distinguir Sancho y Rocinante, lanza intacta→rota, DQ en suelo→ayudado a montar; no reutilizar retrato armado en II,74.
7. **Prueba cinematográfica P1** — R07/R08/R12: storyboard animatic en papel/simulación futura con tiempos condicionados a lectura, audios aún inexistentes; valorar comprensión de carga y regañina sin nuevas imágenes; si falla, elevar brief revisado a R14, no generar de oficio.

**Definición de terminado para R06:** nueve beats con media/fase/alternativa/función/duración/TS/emoción/spoiler/estado documentados (cumplido a nivel documental); los diez PP evaluados (cumplido); seis capítulos evaluados a granularidad honesta (cumplido); arte/QA y cambios de contrato **pendientes**. Este PR solicita **revisión por Coordinación y equipos implicados, no fusión**.