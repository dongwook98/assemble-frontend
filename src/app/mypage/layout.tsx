import { MyPageSidebar } from '@/widgets/mypage-sidebar/ui/MyPageSidebar';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 py-12 md:flex-row md:px-8">
      {/* 좌측 사이드바 */}
      <MyPageSidebar />

      {/* 우측 컨텐츠 영역 */}
      <main className="min-w-0 flex-1">
        <div className="rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
