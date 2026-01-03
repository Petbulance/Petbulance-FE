import { ChevronLeft, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NotificationHeader({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isNotificationMain =
    location.pathname === '/index/notification';

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-3 ">
      <div className="relative flex items-center justify-between">
        {/* 뒤로 */}
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* 타이틀 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[25px] font-semibold">
          {title}
        </h1>

        {/* 설정 (알림 메인에서만) */}
        {isNotificationMain ? (
          <button
            onClick={() =>
              navigate('/index/notification/setting')
            }
          >
            <Settings className="h-5 w-5" />
          </button>
        ) : (
          // 🔹 아이콘 자리 유지 (타이틀 흔들림 방지)
          <div className="h-5 w-5" />
        )}
      </div>
    </header>
  );
}
