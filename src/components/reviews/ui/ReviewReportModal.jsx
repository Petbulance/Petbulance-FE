import report_icon from '@/assets/images/icons/report_icon.svg';

export function ReviewReportModal({ onClose, onReportClick }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center px-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="신고 메뉴 닫기"
      />
      <div className="relative w-full overflow-hidden rounded-[16px] bg-white px-6 py-8">
        <p className="text-[25px] font-semibold text-[#1E1E1E]">신고하기</p>
        <button
          type="button"
          className="mt-8 flex w-full items-center gap-2 text-[20px] text-[#616161]"
          onClick={onReportClick}
        >
          <img src={report_icon} alt="report_icon" />
          후기 신고
        </button>
      </div>
    </div>
  );
}
