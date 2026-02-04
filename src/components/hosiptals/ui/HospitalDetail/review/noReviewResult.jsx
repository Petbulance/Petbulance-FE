import icon from '@/assets/images/icons/noReviewResult_icon.png';

export function NoReviewResult() {
  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <img src={icon} alt="icon" className="h-40 w-40" />
      <div className="flex flex-col items-center gap-3">
        <p className="text-[27px] font-medium text-[#424242]">
          아직 등록된 후기가 없어요.
        </p>
        <p className="text-[20px] font-medium text-[#616161]">
          우리 아이의 진료 경험을 공유해 주세요!
        </p>
      </div>
    </div>
  );
}
