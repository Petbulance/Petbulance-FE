import { useNavigate } from 'react-router-dom';

import info_icon from '@/assets/images/icons/info_icon_small.svg';
import left_arrow from '@/assets/images/icons/left_arrow.svg';

export function WriteReviewHeader({ label }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E0E0E0] bg-white px-5.5 py-3.5">
      <button onClick={() => navigate(-1)}>
        <img src={left_arrow} alt="back" />
      </button>
      <h1 className="text-[25px] font-semibold text-[#1E1E1E]">{label}</h1>
      <button>
        <img src={info_icon} alt="info" />
      </button>
    </header>
  );
}
