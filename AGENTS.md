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


## Hoja de ruta narrativa común (Modo Historia)

En tareas del **Modo Historia**, leer `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` (organización operativa vigente en §3), `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md` y las decisiones **DC-19, DC-21 a DC-27**. **Cada pregunta final tendrá imagen propia específica**; la narración tendrá cobertura visual atractiva, priorizando `assets/scenes/`, con acuarelas secundarias en gameplay y sección artística propia. Un fondo neutro puede servir de prototipo/fallback pero no cierra la calidad visual final.

**TS-001:** el texto de cada intervención hablada de narrador o personaje se verá **siempre** en pantalla, con y sin audio; no se puede ocultar, truncar ni omitir por avanzar. Los cambios de contratos y validadores requieren **decisión editorial/funcional de Dirección** y verificación técnica del **desarrollador único**. No se atribuirán firmas ni pruebas a antiguos roles. La documentación del Modo Historia no autoriza Fase 2.
