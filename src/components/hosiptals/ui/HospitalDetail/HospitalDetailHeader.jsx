import { useNavigate, useParams } from 'react-router-dom';

import back_icon from '@/assets/images/icons/left_arrow.svg';
import share_icon from '@/assets/images/icons/share_icon.svg';

export function HospitalDetailHeader() {
  const navigate = useNavigate();

  const handleShare = async () => {
    const shareData = {
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('공유 실패:', error);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E0E0E0] bg-white px-5.5 py-3.5">
      <button onClick={() => navigate(-1)}>
        <img src={back_icon} alt="back" />
      </button>
      <h1 className="text-[25px] font-semibold text-[#1E1E1E]">병원 상세</h1>
      <button onClick={handleShare}>
        <img src={share_icon} alt="share" />
      </button>
    </header>
  );
}
