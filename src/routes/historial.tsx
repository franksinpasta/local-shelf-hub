import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {HistoryPage} from '@/features/kiosco/history';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/historial')({head:()=>pageHead('Historial de ventas','Pedidos, ingresos y estadísticas ficticias de Kiosco La Esquina por período.'),component:Page});
function Page(){return <AdminShell><HistoryPage/></AdminShell>}
