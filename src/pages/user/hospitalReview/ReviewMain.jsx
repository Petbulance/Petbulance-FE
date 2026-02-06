import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom'; // useNavigate 추가

import { getFilteredReceipts } from '@/apis/reviews/receipts';
import { HospitalFilterModalContainer } from '@/components/hosiptals/ui/FilterPopup';
import { ReviewAnimalFilterSheet } from '@/components/reviews/ui/ReviewAnimalFilterSheet';
import { ReviewContent } from '@/components/reviews/ui/ReviewContent';
import { ReviewFilterBar } from '@/components/reviews/ui/ReviewFilterBar';
import { ReviewRegionFilterSheet } from '@/components/reviews/ui/ReviewRegionFilterSheet';
import { WriteBtn } from '@/components/reviews/ui/WriteBtn';
import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal'; // 모달 import

export function ReviewMain() {
  const { activeSheet, setActiveSheet } = useOutletContext();
  const navigate = useNavigate(); // 네비게이션 훅

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

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
      return { ...prev, [filterKey]: !prev[filterKey], cursorId: 0 };
    });
  };

  const handleApplyFilter = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      cursorId: 0,
    }));
    setActiveSheet(null);
  };

  useEffect(() => {
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

  const handleWriteClick = () => {
    setIsWriteModalOpen(true);
  };

  //사진 첨부 선택 시 -> scan 단계로 이동
  const handleConfirmVerification = () => {
    setIsWriteModalOpen(false);
    navigate('/index/reviews/write?step=scan');
  };

  //인증 없이 작성 선택 시 -> 단계로 이동
  const handleSkipVerification = () => {
    setIsWriteModalOpen(false);
    navigate('/index/reviews/write?step=form1');
  };

  return (
    <div
      className={`relative h-full w-full bg-white ${isWriteModalOpen ? 'overflow-hidden' : ''}`}
    >
      {!activeSheet && (
        <>
          <ReviewFilterBar
            onOpenSheet={setActiveSheet}
            currentFilters={filters}
            onToggleFilter={handleToggleFilter}
          />

          <ReviewContent data={reviews} />

          <div className="pointer-events-none sticky bottom-4 flex justify-end px-4">
            <WriteBtn onClick={handleWriteClick} />
          </div>
        </>
      )}

      {/* 필터 시트  */}
      {activeSheet && (
        <div className="absolute inset-0 z-[2000] bg-white">
          <HospitalFilterModalContainer
            onClose={() => setActiveSheet(null)}
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
