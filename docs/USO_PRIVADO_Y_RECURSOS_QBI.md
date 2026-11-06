# Uso estrictamente privado de EL QUIJOTE y gestión de imágenes QBI

**Declaración expresa del propietario — 6 de noviembre de 2026.**  
**Modo:** CONTENIDOS. **Ámbito:** aplicación personal, patrimonio gráfico y Banco de imágenes del Quijote.

## 1. Destino vinculante de la aplicación

EL QUIJOTE se desarrolla para **uso exclusivamente personal y privado de su propietario**, sin explotación económica ni comercial. No se prevé publicación general, distribución de copias, servicio público, ventas, acceso público a recursos audiovisuales ni difusión en línea de los archivos obtenidos de terceros. La experiencia principal será offline.

El propietario autoriza al equipo de Contenidos a investigar, seleccionar, descargar para su utilización personal lícita y organizar las imágenes que hagan falta para la aplicación, especialmente las del Banco de imágenes del Quijote (QBI) de la Biblioteca Virtual Miguel de Cervantes, comenzando por el filtro `episodio=0090` y la ficha `id=10485`. **Esta autorización interna no es una licencia concedida por la institución titular de los derechos.**

## 2. Diferencia entre copia privada y Git remoto

Fuente oficial consultada (2026-11-06): https://www.cervantesvirtual.com/marco-legal/ , apartado **5. Uso personal**.

El portal permite expresamente **visualizar, imprimir, copiar o almacenar** su contenido en disco u otro soporte para fines **personales y privados**, sin finalidad comercial, distribución o **difusión on-line**, manteniendo las advertencias de propiedad intelectual intactas y sin modificar el contenido protegido. Indica que **no concede licencia** general y que los demás usos requieren autorización **expresa y por escrito**.

Por ello:

- **Autorizado en principio según las condiciones generales del portal, sujetas a condiciones particulares:** copia personal de imágenes obtenidas legítimamente y conservación en almacenamiento local privado, sin alterar los originales.
- **No acreditado por esa sola autorización:** subida de las imágenes digitales del QBI a GitHub, aunque `JavierRB35/El_Quijote_App` sea privado; alojamiento en un servicio remoto supone una transferencia que debe distinguirse de copia personal local y requiere verificar el alcance de la autorización.
- **No previsto:** publicación pública de la aplicación, exhibición de copias del QBI, distribución de paquetes ni explotación comercial.
- **No asumir:** que el dominio público de un grabado histórico equivale automáticamente a permiso irrestricto sobre una digitalización concreta o sobre una extracción sustancial del banco de imágenes.

La posibilidad de copiar para uso privado **no obliga a impedir el trabajo local**: se pueden organizar los ficheros autorizados en un directorio personal **fuera de la sincronización Git**. Para publicar binarios en el repositorio remoto se exige evidencia de permiso de alojamiento o una fuente alternativa inequívocamente compatible.

## 3. Organización técnica separada

- **Repositorio Git:** código, documentación, fichas bibliográficas, URLs, manifiestos y, cuando existan archivos legítimos, hashes y metadatos verificables. Los binarios QBI permanecen excluidos hasta acreditar su permiso de alojamiento.
- **Biblioteca privada offline del propietario:** originales inalterados e identificados por ID QBI; copias de trabajo locales no compartidas ni sincronizadas con el remoto.
- **Aplicación instalada solo para uso personal:** acceso a recursos locales conforme a sus condiciones de uso; cualquier empaquetado o traslado a otros usuarios requiere reevaluación.
- **Contrato:** alta de `MediaAsset` solo tras verificación de IDs, existencia, dimensiones, hash SHA-256, atribución, licencia y funciones. Estados de derechos diferenciados para `uso_personal_app`, `almacenamiento_repo_git` y `redistribucion`.
- **Documentación visible:** créditos y fuente original en atlas/museo/lector, distinguiendo imágenes históricas, fotografías actuales y recreaciones IA.

## 4. Pie legal recomendado para documentación de la aplicación

> EL QUIJOTE es una aplicación de investigación y entretenimiento literario creada para uso estrictamente personal, privado y no comercial. No está destinada a su venta, publicación o distribución. Las ilustraciones y documentos procedentes de terceros se identifican con sus fuentes y autorías. Su incorporación para consulta privada no implica cesión ni titularidad sobre los derechos de terceros, ni autoriza su redistribución. Para cualquier cambio de finalidad, publicación o traslado a servicios externos debe verificarse previamente la autorización correspondiente.

## 5. Fuentes y expedientes

- Portal QBI: https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/
- Catálogo filtrado: https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/imagenes/?episodio=0090
- Ficha cartográfica: https://www.cervantesvirtual.com/portales/quijote_banco_imagenes_qbi/ficha_imagen/?id=10485
- Condiciones oficiales: https://www.cervantesvirtual.com/marco-legal/

Registro editorial de la ficha: `docs/CONTENIDOS_QBI_INVENTARIO_0090_10485.md`. No se han descargado ni subido binarios QBI en esta revisión. Esta nota recoge el destino privado confirmado y **no equivale a dictamen de abogado ni a autorización externa del archivo**.
