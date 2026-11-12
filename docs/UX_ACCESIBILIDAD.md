# UX Y ACCESIBILIDAD — EL QUIJOTE

**Implementación autorizada 2026-11-11:** ver [DC-37: implementación, carencias y QA](qa/dc37/README.md). Se incorporan contemplación pausada y reversible, icono permanente, pergamino compartido y medición del contenido. Las composiciones y fondos pendientes no se dan por aceptados. La última intervención de Historia se lee antes de abrir su cierre editorial, sin alterar palabras; los controles compactos conservan nombres accesibles. Descubrir conserva todo su contenido en una vista documental propia y recupera el foco al cerrar.

> **Actualización vinculante DC-37 (2026-11-11):** Historia/Aventura: escena completa y pergamino histórico semitransparente para texto, opciones y feedback; icono de contemplación accesible arriba a la derecha, texto visible por defecto, ocultación pausada y restauración íntegra; ningún fondo neutro final. Esta regla prevalece sobre pantallas laterales anteriores. Consultar [DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md](DIRECTRIZ_VISUAL_PREMIUM_LIENZO_VIVO_2026-11-11.md). Las instrucciones históricas incompatibles se consideran sustituidas **solo en el ámbito indicado**; no se autoriza código ni producción de imágenes.

**Versión:** propuesta 0.2 · **Fecha:** 2026-11-06 · **Estado:** diseño Fase 0, validación pendiente.
**Responsables:** desarrollo frontend, UX/UI/accesibilidad, contenidos y QA.
**Vínculos:** [Dirección artística](DIRECCION_ARTISTICA.md) · [Piloto visual](DIRECCION_ARTISTICA_PILOTO.md) · [Encargo maestro](ENCARGO_MAESTRO.md).

## 1. Usuarios y principios

La aplicación conserva su alcance intergeneracional, pero **prioriza a las personas de edad avanzada para decisiones de ergonomía y pruebas de usabilidad**. Evitar suposiciones uniformes sobre visión, audición o destreza: ofrecer preferencias ajustables por perfil y probarlas con usuarios reales de capacidades variadas.

Objetivos: claridad inmediata, navegación previsible, control del ritmo, acceso a ayuda, bajo coste de aprendizaje, autonomía sin internet y respeto a la dignidad del jugador. La aplicación es un producto cultural y de entretenimiento con actividades cognitivas, **no un tratamiento o diagnóstico sanitario**.

## 2. Reglas de interacción (orientativas hasta validación)

| Aspecto | Requisito de diseño |
|---|---|
| Texto | Base recomendada 20–22 px para lectura corriente, **ajustable**; reflujo sin truncamientos |
| Objetivos de clic | Preferencia de áreas ≥48×48 CSS px y separación visible |
| Contraste | WCAG AA como referencia mínima, 4,5:1 texto normal, 3:1 texto grande y controles gráficos relevantes |
| Estado de foco | Indicador visible, secuencia lógica y operabilidad con teclado |
| Acciones | Etiquetas claras y consistentes; evitar instrucciones solo por iconos o color |
| Animación | Movimiento ambiental suave y desactivable; respetar preferencias de reducción |
| Audio | Subtítulos, control de volumen, repetición y pausa; información no exclusiva del audio |
| Tiempo | Sin límite obligatorio en aventura y preguntas; desafíos temporizados solo voluntarios |
| Errores | Pistas y reintentos sin bloqueo, sin mensajes humillantes |
| Configuración | Persistencia por perfil; acceso a personalización desde inicio y juego |

No declarar cumplimiento técnico sin auditoría automatizada y manual. Los tamaños son hipótesis de diseño y deben evaluarse en el dispositivo objetivo.

## 3. Flujos mínimos

