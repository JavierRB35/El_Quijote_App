# Capítulo I.4 — Matriz conjunta y estado de ejecución

**Fecha:** 2026-11-10. **Base remota consultada:** `7f0f4c411abb5c759907f160e2b812fad84f706b` (`main`).
**Estado:** preparación editorial ejecutada; evaluación técnica preliminar realizada; **revisión conjunta del propietario PENDIENTE**. No es capítulo jugable terminado.

**Concurrencia comprobada antes de integrar:** `main` avanzó a `f562417accc971f3e489b056f7b07d78f43a0c92` con dos catálogos de I.3 en revisión. Se sincronizó por avance rápido; no cambiaron las normas, el corpus ni los activos analizados de I.4. Se conserva ese trabajo. La ficha de episodio de I.4 sigue sin formalizarse: el identificador de I.3 no autoriza asignarle automáticamente este capítulo.

Orden ejecutado DC-36: [Aventura: cinco rondas / quince opciones](PRODUCCION_CAPITULO_P1_C04_AVENTURA_CANDIDATA_2026-11-10.md) → [Historia: catorce escenas / treinta y tres intervenciones](guiones/HISTORIA_P1_C04_CANDIDATA_2026-11-10.md) → cruce con inventario real e inspección de imágenes. Ambos textos son candidatos, no aprobaciones. **Cero prompts nuevos, cero imágenes generadas, cero activos activados.**

## 1. Inventario real y límites de uso

Se consultó el manifiesto completo de escenas, sus entradas de I.1–I.5 y coincidencias de Andrés/mercaderes; el manifiesto de closeups y las cuatro acuarelas asociadas a I.4. Se inspeccionaron los píxeles de los tres WebP de I.4, la salida de I.3 y las cuatro acuarelas. No se afirma una revisión visual exhaustiva de todos los archivos del repositorio.

Las rutas V01–V03 comparten `assets/scenes/part_1/chapter_04/`. Los IDs DQ.MED son los **candidate_media_id** del manifiesto, no fichas canónicas DQ.MA. No se altera ningún manifiesto por esta evaluación.

| Clave | Archivo / ID real | Estado de catálogo | Evaluación específica, sin atribuir decisión al propietario |
|---|---|---|---|
| V01 | `p1_c04_mercaderes_pre.webp` / DQ.MED.900060 | `borrador` | **EXISTE_PENDIENTE_REVISION** para A07 y H09/H10 antes de la respuesta. Hay conversación, quitasoles, lanza erguida y caballo en pie; no hay caída. Los viajeros ocupan centro y derecha: no se acredita espacio de overlay. Sombrero del caballero y continuidad de celada requieren contraste con vestuario aprobado. No identificar ciudad/molinos del fondo como localización textual documentada. No sirve como imagen de ataque o caída. |
| V02 | `p1_c04_andres_encina_pre.webp` / DQ.MED.900132 | `borrador` | **NO_APTA para A01–A04 y H02–H07 en esta candidatura, por conflicto comprobado DC-31/32**: aparece un acompañante sobre un asno, ausente del episodio; el muchacho está vestido y libre. La llegada de Sancho no puede adelantarse. La liberación tampoco permite inventar ese acompañante. Es diagnóstico técnico-literario, no aprobación/descartado del propietario ni cambio de catálogo. |
| V03 | `p1_c04_andres_encina_solitario_pre.webp` / DQ.MED.900206 | `borrador` | **NO_APTA para el descubrimiento H02.2/A01**: el joven está vestido con camisa y chaleco, contradiciendo L1694–1695. Además, el encuadre introduce cesta y frutos no documentados; no convertirlos en pistas canónicas. No demuestra la represalia H07 y no puede reciclarse como ella sin revisión. Se conserva el archivo intacto. |
| V04 | `assets/scenes/part_1/chapter_03/p1_c03_hd_salida_venta_armado_story.webp` / DQ.MED.900281 | `aprobada`, uso exclusivo Historia H11 de I.3 | **NO_APTA para representar literalmente el alba de H01.1**: es nocturna y su aceptación está acotada a I.3. No ampliar la autorización ni reemplazar el alba de L1672. Como referencia de continuidad sí está localizada; no se activa en I.4. |

