# DIRECTRIZ DC-37 — Experiencia visual cinematográfica premium: «Un lienzo vivo de La Mancha»

**Aprobación del propietario:** 2026-11-11, instrucción expresa de convertir en normativa oficial la propuesta integral de diseño visual premium y de dar prioridad a sus requisitos sobre las reglas anteriores incompatibles.  
**Estado normativo:** APROBADA para dirección de producto, diseño visual, especificación UX y futuro QA. **Implementación técnica: NO AUTORIZADA POR ESTA DECISIÓN; estado del código: SIN MODIFICAR por este acto.**  
**Repositorio y rama canónicos:** JavierRB35/El_Quijote_App, main.  
**Ámbito:** Modo Historia, Modo Aventura, menú principal y sistema visual transversal de los demás módulos.  
**Registro:** DC-37 de docs/VISION_Y_DECISIONES.md.  
**Relación:** sustituye parcialmente las disposiciones de presentación incompatibles de DC-22/TS-001, DC-28 y especificaciones de UX anteriores; conserva el resto de obligaciones, según §17.

## 1. Mandato, precedencia y condiciones innegociables

La experiencia de El Quijote se construirá como **una ventana cinematográfica al universo de Cervantes**. La imagen es el escenario protagonista; las palabras y las decisiones viven dentro de la escena en un **pergamino semitransparente**; los controles sirven al relato sin disputar el protagonismo visual.

Esta directriz no es una sugerencia estética. Una vez integrada en main, sus requisitos obligatorios prevalecen en el ámbito visual/UX definido frente a reglas anteriores incompatibles; ningún documento histórico, CSS existente o solución de prototipo puede rebajarlos. Se mantiene íntegra la autoridad de GitHub (DC-33), la conformidad documental (DC-32), las restricciones legales y de seguridad, la fidelidad literaria (DC-31), el flujo editorial DC-36, la aprobación del propietario sobre arte, la accesibilidad y los límites de fase. Una excepción de diseño exige una nueva aprobación expresa y documentada; no se deduce de una limitación técnica.

**Criterios P0 de aceptación visual:**
1. En Historia y Aventura, una **imagen narrativa ocupa toda la superficie útil jugable**, con texto superpuesto: queda descartada la pantalla dividida permanente imagen/columna de texto.
2. Todo texto narrativo, pregunta, opciones, consecuencia y control perteneciente al cuadro queda **íntegramente dentro de un pergamino histórico semitransparente**, con contraste real y sin recortes, desbordamientos, truncamiento ni scroll interno.
3. Ambas experiencias disponen de un **control accesible en la esquina superior derecha de la imagen** para ocultar voluntariamente el pergamino y recuperarlo completo.
4. La tipografía evocará la tradición editorial del Siglo de Oro sin sacrificar legibilidad, escala ni funcionamiento offline.
5. **No habrá fondos neutros o degradados vacíos como acabado final** de ninguna pantalla. El menú inicial tendrá obligatoriamente como fondo una imagen aprobada de **pueblo manchego de época integrado en paisaje característico de La Mancha**, con navegación en superficie tipo pergamino semitransparente.
6. Ningún recorte, transparencia, texto o control tapará o deformará rostros, acciones, objetos/pistas esenciales, hotspots o patrimonio.
7. Toda pantalla significativa superará QA visual, funcional, editorial y de accesibilidad. Lo que no supere uno de estos criterios no podrá declararse terminado.

## 2. Identidad artística y atmósfera

Concepto: **«El Quijote — Un lienzo vivo de La Mancha»**. Austeridad refinada, realismo cinematográfico con matiz pictórico, materiales históricos creíbles, luz natural y claroscuro verosímil, sentido de lugar y textura editorial sutil. Evitar estética infantil, fantasía heroica, barroquismo descontrolado, controles de oficina, efectos de videojuego estridentes o imágenes convertidas en meros adornos. La interfaz debe ofrecer tres experiencias coherentes: **contemplar**, **comprender** y **actuar**.

