import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('카카오', code);
    alert(code);
    if (!code) {
      navigate('/index/auth/login');
      return;
    }

    const sendCode = async () => {
      try {
        const res = await api.post('/auth/social/login', {
          code,
        });

        /**
         * 서버 응답 예시
         * {
         *   accessToken: 'xxx',
         *   refreshToken: 'yyy'
         * }
         */
        const { accessToken, refreshToken } = res.data;

        // 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        navigate('/');
      } catch (e) {
        console.error('구글 로그인 실패', e);
        navigate('/index/auth/login');
      }
    };

    sendCode();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      구글 로그인 처리 중...
    </div>
  );
}
