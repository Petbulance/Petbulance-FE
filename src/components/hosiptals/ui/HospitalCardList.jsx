import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { HospitalCard } from '@/components/hosiptals/ui/HospitalCard/HospitalCard';

export function HospitalCardList({
  hospitals,
  userLat,
  userLng,
  fromScreen,
  hasNext = false,
  isLoadingMore = false,
  onLoadMore,
  scrollRootRef,
}) {
  const navigate = useNavigate();
  const sentinelRef = useRef(null);

  const handleCardClick = (id) => {
    console.log('스크린', fromScreen);
    navigate(`/index/hospitals/${id}`, {
      state: { from_screen: fromScreen },
    });
  };

  useEffect(() => {
    if (!onLoadMore || !hasNext || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingMore) {
          onLoadMore();
        }
      },
      {
        root: scrollRootRef?.current ?? null,
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNext, isLoadingMore, onLoadMore, scrollRootRef, hospitals.length]);

  return (
    <div className="h-full min-h-0">
      <div className="space-y-4 px-8 pt-17 pb-5">
        {hospitals.map((h) => (
          <HospitalCard
            key={h.hospitalId}
            img={h.image}
            name={h.name}
            status={h.isOpenNow}
            time={h.openHours}
            userLat={userLat}
            userLng={userLng}
            lat={h.lat}
            lng={h.lng}
            phoneNumber={h.phone}
            rating={h.rating}
            reviews={h.reviewCount}
            kinds={h.types}
            tags={h.tags}
            onClick={() => handleCardClick(h.hospitalId)}
            fromScreen={fromScreen}
          />
        ))}

        {onLoadMore && hasNext && (
          <div ref={sentinelRef} className="flex w-full justify-center py-3">
            <span className="text-[13px] font-medium text-[#9E9E9E]">
              {isLoadingMore ? '불러오는 중...' : '더 불러오는 중...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
