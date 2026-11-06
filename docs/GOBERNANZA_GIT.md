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


**Ampliación de excepción (2026-11-05, baterías visuales 03, 04 y 05):** por autorización expresa del propietario para nuevas baterías de ilustraciones y su organización en `main`, se incorporan **12 WebP optimizados adicionales en cada batería**, elevando la colección a **59 WebP** (58 escenas y una referencia visual). Los maestros PNG se entregan en ZIPs independientes y permanecen fuera del repositorio; cada nuevo archivo se identifica por parte y capítulo y registra SHA-256 y estado de revisión editorial en `assets/scenes/manifest.json`. Por instrucción específica del propietario, estas entregas artísticas se publican directamente en `main` sin crear ramas o PR dedicados, mediante commits de avance rápido con control de cabeza concurrente y sin `force`; **esta autorización no exime de PR a cambios de código, esquemas ni otros contenidos de FASE 1**. La revisión editorial por especialistas sigue pendiente y PEND-05 continúa abierta para otros medios pesados.

## 6. Versionado y etiquetas

- Etiquetas `v0.0.x` para hitos de documentación aprobados (p. ej. cierre de FASE 0).
- Cuando exista contrato editorial-técnico: versionado semántico independiente de esquema / catálogo / activos / aplicación, con compatibilidad declarada (encargo §6.1).

## 7. Evidencia y trazabilidad

- El historial de `main` es evidencia de auditoría: cada entrega debe poder rastrearse a un commit con fecha, autor y contenido.
- Los hitos GO/NO-GO se etiquetan y se referencian desde `VISION_Y_DECISIONES.md`.

## 8. Integración continua del contrato (activo desde 2026-11-06)

Autorizada por el propietario («validen el contrato técnico antes de integrarlo definitivamente, en GitHub»). Ambos equipos implementaron CI en paralelo; se **consolidó en un único workflow** por eficiencia (los runners de Windows consumen el doble de minutos y la cuenta ya agotó su cuota de almacenamiento de Actions).

**Workflow único `validar-contrato`** (`.github/workflows/validar-contrato.yml`, ubuntu-latest — la validación es multiplataforma; el «sobre Windows» del encargo §5.2 aplica a las pruebas de la aplicación, no a los datos) que se ejecuta **en cada Pull Request y en cada push a `main`**:

1. Suite canónica de contrato (fixtures válidos + casos negativos §6.3.7) — exige PASS.
2. Meta-validación de esquemas (`check_schema` draft 2020-12, 16/16).
3. **Todos** los paquetes editoriales reales de `content/` contra los esquemas canónicos.
4. Cotejo textual de la batería contra el texto de referencia almacenado.
5. Criterio ADR-0001.1 (FTS5 con castellano áureo).

El veredicto de cada paso queda como evidencia en el log del job. No se suben artefactos: la cuota de almacenamiento de Actions de la cuenta está agotada y un fallo de cuota no debe poder tumbar la compuerta del contrato.

**Protección de `main`:** el workflow corre **en cada PR y en cada push directo a `main`** (incluidas las subidas expresamente autorizadas del propietario, que quedan validadas a posteriori: un push inválido se marca con check rojo y run fallido de inmediato). La exigencia *técnica* del check para fusionar (required status check) y la prohibición nativa de force-push requieren **GitHub Pro en un repo privado** — intento de aplicación el 2026-11-06 devuelto con HTTP 403 (plan Free). Alternativas, a decisión del propietario: (a) contratar Pro (~4 €/mes) y aplicar la protección con un comando; (b) mantener el plan actual con esta validación continua a posteriori. Ninguna de las dos cambia el contenido validado.

**Ampliación de excepción (2026-11-06, batería visual 06):** a petición expresa del propietario, se incorporan seis WebP optimizados de nuevas escenas originales IA al árbol por parte/capítulo en `main`, alcanzando **65 activos**. Se mantienen las restricciones generales para medios de terceros y los controles de integridad del manifiesto; los PNG maestros permanecen fuera de Git.

**Ampliación de excepción (2026-11-06, batería visual 07):** se incorporan seis WebP optimizados de capítulos previamente sin recreaciones (I.10, I.13, I.15, II.12, II.31, II.51), elevando el inventario a **71 activos**. El propietario ha solicitado de nuevo la colocación en `main`. Conservación de PNG maestros fuera del repositorio, documentación de derechos, hashes y revisión editorial pendientes como en tandas previas.

**Ampliación de excepción (2026-11-06, batería visual 08):** por nueva petición del propietario se agregan seis WebP originales optimizados para capítulos hasta ahora no cubiertos, elevando el catálogo a **77 recursos**. Se mantienen PNG maestros fuera de Git, hashes de cada derivado, rotulación RECREACION_ARTISTICA y control de revisión editorial. Integración directa en `main` bajo autorización específica reiterada del propietario, sin alterar el resto de la gobernanza.

**Ampliación de excepción (2026-11-06, batería visual 09):** se incorporan seis WebP originales optimizados de capítulos aún no representados, elevando el inventario de recreaciones a **83 recursos**. Solicitado expresamente por el propietario y fusionado directamente en `main`, preservando los 77 previos. PNG maestros fuera de Git; hashes, procedencia y estados de revisión declarados.

**Ampliación de excepción (2026-11-06, batería visual 10):** a petición expresa del propietario, se incorporan **20 WebP optimizados originales** de capítulos que no tenían recreación anterior. El inventario pasa a **103 recursos**, con los 83 anteriores conservados. Cada derivado posee hash y metadatos en el manifiesto. PNG maestros fuera de Git; uso interno, revisión editorial pendiente. Integración directa en `main` autorizada para estas entregas estrictamente artísticas.
