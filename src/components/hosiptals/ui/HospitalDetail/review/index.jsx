import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchHospitalReviews } from '@/apis/reviews/receipts';
import { GreenBtn } from '@/components/commons/button/greenBtn';
import { sortLabels } from '@/data/reviewSort';
import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal'; // ✅ 모달 import

import { ReviewCard } from './ReviewCard';
import { ReviewFilterBar } from './reviewFilterBar';
import ReviewSortModal from './ReviewSortModal';
import { NoReviewResult } from './noReviewResult';

export function ReviewContent({ hospitalName }) {
  const { id: hospitalId } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('createdAt');
  const [isPhotoOnly, setIsPhotoOnly] = useState(false);

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const loadReviews = useCallback(async () => {
    if (!hospitalId) return;

    setIsLoading(true);
    try {
      const numericId = parseInt(hospitalId, 10);

      const params = {
        images: isPhotoOnly,
        sortBy: selectedSort,
      };

      const data = await fetchHospitalReviews(numericId, params);
      setReviews(data.list || []);
    } catch (error) {
      console.error('리뷰 로드 실패:', error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, [hospitalId, isPhotoOnly, selectedSort]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

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
      state: {
        file: file,
        hospitalId: hospitalId,
        hospitalName: hospitalName,
      },
    });

    e.target.value = '';
  };

  const handleSkipVerification = () => {
    setIsWriteModalOpen(false);
    navigate('/index/reviews/write?step=form1', {
      state: {
        hospitalId: hospitalId,
        hospitalName: hospitalName,
      },
    });
  };

  return (
    <div className="flex h-dvh flex-col bg-white">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <ReviewFilterBar
        isPhotoOnly={isPhotoOnly}
        setIsPhotoOnly={setIsPhotoOnly}
        currentSortLabel={sortLabels[selectedSort]}
        onOpenSort={() => setIsSortOpen(true)}
      />

      <ReviewSortModal
        open={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={selectedSort}
        onSelect={(value) => {
          setSelectedSort(value);
        }}
      />

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-20 text-gray-400">
            리뷰를 불러오는 중입니다...
          </div>
        ) : reviews.length > 0 ? (
          <div className="flex flex-col">
            {reviews.map((review) => (
              <ReviewCard key={review.reviewId || review.id} review={review} />
            ))}
          </div>
        ) : (
          <NoReviewResult />
        )}
      </div>

      <div className="sticky bottom-0 bg-white p-4">
        <GreenBtn name="병원 후기 작성하기" onClick={handleWriteClick} />
      </div>

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
