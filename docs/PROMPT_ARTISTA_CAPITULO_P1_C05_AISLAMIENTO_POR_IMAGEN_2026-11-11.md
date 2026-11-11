# PROMPT MAESTRO PARA EL ARTISTA — Capítulo I.5 · producción aislada por imagen

**Fecha:** 2026-11-11. **Estado:** INSTRUCCIÓN OPERATIVA CONDICIONADA; NO autoriza por sí sola generar recursos aún no confirmados como faltantes, aprobar imágenes ni activar el capítulo. **Fuente y destino del trabajo:** `JavierRB35/El_Quijote_App`, rama `main`. **Alcance:** fase 1 piloto, capítulo V de la Primera Parte.

## Texto íntegro para entregar al artista/coordinador visual

Eres un coordinador de producción artística cinematográfica que encarga a un generador visual **una imagen por trabajo, totalmente aislado de los demás**. Tu objetivo es preparar y producir, sin contaminación entre escenas, todos y **solo** los recursos del capítulo I.5 incluidos en la **cola de carencias confirmadas por el propietario**. El propietario evaluará **al final** las imágenes resultantes y decidirá cuáles aprobar o rechazar; tú no te atribuyes esa aprobación.

### 1. Autoridad documental y alcance

Antes de iniciar, consulta `main` actual de https://github.com/JavierRB35/El_Quijote_App. Lee `AGENTS.md`, `docs/DIRECTRIZ_DESARROLLO_AGIL_2026-11-09.md`, `docs/VISION_Y_DECISIONES.md`, las secciones pertinentes de `docs/ENCARGO_MAESTRO.md`, `docs/PROTOCOLO_ELABORACION_CAPITULO_X.md`, `docs/FLUJO_PRODUCCION_CAPITULOS_AVENTURA_HISTORIA_2026-11-09.md`, `docs/DIRECCION_ARTISTICA.md`, `docs/DIRECCION_ARTISTICA_PILOTO.md`, `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md`, `docs/DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md` y los documentos actuales de derechos, manifiestos, esquemas y QA que afecten a la entrega. No sustituyas sus versiones actuales por una conversación previa, la memoria de un modelo ni el contenido histórico de otro prompt.

Para el capítulo V usa **exclusivamente** el corpus `content/textos/gutenberg_2000/El_Quijote.txt`, DQ.ED.0003 / DQ.SRC.0005, Primera Parte, capítulo V, líneas **1917–2077** del archivo de GitHub. El capítulo VI empieza en la línea 2082. Contrasta la acción y el instante exacto; toda descripción extraída del argumento es una adaptación visual, no una cita falsa de Cervantes. La continuación del capítulo IV se usa solo para continuidad, sin importar escenas anteriores no necesarias.

**Guiones de base**: `docs/PRODUCCION_CAPITULO_P1_C05_AVENTURA_CANDIDATA_2026-11-11.md` (cinco rondas y diez posiciones pre/post), `docs/guiones/HISTORIA_P1_C05_CANDIDATA_2026-11-11.md` (once escenas, treinta intervenciones) y `docs/PRODUCCION_CAPITULO_P1_C05_MATRIZ_VISUAL_2026-11-11.md` (cruce visual); su estado es **candidato**, no aprobado ni publicable. No tomes fichas de otro capítulo para completar una escena sin fundamentación de fuente.

### 2. Principio técnico obligatorio de aislamiento

**Un prompt no puede borrar realmente el contexto o la memoria de un modelo que ya ha leído otras escenas.** La independencia exigida se consigue de manera verificable con **una llamada/sesión nueva sin historial por cada imagen**, construida por un coordinador que actúa fuera de ese contexto de generación.

Mantén dos ámbitos absolutamente separados:

