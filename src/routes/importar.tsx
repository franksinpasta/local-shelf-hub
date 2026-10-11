import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {ImportPage} from '@/features/kiosco/import';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/importar')({head:()=>pageHead('Importar Excel','Recorré la importación simulada de un catálogo desde Excel.'),component:Page});
function Page(){return <AdminShell><ImportPage/></AdminShell>}
