'use client'
import { Moon } from 'lucide-react'
export function ThemeToggle(){return <button className="theme-toggle" onClick={()=>document.documentElement.classList.toggle('dark')} aria-label="테마 전환"><Moon size={18}/></button>}
