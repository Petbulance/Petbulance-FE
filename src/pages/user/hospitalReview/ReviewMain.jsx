import { useState, useEffect, useRef } from 'react'; // ✅ useRef 추가
import { useOutletContext, useNavigate } from 'react-router-dom';

import { getFilteredReceipts } from '@/apis/reviews/receipts';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import { ReviewAnimalFilterSheet } from '@/components/reviews/ui/ReviewAnimalFilterSheet';
import { ReviewContent } from '@/components/reviews/ui/ReviewContent';
import { ReviewFilterBar } from '@/components/reviews/ui/ReviewFilterBar';
import { ReviewRegionFilterSheet } from '@/components/reviews/ui/ReviewRegionFilterSheet';
import { WriteBtn } from '@/components/reviews/ui/WriteBtn';
import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';
import ReviewSortModal from '@/components/hosiptals/ui/HospitalDetail/review/ReviewSortModal';

export function ReviewMain() {
  const { activeSheet, setActiveSheet, filters, setFilters } =
    useOutletContext();
  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 정렬 모달 상태
  const [isSortOpen, setIsSortOpen] = useState(false);
  // 글쓰기 모달 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // 토글 필터 핸들러
  const handleToggleFilter = (id) => {
    setFilters((prev) => {
      const filterKey =
        id === 'isVerified' ? 'receipt' : id === 'hasImage' ? 'image' : null;
      if (!filterKey) return prev;
      return { ...prev, [filterKey]: !prev[filterKey], cursorId: 0 };
    });
  };

  // 정렬 선택 핸들러
  const handleSortSelect = (sortValue) => {
    setFilters((prev) => ({ ...prev, sort: sortValue, cursorId: 0 }));
    setIsSortOpen(false);
  };

  // 필터 적용 핸들러
  const handleApplyFilter = (newData) => {
    setFilters((prev) => ({ ...prev, ...newData }));
    setActiveSheet(null);
  };

  // 데이터 페칭
  useEffect(() => {
    const fetchReviews = async () => {
      console.log('현재 필터:', filters);
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

  const handleWriteClick = () => {
    setIsWriteModalOpen(true);
  };

  const handleConfirmVerification = () => {
    setIsWriteModalOpen(false);
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    navigate('/index/reviews/write?step=scan', {
      state: { file: file },
    });

    e.target.value = '';
  };

  const handleSkipVerification = () => {
    setIsWriteModalOpen(false);
    navigate('/index/reviews/write?step=form1');
  };

  return (
    <div
      className={`relative h-full w-full bg-white ${
        isWriteModalOpen || isSortOpen ? 'overflow-hidden' : ''
      }`}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        // capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <ReviewFilterBar
        onOpenSheet={setActiveSheet}
        currentFilters={filters}
        onToggleFilter={handleToggleFilter}
        onSortClick={() => setIsSortOpen(true)}
      />

      <ReviewSortModal
        open={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={filters.sort}
        onSelect={handleSortSelect}
      />

      <ReviewContent data={reviews} />

      <WriteBtn onClick={handleWriteClick} />

      {/* 필터 시트 */}
      {activeSheet && (
        <div className="absolute inset-0 z-[2000]">
          <HospitalFilterModalContainer
            onClose={() => setActiveSheet(false)}
            mode={activeSheet}
            onModeChange={setActiveSheet}
          >
            {activeSheet === 'region' ? (
              <ReviewRegionFilterSheet
                filterState={filters}
                onApply={handleApplyFilter}
              />
            ) : (
              <ReviewAnimalFilterSheet
                filterState={filters}
                onApply={handleApplyFilter}
              />
            )}
          </HospitalFilterModalContainer>
        </div>
      )}

      {/* 리뷰 작성 모달 */}
      <ConfirmSelectModal
        open={isWriteModalOpen}
        title={`후기를 작성하기 전에\n영수증 인증을 진행하시겠어요?`}
        content={`카드 및 현금으로 결제한 영수증만\n인증 가능합니다.`}
        confirmText="사진 첨부"
        cancelText="인증 없이 작성"
        onConfirm={handleConfirmVerification}
        onCancel={handleSkipVerification}
        onClose={() => setIsWriteModalOpen(false)}
      />
    </div>
  );
}
