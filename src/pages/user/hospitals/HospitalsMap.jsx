import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ListIcon from '@/assets/images/icons/ListIcon.svg';
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
import { NoHospitalResult } from '@/components/hosiptals/ui/HospitalCard/NoHospitalResult'; // 🚩 컴포넌트 추가
import { useHospitalFilter } from '@/hooks/useHospitalFilter';

export default function HospitalsMap() {
  const navigate = useNavigate();

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

  return (
    <div className="relative h-full w-full">
      <ButtonSection
        state={filterState}
        onOpenSheet={setActiveSheet}
        onOpenSort={() => setIsSortOpen(true)}
        onToggleOpen={handleToggleOpen}
      />

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

      {!activeSheet && hospitals && hospitals.length === 0 && (
        <div className="absolute right-0 bottom-4 left-0 z-99 px-6">
          <NoHospitalResult />
        </div>
      )}

      {activeSheet && (
        <div className="absolute inset-0 z-[2000] bg-white">
          <HospitalFilterModalContainer onClose={closeSheet} mode={activeSheet}>
            {activeSheet === 'region' ? (
              <SearchFilterContent
                filterState={filterState}
                setFilterState={setFilterState}
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

      <div className="absolute inset-x-0 bottom-48 z-50 flex justify-center">
        <GreenBtnWrap onClick={() => navigate('list')}>
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
    </div>
  );
}