Paleta orientativa — nunca por delante del contraste: pergamino marfil #E8D8B5, arena envejecida #D9C398, tinta carbón cálido #29231D, sepia #4C3727, ámbar antiguo #B58B45, oliva seco #686A4C, cuero #6A4831 e índigo profundo #202A36. Los valores son candidatos para tokens, no recetas automáticas; deben verificarse en escenas reales.

## 3. Imagen protagonista de superficie completa

- La superficie útil de juego estará cubierta por una **escena visual validada**; ninguna columna, cabecera extensa, banda oscura o área de relleno neutral podrá disminuir artificialmente el lienzo narrativo en una pantalla visualmente aceptada. Los controles y rótulos se integran en capas discretas.
- La aplicación debe ajustar el encuadre de forma **no destructiva**. No estirar ni deformar; «cover» solo cuando el recorte probado respete todas las regiones críticas. Las acuarelas y demás obras patrimoniales se mostrarán íntegras cuando su naturaleza lo exija.
- Para cada imagen/estado se evaluarán sujeto, acción, pistas, área focal, región segura del pergamino, controles y cambios de aspecto. El área segura **no es universal**: la decisión depende de la imagen y de la resolución.
- Si no se puede llenar la superficie preservando lo esencial, se utilizará otro plano aprobado, una variante de composición válida o una extensión visual que haya sido solicitada y aprobada mediante el protocolo artístico. **No** se aceptará automáticamente una pantalla dividida ni una franja neutra como «solución» final. Registrar el bloqueo hasta resolverlo.
- Se admiten efectos cinematográficos **discretos y opcionales** —fundido entre planos, acercamiento o paneo muy lento si existen márgenes— sin deformar imágenes, adelantar acontecimientos ni dificultar la lectura. Respetar movimiento reducido.

## 4. Componente obligatorio: pergamino histórico semitransparente

El pergamino es la superficie de lectura e interacción **dentro de la imagen**. Tendrá material de papel/lino histórico en tonos cálidos, textura tenue detrás de las letras, borde sutilmente artesanal, filetes finos, ornamento mínimo, márgenes suficientes y sombra moderada. No debe parecer una tarjeta HTML genérica, un panel negro lateral ni un rollo caricaturesco.

**Transparencia:** fondo siempre perceptiblemente semitransparente al superponerse a imágenes; texto, iconos y controles interiores completamente opacos. Se podrá evaluar como **hipótesis**, nunca como valor impuesto, un alfa de 0,82–0,94; medir contraste en escenas claras, oscuras y con mucho detalle. Está prohibido convertir el fondo en un bloque opaco o dejarlo tan traslúcido que dificulte la lectura. No aplicar texturas intensas ni desenfoques perjudiciales.

**Contenido:** etiqueta de narrador/personaje, texto, contexto, pregunta, alternativas, consecuencia, feedback y controles internos, según el estado. Ningún contenido integrante sobresaldrá del pergamino ni quedará detrás de su borde/ornamentos. No incrustar el texto literario en el píxel de la imagen: debe ser texto real de interfaz, accesible, escalable y seleccionable cuando proceda.

**Posición:** automática o declarativa por imagen/estado según zonas seguras. Se evitará tapar caras, expresiones, gestos, acciones, pistas, interacciones y objetos significativos. El pergamino puede cambiar de posición/tamaño, conservando coherencia de conjunto y sin «parches» CSS específicos por capítulo.

## 5. Integridad del contenido: ninguna palabra fuera del pergamino

Norma **P0**: todas las letras, líneas, botones, alternativas, leyendas y controles interiores deben ser visibles, legibles e íntegros. Prohibidos el scroll vertical/horizontal interno del pergamino, overflow recortado, elipsis automática, texto cortado, botones que escapan de la caja y tamaños microscópicos.

