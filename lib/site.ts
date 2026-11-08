const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexsteel.vercel.app'

export const basePath = process.env.GITHUB_ACTIONS === 'true'
  ? process.env.NEXT_PUBLIC_BASE_PATH || '/homepage'
  : ''
export const siteBaseUrl = `${origin.replace(/\/$/, '')}${basePath}`

export function withBasePath(path: string, addTrailingSlash = false) {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const suffixStart = path.search(/[?#]/)
  const pathname = suffixStart === -1 ? path : path.slice(0, suffixStart)
  const suffix = suffixStart === -1 ? '' : path.slice(suffixStart)
  const routePath = addTrailingSlash && pathname !== '/' && !pathname.endsWith('/') && !/\.[^/]+$/.test(pathname)
    ? `${pathname}/`
    : pathname
  return `${basePath}${routePath}${suffix}`
}
