# FSD(FEATURE-SLICED DESIGN) 폴더 구조 가이드

이 문서는 본 프로젝트에서 사용하는 **FSD(Feature-Sliced Design)** 아키텍처의 목적과 폴더 구조, 그리고 각 레이어의 역할과 사용 규칙을 설명한다.

---

## 1. FSD를 사용하는 이유

FSD는 프론트엔드 애플리케이션을 **역할과 책임 단위로 분리**하여 다음을 목표로 한다.

- 규모가 커져도 구조가 무너지지 않음
- 기능 단위로 명확한 책임 분리
- 협업 시 충돌 최소화
- 재사용 가능한 코드 증가

공식 개념 문서:

- [https://feature-sliced.design/](https://feature-sliced.design/)

---

## 2. 전체 폴더 구조

```text
src/
├── app/                # Next.js App Router
├── shared/             # 전역 공통 자원
├── entities/           # 도메인 엔티티
├── features/           # 사용자 행동 단위 기능
├── widgets/            # 페이지를 구성하는 UI 블록
└── pages/ (선택)       # 라우트 단위 페이지 컴포넌트
```

---

## 3. 레이어별 상세 설명

### 3.1 shared

**가장 하위 레이어**로, 프로젝트 전반에서 재사용되는 자원만 포함한다.

#### 포함 대상

- 공통 UI 컴포넌트 (Button, Modal 등)
- 공통 훅
- 유틸 함수
- 전역 타입
- 디자인 토큰

```text
shared/
├── ui/
├── hooks/
├── lib/
├── types/
└── config/
```

#### 규칙

- 비즈니스 로직 포함 금지
- 어떤 레이어에서도 import 가능

---

### 3.2 entities

**도메인 개념 단위**를 표현하는 레이어이다.

#### 예시 엔티티

- User
- Post
- Product
- Reservation

```text
entities/
└── user/
    ├── model/
    ├── ui/
    └── types.ts
```

#### 역할

- 도메인 데이터 구조 정의
- 도메인 단위 UI 제공
- 도메인 관련 로직 캡슐화

#### 규칙

- 다른 entities 참조 가능
- features, widgets에서 사용 가능

---

### 3.3 features

**사용자의 행동(행위)** 을 기준으로 구성되는 레이어이다.

#### 예시

- 로그인
- 회원가입
- 게시글 작성
- 좋아요 클릭

```text
features/
└── auth/login/
    ├── ui/
    ├── model/
    └── api.ts
```

#### 역할

- 하나의 사용자 액션을 완성
- entities를 조합하여 기능 구현

#### 규칙

- entities, shared만 참조 가능
- 다른 feature 직접 참조 금지

---

### 3.4 widgets

**페이지를 구성하는 UI 블록** 단위 레이어이다.

#### 예시

- Header
- Sidebar
- FeedList

```text
widgets/
└── header/
    ├── ui/
    └── index.ts
```

#### 역할

- 여러 feature와 entity를 조합
- 페이지 레벨에서 바로 사용 가능

---

### 3.5 app (Next.js)

Next.js App Router 전용 레이어이다.

#### 역할

- 라우팅
- 레이아웃 구성
- 페이지 단위 컴포넌트

#### 규칙

- 비즈니스 로직 최소화
- widgets 중심으로 페이지 구성

---

## 4. 레이어 간 의존성 규칙

```text
shared ← entities ← features ← widgets ← app
```

- 위 방향으로만 import 가능
- 역방향 참조 금지

---

## 5. 언제 어디에 코드를 둬야 할까?

| 상황             | 위치                |
| ---------------- | ------------------- |
| 단순 버튼 UI     | shared/ui           |
| 사용자 정보 표시 | entities/user       |
| 로그인 기능      | features/auth/login |
| 헤더 전체 구성   | widgets/header      |
| 라우트 페이지    | app/                |

---

## 6. 팀 협업 규칙 요약

- 기능 추가 시 feature부터 고려
- 공용 가능성 있으면 shared로 이동
- 애매하면 더 상위 레이어에 두지 말 것

---

## 7. 참고 자료

- FSD 공식 문서: [https://feature-sliced.design/](https://feature-sliced.design/)
- FSD GitHub: [https://github.com/feature-sliced](https://github.com/feature-sliced)
