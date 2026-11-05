# GOBERNANZA GIT — «GitHub como repositorio principal, siempre actualizado»

**Decisión del propietario (2026-11-05):** GitHub (`JavierRB35/El_Quijote_App`, privado, rama `main`) es el **repositorio principal y única fuente de verdad** del proyecto, y debe mantenerse **siempre actualizado**. Registrada como `D-2026-11-05-01` en `VISION_Y_DECISIONES.md`.

## 1. Principio rector

Ningún trabajo está terminado hasta que está en `origin/main`. El estado local de cualquier máquina es **desechable**; lo que no está en GitHub se considera no hecho. `main` en GitHub es además la copia de seguridad de todo el trabajo documental y de especificación.

## 2. Cadencia de sincronización (obligatoria)

| Momento | Acción |
|---|---|
| Inicio de sesión de trabajo | `git pull --rebase origin main` |
| Tras cada entregable o bloque coherente | `git commit` con mensaje descriptivo |
| Cierre de cualquier sesión | `git push origin main` (o PR abierta y lista). **Prohibido cerrar con trabajo solo local.** |

No se difieren pushes «para más tarde». Si un bloque está a medias, se commitea con mensaje explícito `WIP:` solo si es imprescindible, y se resuelve en la misma jornada.

## 3. Ramas y revisión

- **FASE 0 (documentación):** commits directos a `main` permitidos. Justificación: agente único, sin código ejecutable, historial limpio como evidencia de auditoría.
- **FASE 1+ (código y contenido):** ramas de trabajo `feature/<área>-<tema>` (p. ej. `feature/dev-lector`, `feature/cont-c08-preguntas`) + Pull Request con checklist según encargo §6.5 (PR editorial vs. PR técnico). Revisión obligatoria del responsable del área afectada; los esquemas (`/schemas`) son propiedad conjunta y exigen revisión de ambos responsables.
- **Prohibido siempre:** force-push, reescritura del historial de `main`, `git push --force`, borrado de `main`.
- Colisiones: rebase local antes de push; nunca «merge a ciegas» sobre `main`.

## 4. Mensajes de commit

- Convención: `tipo(área): resumen en imperativo` — tipos: `docs`, `feat`, `fix`, `chore`, `test`, `schema`, `content`.
- Referenciar el entregable o sección del encargo cuando aplique (p. ej. `docs(fase0): ADR-0001 del stack — encargo §5.2`).
- Un commit = una intención coherente. Nada de «cambios varios».

## 5. Qué NUNCA se sube a Git

1. **Secretos y claves** (API de IA, tokens) — encargo §2.7: van al almacén seguro del sistema, jamás a repositorio, recursos empaquetados, logs ni backup.
2. **El EPUB privado del propietario** (`*.epub`) y cualquier material cuyo uso en repositorio remoto no esté comprobado — encargo §6.5.11 y §4.7.8.
3. **Medios pesados** (imágenes maestras, audio, mapas PMTiles) hasta decidir el mecanismo: Git LFS vs. releases privados — encargo §6.4. Provisionalmente, `.gitignore` los excluye; solo se suben manifiestos, hashes y metadatos.
4. **Datos personales de jugadores** (perfiles, progreso, anotaciones).

`.gitignore` en la raíz aplica estas exclusiones. Si un fichero necesita excepción, se decide explícitamente y se documenta aquí.

**Excepción registrada (2026-11-05, modo CONTENIDOS):** `assets/ilustraciones_tusell/**` se sube a Git normal por **orden expresa del propietario** de esa misma fecha («extraer todas las ilustraciones del libro y dejarlas en una carpeta local y en GitHub»). Justificación técnica: 415 ficheros, ~29 MB en total, máximo 295 KB por fichero — sin necesidad de LFS. Alcance: solo esta carpeta (acuarelas de la ed. Luis Tasso 1905, dominio público presunto según `docs/DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md`, uso interno no comercial). **PEND-05 sigue abierta** para los maestros audiovisuales pesados (escenas, audio, mapas PMTiles): eso sí exigirá LFS o releases.


**Excepción registrada (2026-11-05, modo ILUSTRACIÓN):** el propietario ordenó expresamente «Usa el repositorio en github de El_Quijote_App y deja las imágenes organizadas según su ubicación correcta en el proyecto». Se admiten en Git normal **solo 11 WebP optimizados** (~3,1 MB en conjunto; ficheros individuales de unos 150–335 KB), dentro de `assets/scenes/**`. El ZIP independiente contiene los PNG maestros y no se commitea al repositorio. Los activos son `recreacion_ia`, con procedencia y riesgo de spoilers declarados en `assets/scenes/manifest.json`, y quedan pendientes de aprobación editorial. La excepción no levanta la exclusión general de otros medios pesados ni resuelve PEND-05 para el resto de recursos.


**Ampliación de excepción (2026-11-05, batería visual 02):** por nueva orden expresa del propietario («Genera otra batería de escenas y fusiónalas en main organizadas»), se añaden otros **12 WebP optimizados**, ~3,5 MB, repartidos entre `assets/scenes/part_1` y `part_2`, elevando el piloto a **23 WebP**, ~6,5 MB. Todos son recreaciones IA de uso interno, con manifiesto y hashes; los 12 PNG maestros de esta tanda se entregan en ZIP fuera de Git. Se mantiene sin cambios la prohibición de otros medios pesados y la revisión de PEND-05.

## 6. Versionado y etiquetas

- Etiquetas `v0.0.x` para hitos de documentación aprobados (p. ej. cierre de FASE 0).
- Cuando exista contrato editorial-técnico: versionado semántico independiente de esquema / catálogo / activos / aplicación, con compatibilidad declarada (encargo §6.1).

## 7. Evidencia y trazabilidad

- El historial de `main` es evidencia de auditoría: cada entrega debe poder rastrearse a un commit con fecha, autor y contenido.
- Los hitos GO/NO-GO se etiquetan y se referencian desde `VISION_Y_DECISIONES.md`.
