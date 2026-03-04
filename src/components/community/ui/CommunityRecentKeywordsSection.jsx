import { RecentSearchList } from '@/components/reviews/ui/review/RecentSearchList';

export function CommunityRecentKeywordsSection({
  recentKeywords,
  onDeleteAll,
  onDelete,
}) {
  return (
    <div className="flex-1 overflow-y-auto pr-3.5 pl-4">
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[23px] font-semibold text-[#1E1E1E]">
            최근 검색어
          </h2>
          {recentKeywords.length > 0 && (
            <button
              onClick={onDeleteAll}
              className="text-[15px] font-medium text-[#424242]"
            >
              전체 삭제
            </button>
          )}
        </div>
        {recentKeywords.length === 0 ? (
          <div className="text-gray-400">
            검색 시 자동으로 검색어가 저장돼요
          </div>
        ) : (
          <RecentSearchList keywords={recentKeywords} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}
