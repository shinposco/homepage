import { siteBaseUrl } from '@/lib/site'

export const dynamic = 'force-static'

export function GET(){return new Response(`User-agent: *\nAllow: /\nSitemap: ${siteBaseUrl}/sitemap.xml`,{headers:{'Content-Type':'text/plain'}})}
