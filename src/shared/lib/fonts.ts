import localFont from 'next/font/local';

/**
 * @description Pretendard 가변 폰트(Variable Font) 설정
 * - FSD shared 계층의 assets에 위치한 폰트 파일을 로컬 로드합니다.
 * - Variable Font를 사용하여 단일 파일로 모든 두께(weight)를 대응합니다.
 */
export const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',

  // 폰트 로딩 전략: 로딩 중에는 기본 폰트를 보여주어 CLS(레이아웃 밀림) 방지
  display: 'swap',

  // 가변 폰트의 두께 범위 (Pretendard Variable 표준: 45 ~ 920)
  weight: '45 920',

  // CSS 변수명 정의: globals.css의 Tailwind @theme에서 --font-sans로 연결됨
  variable: '--font-pretendard',
});
