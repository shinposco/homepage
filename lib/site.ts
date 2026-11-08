const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexsteel.vercel.app'

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
export const siteBaseUrl = `${origin.replace(/\/$/, '')}${basePath}`

export function withBasePath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  return `${basePath}${path}`
}
