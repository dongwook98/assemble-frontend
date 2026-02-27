# AGENTS.md — AI 에이전트 지침서

이 파일은 이 프로젝트에서 작업하는 AI 에이전트(Antigravity 등)가 항상 자동으로 읽는 파일입니다.
코드 작성, 리뷰, 리팩토링 시 아래의 모든 가이드라인을 반드시 따르세요.

---

## 필수 Skills (항상 참조)

작업 시 아래 skill 가이드를 반드시 읽고 적용하세요:

- **Next.js 모범 사례** → `.agents/skills/next-best-practices/SKILL.md`
- **Vercel React 모범 사례** → `.agents/skills/vercel-react-best-practices/SKILL.md`

---

## 프로젝트 개요

| 항목                | 내용                            |
| ------------------- | ------------------------------- |
| **프레임워크**      | Next.js 16 (App Router)         |
| **React**           | React 19                        |
| **언어**            | TypeScript                      |
| **패키지 매니저**   | pnpm                            |
| **스타일링**        | Tailwind CSS v4                 |
| **전역 상태**       | Zustand                         |
| **서버 상태**       | TanStack Query (React Query v5) |
| **폼**              | React Hook Form + Zod           |
| **HTTP 클라이언트** | ky                              |
| **아이콘**          | lucide-react                    |
| **API 모킹**        | MSW v2                          |
| **코드 품질**       | ESLint + Prettier               |

---

## 아키텍처 (Feature-Sliced Design)

```
src/
├── app/          # Next.js App Router (pages, layouts, 인터셉팅 라우트)
│   ├── @modal/   # 병렬 라우트 슬롯 — 모달 인터셉팅용
│   └── (auth)/   # 인증 관련 라우트 그룹
├── widgets/      # 복합 UI 블록 (예: Header, Sidebar)
├── features/     # 사용자 기능 단위 (예: 로그인, 회원가입)
├── entities/     # 비즈니스 엔티티 (예: user, book)
└── shared/       # 공통 유틸, UI 컴포넌트, 타입
    └── ui/       # 공유 UI 컴포넌트 라이브러리 (Dialog, Button 등)
```

### FSD 규칙

- **임포트 방향**: `app` → `widgets` → `features` → `entities` → `shared`
- **슬라이스 간 교차 임포트 금지**: 예) `features`끼리 서로 임포트 불가
- 각 슬라이스는 반드시 **`index.ts`** 를 통해 퍼블릭 API 제공

---

## 핵심 컨벤션

### Next.js / React

- **기본적으로 Server Component 사용**, `'use client'`는 꼭 필요한 경우에만
- 이미지는 반드시 **`next/image`** 사용 (`<img>` 태그 금지)
- 폰트는 반드시 **`next/font`** 사용
- 내부 링크는 반드시 **`next/link`** 사용
- 무거운 클라이언트 컴포넌트는 **`next/dynamic`** 으로 코드 스플리팅
- 병렬 라우트 슬롯에는 반드시 **`default.tsx`** 제공

### TypeScript

- **`any` 사용 금지** — `unknown` 또는 명시적 타입 사용
- 객체 타입은 `interface`보다 **`type`** 선호
- 함수 반환 타입은 명시적으로 선언

### 폼

- **React Hook Form + Zod** 스키마 검증 조합 사용
- `@hookform/resolvers/zod` 로 스키마 연결

### 상태 관리

- 전역 클라이언트 상태 → **Zustand**
- 서버 상태 → **TanStack Query** (`useEffect`에서 직접 fetch 금지)

### 스타일링

- **Tailwind CSS v4** 유틸리티 클래스 사용
- 조건부 클래스 병합은 `clsx` + `tailwind-merge` 조합의 `cn()` 유틸 사용
- 모바일 퍼스트 반응형 디자인 원칙 준수

---

## 성능 규칙 (Vercel Skills 핵심 요약)

- **데이터 워터폴 방지**: 독립적인 fetch는 `Promise.all()` 로 병렬 처리
- **`'use client'` 최소화**: 클라이언트 컴포넌트는 가능한 한 깊은 트리에 배치
- **배럴 파일 임포트 지양**: 소스 파일에서 직접 임포트
- **`React.cache()` 활용**: Server Component 내 요청별 중복 제거
- **`Suspense` 경계 활용**: 스트리밍 및 로딩 상태 처리
- **`next/dynamic` 활용**: 무거운 컴포넌트 코드 스플리팅

---

## 파일 네이밍 컨벤션

| 종류              | 규칙                     | 예시                                  |
| ----------------- | ------------------------ | ------------------------------------- |
| 컴포넌트          | PascalCase               | `LoginForm.tsx`                       |
| 훅                | camelCase + `use` 접두사 | `useAuthStore.ts`                     |
| 유틸리티          | camelCase                | `formatDate.ts`                       |
| 타입              | camelCase + `.types.ts`  | `auth.types.ts`                       |
| 퍼블릭 API        | 항상 `index.ts`          | `index.ts`                            |
| Next.js 특수 파일 | 소문자                   | `page.tsx`, `layout.tsx`, `error.tsx` |
