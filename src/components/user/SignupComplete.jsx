import React, { useState } from 'react';
import partyIcon from '@/assets/images/pageImages/partyImg.svg';
import TermsBottomSheet from '@/components/user/ui/TermsBottomSheet.jsx';
import { useNavigate } from 'react-router-dom';

export default function SignupComplete() {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  return (<div className="flex min-h-screen flex-col bg-white px-6">

    {/* 상단 여백 + 콘텐츠 */}
    <div className="mt-48 flex flex-col items-center text-center">
      <img
        src={partyIcon}
        alt="signup complete"
        className="mb-6 h-[90px] w-[90px] object-contain"
      />

      <h2 className="mb-2 text-lg font-bold text-emerald-600">
        따뜻한햄스터07님, 환영해요!
      </h2>

      <p className="mb-8 text-sm text-gray-500 leading-relaxed">
        펫블런스에서 지금 필요한<br />
        병원 정보를 검색해보세요
      </p>
    </div>

    {/* 버튼 영역은 아래로 밀기 */}
    <div className="mt-40 mx-auto w-full max-w-sm pb-6">
      <button
        className="
    w-full
    rounded-lg
    bg-primary
    py-4
    text-sm
    font-semibold
    text-primary-foreground
    hover:bg-primary-hover
    active:bg-primary-pressed

  "

      onClick={()=> {
        navigate('/index');
      }}>

        시작하기
      </button>
    </div>

    {/* 약관 Bottom Sheet */}
    <TermsBottomSheet
      open={open}
      onClose={() => setOpen(false)}
    />
  </div>);
}
