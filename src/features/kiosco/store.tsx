import {useState} from 'react';
import {Link} from '@tanstack/react-router';
import {ArrowLeft,ShoppingBag,Search,MapPin,Clock,Plus,Minus,Trash2,Store,Eye,Wallet} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {useDemo} from './context';
import {categories,money,publicProducts,promotionLabel,promotionDetail,promotionCondition,promotionalUnitPrice,promotionBreakdown,hasUnitDiscount,promotionMinQty} from './data';
import {Brand,Badge} from './ui';

/** Vista previa de solo lectura: el carrito es local y nunca crea pedidos. */
export function StorePage(){
 const {products,business}=useDemo();
 const [search,setSearch]=useState('');const [category,setCategory]=useState('Todos');const [cartOpen,setCartOpen]=useState(false);
 const [cart,setCart]=useState<Record<number,number>>({});
 const publicRows=publicProducts(products);
 const rows=publicRows.filter(p=>(category==='Todos'||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase()));
 const cartRows=publicRows.filter(p=>(cart[p.id]||0)>0);
 const count=cartRows.reduce((s,p)=>s+(cart[p.id]||0),0);
 const lines=cartRows.map(p=>({p,b:promotionBreakdown(p,cart[p.id]||0)}));
 const subtotal=lines.reduce((s,l)=>s+l.b.subtotal,0);const discount=lines.reduce((s,l)=>s+l.b.discount,0);const total=subtotal-discount;
 function change(id:number,by:number){setCart(c=>({...c,[id]:Math.max(0,(c[id]||0)+by)}))}
 return <div className="store-page">
  <div className="preview-bar"><span className="preview-notice"><Eye size={15}/>Estás viendo una vista previa de tu tienda</span><Button asChild size="sm" variant="secondary"><Link to="/"><ArrowLeft size={16}/>Volver al panel</Link></Button></div>
  <header className="store-header"><Brand/><span className="store-location"><MapPin size={15}/>Río Grande</span><Button variant="outline" onClick={()=>setCartOpen(true)}><ShoppingBag/>Carrito de prueba <span className="cart-count">{count}</span></Button></header>
  <section className="store-hero">
   <div className="store-cover"><img src={business.cover} alt={`Portada de ${business.name}`} width={1536} height={768}/></div>
   <div className="store-identity">
    <div><h1>{business.name}</h1>
     <div className="store-info"><span><MapPin size={16}/>{business.address}</span><span><Clock size={16}/>{business.hours}</span><span><Store size={16}/>Retiro en el local</span><span><Wallet size={16}/>Alias: {business.paymentAlias}</span></div>
    </div>
    <span className={`store-open${business.published?'':' paused'}`}><span/>{business.published?'Tienda publicada':'Tienda pausada'}</span>
   </div>
  </section>
  <main className="store-content">{!business.published?<div className="empty-state"><Store/><h2>La tienda está pausada</h2><p>Volvé al panel y publicala desde Mi negocio.</p><Button asChild><Link to="/negocio">Ir a mi negocio</Link></Button></div>:<>
   <div className="store-catalog-heading"><div><p className="eyebrow">ENCONTRÁ LO QUE NECESITÁS</p><h2>El kiosco, a un toque.</h2></div><div className="search-field"><Search size={18}/><Input aria-label="Buscar en tienda" placeholder="¿Qué estás buscando?" value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
   <div className="category-tabs">{['Todos',...categories].map(c=><Button key={c} variant={c===category?'default':'outline'} onClick={()=>setCategory(c)}>{c}</Button>)}</div>
   <div className="store-product-grid">{rows.map(p=><article className="store-product" key={p.id}><div className="store-product-image"><img src={p.image} alt={p.name} width={384} height={384} loading="lazy"/></div><div className="store-product-body"><span className="store-product-category">{p.category}</span><h3>{p.name}</h3><Badge value={p.availability}/>{p.promotion&&<div className="product-promotion"><strong>{promotionLabel(p.promotion)}</strong><span>{promotionDetail(p.promotion)}</span><small>{promotionCondition(p.promotion)}</small></div>}<div className="store-product-bottom"><div className="store-price">{hasUnitDiscount(p.promotion)?<><del>{money(p.price)}</del><strong>{money(promotionalUnitPrice(p))}</strong><small>por unidad con promo</small></>:<><small>Precio normal</small><strong>{money(p.price)}</strong><small>por unidad</small></>}</div><Button size="icon" title="Probar en el carrito" aria-label={`Agregar ${p.name} al carrito de prueba`} disabled={p.availability==='No disponible'} onClick={()=>change(p.id,1)}><Plus/></Button></div></div></article>)}</div>
   {!rows.length&&<div className="empty-state"><ShoppingBag/><h3>No encontramos ese producto</h3><Button variant="outline" onClick={()=>{setSearch('');setCategory('Todos')}}>Ver todos</Button></div>}</>}
   <footer className="store-footer"><Brand/><p>Tu barrio. Tu kiosco. Más cerca.</p><span>Vista previa con datos ilustrativos. Desde aquí no se generan pedidos.</span></footer></main>
  {count>0&&<Button className="mobile-cart" onClick={()=>setCartOpen(true)}><ShoppingBag/>Carrito de prueba ({count})<strong>{money(total)}</strong></Button>}
  <Dialog open={cartOpen} onOpenChange={setCartOpen}><DialogContent className="demo-dialog"><DialogTitle>Carrito de prueba</DialogTitle><DialogDescription>Vista previa: sirve para ver cómo se calculan las promociones. No crea pedidos.</DialogDescription>
   {cartRows.length?<><div className="cart-items">{lines.map(({p,b})=><div className="cart-item" key={p.id}><img src={p.image} alt="" width={48} height={48}/><div><strong>{p.name}</strong>
    <small>{b.quantity} × {money(b.unitPrice)} (precio normal){p.promotion?` · ${promotionLabel(p.promotion)}`:''}</small>
    {p.promotion&&<small className="cart-promo">{b.freeUnits>0?`${b.freeUnits} ${b.freeUnits===1?'unidad bonificada':'unidades bonificadas'} · `:''}{b.applied?`Promoción aplicada · Descuento −${money(b.discount)}`:`Agregá ${promotionMinQty(p.promotion)-b.quantity>0?promotionMinQty(p.promotion)-b.quantity:''} para acceder: ${promotionDetail(p.promotion)}`}</small>}
    <small>Total: <b>{money(b.total)}</b></small>
    <div className="quantity-control"><Button variant="outline" size="icon" aria-label={`Quitar una unidad de ${p.name}`} onClick={()=>change(p.id,-1)}><Minus/></Button><span>{cart[p.id]}</span><Button variant="outline" size="icon" aria-label={`Sumar una unidad de ${p.name}`} onClick={()=>change(p.id,1)}><Plus/></Button></div></div><Button variant="ghost" size="icon" aria-label={`Eliminar ${p.name}`} onClick={()=>setCart(c=>({...c,[p.id]:0}))}><Trash2/></Button></div>)}</div>
    <div className="total-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
    <div className="total-row"><span>Descuentos</span><span>{discount?`−${money(discount)}`:money(0)}</span></div>
    <div className="total-row"><span>Total final</span><strong>{money(total)}</strong></div>
    <div className="order-delivery"><Store size={18}/><span><strong>Retiro en el local</strong><small>{business.pickupInfo}</small></span></div>
    <p className="fine-print">Estás en la vista previa: la confirmación de compra está desactivada para que no se generen pedidos propios.</p><Button variant="outline" onClick={()=>setCart({})}>Vaciar carrito de prueba</Button></>
   :<div className="empty-state"><ShoppingBag/><h3>El carrito de prueba está vacío</h3><Button onClick={()=>setCartOpen(false)}>Explorar productos</Button></div>}
  </DialogContent></Dialog></div>}
