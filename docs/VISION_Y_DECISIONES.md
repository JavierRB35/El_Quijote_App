# VISIÓN Y DECISIONES — Registro maestro

Mantiene la tabla de decisiones **cerradas / provisionales / pendientes** (entregable FASE 0.1, encargo §8). Regla del encargo: **no reabrir decisiones cerradas**; distinguir acuerdo vinculante, propuesta histórica no aceptada y cuestión genuinamente pendiente.

## 1. Decisiones CERRADAS (vinculantes — encargo §2)

| ID | Decisión | Fuente |
|---|---|---|
| DC-01 | Equilibrio entre aventura, preguntas, atlas y museo; historia principal progresiva en el orden de Cervantes; aventuras aleatorias opcionales sin alterar el canon | §2.1 |
| DC-02 | Perspectiva de viajero-investigador; base visual 2.5D cinematográfica interactiva; NO mundo abierto ni 3D libre | §2.1 |
| DC-03 | Imágenes realistas con movimiento sutil (parallax, luz, viento); varios puntos de vista por episodio; una imagen genérica por capítulo no basta | §2.1 |
| DC-04 | Respuestas EXCLUSIVAMENTE seleccionadas: sin respuesta libre escrita, sin cuadros de texto; variedad en formulación/imagen/disposición. **Decisión cerrada, no reabrir** | §2.2 |
| DC-05 | Primera partida con introducción breve y opcional; sin bloqueos punitivos; sin dificultad artificial que impida avanzar | §2.1 |
| DC-06 | Dos partes completas incluidas localmente; lector íntegro e interactivo (126 capítulos) con búsqueda, marcadores, anotaciones y enlaces bidireccionales | §2.3 |
| DC-07 | La meta de 10.000 preguntas queda SUSTITUIDA por tantas preguntas realmente verificables y útiles como permita el trabajo riguroso; piloto editorial de 6 capítulos obligatorio antes de proyectar volumen | §2.3 |
| DC-08 | Atlas completamente abierto desde el inicio; geografía literaria y patrimonio relacionado; rutas como hipótesis con grado de certeza | §2.4 |
| DC-09 | Museo abierto desde el inicio, cuidadosamente seleccionado y ligado a la novela, Cervantes y su tiempo | §2.4 |
| DC-10 | Plataforma inicial Windows 11 x64; español como idioma inicial con internacionalización futura; la cita castellana original nunca se confunde con traducción | §2.6 |
| DC-11 | Proyecto personal, no comercial ni distribución pública actualmente; arquitectura que permita revisión futura de derechos sin convertirlo en requisito | §1 |
| DC-12 | Offline real: instalación y juego completo sin internet; IA online solo opcional, bajo petición expresa, con clave propia del usuario configurable | §1, §2.7 |
| DC-13 | Varios perfiles locales independientes; autoguardado transparente; copia de seguridad única en ruta elegida por el usuario, con sustitución atómica y verificación; sin claves IA en el backup | §2.7 |
| DC-14 | Claves de IA en almacén seguro del sistema; nunca en repositorio, recursos, logs ni backup | §2.7 |
| DC-15 | Actualizaciones de software y contenido separadas; aviso y consentimiento; nunca instaladas sin permiso | §2.7 |
| DC-16 | Separación arquitectónica en tres dominios: catálogo cultural versionado (solo lectura), activos audiovisuales, datos privados del jugador | §5.3 |
| DC-17 | GitHub `JavierRB35/El_Quijote_App` (privado, rama `main`) es el repositorio principal y única fuente de verdad, siempre actualizado | Propietario, 2026-11-05 — ver `GOBERNANZA_GIT.md` |

## 2. Decisiones PROVISIONALES (propuestas concretas pendientes de aprobación del propietario)

| ID | Decisión | Estado | Fuente |
|---|---|---|---|
| DP-01 | Stack técnico base: Tauri 2 + React + TypeScript + Vite + Rust + SQLite/FTS5 + epub.js + MapLibre GL JS/PMTiles; escenas HTML/CSS + Web Animations API. **Es propuesta; no autoriza a programar.** Godot 4 solo se reconsidera con evidencia de limitación esencial | Aprobación pendiente (GO/NO-GO) | §2.6, §5.2 |
| DP-02 | Objetivo orientativo 1920×1080, adaptación 1440p/4K, ~8 GB RAM, gráfica integrada moderna | NO publicar como requisito validado sin medir | §2.6 |
| DP-03 | EPUB ilustrado Tusell (>300 acuarelas atribuidas, relación con Doré) como recurso potencial del lector/museo | **Auditoría realizada 2026-11-05** (modo CONTENIDOS): 376 acuarelas + 39 elementos de edición, correspondencia capítulo y alt texts en `assets/ilustraciones_tusell/manifests/`; ver `docs/INVENTARIO_ILUSTRACIONES_TUSELL.md`. Uso interno autorizado; recurso como tal sigue provisional hasta GO/NO-GO | §2.5 |
| DP-04 | Estructura de repositorio candidata (§6.4) implementada como esqueleto | Sujeta a evolución; carpetas placeholder con `.gitkeep` | §6.4 |
| DP-05 | FASE 0: commits directos a `main` para documentación; FASE 1+: ramas + PR | Operativa mientras haya un único agente activo | `GOBERNANZA_GIT.md` |

