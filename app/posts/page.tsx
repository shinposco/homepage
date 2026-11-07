import { Header, Footer } from '@/components/blog'
import { PostGrid } from '@/components/blog/post-grid'
import { getAllCategories, getAllPosts } from '@/lib/posts'
export const metadata={title:'전체 포스팅 | nexsteel'}
export default function PostsPage(){const posts=getAllPosts(); return <><Header categories={getAllCategories()}/><main className="wrap archive"><div className="archive-head"><p className="eyebrow accent">THE ARCHIVE</p><h1>전체 포스팅</h1><p>철강 기술과 산업의 변화에 관한 {posts.length}개의 기록</p></div><PostGrid posts={posts}/></main><Footer/></>}
