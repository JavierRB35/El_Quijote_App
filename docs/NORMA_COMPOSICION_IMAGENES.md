# NORMA DE COMPOSICIÓN PARA IMÁGENES DEL JUEGO

**Dirección Integral → Desarrollador (ejecución técnica de la norma) · 2026-11-08**
**Fuente de verdad:** `JavierRB35/El_Quijote_App` — necesidades visuales reales del juego (`docs/ASIGNACION_VISUAL_P1_C08.md`, `docs/DOSSIER_ARTISTICO_H4.md` §3.5, `assets/scenes/manifest.json`, `app/src/cine/encuadres.json`).
**Entrega trazable en GitHub:** esta norma + `app/src/cine/encuadres.json` v3 + banda lateral de la UI ajustada a la norma + clasificación verificada de las 20 imágenes del capítulo VIII + prompts de regeneración (§4).

---

## 1. La norma

**Instrucción principal.** Las imágenes del juego son exclusivamente narrativas o de pregunta, listas para integrarse: **sin interfaz, textos, preguntas, botones, marcos ni collages incrustados**.

**Regla obligatoria de composición.** Cada imagen nueva reserva una **zona segura natural** para la interfaz, sin perder fuerza narrativa:

| Preferencia | Zona | Tamaño orientativo |
|---|---|---|
| 1 | Lateral (izquierda o derecha) | **25–30 % del ancho** |
| 2 | Inferior | **20–25 % del alto** |

**Puede haber en la zona segura:** cielo, campo, camino, vegetación, arquitectura secundaria, fondo atmosférico, decorado no esencial.
**No puede haber:** sujeto principal, gesto principal, acción clave, objeto decisivo de la pregunta, el detalle exacto que el jugador debe observar.

**Composición deseada:** el hecho narrativo principal ocupa el **60–70 % restante**; la imagen sigue siendo bella y cinematográfica; sujeto y acción quedan claros aunque una banda ligera de texto se sitúe en la zona segura.

**Restricciones:** prohibido incrustar texto; prohibido añadir elementos de interfaz; prohibidos mosaicos o collages; prohibido centrar toda la acción justo donde irá el panel; mantener coherencia con el estilo establecido (fotorealismo con matiz pictórico, luz y continuidad de `personajes_referencia.webp`).

**Alineación de la interfaz (hecha en esta entrega):** la banda lateral de narración del reproductor pasa de 34 vw a **27 vw (25–30 % del ancho)** en `app/src/App.css`, de modo que la UI consume exactamente la zona segura que la norma reserva y nada más.

**Nota honesta sobre el panel de pregunta:** el panel inferior real de Aventura mide ~40–45 % del alto con opciones grandes (prioridad de legibilidad del encargo P1). Para las **imágenes de pregunta**, además de la banda de la norma, conviene mantener el **detalle decisivo en la mitad superior del fotograma**; la regla mínima contractual sigue siendo la banda inferior del 20–25 %.

## 2. Cómo se clasifica (criterio verificado)

Cada imagen del capítulo VIII se inspecciona visualmente y se clasifica:

1. **Apta sin cambios** — existe ya una banda lateral o inferior natural con contenido permitido (cielo, campo, camino, vegetación, decorado secundario) y el hecho narrativo queda fuera de ella.
2. **Apta con recorte/reencuadre** — un recorte o desplazamiento del encuadre deja la banda limpia sin cortar sujeto ni acción.
3. **Requiere regeneración** — el sujeto o la acción ocupan todo el marco (o el formato no admite banda); ningún recorte puede crear contenido seguro que no existe.

Resultado de la revisión (20 imágenes): **14 aptas sin cambios, 0 con reencuadre, 3 con regeneración pendiente, 3 no integradas pendientes de alta** (las 3 de A02, dos de ellas con regeneración). El grupo 2 resulta vacío por una razón estructural honesta: **el recorte no crea contenido seguro que no existe** — en las imágenes revisadas, o la banda natural ya existe (el lote A01 se compuso con `preferred_overlay_side: right` desde el manifiesto) o el sujeto ocupa el marco completo (solo regeneración).

