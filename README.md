# nexsteel 기술 블로그

Markdown 파일만 추가해도 자동으로 글이 생성되는 Next.js 기반 기술 블로그입니다.

## 새 글 추가하기

`content/posts/새-글-슬러그.md` 파일을 만들고 아래 frontmatter를 작성하세요.

```yaml
---
title: "글 제목"
description: "검색 결과와 카드에 표시될 요약"
date: "2026-11-07"
author: "작성자"
category: "카테고리"
tags: [Tag, Another Tag]
featured: false
draft: false
relatedPosts: [기존-글-슬러그]
---
```

파일명은 `/posts/[파일명]` URL이 됩니다. `relatedPosts`에 슬러그를 지정하면 먼저 노출되고, 부족한 자리는 같은 카테고리와 태그를 기준으로 자동 추천됩니다. `draft: true` 글은 목록, 관련 글, sitemap, RSS에서 제외됩니다.

이미지는 `public/images/posts`에 넣고 `coverImage: "/images/posts/example.jpg"`로 연결하세요. 본문에는 표준 Markdown, GFM 표, 코드 블록, 수식(KaTeX)을 사용할 수 있습니다.

## 로컬 실행 및 배포

```bash
pnpm install
pnpm dev
```

### GitHub Pages 배포

저장소의 `deploy` 브랜치에 푸시하면 GitHub Actions가 정적 사이트를 빌드해 Pages에 배포합니다. 글은 `content/posts`의 Markdown 파일로 관리하며, 새 글을 푸시할 때마다 다시 생성됩니다.

최초 한 번 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택하세요. 현재 저장소 이름 기준 주소는 `https://shinposco.github.io/homepage/`입니다. 이 주소를 바꾸거나 사용자 지정 도메인을 연결하면 `.github/workflows/deploy-pages.yml`의 `NEXT_PUBLIC_BASE_PATH`와 `NEXT_PUBLIC_SITE_URL`도 함께 수정하세요.

로컬에서 정적 빌드 결과를 확인하려면 `pnpm build`를 실행하세요. 결과물은 `out/`에 생성됩니다.

Vercel 배포도 계속 사용할 수 있습니다. 로컬 및 Vercel 빌드에서는 GitHub Pages용 경로 접두사가 적용되지 않습니다.
