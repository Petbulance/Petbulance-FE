import { useNavigate } from 'react-router-dom';

import bannerImg from '@/assets/images/OpenEvent.png';

export function ServiceBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative max-h-[calc(100dvh-2rem)] w-[min(28rem,calc((100dvh-2rem)*0.586))] overflow-hidden rounded-[10px] bg-emerald-100 shadow-lg">
      <img src={bannerImg} alt="배너" className="h-auto w-full rounded-lg" />

      {/* 버튼 영역 */}
      <button
        onClick={() => navigate('/index/mypage/notice/90')} // 이동할 경로
        className="absolute bottom-13 left-1/2 -translate-x-1/2 rounded-full bg-[#2DA969] px-6 py-2 text-[20px] font-semibold text-white hover:bg-emerald-700"
      >
        이벤트 상세보기 →
      </button>
    </div>
  );
}
