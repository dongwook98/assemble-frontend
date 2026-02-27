export default function MyPageHome() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-black text-slate-900">마이페이지 홈</h2>
      <p className="font-medium text-slate-500">
        환영합니다! 여기서 나의 활동 요약을 확인하세요.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex h-40 items-center justify-center rounded-3xl border border-slate-100 bg-slate-50 p-6 font-bold text-slate-400">
          활동 요약 차트 준비 중
        </div>
        <div className="flex h-40 items-center justify-center rounded-3xl border border-slate-100 bg-slate-50 p-6 font-bold text-slate-400">
          최근 알림 준비 중
        </div>
      </div>
    </div>
  );
}