Orden de adaptación:
1. Medir contenido y área segura reales por viewport y escala.
2. Ensanchar horizontalmente el pergamino dentro de las zonas seguras.
3. Ajustar altura y posición sin invadir información visual crítica.
4. Reducir primero márgenes excesivos y ornamentos.
5. Revisar espaciado; modificar tamaño tipográfico solo dentro de límites legibles y accesibles.
6. Buscar otra composición/plano validado.
7. Si una intervención sigue sin caber, someter a **revisión editorial** una partición en unidades narrativas sucesivas, completas y justificadas, sin omitir una sola palabra ni alterar la cronología, voz o referencias. No se permite segmentación arbitraria del DOM como sustituto editorial.
8. Si no existe una solución válida, **FAIL / NO CONFORME**: no permitir scroll interno, superposición, pantalla dividida por defecto ni ocultación silenciosa.

Cada unidad textual activa debe aparecer completa y permanecer disponible el tiempo necesario para ser leída; la voz nunca sustituye al contenido escrito. Aventura mostrará **a la vez** contexto, pregunta y todas las alternativas. El Lector, Museo, Atlas, Cuaderno y ajustes pueden conservar su scroll funcional habitual en vistas propias; esta excepción nunca permite scroll dentro de un **pergamino superpuesto narrativo o de decisiones**.

## 6. Control obligatorio «Ocultar texto / Mostrar texto»

En Historia y Aventura, el icono se situará en la **esquina superior derecha del área visual de la imagen**, respetando márgenes seguros, contraste, área pulsable y zonas importantes. Será reconocible (ojo abierto/tachado o equivalente verificado), con nombre accesible correcto por estado y foco de teclado visible. **No se oculta** al esconder el pergamino y no depende de que aparezca un menú o barra de reproducción.

**Estado inicial:** pergamino visible con contenido íntegro; nunca oculto automáticamente.

**Al pulsar «Ocultar texto»:**
- El pergamino desaparece suavemente y la imagen queda despejada de él.
- Se preservan exactamente intervención, respuesta aún no elegida, puntuación, posición, preferencias y guardado.
- En Historia se pausan voz, reproducción automática y temporizadores de avance/lectura; en Aventura no se envía respuesta, ni se revela la solución ni se altera puntuación.
- No existe avance narrativo ni temporizado mientras permanezca oculto.
- El control cambia inequívocamente a «Mostrar texto». Se mantienen únicamente elementos mínimos de seguridad/accesibilidad/procedencia que deban estar presentes; no reconstruir una segunda capa de paneles.

**Al pulsar «Mostrar texto»:**
- Aparece íntegro el mismo pergamino con el contenido y el estado previos.
- No se salta ni se repite contenido inesperadamente, se recupera foco de manera accesible y la narración no se reanuda sola por sorpresa; el usuario ejecuta una acción clara para reanudar.
- El estado es reversible mediante ratón y teclado, sin perder progreso.

**TS-001 revisada por DC-37:** el texto de toda intervención hablada debe **existir íntegro, estar visible por defecto y ser recuperable en cualquier momento** aun sin audio; queda **derogada exclusivamente la prohibición de ocultación voluntaria** de DC-22 y sus copias. Ocultarlo solo activa el estado contemplativo con avance detenido. La ausencia/fallo del audio nunca bloquea, altera ni oculta la narración. Ningún algoritmo de autoavance puede descartar unidades de texto. Esta nueva definición sustituye expresamente «siempre visible, sin excepción» allí donde sea incompatible, y **no** deroga la integridad, fidelidad ni accesibilidad del texto.

## 7. Tipografía de época, legible y disponible sin conexión

Familias **candidatas**, sujetas a licencias, instalación offline y pruebas de renderizado: EB Garamond, Libre Baskerville, Literata, Cormorant Garamond para títulos breves; serif editorial robusta para narración/decisiones, controles con forma clara. No emplear gótica para párrafos, manuscritas ornamentales extensas ni tipos con glifos ambiguos.

