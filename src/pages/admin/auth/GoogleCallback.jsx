import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/apis/api.jsx';

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (!code) {
      navigate('/index/auth/login');
      return;
    }

    const sendCode = async () => {
      try {
        await api.post('/auth/google', { code });
        navigate('/');
      } catch (e) {
        console.error('구글 로그인 실패', e);
        navigate('/index/auth/login');
      }
    };

    sendCode();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      구글 로그인 처리 중...
    </div>
  );
}
