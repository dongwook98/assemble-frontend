'use client';

import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useSelectContext } from './Select';

export const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const { value: selectedValue, onChange, setOpen } = useSelectContext();
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => {
        onChange(value);
        setOpen(false);
      }}
      className={cn(
        'relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none hover:bg-slate-100',
        isSelected && 'bg-slate-50 font-medium text-slate-900'
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
};
