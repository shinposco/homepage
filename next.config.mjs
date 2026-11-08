/** @type {import('next').NextConfig} */
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  ...(isGitHubPagesBuild ? { output: 'export' } : {}),
  basePath: isGitHubPagesBuild ? process.env.NEXT_PUBLIC_BASE_PATH || '/homepage' : '',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
