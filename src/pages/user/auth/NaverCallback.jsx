import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';
import { pushDataLayer } from '@/lib/gtm';
import { withDebugQuery } from '@/utils/gtm';

export default function NaverCallback() {
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const isConnectMode =
      localStorage.getItem('social_connect_mode') === 'NAVER';

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
        localStorage.removeItem('social_connect_mode');
        navigate(withDebugQuery('/index/auth/login'));
        return;
      }
      console.log('nL', naverLogin);
      const naverAccessToken = naverLogin.accessToken?.accessToken;
      if (!naverAccessToken) {
        console.error('네이버 access_token 없음');
        localStorage.removeItem('social_connect_mode');
        navigate(withDebugQuery('/index/auth/login'));
        return;
      }

      try {
        if (isConnectMode) {
          try {
            await api.post('/users/social/connect', {
              provider: 'NAVER',
              authCode: naverAccessToken,
            });
            alert('성공');
          } catch (err) {
            console.error('네이버 계정 연결 실패', err);
            alert('실패');
          } finally {
            localStorage.removeItem('social_connect_mode');
            localStorage.removeItem('com.naver.nid.access_token');
            localStorage.removeItem('com.naver.nid.oauth.state_token');
            navigate(withDebugQuery('/index/mypage/loginsetting'));
          }
          return;
        }

        const res = await api.post('/auth/social/login', {
          provider: 'NAVER',
          authCode: naverAccessToken,
        });

        console.log('res', res);
        const { accessToken, refreshToken, isNewUser } = res.data.data;
        const gaPayload = {
          login_method: 'naver',
        };
        console.log('[GA] login_success payload', gaPayload);
        pushDataLayer('login_success', gaPayload);

        if (isNewUser) {
          localStorage.setItem('temp_access_token', accessToken);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        } else {
          localStorage.setItem('access_token', accessToken);
          if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
          localStorage.removeItem('temp_access_token');
        }
        localStorage.setItem(
          'recent_login',
          JSON.stringify({
            provider: 'NAVER',
            at: Date.now(),
          })
        );
        localStorage.removeItem('com.naver.nid.access_token');
        localStorage.removeItem('com.naver.nid.oauth.state_token');
        navigate(
          withDebugQuery(
            isNewUser ? '/index/auth/signupcomplete' : '/index/home'
          )
        );
      } catch (e) {
        console.error('서버 로그인 실패', e);
        if (isConnectMode) {
          alert('실패');
          localStorage.removeItem('social_connect_mode');
          localStorage.removeItem('com.naver.nid.access_token');
          localStorage.removeItem('com.naver.nid.oauth.state_token');
          navigate(withDebugQuery('/index/mypage/loginsetting'));
        } else {
          navigate(withDebugQuery('/index/auth/login'));
        }
      }
    });
  }, [navigate]);

  return <Spinner fullScreen message="네이버 로그인 처리 중이에요" />;
}
