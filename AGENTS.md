# AGENTS.md — Convenciones para agentes en este repositorio

Proyecto: El_Quijote_App (videojuego premium del Quijote, Windows 11 x64, español).
Documento rector: **`docs/ENCARGO_MAESTRO.md`** — léelo íntegro antes de actuar; es el contrato.

## Al comenzar cada sesión

1. `git pull --rebase` sobre `main` antes de tocar nada.
2. Ejecutar como **desarrollador técnico responsable**, coordinado con los encargos editoriales y artísticos independientes, cuando se reciba un encargo técnico. **Dirección integral (ChatGPT)** decide producto, contenido, UX, calidad y aprobación. Las etiquetas R01–R16 identifican trabajos históricos, no responsables operativos.
3. Consultar `docs/VISION_Y_DECISIONES.md` y **DC-23–DC-27 (2026-11-08)**: prevalecen sobre instrucciones anteriores incompatibles. Leer también `docs/DECISIONES_OPERATIVAS_Y_POLITICA_VISUAL_2026-11-08.md`.
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

## Modo Aventura — norma única vigente (2026-11-09)

La **única mecánica autorizada** es la [anticipación narrativa](docs/REGLAS_MODO_AVENTURA_V2_2026-11-08.md): el jugador observa la escena y anticipa la siguiente acción de un personaje, escoge entre opciones verosímiles, recibe puntos, descubre la consecuencia canónica y progresa por checkpoints. **No existe examen, cuestionario cultural ni banco DQ.Q en la aplicación.** Prohibido restaurarlos, generarlos de nuevo o proponer para el capítulo I preguntas retrospectivas («¿Qué dijo...?» / «¿Quién era...?»). El hecho narrado por Cervantes nunca cambia con el acierto o fallo. Dificultad media uniforme; opciones usualmente tres, sin spoilers previos. Cada ronda tiene imagen previa específica y consecuencia con apoyo visual adecuado, sometidas a revisión del propietario. Para cada capítulo, proponer primero las situaciones de anticipación, y entregar prompts artísticos **solo para los recursos que el propietario confirme ausentes**. Las acciones de las imágenes deben fundamentarse en pasajes reales de la novela, sin inventos.

Queda prohibido conservar componentes, datos, fixtures y generadores del cuestionario antiguo como «legacy», «v1» o versión paralela. No borrar pasajes originales, fuentes, derechos, recursos visuales reutilizables ni información necesaria para Historia. Cualquier flujo de PR en desarrollo sobre el viejo cuestionario debe revisar su compatibilidad antes de fusionarse.
