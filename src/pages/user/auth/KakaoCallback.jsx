import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const authCode = new URL(window.location.href).searchParams.get('code');
    if (!authCode) {
      navigate('/index/auth/login');
      return;
    }

    const sendCode = async () => {
      try {
        console.log(`${import.meta.env.VITE_KAKAO_REST_API_KEY}`);
        const res = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: `${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
            redirect_uri: `${import.meta.env.VITE_KAKAO_REDIRECT_URI}`,
            code: authCode,
          },
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        console.log(res.data.access_token);
        const JWTres = await api.post('/auth/social/login', {
          provider: 'KAKAO',
          authCode: res.data.access_token,
        });
        console.log('데이터', JWTres);
        const { accessToken, refreshToken, isNewUser } = JWTres.data.data;

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
            provider: 'KAKAO',
            at: Date.now(),
          })
        );
        navigate('/index/auth/signupcomplete');
      } catch (e) {
        console.error('카카오 로그인 실패', e);
        navigate('/index/auth/login');
      }
    };

    sendCode();
  }, [navigate]);

  return (
    <Spinner fullScreen message="카카오 로그인 처리 중이에요" />
  );
}
