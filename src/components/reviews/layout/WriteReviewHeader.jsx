import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import info_icon from '@/assets/images/icons/info_icon_small.svg';
import left_arrow from '@/assets/images/icons/left_arrow.svg';
import ConfirmDangerModal from '@/components/commons/layout/ConfirmDangerModal';

export function WriteReviewHeader({ label }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const handleBackClick = () => {
    if (step === 'form3') {
      navigate('?step=form2', { replace: true });
    } else if (step === 'form2') {
      navigate('?step=form1', { replace: true });
    } else {
      setIsExitModalOpen(true);
    }
  };

  const handleExitConfirm = () => {
    setIsExitModalOpen(false);
    navigate('/index/reviews');
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E0E0E0] bg-white px-5.5 py-3.5">
        <button onClick={handleBackClick} className="p-1">
          <img src={left_arrow} alt="back" />
        </button>

        <h1 className="text-[25px] font-semibold text-[#1E1E1E]">{label}</h1>

        <button className="p-1">
          <img src={info_icon} alt="info" />
        </button>
      </header>

      <ConfirmDangerModal
        open={isExitModalOpen}
        title={`후기 작성을 중단하고 나가시겠어요?`}
        content={`지금 작성한 후기는 저장되지 않아요.`}
        confirmText="나가기"
        cancelText="취소"
        onConfirm={handleExitConfirm}
        onCancel={() => setIsExitModalOpen(false)}
      />
    </>
  );
}
