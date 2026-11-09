# Fixtures de contrato — EJEMPLOS SINTÉTICOS, NO PUBLICABLES

**Advertencia:** todo el contenido de este directorio es sintético y existe únicamente para probar el contrato editorial-técnico (encargo §6.3.2). **Ninguno de estos registros puede entrar en el catálogo de producción.** Los textos, nombres, lugares, fuentes y licencias son inventados y marcados como «sintético / prueba».

- `valid/` — un ejemplo por entidad del catálogo cultural y narrativo; deben validar sin errores.
- `invalid/` — casos negativos (encargo §6.3.7); cada fichero debe FALLAR con el código de error esperado (tabla en `docs/CONTRATO_EDITORIAL_TECNICO.md`).
- `package_valid.json` / `package_invalid_*.json` — manifests de paquete con comprobación de referencias cruzadas.
- Los campos `sha256` de los fixtures usan el valor nulo `sha256:000…0` como marcador: los hashes reales se calculan en el pipeline de importación, no a mano.
