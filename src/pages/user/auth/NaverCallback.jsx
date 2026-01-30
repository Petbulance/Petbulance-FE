import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';

export default function NaverCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const sendCode = async () => {
      try {
        await api.post('/auth/naver', { code, state });
        navigate('/');
      } catch (e) {
        console.error('네이버 로그인 실패', e);
        navigate('/login');
      }
    };

    sendCode();
  }, []);
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');
    const state = params.get('state');

    if (!code || !state) {
      navigate('/index/auth/login');
      return;
    }

    const sendCode = async () => {
      try {
        const res = await axios.post(
          'https://nid.naver.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_secret: `${import.meta.env.VITE_NAVER_CLIENT_ID}`,
            redirect_uri: `${import.meta.env.VITE_NAVER_REDIRECT_URI}`,
          },
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        console.log(res.data.access_token);
        const JWTres = await api.post('/auth/social/login', {
          provider: 'KAKAO',
          authCode: res.data.access_token,
        });
        console.log('데이터', JWTres);
        localStorage.setItem('access_token', res.data.access_token);
        navigate('/index/auth/signupcomplete');
      } catch (e) {
        console.error('카카오 로그인 실패', e);
        navigate('/index/auth/login');
      }
    };

    sendCode();
  }, [navigate]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      네이버 로그인 처리 중...
    </div>
  );
}
