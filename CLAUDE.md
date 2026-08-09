# 프로젝트: book-review-log

Next.js(App Router) 기반 도서 리뷰 큐레이션 사이트.
렌더링 전략(SSG/CSR)을 페이지 성격에 따라 의도적으로 나누어 설계하고,
Claude Code를 활용해 구현하는 개인 프로젝트입니다.

## 목표
- 페이지 성격에 맞는 렌더링 전략(SSG/CSR) 설계 및 적용
- Server Component / Client Component 경계 설계
- 정적 데이터 기반 SSG 파이프라인(generateStaticParams, generateMetadata) 구현

## 스코프
- 페이지: 홈(`/`), 책 상세(`/books/[slug]`), 목록·검색(`/books`) — 3개로 제한
- 데이터: `data/books.ts`에 TypeScript 배열로 관리 (외부 API/DB/CMS 없음)
- 제외 범위: 인증, 댓글/방명록, 태그 아카이브, ISR
- 디자인: shadcn/ui 기본 컴포넌트 활용, 커스텀 디자인 시스템 구축은 범위 밖
- 위 스코프를 벗어나는 기능 제안은 하지 말고, 필요 시 먼저 확인을 구할 것

## 파일 구조
book-review-log/
├── app/
│ ├── page.tsx # 홈
│ ├── books/
│ │ ├── page.tsx # 목록/검색
│ │ └── [slug]/page.tsx # 상세
├── data/
│ └── books.ts # 책 데이터 + Book 타입
├── components/ # 재사용 컴포넌트 (shadcn 포함)
├── lib/ # 유틸 함수
## 렌더링 전략
| 페이지 | 전략 | 이유 |
|---|---|---|
| 홈 | SSG | 정적 콘텐츠, 최고 성능 |
| 책 상세 | SSG (`generateStaticParams` + `generateMetadata`) | 콘텐츠 고정, SEO 메타데이터 페이지별 생성 필요 |
| 목록/검색 | Server 초기 페칭 + Client(TanStack Query) | 필터링은 클라이언트 인터랙션, 초기 데이터는 서버에서 로드 |

## 코드 컨벤션
- 컴포넌트: 화살표 함수 (`const Home = () => {}`)
- Export: 일반 컴포넌트는 named export / 페이지·레이아웃은 Next.js 규칙상 default export
- 타입: `type` 우선, `interface`는 필요 시에만
- Import: 절대 경로 사용 (`@/components/...`, `@/data/...`)
- 스타일링: Tailwind CSS + shadcn/ui

## 작업 방식
- 구조 및 설계 관련 결정은 사전에 확정된 내용을 따르며, 임의로 변경하지 않을 것
- 코드 작성 시 어떤 판단으로 이렇게 구현했는지 간단히 설명을 덧붙일 것
- 반복적인 보일러플레이트, 타입 정의는 작성 가능
- 리뷰 콘텐츠(책 리뷰 본문)는 직접 작성하지 않음 — 별도 제공

## 완료 기준
- `npm run dev` 기준 에러 없이 렌더링 확인
- TypeScript 에러 없이 완료 (any 남용 지양)
- 작업 완료 후 무엇을 했는지, 다음 확인이 필요한 부분을 요약

## Git 규칙
- 커밋은 직접 수행 (자동 커밋하지 않음)
- 변경 사항은 diff로 명확히 제시 후 검토받을 것

## 기술 스택
Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · TanStack Query
데이터: 로컬 TypeScript 파일 (백엔드 없음) · 배포: Vercel
