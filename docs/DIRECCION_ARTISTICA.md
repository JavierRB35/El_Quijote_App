# DIRECCIÓN ARTÍSTICA — EL QUIJOTE

**Versión:** propuesta 0.3 · **Fecha:** 2026-11-06 · **Estado:** especificación de Fase 0, pendiente de pruebas de usabilidad y aceptación final.
**Responsabilidad vigente (DC-23–DC-27, 2026-11-08):** **Dirección integral (ChatGPT)** asume criterios narrativos, artísticos, UX y aceptación; el **desarrollador único** implementa y prueba; un **director artístico** interviene solo para producir/modificar imágenes con prompt exacto transmitido por el propietario. Se dejan sin efecto las convocatorias históricas de equipos especializados.
**Documentos relacionados:** [Piloto de escenas](DIRECCION_ARTISTICA_PILOTO.md) · [UX y accesibilidad](UX_ACCESIBILIDAD.md) · [Encargo maestro](ENCARGO_MAESTRO.md).

> **Principio rector:** La complejidad debe estar en las aventuras, el ingenio de Cervantes y los desafíos cognitivos, nunca en aprender a manejar la interfaz.

## 1. Propósito y público

La experiencia principal combina aventura narrativa, preguntas, lector íntegro, atlas, museo, **galería artística de acuarelas** y cuaderno personal. Se mantiene la vocación intergeneracional del encargo; **las personas de edad avanzada pasan a ser el público de referencia prioritario para la ergonomía y la validación UX**. La aplicación ofrece actividades de recuerdo, observación, razonamiento y coordinación visomotora, pero **no es un dispositivo médico ni se atribuirán mejoras clínicas sin evidencia independiente**.

La identidad se define como **aventura literaria premium, cinematográfica, serena, elegante y culturalmente rigurosa**. Evitar estética infantil, aplicaciones médicas, gamificación agresiva, pantallas sobrecargadas o formas de comunicación paternalistas.

## 2. Lenguaje visual

- **Entorno:** realismo cinematográfico con matiz pictórico del Siglo de Oro español; fotografía patrimonial, reproducciones históricas y recreaciones originales claramente diferenciadas por procedencia.
- **Paleta:** tierra ocre, terracota, pergamino claro, madera, cuero y lino; acentos oliva, ámbar y azul índigo. La textura envejecida puede aparecer en marcos o fondos decorativos, **nunca comprometiendo la lectura**.
- **Luz y cámara:** luz natural, amaneceres y atardeceres cuando correspondan; claroscuro verosímil; profundidad y parallax discretos. No aplicar desenfoque o veladuras detrás del texto que reduzcan contraste.
- **Personajes:** continuidad de fisonomía, proporciones, vestuario, Rocinante y rucio respecto a la biblia del piloto, siempre con comprobación histórico-literaria; ninguna recreación se presenta como prueba documental.
- **Tipografía:** encabezados expresivos con serif legible y texto funcional con fuente de alta legibilidad; evitar florituras para instrucciones, alternativas y contenido extenso.
- **Composición:** la escena narrativa ocupa el protagonismo, con controles limitados, jerarquía visible y áreas seguras para superposiciones. No existen áreas seguras universales: deben registrarse por escena y resolución.

La referencia de continuidad de [DIRECCION_ARTISTICA_PILOTO.md](DIRECCION_ARTISTICA_PILOTO.md) sigue vigente. **La política visual nueva DC-24–DC-27 prevalece** sobre reglas anteriores incompatibles: imagen específica por pregunta, escenas prioritarias, acuarelas secundarias en gameplay y sección artística propia. Los inventarios y evidencias previas se conservan.

## 3. Interfaz orientada a la comodidad

Criterios iniciales de diseño, **a validar mediante pruebas reales**, no mediciones ya certificadas:

