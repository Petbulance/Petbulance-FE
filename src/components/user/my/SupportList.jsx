import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SupportList() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* 문의 작성 */}
      <button
        type="button"
        onClick={() => navigate('/index/mypage/support/write')}
        className="
          flex w-full items-center justify-between
          border-b px-4 py-4
          text-left
        "
      >
        <div>
          <p className="text-[16px] font-medium text-[#1e1e1e]">
            문의 작성
          </p>
          <p className="mt-1 text-[14px] text-[#9E9E9E]">
            서비스 이용 관련 문의를 작성해요
          </p>
        </div>

        <ChevronLeft className="h-5 w-5 rotate-180 text-[#BDBDBD]" />
      </button>

      {/* 광고/병원 제휴 문의 */}
      <button
        type="button"
        onClick={() => navigate('/index/mypage/support/partner')}
        className="
          flex w-full items-center justify-between
          px-4 py-4
          text-left
          border-b
        "
      >
        <div>
          <p className="text-[16px] font-medium text-[#1e1e1e]">
            광고/병원 제휴 문의
          </p>
          <p className="mt-1 text-[14px] text-[#9E9E9E]">
            광고 및 제휴 관련 상담을 신청해요
          </p>
        </div>

        <ChevronLeft className="h-5 w-5 rotate-180 text-[#BDBDBD]" />
      </button>
    </div>
  );
}
