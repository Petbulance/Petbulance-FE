import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import cameraIcon from '@/assets/images/icons/cameraIcon.svg';
import dangerCheckImg from '@/assets/images/icons/dangerCheckImg.svg';
import defaultImg from '@/assets/images/icons/defaultImg.svg';
import successCheckImg from '@/assets/images/icons/successCheckImg.svg';

export default function ProfileEdit() {
  const navigate = useNavigate();

  // 기존 사용자 정보 (더미 → API 교체)
  const originalNickname = '따뜻한햄스터07';

  const [nickname, setNickname] = useState(originalNickname);
  const [profileImage, setProfileImage] = useState(null);

  /* ================= 유효성 검사 ================= */

  // 한글 / 영문 / 숫자만 허용
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

  const isSame = nickname === originalNickname;
  const isTooShort = nickname.length < 2;
  const isTooLong = nickname.length > 12;
  const hasSpecialChar = !nicknameRegex.test(nickname);

  // 저장 가능 여부
  const canSave = !isSame && !isTooShort && !isTooLong && !hasSpecialChar;

  /* ================= 저장 ================= */

  const handleSave = () => {
    if (!canSave) return;

    console.log('저장', {
      nickname,
      profileImage,
    });

    navigate(-1);
  };

  return (
    <div className="flex h-full flex-col bg-white px-4 py-4">
      {/* ================= 프로필 이미지 ================= */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative mt-5">
          <img
            src={profileImage || defaultImg}
            alt="프로필"
            className="h-24 w-24 rounded-full border-[0.8px] border-[var(--border-secondary,#757575)] object-cover"
          />

          <button
            type="button"
            className="absolute right-0 bottom-0 rounded-full border-[0.8px] border-[var(--border-secondary,#757575)] bg-[#EEEEEE] p-1"
            onClick={() => {
              // 이미지 업로드 연결 예정
              console.log('이미지 변경');
            }}
          >
            <img src={cameraIcon} alt="카메라" />
          </button>
        </div>
      </div>

      {/* ================= 닉네임 입력 ================= */}
      <div className="space-y-1">
        <label className="text-[19px] text-gray-800">닉네임</label>

        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mt-3 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-[20px] text-gray-800"
        />

        {/* ================= 상태 메시지 ================= */}
        {isSame ? (
          <p className="text-[16px] text-gray-800">현재 닉네임이에요</p>
        ) : nickname.length === 0 ? (
          <p className="text-[16px] text-gray-800">
            2~12자, 한글/영문/숫자 사용 가능해요
          </p>
        ) : isTooShort ? (
          <p className="flex items-center gap-1 text-[16px] text-red-500">
            <img src={dangerCheckImg} alt="경고" className="h-3 w-3" />
            2자 이상 입력해주세요
          </p>
        ) : isTooLong ? (
          <p className="flex items-center gap-1 text-[16px] text-red-500">
            <img src={dangerCheckImg} alt="경고" className="h-3 w-3" />
            12자 이하로 입력해주세요
          </p>
        ) : hasSpecialChar ? (
          <p className="flex items-center gap-1 text-[16px] text-red-500">
            <img src={dangerCheckImg} alt="경고" className="h-3 w-3" />
            특수문자는 사용할 수 없어요
          </p>
        ) : (
          <p className="text-success flex items-center gap-1 text-[16px]">
            <img src={successCheckImg} alt="성공" className="h-3 w-3" />
            사용 가능한 닉네임이에요!
          </p>
        )}
      </div>

      {/* ================= 저장 버튼 ================= */}
      <div className="mt-20">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full rounded-xl py-3 text-[27px] font-semibold transition ${
            canSave
              ? 'border-success text-success border'
              : 'cursor-not-allowed border border-gray-300 text-gray-300'
          }`}
        >
          저장
        </button>
      </div>
    </div>
  );
}
