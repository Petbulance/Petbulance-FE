import { useNavigate, useSearchParams } from 'react-router-dom';

import pencil_icon from '@/assets/images/icons/pencil_icon.svg';

export function WriteBtn() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const openSheet = (type) => {
    const next = new URLSearchParams(params);
    next.set('step', type);
    navigate(`/index/reviews/write?${next.toString()}`, { replace: true });
  };

  return (
    <button
      onClick={() => openSheet('confirm')}
      className="pointer-events-auto rounded-full bg-[#2DA969] p-[11.43px] shadow-[0_0_9.14px_0_rgba(0,0,0,0.15),0_0_2.29px_0_rgba(0,0,0,0.24)]"
    >
      <img src={pencil_icon} alt="write_review" />
    </button>
  );
}
