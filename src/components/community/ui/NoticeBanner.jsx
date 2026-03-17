import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import loudspeaker from '@/assets/images/icons/loudspeaker.svg';

const NOTICE_STATUS_MAP = {
  EVENT: '이벤트',
  NOTICE: '공지',
  ADVERTISING: '광고',
  AD: '광고',
};

const ANIMATION_MS = 350;
const ROTATE_MS = 3000;

export function NoticeBanner({ notices = [] }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const noticeList = useMemo(
    () => (Array.isArray(notices) ? notices : []),
    [notices]
  );

  useEffect(() => {
    if (noticeList.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setIsAnimating(true);
    }, ROTATE_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [noticeList.length]);

  useEffect(() => {
    if (!isAnimating || noticeList.length <= 1) return undefined;

    const timeout = window.setTimeout(() => {
      setIsTransitionEnabled(false);
      setCurrentIndex((prev) => (prev + 1) % noticeList.length);
      setIsAnimating(false);

      window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    }, ANIMATION_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isAnimating, noticeList.length]);

  if (noticeList.length === 0) return null;

  const normalizedIndex = currentIndex % noticeList.length;
  const currentNotice = noticeList[normalizedIndex];
  const nextNotice = noticeList[(normalizedIndex + 1) % noticeList.length];

  const renderNotice = (notice) => {
    const statusLabel = NOTICE_STATUS_MAP[notice.noticeStatus] ?? '공지';
    return `(${statusLabel}) ${notice.title}`;
  };

  return (
    <div className="flex items-center gap-1 bg-[#E6F2FF] px-6 py-2 text-[#616161]">
      <img src={loudspeaker} alt="공지" />
      <button
        type="button"
        className="relative h-6 flex-1 overflow-hidden text-left"
        onClick={() =>
          navigate(`/index/mypage/notice/${currentNotice.noticeId}`)
        }
      >
        <div
          className="flex h-full w-[200%]"
          style={{
            transform: isAnimating ? 'translateX(-50%)' : 'translateX(0)',
            transition: isTransitionEnabled
              ? `transform ${ANIMATION_MS}ms ease`
              : 'none',
          }}
        >
          <p className="w-1/2 shrink-0 truncate" aria-hidden={isAnimating}>
            {renderNotice(currentNotice)}
          </p>

          {noticeList.length > 1 && (
            <p className="w-1/2 shrink-0 truncate">
              {renderNotice(nextNotice)}
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
