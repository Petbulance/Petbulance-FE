import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';

export default function NaverCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
      callbackUrl: import.meta.env.VITE_NAVER_REDIRECT_URI,
      isPopup: false,
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async (status) => {
      console.log('SDK status:', status);
      console.log('URL:', window.location.href);

      if (!status) {
        console.error('네이버 SDK status=false');
        navigate('/index/auth/login');
        return;
      }
      console.log('nL', naverLogin);
      const naverAccessToken = naverLogin.accessToken?.accessToken;
      if (!naverAccessToken) {
        console.error('네이버 access_token 없음');
        navigate('/index/auth/login');
        return;
      }

      try {
        const res = await api.post('/auth/social/login', {
          provider: 'NAVER',
          authCode: naverAccessToken,
        });

        console.log('res', res);
        const { accessToken, isNewUser } = res.data;

        localStorage.setItem('access_token', res.data.data.accessToken);
        localStorage.removeItem('com.naver.nid.access_token');
        localStorage.removeItem('com.naver.nid.oauth.state_token');
        if (res.data.data.refreshToken) {
          localStorage.setItem('refresh_token', res.data.data.refreshToken);
        }

        navigate(isNewUser ? '/index/auth/signupcomplete' : '/');
      } catch (e) {
        console.error('서버 로그인 실패', e);
        navigate('/index/auth/login');
      }
    });
  }, [navigate]);

  return <div>네이버 로그인 처리 중...</div>;
}
