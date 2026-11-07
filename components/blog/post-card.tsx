import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/posts'
const formatDate=(date:string)=>new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'short',day:'numeric'}).format(new Date(date))
export function PostCard({post,featured=false}:{post:Post;featured?:boolean}){return <article className={`post-card ${featured?'featured-card':''}`}><Link href={`/posts/${post.slug}`} className="card-image" style={post.coverImage?{backgroundImage:`url(${post.coverImage})`}:{}}><span>{post.category}</span></Link><div className="card-body"><div className="eyebrow">{post.category}<span>·</span>{formatDate(post.date)}</div><Link href={`/posts/${post.slug}`}><h3>{post.title}</h3></Link><p>{post.description}</p><div className="card-meta"><span>{post.readingTime} 읽기</span><Link href={`/posts/${post.slug}`}>자세히 보기 <ArrowRight size={14}/></Link></div></div></article>}
