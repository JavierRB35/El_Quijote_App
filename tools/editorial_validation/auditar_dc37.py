"""Cobertura DC-37: inventario reproducible, sin conceder aprobación artística.

No copia textos narrativos ni inventa IDs. Los IDs temporales del adaptador
no son identidades editoriales estables; los beats ausentes se dejan vacíos.
"""
import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'docs/qa/dc37'


def read(path):
    return json.loads((ROOT / path).read_text(encoding='utf-8'))


def export(name, rows):
    with (OUT / (name + '.csv')).open('w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = read('assets/scenes/manifest.json')['images']
    by_id = {a['id']: a for a in manifest}
    by_path = {a['relative_path']: a for a in manifest}
    package = read('content/piloto/package.json')
    media = {x['id']: x for p in package['files']['media_assets'] for x in [read('content/piloto/' + p)]}
    audit = read('assets/scenes/part_1/chapter_08/composition_audit_2026-11-08.json')
    issues = {a['original_path']: a for a in audit['assets']}
    rows = []
    active = {c['capituloId'] for c in read('content/capitulos/registro.json')['capitulos']}
    # Catálogos reales de I–V. No dar por aprobada una asociación por el estado del archivo.
    for path in sorted((ROOT / 'content/historia').glob('parte_*/*.json')):
        d = read(path)
        for scene in d['escenas']:
            for u in scene['intervenciones']:
                asset = by_id.get(u.get('imagen'))
                rows.append(dict(
                    capitulo=d['capituloId'], escena=scene['id'], beat='', intervencion=u['id'],
                    hablante=u['hablante'], referencia_literaria=u.get('localizador', ''),
                    imagen_asociada=u.get('imagen', ''), ruta=asset['relative_path'] if asset else '',
                    imagen_candidata=u.get('imagen', ''),
                    aprobacion_recurso=asset.get('review_state', 'sin ficha') if asset else 'sin ficha',
                    aprobacion_asociacion=d['revision_visual'],
                    adecuacion_narrativa='Candidata: ' + scene['titulo'] + '; validar esta intervención en contexto',
                    antiespoiler=asset.get('question_spoiler_validation', 'pendiente') if asset else 'pendiente',
                    pantalla_completa='PENDIENTE: región crítica por recurso, recorte y pergamino por resolución',
                    reutilizacion='Pendiente de validar por intervención; no equivale a nueva imagen',
                    resultado='PENDIENTE DE VALIDACIÓN' if asset else 'SIN IMAGEN',
                    carencia='Validar la composición de ' + scene['titulo'] + ' con la intervención ' + u['id'],
                    motivo='La aprobación visual del recurso no certifica su asociación, zonas seguras ni QA DC-37',
                    prioridad='P0', decision='Validar asociación y composición; confirmar si basta el recurso existente',
                    trazabilidad='ID local estable dentro del capítulo; sin beat editorial persistido. DQ.INT/DQ.BEAT del adaptador dependen del orden',
                    fuente=path.relative_to(ROOT).as_posix(), activo_en_menu=d['capituloId'] in active,
                    derechos=asset.get('rights_status', 'pendiente') if asset else 'pendiente',
                ))

    # Candidatos existentes para I.8; propuestas de revisión, NO activación.
    candidates = {
        **{i: 'assets/scenes/part_1/chapter_08/p1_c08_molinos_pre_safe_right_v2.webp' for i in range(1, 7)},
        7: 'assets/closeups/don_quixote_battle_safe_right_v2.webp',
        8: 'assets/closeups/don_quixote_battle_safe_right_v2.webp',
        9: 'assets/scenes/part_1/chapter_08/p1_c08_molinos_pre_safe_right_v2.webp',
        10: 'assets/closeups/don_quixote_battle_safe_right_v2.webp',
        11: 'assets/scenes/part_1/chapter_08/p1_c08_story_n11_caida_safe_right_v2.webp',
        12: 'assets/scenes/part_1/chapter_08/p1_c08_story_n12_socorro_safe_right_v2.webp',
        13: 'assets/scenes/part_1/chapter_08/p1_c08_story_n13_dialogo_safe_right_v2.webp',
        14: 'assets/scenes/part_1/chapter_08/p1_c08_story_n13_dialogo_safe_right_v2.webp',
        15: 'assets/scenes/part_1/chapter_08/p1_c08_story_n13_dialogo_safe_right_v2.webp',
        16: 'assets/scenes/part_1/chapter_08/p1_c08_story_n16_camino.webp',
    }
    needs = {
        1: 'Descubrimiento de los molinos antes del ataque', 2: 'Don Quijote interpreta los molinos como gigantes',
        3: 'Sancho pregunta por los gigantes', 4: 'Don Quijote señala los brazos de los supuestos gigantes',
        5: 'Sancho explica las aspas y el mecanismo del molino', 6: 'Don Quijote desoye la advertencia',
        7: 'Rocinante inicia la acometida; Sancho advierte a su amo', 8: 'Desafío de don Quijote antes del choque',
        9: 'El viento pone las aspas en movimiento', 10: 'Desafío a los supuestos brazos de Briareo',
        11: 'Acometida, lanza rota y caída de caballo y caballero', 12: 'Sancho llega a auxiliar al caído',
        13: 'Reproche de Sancho tras el golpe', 14: 'Don Quijote atribuye el fracaso a Frestón',
        15: 'Respuesta de Sancho a la explicación del encantamiento', 16: 'Auxilio, vuelta a la montura y camino de Puerto Lápice',
    }
    beats = [read('content/piloto/' + p) for p in package['files']['beats']]
    for b in sorted(beats, key=lambda b: (b['scene_id'], b['order'])):
        for u in b['utterances']:
            n = int(u['utterance_id'].split('.')[-1])
            mid = next(iter(b['visual_asset_ids']), '')
            m = media.get(mid, {})
            path = m.get('logical_uri', '').replace('assets://', 'assets/')
            problem = issues.get(path, {})
            candidate = candidates[n]
            assert (ROOT / candidate).is_file(), candidate
            rows.append(dict(
                capitulo='DQ.P1.C08', escena=b['scene_id'], beat=b['id'], intervencion=u['utterance_id'],
                hablante=u['speaker'].get('label', 'Narrador' if u['speaker']['tipo'] == 'narrador' else u['speaker'].get('person_id', '')),
                referencia_literaria=u.get('localizador') or '; '.join(u.get('passage_ids', [])),
                imagen_asociada=mid, ruta=path, imagen_candidata=candidate,
                aprobacion_recurso=m.get('review', {}).get('state', 'sin imagen asignada'),
                aprobacion_asociacion='PENDIENTE: declaración de beat, no validación individual',
                adecuacion_narrativa='Candidata por revisar: ' + needs[n],
                antiespoiler='PENDIENTE: no mostrar caída en 1–10; el plano 11 solo tras acometida; 12–16 posteriores al choque',
                pantalla_completa='PENDIENTE: ' + problem.get('reason_es', 'validar encuadre y región segura'),
                reutilizacion='Propuesta: mismo momento narrativo, reacción o detalle; confirmar continuidad y suficiencia frente a ' + u['utterance_id'],
                resultado='SIN IMAGEN' if not mid else ('NO APTA' if problem.get('classification') == 'requiere_regeneracion' else 'PENDIENTE DE VALIDACIÓN'),
                carencia=needs[n],
                motivo='Sin asociación explícita' if not mid else problem.get('reason_es', 'Falta aceptación individual y QA DC-37; recurso en borrador'),
                prioridad='P0', decision='Revisar candidato existente; confirmar asociación o necesidad real de otro recurso',
                trazabilidad='IDs DQ.INT/DQ.BEAT persistidos; candidato por ruta, sin inventar MediaAsset',
                fuente='content/piloto/beats/' + b['id'] + '.json', activo_en_menu=True,
                derechos=m.get('license_status', 'ver candidato; no asignado'),
            ))
    counts = Counter(r['imagen_asociada'] for r in rows if r['imagen_asociada'])
    for r in rows:
        if r['capitulo'] == 'DQ.P1.C02':
            r['aprobacion_asociacion'] = 'Capítulo aprobado por el propietario el 2026-11-10; QA DC-37 nueva pendiente'
            r['adecuacion_narrativa'] = 'Aceptación vigente de I.2; no se reabre (PRODUCCION_CAPITULO_P1_C02_ESTADO_TECNICO_2026-11-10.md)'
            r['decision'] = 'Revisar solo composición nueva DC-37; conservar aprobación narrativa y de recursos de I.2'
            r['reutilizacion'] = 'Uso en capítulo aceptado por el propietario; nueva composición DC-37 pendiente'
        if r['imagen_asociada'] == 'p1_c01_h01_presentacion_hidalgo_story':
            r['carencia'] = 'Región suficiente de pergamino que preserve a Rocinante, el hidalgo y el galgo'
            r['motivo'] = 'Captura real inicial 1366x768: reserva lateral histórica tapa a Rocinante; ahora protección ampliada y fallback explícito'
            r['pantalla_completa'] = 'FAIL de composición imagen+texto; contemplación íntegra disponible, no imagen nueva confirmada'
        if r['imagen_asociada'] and counts[r['imagen_asociada']] > 1:
            reserva = 'nueva composición pendiente; uso previo aceptado' if r['capitulo'] == 'DQ.P1.C02' else 'justificación definitiva pendiente'
            r['reutilizacion'] += f"; recurso compartido en {counts[r['imagen_asociada']]} intervenciones, {reserva}"
    export('historia_cobertura', rows)
    export('historia_carencias', [r for r in rows if r['resultado'] != 'APTA'])
    # Una fila por función de cada ronda; conserva también incidencias históricas.
    adventures = []
    for path in sorted((ROOT / 'content/aventura').glob('parte_*/*.json')):
        d = read(path)
        for r in d['rondas']:
            for key, role in [('imagenPrevia', 'preimagen'), ('imagenConsecuencia', 'consecuencia')]:
                image = r[key]
                m = media.get(image.get('medioId'), {})
                route = (m.get('logical_uri') or image['uri']).replace('assets://', 'assets/')
                a = by_path.get(route, {})
                problem = issues.get(route, {})
                ok = (ROOT / route).is_file()
                adventures.append(dict(
                    capitulo=d['capituloId'], ronda=r['id'], funcion=role,
                    imagen=image.get('medioId') or a.get('id') or route, ruta=route,
                    aprobacion_recurso=a.get('review_state') or m.get('review', {}).get('state', 'sin aprobación acreditada por ficha'),
                    estado='ausente' if not ok else 'no apta' if problem.get('classification') == 'requiere_regeneracion' else 'candidata',
                    problema=problem.get('reason_es') or f"Pendiente composición y aptitud de {role} para {r['tramo']}; revisión del catálogo: {d['revision_visual']}",
                    posible_reutilizacion=problem.get('final_path') or route,
                    justificacion='Variante existente candidata con reserva para texto; no activada' if problem.get('final_path') else 'Revisar el recurso ya asignado antes de solicitar otro; asociación en catálogo, sin aprobación DC-37',
                    riesgo_spoiler='Sí, por verificar: anterior al hecho; no puede mostrar la consecuencia' if role == 'preimagen' else 'Sí si se adelanta; visible exclusivamente tras Descubrir qué sucede',
                    accion='Revisar composición/cronología y confirmar reutilización; no encargar automáticamente',
                    aprobacion_pendiente='Propietario: aptitud para esta ronda/función; confirmar solo las carencias reales',
                    fuente=path.relative_to(ROOT).as_posix(), activo_en_menu=d['capituloId'] in active,
                ))
    export('aventura_carencias', adventures)
    summaries = []
    for chapter in dict.fromkeys(r['capitulo'] for r in rows):
        rr = [r for r in rows if r['capitulo'] == chapter]
        c = Counter(r['resultado'] for r in rr)
        summaries.append(dict(capitulo=chapter, total=len(rr), aptas=c['APTA'],
            candidatas_pendientes=c['CANDIDATA'] + c['PENDIENTE DE VALIDACIÓN'], no_aptas=c['NO APTA'],
            sin_asignacion=c['SIN IMAGEN'], reutilizaciones_validadas=sum(r['capitulo']=='DQ.P1.C02' and counts[r['imagen_asociada']]>1 for r in rr),
            intervenciones_con_candidato=sum(bool(r['imagen_candidata']) for r in rr),
            candidatos_distintos=len({r['imagen_candidata'] for r in rr if r['imagen_candidata']}),
            decisiones_pendientes=len(rr), cobertura_validada_porcentaje=0))
    export('historia_resumen', summaries)
    summary = dict(alcance='Solo contenidos existentes: I.1–I.5 e I.8; no extrapolación a 126 capítulos',
        historia=summaries, intervenciones=len(rows), intervenciones_activas=sum(r['activo_en_menu'] for r in rows), rondas=len(adventures)//2,
        rondas_activas=sum(r['activo_en_menu'] for r in adventures)//2,
        necesidades_aventura=len(adventures), recursos_escenas_manifest=len(manifest),
        recursos_closeups_manifest=len(read('assets/closeups/manifest.json').get('images', [])),
        candidatos_distintos_historia=len({r['imagen_candidata'] for r in rows if r['imagen_candidata']}),
        aprobaciones_nuevas=0, imagenes_nuevas_encargadas=0)
    (OUT/'resumen.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps(summary, ensure_ascii=True))


if __name__ == '__main__':
    main()
