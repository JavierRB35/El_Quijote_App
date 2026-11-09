# UX Y ACCESIBILIDAD — EL QUIJOTE

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
