# Dirección artística — colección de escenas

> **DC-40, 2026-11-12:** en episodios cómicos potenciar la comicidad perceptible —expresiones, lenguaje corporal y contraste— para provocar sonrisa/risa con realismo cinematográfico intacto; la contención incompatible queda desplazada, **no** la prohibición de caricatura. [Norma completa](DIRECTRIZ_COMICIDAD_VISUAL_CERVANTINA_2026-11-12.md).

> **Actualización vinculante DC-37 (2026-11-11):** Se aplica la nueva presentación cinematográfica completa: imágenes de Historia/Aventura a toda superficie útil, pergaminos semitransparentes y contemplación voluntaria reversible; ningún fondo neutro constituye acabado final. Consultar [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Las instrucciones históricas incompatibles se consideran sustituidas **solo en el ámbito indicado**; no se autoriza código ni producción de imágenes.

**Estado:** piloto visual para revisión, v0.5, 5 de noviembre de 2026. Cinco baterías, 59 imágenes en conjunto (58 escenas y una referencia de personajes).

## Política visual vigente (DC-24–DC-27, decisión del propietario 2026-11-08)

- **Preguntas:** cada pregunta de una entrega final tendrá **imagen propia, exclusiva y específica**, elegida o producida para su enunciado; no basta reutilizar en varias preguntas una escena genérica. Todas las imágenes previas respetan el momento narrativo y no adelantan la respuesta.
- **Modo Historia:** montaje suficientemente ilustrado, cinematográfico e interesante; variedad de planos de establecimiento, acción y reacción/continuidad según necesidad. Una secuencia extensa de fondo neutro puede servir para desarrollar y probar, **no como aprobación artística final del capítulo**.
- **Orden de recursos:** `assets/scenes/` primero, `assets/closeups/` si complementan una escena, acuarelas solo como recurso secundario dentro del juego; nuevas imágenes mediante **prompt exacto de Dirección** si ninguna opción existente es apta. No mezclar estilos sin razón editorial.
- **Galería/Sección artística:** acuarelas Tusell/Doré y tradición ilustrativa como contenido principal de una sección dedicada, con contexto, fuente, autoría y comparación opcional con escenas, respetando derechos.
- **Producción y entrega:** Dirección (ChatGPT) hace selección, define y revisa prompts; el director artístico crea imágenes solo cuando el propietario lo encarga; el desarrollador único incorpora archivos, manifiestos, IDs, SHA, alt, fase, licencias y pruebas al repositorio **GitHub**. No declarar `review.state` ni redistribución autorizados sin evidencia.
- **TS-001 revisada por DC-37:** texto íntegro y accesible, visible por defecto y recuperable después de ocultación voluntaria del pergamino con el avance pausado. El neutro es únicamente respaldo técnico de emergencia o prototipo, nunca una pantalla artística final ni transición final aceptada.

Referencias vinculantes: `docs/VISION_Y_DECISIONES.md` DC-23–DC-27 y `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md`.

## Identidad

**Realismo cinematográfico con matiz pictórico.** Los encuadres deben parecer fotogramas de una producción de época de alta calidad: piel y materiales naturales, arquitectura verosímil, polvo, luz rasante, niebla suave y color contenido. Evitar caricatura (no confundir con actuación cómica intensa pero realista exigida por DC-40), ilustración infantil, fantasía heroica, saturación estridente, escenas de guerra desproporcionadas y exceso de ornamentos.

### Paleta y luz

- Base: tierras ocre y terracota, lino crudo, piedra caliza, marrones de madera y cuero.
- Complementos: oliva seco, ámbar de vela/hoguera, azules grisáceos del cielo y noche índigo.
- Iluminación: amanecer/atardecer para trayectos, claroscuro doméstico para interiores, fuentes cálidas localizadas para escenas nocturnas.
- Contrastado pero legible, sin aspecto de filtro de redes sociales ni halos artificiosos.

### Personajes y utilería

- **Don Quijote:** hidalgo de unos cincuenta años, muy alto y delgado, rostro largo y anguloso, bigote y perilla entrecanos, mirada exaltada y noble; armadura antigua y gastada, sin apariencia de paladín fantástico.
- **Sancho Panza:** campesino de mediana edad, más bajo y robusto, rostro cálido, barba corta, lino crudo y chaleco de lana ocre, sombrero sencillo, expresividad inteligente, con gestualidad cómica verosímil cuando lo pida el episodio y sin caricatura.
- **Rocinante:** caballo viejo y enjuto de pelaje pardo claro; **rucio:** burro pequeño gris.
- La imagen `_art_direction/personajes_referencia.webp` fija un primer referente de fisonomía y color, pero no es documentación de vestuario histórica.

### Cámara e interfaz

- Fotograma maestro 1672 × 941 píxeles (relación cercana a 16:9), exportado a WebP de calidad perceptual 82, sin texto sobreimpreso.
- Sujeto principal preferentemente en tercio izquierdo o central-izquierdo para reservar parte del entorno a la UI. Cada escena exige comprobación de área segura en la maquetación real; no hay caja universal garantizada.
- Elementos definidos en primer término, plano medio y fondo para zoom y paneos discretos; evitar afirmar que existe parallax real sin recortes de profundidad.
- Anular animaciones para usuarios con preferencia de movimiento reducido. No sustituir información textual por detalles visuales difíciles de ver.
- Las baterías segunda a quinta incorporan perspectivas de interiores, conversaciones, objetos escénicos, paisajes, escenas multitudinarias y desafíos sin depender siempre del mismo encuadre de protagonistas a caballo; conservar esta diversidad en la producción posterior. La cuarta introduce al narrador-marco y un cuento intercalado; la quinta añade una historia del cautivo, escenas de reconciliación y el gobierno de Sancho. No presentar episodios interpolados como si Don Quijote hubiera presenciado sus hechos.

### Orden narrativo

- `pre`: contexto observado o anticipación de un episodio, condicionado a la pregunta exacta que acompañe la escena.
- `post`: desenlace o consecuencia, **solo después de la revelación**.
- `reference`: identidad visual o portada general, sin adscripción como prueba de un hecho.

### Control de calidad pendiente

Antes de aprobación editorial se deben contrastar con una edición textual fijada: detalles de cada escena, capítulo, vestuario y arquitectura; corregir anacronismos o licencias artísticas relevantes, validar que los visuales no adelantan respuestas y completar localizadores de pasaje. **Ninguna revisión experta humana externa está certificada por este paquete.**
