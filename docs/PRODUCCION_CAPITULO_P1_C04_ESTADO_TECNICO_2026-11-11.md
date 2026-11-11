# Capítulo I.4 — integración técnica tras las 22 imágenes aprobadas

**Fecha:** 2026-11-11 · **Repositorio:** `JavierRB35/El_Quijote_App`, rama `main`. **Fuente:** DQ.ED.0003 / DQ.SRC.0005, Parte I, IV, líneas 1669–1912.

## Resultado integrado

- **Aventura:** cinco rondas de anticipación `AV2-I4-01…05`, alternativas correctas B/C/A/B/C, diez medios aprobados (cinco preimágenes exclusivas y cinco consecuencias), checkpoints tras R03 y R05. Cierre de episodio posterior al descubrimiento: mozo rompe la lanza, agrede a don Quijote y lo deja solo; no aparece auxilio de I.5.
- **Historia:** 14 escenas, 33 intervenciones visibles completas con TS-001, una cita literal cotejada y 32 adaptaciones fieles; referencia física de escena por intervención, reutilizando cuando procede los diez medios de Aventura y doce WebP narrativos adicionales.
- **Cobertura:** los 22 WebP recientes están catalogados `aprobada` por validación visual del propietario. Quedan excluidos los tres antiguos `borrador` que contenían conflictos editoriales; no se modifican ni se activan.
- **Catálogos:** `content/aventura/parte_1/capitulo_04.json` y `content/historia/parte_1/capitulo_04.json`, más ficha `DQ.P1.C04.E01` en `content/capitulos/registro.json`. Se reutilizan los reproductores existentes sin desarrollar pantallas por capítulo ni alterar persistencia de I.1/I.2/I.3/I.8.
- **Fuente:** se conserva la cuenta cervantina de 73 reales para nueve meses a siete reales, sin presentar esa cifra como aritmética verdadera. `pasajeId: null` en las cinco rondas, declarados en `pendientes_editoriales` al no existir fichas físicas fraccionadas.
- **Estado técnico:** `piloto_integrado` = catálogo disponible en el piloto, **no** aprobación final de composición. `revision_visual: pendiente` conserva explícitamente los controles manuales.

## Validaciones incorporadas

`tests/dev/test_capitulo_04.py` verifica JSON, fuentes, 22 imágenes físicas y SHA-256 contra catálogo, citas, fases, cobertura y antiespoilers. `app/tests/capitulo_04.test.ts` verifica selección, checkpoints, TS-001, progreso independiente y cierre. El workflow `validar-contrato` incluye la prueba nueva; la suite preexistente recorre todos los catálogos DC-34 y los WebP aprobados DC-35.

**Pendiente de verificación de ejecución:** resultados reales de GitHub Actions para este commit y pruebas de interfaz con capturas en 1920×1080, 1366×768 y 1280×800, tamaño de texto ampliado, mute, teclado, movimiento reducido, contraste y zonas seguras DC-28. No se declaran PASS sin captura.

**Límites y derechos:** uso interno del piloto offline, **no** autorización de redistribución o publicación. El manifiesto declara `original_generated_asset_review_on_redistribution` en los medios y `question_spoiler_validation: pending_in_game_context_qa`. No elevar estos estados sin evidencia de ejecución.

**Fuentes normativas:** `AGENTS.md`, directriz ágil, `VISION_Y_DECISIONES.md` (DC-18, DC-24, DC-28–DC-36), protocolo de elaboración de capítulo X, flujo actualizado DC-36, dirección artística, contratos, QA, y la fuente textual del repositorio.

**Impacto transversal y reutilización:** el cambio se limita a catálogos, registro y tests; usa `AventuraNarrativa` y `ReproductorHistoria` existentes, sin parches CSS ni componentes específicos. Capítulos I.1, I.2 e I.8 siguen con las mismas rutas, motores y guardados; I.3 permanece sin activarse hasta sus propias puertas. No se modifica el tratamiento de overlays; subsiste QA visual global DC-28.
