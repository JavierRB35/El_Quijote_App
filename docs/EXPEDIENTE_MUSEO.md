# EXPEDIENTE DE MUSEO — Curaduría inicial (FASE 1, modo CONTENIDOS)

**Fecha:** 2026-11-05 · **Regla rectora (encargo §4.6):** museo abierto, selectivo y ligado a la novela; **ninguna pieza se muestra sin fuente, atribución con grado y licencia resuelta**. No se atribuyen retratos no identificados de forma inequívoca.

## 1. Piezas verificadas e integradas al paquete del piloto

Siete fichas `DQ.MUS.0001–0007` (en `content/piloto/museum_items/`, **VÁLIDAS** según el validador canónico), todas de la capa **acuarelas Tusell** de la edición Luis Tasso (Barcelona, 1905), con:

- **Atribución:** «Salvador Tusell (sobre composición de Gustave Doré)» — `attribution_status: atribuida`.
- **Procedencia:** edición Tasso 1905; digitalización BVPB registro 463832 (CC BY) y EPUB Epublibre/Titivillus 2024.
- **Licencia:** dominio público presunto con redistribución condicionada (expediente `DERECHOS_Y_PROCEDENCIA_ILUSTRACIONES.md`); uso interno autorizado.
- **Relación documentada** con el capítulo y el pasaje (ver dossier y segmentación del piloto).

| Ficha | Título | Medio | Capítulo |
|---|---|---|---|
| DQ.MUS.0001 | El espurgo de la librería | DQ.MA.000021 | I.6 |
| DQ.MUS.0002 | Arremete contra los frailes de San Benito | DQ.MA.000027 | I.8 |
| DQ.MUS.0003 | Sancho ayuda a montar a don Quijote tras los molinos | DQ.MA.000029 | I.8 |
| DQ.MUS.0004 | El discurso de la Edad de Oro | DQ.MA.000035 | I.11 |
| DQ.MUS.0005 | Carga contra los carneros (rebaños) | DQ.MA.000057 | I.18 |
| DQ.MUS.0006 | La visita del cura y el barbero | DQ.MA.000170 | II.1 |
| DQ.MUS.0007 | En el lecho con el crucifijo | DQ.MA.000371 | II.74 |

## 2. Criterios de curaduría adoptados

1. **Tradición iconográfica:** cada acuarela se documenta como *derivada* de la composición de Doré — el museo puede mostrar ambas capas cuando existan medios verificados (clases de evidencia separadas: `ACUARELA_HISTORICA` vs. recreación `RECREACION_IA`).
2. **Contraste consciente** con las escenas cinematográficas del proyecto (p. ej., DQ.MUS.0003 ↔ DQ.MA.900006; DQ.MUS.0007 ↔ DQ.MA.900011): histórico vs. recreación, rotulado siempre.
3. **Nada de «personaje = acuarela»:** las fichas ilustran *episodios*, no la apariencia histórica de personajes (Anexo A).
4. **Ligazón con capítulos reales** y con la segmentación del piloto (`docs/data/piloto_segmentacion.json`).

## 3. Cartera pendiente (NO mostrable hasta verificación individual — PEND-03)

Registrada en `docs/data/expediente_museo.json`; ninguna de estas piezas entra en medios ni en fichas mostrables:

- Retrato de Cervantes de la propia edición (acuarela 001): la pieza existe (verificada); **el modelo retratado y su parecido con los retratos históricos es cuestión DEBATIDA** — requiere estudio antes de afirmar nada.
- Edición Tasso 1905 como pieza bibliográfica completa (documentada en BVPB; ficha pendiente).
- Composiciones originales de **Doré** (dominio público probable): verificación de recurso por recurso en Gallica/BnF u otros repositorios antes de añadir cualquier imagen.
- **Retratos históricos de Cervantes** (Jáuregui, del Mazo, etc.): atribuciones debatidas y derechos de fotografía institucionales — solo tras verificación individual con fuente y permiso.

## 4. Métrica y siguientes pasos del museo (FASE 1)

- Objetivo del piloto: 7 fichas verificadas **ya cumplido**; siguiente lote: acuarelas de los capítulos con escena producida (15 capítulos) siguiendo el mismo patrón de verificación.
- Cada ficha nueva exige: alt del EPUB, capítulo (mapa), segmento (segmentación), fuente BVPB/EPUB y hash del medio — el generador automatiza el 100 % del expediente a partir del manifiesto.
