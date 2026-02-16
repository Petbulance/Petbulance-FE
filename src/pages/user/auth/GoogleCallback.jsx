import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';
import { pushDataLayer } from '@/lib/gtm';
import { withDebugQuery } from '@/utils/gtm';

export default function GoogleCallback() {
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const code = new URL(window.location.href).searchParams.get('code');

    if (!code) {
      localStorage.removeItem('social_connect_mode');
      navigate(withDebugQuery('/index/auth/login'));
      return;
    }

    const fetchToken = async () => {
      const isConnectMode =
        localStorage.getItem('social_connect_mode') === 'GOOGLE';

      try {
        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
          redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          code,
        });
        console.log('google', params);
        const res = await axios.post(
          'https://oauth2.googleapis.com/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log(res.data);

        if (isConnectMode) {
          try {
            await api.post('/users/social/connect', {
              provider: 'GOOGLE',
              authCode: res.data.access_token,
            });
            alert('성공');
          } catch (err) {
            console.error('구글 계정 연결 실패', err);
            alert('실패');
          } finally {
            localStorage.removeItem('social_connect_mode');
            navigate(withDebugQuery('/index/mypage/loginsetting'));
          }
          return;
        }

        const JWTres = await api.post('/auth/social/login', {
          provider: 'GOOGLE',
          authCode: res.data.access_token,
        });
        console.log('데이터', JWTres);
        const { accessToken, refreshToken, isNewUser } = JWTres.data.data;
        const gaPayload = {
          login_method: 'google',
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
            provider: 'GOOGLE',
            at: Date.now(),
          })
        );
        navigate(withDebugQuery('/index/auth/signupcomplete'));
      } catch (e) {
        console.error('구글 로그인 실패', e);
        if (isConnectMode) {
          alert('실패');
          localStorage.removeItem('social_connect_mode');
          navigate(withDebugQuery('/index/mypage/loginsetting'));
        } else {
          navigate(withDebugQuery('/index/auth/login'));
        }
      }
    };

    fetchToken();
  }, [navigate]);

  return <Spinner fullScreen message="구글 로그인 처리 중이에요" />;
}