1. **Inicio/perfil:** continuar como acción principal; accesos claros a comenzar, aventura aleatoria, atlas, museo, lector, cuaderno y ajustes. Introducción breve, omisible y recuperable.
2. **Aventura:** contexto audiovisual, puntos de aventura, anticipación de la acción, elección, puntuación, revelación canónica, checkpoint y continuación sin pantallas administrativas excesivas.
3. **Aventura:** anticipación de la siguiente acción, tres alternativas habituales y una consecuencia canónica. Ninguna respuesta escrita ni examen retrospectivo. Teclado y foco accesibles.
4. **Lector:** 126 capítulos, navegación por parte/capítulo, posición persistente, tipografía ajustable, búsqueda, marcadores y anotaciones; salto al pasaje que fundamenta una respuesta y regreso a la aventura.
5. **Atlas/museo:** abiertos desde el principio, filtrado sencillo, fichas comprensibles y procedencia visual explícita; no hacer depender la consulta de destreza con mapas o zoom.
6. **Cuaderno:** consulta de descubrimientos y notas, recuperación por episodio/personaje, diferenciación de contenido editorial e IA bajo petición.
7. **Ajustes/perfiles:** accesibilidad, voz, frecuencia de preguntas, copia y restauración; cambios reversibles con confirmación ante acciones destructivas.

## 4. Pantalla de anticipación de Aventura

- La experiencia no evalúa conocimientos: presenta una situación previa, muestra qué personaje afronta el siguiente lance y pregunta qué hará a continuación. Alternativas usualmente tres, dificultad moderada uniforme y una acción fiel a Cervantes.
- Una **preimagen exclusiva de la ronda**, validada contra spoilers, acompaña a la situación; la imagen de consecuencia se presenta únicamente al seleccionar «Descubrir qué sucede».
- Tras escoger: mostrar primero +1/−1 punto, luego el desenlace narrativo canónico y explicación breve. Nunca crear bifurcaciones ficticias.
- Inicio 3 puntos, máximo 5, checkpoints con bonificación y recuperación tras agotamiento según reglas canónicas de Aventura.
- Texto completo, alternativas simultáneamente visibles, no scroll interno, teclado/foco accesible, contraste y escenas sin cortes; aplicar DC-28. Tamaños de texto personalizables, movimiento reducido y controles con área cómoda.
- El propietario confirma las imágenes ya disponibles y solicita únicamente las faltantes con prompts artísticos exactos y fidelidad al texto de la novela; un asset sin validación no equivale a cobertura final.
- Los contenidos culturales no evaluativos siguen disponibles en Lector, Museo, Cuaderno y Modo Histórico. No restaurar un cuestionario de conocimientos.

## 5. Pruebas de caja negra

Ensayos sin formación previa con personas mayores y, para mantener alcance intergeneracional, otros perfiles de edad. Registrar para cada flujo: éxito sin ayuda, número de errores de selección, tiempo hasta comprender la pantalla (sin valorar negativamente la lentitud), recuperación tras fallos, confusión de iconos, lectura cómoda, fatiga y preferencia de ayudas. Repetir tras cada iteración significativa.

**Casos de aceptación prioritarios:** completar una aventura sin red; contestar mediante ratón y teclado; ampliar texto; reducir movimiento; activar subtítulos; repetir audio; abrir la explicación y regresar; visitar lector/atlas/museo; recuperar progreso tras cambiar de perfil. Los resultados de pruebas reales se adjuntarán posteriormente: **aún no se han efectuado en esta revisión**.

## 6. Contratos y límites

Los componentes consumen preguntas, imágenes, hotspots, textos alternativos, narración, ubicación de focos y restricciones de spoiler desde manifiestos/contratos versionados. No incorporar preguntas literarias como constantes de React. Cualquier decisión que modifique IDs, estados o esquemas debe pasar por el contrato editorial-técnico compartido.

**Vigencia:** la Fase 1 y el vertical técnico están autorizados por DC-18; **este documento por sí solo no demuestra una implementación**. Dirección integral decide UX y acepta resultados, el desarrollador único los implementa y verifica con pruebas; una galería de acuarelas formará sección artística propia, diferenciada del gameplay. Fase 2/distribución sin autorización (DC-23–DC-27).

## 7. Norma vigente de overlays (DC-28; prevalece sobre criterios orientativos)

Para Historia, Aventura y cualquier **texto superpuesto a escena**, se aplicará [DC-28](DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md): **sin scroll interno**, texto y controles completos a la vista; **ensanchar horizontalmente primero** solo en zona segura, **reducir letra después** sin bajar del suelo tipográfico legible; **fondo semitransparente** con contraste demostrado; no tapar protagonistas/acciones/hotspots; composición **tipo póster**. Las bandas máximas anteriores son guías, no autorización para recortar texto. Nunca convertir una preferencia de letra grande en un defecto oculto o en un scroll.

