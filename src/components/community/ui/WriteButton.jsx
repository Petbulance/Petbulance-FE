import { useNavigate } from 'react-router-dom';

import plus from '@/assets/images/icons/plus.svg';

export function WriteButton() {
  const navigate = useNavigate();

  return (
    <div className="pointer-events-none sticky bottom-4 z-10 flex justify-end px-4">
      <button
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2DA969] shadow-lg"
        onClick={() => navigate('/index/community/write')}
      >
        <img src={plus} alt="게시글 작성" />
      </button>
    </div>
  );
}
