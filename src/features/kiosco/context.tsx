import {createContext,useContext,useState,type ReactNode} from 'react';
import {initialProducts,initialOrders,historyOrders,initialBusiness,type Product,type Order,type Business} from './data';
type DemoState={products:Product[];setProducts:React.Dispatch<React.SetStateAction<Product[]>>;orders:Order[];setOrders:React.Dispatch<React.SetStateAction<Order[]>>;business:Business;setBusiness:React.Dispatch<React.SetStateAction<Business>>;cart:Record<number,number>;setCart:React.Dispatch<React.SetStateAction<Record<number,number>>>;notify:(message:string)=>void};
const DemoContext=createContext<DemoState|undefined>(undefined);
export function DemoProvider({children}:{children:ReactNode}){const [products,setProducts]=useState(initialProducts);const [orders,setOrders]=useState(()=>[...initialOrders,...historyOrders]);const [business,setBusiness]=useState(initialBusiness);const [cart,setCart]=useState<Record<number,number>>({});const [notice,setNotice]=useState('');
 const notify=(message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(''),4200)};
 return <DemoContext.Provider value={{products,setProducts,orders,setOrders,business,setBusiness,cart,setCart,notify}}>{children}{notice&&<div role="status" className="demo-toast">✓ {notice}</div>}</DemoContext.Provider>;
}
export function useDemo(){const context=useContext(DemoContext);if(!context)throw new Error('DemoProvider required');return context;}
