export default function ConfirmSuccessModal({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* dim */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* modal */}
      <div className="relative w-[420px] rounded-xl bg-white p-5 text-center">
        {/* 타이틀 */}
        {title && (
          <h2 className="text-caption mb-2 text-[19px] font-semibold">
            {title}
          </h2>
        )}

        {/* 컨텐츠 */}
        <p className="mb-4 text-[23px] leading-relaxed text-[#1e1e1e]">
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
