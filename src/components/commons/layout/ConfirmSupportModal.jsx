export default function ConfirmSupportModal({
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
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onCancel}
      />

      {/* modal */}
      <div className="relative w-[420px] rounded-xl bg-white p-5 text-center">
        {/* 타이틀 */}
        {title && (
          <h2 className="mb-[12px] text-[23px] font-semibold text-[#1e1e1e]">
            {title}
          </h2>
        )}

        {/* 컨텐츠 */}
        <p className="mb-[40px] text-[19px] leading-relaxed text-caption ">
          {content}
        </p>

        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-[28px] border border-[#e0e0e0] py-2 text-[23px]  text-tertiary"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-[28px] border border-success py-2 text-[23px] text-primary"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
