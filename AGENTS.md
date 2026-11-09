# AGENTS.md — Convenciones para agentes en este repositorio

Proyecto: El_Quijote_App (videojuego premium del Quijote, Windows 11 x64, español).
**LECTURA OBLIGATORIA EN CADA ENCARGO:** primero este `AGENTS.md` y luego **`docs/DIRECTRIZ_DESARROLLO_AGIL_2026-11-09.md`**. Esta directriz actualiza y sustituye las reglas históricas incompatibles de ramas/PR y validación. No omitirla ni basarse en instrucciones antiguas.
Documento rector de producto: **`docs/ENCARGO_MAESTRO.md`**. Consultar las secciones pertinentes y las decisiones más recientes; lectura íntegra cuando el alcance lo requiera. No reiniciar auditorías innecesariamente.

## Al comenzar cada sesión

1. Verificar HEAD de `origin/main` y sincronizar antes de tocar nada (`git pull --rebase origin main` si se trabaja con Git local).
2. Ejecutar como **único desarrollador** cuando se reciba un encargo técnico. **Dirección integral (ChatGPT)** decide producto, contenido, UX, calidad y aprobación. Las etiquetas R01–R16 identifican trabajos históricos, no responsables operativos.
3. Aplicar la directriz ágil del 2026-11-09 y consultar `docs/VISION_Y_DECISIONES.md` y **DC-23–DC-28 (2026-11-08)**: prevalecen sobre instrucciones anteriores incompatibles. Leer también `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md` y **`docs/DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md`**: en overlays sobre imagen, **cero scroll**, ensanchar primero de forma segura, reducir después con legibilidad, fondo semitransparente y QA tipo póster. Esta norma todavía requiere adaptación técnica; no declarar cumplimiento automático.
4. Verificar estado real de repositorio, rutas y ficheros antes de suponer nada.

## Git

- **ÚNICA FUENTE DE VERDAD Y DESTINO:** `origin/main` de GitHub `JavierRB35/El_Quijote_App`. Reportar SHA remoto inicial/final y la integración realizada. La estrategia de ramas y validación se rige por **DC-29** y `docs/DIRECTRIZ_DESARROLLO_AGIL_2026-11-09.md`, no por la regla histórica de PR para toda la Fase 1.
- **Por defecto, commits directos a `main` para documentación, imágenes/activos permitidos y cambios menores de código de bajo riesgo.** Rama + PR solo cuando complejidad, riesgo, concurrencia o protección lo justifiquen. Mantener commits pequeños y verificaciones proporcionadas. Ver `docs/GOBERNANZA_GIT.md`.
- Nunca forzar pushes, nunca reescribir historial de `main`.
- **Prohibido commitear**: secretos, claves de IA, `*.epub`, medios pesados, datos personales de jugadores (`.gitignore`).

## Fase actual

**FASE 1 — piloto coordinado** (autorizada por DC-18, GO del propietario el 2026-11-05). Autorizado: sistema vertical (molinos end-to-end), criterios de validación empírica de ADR-0001, producción editorial del piloto de 6 capítulos, QA de caja negra. **NO autorizado**: FASE 2 (producción completa), distribución pública, comercialización. **No existe obligación general de ramas/PR en Fase 1**; aplicar la política basada en riesgo de DC-29. No amplía el alcance autorizado. Entorno MSVC de esta máquina: compilar con `app/scripts/cargo-dev.cmd` y ejecutar dev con `app/scripts/tauri-dev.cmd` (el MSVC de VS 18 está incompleto; ver ADR-0001).

## Idioma

Trabajo y documentación en español. El castellano de las citas de Cervantes nunca se mezcla con traducciones ni parafraseos (encargo §2.6).

**Fuente textual vinculante para nuevas rondas, consecuencias, guiones de Historia y prompts de imágenes (DC-31, 2026-11-09):** utilizar el texto íntegro almacenado en este repositorio, `content/textos/gutenberg_2000/El_Quijote.txt` (`DQ.ED.0003` / `DQ.SRC.0005`), verificando capítulo, localizador y literalidad contra el archivo real. No buscar ni elegir otra edición como fuente principal; el EPUB Tusell (`DQ.ED.0001`) se conserva para el lector y la edición Rico (`DQ.ED.0002`) solo como cotejo auxiliar de variantes. Separar claramente citas literales de paráfrasis; no mezclar palabras de ediciones distintas. Consultar `docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md` y `docs/FLUJO_PRODUCCION_CAPITULOS_AVENTURA_HISTORIA_2026-11-09.md`.


## Hoja de ruta narrativa común (Modo Historia)

En tareas del **Modo Historia**, leer `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` (organización operativa vigente en §3), `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md` y las decisiones **DC-19, DC-21 a DC-27**. **Cada ronda final de Aventura tendrá una preimagen específica**, y Modo Historia conserva su cobertura visual propia; la narración tendrá cobertura visual atractiva, priorizando `assets/scenes/`, con acuarelas secundarias en gameplay y sección artística propia. Un fondo neutro puede servir de prototipo/fallback pero no cierra la calidad visual final.

**TS-001:** el texto de cada intervención hablada de narrador o personaje se verá **siempre** en pantalla, con y sin audio; no se puede ocultar, truncar ni omitir por avanzar. Los cambios de contratos y validadores requieren **decisión editorial/funcional de Dirección** y verificación técnica del **desarrollador único**. No se atribuirán firmas ni pruebas a antiguos roles. La documentación del Modo Historia no autoriza Fase 2.

## Modo Aventura — norma única vigente (2026-11-09)

