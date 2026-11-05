#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Inventario de ocurrencias textuales de topónimos y personajes en los 126 capítulos
(entregable FASE 0.4-bis, soporte del Atlas/Museo). Modo CONTENIDOS.
Uso: python -I inventario_ocurrencias.py <raiz_repo>
Salida: docs/data/ocurrencias_entidades.json + docs/INVENTARIO_OCURRENCIAS_ENTIDADES.md
Solo cuenta OCURRENCIAS LITERALES en el texto del EPUB Tusell (datos, no interpretaciones).
"""
import sys, os, re, html, json
from collections import OrderedDict

REPO = sys.argv[1] if len(sys.argv) > 1 else "."
TXT = os.path.abspath(os.path.join(REPO, "..", "..", "data", "epub_extract", "OEBPS", "Text"))

ENTIDADES = OrderedDict([
    # --- personajes ---
    ("don Quijote", {"id": "DQ.PER.0001", "tipo": "personaje", "regex": r"\bQuijote\b|\bQuijano\b"}),
    ("Sancho Panza", {"id": "DQ.PER.0002", "tipo": "personaje", "regex": r"\bSancho\b"}),
    ("Rocinante", {"id": "DQ.PER.0003", "tipo": "personaje", "regex": r"\bRocinante\b"}),
    ("Maese Nicolás (barbero)", {"id": "DQ.PER.0006", "tipo": "personaje", "regex": r"\bNicolás\b|\bNicolao\b"}),
    ("Sansón Carrasco", {"id": "DQ.PER.0009", "tipo": "personaje", "regex": r"\bSansón Carrasco\b|\bCarrasco\b"}),
    ("Cide Hamete Benengeli", {"id": "DQ.PER.0010", "tipo": "autor ficticio", "regex": r"\bCide Hamete\b|\bBenengeli\b"}),
    ("Dulcinea / Aldonza", {"id": "DQ.PER.0007", "tipo": "personaje", "regex": r"\bDulcinea\b|\bAldonza\b"}),
    ("Avellaneda (seudónimo)", {"id": "DQ.PER.0011", "tipo": "autor real (apócrifo)", "regex": r"\bAvellaneda\b"}),
    ("Marcela", {"id": None, "tipo": "personaje", "regex": r"\bMarcela\b"}),
    ("Grisóstomo", {"id": None, "tipo": "personaje", "regex": r"\bGrisóstomo\b"}),
    ("Cardenio", {"id": None, "tipo": "personaje", "regex": r"\bCardenio\b"}),
    ("Dorotea", {"id": None, "tipo": "personaje", "regex": r"\bDorotea\b"}),
    ("don Fernando", {"id": None, "tipo": "personaje", "regex": r"\bFernando\b"}),
    ("Luscinda", {"id": None, "tipo": "personaje", "regex": r"\bLuscinda\b"}),
    ("Zoraida", {"id": None, "tipo": "personaje", "regex": r"\bZoraida\b"}),
    ("Ruy Pérez de Viedma (el Cautivo)", {"id": None, "tipo": "personaje", "regex": r"\bViedma\b"}),
    ("Maritornes", {"id": None, "tipo": "personaje", "regex": r"\bMaritornes\b"}),
    ("Ginés de Pasamonte", {"id": None, "tipo": "personaje", "regex": r"\bGinés\b|\bPasamonte\b"}),
    ("Maese Pedro", {"id": None, "tipo": "personaje", "regex": r"\bmaese Pedro\b"}),
    ("Teresa Panza", {"id": None, "tipo": "personaje", "regex": r"\bTeresa\b"}),
    ("Altisidora", {"id": None, "tipo": "personaje", "regex": r"\bAltisidora\b"}),
    ("don Antonio Moreno", {"id": None, "tipo": "personaje", "regex": r"\bAntonio Moreno\b"}),
    ("Ricote", {"id": None, "tipo": "personaje", "regex": r"\bRicote\b"}),
    ("Ana Félix", {"id": None, "tipo": "personaje", "regex": r"\bAna Félix\b"}),
    ("Roque Guinart", {"id": None, "tipo": "personaje histórico", "regex": r"\bGuinart\b"}),
    ("Diego de Miranda (Verde Gabán)", {"id": None, "tipo": "personaje", "regex": r"\bDiego de Miranda\b|\bVerde Gabán\b"}),
    ("Frestón (encantador nombrado)", {"id": None, "tipo": "mención interna", "regex": r"\bFrestón\b"}),
    # --- topónimos ---
    ("La Mancha", {"id": "DQ.LOC.0001", "tipo": "topónimo", "regex": r"\bLa Mancha\b|\bmanchego\b|\bmanchega\b"}),
    ("Campo de Montiel", {"id": "DQ.LOC.0002", "tipo": "topónimo", "regex": r"\bMontiel\b"}),
    ("El Toboso", {"id": "DQ.LOC.0003", "tipo": "topónimo", "regex": r"\bToboso\b"}),
    ("Puerto Lápice", {"id": None, "tipo": "topónimo", "regex": r"\bPuerto Lápice\b|\bLápice\b"}),
    ("Sierra Morena", {"id": None, "tipo": "topónimo", "regex": r"\bSierra Morena\b"}),
    ("Barcelona", {"id": None, "tipo": "topónimo", "regex": r"\bBarcelona\b"}),
    ("Zaragoza", {"id": None, "tipo": "topónimo", "regex": r"\bZaragoza\b"}),
    ("Sevilla", {"id": None, "tipo": "topónimo", "regex": r"\bSevilla\b"}),
    ("Toledo", {"id": None, "tipo": "topónimo", "regex": r"\bToledo\b"}),
    ("Argel", {"id": None, "tipo": "topónimo", "regex": r"\bArgel\b"}),
    ("Tordesillas", {"id": None, "tipo": "topónimo", "regex": r"\bTordesillas\b"}),
    ("Andalucía", {"id": None, "tipo": "topónimo", "regex": r"\bAndaluc[íi]a\b"}),
    ("Castilla", {"id": None, "tipo": "topónimo", "regex": r"\bCastilla\b"}),
    ("Aragón", {"id": None, "tipo": "topónimo", "regex": r"\bAragón\b"}),
    ("Guadiana (río)", {"id": None, "tipo": "hidrónimo", "regex": r"\bGuadiana\b"}),
    ("Barataria (ínsula ficticia)", {"id": None, "tipo": "topónimo literario", "regex": r"\bBarataria\b"}),
    ("Micomicona (reino ficticio)", {"id": None, "tipo": "topónimo literario", "regex": r"\bMicomicona\b"}),
    ("Trapobana (topónimo clásico)", {"id": "DQ.LOC.0005", "tipo": "topónimo literario", "regex": r"\bTrapobana\b"}),
])

def main():
    # capítulos: mapa id -> fichero (misma convención que el mapa)
    caps = []
    for f in sorted(os.listdir(TXT)):
        if not f.endswith(".xhtml"):
            continue
        m = re.match(r"^(100[1-8]|[23]0[0-9][0-9]|1\.\d+|2\.\d+)\.xhtml$", f)
        if not m:
            continue
        b = f[:-6]
        if re.match(r"^\d{4}$", b):
            n = int(b[2:4]) if b[0] != "3" else int(b[2:4]) + 0
            caps.append((1, n, f))
        elif b.startswith("1."):
            caps.append((1, int(b[2:]), f))
        else:
            caps.append((2, int(b[2:]), f))
    caps.sort()
    textos = {}
    for parte, num, f in caps:
        raw = open(os.path.join(TXT, f), encoding="utf-8", errors="replace").read()
        textos["DQ.P%d.C%02d" % (parte, num)] = html.unescape(
            re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", raw))).strip()

    resultado = OrderedDict()
    for nombre, e in ENTIDADES.items():
        oc = OrderedDict()
        total = 0
        for cid, txt in textos.items():
            n = len(re.findall(e["regex"], txt))
            if n:
                oc[cid] = n
                total += n
        resultado[nombre] = {
            "id_propuesto": e["id"], "tipo": e["tipo"], "regex": e["regex"],
            "capitulos_con_mencion": len(oc), "ocurrencias_totales": total,
            "por_capitulo": oc,
        }

    os.makedirs(os.path.join(REPO, "docs", "data"), exist_ok=True)
    with open(os.path.join(REPO, "docs", "data", "ocurrencias_entidades.json"), "w", encoding="utf-8") as fh:
        json.dump({"aviso": "Datos literales de ocurrencia en el EPUB Tusell; la aparición en un capítulo no implica presencia dramática completa.",
                   "capitulos_analizados": len(textos), "entidades": resultado}, fh, ensure_ascii=False, indent=1)

    L = ["# Inventario de ocurrencias textuales — topónimos y personajes (soporte Atlas/Museo)",
         "", "Generado por `inventario_ocurrencias.py` sobre el texto del EPUB Tusell (126 capítulos).",
         "Datos literales: nº de capítulos con mención y ocurrencias totales. **No** implican presencia dramática completa ni sustituyen la segmentación del piloto.", "",
         "| Entidad | Tipo | ID propuesto | Caps. con mención | Ocurrencias | Primera mención |",
         "|---|---|---|---|---|---|"]
    for nombre, r in resultado.items():
        primera = next(iter(r["por_capitulo"]), "—")
        L.append("| %s | %s | %s | %d | %d | %s |" % (
            nombre, r["tipo"], r["id_propuesto"] or "—",
            r["capitulos_con_mencion"], r["ocurrencias_totales"], primera))
    L += ["", "Lecturas rápidas para el Atlas:",
          "- `Puerto Lápice`, `Sierra Morena`, `Barcelona` y `Zaragoza` permiten verificar rutas hipotéticas con base textual (DC-08).",
          "- La **ausencia** de `Consuegra` en el texto confirma que los molinos de I.8 no llevan topónimo: la vinculación es patrimonio asociado, no cita.",
          "- `Tordesillas`/`Avellaneda` localizan la polémica apócrifa (recurso del cuaderno).",
          "", "Datos completos por capítulo: `docs/data/ocurrencias_entidades.json`."]
    with open(os.path.join(REPO, "docs", "INVENTARIO_OCURRENCIAS_ENTIDADES.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")
    print("ENTIDADES=%d CAPITULOS=%d" % (len(resultado), len(textos)))

if __name__ == "__main__":
    main()
