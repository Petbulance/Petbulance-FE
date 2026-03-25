export function ReviewReportReasonModal({
  open,
  reasons,
  selectedReason,
  onSelectReason,
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="후기 신고 상세 닫기"
      />

      <div className="relative mx-6 w-full max-w-[420px] rounded-[16px] bg-white px-6 py-6 shadow-lg">
        <h2 className="text-[23px] leading-6 font-semibold text-[#1E1E1E]">
          후기를 신고한 이유를 알려주세요.
        </h2>

        <div className="mt-[26px] space-y-3">
          {reasons.map((reason) => (
            <label
              key={reason}
              className="flex cursor-pointer items-center gap-1 text-[18px] text-[#1E1E1E]"
            >
              <input
                type="radio"
                name="reviewReportReason"
                checked={selectedReason === reason}
                onChange={() => onSelectReason(reason)}
                className="h-[21px] w-[21px] shrink-0 appearance-none rounded-full border-2 border-[#2DA969] bg-white transition-colors checked:border-[#2DA969] checked:bg-[#2DA969] focus-visible:outline-none"
              />
              <span>{reason}</span>
            </label>
          ))}
        </div>

        <div className="mt-[26px] flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-[12px] border border-[#E0E0E0] py-2 text-[20px] font-semibold text-[#616161]"
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="button"
            className="flex-1 rounded-[12px] border border-[#2DA969] py-2 text-[20px] font-semibold text-[#2DA969]"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
