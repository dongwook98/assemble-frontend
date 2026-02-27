'use client';

export const TabPlaceholder = ({ title }: { title: string }) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4 py-12 text-slate-400">
      <div className="text-xl font-black tracking-widest uppercase">
        {title} 준비 중
      </div>
      <p className="text-sm font-medium">
        조금만 기다려주세요! 곧 멋진 기능을 선보일게요. 🚀
      </p>
    </div>
  );
};
