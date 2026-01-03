import { Notification } from '@carbon/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MainHeader({ title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMyPage = title === '마이페이지';
  const isHome = location.pathname === '/index/home';

  // 알림 개수
  const notificationCount = 2;

  // 99 초과 시 99+ 처리
  const displayCount =
    notificationCount > 99 ? '99+' : notificationCount;

  return (
    <header
      className={`sticky top-0 z-50 px-4 py-3 ${
        isMyPage ? 'bg-gray-100' : 'bg-white shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* 타이틀 */}
        <h1
          className={`text-[25px] font-semibold pl-[8px] ${
            isHome ? 'text-[#2DA969]' : 'text-gray-900'
          }`}
        >
          {title}
        </h1>
        <div className="relative">
          <Notification
            className="h-5 w-5 text-gray-600 cursor-pointer"
            onClick={() => navigate('/index/notification')}
          />

          {/* 알림 뱃지 */}
          {notificationCount > 0 && (
            <span className="absolute -right-2 -top-2 flex min-w-[18px] items-center justify-center rounded-full bg-success px-1 text-[10px] font-semibold text-white">
              {displayCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
