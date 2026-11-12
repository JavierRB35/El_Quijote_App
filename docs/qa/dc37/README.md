# DC-37 — Implementación técnica y cobertura de Fase 1

**Estado: IMPLEMENTACIÓN PARCIAL, pendiente de composición, recursos y aceptación visual. No es cierre de DC-37.**

Base remota comprobada: `0e23a221c77ea31a83d3fe5042b826bd54660494` (2026-11-11). El encargo posterior del propietario autoriza implementar y probar DC-37 en las funciones existentes de Fase 1 e integrar los cambios conformes según DC-29. No autoriza imágenes nuevas, retoques de originales, prompts automáticos, cambios de canon, nuevas aprobaciones artísticas ni Fase 2. Esa autorización permite ejecutar el código que la decisión documental anterior había dejado pendiente; no cambia la directriz artística.

## Entregables y ámbito real

| Entregable | Evidencia |
|---|---|
| Implementación compartida | `app/src/cine/ContenedorCine.tsx`, `composicion.ts`, `lienzo.css`, `FondoContextual.tsx`; consumidores Historia/Aventura, menú, Museo y Descubrir |
| Cobertura completa por intervención | [historia_cobertura.csv](historia_cobertura.csv), una fila por ID editorial real |
| Solo intervenciones con carencias | [historia_carencias.csv](historia_carencias.csv); no contiene textos completos |
| Resumen por capítulo | [historia_resumen.csv](historia_resumen.csv) y [resumen.json](resumen.json) |
| Rondas y necesidades pre/post | [aventura_carencias.csv](aventura_carencias.csv), 66 filas / 33 rondas |
| Fondos y módulos | [FONDOS_Y_PANTALLAS.md](FONDOS_Y_PANTALLAS.md) |
| Conformidad y deuda técnica | [CONFORMIDAD_Y_QA.md](CONFORMIDAD_Y_QA.md) |
| Capturas y mediciones reales | [evidencias](evidencias) |
| Auditoría regenerable | `python tools/editorial_validation/auditar_dc37.py` |
| QA de UI reproducible | Vite local + `cd app` y `node scripts/qa-dc37.mjs` |

Se auditan **159 intervenciones** y **33 rondas** existentes de I.1, I.2, I.3, I.4, I.5 e I.8. El menú realmente activa I.1, I.2, I.4, I.5 e I.8: **129 intervenciones y 29 rondas**. I.3 tiene 30 intervenciones/cuatro rondas candidatas, permanece fuera del menú y no se activa para hacer QA. No se extrapola al conjunto de 126 capítulos ni se produce contenido nuevo.

## Resultado ejecutivo

- Se sustituye la presentación lateral permanente de ambos modos por un lienzo común a superficie completa y pergamino semitransparente. Controles, texto real, hablante, alternativas, puntuación, revelación y checkpoints conservan su contenido y lógica.
- Ocultar/mostrar conserva la intervención y la partida. Historia pausa su temporizador y bloquea atajos de avance durante contemplación; mostrar no reanuda automáticamente. El icono permanece accesible arriba a la derecha. No se incorpora un motor de voz inexistente en el código inicial.
- La geometría ensancha el pergamino dentro de regiones libres y conserva escala tipográfica; no usa scroll o recorte del texto como solución. `cover` solo se permite cuando el rectángulo crítico declarado queda íntegro. Si no existe una composición, se declara pendiente y se ofrece un respaldo de lectura; ese respaldo **no cumple el acabado visual**. La imagen completa sigue accesible al contemplar.
- Se elimina la herencia automática de fotogramas en Historia: únicamente se resuelven los recursos declarados en la unidad actual. Las declaraciones de beat de I.8 siguen pendientes de aprobación por intervención. No se activa un candidato por aparecer en el informe.
- Se corrige un fallo previo reproducido: Historia II/IV/V consultaba un episodio inexistente en el paquete base y quedaba en blanco. Ahora usa el título existente del registro del capítulo como respaldo. Sin nuevas fichas ni migraciones.
- Menú, fichas de Museo y consulta editorial comparten material y tipografía local. La capa de fondos admite recursos aprobados por destino y declara su ausencia; **no se asigna un paisaje narrativo al menú sin aprobación**.

