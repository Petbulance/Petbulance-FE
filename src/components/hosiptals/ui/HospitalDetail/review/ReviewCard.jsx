import { useNavigate } from 'react-router-dom';

import circle_check from '@/assets/images/icons/circle_check.svg';
import gray_dot from '@/assets/images/icons/gray_dot.svg';
import see_more from '@/assets/images/icons/see_more.svg';
import star_empty from '@/assets/images/icons/star_empty.svg';
import star_fill from '@/assets/images/icons/star_fill.svg';
import thumbsUp from '@/assets/images/icons/thumsUp.svg';
import { CategoryButton } from '@/components/hosiptals/ui/HospitalCard/CategoryButton';

export function ReviewCard({ review }) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`${review.id}`);
  };

  return (
    <div
      key={review.id}
      onClick={handleDetailClick}
      className="border-b border-[#EEEEEE] p-6"
    >
      {/* 1. 상단 정보 (태그, 유저, 날짜, 더보기) */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <CategoryButton kind={review.tag} />
          <div className="flex items-center gap-1 text-[15px] font-medium text-[#9E9E9E]">
            <img src={gray_dot} alt="" />
            <span>{review.user}</span>
            <img src={gray_dot} alt="" />
            <span>{review.date}</span>
          </div>
        </div>
        <button>
          <img src={see_more} alt="더보기" />
        </button>
      </div>

      {/* 2. 별점 및 요약 정보 (이미지 유무 대응) */}
      <div className="flex gap-[11.57px]">
        {review.image && (
          <div className="relative h-[92.86px] w-[92.86px] shrink-0 overflow-hidden rounded-[8.33px] bg-[#F5F5F5]">
            <img
              src={review.image}
              alt="리뷰 이미지"
              className="h-full w-full object-cover"
            />
            {review.imageCount > 1 && (
              <div className="absolute top-0 left-0 rounded-br-[8.33px] bg-[#222222]/50 px-[6.92px] py-[1.92px] text-[11.46px] font-medium text-white">
                {review.imageCount}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-1 flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <img
                key={i}
                src={i < review.rating ? star_fill : star_empty}
                alt="별점"
              />
            ))}
          </div>
          <p className="text-[16px] font-medium text-[#424242]">
            {review.tag} {'>'} {review.category}
          </p>
          <p className="text-[16px] font-medium text-[#424242]">
            {review.treatment}
          </p>
          <p className="text-[16px] font-medium text-[#424242]">
            <span className="text-[#616161]">결제금액</span> {review.price}
          </p>
        </div>

        <div className="shrink-0 self-end">
          <span className="flex items-center gap-0.5 rounded-[4px] border border-[#1C334B] px-2 py-1 text-[14px] font-medium text-[#1C334B]">
            영수증인증 완료 <img src={circle_check} alt="check" />
          </span>
        </div>
      </div>

      {/* 3. 본문 내용 */}
      <p className="mt-4.5 line-clamp-1 overflow-hidden text-[18px] leading-5 text-[#424242]">
        {review.content}
      </p>

      {/* 4. 하단 도움말 버튼 (데이터 반영) */}
      <div className="mt-4 flex justify-end">
        <div className="flex items-center gap-2.25 text-[15px] font-medium text-[#9E9E9E]">
          도움이 됐어요
          <button className="flex items-center gap-0.5 active:text-[#27BE69]">
            <img src={thumbsUp} alt="좋아요" />
            <span>{review.likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
