# 회원가입 (Auth Signup) - Implementation Task List

## 1. 작업 단계 (Implementation Phases)
*   [x] **Phase 1: 인프라 및 기반 작업**
    *   [x] `authApi.signup` 인터페이스 및 핸들러 구현
    *   [x] MSW를 이용한 회원가입 API 모킹
*   [x] **Phase 2: 비즈니스 로직 및 스키마 정의**
    *   [x] Zod 기반 `signupSchema` 정의 (비밀번호 규칙, 카테고리 검증 포함)
    *   [x] 카테고리 상수(`CATEGORIES`) 및 타입 정의
*   [x] **Phase 3: UI 및 컴포넌트 개발**
    *   [x] `SignupForm` 컴포넌트 구현
    *   [x] 관심 카테고리 선택용 칩(Chip) UI 개발 및 토글 로직 연동
    *   [x] 아이콘 적용 및 폼 레이아웃 구성
*   [x] **Phase 4: 통합 및 검증**
    *   [x] 회원가입 완료 후 자동 로그인 연동
    *   [x] 성공 시 메인 화면 이동 및 실패 시 에러 핸들링
    *   [x] `SignupPage` 라우트 연결
*   [x] **Phase 5: 실제 백엔드 API 연동 및 이메일 인증**
    *   [x] `authApi.ts`: 엔드포인트 수정 (`/api/members/signup`)
    *   [x] `authApi.ts`: 이메일 인증 요청 API 추가 (`/api/members/email`)
    *   [x] `apiClient.ts`: `result` 필드 없는 응답(void) 처리 로직 보완
    *   [x] `SignupForm`: 이메일 인증 요청 버튼 UI 추가 및 기능 연동
    *   [x] `SignupForm`: 회원가입 제출 시 `confirmPassword` 필드 제외 처리

## 2. 세부 체크리스트 (Detailed Tasks)
### 🚀 Phase 5: API Refactoring & Email Auth
- [x] `SignupForm`에서 이메일 입력값 유효성 확인 후 '인증 요청' 버튼 활성화 로직
- [x] 이메일 인증 요청 성공 시 토스트 알림 표시 (현재 alert으로 대체)
- [x] 회원가입 요청 데이터 변환 (FormValues -> SignupRequest)
- [x] 서버 에러(예: MEMBER4003) 발생 시 명세에 따른 메시지 노출 (ApiError 활용)
