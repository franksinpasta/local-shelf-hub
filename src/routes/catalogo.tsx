import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {Catalog} from '@/features/kiosco/catalog';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/catalogo')({validateSearch:(search:Record<string,unknown>)=>({nuevo:search.nuevo===true||search.nuevo==='true'}),head:()=>pageHead('Mi catálogo','Organizá los productos y precios de tu tienda de demostración.'),component:Page});
function Page(){return <AdminShell><Catalog startNew={Route.useSearch().nuevo}/></AdminShell>}
