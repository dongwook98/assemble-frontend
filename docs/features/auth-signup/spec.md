# 회원가입 (Auth Signup) - Technical Specification (Spec)

## 1. 아키텍처 설계 (FSD Layering)
*   **Shared**:
    *   `api/apiClient`: `ky` 기반 HTTP 통신. (Response 자동 `result` 추출)
    *   `ui/Input`, `InputGroup`, `FormField`, `Button`: 공통 UI 컴포넌트.
*   **Entities**:
    *   `user/useUserStore`: 회원가입 성공 후 세션 유지 (`login` 액션).
*   **Features**:
    *   `auth/ui/SignupForm`: 회원가입 폼 및 비즈니스 로직 (이메일 인증 버튼 포함).
    *   `auth/model/authSchema`: `signupSchema`, `CATEGORIES`, `SignupRequest` 정의.
    *   `auth/api/authApi`: `signup`, `requestEmailVerification` API 함수.
*   **Pages**:
    *   `auth/signup/ui/SignupPage`: 회원가입 페이지 컨테이너.

## 2. 데이터 모델링 & 타입 정의 (Data Modeling)
```typescript
// src/features/auth/model/authSchema.ts
export const CATEGORIES = ['STUDY', 'EXERCISE', 'PROJECT', 'HOBBY', 'CULTURE_ART'] as const;

export const signupSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
  email: z.string().email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.').regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, '비밀번호는 영문과 숫자를 포함해야 합니다.'),
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  categories: z.array(z.enum(CATEGORIES)).min(1, '최소 1개의 관심 카테고리를 선택해주세요.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

export type SignupFormValues = z.infer<typeof signupSchema>;

/**
 * 백엔드 전송용 타입 (confirmPassword 제외)
 */
export type SignupRequest = Omit<SignupFormValues, 'confirmPassword'>;

export interface SignupResult {
  id: number;
  createdAt: string;
}
```

## 3. API 명세 (API Specification)
### 3.1 이메일 인증 요청
*   **Endpoint**: `POST /api/members/email`
*   **Request**: `{ email: string }`
*   **Response**: `ApiResponse<void>`
    *   성공 시 `code: "COMMON200"`

### 3.2 회원가입
*   **Endpoint**: `POST /api/members/signup`
*   **Request**: `SignupRequest`
*   **Response**: `ApiResponse<SignupResult>`
    *   성공 시 `result` 필드에 `{ id: number, createdAt: string }` 포함.

## 4. 핵심 로직 (Key Logic)
*   **Response Handling**: `apiClient.ts`의 `handleApiResponse` 훅에서 `isSuccess` 여부를 확인하고, 성공 시 `result` 필드만 추출하여 반환함. 만약 `result`가 없는 응답일 경우 `Response` 객체만 반환하도록 보완 필요.
*   **Form Data Transformation**: `SignupForm` 제출 시 `signupSchema`를 통해 검증된 데이터에서 `confirmPassword`를 제거하여 `authApi.signup`에 전달.

## 5. 컴포넌트 설계 (Component Design)
*   **SignupForm**: 이메일 입력 필드 옆에 '인증 요청' 버튼 배치. 해당 버튼 클릭 시 `authApi.requestEmailVerification` 호출.