**Integridad binaria comprobada:** V01 361516 bytes; V02 306054; V03 340766; V04 178884. Los cuatro WebP son legibles, 1672×941, y los cuatro SHA-256 coinciden con `assets/scenes/manifest.json`.

| Clave | SHA-256 comprobado |
|---|---|
| V01 | `77271c6bb1ec3bdb172cf45a3a99d5c25ba7e94717a72baa051e245f737e3613` |
| V02 | `d5c8ac2f5d1a213b1f66bc44bda9dddd1201a5f014b7f0b78169fac63a588172` |
| V03 | `533162a5d260c82f31da79709fdfda468acbf840e6bae5b686ea6a045c0f94b7` |
| V04 | `9e325940228f88b0837c39d220a41e59fce13890e914aeeb7af5b8467a442794` |

Los WebP declaran `rights_status=original_generated_asset_review_on_redistribution`. Su presencia no autoriza redistribución ni certifica las licencias exigidas para activarlos. No hay aprobación de imágenes de I.4 en estas entradas.

### Acuarelas y primeros planos

| Recurso existente | Uso candidato y frontera antiespoiler |
|---|---|
| `assets/ilustraciones_tusell/acuarelas/012.jpg` / DQ.IL.0012 | **EXISTE_PENDIENTE_REVISION** como apoyo secundario H02.2/H03.1: muchacho atado, agresor y llegada de don Quijote. No ilustra al joven liberado ni la represalia con don Quijote ausente. |
| `assets/ilustraciones_tusell/acuarelas/013.jpg` / DQ.IL.0013 | **EXISTE_PENDIENTE_REVISION** para H03.2 al pronunciar la amenaza; Andrés sigue atado. No usar tras la frase que declara su liberación ni como preimagen de R01 si anticipa la respuesta. |
| `assets/ilustraciones_tusell/acuarelas/014.jpg` / DQ.IL.0014 | **EXISTE_PENDIENTE_REVISION** para H13: mozo golpea al caído entre viajeros. Prohibida antes de revelar el ataque del mozo; no usar como A10, cuyo instante es anterior. |
| `assets/ilustraciones_tusell/acuarelas/015.jpg` / DQ.IL.0015 | **EXISTE_PENDIENTE_REVISION** para H14: caballero tendido y Rocinante. No trasladar al momento previo de R05. |
| `assets/closeups/don_quixote_angry.webp`, `assets/closeups/don_quixote_battered.webp` | Inventariados, no inspeccionados en píxeles en esta entrega. `borrador`, derechos de redistribución pendientes. Posibles complementos H11/H14 sujetos a continuidad de casco, rostro y daño. No cubren por sí solos las acciones de otros personajes ni cinco previas exclusivas. |

Las cuatro acuarelas proceden del manifiesto Tusell, con sus IDs y referencias a `1004.xhtml`. Son piezas artísticas secundarias, no sustitutos automáticos de cine. Presentación íntegra, proporciones originales, sin recortes; atribución Tusell/Doré/Tasso 1905 y Epublibre/Titivillus. Se conserva el alcance de uso interno registrado en el expediente de derechos; redistribución pendiente. No se renombran, retocan ni vuelven a subir.

## 2. Cruce Aventura: diez posiciones, no diez encargos

Una posición sin recurso seleccionado significa **PENDIENTE DE SELECCIÓN/CONFIRMACIÓN**, no `FALTA_CONFIRMADA`. Hay cinco previas exclusivas; compartir un instante entre Historia y Aventura sí es posible tras aprobación. Los medios posteriores solo se muestran al descubrir la consecuencia.

