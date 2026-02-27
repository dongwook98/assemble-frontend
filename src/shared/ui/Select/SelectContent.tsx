'use client';

import { useSelectContext } from './Select';

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSelectContext();
  if (!open) return null;

  return (
    <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-2 w-full origin-top-right overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md">
      <div className="p-1">{children}</div>
    </div>
  );
};
