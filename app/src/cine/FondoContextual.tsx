import { useEffect, useState } from 'react';
import { leerAsset } from '../entorno';

/** Solo recibe un recurso aprobado PARA ESTA PANTALLA. Sin sustitutos implícitos. */
export default function FondoContextual({ uri, alt = '' }: { uri?: string; alt?: string }) {
  const [carga, setCarga] = useState({ uri: '', src: '', error: false });
  useEffect(() => {
    if (!uri) return;
    let vivo = true, blob = '';
    leerAsset(uri).then(src => {
      blob = src;
      if (vivo) setCarga({ uri, src, error: false });
      else if (src.startsWith('blob:')) URL.revokeObjectURL(src);
    }).catch(() => { if (vivo) setCarga({ uri, src: '', error: true }); });
    return () => { vivo = false; if (blob.startsWith('blob:')) URL.revokeObjectURL(blob); };
  }, [uri]);
  const disponible = uri === carga.uri && carga.src;
  return <div className="fondo-contextual" data-estado={disponible ? 'disponible' : 'pendiente'}>
    {disponible ? <img src={carga.src} alt={alt} onError={() => setCarga({ uri: uri ?? '', src: '', error: true })} />
      : <span className="fondo-pendiente" role="status">{carga.error ? 'Fondo no disponible' : 'Fondo artístico pendiente'}</span>}
  </div>;
}
