import { useNavigate } from 'react-router-dom';

import MapIcon from '@/assets/images/icons/MapIcon.svg';
import SortModal from '@/components/commons/layout/SortModal';
import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import {
  AnimalTypeContent,
  SearchFilterContent,
} from '@/components/hosiptals/ui/FilterPopup/SearchFilterContent';
import { GreenBtnWrap } from '@/components/hosiptals/ui/GreenBtnWrap';
import { NoHospitalResult } from '@/components/hosiptals/ui/HospitalCard/NoHospitalResult';
import { HospitalCardList } from '@/components/hosiptals/ui/HospitalCardList';
import { useHospitalFilter } from '@/hooks/useHospitalFilter';

export function HospitalsList() {
  const navigate = useNavigate();

  const {
    filterState,
    setFilterState,
    hospitals,
    activeSheet,
    setActiveSheet,
    isSortOpen,
    setIsSortOpen,
    handleSortChange,
    handleToggleOpen,
    handleApplyFilter,
    closeSheet,
  } = useHospitalFilter();

  return (
    <div className="relative h-full min-h-screen w-full bg-[#F5F5F5]">
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

      {hospitals && hospitals.length === 0 ? (
        <div className="h-full min-h-0 bg-gray-100 px-8 pt-14">
          <NoHospitalResult />
        </div>
      ) : (
        <HospitalCardList hospitals={hospitals} />
      )}

      {/* 필터 모달 섹션 (동일) */}

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
                onApply={(animal) => handleApplyFilter({ animal })}
              />
            )}
          </HospitalFilterModalContainer>
        </div>
      )}

      {/* 하단 버튼 */}

      <div className="sticky inset-x-0 bottom-5 z-50 mt-auto flex justify-center">
        <GreenBtnWrap onClick={() => navigate(-1)}>
          <img src={MapIcon} alt="MapIcon" />

          <span>지도보기</span>
        </GreenBtnWrap>
      </div>
    </div>
  );
}
