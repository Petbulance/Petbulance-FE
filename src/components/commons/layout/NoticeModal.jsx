export default function NoticeModal({
  open,
  title,
  content,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* dim */}
      <div className="absolute inset-0 touch-none bg-black/50" />
      {/* modal */}
      <div className="relative w-[420px] rounded-xl bg-white p-5 text-center whitespace-pre-line">
        {/* 타이틀 */}
        {title && (
          <h2 className="mb-3 text-[19px] whitespace-pre-line text-[#616161]">
            {title}
          </h2>
        )}

        {/* 컨텐츠 */}
        <p className="mb-8 text-[23px] leading-relaxed font-medium text-[#1E1E1E]">
          {content}
        </p>

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-[28px] border border-[#067DFD] py-2 text-[23px] text-[#067DFD]"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-[28px] bg-[#067DFD] py-2 text-[23px] text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
