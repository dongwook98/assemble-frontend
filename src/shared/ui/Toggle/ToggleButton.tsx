import { cn } from '@/shared/lib/utils';

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: 'pill' | 'rect' | 'tab'; // 'tab' 타입 추가
}

export const ToggleButton = ({
  isActive,
  variant = 'pill',
  children,
  className,
  ...props
}: ToggleButtonProps) => {
  const baseStyles =
    'flex items-center gap-2 font-black transition-all whitespace-nowrap text-sm';

  const variants = {
    pill: 'px-6 py-3 rounded-full border-2',
    rect: 'px-4 py-2.5 rounded-xl border-2',
    // 탭 스타일: 테두리 대신 하단 보더만 사용
    tab: 'px-2 py-3 border-b-2 bg-transparent rounded-none',
  };

  // variant별 상태 스타일 분기
  const getStatusStyles = () => {
    if (variant === 'tab') {
      return isActive
        ? 'border-brand-500 text-brand-600'
        : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200';
    }

    return isActive
      ? 'bg-brand-50 border-brand-500 text-brand-600 shadow-sm'
      : 'bg-white border-slate-100 text-slate-400 hover:border-brand-200 hover:text-slate-600';
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        getStatusStyles(),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
