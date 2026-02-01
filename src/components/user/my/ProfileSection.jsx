import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmSuccessModal from '@/components/commons/layout/ConfirmSuccessModal.jsx';
import useUserStore from '@/stores/useUserStore.js';

export default function ProfileSection({ isLoggedIn }) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const profile = useUserStore((state) => state.profile);
  console.log('profile', profile);
  // 비로그인
  if (!isLoggedIn) {
    return (
      <>
        <section className="mb-[30px] rounded-xl bg-white p-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-sm font-semibold">로그인 해주세요</h1>
              <p className="text-caption text-xs">회원가입까지 단 3초!</p>
            </div>

            <button
              className="text-sm font-medium text-[#424242]"
              onClick={() => setOpenModal(true)}
            >
              로그인 하기
            </button>
          </div>
        </section>

        <ConfirmSuccessModal
          open={openModal}
          title="알림"
          content={
            <>
              로그인이 필요한 서비스예요.
              <br />
              로그인하시겠어요?
            </>
          }
          cancelText="그냥 볼래요"
          confirmText="로그인"
          onCancel={() => setOpenModal(false)}
          onConfirm={() => navigate('/index/auth/login')}
        />
      </>
    );
  }

  // 로그인
  return (
    <section className="mb-[30px] rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        {/* 좌측 프로필 */}
        <div className="flex items-center gap-3">
          {/*<img*/}
          {/*  src={profile.profileImageUrl}*/}
          {/*  alt="프로필"*/}
          {/*  className="h-10 w-10 rounded-full object-cover"*/}
          {/*/>*/}
          <div>
            {/*<p className="text-sm font-semibold">{profile.nickname}</p>*/}
            {/*<p className="text-xs text-gray-400">{profile.email}</p>*/}
          </div>
        </div>

        {/* 우측 버튼 */}
        <button
          onClick={() => navigate('/index/mypage/profile/edit')}
          className="border-success text-success rounded-md border px-3 py-1 text-xs font-medium"
        >
          프로필 수정
        </button>
      </div>
    </section>
  );
}