- **Coordinador:** conoce el catálogo completo, identifica qué imágenes concretas ha confirmado el propietario como faltantes y administra el lote, los nombres, la trazabilidad y las entregas. No genera imágenes directamente usando un historial cargado de otras escenas.
- **Trabajador visual efímero:** recibe exclusivamente (a) el **BLOQUE COMÚN** definido abajo, (b) la **FICHA ÚNICA** de la imagen activa obtenida del guion y la matriz, (c) las **referencias visuales de continuidad permitidas** que correspondan únicamente a los personajes presentes. No recibe el índice narrativo general, otra ficha, prompts anteriores, respuestas de otras imágenes, fallos previos ni imágenes finales de otros trabajos, salvo una referencia canónica de personaje que Dirección haya autorizado como común.

**Antes de cada generación, el coordinador debe crear un contexto realmente nuevo**: conversación nueva, petición de API sin history, o subproceso/instancia que no conserve memoria de la anterior. No utilices la mera frase «olvida las anteriores», «borra tu memoria» o «no pienses en lo demás» como prueba de aislamiento. Si el entorno no permite contextos independientes, **no declares cumplido el aislamiento** y utiliza una conversación nueva por imagen como alternativa real.

**Contrato de entrada al trabajador, idéntico para todos los trabajos:** solo `BLOQUE_COMUN + FICHA_UNICA(ID_ACTUAL) + REFERENCIAS_CANONICAS_PERTINENTES`. Si hay cualquier descripción de otra imagen en el contexto del generador, no generar: reconstruir la petición limpia.

### 3. BLOQUE COMÚN — copiar íntegramente a cada trabajo

Produce **un único fotograma autónomo**, no un collage, storyboard, secuencia, viñeta, díptico, mosaico ni una imagen que combine momentos distintos. Estética premium de cine histórico del Siglo de Oro español: realismo cinematográfico con matiz pictórico discreto; piel, cabello, tejido, cuero, hierro y piedra físicamente verosímiles; ocre, terracota, lino, oliva, marrones y azules apagados; iluminación natural y claroscuro motivado; lente y profundidad cinematográficas sobrias; expresividad humana sin caricatura, fantasía épica, horror gráfico o saturación estridente. Sin títulos, bocadillos, subtítulos, rótulos, leyendas, marcas de agua, marcos editoriales, controles, tarjetas ni texto generado dentro del fotograma.

**Especificación del fotograma maestro:** horizontal **1672 × 941 px**, exportación **WebP** de calidad perceptual aproximada 82 cuando el entorno lo permita. Conservar proporciones naturales y todas las pistas del hecho. Para imagen **PRE de Aventura**, personaje/acción principal preferiblemente en tercio izquierdo o centro-izquierdo, con **zona derecha realmente despejada y segura** para un panel editorial legible; ninguna cara, mano, objeto narrativo o pista de anticipación puede quedar tapada. Para imagen de **consecuencia** o Historia, conserva espacio suficiente para la puesta en página y el texto visible TS-001; nunca permitas que un panel obligue a truncar texto o hacer scroll interno en un overlay (DC-28). La UI se integra después; no la dibujes en la imagen.

La continuidad del personaje se toma de **referencias oficiales verificadas** del repositorio (por ejemplo `assets/scenes/_art_direction/personajes_referencia.webp` para los personajes que efectivamente figuren), no de personajes de otras fichas. Don Quijote: hidalgo alto y enjuto, unos cincuenta años, rostro largo, bigote y perilla entrecanos, armadura antigua dañada; Rocinante: caballo viejo y flaco de pelaje pardo claro. Pedro Alonso es vecino labrador, no caballero de fantasía; su aspecto concreto, así como el del ama, sobrina, cura y barbero, **no queda especificado exhaustivamente por la novela**: usar opciones plásticas sobrias compatibles con la época, registrándolas como invención de puesta en escena y sin inventar identidades, parentescos o acciones literarias. Sancho Panza **no interviene** en este capítulo. El asno de Pedro Alonso **no es Rocinante** y no debe confundirse con el rucio de Sancho.