| Elemento | Orientación |
|---|---|
| Lectura habitual | Tamaño base orientativo de 20–22 px, escalable mediante preferencias por perfil; sin fijarlo como único tamaño |
| Zonas pulsables | Objetivo preferente ≥ 48 × 48 píxeles CSS con separaciones generosas |
| Contraste | Mínimo de referencia WCAG AA: 4,5:1 en texto normal, 3:1 en texto grande y elementos gráficos funcionales; aspirar a más cuando sea viable |
| Botones de pregunta | Alternativas grandes, inequívocas, separación perceptible, estado de foco/selección visible sin depender solo del color |
| Controles | Ratón y teclado; pulsaciones de precisión fina no obligatorias; retorno y ayuda fáciles de localizar |
| Animación | Suave y no esencial; respetar reducción de movimiento y permitir omitir transiciones |
| Audio | Voz opcional con subtítulos, repetición y controles de voz/ambiente/música cuando proceda |
| Lectura | Interlineado generoso, ancho de línea cómodo, búsqueda, marcadores, conservación de la posición |
| Preferencias | Configuración accesible guardada individualmente por perfil |

No denominar por defecto «modo para mayores» a la vista cómoda. La interfaz normal debe ser utilizable por mayores; las opciones de texto ampliado, contraste alto, narración y movimiento reducido estarán disponibles para todas las edades.

## 4. Narrativa, preguntas y estimulación cognitiva

La estimulación se integra en episodios auténticos, sin convertir la obra en una batería clínica. Distintos formatos de **respuesta exclusivamente seleccionada** desarrollarán capacidades distintas:

- **Memoria:** recordar quién intervino, qué ocurrió, en qué orden y qué se dijo, con repasos espaciados voluntarios.
- **Atención:** observar detalles relevantes, localizar personajes u objetos con zonas activas grandes y alternativa por teclado.
- **Razonamiento y asociación:** vincular causa/consecuencia, identificar equívocos y relacionar personajes, hechos y lugares.
- **Reflejos y coordinación visomotora:** interacciones voluntarias de reconocimiento y selección de estímulos, con ritmo configurable y sin castigo por lentitud.

No mezclar rapidez de reacción con capacidad intelectual. En la aventura principal **no habrá cronómetro obligatorio**, ni errores que bloqueen el progreso. El modo competitivo, las puntuaciones o retos cronometrados son voluntarios, claramente separados y desactivables.

Las preguntas aparecen en momentos narrativos relevantes, con frecuencia ajustable. **Cada pregunta final debe llevar su propia imagen específica, diferenciada, con control de spoilers y procedencia**. Flujo tipo: **imagen de escena segura antes de la pregunta → elección de opción → explicación amable y fuente → desenlace fiel a Cervantes → descubrimiento opcional → continuación**. La imagen previa no debe revelar la solución; una posterior puede ilustrar el desenlace. Una imagen genérica reutilizada para varias preguntas no cumple DC-24.

## 5. Ejemplo gráfico conceptual — episodio de los molinos

**Escena:** Don Quijote y Sancho avanzan por el paisaje manchego ante varios molinos, con luz de atardecer. **Pregunta:** «¿Qué cree Don Quijote que tiene delante?». **Opciones:** «Unos gigantes», «Unos molinos de viento», «Un ejército enemigo» y «Unas fortalezas». Ninguna opción aparece seleccionada de entrada.

El concepto ilustrado generado el 2026-11-06 plantea una lámina vertical de dirección artística con escena cinematográfica, panel de pregunta de alto contraste y cuatro botones amplios. **Es una referencia visual de trabajo, no una pantalla implementada ni un recurso editorial aprobado.** El archivo original de esta conversación se denomina `el_quijote_aventura_entre_molinos.png`; **su incorporación binaria al repositorio queda pendiente de verificación**. No añadir enlaces a rutas Git inexistentes.

**Observación crítica de diseño:** la lámina es demostrativa, no una especificación a escala real de escritorio 16:9. La versión funcional debe verificar legibilidad a distancia de uso, ausencia de exceso decorativo, ubicación de botones y superposiciones, y que las cuatro opciones sean comprensibles para lectores mayores. El ejemplo no justifica reutilizar exactamente su maquetación vertical en el ejecutable.

## 6. Responsabilidades por módulo

