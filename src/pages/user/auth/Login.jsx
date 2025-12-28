import React from 'react';
import logo from '@/assets/images/logo/pet_logo.svg';
import kakaoLogo from '@/assets/images/logo/kakao-svgrepo-com.svg';
import googleLogo from '@/assets/images/logo/google-color-svgrepo-com.svg';
import appleLogo from '@/assets/images/logo/apple-173-svgrepo-com.svg';

export default function Login() {
  return (<div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">

    {/* 앱 아이콘 */}
    <div className="mb-6">
      <div className="flex h-[140px] w-[140px] items-center justify-center">
        {/* 실제 이미지 쓰면 img로 교체 */}
        <img src={logo} alt="Petbulance Logo" className="w-full h-full" />
      </div>
    </div>

    {/* 문구 */}
    <p className="mb-2 text-sm text-gray-500 text-center">
      검증된 특수동물 병원 정보부터<br />
      집사들의 실사용 후기 플랫폼까지,
    </p>

    <h2 className="mb-8 text-lg font-bold text-gray-900">
      지금 <span className="text-emerald-600">펫블런스</span>에서 시작하세요!
    </h2>

    {/* 버튼 영역 */}
    <div className="w-full max-w-sm space-y-3">

      {/* 카카오 */}
      <button
        className="flex w-full items-center justify-start rounded-lg bg-[#FEE500] py-3 pl-30 text-sm font-semibold text-black">
        <span className="mr-3 flex w-6 justify-center">
          <img src={kakaoLogo} alt="kakao" className="h-4 w-4" />
        </span>
        카카오로 시작하기
      </button>

      {/* 구글 */}
      <button
        className="flex w-full items-center justify-start rounded-lg border border-gray-300 bg-white py-3 pl-30 text-sm font-semibold text-gray-700">
        <span className="mr-3 flex w-6 justify-center">
          <img src={googleLogo} alt="google" className="h-4 w-4" />
        </span>
        구글로 시작하기
      </button>

      {/* 애플 */}
      <button
        className="flex w-full items-center justify-start rounded-lg bg-[#1C1C1E] py-3 pl-30 text-sm font-semibold text-white">
        <span className="mr-3 flex w-6 justify-center">
          <img src={appleLogo} alt="apple" className="h-4 w-4 invert" />
        </span>
        애플로 시작하기
      </button>
      {/* 비회원 */}
      <button
        className="w-full rounded-lg border border-emerald-500 py-3 text-sm font-semibold text-emerald-600"
      >
        로그인 없이 둘러보기
      </button>
    </div>
  </div>);
}
