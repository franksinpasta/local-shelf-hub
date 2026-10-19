import p0 from '@/assets/product-0.jpg';
import p1 from '@/assets/product-1.jpg';
import p2 from '@/assets/product-2.jpg';
import p3 from '@/assets/product-3.jpg';
import p4 from '@/assets/product-4.jpg';
import p5 from '@/assets/product-5.jpg';
import p6 from '@/assets/product-6.jpg';
import p7 from '@/assets/product-7.jpg';
import p8 from '@/assets/product-8.jpg';
import p9 from '@/assets/product-9.jpg';
import p10 from '@/assets/product-10.jpg';
import p11 from '@/assets/product-11.jpg';
import cover from '@/assets/store.jpg';
export type PromotionType='2x1'|'3x2'|'bundle'|'percentage'|'fixed';
/** value: total del grupo (bundle), % (percentage) o precio por unidad (fixed). minQty: unidades requeridas. text: texto opcional para el cliente. */
export type Promotion={type:PromotionType;value?:number|undefined;minQty?:number|undefined;text?:string|undefined};
export type Product = {id:number; name:string; brand:string; code:string; category:string; price:number; stock:number; published:boolean; image:string;size?:string|undefined;promotion?:Promotion|undefined};
const rows: [string,string,string,number,number,boolean,string,Promotion?][] = [
 ['Coca-Cola original 1,5 L','Coca-Cola','Bebidas',3800,24,true,p0,{type:'bundle',minQty:3,value:9000}],
 ['Leche entera larga vida 1 L','La Serenísima','Almacén',1850,3,true,p1],
 ['Papas fritas clásicas 120 g',"Lay’s",'Snacks',2400,18,true,p2,{type:'2x1'}],
 ['Galletitas Oreo 118 g','Oreo','Galletitas',1500,12,true,p3,{type:'percentage',value:20}],
 ['Sprite lima limón 1,5 L','Sprite','Bebidas',2900,0,true,p4],
 ['Bebida energética 473 ml','Monster','Bebidas',4200,4,true,p5,{type:'fixed',value:3500}],
 ['Yerba mate 500 g','Playadito','Almacén',3100,16,true,p6],
 ['Azúcar clásica 1 kg','Ledesma','Almacén',1400,20,true,p7],
 ['Agua mineral 1,5 L','Villa del Sur','Bebidas',1200,30,true,p8],
 ['Bombones Bon o Bon 150 g','Arcor','Golosinas',2600,2,true,p9],
 ['Limpiador cremoso 750 ml','Cif','Limpieza',2350,0,false,p10],
 ['Galletitas surtidas 400 g','Terrabusi','Galletitas',2100,9,false,p11],
];
export const initialProducts:Product[]=rows.map((r,i)=>({id:i+1,name:r[0],brand:r[1],category:r[2],price:r[3],stock:r[4],published:r[5],image:r[6],promotion:r[7],code:`779000000${String(i+1).padStart(4,'0')}`}));
export const categories=['Bebidas','Golosinas','Snacks','Almacén','Galletitas','Limpieza'];
export const statuses=['Pendiente','En preparación','Listo para retirar','Entregado','Rechazado'] as const;
export type OrderStatus=typeof statuses[number];
export type Order={id:number; customer:string; time:string; date:string; delivery:'Retiro en el local';status:OrderStatus;iso:string;payment?:string|undefined;items:{productId:number;quantity:number;price:number}[]};
export const initialOrders:Order[]=[
 {id:1048,customer:'Lucía Fernández',time:'10:42',date:'11 oct. 2026',iso:'2026-10-11',delivery:'Retiro en el local',payment:'Efectivo al retirar',status:'Pendiente',items:[{productId:1,quantity:1,price:3200},{productId:2,quantity:2,price:1850}]},
 {id:1047,customer:'Martín Gómez',time:'10:28',date:'11 oct. 2026',iso:'2026-10-11',delivery:'Retiro en el local',payment:'Transferencia al alias',status:'Pendiente',items:[{productId:3,quantity:2,price:2400},{productId:4,quantity:1,price:1500}]},
 {id:1046,customer:'Camila Torres',time:'10:15',date:'11 oct. 2026',iso:'2026-10-11',delivery:'Retiro en el local',payment:'Efectivo al retirar',status:'En preparación',items:[{productId:6,quantity:2,price:2800}]},
 {id:1045,customer:'Diego Ruiz',time:'09:56',date:'11 oct. 2026',iso:'2026-10-11',delivery:'Retiro en el local',payment:'Transferencia al alias',status:'Listo para retirar',items:[{productId:7,quantity:1,price:3100},{productId:8,quantity:1,price:1400}]},
 {id:1044,customer:'Sofía Medina',time:'09:35',date:'11 oct. 2026',iso:'2026-10-11',delivery:'Retiro en el local',payment:'Efectivo al retirar',status:'Listo para retirar',items:[{productId:9,quantity:3,price:1200}]},
 {id:1043,customer:'Nicolás Vera',time:'09:12',date:'11 oct. 2026',iso:'2026-10-11',delivery:'Retiro en el local',payment:'Transferencia al alias',status:'Entregado',items:[{productId:1,quantity:2,price:3200}]},
 {id:1042,customer:'Ana Molina',time:'18:20',date:'10 oct. 2026',iso:'2026-10-10',delivery:'Retiro en el local',payment:'Efectivo al retirar',status:'Rechazado',items:[{productId:3,quantity:1,price:2400}]},
];
const MONTHS=['ene.','feb.','mar.','abr.','may.','jun.','jul.','ago.','sep.','oct.','nov.','dic.'];
export const DEMO_TODAY='2026-10-11';
const isoShift=(iso:string,days:number)=>{const d=new Date(iso+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+days);return d.toISOString().slice(0,10)};
export const displayDate=(iso:string)=>{const [y,m,d]=iso.split('-').map(Number);return `${d} ${MONTHS[(m||1)-1]} ${y}`};
const histNames=['Valentina Ríos','Joaquín Paz','Florencia Sosa','Tomás Acuña','Julieta Benítez','Bruno Castro','Micaela Luna','Franco Ojeda'];
const histPrices=[3800,1850,2400,1500,2900,4200,3100,1400,1200,2600];
/** Pedidos ficticios anteriores, solo para probar el historial de ventas. */
export const historyOrders:Order[]=Array.from({length:30},(_,k)=>{const daysAgo=2+Math.floor(k*1.45);const iso=isoShift(DEMO_TODAY,-daysAgo);const a=(k%10)+1,b=((k*3+4)%10)+1;const items=[{productId:a,quantity:1+(k%3),price:histPrices[a-1]||1000},...(a!==b&&k%2===0?[{productId:b,quantity:1,price:histPrices[b-1]||1000}]:[])];return {id:1041-k,customer:histNames[k%histNames.length]||'Cliente',time:`${String(9+(k*5)%13).padStart(2,'0')}:${String((k*17)%60).padStart(2,'0')}`,date:displayDate(iso),iso,delivery:'Retiro en el local',status:k%6===4?'Rechazado':'Entregado',payment:k%2?'Efectivo al retirar':'Transferencia al alias',items}});
export const initialBusiness={name:'Kiosco La Esquina',address:'Calle del Encuentro 245, Río Grande',paymentAlias:'kiosco.ejemplo',hours:'Todos los días de 8:00 a 23:00',description:'Tu kiosco de todos los días. Bebidas, algo rico y todo lo que necesitás, cerca de casa.',pickupInfo:'Retirá tu pedido por el mostrador del local.',published:true,pickup:true,cover,logo:cover};
export type Business=typeof initialBusiness;
export const money=(v:number)=>`$ ${new Intl.NumberFormat('es-AR',{maximumFractionDigits:0}).format(v)}`;
export const availability=(stock:number,publicView=false)=>stock===0?(publicView?'No disponible':'Agotado'):stock<=4?'Poco stock':'Disponible';
export const orderTotal=(o:Order)=>o.items.reduce((s,i)=>s+i.quantity*i.price,0);
export const promotionMinQty=(p?:Promotion)=>!p?1:p.type==='2x1'?2:p.type==='3x2'?3:Math.max(1,Math.floor(p.minQty||1));
const units=(n:number)=>`${n} ${n===1?'unidad':'unidades'}`;
export const promotionLabel=(p?:Promotion)=>!p?'':p.type==='2x1'?'2x1':p.type==='3x2'?'3x2':p.type==='bundle'?`${promotionMinQty(p)} x ${money(p.value||0)}`:p.type==='percentage'?`${p.value||0} % OFF`:`Precio promo ${money(p.value||0)}`;
export const promotionCondition=(p?:Promotion)=>{if(!p)return '';const n=promotionMinQty(p);return n<=1?'Desde 1 unidad':`Llevando ${units(n)}`;};
export const autoPromotionText=(p?:Promotion)=>{if(!p)return '';const n=promotionMinQty(p);switch(p.type){case '2x1':return 'Llevá 2 y pagá 1';case '3x2':return 'Llevá 3 y pagá 2';case 'bundle':return `${units(n)} por ${money(p.value||0)}`;case 'percentage':return n>1?`${p.value||0} % de descuento llevando ${units(n)} o más`:`${p.value||0} % de descuento por unidad`;case 'fixed':return n>1?`Cada unidad a ${money(p.value||0)} llevando ${units(n)} o más`:`Cada unidad a ${money(p.value||0)}`;}};
export const promotionDetail=(p?:Promotion)=>p?.text?.trim()||autoPromotionText(p);
/** Precio unitario promocional solo cuando la promo es por unidad y se cumple la cantidad. */
export const promotionalUnitPrice=(product:{price:number;promotion?:Promotion|undefined},quantity=promotionMinQty(product.promotion))=>{const p=product.promotion;if(!p||quantity<promotionMinQty(p))return product.price;return p.type==='percentage'?Math.round(product.price*(1-(p.value||0)/100)):p.type==='fixed'?(p.value??product.price):product.price;};
export type PromotionBreakdown={quantity:number;unitPrice:number;freeUnits:number;promoGroups:number;subtotal:number;discount:number;total:number;applied:boolean};
/** Una sola promoción por producto; el precio normal nunca se modifica. */
export const promotionBreakdown=(product:{price:number;promotion?:Promotion|undefined},quantity:number):PromotionBreakdown=>{const q=Math.max(0,Math.floor(quantity));const price=product.price;const subtotal=q*price;const p=product.promotion;const n=promotionMinQty(p);let total=subtotal,freeUnits=0,promoGroups=0;
 if(p&&q>=n){if(p.type==='2x1'||p.type==='3x2'){promoGroups=Math.floor(q/n);freeUnits=promoGroups;total=(q-freeUnits)*price;}else if(p.type==='bundle'){promoGroups=Math.floor(q/n);total=promoGroups*(p.value||0)+(q-promoGroups*n)*price;}else{promoGroups=1;total=promotionalUnitPrice(product,q)*q;}}
 total=Math.min(total,subtotal);return {quantity:q,unitPrice:price,freeUnits,promoGroups,subtotal,discount:subtotal-total,total,applied:subtotal-total>0};};