QA visual obligatoria: cubrir tamaños normales y ampliados, 1920×1080/1366×768/1280×800 y escalado Windows 125/150 %, frases extensas, preguntas de muchos controles, zonas claras/oscuras y movimiento reducido. Se inspeccionan a la vez legibilidad, accesibilidad, contenido íntegro, geometría y calidad estética. El lector íntegro y vistas sin imagen no están sometidos a la prohibición de scroll del **overlay**. Incompatibilidades sin solución segura bloquean aprobación visual; no se alteran datos editoriales unilateralmente.

## 8. Aplicación transversal y diferencias por módulo

**Norma permanente:** una corrección visible en una ronda o escena pasa a ser un criterio del sistema UX compartido, y se revisa en todos los consumidores pertinentes; no se declara resuelta únicamente por el caso de partida. Desarrollo documenta la trazabilidad según [AGENTS.md](../AGENTS.md#regla-permanente--correcciones-transversales-y-reutilización) y la [arquitectura](ARQUITECTURA_Y_ADR.md#política-transversal-de-correcciones-y-reutilización).

| Superficie | Aplicación de reglas comunes | Diferencia funcional legítima |
|---|---|---|
| Aventura | Imagen protagonista, controles y alternativas visibles, encuadre seguro, tipografía ajustable, foco | Anticipación y consecuencia sin scroll en overlays; hotspot exige imagen íntegra en el área interactiva |
| Historia | Imagen a toda superficie, pergamino semitransparente en zona segura, texto TS-001 revisado íntegro y visible por defecto, control de contemplación arriba a la derecha | Sin columna lateral independiente ni scroll; ocultación voluntaria pausa voz/avance y permite restauración íntegra. DC-39: flechas «<» y «>» siempre visibles (deshabilitadas pero visibles en contemplación y atenuadas cuando no proceda navegar); autoocultación de 2 s exclusivamente para Reproducir/Pausar, sin cambios en su comportamiento |
| Museo | Proporciones, procedencia, contraste, foco, vista contemplativa | Obras patrimoniales siempre completas; galerías y fichas extensas admiten scroll accesible |
| Atlas | Claridad de controles, información y zonas útiles, navegación por teclado | Mapas requieren pan/zoom y fichas adaptativas; no imponer restricciones propias de una pregunta |
| Lector | Legibilidad, reflujo, tamaño de letra, navegación, conservación de posición | Lectura extensa con scroll permitido y necesario |
| Cuaderno | Tarjetas/fichas, consistencia tipográfica, accesibilidad, procedencia | Notas y listados extensos admiten scroll |
| Inicio, menús y ajustes | Jerarquía, contraste, foco visible, escalado y controles coherentes | Formularios, preferencias y listados pueden desplazarse si es necesario para preservar accesibilidad |

### Reglas de decisión

1. **Comprobar asset y layout por separado.** Si un protagonista aparece cortado, comparar el fichero original con su representación; identificar `cover`/`contain`, escalado, recorte y zona focal. No regenerar medios solo para ocultar un fallo del visor.
2. **Proteger contenido y contexto.** Ningún rostro, gesto, acción, pista u hotspot esencial debe quedar oculto por recorte o panel; en imágenes patrimoniales, ninguna parte de la obra debe desaparecer por llenar el monitor.
3. **Resolver la geometría sin trampas.** Para overlays de Historia/Aventura: sin scroll interno ni alternativas ocultas; primero usar espacios seguros, después redistribuir, y ajustar tamaño solo dentro del suelo tipográfico validado. No trasladar el scroll del panel a la página, ni confundir `overflow: hidden` con corrección. El contenido excepcional incompatible se eleva a Dirección, sin aprobación ficticia.
4. **Preservar autonomía y accesibilidad.** Foco visible, teclado, alternativas de arrastre, tamaño de texto configurable, zoom/Windows 125–150 %, movimiento reducido y lectura íntegra.
5. **Revisión cruzada.** Toda modificación de presentación compartida debe probar tanto el flujo donde se descubrió el defecto como otro módulo consumidor real; documentar cuando un módulo no comparta el componente y cómo hereda la regla por tokens o patrón.

Los criterios de cobertura por resolución y evidencia se concretan en [QA §9](PLAN_QA_Y_ACEPTACION.md#9-gate-de-impacto-transversal-para-correcciones). **Estas reglas son especificación; su publicación no prueba que estén implementadas ni validadas visualmente.**
