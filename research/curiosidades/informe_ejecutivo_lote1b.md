# Informe ejecutivo — LOTE 1B de investigación «El Quijote oculto» (2026-11-08)

## Trazabilidad

- **Repositorio:** `JavierRB35/El_Quijote_App` (única fuente de verdad y destino).
- **SHA inicial de `main` al comenzar:** `909479db65ae04836c6dec7ae8e602c66866e1e9`.
- **Rama de trabajo:** `research/curiosidades-lote1b-p2c01-p2c74` (creada desde el `main` vigente).
- **SHA final:** el del último commit de esta rama (ver cabecera de la PR).
- **Coordinación:** incidencia de solapamiento y estado de la PR #82 documentada en el issue #83 de GitHub antes de trabajar.

## Alcance cumplido

Primer lote del encargo originalmente asignado cubría I,8; I,6; I,11; I,18 (PR #82). Este lote completa los capítulos que faltaban del primer lote editorial: **Segunda Parte, capítulo I** y **Segunda Parte, capítulo 74**, y es el primero del proyecto que incorpora **binarios gráficos reales descargados** con SHA-256 y procedencia documentada.

## Estadísticas

| Métrica | Valor |
|---|---|
| Curiosidades registradas | 9 (4 en P2.C01, 5 en P2.C74) |
| … con al menos una afirmación CONFIRMADA con fuente | 9 |
| … estado `contrastado` | 7 |
| … estado `candidato` (con afirmaciones SIN VERIFICAR declaradas) | 2 |
| Afirmaciones por certeza | CONFIRMADO: 20 · INTERPRETACIÓN ACADÉMICA: 5 · SIN VERIFICAR: 2 |
| Fuentes registradas | 9 (1 primaria textual canónica, 1 edición digitalizada, 3 fichas de imagen, 2 académicas, 2 contextuales) |
| Imágenes **descargadas e incorporadas al repo** | 3 (todas dominio público, SHA-256 verificado) |
| Imágenes candidatas sin descarga | 1 (portada de Avellaneda 1614, PDF completo) |
| Descartados documentados | 5 entradas (identificación desestimada, observaciones editoriales, no incorporados por formato, afirmaciones no emitidas) |
| Errores de validación | 0 |

## Hallazgos destacados

1. **CUR-L1B-001** — El II,1 cervantino anuncia la «tercera salida» que el *Segundo tomo* de Avellaneda ya había anunciado en su portada de 1614: la Segunda Parte abre en competición declarada con el apócrifo.
2. **CUR-L1B-002** — La sátira del arbitrista: el «arbitrio» secreto de don Quijote para Felipe III es un ejército de caballeros andantes.
3. **CUR-L1B-003** — Los dos poetas de Angélica (Barahona de Soto / Lope de Vega) y el posible dardo «famoso y único» a Lope.
4. **CUR-L1B-005** — «Alonso Quijano el Bueno»: el apellido del hidalgo solo se fija en el capítulo de su muerte, tras la inseguridad paródica de I,1/I,2 (Quejana/Quijada/Quesada en el texto de referencia).
5. **CUR-L1B-008** — El epílogo contra el «escritor fingido y tordesillesco» y la última palabra de la novela en el texto de referencia: «Vale.»
6. **CUR-L1B-009** — La muerte documentada de Cervantes (22/23 de abril de 1616, Trinitarias) como contrapunto biográfico del desenlace.

## Valor de imagen para la aplicación

- Portada de 1615 (documento de época, PD) como imagen principal del módulo de curiosidades de II,1/II,74.
- Grabado de la muerte de don Quijote (Ormsby 1885, PD) como REPRESENTACION_POSTERIOR etiquetada.
- Retrato atribuido de Cervantes (Jáuregui, c. 1600, PD) con la advertencia de atribución incluida en el catálogo, conforme a la regla de no atribuir identidades sin respaldo.

## Próximos pasos propuestos (para Dirección)

1. Revisión editorial de las 9 fichas; decidir las publicables tras cotejo con la edición canónica de proyecto.
2. Consolidación futura de los lotes (PR #82 + este) en ficheros únicos, con rebase previo de la PR #82 sobre `main` vigente (véase issue #83).
3. Extraer la portada del apócrifo (IMG-L1B-004) desde el PDF de Commons y descargar el binario.
4. Cotejo de las interpretaciones (arbitrista, poetas de Angélica, Avellaneda–Tordesillas) contra ediciones críticas accesibles (CVC fuera de mantenimiento durante esta sesión).
5. Continuar el segundo lote del encargo (cobertura general) partiendo de esta metodología.
