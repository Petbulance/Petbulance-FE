import reviewsCheck from '@/assets/images/icons/ReviewsCheck.svg';
import thumbsUpDouble from '@/assets/images/icons/Thumbs-up-double--filled.svg';

export default function ReviewItem({ review }) {
  const isReviewing = review.status === '검수중';

  return (
    <div className="border-b px-[24px] py-4">
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* 상태 뱃지 */}
          <span
            className={`inline-flex h-[20px] items-center justify-center rounded-[16px] border border-[0.5px] px-[8px] py-[2px] text-[12px] ${
              review.status === '검수중'
                ? 'text-caption border-caption w-[54px] bg-white'
                : 'w-[66px] border-[#1C334B] bg-white text-[#1C334B]'
            } `}
          >
            {review.status}
          </span>

          <span className="text-[19px] font-medium">{review.hospitalName}</span>
        </div>

        {review.hasReceipt && (
          <button className="inline-flex h-[24px] w-[122px] items-center justify-center gap-[2px] rounded-[4px] border border-[0.5px] border-[#1C334B] px-[8px] py-[4px] text-[12px] text-[#1C334B]">
            영수증 인증 완료
            <img src={reviewsCheck} className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* 날짜 / 좋아요 */}
      <p className="text-caption mb-4 flex items-center gap-1 text-[14px]">
        <span>{review.date}</span>
        <span>·</span>
        <img src={thumbsUpDouble} alt="like" className="h-3 w-3" />
        <span>{review.likeCount}</span>
      </p>

      {/* 본문 */}
      <div className="flex gap-3">
        {review.hasImage && (
          <div className="h-[72px] w-[72px] flex-shrink-0 rounded bg-gray-200" />
        )}

        <p className="line-clamp-3 text-[14px] text-[#1e1e1e]">
          {review.content}
        </p>
      </div>
    </div>
  );
}
