import { useCallback, useEffect, useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

import { fetchHospitalsByName } from '@/apis/hospitals';
import { registerRecentKeyword } from '@/apis/hospitals/searchHistory';
import SortModal from '@/components/commons/layout/SortModal';
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';

import { HospitalCardList } from '@/components/hosiptals/ui/HospitalCardList';
import { SearchBody } from '@/components/hosiptals/ui/HospitalSearch/SearchBody';
import { NoSearchResult } from '@/components/hosiptals/ui/HospitalSearch/noSearchResult';
import {
  AnimalTypeContent,
  SearchFilterContent,
} from '@/components/hosiptals/ui/FilterPopup/SearchFilterContent';
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

    let currentSearchType = 'filter';

    if (searchKeyword !== prevKeywordRef.current) {
      currentSearchType = 'keyword';
      prevKeywordRef.current = searchKeyword;
    }

    pushDataLayer('search_hospital_start', {
      search_type: currentSearchType,
      from_screen: 'search_result',
    });

    try {
      const data = await fetchHospitalsByName(searchKeyword, {
        ...filterState,
        userLat: userLocation.lat,
        userLng: userLocation.lng,
      });

      setSearchResults(data.list || []);
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
  ]);

  useEffect(() => {
    handleSearchAPI();
  }, [handleSearchAPI]);

  const handleToggleOpen = () =>
    setFilterState((prev) => ({ ...prev, isOpen: !prev.isOpen }));

  const handleApplyFilter = (newData) => {
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
              <NoSearchResult />
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
