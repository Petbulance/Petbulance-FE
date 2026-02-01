import reviewsCheck from '@/assets/images/icons/ReviewsCheck.svg';
import thumbsUpDouble from '@/assets/images/icons/Thumbs-up-double--filled.svg';

export default function ReviewItem({ review }) {
  return (
    <div className="border-b px-[24px] py-4">
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-[20px] items-center justify-center rounded-[16px] border px-[8px] text-[12px] ${
              review.status === '검수중'
                ? 'border-gray-300 text-gray-500'
                : 'border-[#1C334B] text-[#1C334B]'
            }`}
          >
            {review.status}
          </span>

          <span className="text-[19px] font-medium">{review.hospitalName}</span>
        </div>

        {review.hasReceipt && (
          <span className="inline-flex items-center gap-1 rounded border border-[#1C334B] px-2 py-1 text-[12px] text-[#1C334B]">
            영수증 인증 완료
            <img src={reviewsCheck} className="h-3 w-3" />
          </span>
        )}
      </div>

      {/* 날짜 / 좋아요 */}
      <p className="mb-4 flex items-center gap-1 text-[14px] text-gray-400">
        <span>{review.date}</span>
        <span>·</span>
        <img src={thumbsUpDouble} className="h-3 w-3" />
        <span>{review.likeCount}</span>
      </p>

      {/* 본문 */}
      <div className="flex gap-3">
        {review.hasImage && (
          <div className="h-[72px] w-[72px] rounded bg-gray-200" />
        )}

        <p className="line-clamp-3 text-[14px] text-[#1e1e1e]">
          {review.content}
        </p>
      </div>
    </div>
  );
}
