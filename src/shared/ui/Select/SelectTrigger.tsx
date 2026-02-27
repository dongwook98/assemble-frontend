'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useSelectContext } from './Select';

interface SelectTriggerProps {
  placeholder?: string;
  className?: string;
  displayValue?: string; // value(id) 대신 화면에 보여줄 텍스트 (예: '최신순')
}

export const SelectTrigger = ({
  placeholder,
  className,
  displayValue,
}: SelectTriggerProps) => {
  const { open, setOpen, value } = useSelectContext();

  return (
    <button
      onClick={() => setOpen(!open)}
      type="button"
      className={cn(
        'focus:border-brand-500/50 focus:ring-brand-500/20 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
        className
      )}
    >
      <span className="truncate">{displayValue || value || placeholder}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 opacity-50 transition-transform duration-200',
          open && 'rotate-180'
        )}
      />
    </button>
  );
};
