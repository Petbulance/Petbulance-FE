import checkIcon from '@/assets/images/icons/navy_circle_check.svg';

export function ReceiptVerifiedModal({ open }) {
  if (!open) return null;

  return (
    <div className="relative inset-0 z-[9999] flex h-dvh items-center justify-center bg-black/50 transition-opacity">
      <div className="animate-fadeIn flex w-full max-w-[335px] items-start gap-[15px] rounded-[12px] bg-white px-8 py-8 md:max-w-[540px]">
        <div className="flex shrink-0 items-center justify-center bg-white">
          <img src={checkIcon} />
        </div>

        <div className="flex flex-col">
          <h3 className="text-[25px] leading-tight font-semibold text-[#1E1E1E]">
            영수증 인증 완료
          </h3>
          <p className="mt-2 text-[20px] font-medium text-[#9E9E9E]">
            이제 후기를 작성할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