- **Inicio:** «Continuar aventura» prioritario, acceso claro a lector, atlas, museo, cuaderno, perfiles y ajustes.
- **Aventura:** escena central e inmersiva con interacciones discretas, ayuda y control de audio accesibles.
- **Pregunta:** enunciado único muy legible, opciones amplias, retroalimentación y consulta del fundamento.
- **Lector:** tipografía regulable, navegación por 126 capítulos, búsqueda, marcadores, anotaciones y retorno al episodio sin perder posición.
- **Atlas:** fichas y mapas offline con leyendas legibles, incertidumbre de rutas explícita y alternativa de consulta no dependiente de precisión cartográfica.
- **Museo:** piezas seleccionadas, zoom, contextualización clara y créditos; sin sobrecarga de datos.
- **Cuaderno:** recuerdos y descubrimientos recuperables, filtros sencillos, separación entre texto verificado, anotación personal e IA opcional.
- **Ajustes:** texto/contraste, voz/subtítulos, movimiento, frecuencia de preguntas, perfiles y copia de seguridad en lugares previsibles.

## 7. Producción, accesibilidad y validación

Cada recurso visual entregado por Contenidos incluirá función (`before/question/reveal/after`), escena/episodio vinculados, procedencia, licencia, dimensiones, descripción alternativa, zonas de interacción normalizadas, área segura de UI y política de spoilers. Desarrollo integrará recursos mediante contratos y manifiestos, sin codificar el contenido literario dentro de la interfaz.

**Criterios de aceptación para Fase 0 y piloto:**
1. Revisión de composiciones 16:9 y escalado a 1080p, 1440p y 4K, sin pérdida de funcionalidad.
2. Navegación de inicio → episodio → pregunta → explicación → continuación por ratón **y teclado**, con foco visible.
3. Verificación de contrastes y escalado de texto en estados normales, seleccionados, de error y de ayuda.
4. Comprobación de que todos los elementos informativos tienen equivalente textual/subtítulos y que no hay instrucciones transmitidas exclusivamente por animación o color.
5. Pruebas moderadas de caja negra con personas mayores de distinta familiaridad tecnológica; medir comprensión, errores de clic, recuperación del foco, fatiga, facilidad de retorno y comodidad.
6. Registro de problemas y nuevas iteraciones, sin afirmar cumplimiento WCAG o eficacia cognitiva hasta verificarlos.
7. No producir una nueva batería de activos como respuesta automática a un problema de UX; primero corregir navegación, contratos, posición y contraste.

## 8. Estado y límites

La dirección estética de base y el uso de **respuestas seleccionadas** son decisiones cerradas del encargo. El énfasis en personas mayores es una orientación adicional solicitada el 2026-11-06. Los valores de tamaño, espaciado, contraste reforzado y flujos aquí propuestos deberán verificarse y pueden ajustarse tras pruebas de usuario. La ejecución de la aplicación sigue supeditada al punto de control GO/NO-GO del proyecto.


---

## 9. Directriz reforzada de experiencia cinematográfica premium (2026-11-06)

**Esta sección es el pliego artístico prioritario para diseñar y evaluar todas las escenas y pantallas.** Desarrolla las decisiones anteriores, sin modificar el orden narrativo, el formato de respuestas seleccionadas ni la obligación de funcionamiento offline. El resultado debe parecer una obra audiovisual interactiva realizada con criterio de dirección de cine y diseño editorial, no una sucesión de ilustraciones estáticas con menús superpuestos.

### 9.1. Dirección de escena y movimiento vivo pero sutil

Cada episodio tendrá una **imagen maestra cinematográfica**, con perspectivas alternativas cuando cambie el foco dramático o el tipo de pregunta. Su puesta en escena debe comunicar el lugar, la acción, el estado emocional y la época: encuadre intencional, profundidad en primer término/plano medio/fondo, escala verosímil, iluminación motivada, materiales creíbles, continuidad de personajes, vestuario y utilería, y una paleta coherente entre episodios.

La escena puede adquirir vida mediante capas 2.5D, ligero desplazamiento de cámara, parallax de profundidad, respiración de la luz, viento sobre vegetación y ropa, movimiento de nubes, polvo o humo, y pequeños gestos **cuando el recurso disponible los soporte**. No convertir una sola imagen plana en un falso vídeo: los recortes, máscaras, capas y animaciones deberán producirse y revisarse sin halos, desgarros, deformaciones o movimientos físicamente incoherentes.

