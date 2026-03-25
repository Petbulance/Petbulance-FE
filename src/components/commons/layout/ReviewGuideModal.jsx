import React from 'react';

export function ReviewGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-10 duration-200">
      <div className="animate-in zoom-in-95 w-full max-w-[540px] rounded-[24px] bg-white px-8 py-10 shadow-xl duration-300">
        <h2 className="text-[27px] leading-tight font-semibold text-[#1E1E1E]">
          리뷰 작성 안내
        </h2>

        <p className="mt-4 text-[20px] text-[#616161]">
          펫불런스는 진솔한 리뷰만을 모으기 위해 다음과 같은 검수 절차를 거치고
          있습니다.
        </p>

        <div className="mt-8 space-y-8">
          <div className="flex gap-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C334B] text-[25.83px] font-semibold text-white">
              1
            </div>
            <div>
              <p className="text-[20px] leading-tight font-semibold text-[#1E1E1E]">
                시스템 모니터링 및 검수팀 검수작업
              </p>
              <p className="text-[20px] font-semibold text-[#2DA969]">
                (펫뷸런스 리뷰 정책)
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C334B] text-[25.83px] font-semibold text-white">
              2
            </div>
            <p className="flex items-center text-[20px] font-semibold text-[#1E1E1E]">
              리뷰 등록 완료
            </p>
          </div>
        </div>

        <p className="mt-8 text-[18px] text-[#616161]">
          저희는 펫뷸런스 회원들에게 특정 병원을 방문하게 할 목적으로 진료
          후기를 작성하게 하거나 유도하지 않음을 안내드립니다. 펫뷸런스의 리뷰는
          펫뷸런스 회원분들이 스스로 만들어 나가는 의료정보 공유 문화입니다.
        </p>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-[16px] border border-[#E0E0E0] py-4 text-[20px] font-medium text-[#616161] transition-colors active:bg-gray-50"
        >
          확인
        </button>
      </div>
    </div>
  );
}
