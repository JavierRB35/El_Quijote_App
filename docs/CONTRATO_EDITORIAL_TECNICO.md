# CONTRATO EDITORIAL-TÉCNICO

**Estado:** PENDIENTE — entregable FASE 0 (encargo §8, punto 7) — **propiedad conjunta**, exige revisión de ambos responsables (encargo §6 y §6.5.3)
**Modos responsables:** CONTENIDOS + DESARROLLO
**Última actualización:** 2026-11-05

## Alcance previsto

Documento versionado con esquemas revisables por ambos responsables, **ejemplos válidos y casos negativos** antes de producir lotes:

1. JSON Schema (o equivalente tipado) para cada entidad del §6.2: Edition, Chapter, Passage, Episode, Scene, Question, Option, Quote/Discovery, Person/Character, Place/Route, MuseumItem, MediaAsset, Source/License, Profile.
2. Convención de IDs estables (DQ.P1.C08, DQ.Q.000001…): esquema de ejemplo, NO inventario de contenido aprobado.
3. Reglas de evolución, compatibilidad y migraciones/alias (§6.1, §6.5.9).
4. Ejemplos sintéticos **explícitamente no publicables** de cada entidad y cada tipo de pregunta (single/multi/ordenación/emparejamiento/hotspot).
5. Pruebas de contrato con casos negativos (§6.3.7): pregunta sin opción correcta, cita sin pasaje, foto sin licencia, imagen inexistente, etc.
6. Manifests de paquete e índice por episodios.

## Regla de integración vinculante

Un elemento editorial nunca se publica si apunta a un ID inexistente o si su imagen/cita/licencia requerida está pendiente (§6.2).
