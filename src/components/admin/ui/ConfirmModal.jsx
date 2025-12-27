import { useEffect } from 'react';

export function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  /* ESC 키로 닫기 */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onCancel}   // 🔥 외부 클릭 시 닫기
    >
      <div
        className="w-[400px] rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 🔥 내부 클릭 차단
      >
        <h3 className="mb-2 text-sm font-bold text-gray-800">{title}</h3>
        <p className="mb-6 text-sm text-gray-500">{message}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
