import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/apis/api.jsx';

export default function NaverCallback() {
  const navigate = useNavigate();

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
        await api.post('/auth/naver', { code, state });
        navigate('/');
      } catch (e) {
        console.error('네이버 로그인 실패', e);
        navigate('/login');
      }
    };

    sendCode();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      네이버 로그인 처리 중...
    </div>
  );
}
