'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';

interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onChange: (val: string) => void;
}

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context)
    throw new Error('Select components must be used within a <Select />');
  return context;
};

export const Select = ({
  children,
  value,
  onChange,
}: {
  children: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener('mousedown', outClick);
    return () => document.removeEventListener('mousedown', outClick);
  }, []);

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onChange }}>
      <div className="relative w-full" ref={containerRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};