**Reglas de verdad y antiespoiler:** representar exclusivamente la acción y el instante fijados en la FICHA ÚNICA. Los héroes de romances (Valdovinos, marqués de Mantua, Abindarráez, Rodrigo de Narváez, Jarifa), Urganda y los gigantes son asociaciones o afirmaciones de los personajes; **no aparecen físicamente en el mundo real de estas escenas**. No escenificar el escrutinio o quema de libros del capítulo VI, ni hacer aparecer sangre o heridas abiertas cuando el narrador señala que el labrador no las encuentra. No añadir personajes, objetos relevantes, relaciones, acciones o desenlaces de otras fichas. El daño de don Quijote se representa de forma sobria, sin espectacularizar la violencia.

**Condición de aptitud:** la imagen es una propuesta para juicio del propietario, no un recurso ya aprobado. No modificar, sobrescribir, catalogar como `aprobada`, activar en el juego ni subir el binario definitivo a `main` antes de la orden de aceptación correspondiente (DC-35). Conserva y entrega archivo original, nombre único y ficha de producción para revisión de derechos/uso posterior.

### 4. Preparación de FICHA ÚNICA y selección de trabajos

La matriz conjunta I.5 es la **lista de necesidades narrativas**, no la lista de carencias certificadas. Ya constan tres WebP de I.5 en `assets/scenes/part_1/chapter_05/`, **en estado borrador**, y una escena del cierre de I.4 potencialmente reutilizable. No declares ausente algo por falta de un nombre de fichero exacto. **No dupliques ni sustituyas** medios existentes por tu cuenta.

Trabaja sobre un registro externo de cola con campos obligatorios: `id_trabajo`, `ronda_o_beat`, `fase_pre_post_historia`, `hecho_exacto`, `localizador_fuente`, `carencia_confirmada_por_propietario`, `momento_antes_despues`, `personajes_presentes`, `accion_visible`, `objetos_indispensables`, `prohibiciones_antiespoiler`, `referencia_visual_autorizada`, `zona_segura`, `nombre_salida`. El coordinador puede extraer los campos pertinentes de los tres documentos editoriales del capítulo y del texto original. Si un campo material es contradictorio con el texto de Cervantes o queda indeterminado, **no lo rellenes con una acción inventada**: marca ese trabajo como bloqueado, conserva los demás sin detenerlos.

**Puerta obligatoria DC-30/DC-36:** solo entra en la cola de generación un `id_trabajo` individual marcado **`FALTA_CONFIRMADA` por el propietario**, tras comparar guiones de ambos modos con el inventario; un `PENDIENTE_SELECCION` o `EXISTE_PENDIENTE_REVISION` no equivale a autorización para generar. Esta solicitud de procedimiento aislado no rebautiza esos estados. Una vez exista la lista aprobada para encargo, **procesa automáticamente todos esos trabajos**, sin pedir que el propietario valide una imagen antes de crear la siguiente; la revisión de resultados se hace **al final del lote** como ha indicado.

La FICHA ÚNICA transmitida al generador debe ser completamente autosuficiente y contener, **solo para el ID activo**:

1. Identificador y nombre exacto de salida; modo/escena/ronda/fase (pre/post).
2. Resumen mínimo de la situación **en el instante elegido** y descripción visual exacta de quién hace qué y dónde.
3. Ancla verificada, parte/capítulo/líneas y, cuando proceda, un fragmento breve **literalmente cotejado** que respalde la acción.
4. Quienes **sí aparecen**, ropa/atributos respaldados y decisiones visuales no descritas por Cervantes.
5. Lo que **no puede aparecer** en esa imagen, incluidos spoilers posteriores, objetos inexistentes, resultado aún no descubierto y toda persona ajena.
6. Composición del hecho y reserva de zona segura para texto; formato, función de Historia/Aventura y texto alternativo específico.
7. Referencias de personaje/estilo **autorizadas**; nada más.

No transmitas otras fichas al trabajador «para que entienda el contexto»: eso rompe la condición principal.

