import React, { useEffect } from 'react';
import logo from '@/assets/images/logo/pet_logo.svg';
import kakaoLogo from '@/assets/images/logo/kakao-svgrepo-com.svg';
import googleLogo from '@/assets/images/logo/google-color-svgrepo-com.svg';
import naverLogo from '@/assets/images/logo/NAVER_LOGO.png';
import api from '@/apis/api.jsx';

export default function SocialSignUp() {
  const state = Math.random().toString(36).substring(2);
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code
&scope=openid%20email%20profile
&access_type=offline
&prompt=consent`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code
&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}
&redirect_uri=${encodeURIComponent(import.meta.env.VITE_NAVER_REDIRECT_URI)}
&state=${state}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };
  const handleNaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  useEffect(() => {
    const test = async () => {
      try {
        const res = await api.get('/terms');
        console.log('ssssssss', res);
      } catch (e) {
        console.error(e);
      }
    };
    test();
  }, []);
  return (<div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">

    {/* 앱 아이콘 */}
    <div className="mb-6">
      <div className="flex h-[140px] w-[140px] items-center justify-center">
        {/* 실제 이미지 쓰면 img로 교체 */}
        <img src={logo} alt="Petbulance Logo" className="w-full h-full" />
      </div>
    </div>

    {/* 문구 */}
    <h2 className="mb-2 text-lg font-bold text-gray-950">
      간편 로그인으로 더 다양한<br />
      서비스를 이용해보세요!
    </h2>
    <p className="mb-5 text-sm text-tertiary text-center">
      ⚡️ 3초 만에 빠른 회원가입
    </p>

    {/* 버튼 영역 */}
    <div className="w-full max-w-sm space-y-3 mt-10">

      {/* 카카오 */}
      <button
        onClick={handleKakaoLogin}
        className="flex w-full items-center justify-start rounded-lg bg-[#FEE500] py-3 pl-30 text-sm font-semibold text-black"
      >
  <span className="mr-3 flex w-6 justify-center">
    <img src={kakaoLogo} alt="kakao" className="h-4 w-4" />
  </span>
        카카오로 시작하기
      </button>

      {/* 구글 */}
      <button
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white py-3 pl-30 text-sm font-semibold text-gray-700"
      >
  <span className="mr-3 flex w-6 justify-center">
    <img src={googleLogo} alt="google" className="h-4 w-4" />
  </span>
        구글로 시작하기
      </button>

      {/* 네이버 */}
      <button
        onClick={handleNaverLogin}
        className="flex w-full items-center justify-start rounded-lg bg-[#03C75A] py-3 pl-30 text-sm font-semibold text-white"
      >
  <span className="mr-3 flex w-6 justify-center">
    <img src={naverLogo} alt="naver" className="h-4 w-4" />
  </span>
        네이버로 시작하기
      </button>


    </div>
  </div>);
}