**Normas de movimiento:**

1. La cámara se comporta como un observador sereno: paneos y acercamientos muy contenidos, sin sacudidas, zooms bruscos, desplazamiento continuo innecesario ni bucles perceptibles.
2. Los efectos ambientales enriquecen la atmósfera, pero nunca compiten con la pregunta, la voz, los subtítulos o la acción relevante.
3. Durante lectura, selección de respuesta, interacción por hotspot y consulta de pistas, el movimiento se detiene o reduce si afecta a estabilidad visual, comprensión o precisión.
4. Debe haber una versión equivalente **sin animaciones**, que conserve toda la información narrativa y todos los controles.
5. Transiciones entre escena, pregunta, revelación y descubrimiento sobrias, coherentes y omisibles; sonido y animación nunca son la única vía para entender qué ha sucedido.
6. Priorizar fluidez y estabilidad en el hardware objetivo antes que la cantidad de partículas, capas o efectos. Los límites concretos de duración, desplazamiento y rendimiento se calibrarán mediante prototipos y pruebas, no mediante cifras arbitrarias presentadas como validadas.

### 9.2. Composición protegida: la imagen manda, los textos se adaptan

**Regla innegociable: ningún texto, botón, tarjeta, subtítulo o panel puede ocultar rostros, gestos, objetos que deban reconocerse, relaciones espaciales, acciones, pistas o información narrativa importante.**

Los elementos textuales no se ubicarán automáticamente en el centro de cualquier imagen. La **composición de escena y de interfaz se diseña como un único sistema**: antes de aprobar la imagen, Contenidos y Dirección Artística identificarán sus zonas de interés y de reserva; UX decidirá dónde puede situarse la interfaz con tamaños legibles.

Establecer por escena:

- **Zonas críticas protegidas:** máscaras/polígonos normalizados para personajes, rostros, manos/gestos, objetos significativos, puntos de atención, hotspots y elementos que fundamenten la pregunta.
- **Zonas candidatas de interfaz:** áreas de fondo relativamente vacío y con continuidad cromática apropiada, registradas para cada perspectiva y estado de la escena.
- **Variantes de encuadre:** recorte, plano alternativo o desplazamiento de cámara que cree espacio sin perder una acción o un personaje.
- **Estados de pantalla:** imagen libre en narración; pregunta; pista; explicación; revelación; subtítulos; menús y accesibilidad ampliada. La zona apta para texto puede cambiar entre estados.

**Orden de resolución VIGENTE (DC-28; sustituye el orden de reencuadre previo) cuando un cuadro de texto no cabe sobre imagen:**

1. **Ensanchar horizontalmente primero** el cuadro dentro de la zona segura real de esa escena/estado/resolución, sin cubrir rostro, gesto, acción, pista, hotspot ni otro elemento relevante; mantener el texto completo y **sin scroll**.
2. Si sigue sin caber, ajustar espaciado accesorio y **reducir progresivamente el tamaño del texto**, respetando el mínimo legible, contraste, controles y preferencias de accesibilidad. El fondo de todo cuadro sobre imagen será **semitransparente**.
3. Si la composición sigue sin solución, considerarla **no conforme** y buscar otro plano/encuadre o vista separada autorizada por Dirección, sin omitir texto ni deteriorar el hecho narrativo. No se aceptan recortes, scroll, paneles opacos o letras ilegibles.

**Prohibido resolverlo** reduciendo la letra hasta resultar difícil de leer, acumulando tarjetas sobre protagonistas, aplicando transparencias de contraste dudoso o colocando botones sobre elementos interactivos. Las superposiciones sobre áreas no críticas son admisibles solo cuando mantienen legibilidad y no interfieren en la escena. En ejercicios de identificación visual, la imagen y los hotspots tendrán prioridad: enunciado y opciones deben trasladarse a un área separada si es necesario.

El marco de diseño principal será escritorio **16:9**, con comprobación a 1920×1080 y adaptación a 1440p/4K y ventanas más pequeñas admisibles. No extrapolar directamente a 16:9 el póster vertical del episodio de los molinos: es una **lámina conceptual, no una maqueta definitiva**.

