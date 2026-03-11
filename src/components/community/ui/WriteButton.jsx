import { useNavigate } from 'react-router-dom';

import plus from '@/assets/images/icons/plus.svg';

export function WriteButton() {
  const navigate = useNavigate();

  return (
    <div className="pointer-events-none absolute right-4 bottom-[calc(80px+env(safe-area-inset-bottom))] z-30">
      <button
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2DA969] shadow-lg"
        onClick={() => navigate('/index/community/write')}
      >
        <img src={plus} alt="게시글 작성" />
      </button>
    </div>
  );
}
