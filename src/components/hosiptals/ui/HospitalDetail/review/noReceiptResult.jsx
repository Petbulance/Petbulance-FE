import icon from '@/assets/images/noReviews/noReview_6.png';

export function NoReceiptResult() {
  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <img src={icon} alt="icon" className="h-40 w-40" />
      <div className="flex flex-col items-center gap-3">
        <p className="text-[27px] font-medium text-[#424242]">
          해당 조건의 병원 후기가 없어요.
        </p>
        <p className="text-[20px] font-medium text-[#616161]">
          필터를 조정해서 다시 검색해주세요.
        </p>
      </div>
    </div>
  );
}
