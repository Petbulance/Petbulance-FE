import { useState } from 'react';

import googleIcon from '@/assets/images/logo/googleLogo.svg';
import kakaoIcon from '@/assets/images/logo/kakaoLogo.svg';
import naverIcon from '@/assets/images/logo/naverLogo.svg';
import { Switch } from '@/components/ui/switch';

const SNS_ICON = {
  kakao: kakaoIcon,
  google: googleIcon,
  naver: naverIcon,
};

export default function LoginSetting() {
  const [autoLogin, setAutoLogin] = useState(true);

  const currentProvider = 'google';

  const [snsAccounts] = useState([
    {
      provider: 'kakao',
      label: '카카오',
      email: 'user@kakao.com',
      connected: true,
    },
    {
      provider: 'google',
      label: '구글',
      email: 'user@google.com',
      connected: false,
    },
    {
      provider: 'naver',
      label: '네이버',
      email: 'user@naver.com',
      connected: true,
    },
  ]);

  const currentAccount = snsAccounts.find(
    (a) => a.provider === currentProvider
  );

  const connectableAccounts = snsAccounts.filter(
    (a) => a.provider !== currentProvider
  );

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

      {/* ================= 현재 로그인된 계정 ================= */}
      <div className="py-4">
        <p className="h-[36px] border-b text-[18px] font-semibold">
          현재 로그인된 계정
        </p>

        {currentAccount && (
          <div className="flex items-center justify-between py-4">
            {/* 왼쪽: 아이콘 + 소셜 / 아이디 */}
            <div>
              <div className="flex items-center gap-2">
                <img
                  src={SNS_ICON[currentAccount.provider]}
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

        {/* 하단 구분선 */}
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
            className="flex h-[82px] items-center justify-between border-b px-0 py-[16px]"
          >
            {/* 왼쪽 */}
            <div>
              <div className="flex items-center gap-2">
                <img
                  src={SNS_ICON[account.provider]}
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

            {account.connected ? (
              <button className="rounded-md border px-3 py-1 text-[15px] text-gray-700">
                연결해제
              </button>
            ) : (
              <button className="rounded-md border px-3 py-1 text-[15px] text-gray-700">
                연결
              </button>
            )}
          </div>
        ))}

        {/*      <p className="mt-3 text-[12px] text-gray-400">
          계정 추가를 위해 본인 명의의 휴대폰 인증이 필요합니다.
        </p>*/}
      </div>
    </div>
  );
}
