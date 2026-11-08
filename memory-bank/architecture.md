# 프로젝트 아키텍처

## 개요

`nexsteel`은 Next.js App Router 기반의 한국어 철강 기술 블로그입니다. 게시물은 별도 CMS나 데이터베이스 없이 Markdown 파일로 관리하며, 서버 컴포넌트와 페이지 라우트가 파일 기반 콘텐츠를 읽어 화면, sitemap, RSS를 구성합니다.

## 주요 디렉터리

```text
app/                       App Router 페이지와 응답 라우트
  categories/[slug]/       카테고리별 게시물 목록
  posts/                   게시물 목록 및 상세 페이지
  feed.xml/                RSS 피드
  robots.txt/              robots.txt 응답
  sitemap.xml/             게시물 기반 sitemap 응답
components/
  blog/                    블로그 공통 UI 및 콘텐츠 표시 컴포넌트
  ui/                      재사용 UI 컴포넌트
content/posts/             게시물 Markdown 원본
lib/                       게시물 로딩 및 공용 유틸리티
public/                    정적 이미지와 아이콘
```

## 요청 및 콘텐츠 흐름

1. `content/posts/*.md` 파일에 게시물 본문과 YAML frontmatter를 작성합니다. 파일명에서 `.md`를 뺀 값이 게시물 slug입니다.
2. `lib/posts.ts`가 파일을 읽고 `gray-matter`로 frontmatter와 본문을 분리합니다. 이 계층에서 기본 메타데이터, 읽기 시간, 발췌문을 계산하고 `draft: true` 게시물을 제외한 뒤 날짜 내림차순으로 정렬합니다.
3. 홈, 전체 게시물, 카테고리 및 상세 페이지가 `lib/posts.ts`의 조회 함수를 사용합니다. 상세 게시물은 정적 경로 파라미터를 생성하며, 존재하지 않는 slug는 404 처리합니다.
4. 상세 페이지의 `Markdown` 컴포넌트는 unified 파이프라인으로 Markdown을 HTML로 변환합니다. GFM, 수식(KaTeX), 코드 구문 강조를 처리하며 `Toc`는 본문의 2·3단계 제목에서 목차를 만듭니다.
5. `app/sitemap.xml/route.ts`, `app/feed.xml/route.ts`, `app/robots.txt/route.ts`가 검색 및 구독용 응답을 제공합니다. 게시물 목록은 공통 게시물 조회 함수를 사용하므로 초안은 이 응답에도 포함되지 않습니다.

## 화면 구성

- `app/layout.tsx`: 한국어 문서 루트, 전역 CSS, 사이트 metadata, 프로덕션 환경의 Vercel Analytics를 설정합니다.
- `app/page.tsx`: 대표 게시물, 최신 게시물 일부, 카테고리 탐색을 보여줍니다.
- `app/posts/page.tsx`: 전체 게시물 목록을 제공합니다.
- `app/posts/[slug]/page.tsx`: 게시물 본문, 목차, 태그 및 관련 게시물을 표시합니다.
- `app/categories/[slug]/page.tsx`: 카테고리에 해당하는 게시물만 보여줍니다.
- `components/blog/index.tsx`: 공통 헤더와 푸터를 제공합니다.
- `components/blog/post-grid.tsx`: 게시물 검색, 카테고리 필터, 정렬을 처리하는 클라이언트 컴포넌트입니다.
- `components/blog/post-card.tsx`: 게시물 카드 UI를 제공합니다.
- `components/blog/theme-toggle.tsx`: 문서 루트에 `dark` 클래스를 토글합니다.
- `app/globals.css`: Tailwind CSS와 테마 변수, 블로그 레이아웃 및 반응형 스타일을 정의합니다.

## 주요 기술 및 설정

- Next.js `16.4.3`, React `19`, TypeScript
- 패키지 매니저: pnpm (`package.json`의 packageManager 및 `pnpm-lock.yaml` 기준)
- Markdown 처리: unified, remark, rehype, gray-matter
- 수식: remark-math, rehype-katex, KaTeX 스타일
- 코드 강조: rehype-highlight
- UI: Tailwind CSS 4, Lucide React, Base UI
- `@/*` 별칭은 프로젝트 루트를 가리킵니다.
- `next.config.mjs`에서 TypeScript 빌드 오류를 무시하고 Next 이미지 최적화를 비활성화합니다.

## 콘텐츠 작성 규칙

새 게시물은 `content/posts/<slug>.md`로 추가합니다. frontmatter의 주요 필드는 `title`, `description`, `date`, `author`, `category`, `tags`, `featured`, `draft`, `relatedPosts`, `coverImage`입니다. `coverImage`는 `/images/posts/...` 같은 `public/` 기준 URL로 지정합니다. `relatedPosts`에 지정한 글이 먼저 노출되고, 나머지는 같은 카테고리와 공통 태그, 날짜를 기준으로 추천됩니다.

세부 frontmatter 예시와 로컬 실행 방법은 루트 `README.md`를 참고하세요.

## 유지보수 시 확인할 점

- 게시물 데이터의 필드나 정렬·초안 규칙을 바꾸면 홈, 카드, 상세 페이지, 카테고리, RSS, sitemap의 소비처를 함께 확인합니다.
- `lib/site.ts`가 사이트 origin과 base path를 관리합니다. GitHub Actions에서는 GitHub Pages용 origin 및 `/homepage` base path를 주입하고, 로컬/Vercel에서는 기본 Vercel origin과 빈 base path를 사용합니다.
- GitHub Pages 배포는 `.github/workflows/deploy-pages.yml`이 `deploy` 브랜치 푸시 시 `next build`의 `out/` 정적 산출물을 게시합니다. 동적 게시물·카테고리 라우트는 `generateStaticParams`로 빌드 시 전부 생성합니다.
- `next.config.mjs`의 `typescript.ignoreBuildErrors: true` 때문에 빌드 성공만으로 타입 오류가 없다고 판단하지 않습니다.
- 이 문서는 현재 파일 구조를 기준으로 작성되었습니다. 라우트, 데이터 계층, 콘텐츠 형식이 변경되면 함께 갱신합니다.
