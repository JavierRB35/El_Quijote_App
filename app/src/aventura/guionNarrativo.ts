// DC-34: guion editorial importado de JSON en GitHub /content, nunca hardcodeado.
import catalogo from '../../../content/aventura/parte_1/capitulo_08.json' with { type: 'json' };
import { EPISODIO_AVENTURA, type RondaNarrativa } from './motorNarrativo.ts';

if (catalogo.episodioId !== EPISODIO_AVENTURA ||
    (catalogo.estado_editorial !== 'piloto_integrado' && catalogo.estado_editorial !== 'aprobado') ||
    catalogo.rondas.length === 0) {
  throw new Error('Catálogo Aventura no activable: episodio o revisión editorial incompatibles.');
}

// CI valida esquema, referencias y recursos. Se conservan los IDs de partidas v2.
export const RONDAS_AVENTURA: RondaNarrativa[] = catalogo.rondas;
