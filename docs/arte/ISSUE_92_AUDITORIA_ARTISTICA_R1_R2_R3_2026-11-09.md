# Issue #92 — Auditoría artística de R1 y validación condicionada de R2/R3

**Rol:** Dirección artística / control de composición y continuidad (revisión preliminar realizada por IA, no validación humana especializada).  
**Fecha:** 2026-11-09. **Fuente de verdad:** GitHub `JavierRB35/El_Quijote_App`, `main` inicial `bf80adca927fcc85e863104bd6a4db4da3a5175a`.  
**Dependencias consideradas:** PR #81 fusionada, #76/#77 y #79/#87/#88/#89 abiertas. No se toca código ni contratos.  
**Estado:** candidato R1 integrado en la rama artística de PR #94 con manifiesto y MediaAsset; **NO** constituye aprobación editorial ni validación de la interfaz.

## 1. R1 — Q104, DQ.MA.901003

- **Original existente e intacto:** `assets/closeups/don_quixote_battle.webp`, 1254×1254, SHA-256 `1bf7ae2fab241736052b57b091cffa7d2e5a50e3a960c4d4736257ff591a7008`. Su MediaAsset canónico `content/piloto/media_assets/DQ.MA.901003.json` apunta todavía a este archivo.
- **Candidato generado previamente e integrado en GitHub como `assets/closeups/don_quixote_battle_safe_right_v2.webp`:** `issue92_r1_quijote_battle_safe_right_candidate.webp`. Dimensiones verificadas por PIL: **1672×941**; tamaño exacto **224758 bytes**; SHA-256 **`1586e530adfbd7d0fe68c4acde0c3e5842865dfcb5b2bf4ed71154e5b3c5c49a`**. El hash declarado en el issue coincide exactamente con los bytes reales.
- **Composición:** rostro y gesto a la izquierda; banda derecha ≈30 % de fondo sin personajes y sin interfaz/texto; en `contain` conserva proporción a 1920×1080, 1366×768 y 1280×800. La parte inferior izquierda contiene armadura/ropa; **no es una zona segura inferior global**. El casco alcanza el borde superior y parece cortado: **no se certifica el requisito “casco completo”**. Precisa decisión artística o ajuste/regeneración antes de elevar a `aprobado`.
- **Continuidad:** edad, perilla/bigote gris, casco y gorguera similares a la referencia. La identidad facial exacta y geometría del casco requieren conformidad artística.
- **Spoilers:** no aparece desenlace concreto; mantener solo en `pre_pregunta` de Q104 conforme al registro original.
- **Licencias:** recreación IA del proyecto; conservar `review.state=borrador` y términos existentes, sin afirmar permiso nuevo de redistribución.
- **Entrega binaria verificada en GitHub:** archivo incorporado en `assets/closeups/don_quixote_battle_safe_right_v2.webp`. Blob Git **`84cfcb15fd38c16144519a3295e8c51c27a64a79`**, cotejado byte a byte mediante SHA de objeto Git con el candidato local; SHA-256 `1586e530adfbd7d0fe68c4acde0c3e5842865dfcb5b2bf4ed71154e5b3c5c49a`. El catálogo registra derivada `hd` y variante horizontal del mismo recurso. Se conserva `logical_uri` apuntando al original: **no se activa el candidato en ejecución hasta QA y decisión de Dirección**.

### Comparativa funcional

| Criterio | Original cuadrado | Candidato R1 |
|---|---|---|
| Dimensiones | 1254×1254, 1:1 | 1672×941, ~16:9 |
| Expresión de batalla | Sí | Sí |
| Banda lateral para panel | No (rostro a sangre) | Sí, derecha ≈30 % |
| Casco íntegro | Parcialmente cercano al borde | **Problema:** parte superior llega al borde/corte |
| Original conservado | Sí | No reemplaza el original |
| Integración en GitHub | Sí | **SÍ en PR #94; sin aprobación de uso** |

## 2. R2 — Sancho / frailes

**Reutilizar sin generar:** `assets/scenes/part_1/chapter_08/p1_c08_story_a02_nf2_sancho_criados_safe_right_v2.webp`. Existe ya en `main`, introducida con PR #81; blob Git `f697858cd914aa00c8d052d15401d4c5ef17e659`; SHA-256 declarado en auditoría PR #81: `bf896850681b920da068d8ac4ba08f1c45b277c011d79aab3c3382154a87423a`.

**Cotejo narrativo de I,8:** Sancho intenta quitar los hábitos al fraile caído; llegan dos mozos y agreden a Sancho. NO colaboran en levantar al fraile (brief original anulado). La imagen muestra fraile caído, Sancho interceptado por dos hombres y el coche, con zona segura derecha de paisaje. **Reserva editorial:** Don Quijote aparece físicamente al lado de la agresión, aunque Cervantes lo sitúa desviado hablando con las mujeres del coche. Esta simultaneidad visual puede inducir a una interpretación errónea de su participación. **Estado: no aprobar todavía**; no se realizará otra generación sin decisión específica.

**Uso narrativo:** solo desde el momento en que los mozos intervienen, nunca como imagen previa que anticipe la agresión. Las verificaciones con panel real y lector de pantalla siguen pendientes.

