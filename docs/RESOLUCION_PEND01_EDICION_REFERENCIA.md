# RESOLUCIÓN PEND-01 — Edición de referencia y política de citas

**Modo:** CONTENIDOS · **Fecha:** 2026-11-05 · **Estado:** RESUELTA (decisión editorial dentro del GO de FASE 1, DC-18). Pendiente solo de mantenimiento periódico de fuentes.

## 1. Por qué era urgente

El cotejo de integridad detectó **variantes reales entre ediciones**: el EPUB Tasso dice «**Fristón**» donde otras ediciones (p. ej. PG #2000) dicen «**Frestón**» (I, 7, intercambio del ama sobre el sabio «Muñatón»). Una primera hipótesis de «digitalización abreviada» (basada en buscar la frase fija «loco de Sevilla» y «Frestón») fue **corregida el 2026-11-05**: el pasaje del loco existe en II, 1 con la fórmula «En la casa de los locos de Sevilla…». Conclusión vigente: las ediciones difieren en **variantes de palabra y ortografía áurea**, no (hasta donde se ha verificado) en pasajes ausentes — y precisamente por eso el cotejo sistemático contra la edición de referencia es imprescindible antes de dar cualquier cita por literal.

## 2. Decisión: arquitectura textual de tres capas

| Capa | Texto | Uso | Derechos |
|---|---|---|---|
| **Texto de trabajo y lector** | EPUB *Don Quijote (Ilustrado por Salvador Tusell)* — ed. Tasso 1905, ortografía modernizada | Texto que SE ALMACENA y se muestra en el lector; origen de los `Passage` del paquete | Uso interno autorizado por el propietario (2026-11-05); EPUB no redistribuible (encargo §6.5.11) |
| **Texto íntegro de integridad (ALMACENADO)** | Project Gutenberg eBook #2000 (`content/textos/gutenberg_2000/El_Quijote.txt`, **DQ.SRC.0005**) — incorporado por la sesión de coordinación (fusión `feature/cont-fuente-gutenberg-2000-20261105`) | Cotejo automatizado reproducible (`cotejar_texto_referencia.py` con `default`); candidato a lector alternativo **sin** iconografía | Obra: dominio público; copia Gutenberg: condiciones de la PG License respetadas (cabecera intacta); redistribución pública → revisión específica |
| **Edición de referencia académica (cotejo puntual)** | *Don Quijote de la Mancha*, ed. dirigida por **Francisco Rico**, Instituto Cervantes (2004; revisión 2015) | Verificación de variantes y de la integridad textual; NO se almacena ni redistribuye: **consulta en línea y cita puntual con atribución** | Texto de Cervantes: dominio público. La modernización/introducciones de la edición: © de sus editores → solo consulta y cita (LPI art. 32); condiciones de la BVMC permiten consulta y difusión no comercial citando fuente |
| **Respaldo princeps (variantes)** | Ediciones de Juan de la Cuesta, 1605 y 1615, digitalizadas (BNE/BVPB) | Resolución de variantes y dudas de época | Dominio público incuestionable |

**Variante confirmada por el cotejo (2026-11-05):** el EPUB Tasso dice «**Fristón**» (I, 7, junto a «Muñatón») donde PG #2000 dice «Frestón» — primera variante de nomenclatura documentada entre las capas; el cotejo automatizado la detecta y la registra.

Fuentes verificadas: [Instituto Cervantes — ed. 2004](https://cervantes.org/es/sobre-nosotros/publicaciones/don-quijote-mancha-2004) · [ed. revisada 2015](https://cervantes.org/es/sobre-nosotros/publicaciones/don-quijote-mancha-2015) · [Portal Quijotes de la BNE](https://www.bne.es/es/quijote) · [BVMC — Colección Cervantina IV Centenario](https://www.cervantesvirtual.com/obra/iv-centenario-de-don-quijote-de-la-mancha-contenidos-coleccion-cervantina). Condiciones BVMC: consulta pública y difusión no comercial citando la fuente; explotación con ánimo de lucro requiere autorización — coherente con DC-11 (proyecto personal no comercial).

## 3. Política de citas (vinculante para el banco)

1. Toda cita literal del juego proviene del **texto de trabajo** (lo que lee el jugador) y su `evidence.quote` coincide con él, byte a byte.
2. **Ninguna pregunta pasa a `review_state: revisada` sin cotejo contra la edición de referencia.** Si el EPUB abrevia o altera un pasaje, la cita se ajusta o se marca con la variante documentada.
3. Los localizadores son **universales** (parte, capítulo) + localizador del pasaje del EPUB; nunca dependen de paginación.
4. Pasajes ausentes en el EPUB (caso 171): la acuarela puede mostrarse, con nota de lector «pasaje completo en la edición de referencia», y las preguntas sobre él se verifican contra la referencia antes de aprobarse.
5. La edición de referencia nunca se sube al repositorio ni al instalador.

## 4. Registro formal

- `DQ.ED.0002` (edición de referencia, `rights_status: restringida` — solo consulta/cita) y `DQ.SRC.0004` (Instituto Cervantes/BVMC) añadidos al paquete del piloto como metadatos de cotejo.
- `PEND-01` → **resuelta** en `VISION_Y_DECISIONES.md`; mantenimientos futuros: revisar que la edición siga consultable y registrar fechas de consulta en `DQ.SRC.0004`.
