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
export type Promotion={type:'2x1'|'3x2'|'percentage'|'fixed';value?:number};
export type Product = {id:number; name:string; brand:string; code:string; category:string; price:number; stock:number; published:boolean; image:string;promotion?:Promotion};
const rows: [string,string,string,number,number,boolean,string,Promotion?][] = [
 ['Coca-Cola original 1,5 L','Coca-Cola','Bebidas',3200,24,true,p0,{type:'2x1'}],
 ['Leche entera larga vida 1 L','La Serenísima','Almacén',1850,3,true,p1],
 ['Papas fritas clásicas 120 g',"Lay’s",'Snacks',2400,18,true,p2,{type:'3x2'}],
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
export const statuses=['Pendiente','En preparación','Listo para retirar','Entregado','Cancelado'] as const;
export type OrderStatus=typeof statuses[number];
export type Order={id:number; customer:string; time:string; date:string; delivery:'Retiro en el local';status:OrderStatus;items:{productId:number;quantity:number;price:number}[]};
export const initialOrders:Order[]=[
 {id:1048,customer:'Lucía Fernández',time:'10:42',date:'11 oct. 2026',delivery:'Retiro en el local',status:'Pendiente',items:[{productId:1,quantity:1,price:3200},{productId:2,quantity:2,price:1850}]},
 {id:1047,customer:'Martín Gómez',time:'10:28',date:'11 oct. 2026',delivery:'Retiro en el local',status:'Pendiente',items:[{productId:3,quantity:2,price:2400},{productId:4,quantity:1,price:1500}]},
 {id:1046,customer:'Camila Torres',time:'10:15',date:'11 oct. 2026',delivery:'Retiro en el local',status:'En preparación',items:[{productId:6,quantity:2,price:2800}]},
 {id:1045,customer:'Diego Ruiz',time:'09:56',date:'11 oct. 2026',delivery:'Retiro en el local',status:'Listo para retirar',items:[{productId:7,quantity:1,price:3100},{productId:8,quantity:1,price:1400}]},
 {id:1044,customer:'Sofía Medina',time:'09:35',date:'11 oct. 2026',delivery:'Retiro en el local',status:'Listo para retirar',items:[{productId:9,quantity:3,price:1200}]},
 {id:1043,customer:'Nicolás Vera',time:'09:12',date:'11 oct. 2026',delivery:'Retiro en el local',status:'Entregado',items:[{productId:1,quantity:2,price:3200}]},
 {id:1042,customer:'Ana Molina',time:'18:20',date:'10 oct. 2026',delivery:'Retiro en el local',status:'Cancelado',items:[{productId:3,quantity:1,price:2400}]},
];
export const initialBusiness={name:'Kiosco La Esquina',address:'Calle del Encuentro 245, Río Grande',paymentAlias:'kiosco.ejemplo',hours:'Todos los días de 8:00 a 23:00',description:'Tu kiosco de todos los días. Bebidas, algo rico y todo lo que necesitás, cerca de casa.',pickupInfo:'Retirá tu pedido por el mostrador del local.',published:true,pickup:true,cover,logo:cover};
export type Business=typeof initialBusiness;
export const money=(v:number)=>`$ ${new Intl.NumberFormat('es-AR',{maximumFractionDigits:0}).format(v)}`;
export const availability=(stock:number,publicView=false)=>stock===0?(publicView?'No disponible':'Agotado'):stock<=4?'Poco stock':'Disponible';
export const orderTotal=(o:Order)=>o.items.reduce((s,i)=>s+i.quantity*i.price,0);
export const promotionLabel=(promotion?:Promotion)=>promotion?.type==='2x1'?'2x1':promotion?.type==='3x2'?'3x2':promotion?.type==='percentage'?`${promotion.value||0} % OFF`:promotion?.type==='fixed'?`Precio promo ${money(promotion.value||0)}`:'';
export const promotionDetail=(promotion?:Promotion)=>promotion?.type==='2x1'?'Llevás 2 y pagás 1':promotion?.type==='3x2'?'Llevás 3 y pagás 2':promotion?.type==='percentage'?`${promotion.value||0} % de descuento`:promotion?.type==='fixed'?`Cada unidad a ${money(promotion.value||0)}`:'';
export const promotionalUnitPrice=(product:Product)=>product.promotion?.type==='percentage'?Math.round(product.price*(1-(product.promotion.value||0)/100)):product.promotion?.type==='fixed'?(product.promotion.value||product.price):product.price;
export const promotionalLineTotal=(product:Product,quantity:number)=>product.promotion?.type==='2x1'?Math.ceil(quantity/2)*product.price:product.promotion?.type==='3x2'?(Math.floor(quantity/3)*2+quantity%3)*product.price:promotionalUnitPrice(product)*quantity;
export const publicProducts=(products:Product[])=>products.filter(p=>p.published).map(({stock,...p})=>({...p,availability:availability(stock,true)}));
export const summarize=(products:Product[],orders:Order[])=>({total:products.length,published:products.filter(p=>p.published).length,unpublished:products.filter(p=>!p.published).length,pending:orders.filter(o=>o.status==='Pendiente').length,preparing:orders.filter(o=>o.status==='En preparación').length,ready:orders.filter(o=>o.status==='Listo para retirar').length,low:products.filter(p=>p.stock>0&&p.stock<=4).length,empty:products.filter(p=>p.stock===0).length});
export function pageHead(title:string,description:string){return {meta:[{title:`${title} · Kiosco Ya`},{name:'description',content:description},{property:'og:title',content:`${title} · Kiosco Ya`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};}
