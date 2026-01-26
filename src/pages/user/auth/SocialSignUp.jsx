import { useEffect, useRef, useState } from 'react';

import googleLogo from '@/assets/images/logo/google-color-svgrepo-com.svg';
import kakaoLogo from '@/assets/images/logo/kakao-svgrepo-com.svg';
import naverLogo from '@/assets/images/logo/NAVER_LOGO.png';
import logo from '@/assets/images/logo/pet_logo.svg';

// ✅ 샘플 데이터 (나중에 API로 대체)
const MOCK_RECENT_LOGIN = {
  provider: 'GOOGLE', // KAKAO | GOOGLE | NAVER
  profileImage: 'https://i.pravatar.cc/100?img=12',
  name: '민규',
};

export default function SocialSignUp() {
  const stateRef = useRef(Math.random().toString(36).substring(2));
  const state = stateRef.current;

  const [recentLogin, setRecentLogin] = useState(null);

  const providerLabel = {
    KAKAO: '카카오',
    GOOGLE: '구글',
    NAVER: '네이버',
  };

  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}` +
    `&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}` +
    `&response_type=code`;

  const GOOGLE_AUTH_URL =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`;

  const NAVER_AUTH_URL =
    `https://nid.naver.com/oauth2.0/authorize` +
    `?response_type=code` +
    `&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(
      import.meta.env.VITE_NAVER_REDIRECT_URI
    )}` +
    `&state=${state}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  // 샘플
  useEffect(() => {
    // mock
    setRecentLogin(MOCK_RECENT_LOGIN);

    // 나중에 이렇게 교체하면 됨
    // api.get('/auth/recent-login').then(res => {
    //   setRecentLogin(res.data);
    // });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      {/* 앱 아이콘 */}
      <div className="mb-6">
        <div className="flex h-[140px] w-[140px] items-center justify-center">
          <img src={logo} alt="Petbulance Logo" className="h-full w-full" />
        </div>
      </div>

      {/* 문구 */}
      <h2 className="mb-2 text-lg font-bold text-gray-950">
        간편 로그인으로 더 다양한
        <br />
        서비스를 이용해보세요!
      </h2>
      <p className="text-tertiary mb-5 text-center text-sm">
        ⚡️ 3초 만에 빠른 회원가입
      </p>

      {/* 버튼 영역 */}
      <div className="mt-10 w-full max-w-sm space-y-3">
        <button
          onClick={handleKakaoLogin}
          className="flex w-full items-center justify-start rounded-lg bg-[#FEE500] py-3 pl-30 text-sm font-semibold text-black"
        >
          <span className="mr-3 flex w-6 justify-center">
            <img src={kakaoLogo} alt="kakao" className="h-4 w-4" />
          </span>
          카카오로 시작하기
        </button>

        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white py-3 pl-30 text-sm font-semibold text-gray-700"
        >
          <span className="mr-3 flex w-6 justify-center">
            <img src={googleLogo} alt="google" className="h-4 w-4" />
          </span>
          구글로 시작하기
        </button>

        <button
          onClick={handleNaverLogin}
          className="flex w-full items-center justify-start rounded-lg bg-[#03C75A] py-3 pl-30 text-sm font-semibold text-white"
        >
          <span className="mr-3 flex w-6 justify-center">
            <img src={naverLogo} alt="naver" className="h-4 w-4" />
          </span>
          네이버로 시작하기
        </button>

        {recentLogin && (
          <div className="flex items-center justify-center gap-2 pt-2 text-sm text-green-600">
            <span>
              최근에 {providerLabel[recentLogin.provider]} 계정으로 로그인
              했어요
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