La clasificación completa, con zona segura prevista y motivo por imagen, queda en **`app/src/cine/encuadres.json` v3** (campo `zona_segura` por activo, validado por prueba) y se resume aquí:

| Activo | Uso | Grupo | Zona segura prevista | Motivo / acción |
|---|---|---|---|---|
| `DQ.MA.901004` (Q101) | pregunta | **1** | derecha 25–30 % (campo/cielo) | advertencia de Sancho y DQ al fondo dentro del 60-70 % izquierdo |
| `DQ.MA.901005` (Q105) | pregunta | **1** | inferior 20–25 % (sendero/polvo) | carga y lanza en el tercio medio-superior; el molino como contexto a la derecha |
| `DQ.MA.901006` (Q106) | pregunta | **1** | inferior 20–25 % (camino/pedregal) | paisaje sin figuras; molino hito arriba |
| `DQ.MA.901007` (Q108) | pregunta (ordenación) | **1** | derecha 25–30 % (olivar/campo) | jinetes centrados; un solo instante, sin collage |
| `DQ.MA.901008` (Q109) | pregunta | **1** | derecha 25–30 % (campo) | rostros enfrentados a la izquierda del 70 % |
| `DQ.MA.901009` (Q111) | pregunta | **1** | inferior 20–25 % (ruedas/carroza) | saludo y señora en la mitad superior; la banda lateral derecha rozaría a la señora — si se usara en narración, regenerar con aire derecho |
| `DQ.MA.901010` (N11, I12) | narración | **1** | derecha 25–30 % (Rocinante caído, contexto) | rostro, adarga y lanza rota en el 60-70 % izquierdo |
| `DQ.MA.901011` (N12, I13) | narración | **1** | derecha 25–30 % (molino/campo) | Sancho al galope y el caído dentro del 70 % |
| `DQ.MA.901012` (N13, I14-I15) | narración | **1** | derecha 25–30 % (molino al fondo) | Sancho en perfil mirando a DQ: la banda cubre solo nuca/sombrero |
| `DQ.MA.901013` (N16, I16) | narración | **1** | derecha 25–30 % (camino) | jinetes centrados |
| `DQ.MA.900005` (Q103) | pregunta | **1** | derecha 25–30 % (molinos lejanos/camino) | descubrimiento y advertencia a la izquierda; las aspas centrales visibles |
| `DQ.MA.900030` (Q102) | pregunta | **1** | inferior 20–25 % (rocas/vegetación) | la hilera de molinos queda íntegra; el recuento textual no se revela |
| `DQ.MA.900006` (fin episodio) | narración | **1** | derecha 25–30 % (atardecer/Rocinante) | la lanza rota en el suelo impide banda inferior; gesto de socorro intacto |
| `DQ.MA.900029` (Q107, bloqueada) | pregunta | **1** | inferior 20–25 % (camino/polvo) | rostros y gesto del saludo a los frailes arriba |
| `DQ.MA.900031` (Q110, bloqueada) | pregunta | **1** | derecha 25–30 % (camino/pueblo) | desafío DQ-vizcaíno a la izquierda-centro |
| `DQ.MA.000026` (Q112, hotspot) | pregunta hotspot | **1** | inferior 20–25 % (terreno/vegetación de la acuarela) | el hecho (aspa arrastrando) al centro, lejos del borde; formatos históricos: banda inferior de terreno |
| `DQ.MA.901003` (Q104, closeup) | pregunta | **3** | — (requiere regeneración) | 1:1 cerrado 1254×1254: el rostro llena el 100 %; sin banda lateral ni inferior posible → regeneración 16:9 (§4-R1) |
| A02 `story_a02_nf1_fraile_caido` | narración futura | **1** (no integrada) | derecha 25–30 % (caravana en fuga, contexto) | fraile caído y DQ armado a la izquierda; alta pendiente en el encargo de narración |
| A02 `story_a02_nf2_sancho_criados` | narración futura | **3** | — (requiere regeneración) | tres cuerpos a sangre ocupan el marco; lateral tapa un rostro, inferior tapa al fraile tendido → regeneración (§4-R2) |
| A02 `story_a02_nv1_duelo_suspendido` | narración futura | **3** | — (requiere regeneración) | duelistas en ambos bordes: sin banda lateral; regeneración (§4-R3) |

