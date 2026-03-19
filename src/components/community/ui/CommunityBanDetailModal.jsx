import { X } from 'lucide-react';

export default function CommunityBanDetailModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative w-[calc(100%-32px)] max-w-[420px] rounded-[16px] bg-white px-6 py-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#616161]"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="text-[20px] leading-snug font-semibold text-[#1E1E1E]">
          [커뮤니티 이용 규칙]
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] font-medium">
          <li>
            경고 3회 누적 시, 신고일로부터 7일간 커뮤니티 기능 이용 정지됩니다.
          </li>
          <li>정지 3회 누적 시, 누적일로부터 커뮤니티 기능 영구 정지됩니다.</li>
        </ul>
      </div>
    </div>
  );
}
