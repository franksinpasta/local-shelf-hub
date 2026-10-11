import {createFileRoute} from '@tanstack/react-router';
import {AdminShell} from '@/features/kiosco/ui';
import {StorePage} from '@/features/kiosco/store';
import {pageHead} from '@/features/kiosco/data';
export const Route=createFileRoute('/tienda')({head:()=>pageHead('Kiosco La Esquina — Tienda','Explorá la tienda de ejemplo de Kiosco Ya en Río Grande.'),component:Page});
function Page(){return <StorePage/>}
