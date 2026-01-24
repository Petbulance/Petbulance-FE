import { useParams, useNavigate } from 'react-router-dom';

import circle_check from '@/assets/images/icons/circle_check.svg';
import gray_dot from '@/assets/images/icons/gray_dot.svg';
import reviewImg from '@/assets/images/icons/review_img_ex.svg';
import see_more from '@/assets/images/icons/see_more.svg';
import star_empty from '@/assets/images/icons/star_empty.svg';
import star_fill from '@/assets/images/icons/star_fill.svg';
import thumbsUp from '@/assets/images/icons/thumsUp.svg';
import { CategoryButton } from '@/components/hosiptals/ui/HospitalCard/CategoryButton';

export default function ReviewDetailPage() {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  console.log(reviewId);

  //임시 데이터
  const review = {
    category: '소형포유류',
    user: '햄스터조련사',
    date: '2025.11.10',
    hospitalName: '병원명',
    rating: 4,
    tag: ['상처봉합', '약처방'],
    price: '84,700원',
    content:
      '주말에 갑자기 햄스터가 원인불명으로 아픈 바람에 급하게 펫불런스에서 가까운 곳 찾아갔는데, 주사 한방 맞고 오니 괜찮아졌습니다..! 앞으로도 자주 갈듯합니다',
    image: reviewImg,
    likeCount: 24,
  };

  return (
    <div className="h-full bg-white">
      <div className="flex h-fit flex-col border-b border-[#EEEEEE] bg-white px-6 pt-5 pb-5">
        <div className="mb-3 flex items-center justify-between">
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
        <div className="mb-[26px] flex">
          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-2 text-[20px] font-medium text-[#1E1E1E]">
              {review.hospitalName}
            </div>
            <div className="mb-2 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={i < review.rating ? star_fill : star_empty}
                  alt="별점"
                />
              ))}
            </div>
            <p className="mb-2 text-[16px] font-medium text-[#424242]">
              {review.tag} {'>'} {review.category}
            </p>
            <p className="mb-2 text-[16px] font-medium text-[#424242]">
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

        <div className="h-50 w-50">
          <img src={review.image} alt="review_image" />
        </div>

        {/* 3. 본문 내용 */}
        <p className="mt-4.5 text-[18px] leading-5 text-[#424242]">
          {review.content}
        </p>

        {/* 4. 하단 도움말 버튼 (데이터 반영) */}
        <div className="mt-[26px] flex justify-end">
          <div className="flex items-center gap-2.25 text-[15px] font-medium text-[#9E9E9E]">
            도움이 됐어요
            <button className="flex items-center gap-0.5 active:text-[#27BE69]">
              <img src={thumbsUp} alt="좋아요" />
              <span>{review.likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
