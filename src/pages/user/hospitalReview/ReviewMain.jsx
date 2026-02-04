import { useState, useEffect } from 'react';

import { getFilteredReceipts } from '@/apis/reviews/receipts';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import { ReviewAnimalFilterSheet } from '@/components/reviews/ui/ReviewAnimalFilterSheet';
import { ReviewContent } from '@/components/reviews/ui/ReviewContent';
import { ReviewFilterBar } from '@/components/reviews/ui/ReviewFilterBar';
import { ReviewRegionFilterSheet } from '@/components/reviews/ui/ReviewRegionFilterSheet';
import { WriteBtn } from '@/components/reviews/ui/WriteBtn';
import { useOutletContext } from 'react-router-dom';

export function ReviewMain() {
  const [activeSheet, setActiveSheet] = useOutletContext();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('createdAt');
  const [isPhotoOnly, setIsPhotoOnly] = useState(false);

  const [filters, setFilters] = useState({
    city: '',
    region: '',
    animal: [],
    image: false,
    receipt: false,
    cursorId: 0,
  });

  const handleToggleFilter = (id) => {
    setFilters((prev) => {
      const filterKey =
        id === 'isVerified' ? 'receipt' : id === 'hasImage' ? 'image' : null;

      if (!filterKey) return prev;

      return {
        ...prev,
        [filterKey]: !prev[filterKey],
        cursorId: 0,
      };
    });
  };

  const handleApplyFilter = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      cursorId: 0,
    }));
    closeSheet();
  };

  useEffect(() => {
    console.log('필터', filters.city, filters.region, filters.animal);

    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getFilteredReceipts(filters);
        setReviews(data || []);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [filters]);

  const closeSheet = () => {
    setActiveSheet(null);
  };

  return (
    <div className="relative h-full w-full bg-white">
      {!activeSheet && (
        <>
          <ReviewFilterBar
            onOpenSheet={setActiveSheet}
            currentFilters={filters}
            onToggleFilter={handleToggleFilter}
          />

          {/* <ReviewSortModal
      open={isSortOpen}
      onClose={() => setIsSortOpen(false)}
      selectedSort={selectedSort}
      onSelect={(value) => {
        setSelectedSort(value);
      }}
    /> */}

          <ReviewContent data={reviews} />

          <div className="pointer-events-none sticky bottom-4 flex justify-end px-4">
            <WriteBtn />
          </div>
        </>
      )}

      {activeSheet && (
        <div className="absolute inset-0 z-[2000] bg-white">
          <HospitalFilterModalContainer
            onClose={closeSheet}
            mode={activeSheet}
            onModeChange={setActiveSheet}
          >
            {activeSheet === 'region' ? (
              <ReviewRegionFilterSheet
                filterState={filters}
                setFilterState={setFilters}
                onApply={(city, region) => handleApplyFilter({ city, region })}
              />
            ) : (
              <ReviewAnimalFilterSheet
                filterState={filters}
                setFilterState={setFilters}
                onApply={(tags) => handleApplyFilter({ animalType: tags })}
              />
            )}
          </HospitalFilterModalContainer>
        </div>
      )}
    </div>
  );
}
