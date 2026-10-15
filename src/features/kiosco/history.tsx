import {useMemo,useState} from 'react';
import {Search,CheckCheck,XCircle,Clock,Wallet,Ban,ReceiptText,Check,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useDemo} from './context';
import {historyGroup,historyStats,inRange,money,orderTotal,periodRange,sortRecent,DEMO_TODAY,type HistoryGroup,type Order,type Period} from './data';
import {PageHeading,Badge,OrderDetail} from './ui';

const periods:{id:Period;label:string}[]=[{id:'hoy',label:'Hoy'},{id:'7d',label:'Últimos 7 días'},{id:'30d',label:'Últimos 30 días'},{id:'mes',label:'Este mes'},{id:'rango',label:'Personalizado'}];
const groups:HistoryGroup[]=['Entregado','Rechazado','Pendiente'];
const colors:Record<HistoryGroup,string>={Entregado:'var(--success)',Rechazado:'var(--danger)',Pendiente:'var(--warning)'};
const pct=(n:number)=>`${new Intl.NumberFormat('es-AR',{maximumFractionDigits:1}).format(n)} %`;

export function HistoryPage(){
 const {orders,products,setOrders,notify}=useDemo();
 const [period,setPeriod]=useState<Period>('30d');const [from,setFrom]=useState('2026-09-01');const [to,setTo]=useState(DEMO_TODAY);
 const [status,setStatus]=useState<'Todos'|HistoryGroup>('Todos');const [search,setSearch]=useState('');const [selected,setSelected]=useState<Order>();
 const range=periodRange(period,DEMO_TODAY,from,to);
 const inPeriod=useMemo(()=>orders.filter(o=>inRange(o,range)),[orders,range[0],range[1]]);
 const st=historyStats(inPeriod);
 const rows=sortRecent(inPeriod.filter(o=>(status==='Todos'||historyGroup(o.status)===status)&&String(o.id).includes(search.replace('#','').trim())));
 const resolve=(o:Order,s:'Entregado'|'Rechazado')=>{setOrders(os=>os.map(x=>x.id===o.id?{...x,status:s}:x));notify(`Pedido #${o.id} marcado como ${s.toLowerCase()} en la demostración`)};
 const counts:Record<HistoryGroup,number>={Entregado:st.delivered,Rechazado:st.rejected,Pendiente:st.pending};
 let offset=0;const C=2*Math.PI*42;
 return <>
  <PageHeading eyebrow="TUS RESULTADOS, CLAROS" title="Historial de ventas" description="Consultá los pedidos de tu tienda y cómo te fue en cada período."/>
  <div className="information-note mb-5">Datos ficticios de demostración. Los cambios duran mientras la demostración está abierta y no se guardan.</div>
  <div className="order-tabs history-periods">{periods.map(p=><Button key={p.id} variant="ghost" className={p.id===period?'selected':''} onClick={()=>setPeriod(p.id)}>{p.label}</Button>)}</div>
  {period==='rango'&&<div className="history-range"><label className="field-label">Desde<Input type="date" value={from} max={to} onChange={e=>setFrom(e.target.value)}/></label><label className="field-label">Hasta<Input type="date" value={to} min={from} onChange={e=>setTo(e.target.value)}/></label></div>}
  <section className="stat-grid history-stats">
   <Stat label="Ventas entregadas" value={String(st.delivered)} icon={CheckCheck} tone="green"/>
   <Stat label="Ventas rechazadas" value={String(st.rejected)} icon={XCircle} tone="red"/>
   <Stat label="Pedidos pendientes" value={String(st.pending)} icon={Clock} tone="amber"/>
   <Stat label="Ingresos generados" value={money(st.revenue)} icon={Wallet} tone="green" sub="Solo pedidos entregados"/>
   <Stat label="Importe rechazado" value={money(st.rejectedAmount)} icon={Ban} tone="red" sub="No suma a los ingresos"/>
  </section>
  <section className="history-grid">
   <div className="history-card"><h2>Distribución de pedidos</h2><p className="history-hint">Porcentaje según cantidad de pedidos, no según dinero.</p>
    {st.total?<div className="pie-wrap"><svg viewBox="0 0 100 100" className="pie" role="img" aria-label={groups.map(g=>`${g}: ${pct(st.pct[g])}`).join(', ')}><circle cx="50" cy="50" r="42" fill="none" stroke="var(--muted)" strokeWidth="16"/>{groups.map(g=>{const len=counts[g]/st.total*C;const el=len>0?<circle key={g} cx="50" cy="50" r="42" fill="none" stroke={colors[g]} strokeWidth="16" strokeDasharray={`${len} ${C-len}`} strokeDashoffset={-offset} transform="rotate(-90 50 50)"/>:null;offset+=len;return el})}<text x="50" y="49" textAnchor="middle" className="pie-total">{st.total}</text><text x="50" y="60" textAnchor="middle" className="pie-label">pedidos</text></svg>
     <ul className="pie-legend">{groups.map(g=><li key={g}><span style={{background:colors[g]}}/><strong>{g==='Entregado'?'Entregados':g==='Rechazado'?'Rechazados':'Pendientes'}</strong><em>{pct(st.pct[g])}</em><small>{counts[g]} {counts[g]===1?'pedido':'pedidos'}</small></li>)}</ul></div>:<p className="history-empty">No hay pedidos en este período.</p>}
   </div>
   <div className="history-card"><h2>Resumen económico</h2><p className="history-hint">Los rechazados y pendientes no cuentan como ingresos.</p>
    <dl className="money-list">
     <div><dt>Entregados (ingresos)</dt><dd className="text-success">{money(st.revenue)}</dd></div>
     <div><dt>Rechazados</dt><dd>{money(st.rejectedAmount)}</dd></div>
     <div><dt>Pendientes (potencial)</dt><dd>{money(st.pendingAmount)}</dd></div>
     <div><dt>Cantidad total de pedidos</dt><dd>{st.total}</dd></div>
     <div><dt>Ticket promedio entregado</dt><dd>{money(st.averageTicket)}</dd></div>
    </dl>
   </div>
  </section>
  <div className="history-filters"><div className="search-field"><Search size={18}/><Input aria-label="Buscar por número de pedido" placeholder="Buscar por número de pedido..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
   <select aria-label="Filtrar por estado" className="history-select" value={status} onChange={e=>setStatus(e.target.value as typeof status)}><option value="Todos">Todos los estados</option>{groups.map(g=><option key={g} value={g}>{g}</option>)}</select></div>
  {rows.length?<div className="history-list">{rows.map(o=>{const g=historyGroup(o.status);return <article key={o.id} className="history-row">
   <div className="history-id"><Button variant="link" className="order-number" onClick={()=>setSelected(o)}>#{o.id}</Button><small>{o.iso===DEMO_TODAY?'Hoy':o.date} · {o.time}</small></div>
   <ul className="history-items">{o.items.map(i=><li key={i.productId}>{i.quantity} × {products.find(p=>p.id===i.productId)?.name||'Producto'}</li>)}</ul>
   <div className="history-pay"><ReceiptText size={14}/>{o.payment||'Sin dato'}</div>
   <strong className="order-price">{money(orderTotal(o))}</strong>
   <div className="history-status"><Badge value={g}/>{g==='Pendiente'&&o.status!=='Pendiente'&&<small>{o.status}</small>}</div>
   {g==='Pendiente'?<div className="history-actions"><Button size="sm" onClick={()=>resolve(o,'Entregado')}><Check/>Entregado</Button><Button size="sm" variant="outline" onClick={()=>resolve(o,'Rechazado')}><X/>Rechazar</Button></div>:<span/>}
  </article>})}</div>:<div className="empty-state"><ReceiptText/><h3>No hay pedidos con estos filtros</h3><p>Probá con otro período, estado o número.</p></div>}
  <OrderDetail key={selected?.id} order={selected} onClose={()=>setSelected(undefined)}/>
 </>;
}
function Stat({label,value,icon:Icon,tone,sub}:{label:string;value:string;icon:typeof Clock;tone:string;sub?:string}){return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={19}/></span></div><strong className="stat-value history-value">{value}</strong>{sub&&<div className="stat-bottom"><span>{sub}</span></div>}</div>}
