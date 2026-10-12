import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';

type Theme='light'|'dark';
type ThemeContextValue={theme:Theme;toggleTheme:()=>void};
const ThemeContext=createContext<ThemeContextValue|undefined>(undefined);

export function ThemeProvider({children}:{children:ReactNode}){
 const [theme,setTheme]=useState<Theme>('light');
 useEffect(()=>{const saved=window.localStorage.getItem('kiosco-ya-theme');const next=saved==='dark'?'dark':'light';setTheme(next);document.documentElement.classList.toggle('dark',next==='dark');document.documentElement.style.colorScheme=next},[]);
 function toggleTheme(){setTheme(current=>{const next=current==='dark'?'light':'dark';document.documentElement.classList.toggle('dark',next==='dark');document.documentElement.style.colorScheme=next;window.localStorage.setItem('kiosco-ya-theme',next);return next})}
 return <ThemeContext.Provider value={{theme,toggleTheme}}>{children}</ThemeContext.Provider>;
}

export function useTheme(){const value=useContext(ThemeContext);if(!value)throw new Error('ThemeProvider required');return value}