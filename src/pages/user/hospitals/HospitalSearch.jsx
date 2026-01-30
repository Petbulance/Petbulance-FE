import { useCallback, useEffect, useState } from 'react';

import { fetchHospitalsByName } from '@/apis/hospitals';
import { registerRecentKeyword } from '@/apis/hospitals/searchHistory';
import SortModal from '@/components/commons/layout/SortModal'; // 정렬 모달 추가
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import {
  AnimalTypeContent,
  SearchFilterContent,
} from '@/components/hosiptals/ui/FilterPopup/SearchFilterContent';
import { HospitalCardList } from '@/components/hosiptals/ui/HospitalCardList';
import { SearchBody } from '@/components/hosiptals/ui/HospitalSearch/SearchBody';
import { useHospitalFilter } from '@/hooks/useHospitalFilter';

export function HospitalSearch() {
  const { searchKeyword } = useHospitalFilter();

  const [localFilter, setLocalFilter] = useState({
    city: '',
    region: '',
    animal: '',
    sort: 'distance',
    isOpen: false,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeSheet, setActiveSheet] = useState(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSearchAPI = useCallback(async () => {
    if (!searchKeyword) return;

    setIsLoading(true);
    try {
      //병원 검색 결과 조회
      const data = await fetchHospitalsByName(searchKeyword, localFilter);
      setSearchResults(data.list || []);

      // 최근 검색어 등록 API 호출
      await registerRecentKeyword(searchKeyword);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchKeyword, localFilter]);

  useEffect(() => {
    handleSearchAPI();
  }, [handleSearchAPI]);

  const handleToggleOpen = () =>
    setLocalFilter((prev) => ({ ...prev, isOpen: !prev.isOpen }));

  const handleApplyFilter = (newData) => {
    setLocalFilter((prev) => ({ ...prev, ...newData }));
    setActiveSheet(null);
  };

  const handleSortChange = (value) => {
    setLocalFilter((prev) => ({ ...prev, sort: value }));
    setIsSortOpen(false);
  };

  const closeSheet = () => setActiveSheet(null);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <ButtonSection
        state={localFilter}
        onOpenSheet={setActiveSheet}
        onOpenSort={() => setIsSortOpen(true)}
        onToggleOpen={handleToggleOpen}
      />

      <main className="no-scrollbar flex-1 overflow-y-auto">
        {isLoading ? (
          //TODO: 로딩 화면 구현
          <div className="flex h-full items-center justify-center">
            로딩 중...
          </div>
        ) : searchKeyword ? (
          <div className="min-h-full bg-[#F5F5F5] py-4">
            <HospitalCardList hospitals={searchResults} />
          </div>
        ) : (
          <SearchBody />
        )}
      </main>

      <SortModal
        open={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={localFilter.sort}
        onSelect={handleSortChange}
      />

      {activeSheet && (
        <div className="absolute inset-0 z-[2000] bg-white">
          <HospitalFilterModalContainer onClose={closeSheet} mode={activeSheet}>
            {activeSheet === 'region' ? (
              <SearchFilterContent
                filterState={localFilter}
                onApply={(city, region) => handleApplyFilter({ city, region })}
              />
            ) : (
              <AnimalTypeContent
                filterState={localFilter}
                onApply={(animal) => handleApplyFilter({ animal })}
              />
            )}
          </HospitalFilterModalContainer>
        </div>
      )}
    </div>
  );
}
