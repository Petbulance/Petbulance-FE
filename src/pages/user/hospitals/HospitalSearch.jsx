import { useCallback, useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

import { fetchHospitalsByName } from '@/apis/hospitals';
import { registerRecentKeyword } from '@/apis/hospitals/searchHistory';
import SortModal from '@/components/commons/layout/SortModal';
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import {
  AnimalTypeContent,
  SearchFilterContent,
} from '@/components/hosiptals/ui/FilterPopup/SearchFilterContent';
import { HospitalCardList } from '@/components/hosiptals/ui/HospitalCardList';
import { NoSearchResult } from '@/components/hosiptals/ui/HospitalSearch/noSearchResult';
import { SearchBody } from '@/components/hosiptals/ui/HospitalSearch/SearchBody';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';
import { pushDataLayer } from '@/lib/gtm';

export function HospitalSearch() {
  const {
    filterState,
    setFilterState,
    activeSheet,
    setActiveSheet,
    searchKeyword,
  } = useOutletContext();

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const prevKeywordRef = useRef('');

  const petTypeLabel = filterState.animal?.[0]
    ? ANIMAL_CATEGORY_KO[filterState.animal[0]] || filterState.animal[0]
    : '';
  const regionLabel =
    Array.isArray(filterState.region) && filterState.region.length > 0
      ? filterState.region.join(', ')
      : filterState.city || '';
  const hasFilter =
    Boolean(filterState.isOpen) ||
    Boolean(filterState.city) ||
    (Array.isArray(filterState.region) && filterState.region.length > 0) ||
    (Array.isArray(filterState.animal) && filterState.animal.length > 0);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('위치 정보를 가져오는데 실패했습니다.', error);
      }
    );
  }, []);

  const handleSearchAPI = useCallback(async () => {
    if (!searchKeyword) return;

    setIsLoading(true);

    pushDataLayer('search_hospital_start', {
      search_method: '목록',
      pet_type: petTypeLabel,
      region: regionLabel,
      filter_operating: Boolean(filterState.isOpen),
    });

    if (searchKeyword !== prevKeywordRef.current) {
      prevKeywordRef.current = searchKeyword;
    }

    try {
      const data = await fetchHospitalsByName(searchKeyword, {
        ...filterState,
        userLat: userLocation.lat,
        userLng: userLocation.lng,
      });

      setSearchResults(data.list || []);
      pushDataLayer('view_search_results', {
        result_count: Array.isArray(data.list) ? data.list.length : 0,
        search_method: '목록',
        has_filter: hasFilter,
      });
      await registerRecentKeyword(searchKeyword);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    searchKeyword,
    JSON.stringify(filterState),
    userLocation.lat,
    userLocation.lng,
    petTypeLabel,
    regionLabel,
    hasFilter,
  ]);

  useEffect(() => {
    handleSearchAPI();
  }, [handleSearchAPI]);

  const handleToggleOpen = () =>
    setFilterState((prev) => ({ ...prev, isOpen: !prev.isOpen }));

  const handleApplyFilter = (newData) => {
    if (newData?.animal) {
      const selected = Array.isArray(newData.animal) ? newData.animal[0] : '';
      pushDataLayer('apply_search_filter', {
        filter_type: '동물종',
        filter_value: selected ? ANIMAL_CATEGORY_KO[selected] || selected : '',
        from_screen: '병원검색',
      });
    }

    if (Object.prototype.hasOwnProperty.call(newData, 'city')) {
      const nextRegion = Array.isArray(newData.region)
        ? newData.region.join(', ')
        : '';
      pushDataLayer('apply_search_filter', {
        filter_type: '지역',
        filter_value: nextRegion || newData.city || '',
        from_screen: '병원검색',
      });
    }

    setFilterState((prev) => ({ ...prev, ...newData }));
    setActiveSheet(null);
  };

  const handleSortChange = (value) => {
    setFilterState((prev) => ({ ...prev, sort: value }));
    setIsSortOpen(false);
  };

  const closeSheet = () => setActiveSheet(null);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <ButtonSection
        state={filterState}
        onOpenSheet={setActiveSheet}
        onOpenSort={() => setIsSortOpen(true)}
        onToggleOpen={handleToggleOpen}
      />

      <main className="no-scrollbar flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center font-medium text-gray-500">
            병원을 찾고 있어요...
          </div>
        ) : searchKeyword ? (
          searchResults.length > 0 ? (
            <div className="min-h-full bg-white py-4">
              <HospitalCardList
                hospitals={searchResults}
                userLat={userLocation.lat}
                userLng={userLocation.lng}
                fromScreen="search_result"
              />
            </div>
          ) : (
            <div className="mt-35 px-8">
              <NoSearchResult keyword={searchKeyword} />
            </div>
          )
        ) : (
          <SearchBody />
        )}
      </main>

      <SortModal
        open={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={filterState.sort}
        onSelect={handleSortChange}
      />

      {activeSheet && (
        <div className="absolute inset-0 z-[2000]">
          <HospitalFilterModalContainer
            onClose={closeSheet}
            mode={activeSheet}
            onModeChange={setActiveSheet}
          >
            {activeSheet === 'region' ? (
              <SearchFilterContent
                filterState={filterState}
                onApply={(city, region) => handleApplyFilter({ city, region })}
              />
            ) : (
              <AnimalTypeContent
                filterState={filterState}
                setFilterState={setFilterState}
                onApply={(animalArray) =>
                  handleApplyFilter({ animal: animalArray })
                }
              />
            )}
          </HospitalFilterModalContainer>
        </div>
      )}
    </div>
  );
}