export const promotionalLineTotal=(product:{price:number;promotion?:Promotion|undefined},quantity:number)=>promotionBreakdown(product,quantity).total;
export const hasUnitDiscount=(p?:Promotion)=>(p?.type==='percentage'||p?.type==='fixed')&&promotionMinQty(p)<=1;
/** Devuelve un mensaje de error o '' si la configuración es válida. */
export const validateProduct=(price:number,promotion?:Promotion)=>{if(!Number.isFinite(price)||price<=0)return 'El precio normal debe ser un número mayor a 0.';if(!promotion)return '';if(promotion.type==='bundle'||promotion.type==='percentage'||promotion.type==='fixed'){const m=promotion.minQty;if(m===undefined||!Number.isInteger(m)||m<1)return 'La cantidad mínima debe ser un número entero positivo.';if(promotion.type==='bundle'&&m<2)return 'El precio especial por cantidad requiere al menos 2 unidades.';const v=promotion.value;if(v===undefined||!Number.isFinite(v)||v<=0)return promotion.type==='percentage'?'Ingresá un porcentaje válido.':'Ingresá un precio promocional válido.';if(promotion.type==='percentage'&&v>=100)return 'El porcentaje debe ser menor a 100.';if(promotion.type==='fixed'&&v>=price)return 'El precio promocional por unidad debe ser menor al precio normal.';if(promotion.type==='bundle'&&v>=price*m)return `El precio del grupo debe ser menor a ${money(price*m)} (precio normal de ${m} unidades).`;}return '';};
export const publicProducts=(products:Product[])=>products.filter(p=>p.published).map(({stock,...p})=>({...p,availability:availability(stock,true)}));
export const summarize=(products:Product[],orders:Order[])=>({total:products.length,published:products.filter(p=>p.published).length,unpublished:products.filter(p=>!p.published).length,pending:orders.filter(o=>o.status==='Pendiente').length,preparing:orders.filter(o=>o.status==='En preparación').length,ready:orders.filter(o=>o.status==='Listo para retirar').length,low:products.filter(p=>p.stock>0&&p.stock<=4).length,empty:products.filter(p=>p.stock===0).length});
export function pageHead(title:string,description:string){return {meta:[{title:`${title} · Kiosco Ya`},{name:'description',content:description},{property:'og:title',content:`${title} · Kiosco Ya`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}

export type HistoryGroup='Entregado'|'Rechazado'|'Pendiente';
/** Estado del historial: los pedidos aún sin resolver (pendiente, en preparación, listo) cuentan como pendientes. */
export const historyGroup=(s:OrderStatus):HistoryGroup=>s==='Entregado'?'Entregado':s==='Rechazado'?'Rechazado':'Pendiente';
export type Period='hoy'|'7d'|'30d'|'mes'|'rango';
export const periodRange=(period:Period,today=DEMO_TODAY,from?:string,to?:string):[string,string]=>period==='hoy'?[today,today]:period==='7d'?[isoShift(today,-6),today]:period==='30d'?[isoShift(today,-29),today]:period==='mes'?[today.slice(0,8)+'01',today]:[from||'0000-01-01',to||'9999-12-31'];
export const inRange=(o:Order,[a,b]:[string,string])=>o.iso>=a&&o.iso<=b;
export const sortRecent=(orders:Order[])=>[...orders].sort((x,y)=>(y.iso+y.time).localeCompare(x.iso+x.time)||y.id-x.id);
export const historyStats=(orders:Order[])=>{const unique=[...new Map(orders.map(o=>[o.id,o])).values()];const r={delivered:0,rejected:0,pending:0,revenue:0,rejectedAmount:0,pendingAmount:0,total:unique.length,averageTicket:0,pct:{Entregado:0,Rechazado:0,Pendiente:0} as Record<HistoryGroup,number>};for(const o of unique){const g=historyGroup(o.status),t=orderTotal(o);if(g==='Entregado'){r.delivered++;r.revenue+=t}else if(g==='Rechazado'){r.rejected++;r.rejectedAmount+=t}else{r.pending++;r.pendingAmount+=t}}r.averageTicket=r.delivered?Math.round(r.revenue/r.delivered):0;if(r.total){r.pct={Entregado:Math.round(r.delivered/r.total*1000)/10,Rechazado:Math.round(r.rejected/r.total*1000)/10,Pendiente:Math.round(r.pending/r.total*1000)/10}}return r};
