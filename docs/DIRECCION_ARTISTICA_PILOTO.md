# Dirección artística — primer paquete de escenas

**Estado:** piloto visual para revisión, v0.1, 5 de noviembre de 2026.

## Identidad

**Realismo cinematográfico con matiz pictórico.** Los encuadres deben parecer fotogramas de una producción de época de alta calidad: piel y materiales naturales, arquitectura verosímil, polvo, luz rasante, niebla suave y color contenido. Evitar caricatura, ilustración infantil, fantasía heroica, saturación estridente, escenas de guerra desproporcionadas y exceso de ornamentos.

### Paleta y luz

- Base: tierras ocre y terracota, lino crudo, piedra caliza, marrones de madera y cuero.
- Complementos: oliva seco, ámbar de vela/hoguera, azules grisáceos del cielo y noche índigo.
- Iluminación: amanecer/atardecer para trayectos, claroscuro doméstico para interiores, fuentes cálidas localizadas para escenas nocturnas.
- Contrastado pero legible, sin aspecto de filtro de redes sociales ni halos artificiosos.

### Personajes y utilería

- **Don Quijote:** hidalgo de unos cincuenta años, muy alto y delgado, rostro largo y anguloso, bigote y perilla entrecanos, mirada exaltada y noble; armadura antigua y gastada, sin apariencia de paladín fantástico.
- **Sancho Panza:** campesino de mediana edad, más bajo y robusto, rostro cálido, barba corta, lino crudo y chaleco de lana ocre, sombrero sencillo, expresividad inteligente sin caricatura.
- **Rocinante:** caballo viejo y enjuto de pelaje pardo claro; **rucio:** burro pequeño gris.
- La imagen `_art_direction/personajes_referencia.webp` fija un primer referente de fisonomía y color, pero no es documentación de vestuario histórica.

### Cámara e interfaz

- Fotograma maestro 1672 × 941 píxeles (relación cercana a 16:9), exportado a WebP de calidad perceptual 82, sin texto sobreimpreso.
- Sujeto principal preferentemente en tercio izquierdo o central-izquierdo para reservar parte del entorno a la UI. Cada escena exige comprobación de área segura en la maquetación real; no hay caja universal garantizada.
- Elementos definidos en primer término, plano medio y fondo para zoom y paneos discretos; evitar afirmar que existe parallax real sin recortes de profundidad.
- Anular animaciones para usuarios con preferencia de movimiento reducido. No sustituir información textual por detalles visuales difíciles de ver.

### Orden narrativo

- `pre`: contexto observado o anticipación de un episodio, condicionado a la pregunta exacta que acompañe la escena.
- `post`: desenlace o consecuencia, **solo después de la revelación**.
- `reference`: identidad visual o portada general, sin adscripción como prueba de un hecho.

### Control de calidad pendiente

Antes de aprobación editorial se deben contrastar con una edición textual fijada: detalles de cada escena, capítulo, vestuario y arquitectura; corregir anacronismos o licencias artísticas relevantes, validar que los visuales no adelantan respuestas y completar localizadores de pasaje. **Ninguna revisión experta humana externa está certificada por este paquete.**