## 3. Cuestiones PENDIENTES (requieren verificación real o decisión futura)

| ID | Cuestión | Qué falta | Bloquea a |
|---|---|---|---|
| PEND-01 | Edición española de referencia legalmente utilizable para el texto | Selección y verificación de derechos (BNE, BVC, etc.) | Contenidos + Lector |
| ~~PEND-02~~ | **RESUELTA 2026-11-05:** EPUB Tusell auditado de verdad: 415 imágenes (376 acuarelas numeradas sin huecos, 0 duplicados, 0 huérfanas, 100 % con texto alternativo), mediana 849×688 px, correspondencia capítulo↔acuarela completa. Evidencia: `docs/INVENTARIO_ILUSTRACIONES_TUSELL.md` + manifiestos | Residuales → PEND-09 | Iconografía, Lector, Museo |
| PEND-03 | Licencias de fotografía patrimonial, mapas y arte histórico | Verificación individual por recurso | Iconografía, Atlas, Museo |
| PEND-04 | Teselas cartográficas offline: fuente, licencia y empaquetado (PMTiles) | Comprobación de acceso local y licencias | Atlas |
| PEND-05 | Mecanismo para medios pesados: Git LFS vs. releases privados | Decisión al inventariar activos. **Excepción ya decidida (2026-11-05):** ilustraciones Tusell (~29 MB) en Git normal por orden expresa del propietario; ver `GOBERNANZA_GIT.md` §5 | Distribución |
| PEND-06 | Requisitos hardware objetivo (RAM/VRAM/tamaño instalación) | Mediciones en hardware real | QA, Distribución |
| PEND-07 | WebView2 en instalador offline: modo de distribución exacto | Prueba en VM limpia sin internet | Distribución |
| PEND-08 | Aprobación GO/NO-GO de FASE 0 por el propietario | Presentación de los 11 entregables FASE 0 | Todo lo ejecutable |
| PEND-09 | Residuales de la auditoría Tusell: fechas vitales de Salvador Tusell (Wikidata Q96751230 solo «fl. 1895»; pista: Archivo de Arte Valenciano 1981) y licencia declarada de Epublibre EPL 64375 (web inaccesible el 2026-11-05). **Edición Tasso 1905 ya confirmada** en BVPB registro 463832 (digitalización oficial CC BY) | Solo bloquea redistribución pública, no el uso interno | Iconografía, Derechos |

## 4. Registro de cambios de este documento

- 2026-11-05: creación inicial; DC-01…DC-17, DP-01…DP-05, PEND-01…PEND-08.
- 2026-11-05 (modo CONTENIDOS): DP-03 auditado; PEND-02 resuelta con evidencia (PEND-09 recoge residuales); PEND-05 anotada con la excepción de las ilustraciones Tusell.
- 2026-11-05 (modo CONTENIDOS, continuación): entregables FASE 0.3 y 0.4 — `MAPA_EPISODIOS_Y_CAPITULOS.md` (126 capítulos con títulos, secciones 1605 y acuarelas reales; ~87 episodios propuestos) y `PLAN_PILOTO_EDITORIAL_SEIS_CAPITULOS.md` (muestra justificada: I.8, I.6, I.11, I.18, II.1, II.74). Corregidos defectos del manifiesto (títulos NCX y numeración de capítulos). Edición Tasso 1905 confirmada en BVPB (PEND-09 reducida).
- 2026-11-05 (modo CONTENIDOS, bloque 3): entregables FASE 0.2 y 0.7 — `MATRIZ_TRAZABILIDAD.md` y contratos completos: 13 JSON Schemas en `/schemas/`, 9 ejemplos sintéticos (6 tipos de pregunta) y `validar_contrato.py` con **37/37 PASS** (7 casos negativos incluidos). Detectadas y documentadas las divergencias entre el manifiesto de escenas del paquete visual (`ae927a1`) y `media_asset.schema`: tabla de reconciliación en el contrato, pendiente de doble revisión.
