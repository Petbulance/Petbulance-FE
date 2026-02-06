export default function ConfirmSelectModal({
  open,
  title,
  content,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* dim */}
      <div
        className="absolute inset-0 touch-none bg-black/50"
        onClick={onClose || onCancel}
      />
      {/* modal */}
      <div className="relative w-[420px] rounded-xl bg-white p-5 text-center whitespace-pre-line">
        {/* 타이틀 */}
        {title && (
          <h2 className="mb-3 text-[23px] font-medium whitespace-pre-line text-[#1E1E1E]">
            {title}
          </h2>
        )}

        {/* 컨텐츠 */}
        <p className="mb-8 text-[19px] leading-relaxed text-[#9E9E9E]">
          {content}
        </p>

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="border-success flex-1 rounded-[28px] border py-2 text-[23px] text-[#2da969]"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="bg-success flex-1 rounded-[28px] py-2 text-[23px] text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