Jerarquía: título principal, capítulo, hablante, narración, pregunta, alternativas, ayuda y navegación. Párrafo orientativo **20–24 px CSS**, título **26–34 px**, interlineado alrededor de **1,4–1,6**, longitud de línea cómoda. Son referencias, no techos; cumplir preferencias normal/grande/muy grande y zoom/escalado del sistema. Tinta opaca de color cálido oscuro sobre el pergamino semitransparente. Contraste WCAG AA **≥4,5:1** en texto normal y **≥3:1** en texto grande/controles gráficos; objetivo aspiracional 7:1 en narración cuando sea viable, calculado sobre fondo compuesto real, con foco visible y sin dependencia exclusiva del color.

## 8. Menú principal obligatorio: «La puerta de La Mancha»

Reemplazar visualmente el fondo de degradado/tarjeta neutra de la captura actual por una **imagen a pantalla completa** de **pueblo manchego verosímil de comienzos del siglo XVII dentro de un paisaje característico de La Mancha**. Se estudiarán casas encaladas, caminos de tierra, caliza, campos abiertos, vegetación compatible, luz natural y profundidad; sin arquitectura, señales, mobiliario o aparatos contemporáneos ni fantasía turística.

La navegación aparecerá sobre **pergamino o superficie editorial semitransparente**, ubicado para conservar el protagonismo del pueblo/paisaje. Accesos claros a Continuar cuando exista progreso, Historia, Aventura, selección de capítulo, Museo/Galería, lector y demás módulos realmente disponibles, perfil y ajustes, sin inventar prestaciones. Fuera etiquetas técnicas y excesos informativos del primer plano. Botones amplios y coherentes, estados de foco/selección reconocibles, sin estilo administrativo. **No se presume que ya exista esa imagen**: examinar inventario; carencia confirmada y autorización del propietario antes de nuevos prompts/recursos.

## 9. Modo Historia: «La escena y la palabra»

Presentar fotograma cinematográfico de superficie completa con pergamino de narrador/personaje integrado, texto íntegro y control permanente de contemplación arriba a la derecha. Eliminar como solución final la gran columna oscura de lectura, barras prominentes y rótulos técnicos invasivos.

**Cobertura visual por intervención:** toda intervención escrita del guion (narrador o personaje) estará asociada explícitamente a una imagen narrativamente apta, trazable a escena, instante, personaje y cronología. No significa una nueva imagen única para cada intervención: la misma imagen puede reutilizarse **solo** con justificación verificable de idoneidad, continuidad, zonas seguras, antiespoiler y ritmo. No prolongar por defecto el plano anterior si su validez no se ha evaluado. Cambiar plano cuando acción, foco o estado emocional lo requieran, con variedad de establecimiento, acción, reacción y detalle; no introducir cambios artificiosos para cumplir cuotas.

**Reproducción:** conservar pausa, repetición, retroceso, avance manual, automatismo con tiempo de lectura, audio opcional y persistencia.

**Ubicación vinculante de Reproducir/Pausar — DC-38, 2026-11-12:** el botón flotante central se sitúa **centrado horizontalmente en el extremo inferior de la imagen**, dejando margen suficiente respecto del borde y los créditos; nunca se superpone al centro geométrico de la escena. Los botones de retroceso y avance mantienen sus posiciones en los extremos laterales a media altura y el icono de contemplación sigue fijo arriba a la derecha. Su posición es estable entre intervenciones y resoluciones; se garantiza ratón, teclado, foco y tamaño pulsable. No puede ocultar pergamino, texto, personajes, pistas, acciones ni patrimonio: toda colisión real se corrige mediante composición conforme y se verifica antes de aceptar la pantalla. La posición DC-38 no autoriza imágenes nuevas ni Fase 2. Preferencia de dirección UX por tres símbolos flotantes discretos (atrás / reproducir-pausar / adelante), sin barra convencional dominante y con accesos adicionales recuperables.

