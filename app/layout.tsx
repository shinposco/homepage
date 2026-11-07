import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata:Metadata={title:{default:'nexsteel — 철강 기술 저널',template:'%s | nexsteel'},description:'수소환원제철부터 탄소중립까지, 철강 기술의 오늘과 내일을 기록합니다.',metadataBase:new URL('https://nexsteel.vercel.app'),openGraph:{siteName:'nexsteel',locale:'ko_KR',type:'website'}}
export const viewport:Viewport={colorScheme:'light dark',themeColor:[{media:'(prefers-color-scheme: light)',color:'#f8f9fb'},{media:'(prefers-color-scheme: dark)',color:'#111318'}]}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
