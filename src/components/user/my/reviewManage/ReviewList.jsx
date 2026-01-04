import ReviewItem from '@/components/user/my/reviewManage/ReviewItem.jsx';

export default function ReviewList({ reviews }) {
  return (
    <div>
      <div className="flex h-[48px] items-center justify-between border-b px-[24px]">
        {/* 왼쪽: 체크박스 + 텍스트 */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] accent-[#9E9E9E]"
          />
          <p className="text-[18px] font-medium text-[#1e1e1e]">
            전체선택
          </p>
        </label>

        {/* 오른쪽: 삭제 버튼 */}
        <button
          className="
        inline-flex items-center justify-center gap-[2px]
        w-[52px] h-[28px]
        rounded-[8px]
        border border-[0.5px] border-tertiary
        px-[8px] py-[4px]
        text-[12px] text-tertiary
      "
        >
          삭제
        </button>
      </div>

      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}