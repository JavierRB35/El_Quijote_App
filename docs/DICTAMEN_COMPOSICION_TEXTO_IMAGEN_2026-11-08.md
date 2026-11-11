# DC-28 — Dictamen global de composición texto + imagen (2026-11-08)

> **Actualización vinculante DC-37 (2026-11-11):** DC-28 continúa imponiendo cero scroll, íntegro y contraste, pero DC-37 añade imagen a superficie completa, pergamino, icono de contemplación y rechaza pantalla dividida/vista separada como acabado visual narrativo. TS-001 se sustituye solo en la prohibición de ocultación voluntaria. Consultar [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Las instrucciones históricas incompatibles se consideran sustituidas **solo en el ámbito indicado**; no se autoriza código ni producción de imágenes.

**Estado:** VIGENTE · decisión expresa del propietario · aplicable a Historia, Aventura y cualquier texto sobre imagen.  
**Fuente de verdad:** GitHub `JavierRB35/El_Quijote_App`; base de auditoría de esta decisión: `main@8e3ec9694298b13c204aaffd1b70febc38e36fb3` (árbol `4c04ca62272c2d6cb96b3b9589486827fefa594c`).  
**Relaciones:** DC-03, DC-21, DC-22/TS-001 y DC-23–DC-27; `docs/VISION_Y_DECISIONES.md`, `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md`, `docs/UX_ACCESIBILIDAD.md`, `docs/DIRECCION_ARTISTICA.md`.  
**Alcance de esta entrega:** norma, trazabilidad y auditoría técnica preliminar; **no** se afirma que el CSS o el reproductor ya cumplan. Sin rediseño masivo, nuevas imágenes, cambios de contenido, contrato o estado editorial.

## 1. Dictamen obligatorio: precedencia y alcance

La imagen es protagonista y el texto debe integrarse con calidad compositiva equivalente a una **lámina o póster**. Esta norma **sustituye toda pauta anterior incompatible**, incluidas las soluciones de scroll dentro del overlay, los paneles opacos sobre imágenes y la prioridad inversa de reducción de fuente frente a ensanchamiento seguro.

Para **todo cuadro de texto superpuesto a una imagen** (narración, diálogo, pregunta, opciones, feedback, cita, subtítulo, descubrimiento sobre el lienzo y variantes de ampliación):

1. **Cero scroll**, tanto vertical como horizontal, interno al cuadro; no esconder contenido fuera del área visible, ni usar `overflow: auto/scroll` o desplazamiento táctil como solución. El contenido exigido debe estar visible sin desplazamiento.
2. Si no cabe, **ensanchar horizontalmente primero**, aprovechando el área segura realmente disponible en esa imagen/estado/resolución. Nunca atravesar rostros, acciones, pistas, objetos, hotspots ni otras regiones narrativas relevantes.
3. Solo después, **reducir gradualmente la fuente** hasta un límite **legible y comprobado**; conservar contraste, interlineado, foco, botones y preferencia de texto aumentado. No establecer un mínimo en píxeles sin validación de hardware/usuarios; usar un token explícito de suelo tipográfico a verificar. El control del usuario para aumentar texto no puede romper la integridad visual.
4. **Fondo semitransparente obligatorio** en cualquier cuadro de texto sobre imagen, con contraste suficiente durante todos los fotogramas. Blur moderado opcional, nunca sustituto de contraste. No utilizar paneles opacos o transparencias tan altas que oculten el texto o la escena.
5. **Calidad de póster**: composición unitaria, jerarquía visual deliberada, equilibrio de espacios, escena comprensible de un vistazo, texto cómodo y ningún elemento esencial tapado. Valorar la composición completa, no solo el texto ni solo la imagen.

Si ni el máximo ancho seguro ni el mínimo tipográfico legible bastan: **no activar scroll, recortar, truncar, forzar opacidad ni invadir la imagen**. Registrar ese estado como **no conforme**; usar un plano/encuadre compatible o una **segmentación editorial íntegra, expresamente aprobada, dentro del sistema de escena completa y pergamino**; si falla, declarar NO CONFORME y no aprobar una vista separada como acabado final (DC-37) unilateralmente. TS-001 exige el texto íntegro de cada intervención activa; cualquier fraccionamiento editorial requiere decisión expresa y actualización trazada de los datos, no paginación o salto oculto automático.

**Límites de alcance:** los documentos largos del lector íntegro, los menús independientes y otras vistas que **no** son cuadros sobre imagen pueden conservar su navegación/scroll habitual. Un cajón de descubrimiento que **se superpone al lienzo** sí queda sujeto a esta regla; si es demasiado largo, deberá transformarse en vista independiente, no en cajón con scroll. Las acuarelas deben preservar integridad y proporción cuando el recurso lo requiera; ningún `cover` indiscriminado da derecho a recortar lo relevante.

## 2. Sustituciones explícitas y evidencia inicial

| Regla/hallazgo previo | Evidencia concreta en `main@8e3ec9694298` | Nueva regla / tratamiento |
|---|---|---|
| Scroll interno como salida para narración y preguntas | `app/src/cine/ContenedorCine.tsx` (comentario que legitima scroll); `app/src/App.css` (selectores `.banda-texto`, `.lectura`, `.panel-pregunta` con `overflow-y: auto`) | **Derogado como criterio aceptable.** Se documenta deuda técnica y se prohíbe declararlo conforme hasta corregir CSS y verificar capturas. |
| Mostrar solo parte de opciones en panel ligero y el resto mediante scroll | `app/src/App.css`, comentario del panel: «~2,5–3 opciones visibles; el resto, en scroll interno» | **Sustituido:** todas las opciones necesarias y el enunciado visibles sin scroll; primero anchura segura, después tamaño sin perder legibilidad. |
| Panel expandido que sigue dependiendo de scroll | `app/src/App.css`, `.panel-pregunta:has(.panel-pregunta-cuerpo.amplio)` con límite de altura 88vh; `ReproductorHistoria.tsx`, `lecturaAmplia` | La ampliación voluntaria tampoco es excepción; no puede invadir zonas críticas ni ocultar texto. |
| Contraste fundamentado mediante panel opaco | `docs/DIRECCION_ARTISTICA.md` §9.3 («panel opaco o suficientemente sólido»); `app/src/App.css` usa `--panel-solido` en cajones flotantes | **Sustituido en overlays:** superficie semitransparente con contraste comprobado. Panel sólido admisible únicamente en una vista **sin imagen subyacente**. |
| Máximos de altura que imponen scroll antes de explorar anchura | `app/src/App.css`: 34vw en narración; 52vh en pregunta, 62vh en ancho <=1100px | Los límites existentes son **estado técnico anterior**, no cotas autorizadas del nuevo diseño. Adaptar ancho primero dentro de área segura; revisar alto/padding/fuente después. |
| Reencuadre, pantalla dividida o pantalla de pregunta dedicada como solución general previa | `docs/DIRECCION_ARTISTICA.md` §9.2 | Continúan **solo como contingencia después** de intentar ensanchamiento seguro y reducción legible; si se separa el texto de la imagen, declarar expresamente cambio de presentación. |
| TS-001 anterior: texto siempre visible (modificada por DC-37) | `docs/VISION_Y_DECISIONES.md` DC-22; `docs/COMPONENTES_NARRATIVOS_UX.md` §1–2 | **Vigente con DC-37**: íntegro y visible por defecto; ocultación contemplativa voluntaria permitida, con voz/avance pausados y recuperación total. Prohibidos scroll y omisión. |

Los límites histórico-orientativos de ocupación visual (p. ej. bandas 25–30 % laterales / 20–25 % inferiores y panel ligero 30–35 % de altura) **no habilitan scroll ni prevalecen** sobre estas cinco reglas. Son hipótesis para zonas seguras, sujetas a validación por escena y viewport. Los informes antiguos se conservan como evidencia de su contexto, no se reescribe su historia.

## 3. Inventario técnico preliminar (código inspeccionado, sin ejecución visual)

| Ruta y consumidor | Qué superpone | Estado / riesgo constatado |
|---|---|---|
| `app/src/cine/ContenedorCine.tsx` | Lienzo compartido y ranuras `banda-texto`, `panel-pregunta`, cabecera, rótulos y lateral | Punto central adecuado para solución declarativa. Comentario declara scroll; capa de imagen `.plano` usa `object-fit: cover`, con riesgo de pérdida de detalles. |
| `app/src/historia/ReproductorHistoria.tsx` | Hablante, `texto_visible`, información de beat, controles, cierre; opción `lecturaAmplia` | TS-001 mantiene texto en DOM, pero `.banda-texto` + `.lectura` pueden desplazarlo. El autoavance no resuelve legibilidad si queda fuera de viewport. |
| `app/src/aventura/ModoAventura.tsx` | Pregunta, opciones de seis tipos, feedback y explicación; `panelAmplio` | `panel-pregunta` admite scroll. Ordering/matching y opciones largas pueden exceder; hotspot requiere máxima preservación de la escena. |
| `app/src/cine/PanelDescubrir.tsx` + `app/src/App.css` (`.descubrir`) | Cajón opcional superpuesto con descubrimientos | `overflow-y: auto` y `--panel-solido` en un cajón sobre el lienzo: debe revisarse como overlay o migrarse a vista separada. |
| `app/src/App.css` | Estilos de overlays, tipografía, responsividad y carga del plano | `overflow-y:auto` en narración, lectura, pregunta y cajón; `@media (max-width:1100px)` estrecha/reubica; `--escala-texto` sube a 1.32; sin reserva de ancho segura basada en geometría comprobada. |

**No realizado:** análisis de DOM calculado, pruebas CSS reales, contraste fotograma a fotograma, capturas comparables, tests nativos, inspección de todos los 126 capítulos o validación de todas las imágenes. Son tareas posteriores y **no** deben calificarse como PASS en esta PR.

## 4. Parámetros técnicos a controlar (sin introducir cambios disruptivos ahora)

| Parámetro | Dónde vive / propuesta | Validación necesaria |
|---|---|---|
| `overlay_max_width` y `overlay_min_width` | Tokens CSS y capacidad del `ContenedorCine`, limitados por la **zona segura real** y viewport | Medir anchura disponible, evitar solapes, ensanchar antes de disminuir fuente |
| `padding_inline/block` | Tokens CSS por estado, sin estilos por fichero de imagen | Priorizar reducir ornamentos/padding excesivo antes de sacrificar texto |
| `font_size_base/min`, `line_height`, `text_scale` | Tokens CSS con preferencia `html[data-ajuste-texto]`; límite accesible acordado tras pruebas | Texto íntegro y legible en 100/125/150 % Windows, pref. grande/muy grande, zoom y contraste |
| `background_alpha`, `backdrop_blur` | Fondo RGBA `0 < alpha < 1`, tokens CSS semitransparentes | Contraste sobre escenas claras/oscuras y con blur ausente, sin efecto «muro opaco» |
| `overlay_position`, `safe_side` | `encuadreDe(...).lado_texto` ya existente; ampliar metadatos **solo si es necesario** | Ubicación robusta ante `cover/contain`, viewport y zonas ocupadas por cabecera/controles |
| `safe_regions` y `critical_regions` normalizadas | Metadatos de arte/encuadre a consensuar; no introducir nuevo JSON Schema en esta PR | Protección de caras, gestos, acción, pistas y hotspots; no basarse solo en lado |
| `overflow_policy` y detección de desbordamiento | Pruebas del consumidor con `scrollHeight/clientHeight`, `scrollWidth/clientWidth`; revisión visual y accesibilidad | **Sin scroll del cuadro** y sin desbordamiento, truncado, recorte ni control oculto |
| `image_fit`, `object_position`, escala/crop | Resolver por tipo de activo y encuadre, manteniendo hotspots en coordenadas de imagen real | No perder regiones críticas; acuarela/obra íntegra cuando corresponda |
| `viewport/safe-area` | Ancho y alto disponibles después de cabecera, pie y controles | Evaluar 1920×1080, 1365/1366×768, 1280×800, ventana estrecha |

**Orden técnico de adaptación propuesto:** (a) calcular zona segura real; (b) colocar y **ensanchar horizontalmente** el panel hasta el máximo compatible; (c) ajustar padding sin comprometer interacción; (d) reducir fuente progresivamente con suelo legible; (e) si no cabe, **fallar la aceptación visual** y solicitar solución de plano/encuadre/vista separada. Se conserva una arquitectura **genérica, declarativa y reutilizable**; no CSS por imagen ni cambios ad hoc por pregunta.

## 5. Checklist mínima de validación visual obligatoria

Registrar `PASS / FAIL / PENDIENTE`, captura y viewport exacto **por estado significativo** (Historia: diálogo corto/largo, texto aumentado, sin audio; Aventura: MCQ, multi, ordering, matching, hotspot, feedback; Descubrir abierto; imagen muy clara y oscura):

- [ ] **Sin scroll**: ni interno vertical ni horizontal en overlays de texto; todas las palabras y controles necesarios visibles, sin recorte/truncado.
- [ ] **Anchura antes que reducción**: si el texto necesita espacio, se demuestra que el panel se ensanchó solo por zona segura antes de reducir fuente.
- [ ] **Fondo semitransparente** en todos los cuadros sobre imagen, sin panel opaco ni contraste insuficiente.
- [ ] **No tapa elementos relevantes**: sujeto, caras, gestos, acciones, pistas, objetos, hotspots y texto de otras capas protegidas.
- [ ] **Legibilidad suficiente**: tamaños, contraste, foco, line-height y selección confortables; ajustes de texto grande/muy grande siguen funcionando.
- [ ] **Composición apta «tipo póster»**: escena comprensible primero, panel integrado armónicamente, equilibrio y claridad a golpe de vista.
- [ ] **TS-001 y funciones intactas**: texto íntegro en cada intervención activa; navegación, pausa, repetición, teclado y persistencia sin regresiones.
- [ ] **Resoluciones y escalados**: capturas de 1920×1080, 1365/1366×768, 1280×800, texto grande/muy grande, escalado Windows 125/150 %, escena en movimiento y modo reducido.

Una prueba de código o contraste aislado **no** equivale al juicio visual «tipo póster». Para aprobar, adjuntar capturas reales, conflictos de zonas seguros anotados y decisión de Dirección; toda casilla sin evidencia queda `PENDIENTE`.

## 6. Riesgos y siguiente validación

- **R1 (P0):** scroll efectivo y texto fuera de vista en overlays actuales; no corregido por documentación.
- **R2 (P0):** convivencia de TS-001 + texto largo + viewport bajo + tipografía grande puede carecer de solución con una imagen; se debe revisar el plano, reservar una región propia o obtener aprobación editorial para un cambio de presentación, sin truncar.
- **R3 (P0):** `object-fit: cover`, zoom/parallax y hotspots pueden invalidar una zona segura predefinida.
- **R4 (P1):** semitransparencia puede producir contraste variable (claros/movimiento), y el fallback sin blur debe seguir siendo semitransparente.
- **R5 (P1):** preguntas ordering/matching, explicaciones extensas y cajón Descubrir exigen tratamiento específico **sin componentes por escena**.
- **R6 (P1):** no existe todavía una medición reproducible de «póster» ni capturas de aceptación del nuevo dictamen.

**Próxima PR técnica:** implementar y probar de modo incremental el algoritmo de ajuste, auditar overflow de cada estado con datos representativos, validar accesibilidad/capturas reales y documentar incompatibilidades imposibles. **Este documento no autoriza Fase 2, migración masiva ni alteración del texto cervantino.**
