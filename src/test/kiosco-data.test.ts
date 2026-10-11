import {describe,it,expect} from 'vitest';
import {initialProducts,initialOrders,publicProducts,summarize,orderTotal,availability} from '@/features/kiosco/data';
describe('Demo consistency',()=>{
 it('public catalog hides exact inventory and unpublished products',()=>{const publicRows=publicProducts(initialProducts);expect(publicRows).toHaveLength(10);expect(publicRows.every(p=>!('stock' in p))).toBe(true);expect(publicRows.some(p=>p.id===11)).toBe(false);expect(publicRows.find(p=>p.id===5)?.availability).toBe('No disponible')});
 it('summary derives catalog and order numbers from the shared demo',()=>{expect(summarize(initialProducts,initialOrders)).toEqual({total:12,published:10,unpublished:2,pending:2,preparing:1,ready:1,low:3,empty:2})});
 it('order total uses quantity and item price',()=>{const order=initialOrders[0];if(!order)throw new Error('Missing demo order');expect(orderTotal(order)).toBe(6900)});
 it('availability distinguishes zero, low and available inventory',()=>{expect(availability(0)).toBe('Agotado');expect(availability(0,true)).toBe('No disponible');expect(availability(2)).toBe('Poco stock');expect(availability(24)).toBe('Disponible')});
 it('public changes reflect the same catalog price and publication',()=>{const edited=initialProducts.map(p=>p.id===1?{...p,price:4000,published:false}:p);expect(publicProducts(edited).some(p=>p.id===1)).toBe(false);expect(summarize(edited,initialOrders).published).toBe(9)});
});
