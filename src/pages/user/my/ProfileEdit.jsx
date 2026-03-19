import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import cameraIcon from '@/assets/images/icons/cameraIcon.svg';
import dangerCheckImg from '@/assets/images/icons/dangerCheckImg.svg';
import defaultImg from '@/assets/images/icons/defaultImg.svg';
import successCheckImg from '@/assets/images/icons/successCheckImg.svg';
import Spinner from '@/components/commons/Spinner.jsx';
import useUserStore from '@/stores/useUserStore.js';

export default function ProfileEdit() {
  const navigate = useNavigate();

  const { profile } = useUserStore();
  const fileInputRef = useRef(null);

  /* =====================
     방어 처리
  ===================== */
  if (!profile) {
    return <Spinner fullScreen message="프로필 정보를 불러오는 중이에요" />;
  }

  /* =====================
     초기 값
  ===================== */
  const originalNickname = profile.nickname;

  const [nickname, setNickname] = useState(originalNickname);
  const [profileImage, setProfileImage] = useState(
    profile.profileImageUrl ?? null
  );
  const [imageUploading, setImageUploading] = useState(false);

  /* =====================
     유효성 검사
  ===================== */
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

  const isSame = nickname === originalNickname;
  const isTooShort = nickname.length < 2;
  const isTooLong = nickname.length > 12;
  const hasSpecialChar = !nicknameRegex.test(nickname);

  const canSave = !isSame && !isTooShort && !isTooLong && !hasSpecialChar;

  /* =====================
     저장
  ===================== */
  const handleSave = async () => {
    if (!canSave) return;

    try {
      await api.patch('/users/nickname', { nickname });

      useUserStore.setState((state) => ({
        profile: {
          ...state.profile,
          nickname,
          profileImageUrl: profileImage,
        },
      }));
      alert('닉네임 변경이 완료되었습니다.');
      navigate(-1);
    } catch (e) {
      console.error('프로필 저장 실패', e);
    }
  };

  /* =====================
     프로필 이미지 업로드
  ===================== */
  const handlePickImage = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/heic',
      'image/gif',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert('지원하지 않는 이미지 형식입니다.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 크기는 10MB 이하로 업로드 해주세요.');
      return;
    }

    setImageUploading(true);
    try {
      console.log('file', {
        name: file.name,
        type: file.type,
        size: file.size,
      });
      console.log('업로드 이미지 정보', {
        fileName: file.name,
        type: file.type,
      });
      // 1) presign 요청 (단일 파일)
      const presignRes = await api.patch('/users/profile', {
        filename: file.name,
        contentType: file.type,
      });
      console.log(
        'patch /users/profile',
        {
          status: presignRes.status,
          data: presignRes.data,
        },
        '/users/profile'
      );
      const uploaded = presignRes.data?.data;

      if (!uploaded?.preSignedUrl || !uploaded?.imageUrl) {
        throw new Error('Presigned URL 또는 imageUrl을 받아오지 못했습니다.');
      }
      console.log('받아온 이미지 정보', uploaded);
      // 2) S3에 업로드
      const putRes = await fetch(uploaded.preSignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!putRes.ok) {
        throw new Error(
          `S3 업로드 실패 (status ${putRes.status} ${putRes.statusText})`
        );
      }
      console.log('fetch put ', putRes);
      // 3) 업로드 성공 검증/확정
      console.log("'/users/profile/success로 전달", {
        saveId: uploaded.saveId,
        filename: uploaded.filename || file.name,
      });
      const confirmRes = await api.post('/users/profile/success', {
        saveId: uploaded.saveId,
        filename: uploaded.filename || file.name,
      });
      console.log(
        'confirm response',
        {
          status: confirmRes.status,
          data: confirmRes.data,
        },
        '/users/profile/confirm',
        {}
      );

      // 성공 시 UI 반영 (confirm 응답 우선 사용)
      const confirmedImageUrl =
        confirmRes.data?.data?.imageUrl || uploaded.imageUrl;
      if (confirmedImageUrl) setProfileImage(confirmedImageUrl);
      useUserStore.setState((state) => ({
        profile: {
          ...state.profile,
          profileImageUrl: confirmedImageUrl ?? state.profile.profileImageUrl,
        },
      }));
      alert('프로필 이미지가 변경되었습니다.');
    } catch (err) {
      console.error('프로필 이미지 업로드 실패', {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
        stack: err?.stack,
      });
      if (err?.response?.status === 405) {
        alert(
          '이미지 업로드 API가 허용되지 않습니다(405). 서버 설정을 확인해주세요.'
        );
      } else {
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white px-4 py-4">
      {/* ================= 프로필 이미지 ================= */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative mt-5">
          <img
            src={profileImage || defaultImg}
            alt="프로필"
            className="h-24 w-24 rounded-full border-[0.8px] border-[var(--border-secondary,#757575)] object-contain"
          />

          <button
            type="button"
            className="absolute right-0 bottom-0 rounded-full border-[0.8px] border-[var(--border-secondary,#757575)] bg-[#EEEEEE] p-1"
            onClick={handlePickImage}
            disabled={imageUploading}
          >
            <img src={cameraIcon} alt="카메라" />
          </button>
        </div>
        {imageUploading && (
          <p className="mt-2 text-sm text-gray-500">이미지 업로드 중...</p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* ================= 닉네임 ================= */}
      <div className="space-y-1">
        <label className="text-[19px] text-gray-800">닉네임</label>

        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mt-3 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-[20px] text-gray-800"
        />

        {/* 상태 메시지 */}
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

      {/* ================= 저장 ================= */}
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
