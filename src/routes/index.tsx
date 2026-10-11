import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {Dashboard} from '@/features/kiosco/dashboard';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/')({head:()=>pageHead('Inicio — Kiosco La Esquina','Resumen de productos, disponibilidad y pedidos del comercio de demostración Kiosco Ya.'),component:Index});
function Index(){return <AdminShell><Dashboard/></AdminShell>}
