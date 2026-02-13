import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import partyIcon from '@/assets/images/pageImages/partyImg.svg';
import TermsBottomSheet from '@/components/user/ui/TermsBottomSheet.jsx';
import useUserStore from '@/stores/useUserStore';
import { isDebugModeEnabled } from '@/utils/gtm';

export default function SignupComplete() {
  const [open, setOpen] = useState(false);
  const [hasRequiredAgree, setHasRequiredAgree] = useState(false);

  const navigate = useNavigate();

  const { profile, fetchMyProfile } = useUserStore();

  const runPostLoginInit = () => {
    fetchMyProfile(); // ⭐ 여기서 전역 저장
    getMyTerms();
  };

  const pushSignupCompleteEvent = () => {
    let signUpMethod = 'kakao';

    try {
      const recent = JSON.parse(localStorage.getItem('recent_login') || '{}');
      if (recent?.provider) {
        signUpMethod = String(recent.provider).toLowerCase();
      }
    } catch {
      signUpMethod = 'kakao';
    }

    const debugMode = isDebugModeEnabled();
    window.dataLayer = window.dataLayer || [];
    const gaPayload = {
      event: 'sign_up_complete',
      sign_up_method: signUpMethod,
      ...(debugMode ? { debug_mode: true } : {}),
    };
    console.log('[GA] sign_up_complete payload', gaPayload);
    window.dataLayer.push(gaPayload);
  };

  /* ===============================
     내 약관 상태 조회
     - marketing 제외
     - service / privacy / location
     - 하나라도 AGREE면 통과
  =============================== */
  const getMyTerms = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return; // 최종 토큰 없으면 대기

    try {
      const response = await api.get('/terms/status');
      const terms = response.data.data;

      const hasAgree =
        terms.service === 'AGREE' ||
        terms.privacy === 'AGREE' ||
        terms.location === 'AGREE';

      setHasRequiredAgree(hasAgree);
      console.log('agre', hasAgree);
      if (!hasAgree) {
        setOpen(true);
      }
    } catch (e) {
      console.error('약관 조회 실패', e);
    }
  };

  /* ===============================
     로그아웃
  =============================== */
  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (e) {
      console.warn('서버 로그아웃 실패', e);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('temp_access_token');
      localStorage.removeItem('recent_login');

      navigate('/index/auth/login', { replace: true });
    }
  };

  /* ===============================
     최초 진입 시
     - 최종 토큰이 없으면 약관 동의 모달 바로 열기
     - 최종 토큰이 있으면 프로필/약관 조회
  =============================== */
  useEffect(() => {
    pushSignupCompleteEvent();

    const hasFinalToken = !!localStorage.getItem('access_token');
    if (hasFinalToken) {
      runPostLoginInit();
    } else {
      setOpen(true);
    }
  }, [fetchMyProfile]);

  return (
    <div className="flex min-h-screen flex-col bg-white px-6">
      {/* ================= 상단 ================= */}
      <div className="mt-48 flex flex-col items-center text-center">
        <img
          src={partyIcon}
          alt="signup complete"
          className="mb-6 h-[90px] w-[90px] object-contain"
        />

        <h2 className="mb-2 flex items-center gap-1 text-lg font-bold">
          <span className="text-success">{profile?.nickname ?? ''}</span>
          <span className="text-gray-800">환영해요!</span>
        </h2>

        <h2 className="mb-8 text-sm leading-relaxed text-gray-500">
          <span className="text-success">펫뷸런스</span>
          <span className="text-gray-800">
            에서 지금 필요한
            <br />
            병원 정보를 검색해보세요
          </span>
        </h2>
      </div>

      {/* ================= 버튼 영역 ================= */}

      {/* ✅ 필수 약관 중 하나라도 AGREE */}
      {hasRequiredAgree && (
        <div className="mx-auto mt-40 w-full max-w-sm pb-6">
          <button
            className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed w-full rounded-lg py-4 text-sm font-semibold"
            onClick={() => navigate('/index/home')}
          >
            시작하기
          </button>
        </div>
      )}

      {/* ❌ 필수 약관 전부 미동의 */}
      {!hasRequiredAgree && (
        <div className="mx-auto mt-40 w-full max-w-sm space-y-3 pb-6">
          <button
            className="w-full rounded-lg bg-[#2DA969] py-4 text-sm font-semibold text-white"
            onClick={() => setOpen(true)}
          >
            시작하기
          </button>

          <button
            className="text-caption w-full rounded-lg py-4 text-sm"
            onClick={handleLogout}
          >
            다른 소셜로그인 선택
          </button>
        </div>
      )}

      {/* ================= 약관 Bottom Sheet ================= */}
      <TermsBottomSheet
        open={open}
        onClose={() => setOpen(false)}
        onConsented={() => {
          setHasRequiredAgree(true);
          runPostLoginInit();
        }}
      />
    </div>
  );
}
