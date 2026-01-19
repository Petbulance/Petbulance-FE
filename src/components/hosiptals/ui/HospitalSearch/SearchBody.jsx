import { SearchSection } from './SearchSection';

export function SearchBody({
  recentKeywords = [],
  recentHospitals = [],
  onRemoveKeyword,
  onRemoveHospital,
}) {
  return (
    <main className="mt-25 flex-1 bg-white px-6">
      <SearchSection
        title="최근 검색어"
        emptyText="검색 시 자동으로 검색어가 저장돼요"
        items={recentKeywords}
        onRemove={onRemoveKeyword}
      />

      <div className="mt-10" />

      <SearchSection
        title="최근 본 병원"
        emptyText="최근에 찾아본 병원이 없어요"
        items={recentHospitals}
        onRemove={onRemoveHospital}
      />
    </main>
  );
}