## 3. R3 — Vizcaíno y duelo suspendido

**Reutilizar sin generar:** `assets/scenes/part_1/chapter_08/p1_c08_story_a02_nv1_duelo_suspendido_safe_right_v2.webp`. Existe en `main`, introducida con PR #81; blob Git `5ea83ed3e46dd8ff0a7f4a07790c0c7835289f8b`; SHA-256 declarado en auditoría PR #81: `ce3afa65a4ce31e3eb7c95ce6c81178886bfb0bf8e9844a187cdf3690df2ff3e`.

**Cotejo narrativo I,8:** don Quijote sobre Rocinante, vizcaíno sobre **mula** (no caballo), ambos con espadas levantadas, el vizcaíno se protege con almohada del coche. La imagen presenta los dos contendientes, las armas, la almohada, la señora y el coche, y un espacio derecho ≈30 % libre de sujetos. No muestra el desenlace. **Apta para revisión técnica e integración posterior**, sin certificar todavía exactitud editorial minuciosa ni función antes/después de cada intervención.

## 4. Matriz de aceptación

| Recurso | Integridad física de archivo | Fidelidad narrativa preliminar | Zona segura sin panel | 1920×1080 | 1366×768 | 1280×800 | Prueba real React/Tauri | Estado global |
|---|---|---|---|---|---|---|---|---|
| **R1** | **PASS local + blob GitHub** (bytes y hashes cotejados) | **PASS condicionado** (emoción) | **PASS derecha / FAIL inferior global / riesgo casco superior** | **PASS en simulación `contain`** | **PASS en simulación `contain`** | **PASS en simulación `contain`** | **PENDIENTE** | **CANDIDATO EN PR; casco y QA real PENDIENTES** |
| **R2** | **PASS existencia en GitHub** (hash tomado de auditoría) | **FAIL/REVISIÓN** (posición y simultaneidad DQ) | **PASS visual preliminar derecha** | **PENDIENTE** | **PENDIENTE** | **PENDIENTE** | **PENDIENTE** | **RETENIDO** |
| **R3** | **PASS existencia en GitHub** (hash tomado de auditoría) | **PASS preliminar** (mula, almohada, espadas, coche) | **PASS visual preliminar derecha** | **PENDIENTE** | **PENDIENTE** | **PENDIENTE** | **PENDIENTE** | **CANDIDATO, NO APROBADO** |

**Evidencia incorporada en PR #94:** tres maquetas estáticas R1 con banda semitransparente simulada del 27 % en `docs/capturas/issue92/` (`r1_mock_panel_derecho_1920x1080.jpg`, `r1_mock_panel_derecho_1366x768.jpg`, `r1_mock_panel_derecho_1280x800.jpg`). Las maquetas **no** son capturas de la UI real y no certifican PR #79/#89.

## 5. Plan de integración sin colisiones

1. **HECHO EN PR #94:** WebP verificable incorporado como variante estable `assets/closeups/don_quixote_battle_safe_right_v2.webp` sin borrar original; tamaño, dimensiones y SHA-256 del blob cotejados.
2. **HECHO EN PR #94:** `assets/closeups/manifest.json` incorpora la variante `hd` en el mismo objeto del primer plano, sin duplicar identificadores; `content/piloto/media_assets/DQ.MA.901003.json` conserva derivada `original` y agrega `hd`, manteniendo `borrador`. La decisión de cambiar `logical_uri` requiere QA con Desarrollo y aprobación de Dirección; por ahora conserva la ruta del original.
3. Conservar R2/R3 en sus rutas existentes; no reasignar IDs de medios hasta el alta editorial autorizada y no tocar las ramas de #76/#77/#79/#87/#88/#89.
4. Ejecutar las pruebas reales a las tres resoluciones, texto grande, panel semitransparente sin scroll, y comprobar ausencia de spoilers por fase y visibilidad de personajes.
5. Revisar y decidir el problema visual del casco R1 y la discrepancia de simultaneidad R2; solo Dirección puede dar `GO` artístico/editorial.

### Fuentes comprobadas

- GitHub Issue #92 y comentarios de auditoría; PR #81, #76, #77, #79, #87, #88, #89.
- `docs/VISION_Y_DECISIONES.md`, DC-23–DC-28; `docs/RESOLUCION_PEND01_EDICION_REFERENCIA.md`.
- *Don Quijote*, parte I, capítulo VIII, edición Tasso (1905) con correspondencia externa: https://es.wikisource.org/wiki/El_ingenioso_hidalgo_Don_Quijote_de_la_Mancha_(1905)/Tomo_I/Capítulo_VIII . Citas y cotejos puntuales; no se reemplaza el corpus oficial del proyecto.

**Advertencia:** la PR #94 ya incluye el binario real y metadatos de R1, pero no se convierte en aprobación artística ni valida la UX: quedan pendientes QA real, revisión del casco y dictamen de Dirección para activar la variante.
**Actualización de continuidad:** el trabajo se ha continuado desde la PR #94 existente conforme a `AGENTS.md` y la directriz ágil del 2026-11-09; no se han regenerado R2/R3 ni modificado CSS/React/esquemas.
