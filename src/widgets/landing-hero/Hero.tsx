import { GroupOfflineRegionFilter } from '@/features/groups-filter/ui/GroupOfflineRegionFilter';
import { GroupSearchBar } from '@/features/groups-search';
import HeroTitle from './HeroTitle';
import Link from 'next/link'; // Link 컴포넌트 import
import { CATEGORIES } from '@/features/auth/model/authSchema'; // CATEGORIES import

// 카테고리별 URL 매핑 (임시)
const categoryUrls: Record<string, string> = {
  STUDY: '/groups?category=STUDY',
  EXERCISE: '/groups?category=EXERCISE',
  PROJECT: '/groups?category=PROJECT',
  HOBBY: '/groups?category=HOBBY',
  CULTURE_ART: '/groups?category=CULTURE_ART',
};

// 카테고리 표시를 위한 라벨 맵
const CATEGORY_LABELS: Record<string, string> = {
  STUDY: '스터디',
  EXERCISE: '운동',
  PROJECT: '프로젝트',
  HOBBY: '취미',
  CULTURE_ART: '문화/예술',
};

export default function Hero() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === ROUTES.HOME;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <AnimatePresence mode="wait">
          {!isSearchMode ? (
            <motion.div
              key="default-header"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex w-full items-center justify-between"
            >
              {/* 왼쪽 영역: 내비게이션 트리거 및 로고 */}
              <div className="flex items-center gap-2 md:gap-4">
                {!isHomePage && <SidebarTrigger />}
                <Logo href={ROUTES.HOME} />
              </div>

              {/* 중앙 영역: 데스크탑 전용 필터 및 검색바 */}
              <div className="hidden items-center gap-4 lg:flex">
                <Suspense fallback={<div className="h-10 w-24 animate-pulse rounded-full bg-slate-50" />}>
                  <GroupOfflineRegionFilter />
                </Suspense>
                <GroupSearchBar />
              </div>

              {/* 오른쪽 영역: 사용자 액션 그룹 (모바일 검색 버튼 포함) */}
              <div className="flex items-center gap-2">
                <Suspense
                  fallback={
                    <div className="h-10 w-32 animate-pulse rounded-2xl bg-slate-50" />
                  }
                >
                  <HeaderActionGroup
                    onSearchClick={() => setIsSearchMode(true)}
                  />
                </Suspense>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-header"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex w-full items-center gap-2 lg:hidden"
            >
              {/* 모바일 검색 모드 UI */}
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="shrink-0">
                  <Suspense fallback={<div className="h-10 w-24 animate-pulse rounded-full bg-slate-50" />}>
                    <GroupOfflineRegionFilter />
                  </Suspense>
                </div>
                <div className="min-w-0 flex-1">
                  <GroupSearchBar autoFocus />
                </div>
              </div>

              {/* 모드 해제 버튼 */}
              <button
                onClick={() => setIsSearchMode(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