| Posición / ronda | Instante y ancla DC-31 | Candidato o problema | Reutilización Historia |
|---|---|---|---|
| A01 / R01 pre | Amo explica, Andrés aún atado; L1714–1721 | V02/V03 presentan conflictos; 012 solo apoyo secundario a valorar. Ninguna previa aprobada | H02.2/H03.1 |
| A02 / R01 post | Orden, liberación y discusión de deuda; L1723–1742 | 013 cubre amenaza, no liberación; no hay recurso asignado al muchacho libre | H03.2/H04 |
| A03 / R02 pre | Andrés libre, juramento del amo, caballero presente; L1764–1767 | Sin candidato seleccionado; V02 no se acepta por acompañante ajeno | H05 |
| A04 / R02 post | Represalia sin don Quijote; L1794–1806 | V03 no acredita este instante; 012/013 incluyen al caballero y no sirven | H07, sin congelar la atadura cuando el texto ya lo libera |
| A05 / R03 pre | Deliberación en cuatro caminos; L1822–1825 | Sin recurso seleccionado; no inventar carteles o un itinerario exacto | H08.2 antes de soltar riendas |
| A06 / R03 post | Rocinante sigue hacia su caballeriza; L1825–1827 | Sin recurso seleccionado | H08.2 tras la elección |
| A07 / R04 pre | Mercader pide conocer a Dulcinea; L1852–1855 | V01 candidato pendiente de propietario, continuidad y composición | H09.2 |
| A08 / R04 post | Don Quijote exige creer sin verla; L1857–1863 | V01 puede continuar el diálogo si se acepta; no cuenta como otra previa exclusiva | H10.1 |
| A09 / R05 pre | Réplica airada anterior a carga; L1877–1881 | Requiere previa distinta de A07; no hay candidata seleccionada | H11.1/H11.2 |
| A10 / R05 post | Carga interrumpida y caída; L1883–1889 | Sin recurso seleccionado; 014 adelanta el apaleamiento | H12 |

El cierre de Aventura incluye L1894–1912: 014/015 son candidatos secundarios compartibles con H13/H14, no una sexta ronda. Mantener el cierre completo sin simular recursos todavía no aprobados.

## 3. Cobertura de los 33 beats de Historia

| Beats | Momento / fuente | Cobertura candidata y límite |
|---|---|---|
| H01.1–H01.2 | Alba, provisiones, regreso; L1672–1681 | Selección pendiente. V04 nocturna excluida para el alba; escenas de I.2 no equivalen automáticamente a este regreso |
| H02.1 | Oír y seguir voces; L1683–1693 | Selección pendiente; no mostrar ya la acción que el caballero aún no descubre |
| H02.2–H03.1 | Descubrimiento, desafío y excusa; L1693–1721 | 012 secundaria pendiente; V02/V03 con conflictos indicados |
| H03.2 | Amenaza y liberación; L1723–1728 | 013 solo durante amenaza; cambiar al mostrar liberación, posición A02 pendiente |
| H04.1–H04.3 | Deuda y descuentos; L1728–1742 | A02, por seleccionar; no representar pago consumado |
| H05.1–H05.3 | Advertencia y juramento; L1744–1767 | A03, por seleccionar; muchacho libre |
| H06.1–H06.2 | Amenaza final y marcha; L1769–1780 | A03 podría cubrir advertencia; partida requiere selección, sin sustituirla por salida de la venta |
| H07.1–H07.3 | Falso pago, represalia, despedida; L1783–1806 | A04 y plano final con joven libre, pendientes; no reintroducir al caballero |
| H08.1–H08.2 | Satisfacción y encrucijada; L1808–1827 | A05/A06 por seleccionar; no mostrar a Dulcinea presente |
| H09.1–H09.2 | Mercaderes y primera petición; L1829–1855 | V01 pendiente; establecer comitiva y conversación, sin asumir identidad de una ciudad del fondo |
| H10.1–H10.3 | Fe, retrato y burla; L1857–1875 | V01 para diálogo, con variación de plano/reacción por revisar; el retrato no existe como objeto |
| H11.1–H11.3 | Cólera, amenaza, carga; L1877–1885 | A09, closeup airado pendiente y plano de carga pendiente; no congelar conversación estática como ataque |
| H12.1–H12.2 | Caída e impedimento; L1885–1892 | A10 por seleccionar; no adelantar lanza rota |
| H13.1–H13.2 | Mozo y golpes; L1894–1904 | 014 secundaria pendiente; no convertir la agresión en combate entre iguales |
| H14.1–H14.2 | Soledad y autojustificación; L1906–1912 | 015 secundaria y closeup maltrecho pendiente; no incluir vecino ni auxilio de I.5 |

