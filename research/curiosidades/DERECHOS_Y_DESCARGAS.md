# Derechos, adquisición y preservación de imágenes

**Carácter del proyecto:** uso personal privado y no comercial. Esta circunstancia no presume autorización universal para la copia, almacenamiento remoto o redistribución. GitHub es privado, pero sigue siendo alojamiento de una copia.

## Clasificación a 2026-11-08

- `DOMINIO_PUBLICO` (2): `IMG-001` (Doré/Pisan, Commons; reproducción marcada como dominio público) e `IMG-003` (Huineman, Rijksmuseum; declaración expresa *Public domain*). **La clasificación es sobre la obra/reproducción descrita en las fichas; falta descargar y comprobar el archivo exacto antes de alojar.**
- `LICENCIA_ABIERTA` (1): `IMG-012`, fotografía realizada en 2025 por Laci3 de un ejemplar de una edición de 1615, declarada CC0 en Commons. Distinguir la antigüedad del objeto fotografiado de la de la fotografía y comprobar que no existan restricciones de acceso a la colección conservadora.
- `DERECHOS_PENDIENTES` (10): imágenes QBI con ficha bibliográfica e iconográfica, pero sin validación de derechos sobre el archivo digital o permiso de integración en el repositorio; no subir automáticamente.
- `USO_PERSONAL_RESTRINGIDO` (0): no hay copias privadas lícitas obtenidas y conservadas fuera del repositorio en este lote.
- `DESCARTADA` (0): no se incorporó ninguna imagen de procedencia imposible de determinar; las atribuciones y colocaciones dudosas se describen en `hallazgos_descartados.md`.

## Procedimiento de adquisición antes de registrar una descarga

1. Abrir la ficha institucional, verificar objeto, autor/atribución, condiciones de acceso y los términos aplicables a la reproducción exacta.
2. Si está autorizado: guardar el **archivo original** en `research/curiosidades/assets/<categoria>/` sin recortes, sin eliminar sellos, créditos ni marcas y sin deformación. No confundir miniatura con original.
3. Extraer tamaño, ancho, alto, formato real, SHA-256 y fecha de descarga del **binario**, no de metadatos declarados por un sitio. Mantener URL exacta del archivo y permalink de la ficha.
4. Registrar condiciones de uso personal, almacenamiento en GitHub, publicación en la futura aplicación, redistribución, derivados y créditos obligatorios como decisiones separadas. Una declaración de dominio público de una obra no invalida condiciones particulares de acceso a una fotografía.
5. Guardar solo archivos elegibles para el repositorio; las demás fichas permanecen con `nombre_archivo: null`, `downloaded_at: null`, `sha256: null` y `stored_in_github: false`.
6. En la aplicación, todas las obras patrimoniales se muestran íntegras (`contain`) y con créditos; una obra posterior nunca se rotula como retrato o documento del tiempo de Cervantes.

## Bloqueo real en esta entrega

Se intentó obtener una ilustración de Commons con descarga HTTPS. El acceso binario falló por DNS desde el entorno de trabajo. Aunque las URL sean consultables mediante el buscador, **no se descargó ningún JPEG** y no existe razón para fabricar sus hashes o afirmar que está guardado en GitHub.

La reanudación de descargas requiere un entorno con conectividad legítima a los hosts originales, no una excepción a las restricciones de derechos.
