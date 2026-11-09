// Guion editorial del piloto de anticipación: Primera Parte, capítulo VIII.
// Escenas ya existentes de Aventura e Historia; no se crean activos nuevos.
// Las imágenes de consecuencia jamás se enseñan en fase de pregunta.
// Referencias de texto: content/piloto/passages (DQ.SRC.0005).
import type { RondaNarrativa, ImagenNarrativa } from './motorNarrativo';

const BASE = 'assets://scenes/part_1/chapter_08/';
const imagen = (file: string, alt: string, medioId?: string): ImagenNarrativa => ({
  uri: BASE + file,
  alt,
  ...(medioId ? { medioId } : {}),
});

export const RONDAS_AVENTURA: RondaNarrativa[] = [
  {
    id: 'AV2-I8-01', tramo: 'Los molinos de viento',
    contexto: 'Don Quijote cree descubrir gigantes a lo lejos. Sancho observa el paisaje y los enormes brazos que giran.',
    personaje: 'Sancho Panza', pregunta: '¿Qué hará Sancho ante las palabras de su amo?',
    opciones: [
      { id: 'a', texto: 'Le advertirá de que son molinos de viento.' },
      { id: 'b', texto: 'Le animará a combatir a los gigantes.' },
      { id: 'c', texto: 'Se alejará sin explicarle lo que ve.' },
    ], correcta: 'a',
    consecuencia: 'Sancho corrige a su amo: no son gigantes, sino molinos movidos por el viento.',
    explicacion: 'Sancho identifica las aspas y cómo hacen funcionar la piedra del molino.',
    pasajeId: 'DQ.P1.C08.P0003',
    imagenPrevia: imagen('p1_c08_molinos_siluetas_pre_safe_right_v2.webp', 'Molinos en el horizonte manchego, antes de la advertencia.'),
    imagenConsecuencia: imagen('p1_c08_question_000101_safe_right_v2.webp', 'Sancho advierte a don Quijote junto al camino.', 'DQ.MA.901004'),
  },
  {
    id: 'AV2-I8-02', tramo: 'Los molinos de viento',
    contexto: 'Sancho ya ha explicado lo que son las aspas. Don Quijote se obstina en su interpretación caballeresca.',
    personaje: 'Don Quijote', pregunta: '¿Qué hará don Quijote a continuación?',
    opciones: [
      { id: 'a', texto: 'Se acercará despacio para comprobarlo.' },
      { id: 'b', texto: 'Arremeterá con Rocinante y la lanza.' },
      { id: 'c', texto: 'Se retirará para buscar otra aventura.' },
    ], correcta: 'b',
    consecuencia: 'Don Quijote carga contra un molino. El viento mueve el aspa, rompe su lanza y derriba a caballo y caballero.',
    explicacion: 'La embestida sucede pese a las advertencias; el molino permanece en pie.',
    pasajeId: 'DQ.P1.C08.P0005',
    imagenPrevia: imagen('p1_c08_question_000105_safe_right_v2.webp', 'Don Quijote avanza con la lanza antes del choque.', 'DQ.MA.901005'),
    imagenConsecuencia: imagen('p1_c08_molinos_post_safe_right_v2.webp', 'Don Quijote yace en el suelo y conserva una lanza rota.', 'DQ.MA.900006'),
  },
  {
    id: 'AV2-I8-03', tramo: 'Los molinos de viento',
    contexto: 'La lanza ha quedado hecha pedazos y don Quijote yace maltrecho. Sancho lo ve desde su asno.',
    personaje: 'Sancho Panza', pregunta: '¿Qué hará Sancho al verlo caer?',
    opciones: [
      { id: 'a', texto: 'Acudirá enseguida a socorrerlo.' },
      { id: 'b', texto: 'Perseguirá al molinero para exigirle cuentas.' },
      { id: 'c', texto: 'Continuará solo por el camino.' },
    ], correcta: 'a',
    consecuencia: 'Sancho corre con su asno para auxiliar a su señor.',
    explicacion: 'Su desacuerdo anterior no impide que acuda a ayudar al caballero caído.',
    pasajeId: 'DQ.P1.C08.P0006',
    imagenPrevia: imagen('p1_c08_story_n11_caida_safe_right_v2.webp', 'Caída de don Quijote tras la carga contra el molino.'),
    imagenConsecuencia: imagen('p1_c08_story_n12_socorro_safe_right_v2.webp', 'Sancho se acerca para socorrer a don Quijote.'),
    checkpoint: { id: 'molinos', titulo: 'Los molinos de viento', mayor: true },
  },
  {
    id: 'AV2-I8-04', tramo: 'Los frailes y el coche',
    contexto: 'Los viajeros prosiguen su camino. Aparecen dos frailes sobre mulas y un coche con una dama.',
    personaje: 'Don Quijote', pregunta: '¿Cómo interpretará don Quijote la comitiva?',
    opciones: [
      { id: 'a', texto: 'Como comerciantes que viajan hacia Toledo.' },
      { id: 'b', texto: 'Como frailes que buscan hospedaje.' },
      { id: 'c', texto: 'Como encantadores que llevan cautiva a una princesa.' },
    ], correcta: 'c',
    consecuencia: 'Don Quijote cree que los hombres de negro son encantadores y la dama, una princesa raptada.',
    explicacion: 'Confunde una comitiva de viaje con una aventura de cautiverio.',
    pasajeId: 'DQ.P1.C08.P0008',
    imagenPrevia: imagen('p1_c08_story_n16_camino.webp', 'Don Quijote y Sancho retoman el camino de Castilla.'),
    imagenConsecuencia: imagen('p1_c08_frailes_carreta_pre_safe_right_v2.webp', 'Dos frailes y un coche se aproximan por el camino.', 'DQ.MA.900029'),
  },
  {
    id: 'AV2-I8-05', tramo: 'Los frailes y el coche',
    contexto: 'Sancho intenta corregir otra vez la fantasía de su amo, que se considera obligado a liberar a la dama.',
    personaje: 'Don Quijote', pregunta: '¿Qué hará ante los frailes?',
    opciones: [
      { id: 'a', texto: 'Partirá a la carga contra uno de ellos.' },
      { id: 'b', texto: 'Esperará a que Sancho negocie su paso.' },
      { id: 'c', texto: 'Los seguirá sin intervenir en el camino.' },
    ], correcta: 'a',
    consecuencia: 'Don Quijote acomete a uno de los frailes y lo derriba de su montura.',
    explicacion: 'Su decisión sigue la lógica de liberar a una supuesta cautiva.',
    pasajeId: null, // ataque documentado en I,8, sin pasaje fraccionado específico
    imagenPrevia: imagen('p1_c08_question_000109_safe_right_v2.webp', 'Don Quijote y Sancho discrepan sobre lo que ven.', 'DQ.MA.901008'),
    imagenConsecuencia: imagen('p1_c08_story_a02_nf1_fraile_caido_safe_right_v2.webp', 'Un fraile ha caído tras la arremetida del caballero.'),
  },
  {
    id: 'AV2-I8-06', tramo: 'Los frailes y el coche',
    contexto: 'Un fraile ha caído. Sancho observa al vencido y piensa en su propia recompensa como escudero.',
    personaje: 'Sancho Panza', pregunta: '¿Qué intentará hacer Sancho ahora?',
    opciones: [
      { id: 'a', texto: 'Esconderse hasta que el coche se aleje.' },
      { id: 'b', texto: 'Tomar para sí los despojos del vencido.' },
      { id: 'c', texto: 'Ir a buscar a otro fraile para ayudarlo.' },
    ], correcta: 'b',
    consecuencia: 'Sancho trata de aprovechar los despojos del fraile, pero los criados se lo impiden y lo maltratan.',
    explicacion: 'El deseo de recompensa de Sancho choca con la reacción del séquito.',
    pasajeId: null, // despojos y criados: texto completo I,8, no P0009
    imagenPrevia: imagen('p1_c08_story_a02_nf1_fraile_caido_safe_right_v2.webp', 'El fraile yace junto al camino después de ser derribado.'),
    imagenConsecuencia: imagen('p1_c08_story_a02_nf2_sancho_criados_safe_right_v2.webp', 'Los criados se enfrentan con Sancho en el camino.'),
    checkpoint: { id: 'frailes', titulo: 'La comitiva de los frailes', mayor: true },
  },
  {
    id: 'AV2-I8-07', tramo: 'El encuentro con el vizcaíno',
    contexto: 'Don Quijote se dirige a la señora del coche, convencido de haberla liberado de los encantadores.',
    personaje: 'Don Quijote', pregunta: '¿Qué pedirá a la dama?',
    opciones: [
      { id: 'a', texto: 'Que vuelva al Toboso a presentarse ante Dulcinea.' },
      { id: 'b', texto: 'Que le entregue la carroza y sus caballos.' },
      { id: 'c', texto: 'Que lo acompañe a combatir más molinos.' },
    ], correcta: 'a',
    consecuencia: 'Don Quijote se presenta como caballero de Dulcinea y exige que la dama vaya al Toboso.',
    explicacion: 'El encargo a la dama desencadena la resistencia del acompañante vizcaíno.',
    pasajeId: 'DQ.P1.C08.P0011',
    imagenPrevia: imagen('p1_c08_question_000111_safe_right_v2.webp', 'El caballero se dirige a la dama junto a la carroza.', 'DQ.MA.901009'),
    imagenConsecuencia: imagen('p1_c08_vizcaino_camino_pre.webp', 'El acompañante vizcaíno se aproxima en el camino.', 'DQ.MA.900031'),
  },
  {
    id: 'AV2-I8-08', tramo: 'El encuentro con el vizcaíno',
    contexto: 'El coche no puede seguir porque don Quijote insiste en su petición. Uno de sus acompañantes se acerca.',
    personaje: 'El vizcaíno', pregunta: '¿Cómo reaccionará el acompañante?',
    opciones: [
      { id: 'a', texto: 'Aceptará sin discutir la condición del caballero.' },
      { id: 'b', texto: 'Dejará el coche para avisar a los frailes.' },
      { id: 'c', texto: 'Asirá la lanza de don Quijote y lo increpará.' },
    ], correcta: 'c',
    consecuencia: 'El vizcaíno agarra la lanza e increpa a don Quijote, que no deja continuar al coche.',
    explicacion: 'La discusión queda establecida antes de que comience el enfrentamiento.',
    pasajeId: 'DQ.P1.C08.P0011',
    imagenPrevia: imagen('p1_c08_vizcaino_camino_pre.webp', 'El vizcaíno se aproxima a don Quijote junto al coche.', 'DQ.MA.900031'),
    imagenConsecuencia: imagen('p1_c08_story_a02_nv1_duelo_suspendido_safe_right_v2.webp', 'Los contendientes se disponen a luchar.'),
  },
  {
    id: 'AV2-I8-09', tramo: 'El encuentro con el vizcaíno',
    contexto: 'El vizcaíno ha desafiado al caballero; ninguno parece dispuesto a ceder. La tensión llega a su punto máximo.',
    personaje: 'Don Quijote', pregunta: '¿Qué hará don Quijote ante el desafío?',
    opciones: [
      { id: 'a', texto: 'Aceptará tratar la disputa sin combatir.' },
      { id: 'b', texto: 'Responderá con las armas, dispuesto al combate.' },
      { id: 'c', texto: 'Esperará a que intervengan los criados del coche.' },
    ], correcta: 'b',
    consecuencia: 'Ambos se disponen a combatir. El relato interrumpe aquí la batalla y deja su conclusión para el capítulo siguiente.',
    explicacion: 'La aventura conserva el corte narrativo de Cervantes: el desenlace no se anticipa.',
    pasajeId: null, // el duelo y la suspensión se cotejarán en texto completo I,8
    imagenPrevia: imagen('p1_c08_question_000108.webp', 'Los viajeros cabalgan por un camino de La Mancha.', 'DQ.MA.901007'),
    imagenConsecuencia: imagen('p1_c08_story_a02_nv1_duelo_suspendido_safe_right_v2.webp', 'Los dos contendientes alzan sus armas, antes de conocerse el resultado.'),
    checkpoint: { id: 'vizcaino', titulo: 'El desafío del vizcaíno', mayor: true },
  },
];

// Contrato piloto: tres rondas por hito; tres alternativas con una solución por
// ronda, dificultad media uniforme. El motor permite cuatro cuando se justifique.