No se ha declarado ninguna imagen `EXISTE_Y_APROBADA` **para uso en I.4**, ni ninguna carencia `FALTA_CONFIRMADA`. La aprobación de V04 para I.3 permanece intacta. Esta matriz permite al propietario aprobar/corregir ambos textos y decidir usos o carencias concretos sin tener que formular el capítulo de nuevo.

## 4. Verificaciones y límites

- **PASS documental:** secuencia Aventura → Historia → evaluación; cinco rondas, quince alternativas, una correcta por ronda; catorce escenas y treinta y tres intervenciones completas con hablante, clase y localizador. Citas y anclas cotejadas contra el corpus real; cronología y consecuencias contrastadas editorialmente.
- **PASS integridad:** rutas referenciadas existentes; cuatro WebP decodificados, tamaños y SHA-256 coincidentes; cuatro acuarelas inspeccionadas sin modificación. Referencias entre los tres documentos comprobadas.
- **Conflictos reales:** V02 añade acompañante; V03 contradice la descripción del muchacho; V04 no representa el alba y tiene autorización limitada a I.3. V01 no tiene aprobación ni QA para las preguntas de I.4.
- **PENDIENTE de propietario:** aprobación editorial de las cinco rondas y del guion; evaluación conjunta y selección de usos visuales; confirmación expresa de carencias antes de cualquier prompt. No se solicita aprobación redundante de imágenes ya aceptadas para otros capítulos.
- **PENDIENTE posterior:** datos JSON y referencias físicas de pasajes/episodio, aceptación visual/derechos, activación autorizada, build/tests y QA de interfaz a 1920×1080, 1366×768 y 1280×800, texto ampliado, teclado, mute, retroceso y movimiento reducido. No ejecutados porque aún no hay contenido activable aprobado; no se presentan como PASS.
- **Integración de esta entrega:** solo los tres documentos candidatos, cambio reversible de bajo riesgo en `main` bajo DC-29/DC-33. Sin cambios de app, esquemas, fuentes, manifiestos, imágenes ni guardados. SHA de integración y resultado de CI se comunican tras verificación remota; este documento no inventa un SHA autorreferente ni un resultado de CI futuro.

## 5. Autoridad contrastada

Consultados en el HEAD indicado: `AGENTS.md`; prompt de incorporación; directriz ágil; `VISION_Y_DECISIONES.md` (DC-18, DC-23–36); `ENCARGO_MAESTRO.md` §§1–2, 4.2–4.8, 7–9; `PROTOCOLO_ELABORACION_CAPITULO_X.md`; flujo de capítulos actualizado por DC-36; reglas Aventura y especificación editorial; resolución PEND-01 y ficha Gutenberg; biblia Historia y hoja de ruta; las dos direcciones artísticas, política visual y dictamen DC-28; contrato editorial-técnico §§2–6, esquema Aventura, README de catálogo, ADR-0005, código real `app/src/capitulos/registro.ts`; mapa de episodios; plan QA; gobernanza Git; protocolo de aceptación DC-35; expedientes de derechos y manifiestos.

**Precedencia aplicada:** DC-36 desplaza la orden histórica del README de redactar Historia después del inventario visual; se sigue primero el texto completo de ambos modos. DC-29 desplaza PR obligatoria por defecto. DC-31 fija PG para producción nueva pese al carácter histórico «candidato» del documento de recepción Gutenberg. Ninguna de estas decisiones levanta revisión del propietario, TS-001, DC-28, derechos ni límites de Fase 1.
