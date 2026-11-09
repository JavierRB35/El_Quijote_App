# EL QUIJOTE · I.1 · PROMPT CONJUNTO AL ARTISTA

**Estado:** PROPUESTA, aún sin imágenes generadas ni aprobadas. **Fuente:** `content/textos/gutenberg_2000/El_Quijote.txt`, DQ.ED.0003/DQ.SRC.0005. **Marco:** DC-24, DC-28–DC-34 y dirección artística, piloto, política visual y dictamen DC-28 oficiales de `main`.

## Encargo único: exactamente CINCO imágenes independientes

Crear cinco ficheros WebP, **1672×941, 16:9**, uno por ficha, nunca collage/variaciones no solicitadas. Realismo cinematográfico premium con discreta inspiración pictórica del Siglo de Oro, época y materiales plausibles; cromatismo ocre, tierra, lino y madera, iluminación verosímil. Reutilizar continuidad fisonómica del hidalgo de unos cincuenta años, rostro enjuto, seco de carnes y complexión recia, según Cervantes y referencias del piloto. Rocín viejo, enjuto y poco imponente. Cada fotograma autónomo muestra **un solo instante**, sujetos/rostros/manos/pistas íntegros, preferentemente centro-izquierda y espacio derecho tranquilo para posible reutilización en Historia. No sacrificar la comprensión por espacio vacío. En Aventura la imagen completa va en su propia columna izquierda (`contain`) con preguntas en columna derecha separada; para Historia, overlays solo sobre zonas seguras reales, fondo semitransparente, cero scroll/truncado, texto completo y composición tipo póster DC-28 (validación posterior en interfaz). Imágenes **sin texto, UI, marcos ni dibujos explicativos**, y sin recortar acciones u objetos importantes.

Prohibiciones generales: **no Sancho, no rucio, no molinos de aventuras futuras, no salida del capítulo II, no gigantes reales, no personajes/acciones ficticias ni anacronismos**. No condensar varios momentos narrativos en una imagen. Si Cervantes no precisa el mobiliario, postura, hora o lugar exacto, tratarlo expresamente como decisión visual compatible con la época y no como hecho descrito. Antiespoiler por ronda. No generar imágenes por iniciativa distinta del encargo; el propietario decidirá su aprobación.

### 1. p1_c01_r01_lectura_pre.webp
**Uso:** R01 PRE; Historia inicio. **Ancla:** I.1, líneas 1090–1095. **Momento, acción y composición:** El hidalgo, no armado, leyendo de manera inequívoca un libro de caballerías en estancia manchega sobria; rostro, manos y libro abierto visibles; pocos libros, antes de adquirir más. Plano medio ambiental, sujeto centro-izquierda. **Excluir:** Comprador, venta de tierras, abundancia de libros recién comprados, decisión de caballero. **Alt:** «El hidalgo lee intensamente un libro de caballerías antes de adquirir más.».

### 2. p1_c01_r03_armas_morrion_pre.webp
**Uso:** R03 PRE, R02 POST, Historia preparativos. **Ancla:** I.1, líneas 1159–1164. **Momento, acción y composición:** El hidalgo solo examina el morrión simple junto a armas de sus bisabuelos recién limpiadas, en un rincón doméstico austero; manos, cabeza, morrión y armas visibles. Plano medio; reserva derecha. **Excluir:** Sancho, rucio, molinos, celada de cartón, barras de hierro o prueba de espada. **Alt:** «El hidalgo examina un morrión simple junto a las armas heredadas.».

### 3. p1_c01_r03_celada_reforzada_post.webp
**Uso:** R03 consecuencia, Historia reparación. **Ancla:** I.1, líneas 1164–1172. **Momento, acción y composición:** Después de haber roto la primera media celada de cartón con la espada, el hidalgo contempla satisfecho la segunda, rehecha en cartón y reforzada por dentro con barras de hierro visibles de manera creíble. Rostro, manos y casco íntegros, primer plano narrativo. **Excluir:** No repetir prueba de espada, no casco entero de acero, no representar primera y segunda prueba simultáneas. **Alt:** «El hidalgo observa su media celada rehecha con refuerzos interiores de hierro.».

### 4. p1_c01_r04_rocin_pre.webp
**Uso:** R04 PRE/POST, Historia Rocinante. **Ancla:** I.1, líneas 1174–1188. **Momento, acción y composición:** El hidalgo contempla al viejo rocín flaco y lleno de achaques, sin que el caballo haya recibido nombre todavía. Caballo completo hasta los cascos y figura humana, plano general corto con fondo rural compatible (sin localización precisa atestiguada). **Excluir:** Nombre escrito, Sancho, asno, galope, aventuras, salida del capítulo II. **Alt:** «El hidalgo contempla a su viejo y flaco rocín antes de darle nombre.».

### 5. p1_c01_r05_dama_pensamientos_pre.webp
**Uso:** R05 PRE/POST, Historia cierre. **Ancla:** I.1, líneas 1190–1227. **Momento, acción y composición:** Don Quijote solo, contemplativo, pensando en la necesidad de una dama antes de escoger a Aldonza Lorenzo. Interior austero, armas preparadas en fondo secundario, rostro y manos reconocibles, sujeto centro-izquierda y zona derecha serena. **Excluir:** Aldonza o Dulcinea presentes, retrato de princesa, encuentros amorosos, boda, gigantes y fantasía material. **Alt:** «Don Quijote reflexiona a solas sobre la dama que necesita un caballero andante.».

## Reutilización propuesta (condicionada)

| Ronda | Antes de elegir | Después de «Descubrir qué sucede» |
|---|---|---|
| R01 | Imagen 1 | Biblioteca existente, solo tras compra y revisión contextual |
| R02 | Biblioteca existente (reflexión lectora; QA pendiente) | Imagen 2 |
| R03 | Imagen 2 | Imagen 3 |
| R04 | Imagen 4 | Imagen 4 + nombre «Rocinante» en texto de interfaz |
| R05 | Imagen 5 | Imagen 5 + «Dulcinea del Toboso» en texto de interfaz |

La biblioteca `p1_c01_biblioteca_pre.webp` queda **solo candidata**, no aprobada: el hidalgo mira hacia la ventana, está a la derecha y debe contrastarse con la composición real (zona de texto a izquierda). Para los nombres no hay una acción física canónica adicional que haya de inventarse para ilustrarla. Una preimagen exclusiva por ronda; reutilización intermodal solo en el momento correcto.

## IMPACTO TRANSVERSAL Y REUTILIZACIÓN

**Causa raíz:** imagen anterior de armas anacrónica: incluye a Sancho, su rucio y molinos de capítulos futuros. **Retirada:** fichero `p1_c01_armas_limpieza_pre.webp`, ficha MediaAsset asociada y sus referencias de manifiesto, paquete y encuadres. **Afectados:** catálogo visual y metadatos; piloto activo I.8 no usa este recurso. **Biblioteca conservada** con encuadre de texto a izquierda, sin declarar QA aprobada. **Contadores:** paquete de 64 rutas de medios con 54 declaradas antes; tras retirar una ruta, 63 rutas y 63 declaradas. **Matrices CSV históricas:** conservadas como instantáneas, no como comprobación de existencia actual. **Pruebas:** parseo, recuentos y referencias, verificación en `main`; pruebas de aplicación y aprobación visual humana pendientes. **Excepciones:** ninguna. **DC-34:** los datos definitivos de R01–R05 irán a JSON `content/aventura/parte_1/capitulo_01.json` con estado editorial apropiado, sin hardcodear preguntas ni activar recursos todavía ausentes.
