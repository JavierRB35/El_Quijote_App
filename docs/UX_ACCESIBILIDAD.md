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

## 7. Norma vigente de overlays (DC-28; prevalece sobre criterios orientativos)

Para Historia, Aventura y cualquier **texto superpuesto a escena**, se aplicará [DC-28](DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md): **sin scroll interno**, texto y controles completos a la vista; **ensanchar horizontalmente primero** solo en zona segura, **reducir letra después** sin bajar del suelo tipográfico legible; **fondo semitransparente** con contraste demostrado; no tapar protagonistas/acciones/hotspots; composición **tipo póster**. Las bandas máximas anteriores son guías, no autorización para recortar texto. Nunca convertir una preferencia de letra grande en un defecto oculto o en un scroll.

QA visual obligatoria: cubrir tamaños normales y ampliados, 1920×1080/1366×768/1280×800 y escalado Windows 125/150 %, frases extensas, preguntas de muchos controles, zonas claras/oscuras y movimiento reducido. Se inspeccionan a la vez legibilidad, accesibilidad, contenido íntegro, geometría y calidad estética. El lector íntegro y vistas sin imagen no están sometidos a la prohibición de scroll del **overlay**. Incompatibilidades sin solución segura bloquean aprobación visual; no se alteran datos editoriales unilateralmente.

## 8. Aplicación transversal y diferencias por módulo

**Norma permanente:** una corrección visible en una pregunta o escena pasa a ser un criterio del sistema UX compartido, y se revisa en todos los consumidores pertinentes; no se declara resuelta únicamente por el caso de partida. Desarrollo documenta la trazabilidad según [AGENTS.md](../AGENTS.md#regla-permanente--correcciones-transversales-y-reutilización) y la [arquitectura](ARQUITECTURA_Y_ADR.md#política-transversal-de-correcciones-y-reutilización).

| Superficie | Aplicación de reglas comunes | Diferencia funcional legítima |
|---|---|---|
| Aventura | Imagen protagonista, controles y alternativas visibles, encuadre seguro, tipografía ajustable, foco | Pregunta y feedback sin scroll de overlay; hotspot exige imagen íntegra en el área interactiva |
| Historia | Narración y personajes visibles, bandas en zona segura, texto TS-001 íntegro, control de ritmo | Panel narrativo lateral/inferior según composición; avance nunca oculta texto |
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