**Visibilidad vinculante de los controles de Historia — DC-39, 2026-11-12 (sustituye la ocultación conjunta):** las flechas laterales **«<» y «>» permanecen visibles en todo momento**, sin desaparecer tras inactividad, al cambiar de intervención ni al entrar en contemplación. En los extremos de la secuencia, el botón no operativo sigue siendo visible, atenuado y deshabilitado. **El botón central Reproducir/Pausar mantiene exactamente su comportamiento actual**: autoocultación tras **2 segundos** de inactividad, reaparición por movimiento de ratón o foco de teclado, función de reproducción/pausa, estado accesible y posición inferior DC-38. Se descarta exclusivamente la propuesta anterior de ocultar los tres símbolos tras 3 segundos. El icono fijo de contemplación nunca participa del temporizador. No crear temporizadores paralelos ni avanzar con el pergamino oculto.

## 10. Modo Aventura: «Decidir dentro de la escena»

Mostrar la **preimagen cinematográfica a pantalla completa**, correspondiente al instante **anterior** a la acción canónica y sin spoilers. El **pergamino de decisión** integra simultáneamente contexto, personaje, pregunta de anticipación y todas las alternativas (habitualmente 3), con opciones amplias, foco y selección perceptibles. Prohibidos columna de formulario independiente, opciones escondidas y scroll interior.

Conservar la secuencia **situación previa → elección → puntuación → revelación canónica → consecuencia → continuación** que determine la normativa de Aventura. La selección tiene respuesta visual sutil (filete/relieve/tono histórico), nunca espectáculo distractor. La imagen posterior solo aparece al tiempo de revelación permitido. El modo contemplativo oculta el pergamino sin elegir, alterar puntos, revelar soluciones ni avanzar; al volver muestra el estado anterior completo.

Sigue siendo obligatoria una **preimagen específica y antiespoiler por ronda final**, y se puede reutilizar un recurso en Historia si resulta fiel y aprobado; no confundir la cobertura visual de Historia por intervención con una exigencia automática de imagen inédita por intervención.

## 11. Otros módulos: cero fondos neutros como acabado final

Toda pantalla terminada tendrá **fondo artístico contextual aprobado**, no degradado/genérico plano: capítulo/selección (interior histórico o paisaje), ajustes (estancia manchega), perfiles (mesa de escritura), Museo (contexto patrimonial sobrio), Lector (biblioteca/escritorio), Atlas (ambientación cartográfica), Cuaderno (mesa de investigador), ayudas, cargas y estados recuperables de error. Son **direcciones conceptuales, no órdenes de generar imágenes**.

La imagen de fondo puede atenuarse compositivamente detrás de contenido funcional, **sin convertirse en espacio neutro vacío**. En Lector, Atlas, Museo, Cuaderno y ajustes se conservan los comportamientos necesarios (scroll de textos largos, mapa interactivo, proporción íntegra de obras, zoom, formularios), con superficies históricas legibles y semitransparentes cuando estén superpuestas a fondos artísticos. No encerrar una novela completa ni un mapa en un pergamino narrativo sin scroll.

**Fallo excepcional:** se admite una vista mínima de emergencia para preservar accesibilidad/seguridad cuando el activo falla; su existencia técnica **no** cuenta como cumplimiento visual ni como pantalla definitiva aprobada. Registrar incidencia y requerir recurso alternativo apto y aprobado, disponible offline. Prohibido usar fondos neutros para simular cobertura visual final.

## 12. Transiciones, controles y microinteracciones

Se podrán aplicar fundidos discretos, pergaminos que aparecen/desaparecen suavemente, respuesta delicada de botones, realce de foco, guardado/progreso no invasivos y movimiento de cámara leve, sin retrasar la lectura ni ocultar contenido. Prohibidos pergaminos que tardan en desenrollarse, efectos espectaculares, animaciones molestas, pérdida de foco, reordenamientos sorpresa o transición que revele acciones futuras. Movimiento reducido y alternativa estática siempre disponibles.

