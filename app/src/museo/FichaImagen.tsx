// Museo — FichaImagen: diálogo de créditos y derechos completos de la obra
// (maqueta: botón «Ficha de la imagen»). Muestra identificador, huella,
// técnica, procedencia, fuente, licencia y estado de derechos TAL COMO
// CONSTAN en el catálogo; nada se inventa y lo no acreditado se declara
// pendiente (docs/MUSEO_REFERENCIA_VISUAL_APROBADA.md §2).
import { useEffect, useRef } from 'react';
import type { Catalogo } from '../contrato';
import { fuenteDe, tituloDe, type Obra } from './obras';

interface Props {
  obra: Obra;
  catalogo: Catalogo | null;
  onCerrar: () => void;
}

export default function FichaImagen({ obra, catalogo, onCerrar }: Props) {
  const refCierre = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    refCierre.current?.focus();
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [onCerrar]);

  const licencia = obra.ficha
    ? catalogo?.licencia(obra.ficha.licenciaId)
    : catalogo?.licencia('DQ.LIC.0001');

  return (
    <div
      className="museo-dialogo-fondo"
      role="dialog"
      aria-modal="true"
      aria-label={`Ficha de la imagen: ${tituloDe(obra)}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div className="museo-dialogo">
        <header className="museo-dialogo-cabecera">
          <h3>Ficha de la imagen</h3>
          <button ref={refCierre} onClick={onCerrar} aria-label="Cerrar ficha (Escape)">
            ✕
          </button>
        </header>
        <dl className="museo-dialogo-dl">
          <dt>Título</dt>
          <dd>{tituloDe(obra)}</dd>
          <dt>Identificador de recurso</dt>
          <dd>
            {obra.id}
            {obra.ficha && <> · ficha {obra.ficha.id} · medio {obra.ficha.mediaId}</>}
          </dd>
          <dt>Descripción de la edición (alt)</dt>
          <dd>«{obra.alt}»</dd>
          <dt>Archivo</dt>
          <dd>
            {obra.archivo} · {obra.ancho} × {obra.alto} px · JPG
          </dd>
          <dt>Huella de integridad (SHA-256)</dt>
          <dd className="museo-sha">{obra.sha256}</dd>
          {obra.ficha?.tecnica && (
            <>
              <dt>Técnica</dt>
              <dd>{obra.ficha.tecnica}</dd>
            </>
          )}
          {obra.ficha?.procedencia && (
            <>
              <dt>Procedencia</dt>
              <dd>{obra.ficha.procedencia}</dd>
            </>
          )}
          <dt>Fuente de la imagen</dt>
          <dd>{fuenteDe(obra)}</dd>
          <dt>Licencia y derechos</dt>
          <dd>
            {licencia ? (
              <>
                {licencia.id} — {licencia.title}. Redistribución:{' '}
                <strong>{licencia.redistribution}</strong>
                {licencia.attribution_required && <> · atribución obligatoria</>}
                {licencia.evidence_documental && (
                  <small className="museo-dialogo-nota"> {licencia.evidence_documental}</small>
                )}
              </>
            ) : (
              'DQ.LIC.0001 · redistribución condicionada (uso interno de desarrollo)'
            )}
          </dd>
          {obra.ficha?.certeza && (
            <>
              <dt>Certeza</dt>
              <dd>{obra.ficha.certeza}</dd>
            </>
          )}
          {obra.ficha?.relacion && (
            <>
              <dt>Relación con el Quijote</dt>
              <dd>{obra.ficha.relacion}</dd>
            </>
          )}
        </dl>
        <footer className="museo-dialogo-pie">
          Uso interno en desarrollo. La redistribución pública de estas acuarelas no está
          autorizada mientras DQ.LIC.0001 siga condicionada; no se ofrecen descargas del
          original.
        </footer>
      </div>
    </div>
  );
}
