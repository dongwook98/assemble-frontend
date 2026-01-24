# 커밋 컨벤션 가이드

이 문서는 팀 협업과 변경 이력의 가독성을 높이기 위한 커밋 메시지 작성 규칙을 정의합니다.

---

## 1. 기본 원칙

- **한 커밋 = 하나의 목적**
- 현재형, 명령문으로 작성 (예: `add`, `fix`, `update`)
- 메시지는 **무엇을** 했는지 명확히 표현
- 불필요한 마침표 사용 지양

---

## 2. 커밋 메시지 구조

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 2.1 Type (필수)

변경의 성격을 나타냅니다.

| 타입     | 설명                                    |
| -------- | --------------------------------------- |
| feat     | 새로운 기능 추가                        |
| fix      | 버그 수정                               |
| refactor | 기능 변경 없는 코드 구조 개선           |
| style    | 포맷팅, 세미콜론 누락 등 로직 변경 없음 |
| docs     | 문서 추가 또는 수정                     |
| test     | 테스트 코드 추가/수정                   |
| chore    | 빌드 설정, 패키지 관리, 기타 작업       |
| perf     | 성능 개선                               |
| ci       | CI 설정 변경                            |
| build    | 빌드 시스템 또는 외부 의존성 변경       |
| revert   | 이전 커밋 되돌리기                      |

---

### 2.2 Scope (선택)

변경 범위를 소괄호로 명시합니다.

- 컴포넌트명: `Button`, `Header`
- 도메인/기능: `auth`, `payment`
- 페이지: `login-page`

예시:

```
feat(auth): add social login with kakao
```

---

### 2.3 Subject (필수)

- 50자 이내
- 첫 글자는 소문자 권장
- 마침표 사용 지양

예시:

```
fix: prevent crash on empty response
```

---

## 3. Body (선택)

변경 이유와 상세 내용을 작성합니다.

- 무엇을, 왜 변경했는지 설명
- 여러 줄 작성 가능
- 한 줄당 72자 이내 권장

예시:

```
fix(user): handle null profile image

기존 사용자 데이터 중 프로필 이미지가 없는 경우
UI 렌더링 단계에서 오류가 발생하던 문제를 수정
```

---

## 4. Footer (선택)

이슈 트래킹 또는 브레이킹 체인지 명시용입니다.

### 4.1 이슈 연결

```
Closes #123
```

### 4.2 브레이킹 체인지

```
BREAKING CHANGE: auth token storage strategy updated
```

---

## 5. 커밋 예시 모음

```
feat: add study matching feature
```

```
refactor(calendar): simplify date parsing logic
```

```
docs: update README installation guide
```

```
chore: bump react-query to v5
```

---

## 6. 권장 사항

- PR 제목은 커밋 메시지 규칙과 동일하게 작성
- Squash merge 시 커밋 메시지 정리
- 자동 린트 도구(commitlint) 사용 고려

---

## 7. 팀 합의 체크리스트

- [ ] Type 목록 합의
- [ ] Scope 네이밍 규칙 정의
- [ ] 브레이킹 체인지 기준 공유
- [ ] 리뷰 시 커밋 메시지 품질 확인

---