Tamaño objetivo de zonas interactivas preferentemente **≥48×48 px CSS**, con separación y contraste. Reconocimiento de iconos por función prima sobre ornamentación.

## 13. Resoluciones, ergonomía y restricciones de composición

Verificar como mínimo **1920×1080, 1366×768, 1280×800, 2560×1440 y 3840×2160**, tamaños de ventana no maximizada admitidos, Windows a **100/125/150 %**, preferencias normal/grande/muy grande y estados sin audio, pausados, contemplación, pregunta extensa, feedback y otros casos relevantes. Los mínimos de ventana realmente soportados se documentarán y validarán; no afirmar adaptación universal sin ensayos.

El componente debe calcular tamaño de texto, ancho, alto, zonas de seguridad, superposición real y estado de cada control. No se acepta un pergamino que solo funciona a 1080p. Si las dimensiones no permiten cumplir simultáneamente integridad, legibilidad y preservación del plano, el estado es **NO CONFORME**: no esconder contenido, no recortar la obra y no introducir pantalla dividida como remedio automático.

## 14. Implementación técnica futura y reutilización

Esta decisión **no autoriza implementar**. Cuando se autorice, el desarrollador inspeccionará el código y contratos reales, reutilizando los componentes existentes que convengan (lienzo, reproductor, lógica narrativa, persistencia) y definiendo un sistema visual común de escena, pergamino, contemplación, navegación y tipografía. Los nombres de componentes conceptuales no obligan a crear archivos concretos. Evitar parches por escena, texto editorial hardcodeado, duplicación de imágenes o motores de temporización paralelos.

Conservar datos declarativos, IDs y guardados; actualizar esquemas/contratos solo con autorización y migración controlada si resulta necesario. Las regiones críticas y posiciones podrán registrarse de forma declarativa en metadatos verificados. El texto literario y los estilos nunca se incrustarán en el binario fotográfico.

## 15. Aprobación de recursos y producción

No generar ni modificar imágenes por iniciativa propia. Según **DC-36**, el orden es: **Aventura candidata → guion completo e intervenciones de Historia → matriz conjunta de correspondencia texto/imagen → revisión de aptitud por el propietario → carencias confirmadas → prompts autorizados → producción/validación → integración/QA**. Consultar primero assets/scenes y closeups; acuarelas como recurso secundario cuando proceda, siempre respetando derechos, atribuciones y conservación íntegra de obra patrimonial. El menú nuevo también requiere recurso concretamente inventariado y aprobado.

Para Historia, la matriz deberá alcanzar **100 % de intervenciones con imagen apta expresamente asociada** antes de declarar acabado un capítulo. Documentar IDs, ancla DC-31, función pre/post, aprobaciones, antiespoiler, justificación de reutilización y áreas seguras. Las preimágenes de distintas rondas de Aventura mantienen su especificidad y no se reciclan genéricamente.

## 16. QA y rechazo: obligaciones medibles

Documentar por pantalla/estado/viewport evidencia real y resultado **PASS / FAIL / PENDIENTE**; verificar DOM/CSS, capturas, recorridos de ratón/teclado, preferencias de accesibilidad, regresiones de guardado y progresión, contenido y derechos. Prohibido inferir PASS de la existencia del documento.

**Gate visual:** imagen cubriendo toda superficie jugable; proporción y detalles protegidos; cero relleno neutro en pantalla final; pergamino semitransparente integrado, todos los textos/alternativas y controles interiores dentro, sin scroll interno; texto legible con contraste medido; tipografía histórica funcional; icono de contemplación siempre accesible arriba a la derecha; menú con pueblo y paisaje manchegos de época y pergamino de navegación; coherencia en otros módulos.

