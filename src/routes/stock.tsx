import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {Catalog} from '@/features/kiosco/catalog';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/stock')({head:()=>pageHead('Stock y disponibilidad','Revisá las existencias de ejemplo y los productos con poco stock.'),component:Page});
function Page(){return <AdminShell><Catalog stockView/></AdminShell>}
