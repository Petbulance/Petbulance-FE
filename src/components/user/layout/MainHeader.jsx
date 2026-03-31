import { Notification } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchNotifications } from '@/apis/notifications';

export default function MainHeader({ title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMyPage = title === '마이페이지';
  const isHome = location.pathname === '/index/home';
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications({ size: 100 });
        if (!mounted) return;
        const unreadCount = (data?.content ?? []).filter(
          (item) => !item.read
        ).length;
        setNotificationCount(unreadCount);
      } catch {
        if (mounted) setNotificationCount(0);
      }
    };

    loadNotifications();

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  const displayCount = notificationCount > 99 ? '99+' : notificationCount;
  const isSingleDigit = String(notificationCount).length === 1;

  return (
    <header
      className={`sticky top-0 z-50 px-4 py-3 ${
        isMyPage ? 'bg-gray-100' : 'bg-white shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* 타이틀 */}
        <h1
          className={`cursor-pointer pl-[8px] text-[25px] font-semibold ${
            isHome ? 'text-[#2DA969]' : 'text-gray-900'
          }`}
        >
          {title}
        </h1>
        <div className="relative h-8 w-8 shrink-0">
          <button
            type="button"
            className="flex h-full w-full items-center justify-center"
            onClick={() => navigate('/index/notification')}
            aria-label="알림"
          >
            <Notification className="h-5 w-5 cursor-pointer text-gray-600" />
          </button>

          {/* 알림 뱃지 */}
          {notificationCount > 0 && (
            <span
              className={`pointer-events-none absolute top-[2px] right-[2px] flex items-center justify-center bg-[#27BE69] text-[10px] font-semibold text-white ${
                isSingleDigit
                  ? 'h-[16px] w-[16px] rounded-full'
                  : 'h-[16px] min-w-[16px] rounded-full px-1'
              } `}
            >
              {displayCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
