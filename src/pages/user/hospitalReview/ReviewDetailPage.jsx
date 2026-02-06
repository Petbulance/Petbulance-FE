import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchReceiptDetail } from '@/apis/reviews/receipts';
import { cancelReviewLike, toggleReviewLike } from '@/apis/reviews/reviewLike';

import green_thumbsUp from '@/assets/images/icons/thumsUp_green.svg';
import circle_check from '@/assets/images/icons/circle_check.svg';
import gray_dot from '@/assets/images/icons/gray_dot.svg';
import star_empty from '@/assets/images/icons/star_empty.svg';
import star_fill from '@/assets/images/icons/star_fill.svg';
import thumbsUp from '@/assets/images/icons/thumsUp.svg';

import { CategoryButton } from '@/components/hosiptals/ui/HospitalCard/CategoryButton';
import { ANIMAL_CATEGORY_KO, ANIMAL_NAME_KO } from '@/data/animalSort';
import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';
import useUserStore from '@/stores/useUserStore';
import { deleteReviewApi } from '@/apis/reviews/deleteReview';

export default function ReviewDetailPage() {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const { profile, fetchMyProfile } = useUserStore();

  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { isDeleteModalOpen, setIsDeleteModalOpen } = useOutletContext();

  useEffect(() => {
    fetchMyProfile();
  }, [fetchMyProfile]);

  useEffect(() => {
    const loadData = async () => {
      if (!reviewId) return;
      setIsLoading(true);
      try {
        const data = await fetchReceiptDetail(reviewId);
        setReview(data);
        setIsLiked(data.liked);
        setLikeCount(data.likeCount);
      } catch (error) {
        console.error('리뷰 상세 불러오기 실패:', error);
        alert('존재하지 않거나 삭제된 리뷰입니다.');
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [reviewId, navigate]);

  // 삭제 확인 처리
  const handleDeleteConfirm = async () => {
    try {
      await deleteReviewApi(reviewId);

      alert('리뷰가 삭제되었습니다.');
      setIsDeleteModalOpen(false);
      navigate('/index/reviews', { replace: true });
    } catch (error) {
      alert('리뷰 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    if (!review) return;

    try {
      if (isLiked) {
        await cancelReviewLike(review.id);
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await toggleReviewLike(review.id);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('처리 중 오류가 발생했습니다.');
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        로딩 중...
      </div>
    );
  if (!review)
    return (
      <div className="p-10 text-center text-gray-500">
        리뷰 정보를 찾을 수 없습니다.
      </div>
    );

  const {
    facilityRating = 0,
    expertiseRating = 0,
    kindnessRating = 0,
  } = review;
  const averageScore = (facilityRating + expertiseRating + kindnessRating) / 3;
  const categoryKo = ANIMAL_CATEGORY_KO[review.animalType] || review.animalType;
  const detailAnimalKo =
    ANIMAL_NAME_KO[review.detailAnimalType] || review.detailAnimalType;

  const isMyReview =
    review && profile && review.userNickname === profile.nickname;

  return (
    <div className="relative h-full bg-white">
      <div className="flex h-fit flex-col border-b border-[#EEEEEE] bg-white px-6 pt-5 pb-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CategoryButton kind={categoryKo} />
            <div className="flex items-center gap-1 text-[15px] font-medium text-[#9E9E9E]">
              <img src={gray_dot} alt="" />
              <span>{review.userNickname}</span>
              <img src={gray_dot} alt="" />
              <span>{review.createDate?.split('T')[0]}</span>
            </div>
          </div>
        </div>

        {/* 병원 정보 및 별점 */}
        <div className="mb-[26px] flex">
          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-2 text-[20px] font-medium text-[#1E1E1E]">
              {review.hospitalName}
            </div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.round(averageScore) ? star_fill : star_empty}
                    alt="별점"
                  />
                ))}
              </div>
            </div>
            <p className="mb-2 text-[16px] font-medium text-[#424242]">
              {categoryKo} {'>'} {detailAnimalKo}
            </p>
            <p className="text-[16px] font-medium text-[#424242]">
              <span className="text-[#616161]">결제금액</span>{' '}
              {review.totalPrice?.toLocaleString()}원
            </p>
          </div>
          {review.receiptCheck && (
            <div className="shrink-0 self-end">
              <span className="flex items-center gap-0.5 rounded-[4px] border border-[#1C334B] px-2 py-1 text-[14px] font-medium text-[#1C334B]">
                영수증인증 완료 <img src={circle_check} alt="check" />
              </span>
            </div>
          )}
        </div>

        {/* 이미지 리스트 */}
        {review.images && review.images.length > 0 && (
          <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-2">
            {review.images.map((imgUrl, index) => (
              <div
                key={index}
                className="h-50 w-50 shrink-0 overflow-hidden rounded-md border border-[#F5F5F5]"
              >
                <img
                  src={imgUrl}
                  alt={`review_${index}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <p className="mt-4.5 text-[18px] leading-7 whitespace-pre-wrap text-[#424242]">
          {review.reviewContent}
        </p>

        <div className="mt-[26px] flex justify-end">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2.25 text-[15px] font-medium transition-colors ${
              isLiked ? 'text-[#27BE69]' : 'text-[#9E9E9E]'
            }`}
          >
            도움이 됐어요
            <div className="flex items-center gap-0.5">
              <img src={isLiked ? green_thumbsUp : thumbsUp} alt="좋아요" />
              <span>{likeCount}</span>
            </div>
          </button>
        </div>
      </div>

      {isMyReview && (
        <ConfirmSelectModal
          open={isDeleteModalOpen}
          title={`후기를 수정하거나 삭제하시겠어요?`}
          content={''}
          confirmText="수정하기"
          cancelText="삭제하기"
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            navigate('edit');
          }}
          onCancel={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
