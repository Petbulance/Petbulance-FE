import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchNotifications } from '@/apis/notifications';
import arrow from '@/assets/images/icons/arrow_header.svg';
import Bell from '@/assets/images/icons/bell.svg';
import Search from '@/assets/images/icons/community_search.svg';

export function CommunityHeader({ selectedType, onSelectType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const dropdownRef = useRef(null);
  const animalTypes = [
    '전체',
    '소형포유류',
    '조류',
    '파충류',
    '양서류',
    '어류',
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="relative flex h-[57px] items-center justify-between border-b-[1px] border-[#E0E0E0] py-[14px] pr-[22px] pl-6 leading-[24px]">
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1 text-[20px] font-semibold text-[#1E1E1E]"
        >
          {selectedType}
          <img src={arrow} />
        </button>

        {isOpen && (
          <div className="absolute top-[34px] left-0 z-20 w-[180px] rounded-[8px] bg-white px-2 py-2 shadow-[0_0_8px_rgba(0,0,0,0.15),0_0_2px_rgba(0,0,0,0.24)]">
            {animalTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  onSelectType(type);
                  setIsOpen(false);
                }}
                className={`block w-full rounded-[6px] px-2 py-2 text-left text-[19px] text-[#424242] ${
                  selectedType === type ? 'bg-[#EEEEEE]' : ''
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center text-[#525252]">
        <img
          src={Search}
          alt="검색"
          onClick={() => navigate('/index/community/search')}
          className="cursor-pointer"
        />
        <button
          type="button"
          className="relative"
          onClick={() => navigate('/index/notification')}
        >
          <img src={Bell} alt="알림" />
          {notificationCount > 0 && (
            <span
              className={`absolute -top-1 -right-1 flex items-center justify-center bg-[#27BE69] text-[10px] font-semibold text-white ${
                isSingleDigit
                  ? 'h-[16px] w-[16px] rounded-full'
                  : 'h-[16px] min-w-[16px] rounded-full px-1'
              }`}
            >
              {displayCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
