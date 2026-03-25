import { useNavigate } from 'react-router-dom';

import left_arrow from '@/assets/images/icons/left_arrow.svg';
import see_more from '@/assets/images/icons/see_more.svg';

export function HospitalReviewDetailHeader({ setIsDeleteModalOpen }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E0E0E0] bg-white px-5.5 py-3.5">
      <button onClick={() => navigate('/index/reviews')}>
        <img src={left_arrow} alt="back" />
      </button>
      <button
        className="p-1 active:opacity-50"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <img src={see_more} alt="더보기" />
      </button>
    </header>
  );
}
