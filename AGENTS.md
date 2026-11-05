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

FASE 0 — auditoría y diseño. **No implementar el videojuego ni producir catálogo en masa** hasta GO/NO-GO explícito del propietario (encargo §8). Documentación y propuestas de esquema: autorizadas.

## Idioma

Trabajo y documentación en español. El castellano de las citas de Cervantes nunca se mezcla con traducciones ni parafraseos (encargo §2.6).
