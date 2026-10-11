import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {OrdersPage} from '@/features/kiosco/orders';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/pedidos')({head:()=>pageHead('Pedidos','Organizá pedidos ficticios y simulá cambios de estado.'),component:Page});
function Page(){return <AdminShell><OrdersPage/></AdminShell>}
