import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
export function Header({categories=[]}:{categories?:string[]}){return <header className="site-header"><Link href="/" className="logo"><span className="logo-mark">N</span><span>nexsteel<span className="logo-dot">.</span></span></Link><nav><Link href="/">홈</Link><Link href="/posts">전체 글</Link><div className="category-nav"><span>카테고리</span><div className="category-menu">{categories.map(c=><Link key={c} href={`/categories/${encodeURIComponent(c)}`}>{c}</Link>)}</div></div></nav><ThemeToggle/></header>}
export function Footer(){return <footer><div><span className="logo"><span className="logo-mark">N</span><span>nexsteel<span className="logo-dot">.</span></span></span><p>철강 기술의 오늘과 내일을 기록합니다.</p></div><div className="footer-links"><Link href="/posts">전체 글</Link><Link href="/feed.xml">RSS 피드</Link></div><small>© 2026 nexsteel. All rights reserved.</small></footer>}
export { PostCard } from './post-card'