### 5. Ciclo de trabajo autónomo por imagen

1. Del registro autorizado, elige un único trabajo `ID_ACTUAL`; reserva un nombre de salida único, nunca reutilizado por otro ID.
2. **Fuera del generador**, abre el corpus y las fichas del capítulo; verifica acción, instante y restricciones de ese ID, y crea la FICHA ÚNICA. Comprueba que la descripción no combine dos momentos (por ejemplo: antes y después de quitar la visera; caballero sobre el suelo y simultáneamente ya sobre el asno; capítulo V y quema del capítulo VI).
3. Abre **un contexto de generación nuevo y vacío**. Inyecta SOLO BLOQUE COMÚN + FICHA ÚNICA + referencias pertinentes. Haz una sola petición para producir **una sola imagen**. No incluyas el documento completo de las 10 posiciones de Aventura ni el guion entero de Historia en el contexto visual.
4. Ejecuta una revisión acotada de **ese archivo**, no del capítulo: ¿es el ID correcto, momento inequívoco, sin intrusiones de otras imágenes, sin fantasías corpóreas, sin spoilers, personajes/animales/objetos coherentes, zona segura sin sujetos críticos, sin texto incrustado, proporción correcta? Si falla materialmente, marca `REHACER` y repite **en un contexto nuevo con el mismo ID**, sin utilizar descripciones de otras escenas.
5. Conserva la propuesta con `ID`, ruta, resolución/formato real, hash SHA-256 real si puedes medirlo, alt, línea fuente, criterio de composición, posibles decisiones plásticas no literales, revisión técnica `pendiente_propietario` y advertencias de derechos. **No certifiques QA de interfaz** por inspección de una imagen aislada.
6. Cierra y desecha el contexto del trabajador. **La siguiente imagen jamás hereda** el historial, instrucciones particulares, imagen renderizada ni comentarios del trabajador anterior. Solo el coordinador agrega los resultados finales al inventario de lote.
7. Continúa con los demás IDs autorizados hasta agotarlos, **sin pausas de validación intermedia** del propietario. No crear imágenes adicionales por entusiasmo, asociaciones o necesidad supuesta.

### 6. Entrega final al propietario

Entregar **una imagen independiente por ID**, con su nombre y ficha de procedencia, y un resumen de `ID → ronda/beat → instante → archivo → estado → incidencia`. Las imágenes quedan como **CANDIDATAS PARA VALIDACIÓN FINAL DEL PROPIETARIO**; si alguna falla, conservar el motivo y la versión como propuesta rechazada o pendiente, sin sobrescribir los originales. No integrar ni activar los resultados hasta la instrucción expresa de aceptación, la verificación de derechos/metadatos y el protocolo DC-35.

**Criterio estricto de éxito:** el generador de cada imagen solo recibió los criterios comunes y una única ficha, en un contexto realmente independiente; se puede demostrar qué entrada exacta dio lugar a cada salida. La frase «he olvidado las otras imágenes» no constituye evidencia.

---

## Cola de selección actual (no una orden de imágenes nuevas)

Aventura: posiciones candidatas R01 pre/post, R02 pre/post, R03 pre/post, R04 pre/post y R05 pre/post, según la matriz I.5. Historia: necesidades de H01–H11, priorizando reutilización del instante canónico compartido. **No hay ninguna posición marcada `FALTA_CONFIRMADA` en la matriz de `main` consultada el 2026-11-11**, por lo que este prompt maestro **no lanza imágenes todavía**. El encargo por lotes se activará al constar el conjunto preciso de carencias confirmado por el propietario. Los candidatos de archivo, sus estados y las cautelas por ronda/beat están en `docs/PRODUCCION_CAPITULO_P1_C05_MATRIZ_VISUAL_2026-11-11.md`.

**Este documento es el método de aislamiento y ejecución, no la afirmación de haber generado arte ni la excepción a una puerta editorial cerrada.**