**Cobertura validada DC-37: 0/159 = 0 %.** Es una medida conjunta de asociación, composición y QA exigidos por la nueva directriz, **no una revocación de las aprobaciones visuales existentes**. Hay 144 intervenciones con imagen pendiente de validación del nuevo uso, cuatro con objeciones de composición ya documentadas y 11 sin asignación. Existen **73 candidatos distintos** para esas 159 intervenciones; no son 159 imágenes nuevas por encargar. Ninguna necesidad de arte nuevo queda confirmada por este informe.

I.2 fue **aprobado expresamente por el propietario el 2026-11-10**, como registra `docs/PRODUCCION_CAPITULO_P1_C02_ESTADO_TECNICO_2026-11-10.md`. Se conserva esa aceptación narrativa y de recursos. Sus 23 intervenciones que comparten imágenes tienen esa justificación de uso en el capítulo aceptado; queda pendiente únicamente la composición nueva DC-37 y su QA, no una nueva autorización editorial. Los otros usos compartidos se presentan como propuestas pendientes, no como aprobaciones.

## Cómo leer las carencias

Cada fila conserva capítulo, escena, beat cuando existe, ID de intervención, hablante, localizador literario, recurso asignado y candidato, estado de aprobación, antiespoiler, composición, reutilización, motivo, prioridad y decisión. Los textos narrativos no se reproducen en las tablas.

I.1–I.5 usan IDs de origen como `H01-I01` (y las variantes reales de cada catálogo), **locales al capítulo**. No persisten un `DQ.BEAT` editorial; el adaptador genera `DQ.INT.92…` y `DQ.BEAT.92…` según el orden de los capítulos activados. No se inventan equivalencias estables en el informe: la columna beat queda vacía y se declara la deuda de trazabilidad. No cambiar esos IDs en este rediseño evita invalidar guardados; su estabilización exige una migración expresa y probada. I.8 conserva sus 16 IDs `DQ.INT.*` y diez `DQ.BEAT.*` reales.

`APTA` exige todos los controles; `PENDIENTE DE VALIDACIÓN` distingue un recurso ya existente/aprobado del resultado de su nueva composición. `NO APTA` en I.8 recoge objeciones concretas del inventario de composición de 2026-11-08 a la ruta original; las variantes `safe_right_v2` son candidatos existentes, no medios activados ni automáticamente aprobados. `SIN IMAGEN` describe ausencia de asignación, aunque la fila ofrezca un candidato. P0 bloquea la aceptación de esa pantalla/intervención, no equivale a una orden de producir arte.

La aptitud narrativa se contrasta con el catálogo y las notas vigentes del manifiesto; cuando no hay evidencia suficiente queda pendiente. No se atribuye una inspección visual completa de los 317 archivos, ni validación jurídica nueva. Se conservan los expedientes de derechos y no se concede redistribución. Los 10 primeros planos catalogados y las variantes físicas de I.8 también se revisaron como inventario; no se duplican los catálogos maestros de recursos.

## Decisiones concretas del propietario

1. Confirmar el fondo del menú: revisar primero la candidatura de paisaje/pueblo ya inventariada; si no sirve, confirmar esa carencia. Compartirla con selector/carga cuando proceda.
2. Revisar los 73 candidatos de Historia y sus asociaciones, priorizando las 11 intervenciones sin asignación de I.8 y las variantes existentes que resuelvan objeciones de composición. La aprobación de I.2 se mantiene.
3. Resolver composiciones que no dejan espacio suficiente, como `p1_c01_h01_presentacion_hidalgo_story`: proteger a Rocinante, el hidalgo y el galgo sin suprimir texto. Decidir otro encuadre existente o confirmar necesidad artística, sin retocar por iniciativa técnica.
4. Resolver las reservas pre/post de las 33 rondas en la tabla, incluyendo las cuatro de I.3 antes de su eventual activación. No cambiar respuestas para adaptar las imágenes.
5. Confirmar fondo de Museo/Galería y reutilización ambiental en los módulos existentes. Lector, Atlas, Cuaderno completo y perfiles no tienen pantalla activa que este cambio pueda adaptar.

Hasta esas decisiones se puede continuar con pruebas técnicas, accesibilidad, metadatos de composición y correcciones de presentación que no alteren contenido. No se preparan prompts ni se encargan imágenes.

## IMPACTO TRANSVERSAL Y REUTILIZACIÓN

**Causa raíz:** layouts separados de Historia y Aventura, paneles permanentes fuera de la imagen, supuestos de región segura por defecto, ausencia de contemplación y cascada de imágenes no acreditada por intervención.