La **única mecánica autorizada** es la [anticipación narrativa](docs/REGLAS_MODO_AVENTURA_V2_2026-11-08.md): el jugador observa la escena y anticipa la siguiente acción de un personaje, escoge entre opciones verosímiles, recibe puntos, descubre la consecuencia canónica y progresa por checkpoints. **No existe examen, cuestionario cultural ni banco DQ.Q en la aplicación.** Prohibido restaurarlos, generarlos de nuevo o proponer para el capítulo I preguntas retrospectivas («¿Qué dijo...?» / «¿Quién era...?»). El hecho narrado por Cervantes nunca cambia con el acierto o fallo. Dificultad media uniforme; opciones usualmente tres, sin spoilers previos. Cada ronda tiene imagen previa específica y consecuencia con apoyo visual adecuado, sometidas a revisión del propietario. Para cada capítulo, proponer primero las situaciones de anticipación, y entregar prompts artísticos **solo para los recursos que el propietario confirme ausentes**. Las acciones de las imágenes deben fundamentarse en pasajes reales de la novela, sin inventos.

Queda prohibido conservar componentes, datos, fixtures y generadores del cuestionario antiguo como «legacy», «v1» o versión paralela. No borrar pasajes originales, fuentes, derechos, recursos visuales reutilizables ni información necesaria para Historia. Cualquier flujo de PR en desarrollo sobre el viejo cuestionario debe revisar su compatibilidad antes de fusionarse.

## Regla permanente — correcciones transversales y reutilización

**Obligatoria para todo trabajo presente y futuro, en todos los módulos de la aplicación.** Un error observado en una escena, capítulo, ronda narrativa o pantalla es un **caso de reproducción**, no el ámbito exclusivo de la solución. Toda corrección de UX, composición, presentación, accesibilidad o comportamiento debe estudiar su aplicabilidad al conjunto de El Quijote.

1. **Diagnóstico y alcance:** documentar causa raíz y buscar el mismo patrón en Aventura, Historia, Museo, Atlas, Lector, Cuaderno, menús y ajustes, además de otros consumidores reales. Distinguir defecto de asset, de contenido, de contrato y de presentación.
2. **Cambio en el nivel compartido adecuado:** preferir reglas generales, tokens de diseño, layouts y componentes reutilizables; conservar la arquitectura *data-driven*. Evitar CSS, condicionales y componentes ad hoc identificados por escena, pregunta, capítulo o archivo. Los metadatos de composición, si son necesarios, se definen con semántica genérica y contrato revisado, no como parches encubiertos.
3. **Respeto a las diferencias funcionales:** «aplicación global» no significa una interfaz idéntica en todos los módulos. Un lector de texto largo necesita desplazamiento; las rondas de anticipación y los overlays cinematográficos cumplen las reglas específicas de DC-28. Acuarelas/obras patrimoniales se muestran íntegras; las escenas cinematográficas pueden usar encuadre adaptativo solo si preservan el hecho narrativo esencial. Nunca ocultar texto ni degradar accesibilidad para eliminar un scroll.
4. **Propagación y no regresión:** identificar consumidores afectados y ejecutar pruebas allí, incluyendo otro módulo distinto del caso que originó el defecto cuando proceda. Cualquier excepción debe justificarse, quedar acotada y disponer de una prueba. No declarar la mejora «global» solo por corregir una captura aislada.
5. **Entrega Git obligatoria:** incluir en cada cambio correctivo, sea commit directo o PR un apartado **«IMPACTO TRANSVERSAL Y REUTILIZACIÓN»** con: causa raíz; regla/componente corregido; inventario de consumidores afectados y no afectados (con razón); antes/después; pruebas cruzadas y evidencias; excepciones; limitaciones, pendientes y resultado real de CI. Actualizar la documentación canónica de Arquitectura, UX y QA si la regla cambia.
6. **Aceptación:** ningún defecto se cierra solo por desaparecer en su pantalla inicial. Dirección integral acepta la solución después de revisar su alcance, evidencia y regresiones. Aplicar la directriz ágil DC-29: commit a `main` para correcciones menores y PR cuando el riesgo lo justifique; nunca omitir gates obligatorios.

Desarrollo técnico: [Arquitectura — política transversal](docs/ARQUITECTURA_Y_ADR.md#política-transversal-de-correcciones-y-reutilización), [UX — aplicación por módulos](docs/UX_ACCESIBILIDAD.md#8-aplicación-transversal-y-diferencias-por-módulo), [QA — compuerta transversal](docs/PLAN_QA_Y_ACEPTACION.md#9-gate-de-impacto-transversal-para-correcciones).

## Regla permanente — producción capítulo a capítulo (DC-30, 2026-11-09)

Aplicar [el flujo oficial por capítulos](docs/FLUJO_PRODUCCION_CAPITULOS_AVENTURA_HISTORIA_2026-11-09.md): **primero Aventura** (rondas de anticipación, tres opciones habituales, acción y consecuencia canónicas con ancla textual) → **el propietario comprueba y valida imágenes existentes** → Dirección redacta prompts **solo para imágenes faltantes confirmadas** → **después Historia** (guion y textos con TS-001) → revisión de reutilización intermodal y nuevas carencias. Empezar por la Parte I, capítulo I. No producir preguntas de examen ni inventar acciones o detalles como hechos de Cervantes.

**Arte:** el propietario es quien solicita y valida todas las imágenes. Reutilizar siempre que sea narrativamente seguro una misma imagen en Historia y Aventura, respetando preimagen exclusiva antiespoiler por ronda (DC-24). **El diseñador puede incorporar directamente a `main` imágenes que el propietario ya haya aprobado**, sin abrir una rama o PR solo por esos recursos; verificar bytes, SHA-256, licencias, manifiesto, identificadores, trazabilidad y commit. No activar ni marcar aprobada una imagen sin autorización expresa. Respetar DC-29 para todos los demás cambios y límites de Fase 1.
