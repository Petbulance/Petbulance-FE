import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (!code) {
      navigate('/index/auth/login');
      return;
    }

    const fetchToken = async () => {
      try {
        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET, // ⚠️ 노출 주의
          redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          code,
        });

        const res = await axios.post(
          'https://oauth2.googleapis.com/token',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const { access_token, refresh_token } = res.data;

        localStorage.setItem('accessToken', access_token);
        if (refresh_token) {
          localStorage.setItem('refreshToken', refresh_token);
        }

        navigate('/');
      } catch (e) {
        console.error('구글 로그인 실패', e);
        navigate('/index/auth/login');
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      구글 로그인 처리 중...
    </div>
  );
}