### 9.3. Jerarquía editorial y legibilidad sin concesiones

Las pantallas deben ser visualmente ricas en lo cinematográfico y **extraordinariamente simples en lo interactivo**:

- Una intención principal por pantalla; enunciados breves y visibles, alternativas separadas y controles secundarios discretos pero identificables.
- Texto funcional **grande, nítido y escalable**: mantener como punto de partida los 20–22 px orientativos del §3, con tamaño superior donde el enunciado lo exija y con ajustes individuales. No convertir ese intervalo en tope ni sacrificarlo por motivos estéticos.
- Contraste sostenido entre letras y superficies; cuando haya fotografía o escena debajo, colocar **panel semitransparente de contraste comprobado** (DC-28), no letras flotantes sobre fondos cambiantes ni panel opaco sobre la escena. Comprobar contraste en **todos los fotogramas** de las animaciones, no solo en una captura.
- Anchura de línea moderada, interlineado y espaciado generosos; alineación consistente; evitar texto justificado con huecos irregulares, mayúsculas sostenidas para párrafos, ornamentos que compitan con el contenido y serif históricas de baja lectura en controles.
- Botones amplios, activables con ratón y teclado, estados de foco/selección evidentes sin depender exclusivamente del color; el diseño debe aceptar ampliación de texto y traducciones futuras.
- Subtítulos fuera de las zonas narrativas protegidas; si no existe espacio, reservar una banda propia y adaptar el encuadre. Permitir repetir o pausar la narración.
- Los marcos, filetes, dorados, texturas de papel, iconos y motivos cervantinos son **acentos de identidad**, no una excusa para saturar. Evitar aspecto de plantilla de juego móvil, botones brillantes gigantes o interfaz barroca recargada.

### 9.4. Qué significa «premium» en este proyecto

La calidad no se define por cantidad de efectos ni por ornamento. Se exigirá **consistencia de producción en todos los estados**:

1. **Dirección cinematográfica:** variedad de planos y ritmos, intención narrativa, iluminación, color y atmósfera; evitar imágenes genéricas repetidas y personajes desproporcionados.
2. **Dirección editorial:** títulos, capítulos, voces, preguntas y explicaciones con jerarquía tipográfica estable; lectura cómoda y materiales culturales atribuidos correctamente.
3. **Microinteracciones:** cambios de estado pulidos, discretos, previsibles y reversibles; no usar celebraciones estridentes, parpadeos o castigos visuales.
4. **Acabado audiovisual:** voces claras, ambientes discretos, música no invasiva, niveles de audio regulables, subtítulos cuidados y transiciones sonoras suaves.
5. **Continuidad visual:** mismos personajes, textura de materiales, sistema de botones, marcos, iconos, espaciados y reglas de contraste en aventuras, lector, atlas, museo y cuaderno, sin uniformar artificialmente sus funciones.
6. **Estados de excepción cuidados:** carga, ausencia de datos, fallo de copia, desconexión, ayuda y configuración deben mantener la misma dignidad visual que la portada, con información clara y sin impedir el uso offline.
7. **Respeto histórico:** la apariencia realista no autoriza anacronismos ni convierte recreaciones IA en documentos históricos. Todas las imágenes siguen sujetas a procedencia, derechos, revisión y contrato editorial.

### 9.5. Instrucción operativa vigente (Dirección + desarrollador + artista puntual)

**Dirección integral** define por escena y por pregunta: propósito narrativo, fase pre/pregunta/revelación/post, **imagen propia exclusiva de pregunta**, planos suficientes para sostener el interés, prioridad de escenas y primeros planos, acuarelas secundarias de gameplay, áreas seguras, elementos animables, restricciones de spoiler, texto alternativo, fuente y derechos. Cuando falte arte, entrega al propietario **prompt exacto** para el director artístico. **El desarrollador único** convierte la especificación en distribución adaptable, catálogo y pruebas, integra los activos aprobados en **GitHub**, sin contenido literario hardcodeado. **Dirección** evalúa las composiciones, no solo recursos aislados; no hay nuevas firmas de roles R01–R16.

