import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // 1. useSearchParams 추가

import ListIcon from '@/assets/images/icons/ListIcon.svg';
import MapIcon from '@/assets/images/icons/MapIcon.svg';
import SortModal from '@/components/commons/layout/SortModal';
import { NaverMap } from '@/components/hosiptals/NaverMap';
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import {
  AnimalTypeContent,
  SearchFilterContent,
} from '@/components/hosiptals/ui/FilterPopup/SearchFilterContent';
import { GreenBtnWrap } from '@/components/hosiptals/ui/GreenBtnWrap';
import { HospitalInfoSlide } from '@/components/hosiptals/ui/HospitalCard';
import { NoHospitalResult } from '@/components/hosiptals/ui/HospitalCard/NoHospitalResult';
import { HospitalCardList } from '@/components/hosiptals/ui/HospitalCardList';
import { useHospitalFilter } from '@/hooks/useHospitalFilter';

export default function HospitalsMap() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    filterState,
    setFilterState,
    hospitals,
    setHospitals,
    activeSheet,
    setActiveSheet,
    isSortOpen,
    setIsSortOpen,
    handleSortChange,
    handleToggleOpen,
    handleApplyFilter,
    closeSheet,
  } = useHospitalFilter();

  const [selectedHospital, setSelectedHospital] = useState(null);

  const isListOpen = searchParams.get('view') === 'list';

  const openList = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('view', 'list');
    setSearchParams(newParams);
  };

  const closeList = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('view');
    setSearchParams(newParams);
  };

  return (
    <div className="relative h-full w-full bg-[#F5F5F5]">
      <div className="relative z-[1600]">
        <ButtonSection
          state={filterState}
          onOpenSheet={setActiveSheet}
          onOpenSort={() => setIsSortOpen(true)}
          onToggleOpen={handleToggleOpen}
        />
      </div>

      <SortModal
        open={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={filterState.sort}
        onSelect={handleSortChange}
      />

      <NaverMap
        hospitals={hospitals}
        setHospitals={setHospitals}
        selectedHospital={selectedHospital}
        setSelectedHospital={setSelectedHospital}
        filterState={filterState}
        setFilterState={setFilterState}
      />

      {!isListOpen && (
        <>
          {!activeSheet && hospitals && hospitals.length === 0 && (
            <div className="absolute right-0 bottom-4 left-0 z-99 px-6">
              <NoHospitalResult />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-50 z-50 flex justify-center">
            <GreenBtnWrap onClick={openList}>
              <img src={ListIcon} alt="list" />
              <span>목록보기</span>
            </GreenBtnWrap>
          </div>

          {!activeSheet && hospitals && hospitals.length > 0 && (
            <HospitalInfoSlide
              hospitals={hospitals}
              selectedHospital={selectedHospital}
            />
          )}
        </>
      )}

      {isListOpen && (
        <div className="absolute inset-0 z-[1500] flex flex-col bg-[#F5F5F5]">
          <div className="flex-1 overflow-y-auto">
            {hospitals && hospitals.length === 0 ? (
              <div className="mt-20 px-8">
                <NoHospitalResult />
              </div>
            ) : (
              <HospitalCardList hospitals={hospitals} />
            )}
          </div>

          <div className="sticky bottom-5 z-50 mt-auto flex justify-center pb-5">
            <GreenBtnWrap onClick={closeList}>
              <img src={MapIcon} alt="MapIcon" />
              <span>지도보기</span>
            </GreenBtnWrap>
          </div>
        </div>
      )}

      {activeSheet && (
        <div className="absolute inset-0 z-[2000] bg-white">
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
