import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export type Post = { slug:string; title:string; description:string; date:string; updated?:string; author:string; category:string; tags:string[]; coverImage?:string; featured?:boolean; draft?:boolean; relatedPosts?:string[]; content:string; readingTime:string; excerpt:string }
const dir = path.join(process.cwd(),'content/posts')
function excerpt(content:string){ return content.replace(/^---[\s\S]*?---/,'').replace(/[#>*`_\[\]]/g,'').replace(/\s+/g,' ').trim().slice(0,150)+'…' }
export function getAllPosts():Post[]{
  if(!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f=>f.endsWith('.md')).map(file=>{ const raw=fs.readFileSync(path.join(dir,file),'utf8'); const parsed=matter(raw); const d=parsed.data; const content=parsed.content; return {slug:file.replace(/\.md$/,''), title:d.title||file, description:d.description||excerpt(content), date:String(d.date||''), updated:d.updated, author:d.author||'Admin', category:d.category||'기술 인사이트', tags:Array.isArray(d.tags)?d.tags:[], coverImage:d.coverImage, featured:Boolean(d.featured), draft:Boolean(d.draft), relatedPosts:Array.isArray(d.relatedPosts)?d.relatedPosts:[], content, readingTime:Math.max(1,Math.round(readingTime(content).minutes))+'분', excerpt:excerpt(content)} }).filter(p=>!p.draft).sort((a,b)=>b.date.localeCompare(a.date))
}
export function getPostBySlug(slug:string){return getAllPosts().find(p=>p.slug===slug)}
export function getFeaturedPosts(){return getAllPosts().filter(p=>p.featured)}
export function getAllCategories(){return [...new Set(getAllPosts().map(p=>p.category))]}
export function getAllTags(){return [...new Set(getAllPosts().flatMap(p=>p.tags))]}
export function getRelatedPosts(slug:string,limit=3){const posts=getAllPosts(); const current=posts.find(p=>p.slug===slug); if(!current)return []; const manual=(current.relatedPosts||[]).map(s=>posts.find(p=>p.slug===s)).filter(Boolean) as Post[]; const rest=posts.filter(p=>p.slug!==slug&&!manual.some(m=>m.slug===p.slug)).sort((a,b)=>((b.category===current.category?1:0)-(a.category===current.category?1:0))||((b.tags.filter(t=>current.tags.includes(t)).length)-(a.tags.filter(t=>current.tags.includes(t)).length))||b.date.localeCompare(a.date)); return [...manual,...rest].slice(0,limit)}
export function formatDate(date:string){return new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'short',day:'numeric'}).format(new Date(date))}
