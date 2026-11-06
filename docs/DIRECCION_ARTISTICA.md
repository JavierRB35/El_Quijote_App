# DIRECCIÓN ARTÍSTICA — EL QUIJOTE

**Versión:** propuesta 0.2 · **Fecha:** 2026-11-06 · **Estado:** especificación de Fase 0, pendiente de pruebas de usabilidad y aceptación final.
**Responsabilidad compartida:** Dirección artística/entornos + Diseño UX/UI/accesibilidad + Contenidos/iconografía + QA.
**Documentos relacionados:** [Piloto de escenas](DIRECCION_ARTISTICA_PILOTO.md) · [UX y accesibilidad](UX_ACCESIBILIDAD.md) · [Encargo maestro](ENCARGO_MAESTRO.md).

> **Principio rector:** La complejidad debe estar en las aventuras, el ingenio de Cervantes y los desafíos cognitivos, nunca en aprender a manejar la interfaz.

## 1. Propósito y público

La experiencia principal combina aventura narrativa, preguntas, lector íntegro, atlas, museo y cuaderno personal. Se mantiene la vocación intergeneracional del encargo; **las personas de edad avanzada pasan a ser el público de referencia prioritario para la ergonomía y la validación UX**. La aplicación ofrece actividades de recuerdo, observación, razonamiento y coordinación visomotora, pero **no es un dispositivo médico ni se atribuirán mejoras clínicas sin evidencia independiente**.

La identidad se define como **aventura literaria premium, cinematográfica, serena, elegante y culturalmente rigurosa**. Evitar estética infantil, aplicaciones médicas, gamificación agresiva, pantallas sobrecargadas o formas de comunicación paternalistas.

## 2. Lenguaje visual

- **Entorno:** realismo cinematográfico con matiz pictórico del Siglo de Oro español; fotografía patrimonial, reproducciones históricas y recreaciones originales claramente diferenciadas por procedencia.
- **Paleta:** tierra ocre, terracota, pergamino claro, madera, cuero y lino; acentos oliva, ámbar y azul índigo. La textura envejecida puede aparecer en marcos o fondos decorativos, **nunca comprometiendo la lectura**.
- **Luz y cámara:** luz natural, amaneceres y atardeceres cuando correspondan; claroscuro verosímil; profundidad y parallax discretos. No aplicar desenfoque o veladuras detrás del texto que reduzcan contraste.
- **Personajes:** continuidad de fisonomía, proporciones, vestuario, Rocinante y rucio respecto a la biblia del piloto, siempre con comprobación histórico-literaria; ninguna recreación se presenta como prueba documental.
- **Tipografía:** encabezados expresivos con serif legible y texto funcional con fuente de alta legibilidad; evitar florituras para instrucciones, alternativas y contenido extenso.
- **Composición:** la escena narrativa ocupa el protagonismo, con controles limitados, jerarquía visible y áreas seguras para superposiciones. No existen áreas seguras universales: deben registrarse por escena y resolución.

La referencia de continuidad ya documentada en [DIRECCION_ARTISTICA_PILOTO.md](DIRECCION_ARTISTICA_PILOTO.md) sigue vigente. Esta especificación la **complementa**, no sustituye sus inventarios, archivos ni decisiones.

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

Las preguntas aparecen en momentos narrativos relevantes, con frecuencia ajustable. Flujo tipo: **escena antes de la pregunta → elección de opción → explicación amable y fuente → desenlace fiel a Cervantes → descubrimiento opcional → continuación**. La imagen previa no debe revelar la solución; una imagen posterior puede ilustrar el desenlace. Toda pregunta debe tener respaldo editorial específico.

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
