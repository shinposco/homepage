import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import { withBasePath } from '@/lib/site'

type MarkdownNode = {type:string; url?:string; children?:MarkdownNode[]}

function prefixInternalLinks(){return (tree:MarkdownNode)=>{const visit=(node:MarkdownNode)=>{if((node.type==='link'||node.type==='image')&&node.url?.startsWith('/')&&!node.url.startsWith('//'))node.url=withBasePath(node.url,node.type==='link'); node.children?.forEach(visit)}; visit(tree)}}

export async function Markdown({content}:{content:string}){const html=String(await unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(prefixInternalLinks).use(remarkRehype,{allowDangerousHtml:true}).use(rehypeHighlight).use(rehypeKatex).use(rehypeStringify).process(content)); return <div className="article-body" dangerouslySetInnerHTML={{__html:html}}/>}
export function Toc({content}:{content:string}){const headings=content.match(/^#{2,3} .+$/gm)||[]; return <aside className="toc"><strong>목차</strong>{headings.map((h,i)=>{const text=h.replace(/^#{2,3} /,'');return <a key={i} href={`#${text.toLowerCase().replace(/[^a-z0-9가-힣]+/g,'-')}`}>{text}</a>})}</aside>}
