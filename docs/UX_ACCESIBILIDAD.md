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
2. **Aventura:** contexto audiovisual, puntos opcionales, pregunta contextual, elección, explicación, revelación, descubrimiento y continuación sin pantallas administrativas excesivas.
3. **Preguntas:** exclusivamente selección de una o varias opciones declaradas, verdadero/falso, hotspots, ordenación o emparejamiento accesible; **ninguna respuesta libre escrita**. Si hay varias correctas debe indicarse inequívocamente. Evitar zonas pequeñas y arrastre obligatorio: ofrecer alternativa con teclado.
4. **Lector:** 126 capítulos, navegación por parte/capítulo, posición persistente, tipografía ajustable, búsqueda, marcadores y anotaciones; salto al pasaje que fundamenta una respuesta y regreso a la aventura.
5. **Atlas/museo:** abiertos desde el principio, filtrado sencillo, fichas comprensibles y procedencia visual explícita; no hacer depender la consulta de destreza con mapas o zoom.
6. **Cuaderno:** consulta de descubrimientos y notas, recuperación por episodio/personaje, diferenciación de contenido editorial e IA bajo petición.
7. **Ajustes/perfiles:** accesibilidad, voz, frecuencia de preguntas, copia y restauración; cambios reversibles con confirmación ante acciones destructivas.

## 4. Estructura de pantalla de pregunta

- **Cada pregunta final tendrá su propia imagen específica y elegible**, preferentemente una escena cinematográfica existente; si no existe, acuarela secundaria o encargo nuevo. El fallback neutro es válido en prototipos/fallos, no completa la imagen exigida (DC-24). Mantener escena visible, pero priorizar contraste del panel.
- Enunciado de lectura cómoda, una única pregunta por vez; una breve referencia de contexto si es útil.
- Dos a cuatro alternativas por ejemplo; el catálogo determinará la cantidad real según contenido, sin forzar siempre cuatro.
- Botones amplios, orden visual y de foco coherentes, selección marcada por algo más que color.
- Controles de «Repetir narración», «Pista» y «Continuar» donde correspondan; evitar saturación simultánea.
- La imagen **anterior** propia de cada pregunta nunca revela una respuesta ni un hecho todavía no presentado; el desenlace permanece oculto hasta la resolución. Verificar elegibilidad y vigencia en UI, no solo `spoiler_level`.
- El resultado presenta explicación breve con opción de ampliar al fragmento exacto del libro.
- Pantallas de evaluación nunca confunden rapidez con competencia cognitiva; historial y repaso son personales y locales.

La lámina conceptual de los molinos se describe en [Dirección artística, §5](DIRECCION_ARTISTICA.md#5-ejemplo-gráfico-conceptual--episodio-de-los-molinos). La imagen PNG generada está **pendiente de incorporación física al Git**; no tratarla como asset disponible desde el repositorio.

## 5. Pruebas de caja negra

Ensayos sin formación previa con personas mayores y, para mantener alcance intergeneracional, otros perfiles de edad. Registrar para cada flujo: éxito sin ayuda, número de errores de selección, tiempo hasta comprender la pantalla (sin valorar negativamente la lentitud), recuperación tras fallos, confusión de iconos, lectura cómoda, fatiga y preferencia de ayudas. Repetir tras cada iteración significativa.

**Casos de aceptación prioritarios:** completar una aventura sin red; contestar mediante ratón y teclado; ampliar texto; reducir movimiento; activar subtítulos; repetir audio; abrir la explicación y regresar; visitar lector/atlas/museo; recuperar progreso tras cambiar de perfil. Los resultados de pruebas reales se adjuntarán posteriormente: **aún no se han efectuado en esta revisión**.

## 6. Contratos y límites

Los componentes consumen preguntas, imágenes, hotspots, textos alternativos, narración, ubicación de focos y restricciones de spoiler desde manifiestos/contratos versionados. No incorporar preguntas literarias como constantes de React. Cualquier decisión que modifique IDs, estados o esquemas debe pasar por el contrato editorial-técnico compartido.

**Vigencia:** la Fase 1 y el vertical técnico están autorizados por DC-18; **este documento por sí solo no demuestra una implementación**. Dirección integral decide UX y acepta resultados, el desarrollador único los implementa y verifica con pruebas; una galería de acuarelas formará sección artística propia, diferenciada del gameplay. Fase 2/distribución sin autorización (DC-23–DC-27).
