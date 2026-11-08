import { notFound } from 'next/navigation'
import { Footer, Header } from '@/components/blog'
import { PostGrid } from '@/components/blog/post-grid'
import { getAllCategories, getAllPosts } from '@/lib/posts'
export function generateStaticParams(){return getAllCategories().map(c=>({slug:encodeURIComponent(c)}))}
export const dynamicParams = false
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){const category=decodeURIComponent((await params).slug); const posts=getAllPosts().filter(p=>p.category===category); if(!posts.length)notFound(); return <><Header categories={getAllCategories()}/><main className="wrap archive"><div className="archive-head"><p className="eyebrow accent">CATEGORY</p><h1>{category}</h1><p>{posts.length}개의 포스팅</p></div><PostGrid posts={posts}/></main><Footer/></>}