## 3. Registros

- **`app/src/cine/encuadres.json` v3**: campo `zona_segura` (lado, tamaño normativo, contenido permitido) por activo + `region_critica` (rectángulo del hecho narrativo). La prueba `app/tests/cine.test.ts` valida: lado coherente con `lado_texto` y tamaños dentro de los rangos de la norma.
- **UI alineada**: banda lateral de narración a 27 vw (25–30 %).
- Las imágenes de **A02** quedan registradas como `A02-pendiente-*` (sin `lado_texto` hasta regenerarse/alta).

## 4. Regeneraciones (grupo 3) — prompts exactos para el encargo artístico

Conforme a DC-23 (el equipo artístico actúa con prompt exacto de Dirección). Estilo base común: fotorealismo con matiz pictórico, 2560×1440 (16:9), luz y continuidad con `personajes_referencia.webp` y el lote A01, **sin texto, sin interfaz, sin collage**, con la zona segura declarada vacía de sujetos y acciones.

**R1 — `DQ.MA.901003` (Q104, closeup batalla):**
> Primer plano cinematográfico de don Quijote en batalla, gritando con la boca abierta, casco metálico y gorguera, bigote y perilla grises al viento. Composición 16:9 horizontal: el rostro ocupa el tercio superior-izquierdo (60-70 % del hecho), mirando hacia la derecha; el tercio inferior y el lateral derecho son fondo pergamino liso de taller sin elementos (zona segura inferior y derecha). Sin texto ni interfaz.

**R2 — A02 `story_a02_nf2` (Sancho y criados con el fraile):**
> Sancho Panza y un criado ayudan a levantar a un fraile benito caído en el camino, tras el revés de los frailes. Composición 16:9: los tres cuerpos compactados en el 60-70 % superior-izquierdo del fotograma; el 25-30 % inferior-derecho es camino de tierra con polvo y piedras sin cuerpos ni rostros (zona segura inferior). Los rostros de los tres permanecen visibles fuera de la banda. Sin texto ni interfaz.

**R3 — A02 `story_a02_nv1` (duelo suspendido):**
> El duelo suspendido entre don Quijote y el vizcaíno a caballo, ambos con los sables en alto y la señora asomada a la carroza detrás. Composición 16:9: ambos duelistas desplazados al 60-70 % central-izquierdo, en escorzo tres cuartos; el lateral derecho (25-30 % del ancho) es campo manchego, cielo y el pueblo lejano sin sujetos (zona segura derecha). Los sables en alto quedan fuera de la banda. Sin texto ni interfaz.

## 5. Límites de esta entrega

- **No se generan imágenes nuevas** en esta PR (R1-R3 quedan como encargos al equipo artístico); no se modifica ninguna imagen original.
- Los tres activos de A02 permanecen **sin alta en el catálogo** hasta su regeneración y el encargo de narración frailes/vizcaíno.
- `review.state: borrador` y restricciones de distribución sin cambios en todos los activos.
- La validación de legibilidad real (personas mayores, 1080p/1440p/4K) sigue pendiente según `DOSSIER_ARTISTICO_H4` §3.5: las zonas seguras de esta norma son hipótesis de layout verificadas visualmente por el desarrollador, no decisión de legibilidad validada.
