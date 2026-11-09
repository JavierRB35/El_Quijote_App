# AGENTS.md — Convenciones para agentes en este repositorio

Proyecto: El_Quijote_App (videojuego premium del Quijote, Windows 11 x64, español).
Documento rector: **`docs/ENCARGO_MAESTRO.md`** — léelo íntegro antes de actuar; es el contrato.

## Al comenzar cada sesión

1. `git pull --rebase` sobre `main` antes de tocar nada.
2. Ejecutar como **único desarrollador** cuando se reciba un encargo técnico. **Dirección integral (ChatGPT)** decide producto, contenido, UX, calidad y aprobación. Las etiquetas R01–R16 identifican trabajos históricos, no responsables operativos.
3. Consultar `docs/VISION_Y_DECISIONES.md` y **DC-23–DC-28 (2026-11-08)**: prevalecen sobre instrucciones anteriores incompatibles. Leer también `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md` y **`docs/DICTAMEN_COMPOSICION_TEXTO_IMAGEN_2026-11-08.md`**: en overlays sobre imagen, **cero scroll**, ensanchar primero de forma segura, reducir después con legibilidad, fondo semitransparente y QA tipo póster. Esta norma todavía requiere adaptación técnica; no declarar cumplimiento automático.
4. Verificar estado real de repositorio, rutas y ficheros antes de suponer nada.

## Git

- **ÚNICA FUENTE DE VERDAD Y DESTINO:** `origin/main` de GitHub `JavierRB35/El_Quijote_App` (privado). **Cada prompt al desarrollador deberá recordarlo expresamente**: verificar SHA remoto antes de empezar, desarrollar en rama, devolver cambios al **mismo GitHub** mediante PR y reportar SHA inicial/final. Reglas completas en `docs/GOBERNANZA_GIT.md`.
- Nunca forzar pushes, nunca reescribir historial de `main`.
- FASE 0: commits directos a `main` permitidos para documentación. FASE 1+: ramas `feature/*` + Pull Request.
- **Prohibido commitear**: secretos, claves de IA, `*.epub`, medios pesados, datos personales de jugadores (`.gitignore`).

## Fase actual

**FASE 1 — piloto coordinado** (autorizada por DC-18, GO del propietario el 2026-11-05). Autorizado: sistema vertical (molinos end-to-end), criterios de validación empírica de ADR-0001, producción editorial del piloto de 6 capítulos, QA de caja negra. **NO autorizado**: FASE 2 (producción completa), distribución pública, comercialización. Código en ramas `feature/*` + Pull Request. Entorno MSVC de esta máquina: compilar con `app/scripts/cargo-dev.cmd` y ejecutar dev con `app/scripts/tauri-dev.cmd` (el MSVC de VS 18 está incompleto; ver ADR-0001).

## Idioma

Trabajo y documentación en español. El castellano de las citas de Cervantes nunca se mezcla con traducciones ni parafraseos (encargo §2.6).


## Hoja de ruta narrativa común (Modo Historia)

En tareas del **Modo Historia**, leer `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` (organización operativa vigente en §3), `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md` y las decisiones **DC-19, DC-21 a DC-27**. **Cada pregunta final tendrá imagen propia específica**; la narración tendrá cobertura visual atractiva, priorizando `assets/scenes/`, con acuarelas secundarias en gameplay y sección artística propia. Un fondo neutro puede servir de prototipo/fallback pero no cierra la calidad visual final.

**TS-001:** el texto de cada intervención hablada de narrador o personaje se verá **siempre** en pantalla, con y sin audio; no se puede ocultar, truncar ni omitir por avanzar. Los cambios de contratos y validadores requieren **decisión editorial/funcional de Dirección** y verificación técnica del **desarrollador único**. No se atribuirán firmas ni pruebas a antiguos roles. La documentación del Modo Historia no autoriza Fase 2.

## Regla permanente — correcciones transversales y reutilización

**Obligatoria para todo trabajo presente y futuro, en todos los módulos de la aplicación.** Un error observado en una escena, capítulo, pregunta o pantalla es un **caso de reproducción**, no el ámbito exclusivo de la solución. Toda corrección de UX, composición, presentación, accesibilidad o comportamiento debe estudiar su aplicabilidad al conjunto de El Quijote.

1. **Diagnóstico y alcance:** documentar causa raíz y buscar el mismo patrón en Aventura, Historia, Museo, Atlas, Lector, Cuaderno, menús y ajustes, además de otros consumidores reales. Distinguir defecto de asset, de contenido, de contrato y de presentación.
2. **Cambio en el nivel compartido adecuado:** preferir reglas generales, tokens de diseño, layouts y componentes reutilizables; conservar la arquitectura *data-driven*. Evitar CSS, condicionales y componentes ad hoc identificados por escena, pregunta, capítulo o archivo. Los metadatos de composición, si son necesarios, se definen con semántica genérica y contrato revisado, no como parches encubiertos.
3. **Respeto a las diferencias funcionales:** «aplicación global» no significa una interfaz idéntica en todos los módulos. Un lector de texto largo necesita desplazamiento; las preguntas y los overlays cinematográficos cumplen las reglas específicas de DC-28. Acuarelas/obras patrimoniales se muestran íntegras; las escenas cinematográficas pueden usar encuadre adaptativo solo si preservan el hecho narrativo esencial. Nunca ocultar texto ni degradar accesibilidad para eliminar un scroll.
4. **Propagación y no regresión:** identificar consumidores afectados y ejecutar pruebas allí, incluyendo otro módulo distinto del caso que originó el defecto cuando proceda. Cualquier excepción debe justificarse, quedar acotada y disponer de una prueba. No declarar la mejora «global» solo por corregir una captura aislada.
5. **Entrega Git obligatoria:** incluir en cada PR correctiva un apartado **«IMPACTO TRANSVERSAL Y REUTILIZACIÓN»** con: causa raíz; regla/componente corregido; inventario de consumidores afectados y no afectados (con razón); antes/después; pruebas cruzadas y evidencias; excepciones; limitaciones, pendientes y resultado real de CI. Actualizar la documentación canónica de Arquitectura, UX y QA si la regla cambia.
6. **Aceptación:** ningún defecto se cierra solo por desaparecer en su pantalla inicial. Dirección integral acepta la solución después de revisar su alcance, evidencia y regresiones. Respetar el flujo de ramas/PR de Fase 1 y no fusionar automáticamente.

Desarrollo técnico: [Arquitectura — política transversal](docs/ARQUITECTURA_Y_ADR.md#política-transversal-de-correcciones-y-reutilización), [UX — aplicación por módulos](docs/UX_ACCESIBILIDAD.md#8-aplicación-transversal-y-diferencias-por-módulo), [QA — compuerta transversal](docs/PLAN_QA_Y_ACEPTACION.md#9-gate-de-impacto-transversal-para-correcciones).
