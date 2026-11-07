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

Vercel 프로젝트에 연결한 뒤 배포하면 새 Markdown 파일이 다음 빌드에서 자동 반영됩니다. 타입 검사와 정적 생성을 확인하려면 `pnpm build`를 실행하세요.