**Gate funcional:** ocultar/mostrar reversible y sin pérdida; timers/voz/autoavance pausados durante contemplación; regreso íntegro y reanudación explícita; todas las opciones de Aventura simultáneamente visibles, selección y puntos invariantes al ocultar; repetición/retroceso/continuación, perfil y autoguardado intactos; offline; recurso fallido con recuperación sin aceptación visual engañosa.

**Gate narrativo/artístico:** Historia con cobertura pertinente por intervención; Aventura preimagen única por ronda final y antiespoiler; imagen y texto sincronizados; no recortes de sujetos/hotspots ni patrimonio; fidelidad DC-31, continuidad, derechos, validación del propietario.

**Gate accesibilidad/responsive:** matriz de resoluciones/escalados; tamaño de letra normal/grande/muy grande; foco y teclado; contraste mínimo WCAG AA sobre composición final; movimiento reducido; controles utilizables y completos.

**Casos de referencia prioritarios:** las tres capturas proporcionadas por el propietario (Historia con columna derecha, Aventura con panel lateral, inicio con tarjeta sobre fondo neutro) definen los anti-patrones que deben desaparecer. No certificar validación ejecutada hasta tener nuevas capturas y pruebas.

## 17. Sustitución normativa exacta y preservación de reglas

**Prevalencia específica:**
- **DC-22 / TS-001 y copias:** se sustituye **únicamente** «texto siempre visible sin posibilidad de ocultación» por «texto completo visible por defecto, ocultable voluntariamente durante contemplación pausada y recuperable íntegramente». Se mantienen sincronización, acceso escrito incluso sin audio, tiempos de lectura y no omisión.
- **DC-28 / dictamen:** se refuerza cero scroll/truncamiento, ensanchamiento seguro y fondo semitransparente; se **deroga como solución final automática** la vista dedicada separada imagen/texto o pantalla dividida. El tratamiento de contenido que no cabe exige solución editorial/visual aprobada o FAIL. La caja en pantalla narrativa pasa a ser pergamino histórico.
- **DC-19, DC-21, DC-25 y políticas de fondos:** neutro queda restringido a prototipo/fallo técnico de emergencia, **nunca** presentación final, ni siquiera como recurso final recurrente de transición.
- **DC-24, DC-26–27:** conservar imagen previa específica por ronda de Aventura, reutilización lícita Historia/Aventura, dirección visual, autorizaciones y derecho del propietario a aprobar el arte.
- **DC-29–DC-36:** conservar procedimiento ágil, fidelidad, GitHub como fuente y destino, contenidos declarativos, derechos, QA, y orden editorial DC-36.
- **Fase:** aprobar diseño documental **no autoriza** modificación de código, generación de activos, Fase 2 o distribución.

Las redacciones anteriores incompatibles se conservan como **historial** cuando proceda, pero quedan expresamente **DESPLAZADAS EN SU ÁMBITO** por DC-37 desde la integración de esta decisión. No interpretar el historial como permiso de excepción. Los archivos con referencias antiguas deberán apuntar a este documento y registrar la regla aplicable sin reconstruir silenciosamente decisiones antiguas.

## 18. Secuencia autorizable después de esta decisión

1. **Hecho ahora:** formalizar DC-37, crear esta directriz canónica y actualizar referencias normativas coherentemente en GitHub, con commit verificado.
2. **No hecho ni autorizado aquí:** modificar TSX/CSS/Rust/JSON de escenas, generar fondos o imágenes, actualizar activos, validar capturas de la aplicación o declarar QA de implementación.
3. **Solo con nuevo encargo:** inspección técnica de consumidores, propuestas concretas de implementación, reutilización y adaptación de contratos; después programación y QA proporcional al riesgo, integración en main y SHA final.
4. La aceptación visual definitiva pertenece al propietario y requiere capturas reales y pruebas documentadas.

**Regla final:** *No estamos decorando una interfaz de paneles: convertimos el juego en una sucesión de escenas cinematográficas dentro de las cuales vive la narración, y garantizamos que el usuario puede despejar la imagen para contemplarla sin perder ni una palabra.*
