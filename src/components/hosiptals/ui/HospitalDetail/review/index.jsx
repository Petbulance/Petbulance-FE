import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { fetchHospitalReviews } from '@/apis/reviews/receipts';
import { GreenBtn } from '@/components/commons/button/greenBtn';

import { ReviewCard } from './ReviewCard';
import { ReviewFilterBar } from './reviewFilterBar';
import ReviewSortModal from './ReviewSortModal';

export function ReviewContent() {
  const { id: hospitalId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('createdAt');
  const [isPhotoOnly, setIsPhotoOnly] = useState(false);

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

  const sortLabels = {
    createdAt: '최신순',
    likeCount: '추천순',
    totalRating: '좋아요순',
  };

  return (
    <div className="flex flex-col bg-white">
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

      <div className="flex-1">
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
          <div className="flex flex-col items-center py-20 text-gray-400">
            <p>아직 작성된 리뷰가 없습니다.</p>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white p-4">
        <GreenBtn name="병원 후기 작성하기" />
      </div>
    </div>
  );
}