**Nivel compartido:** un contenedor, una geometría, un material de lectura, una carga de fondo local y tokens de tipografía/contraste. Se respetan motores, JSON, esquema de partidas, servicios nativos y separación de catálogo/medios/progreso. Ningún original artístico cambia.

**Consumidores:** Historia y Aventura comparten composición y control de contemplación. Menú/Museo/Descubrir comparten material y tratamiento de fondos. Museo conserva `contain`, zoom, catálogo, filtros y atribución; su scroll documental no se convierte en scroll de un pergamino narrativo. Descubrir es una vista documental propia con foco modal y pausa del relato. Lector/Atlas/perfiles/Cuaderno completo no tienen consumidor activo en este frontend, por lo que no se inventan pantallas.

**Antes/después y evidencia:** capturas reales y recorrido íntegro en [CONFORMIDAD_Y_QA.md](CONFORMIDAD_Y_QA.md). La aceptación artística no se deduce de tests. Se usa rama/PR por alcance transversal y cambios de interacción; la integración se condiciona a checks obligatorios, sin force-push. El informe final comunica SHA y resultado real de CI.

## Fuentes vigentes consultadas

`AGENTS.md`; prompt maestro de incorporación; directriz ágil; `VISION_Y_DECISIONES.md`; `ENCARGO_MAESTRO.md`; directriz DC-37; dirección artística general/piloto; política visual 2026-11-08; dictamen DC-28; flujo DC-30/DC-36; reglas de Aventura; biblia de Historia y hoja de ruta; UX/accesibilidad; componentes narrativos; arquitectura/ADR; contrato editorial; especificación funcional; QA; derechos/procedencia e ilustraciones; inventario y matriz consolidada; expedientes actuales de integración I.2–I.5; JSON, manifiestos, esquemas, workflow y código afectados del HEAD de partida. Las disposiciones históricas incompatibles de columnas y prohibición de contemplación se sustituyen solo en el ámbito indicado por DC-37.

## Reasignación del fondo de Historia I.1 H01-I01 (12-11-2026)

La captura aportada mostraba el respaldo neutro de lectura porque el encuadre de `p1_c01_h01_presentacion_hidalgo_story` protegía a Quijote, Rocinante y galgo sin dejar espacio para todo el pergamino. Por elección expresa del propietario, **H01-I01** usa `p1_c01_h01_pueblo_manchego_story` (`assets/scenes/part_1/chapter_01/p1_c01_h01_pueblo_manchego_story.webp`, WebP 2048×1143, 480.812 bytes, SHA-256 `e61c787284231d2a19731cc56c4a569ea479da93fa035cae21cdcc6f003d9d3f`), optimizado desde el JPEG original sin recortar. **H01-I02 permanece sin cambios**. El encuadre declarativo de `scene:p1_c01_h01_pueblo_manchego_story` reserva a la derecha una región crítica `{x:0.50,y:0.07,w:0.44,h:0.88}`, con pergamino previsto a la izquierda. No se cambia `ContenedorCine`, el control de contemplación, el posicionamiento DC-38 ni el texto literario.

**IMPACTO TRANSVERSAL Y REUTILIZACIÓN:** causa raíz = composición incompatible entre el recurso H01 anterior y su primera intervención; nivel de solución = reasignación editorial de medio + metadatos de encuadre genéricos, no parches CSS. Consumidor afectado: Historia H01-I01; no afectados: H01-I02, las restantes 24 intervenciones, Aventura, Museo, Menú y otros módulos. Antes: respaldo oscuro con imagen accesible al ocultar texto. Después **esperado, aún no acreditado con captura en ejecución**: imagen a lienzo completo y texto intacto sobre pergamino semitransparente a la izquierda; permanece respaldo de emergencia. Validación de datos mediante manifiesto y prueba de catálogo; QA visual/CI aún por confirmar.

**Pendientes P0:** probar a 1366×768, 1920×1080, 1280×800, 2560×1440 y 3840×2160, escalado Windows 100/125/150 %, fuente normal/grande/muy grande, ausencia de desbordamiento, contraste WCAG AA, protección del pueblo y molinos, encuadre cover/contain, pausa/continuación, controles accesibles y contemplación sin pérdida de estado. Verificar el alcance de los derechos del archivo generado por IA y el cotejo directo DC-31. La asociación y calidad visual final permanecen **PENDIENTES**: este cambio no certifica aceptación global DC-37 ni altera otros estados del capítulo.
