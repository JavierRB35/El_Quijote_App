# Modo Aventura v2 — reglas aprobadas y piloto jugable (2026-11-08)

**Estado vigente (2026-11-09):** Aventura narrativa ya integrada en `main` mediante PR #87/#95; el cuestionario anterior quedó retirado. La aceptación visual final sigue siendo independiente de la compilación y pendiente de comprobación. Producción de nuevos capítulos conforme a [DC-30](FLUJO_PRODUCCION_CAPITULOS_AVENTURA_HISTORIA_2026-11-09.md). GitHub remoto `JavierRB35/El_Quijote_App` es única fuente de verdad. SHA de `main` al iniciar: `8e3ec9694298b13c204aaffd1b70febc38e36fb3`.

## 1. Qué es ahora Aventura

El jugador observa una escena y **anticipa qué hará un personaje a continuación**, eligiendo entre respuestas predefinidas. No es un examen de conocimientos de la novela ni una historia ramificada: **los hechos, los personajes y la sucesión canónica de Cervantes permanecen invariables**, incluso si el jugador falla. El cuestionario cultural anterior se elimina del catálogo y de la aplicación. Las únicas decisiones jugables son anticipaciones narrativas verificadas, con consecuencia canónica.

Cada ronda muestra una imagen anterior al desenlace, una situación breve, el personaje protagonista y la decisión. La escena contiene pistas naturales suficientes (diálogos, gestos, motivos), sin revelar la respuesta. **Dificultad media UNIFORME en todas las rondas**: ni trivial ni frustrante; no aumenta por tramo y no se adapta algorítmicamente. Las tres opciones habituales (cuatro solo cuando esté justificado) deben ser verosímiles, inequívocas y relevantes.

## 2. Puntuación y checkpoints

| Evento | Regla vinculante |
|---|---|
| Nueva partida | 3 puntos de aventura |
| Respuesta correcta | +1 punto |
| Respuesta incorrecta | −1 punto |
| Tope | 5 puntos; no se acumulan por encima |
| Checkpoint | Momento narrativo importante, orientativamente cada 3–5 rondas |
| Cruzar un checkpoint | +1 punto, también al volver a **atravesarlo de verdad** en otra pasada |
| Guardado | Tras aplicar la bonificación, se guarda automáticamente checkpoint y saldo |
| Llegar a cero | Se revela la consecuencia inmediata, se explica brevemente y solo entonces se regresa |
| Restauración tras cero | Saldo guardado en el checkpoint, **mínimo 3** |
| Primera entrada en un checkpoint guardado | No añade otro punto: hace falta cruzarlo de nuevo |

El primer checkpoint al comenzar es el punto inicial con 3 puntos, sin bonificación de bienvenida. Un guardado no concede puntos por abrir/cerrar la aplicación. El acierto/fallo no cambia la trama. El saldo, las rondas vistas, el checkpoint y los aciertos/errores se persisten por separado de Historia. Los errores permiten aprender: al reintentar se reordenan las mismas respuestas por ID sin alterar la solución; se puede contraer el contexto de escenas ya leídas. No se oculta material nuevo.

## 3. Secuencia exacta de una respuesta

1. Imagen y contexto **previos** al suceso; jugador selecciona una de 3 respuestas.
2. Resultado inmediato **solo de la puntuación**, sin adelantar la solución.
3. Al elegir «Descubrir qué sucede», se muestra la imagen de consecuencia, el hecho canónico y su explicación breve.
4. Si el saldo es 0, el siguiente botón vuelve al checkpoint; no se abre una decisión futura.
5. Si no se ha agotado el saldo, se pasa a la siguiente ronda o se cruza el checkpoint.

La consecuencia de una respuesta incorrecta es la misma que la correcta: el jugador **no decide el destino del personaje**. Al cerrar el capítulo VIII, el combate con el vizcaíno queda deliberadamente suspendido: no se revela la continuación del capítulo IX.

## 4. Ceremonia de checkpoint

- Filigranas doradas: hito superado.
- Sello de lacre: guardado confirmado (la interfaz declara guardado cuando existe estado guardable; la persistencia real debe comprobarse).
- Escudo/insignia: hito narrativo significativo.
- Animación breve, no bloqueante, avance por botón disponible inmediatamente, compatible con `prefers-reduced-motion` y el ajuste de movimiento reducido. Sin partículas que tapen texto o sujetos.

## 5. Composición visual obligatoria (DC-28)

