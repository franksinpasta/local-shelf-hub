import {useEffect, useRef, useState} from 'react';
import {useServerFn} from '@tanstack/react-start';
import {Camera, CameraOff, Keyboard, Search, Loader2, CheckCircle2, AlertTriangle, WifiOff, ScanBarcode} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {isValidBarcode, normalizeBarcode, type LookupResult, type LookupStatus} from './barcode';
import {lookupEzCatalog} from '@/lib/ez-catalog.functions';

type Props = {
  onFound: (code: string, data: LookupResult | null) => void;
  findDuplicate: (code: string) => string | undefined;
  onEditExisting: (code: string) => void;
};

export function BarcodeScanner({onFound, findDuplicate, onEditExisting}: Props) {
  const lookup = useServerFn(lookupEzCatalog);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<LookupStatus>('idle');
  const [camera, setCamera] = useState(false);
  const [camError, setCamError] = useState('');
  const [dup, setDup] = useState<string>();
  const [fieldError, setFieldError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => { inputRef.current?.focus(); return () => stopRef.current?.(); }, []);

  async function startCamera() {
    setCamError('');
    if (!navigator.mediaDevices?.getUserMedia) { setCamError('Este dispositivo o navegador no permite usar la cámara. Usá un lector USB o escribí el código.'); return; }
    setCamera(true);
    try {
      const {BrowserMultiFormatReader} = await import('@zxing/browser');
      const reader = new BrowserMultiFormatReader();
      await new Promise(r => requestAnimationFrame(r));
      if (!videoRef.current) return;
      const controls = await reader.decodeFromConstraints({video: {facingMode: 'environment'}}, videoRef.current, result => {
        if (result) {
          const c = normalizeBarcode(result.getText());
          controls.stop(); stopRef.current = null; setCamera(false);
          inputRef.current?.focus();
          void search(c);
        }
      });
      stopRef.current = () => controls.stop();
    } catch (e) {
      setCamera(false);
      const name = (e as {name?: string})?.name;
      setCamError(name === 'NotAllowedError' ? 'No diste permiso para usar la cámara. Podés habilitarlo en el navegador o escribir el código.'
        : name === 'NotFoundError' || name === 'OverconstrainedError' ? 'No encontramos una cámara disponible en este dispositivo.'
        : 'No pudimos iniciar la cámara. Probá con un lector USB o escribí el código.');
    }
  }
  function stopCamera() { stopRef.current?.(); stopRef.current = null; setCamera(false); }

  async function search(raw: string = code) {
    const c = normalizeBarcode(raw);
    setCode(c); setDup(undefined);
    if (!isValidBarcode(c)) { setFieldError('Ingresá un código de 6 a 14 números.'); return; }
    setFieldError('');
    const existing = findDuplicate(c);
    if (existing) { setDup(existing); setStatus('idle'); return; }
    setStatus('searching');
    try {
      const r = await lookup({data: {code: c}});
      setStatus(r.status);
      onFound(c, r.status === 'found' ? r.product : null);
    } catch {
      setStatus('error');
      onFound(c, null);
    }
  }

  return <div className="scanner-panel full">
    <div className="scanner-head"><ScanBarcode size={20}/><div><strong>Escanear código de barras</strong><small>Usá la cámara, un lector USB o escribí el código.</small></div></div>
    {camera && <div className="scanner-video"><video ref={videoRef} muted playsInline aria-label="Vista de la cámara"/><span className="scanner-line"/></div>}
    <div className="scanner-row">
      <Input ref={inputRef} aria-label="Código de barras detectado" inputMode="numeric" placeholder="Código detectado o escrito a mano" value={code}
        onChange={e => { setCode(e.target.value); setStatus('idle'); setDup(undefined); setFieldError(''); }}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); void search(); } }}/>
      <Button type="button" onClick={() => void search()} disabled={status === 'searching'}><Search/>Buscar</Button>
    </div>
    <div className="scanner-actions">
      {camera ? <Button type="button" variant="outline" onClick={stopCamera}><CameraOff/>Cerrar cámara</Button>
        : <Button type="button" variant="outline" onClick={() => void startCamera()}><Camera/>Escanear con la cámara</Button>}
      <small><Keyboard size={14}/>Con lector USB: hacé clic en el campo y escaneá; se busca solo al presionar Enter.</small>
    </div>
    {fieldError && <p role="alert" className="form-error">{fieldError}</p>}
    {camError && <p role="alert" className="scanner-status warn"><CameraOff size={16}/>{camError}</p>}
    {dup && <div role="alert" className="scanner-status warn"><AlertTriangle size={16}/><span>Este código ya está registrado como <b>{dup}</b>.</span><Button type="button" size="sm" variant="outline" onClick={() => onEditExisting(normalizeBarcode(code))}>Editar el existente</Button></div>}
    <div aria-live="polite">
      {status === 'searching' && <p className="scanner-status"><Loader2 size={16} className="animate-spin"/>Buscando producto…</p>}
      {status === 'found' && <p className="scanner-status ok"><CheckCircle2 size={16}/>Producto encontrado en ez-catalog. Revisá los datos, agregá tu foto y asigná tu precio.</p>}
      {status === 'not-found' && <p className="scanner-status warn"><AlertTriangle size={16}/>Producto no encontrado en ez-catalog. Completá los datos a mano.</p>}
      {status === 'error' && <p className="scanner-status warn"><WifiOff size={16}/>Error de conexión con ez-catalog. Podés reintentar o completar los datos a mano.</p>}
      {status === 'not-configured' && <p className="scanner-status warn"><AlertTriangle size={16}/>La búsqueda automática todavía no está configurada. Completá los datos a mano.</p>}
      {status === 'unauthorized' && <p className="scanner-status warn"><AlertTriangle size={16}/>ez-catalog rechazó la clave de acceso. Completá los datos a mano.</p>}
      {status === 'rate-limited' && <p className="scanner-status warn"><AlertTriangle size={16}/>Se alcanzó el límite de consultas de ez-catalog. Esperá un minuto o completá los datos a mano.</p>}
    </div>
  </div>;
}