Se recomienda formalizar estas regiones como coordenadas normalizadas y metadatos asociados a cada escena en el contrato editorial-técnico. **No se declara creado ni aprobado un esquema nuevo** por esta directriz: cualquier cambio de contrato requiere versión y revisión conjunta.

### 9.6. Pruebas de aceptación específicas de calidad cinematográfica y composición

En un piloto representativo y en cada plantilla de pantalla se verificará:

- **Cero oclusiones de información narrativa esencial** por preguntas, subtítulos, barras, mensajes o botones en los estados probados, incluidos texto ampliado y paneles de ayuda.
- **Cero pérdida de respuesta por la composición:** la imagen previa no revela la respuesta, pero tampoco oculta información necesaria para formularla de manera justa.
- **Legibilidad estable durante el movimiento:** color, cámara y ambiente no alteran el contraste de los textos ni provocan distracciones que impidan contestar.
- **Equivalencia con movimiento reducido:** puede completarse el mismo flujo y comprenderse la misma información sin parallax ni efectos ambientales.
- **Diseño responsivo real:** validar 1080p, 1440p, 4K y escalado de interfaz, con puntos de interés protegidos, botones utilizables y sin recortes de textos.
- **Continuidad premium:** comprobar consistencia de protagonistas, color, composición, botones, transiciones, sonido, subtítulos y estados de excepción mediante una checklist conjunta de dirección artística y UX.
- **Prueba con personas mayores sin entrenamiento previo:** identificar voluntariamente la pregunta, localizar opciones, completarla con comodidad, repetir audio y regresar a la aventura sin instrucciones externas; registrar observaciones y corregir.
- **Evidencia trazable:** capturas y vídeo de los estados de escena en movimiento, versión estática accesible, mapa de zonas protegidas y resultados de accesibilidad asociados al ID de escena.

**Condición de rechazo:** si para preservar la imagen hay que disminuir la legibilidad, o para mostrar texto hay que ocultar la acción, la composición **no está terminada**. Se rediseñan el plano, la interfaz o la transición; no se traslada el problema al jugador.

> **Prompt maestro para los equipos:** «Diseñad EL QUIJOTE como una aventura literaria cinematográfica de acabado premium: escenas realistas de composición deliberada, enriquecidas con movimiento ambiental 2.5D y cámara apenas perceptible; dirección de arte rigurosa, continuidad de personajes y una interfaz editorial elegante. Cada texto, subtítulo, pregunta y botón ha de ser grande, legible, accesible y ubicarse fuera de los rostros, acciones, pistas y objetos narrativamente importantes. Definid zonas protegidas y zonas seguras de UI para cada escena y cada estado, adaptando el encuadre o usando un panel separado cuando no exista espacio. Nunca resolváis un conflicto reduciendo tipografía ni tapando la imagen esencial. Priorizad el confort de las personas mayores, sin infantilizarlas, con navegación sencilla, respuestas exclusivamente seleccionadas, ritmo sin presión, narración y subtítulos opcionales, control total del movimiento y funcionamiento offline. Buscad un nivel de detalle y cohesión propio de una producción cultural premium, y someted cada decisión a pruebas de legibilidad, coherencia histórica, accesibilidad y experiencia real de usuario». 

### 9.7. Sustitución específica posterior: DC-28 (2026-11-08)

La norma de composición de [DC-28](DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md) **prevalece** sobre propuestas de §9.2–9.3 en cualquier punto incompatible: **no hay scroll en cuadros de texto sobre imagen; ensanchar horizontalmente dentro de la zona segura antes de bajar tamaño; tipografía siempre legible; fondo semitransparente en todos los overlays; resultado aceptable como póster**. Vista dividida, cambio de plano o pantalla separada solo cuando la composición no cabe de forma segura, con el texto íntegro y sin truncarlo.

La aceptación artística requiere contrastar **foto/escena real + overlay real** por viewport y estado. Reservar área natural libre para el texto sin incrustar UI en el arte. La integridad de acuarelas y los límites antispoiler siguen vigentes; un recorte de composición o `object-fit: cover` nunca justifica eliminar un hecho relevante.
