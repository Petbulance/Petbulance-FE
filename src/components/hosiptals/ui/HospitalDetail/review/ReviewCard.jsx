import { useState } from 'react'; // 상태 관리를 위해 추가
import { useNavigate } from 'react-router-dom';

import { cancelReviewLike, toggleReviewLike } from '@/apis/reviews/reviewLike';
import circle_check from '@/assets/images/icons/circle_check.svg';
import gray_dot from '@/assets/images/icons/gray_dot.svg';
import see_more from '@/assets/images/icons/see_more.svg';
import star_empty from '@/assets/images/icons/star_empty.svg';
import star_fill from '@/assets/images/icons/star_fill.svg';
import thumbsUp from '@/assets/images/icons/thumsUp.svg';
import green_thumbsUp from '@/assets/images/icons/thumsUp_green.svg';
import { CategoryButton } from '@/components/hosiptals/ui/HospitalCard/CategoryButton';

export function ReviewCard({ review }) {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(review.liked);
  const [likeCount, setLikeCount] = useState(review.likeCount);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleDetailClick = () => {
    navigate(`${review.id}`);
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation();

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

  return (
    <div
      onClick={handleDetailClick}
      className="cursor-pointer border-b border-[#EEEEEE] p-6 transition-colors hover:bg-gray-50"
    >
      {/* 1. 상단 정보 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <CategoryButton kind={review.animalType} />
          <div className="flex items-center gap-1 text-[15px] font-medium text-[#9E9E9E]">
            <img src={gray_dot} alt="" />
            <span>{review.userNickname}</span>
            <img src={gray_dot} alt="" />
            <span>{formatDate(review.createDate)}</span>
          </div>
        </div>
        <button onClick={(e) => e.stopPropagation()}>
          <img src={see_more} alt="더보기" />
        </button>
      </div>

      {/* 2. 별점 및 요약 정보 */}
      <div className="flex gap-[11.57px]">
        {review.images && review.images.length > 0 && (
          <div className="relative h-[92.86px] w-[92.86px] shrink-0 overflow-hidden rounded-[8.33px] bg-[#F5F5F5]">
            <img
              src={
                Array.isArray(review.images) ? review.images[0] : review.images
              }
              alt="리뷰 이미지"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-1 flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={i < review.totalRating ? star_fill : star_empty}
                alt="별점"
              />
            ))}
          </div>
          <p className="text-[16px] font-medium text-[#424242]">
            <span className="text-[#616161]">결제금액</span>{' '}
            {review.totalPrice.toLocaleString()}원
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

      {/* 3. 본문 내용 */}
      <p className="mt-4.5 line-clamp-1 overflow-hidden text-[18px] leading-5 text-[#424242]">
        {review.reviewContent}
      </p>

      {/* 4. 하단 도움말 버튼 */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-2.25 text-[15px] font-medium transition-colors ${
            isLiked ? 'text-[#27BE69]' : 'text-[#9E9E9E]'
          }`}
        >
          도움이 됐어요
          <div className="flex items-center gap-0.5">
            {isLiked ? (
              <img src={green_thumbsUp} alt="좋아요" />
            ) : (
              <img src={thumbsUp} alt="좋아요" />
            )}
            <div>{likeCount}</div>
          </div>
        </button>
      </div>
    </div>
  );
}
