import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import info_icon from '@/assets/images/icons/info_icon_small.svg';
import close_icon from '@/assets/images/icons/close_page_icon.svg';
import ConfirmDangerModal from '@/components/commons/layout/ConfirmDangerModal';

export function EditReviewHeader({ label }) {
  const navigate = useNavigate();

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const handleExitConfirm = () => {
    setIsExitModalOpen(false);
    navigate(-1);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#E0E0E0] bg-white pr-3.5">
        <button onClick={() => setIsExitModalOpen(true)} className="p-1">
          <img src={close_icon} alt="back" />
        </button>

        <h1 className="text-[25px] font-semibold text-[#1E1E1E]">{label}</h1>

        <button className="p-1">
          <img src={info_icon} alt="info" />
        </button>
      </header>

      <ConfirmDangerModal
        open={isExitModalOpen}
        title={`후기 수정을 중단하고 나가시겠어요?`}
        content={`지금 수정한 후기는 저장되지 않아요.`}
        confirmText="나가기"
        cancelText="취소"
        onConfirm={handleExitConfirm}
        onCancel={() => setIsExitModalOpen(false)}
      />
    </>
  );
}
