import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {BusinessPage} from '@/features/kiosco/business';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/negocio')({head:()=>pageHead('Mi negocio','Editá los datos ficticios del comercio y su tienda online.'),component:Page});
function Page(){return <AdminShell><BusinessPage/></AdminShell>}
