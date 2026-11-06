# AGENTS.md — Convenciones para agentes en este repositorio

Proyecto: El_Quijote_App (videojuego premium del Quijote, Windows 11 x64, español).
Documento rector: **`docs/ENCARGO_MAESTRO.md`** — léelo íntegro antes de actuar; es el contrato.

## Al comenzar cada sesión

1. `git pull --rebase` sobre `main` antes de tocar nada.
2. Declarar **modo** (DESARROLLO / CONTENIDOS / COORDINACIÓN-AUDITORÍA) y perfiles profesionales asumidos.
3. Consultar `docs/VISION_Y_DECISIONES.md`: **no reabrir decisiones cerradas**.
4. Verificar estado real de repositorio, rutas y ficheros antes de suponer nada.

## Git

- `origin/main` (GitHub, privado) es la **única fuente de verdad** y debe estar **siempre actualizado**: reglas completas en `docs/GOBERNANZA_GIT.md`.
- Nunca forzar pushes, nunca reescribir historial de `main`.
- FASE 0: commits directos a `main` permitidos para documentación. FASE 1+: ramas `feature/*` + Pull Request.
- **Prohibido commitear**: secretos, claves de IA, `*.epub`, medios pesados, datos personales de jugadores (`.gitignore`).

## Fase actual

**FASE 1 — piloto coordinado** (autorizada por DC-18, GO del propietario el 2026-11-05). Autorizado: sistema vertical (molinos end-to-end), criterios de validación empírica de ADR-0001, producción editorial del piloto de 6 capítulos, QA de caja negra. **NO autorizado**: FASE 2 (producción completa), distribución pública, comercialización. Código en ramas `feature/*` + Pull Request. Entorno MSVC de esta máquina: compilar con `app/scripts/cargo-dev.cmd` y ejecutar dev con `app/scripts/tauri-dev.cmd` (el MSVC de VS 18 está incompleto; ver ADR-0001).

## Idioma

Trabajo y documentación en español. El castellano de las citas de Cervantes nunca se mezcla con traducciones ni parafraseos (encargo §2.6).


## Hoja de ruta narrativa común (Modo Historia)

Al asumir un trabajo relativo al **Modo Historia**, leer también `docs/BIBLIA_NARRATIVA_MODO_HISTORIA_HOJA_RUTA_ROLES.md` (sección R01–R16 correspondiente al perfil), y `docs/HOJA_RUTA_MODOS_HISTORIA_E_HISTORICO.md`. Las decisiones DC-21/DC-22 de `docs/VISION_Y_DECISIONES.md` son vinculantes.

**TS-001:** el texto de cada intervención hablada de narrador o personaje se verá **siempre** en pantalla, con y sin audio; no se puede ocultar, truncar ni omitir por avanzar. Contratos y validadores compartidos requieren revisión editorial y técnica; la hoja de ruta no significa que el juego ya implemente TS-001. La documentación del Modo Historia no autoriza Fase 2.
