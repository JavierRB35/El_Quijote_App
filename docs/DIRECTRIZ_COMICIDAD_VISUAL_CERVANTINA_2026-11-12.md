# DC-40 — Comicidad visual cervantina sin alterar el estilo cinematográfico

**Aprobación del propietario:** 2026-11-12. **Estado:** APROBADA Y VINCULANTE.  
**Fuente y destino:** `JavierRB35/El_Quijote_App`, rama `main`.  
**Ámbito:** dirección artística, evaluación de imágenes, prompts futuros y QA visual de Aventura e Historia; aplicable solo a escenas con humor narrativo comprobado.  
**Efecto:** sustituye reglas artísticas anteriores incompatibles **exclusivamente en cuanto impidan expresar la comicidad**. No autoriza crear, regenerar, retocar, activar o integrar imágenes ni modificar código por esta sola decisión.

## 1. Mandato obligatorio

**En los pasajes cómicos de Cervantes, el artista deberá explotar la comicidad del momento y trasladarla inequívocamente a la imagen para suscitar una sonrisa y, cuando la situación lo permita, la risa del jugador.** No basta con representar la acción literalmente de forma impasible, neutra o excesivamente solemne. Debe escogerse un instante y una puesta en escena que comuniquen la gracia, ironía, absurdo, equívoco o humor físico que ya existen en el episodio.

**Se conserva el estilo visual actual sin excepción:** realismo cinematográfico premium con matiz pictórico, iluminación verosímil, personajes anatómicamente coherentes y reconocibles, continuidad de fisonomías, vestuario, escenografía y época. **Expresividad cómica intensa no significa estilo cartoon, caricatura, ilustración infantil, meme o deformación grotesca.** El humor procede de la dirección de actores y de la composición, no de alterar la identidad plástica del proyecto.

## 2. Técnicas expresivas exigibles cuando procedan

- **Rostros y gestos:** sorpresa, estupor, incredulidad, orgullo imperturbable, desconcierto, miradas cruzadas y lenguaje corporal intenso, siempre naturalista y adecuado al personaje y al episodio.
- **Contraste cervantino:** la convicción épica de don Quijote frente a lo que realmente sucede; las reacciones creíbles de Sancho u otros personajes **solo cuando estén presentes o sean compatibles con el texto**. Mostrar lo ridículo de la situación sin perder la dignidad humana del personaje.
- **Instante y encuadre:** elegir el momento visual permitido más revelador del chiste, con composición, escala, postura, objetos y relaciones espaciales que permitan comprenderlo rápidamente. Buscar una imagen que por sí misma pueda hacer reír.
- **Gradación inteligente:** una escena de ironía suave puede buscar sonrisa; una situación abiertamente hilarante exige mayor energía actoral y visual. No convertir en comedia escenas trágicas, íntimas, dramáticas o documentales.
- **Claridad y legibilidad:** no tapar gestos, caras u objetos que constituyan el mecanismo cómico con pergaminos, controles, recortes ni efectos. Comprobar las zonas seguras en la composición final.

## 3. Límites que permanecen íntegros

1. **DC-31, fidelidad al texto:** cotejar el pasaje en `content/textos/gutenberg_2000/El_Quijote.txt`. No inventar acciones, personajes, objetos, accidentes, causalidad, diálogos o consecuencias para forzar la risa; distinguir dirección actoral interpretativa de hechos descritos literalmente.
2. **Antiespoiler y pre/post:** la preimagen de Aventura no mostrará el resultado, aunque el gag sea más gracioso después. Reservar el efecto de la consecuencia para la imagen `post` o la intervención cronológicamente correspondiente de Historia.
3. **Continuidad y verosimilitud:** conservar identidad, proporciones, utilería, siglo XVII y física plausible. Expresiones exacerbadas de forma creíble sí; fisonomías caricaturizadas o transformadas, no.
4. **DC-28, DC-37, DC-38, DC-39:** respetar imagen protagonista, pergamino semitransparente, zonas seguras, integridad del texto, controles accesibles y la posición y visibilidad de controles aprobadas.
5. **DC-36 y autoridad del propietario:** primero Aventura y los textos de Historia, después examen conjunto de aptitud e inventario, identificación de carencias por el propietario y prompts **solo de imágenes faltantes confirmadas**. No generar variantes o imágenes por iniciativa propia.
6. **Derechos y QA:** procedencia, autorizaciones, licencias, integridad de obras históricas, metadatos, aceptación visual del propietario y pruebas proporcionadas siguen siendo obligatorios.

## 4. Reglas para evaluación y futuros prompts

Para cada escena a evaluar, indicar de forma breve: **¿es cómica según el pasaje? ¿qué mecanismo humorístico aparece? ¿qué gesto/contraste/instante lo transmite visualmente?** Estas descripciones son campos de trabajo, no un cambio automático de esquemas.

Si el propietario confirma que falta una imagen y autoriza un prompt, este incluirá la referencia textual y parte/capítulo, función `pre` o `post`, elementos que no pueden anticiparse, intención cómica, expresión y reacciones admisibles, composición y zonas seguras. Instrucción expresa al artista: **«Potencia decididamente el humor de este instante para provocar sonrisa o risa mediante actuación y composición creíbles, conservando exactamente el realismo cinematográfico premium; sin caricatura, invenciones ni spoilers».**

**Criterio de aceptación:** la imagen transmite de un vistazo la comicidad existente en el pasaje, no solo su información factual, con expresión visual poderosa y continuidad cinematográfica. Una representación fría o solemne que silencie la gracia de una escena genuinamente cómica **no es artísticamente apta**, aunque narre bien el hecho. La valoración de si resulta divertida corresponde al propietario; no afirmar que una prueba automatizada demuestra una reacción subjetiva ni sustituir imágenes aprobadas sin nueva orden.

## 5. Derogación expresa y alcance exacto

**Quedan DESPLAZADAS desde la aprobación e integración de DC-40, únicamente en escenas cómicas, las interpretaciones de directrices anteriores —incluidas `docs/DIRECCION_ARTISTICA.md`, `docs/DIRECCION_ARTISTICA_PILOTO.md` y pliegos históricos de prompts— que exijan serenidad, sobriedad, rigidez, contención gestual o solemnidad hasta el punto de impedir el efecto humorístico narrado por Cervantes.** No deben aplicarse simultáneamente a ese efecto expresivo. Esto **no** deroga las prohibiciones de caricatura, infantilización o ruptura de estilo: una actuación cómica intensa y realista es compatible con ellas.

Se conservan, sin excepciones implícitas, los requisitos de DC-28 a DC-39 en sus respectivos ámbitos, la fidelidad literaria, la continuidad, el antiespoiler, los derechos, las fases, la accesibilidad, la integridad de las obras, el flujo de aprobación y la autoridad de GitHub.

**La presente decisión es exclusivamente normativa y documental. Ningún recurso gráfico ha sido solicitado ni producido por ella.**
