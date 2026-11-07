import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Footer, Header } from '@/components/blog'
import { PostCard } from '@/components/blog/post-card'
import { getAllCategories, getAllPosts, getFeaturedPosts } from '@/lib/posts'
import hyrexImage from '@/HyREX.png'

export default function Home(){
  const posts=getAllPosts()
  const featured=getFeaturedPosts()[0]||posts[0]

  return <>
    <Header categories={getAllCategories()}/>
    <main>
      <section className="hero wrap">
        <div className="hero-copy-block">
          <p className="eyebrow accent">NEXSTEEL / TECHNICAL JOURNAL</p>
          <h1>철강의 다음을<br/><em>기록합니다.</em></h1>
          <p className="hero-copy">수소환원제철부터 탄소중립까지,<br/>산업을 바꾸는 기술과 사람에 대한 이야기.</p>
          <Link className="text-link" href="/posts">전체 글 읽기 <ArrowRight size={16}/></Link>
        </div>
        <figure className="hero-visual">
          <Image
            src={hyrexImage}
            alt="POSCO HyREX 수소환원제철 설비 조감도"
            priority
            sizes="(max-width: 760px) 100vw, 52vw"
          />
          <figcaption>HyREX · 수소환원제철 설비</figcaption>
        </figure>
      </section>
      {featured&&<section className="wrap feature-section"><div className="section-label"><span>FEATURED</span><span>01 / 06</span></div><PostCard post={featured} featured/></section>}
      <section className="wrap latest">
        <div className="section-heading"><div><p className="eyebrow accent">THE ARCHIVE</p><h2>새로운 관점</h2></div><Link className="text-link" href="/posts">모든 글 보기 <ArrowRight size={16}/></Link></div>
        <div className="post-grid">{posts.slice(1,4).map(p=><PostCard key={p.slug} post={p}/>)}</div>
      </section>
      <section className="category-strip"><div className="wrap"><p className="eyebrow accent">EXPLORE BY TOPIC</p><h2>관심 있는 주제에서<br/>이야기를 시작하세요.</h2><div className="category-list">{getAllCategories().map((c,i)=><Link key={c} href={`/categories/${encodeURIComponent(c)}`}><span>0{i+1}</span>{c}<ChevronRight size={18}/></Link>)}</div></div></section>
    </main>
    <Footer/>
  </>
}
