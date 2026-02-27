'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';

interface ButtonRadioGroupProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  className?: string;
}

export const ButtonRadioGroup = <T extends string>({
  value,
  onChange,
  options,
  className,
}: ButtonRadioGroupProps<T>) => {
  return (
    <div className={cn('flex gap-2', className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex-1 rounded-xl border p-3 text-sm font-semibold transition-all',
              isActive
                ? 'bg-brand-500 border-brand-500 text-white shadow-sm'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonRadioGroup;
