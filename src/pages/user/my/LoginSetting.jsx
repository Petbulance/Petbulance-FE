import { useEffect, useRef, useState } from 'react';

import googleIcon from '@/assets/images/logo/googleLogo.svg';
import kakaoIcon from '@/assets/images/logo/kakaoLogo.svg';
import naverIcon from '@/assets/images/logo/naverLogo.svg';
import Spinner from '@/components/commons/Spinner.jsx';
import { Switch } from '@/components/ui/switch';
import useUserStore from '@/stores/useUserStore';

const SNS_INFO = {
  kakao: {
    label: '카카오',
    icon: kakaoIcon,
    emailKey: 'kakaoEmail',
  },
  google: {
    label: '구글',
    icon: googleIcon,
    emailKey: 'googleEmail',
  },
  naver: {
    label: '네이버',
    icon: naverIcon,
    emailKey: 'naverEmail',
  },
};

export default function LoginSetting() {
  const { profile, fetchMyProfile, loading } = useUserStore();
  const [autoLogin, setAutoLogin] = useState(true);
  const stateRef = useRef(Math.random().toString(36).substring(2));
  const state = stateRef.current;

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

  useEffect(() => {
    fetchMyProfile();
  }, [fetchMyProfile]);

  useEffect(() => {
    if (!window.naver) return;
    window.naverLogin = new window.naver.LoginWithNaverId({
      clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
      callbackUrl: import.meta.env.VITE_NAVER_REDIRECT_URI,
      isPopup: false,
      state,
    });
    window.naverLogin.init();
  }, []);

  if (!profile) {
    return <Spinner fullScreen message="로그인 정보를 불러오는 중이에요" />;
  }

  const currentProvider = profile.provider;

  const snsAccounts = Object.entries(SNS_INFO).map(([provider, info]) => ({
    provider,
    label: info.label,
    icon: info.icon,
    email: profile[info.emailKey],
    connected: Boolean(profile[info.emailKey]),
  }));

  const currentAccount = snsAccounts.find(
    (a) => a.provider === currentProvider
  );

  const connectableAccounts = snsAccounts.filter(
    (a) => a.provider !== currentProvider
  );

  const handleConnect = (provider) => {
    const upper = provider.toUpperCase();
    localStorage.setItem('social_connect_mode', upper);

    switch (upper) {
      case 'KAKAO':
        window.location.href = KAKAO_AUTH_URL;
        return;
      case 'GOOGLE':
        window.location.href = GOOGLE_AUTH_URL;
        return;
      case 'NAVER':
        if (window.naverLogin) {
          window.naverLogin.authorize();
        } else {
          window.location.href = NAVER_AUTH_URL;
        }
        return;
      default:
        localStorage.removeItem('social_connect_mode');
    }
  };

  return (
    <div className="h-full bg-white px-[24px]">
      {/* ================= 자동 로그인 ================= */}
      <div className="py-4">
        <div className="flex h-[72px] items-center justify-between border-b">
          <span className="text-[19px] font-medium">자동 로그인</span>
          <Switch
            checked={autoLogin}
            onCheckedChange={setAutoLogin}
            className="data-[state=checked]:bg-success"
          />
        </div>
        <p className="mt-2 text-[14px] text-gray-400">
          자동 로그인을 해제하면 모든 기기에서 로그아웃 처리됩니다.
        </p>
      </div>

      {/* ================= 현재 로그인 계정 ================= */}
      <div className="py-4">
        <p className="h-[36px] border-b text-[18px] font-semibold">
          현재 로그인된 계정
        </p>

        {currentAccount && (
          <div className="flex items-center justify-between py-4">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src={currentAccount.icon}
                  alt={currentAccount.label}
                  className="h-6 w-5"
                />
                <span className="text-[20px] font-medium">
                  {currentAccount.label}
                </span>
              </div>
              <p className="mt-1 text-[18px] text-gray-400">
                {currentAccount.email}
              </p>
            </div>

            <button className="rounded-md border px-3 py-1 text-[15px] text-gray-700">
              로그아웃
            </button>
          </div>
        )}

        <div className="border-b" />

        <p className="mt-3 h-[48px] text-[14px] text-gray-400">
          최소 1개의 SNS 계정은 연결되어야 합니다.
        </p>
      </div>

      {/* ================= SNS 계정 연결 ================= */}
      <div className="py-4">
        <p className="mb-3 h-[36px] border-b text-[18px] font-semibold">
          SNS 계정 연결
        </p>

        {connectableAccounts.map((account) => (
          <div
            key={account.provider}
            className="flex h-[82px] items-center justify-between border-b py-[16px]"
          >
            <div>
              <div className="flex items-center gap-2">
                <img
                  src={account.icon}
                  alt={account.label}
                  className="h-6 w-5"
                />
                <span className="text-[20px] font-medium">{account.label}</span>
              </div>
              {account.connected && (
                <p className="mt-1 text-[18px] text-gray-400">
                  {account.email}
                </p>
              )}
            </div>

            <button
              className="rounded-md border px-3 py-1 text-[15px] text-gray-700"
              onClick={() => {
                if (!account.connected) handleConnect(account.provider);
              }}
            >
              {account.connected ? '연결해제' : '연결'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