- Ningún cuadro de texto puede obligar a desplazarse internamente. Si el texto no cabe, se ensancha primero hacia zonas seguras; después puede reducirse tipografía **solo dentro del límite de legibilidad**.
- Cuadros con fondo semitransparente: imagen de fondo perceptible, texto contrastado.
- Composición tipo póster: imagen completa en `contain`, sin recorte y **en área propia a la izquierda**; el cuadro editorial está en una columna derecha separada de las figuras importantes. En formato estrecho se apila debajo de la imagen. Si la ventana extrema no permite todo el contenido, el desplazamiento debe ser del documento, **nunca de un cuadro**.
- No incorporar explicaciones largas a la pantalla. La narración del Modo Historia mantiene TS-001, independiente de este sistema de juego.
- Verificación visual real obligatoria a 1920×1080, 1366×768, 1280×800, escalas de texto y movimiento reducido; **no se presume superada sin capturas/prueba real**.

## 6. Cobertura del piloto

Primera Parte, capítulo VIII: **9 rondas**, en **3 tramos de 3**.

1. **Los molinos:** Sancho interpreta las aspas, don Quijote embiste, Sancho auxilia al caído; checkpoint «Los molinos de viento».
2. **Los frailes y el coche:** interpretación errónea, arremetida, reacción de Sancho ante los despojos; checkpoint «La comitiva de los frailes».
3. **El vizcaíno:** petición a la dama, reacción del vizcaíno, desafío; checkpoint «El desafío del vizcaíno». El resultado del combate queda para la narración posterior.

**Actualización DC-34 (2026-11-09):** las rondas viven en el catálogo de GitHub `content/aventura/parte_1/capitulo_08.json`, que importa el adaptador `app/src/aventura/guionNarrativo.ts`; el motor de reglas sigue en `motorNarrativo.ts`, la interfaz en `AventuraNarrativa.tsx`, los estilos en `aventuraNarrativa.css` y las pruebas en `app/tests/aventura_narrativa.test.ts`. Esquema y CI: `schemas/content/adventure-round.schema.json` y `tools/editorial_validation/validar_aventura.py`. No se introduce el cuestionario antiguo ni se declara terminada la QA visual.

**Reutilización visual real**: imágenes ya existentes y específicas de preguntas de Aventura (`DQ.MA.901004`, `901005`, `900006`, `900029`, `901008`, `901009`, `900031`, `901007`), más escenas de `assets/scenes/part_1/chapter_08/p1_c08_story_*` propias del montaje Historia. Cada ronda tiene una preimagen distinta y una consecuencia ilustrada. Las escenas Historia aún no registradas como `MediaAsset` se usan por ruta exacta existente **sin crear IDs canónicos falsos**; esa catalogación es pendiente editorial/técnico antes de publicarlas como contenido terminado. Revisión de spoilers/continuidad y derechos para toda imagen pendiente de control visual real.

## 7. Persistencia y compatibilidad

Se reutiliza el canal nativo `guardar_progreso` / `cargar_progreso` del backend Tauri y el equivalente local en desarrollo; no se modifica Rust ni se confunde con `progreso_historia`. El formato v2 incluye `version`, `episodio`, `partida`, puntos, fase, índice, checkpoint, intentos y vistas. Los guardados del cuestionario anterior no se importan ni se almacenan dentro de los guardados actuales. Si no existe una partida narrativa válida, se crea una partida nueva de 3 puntos. No convertir respuestas culturales en puntos. El formato corrupto se descarta para el modo nuevo. El paso de guardado asíncrono se serializa para evitar sobreescrituras por transiciones rápidas.

## 8. Criterios de QA y límites

**Automatizado:** reglas, 3/5 puntos, acierto/fallo, cero → revelar → volver, recuperación de checkpoint, +1 por cruce (sin exceder 5), reordenación al repetir, no modificación del canon, persistencia v2, rutas existentes de preimágenes/consecuencias y referencias de pasaje.

**Pendiente de aceptación final:** pruebas con instalador Tauri offline, comprobación física de medios no catalogados, calidad estética/poster con imágenes reales y 4 escalas de texto, legibilidad de botones, contraste en cada fotograma, y prueba de restauración al cerrar en plena revelación. No dar por cerrados esos controles mediante CI.

**Alcance editorial:** piloto de I.8, no despliegue de 126 capítulos ni autorización de Fase 2 o de distribución pública. Las citas literales son las del catálogo canónico existente; el texto nuevo es **paráfrasis editorial** y no debe presentarse como transcripción de Cervantes.
