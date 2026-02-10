import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { registerRecentViewedHospital } from '@/apis/hospitals/searchHistory';
import CopyIcon from '@/assets/images/icons/CopyIcon.svg';
import DotIcon from '@/assets/images/icons/DotIcon.svg';
import hide_icon from '@/assets/images/icons/hide_icon.svg';
import PhoneIcon from '@/assets/images/icons/PhoneIcon.svg';
import Star from '@/assets/images/icons/Star.svg';

import { CategoryButton } from './CategoryButton';

// 거리 계산 유틸리티 함수
function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export function HosipitalDetail({
  image,
  name,
  openNow,
  lat,
  lng,
  userLat,
  userLng,
  phone,
  time,
  todayCloseTime,
  overallRating,
  reviewCount,
  tags = [],
  fromScreen,
}) {
  const { id } = useParams();
  const { pathname } = useLocation();

  const isHospitalIndexPage = pathname.includes(`/index/hospitals/${id}`);

  const MAX_SHOW = 4;
  const hasMore = tags?.length > MAX_SHOW;
  const visibleTags = tags?.slice(0, MAX_SHOW);

  const getTagStyle = (type) => {
    switch (type) {
      case 'WORKTYPE':
        return 'bg-[#FBE1DA]';
      case 'ANIMALTYPE':
        return 'bg-[#FAF5B8]';
      case 'LOCATIONTYPE':
        return 'bg-[#E8EBED]';
      default:
        return 'bg-[#FAF5B8]';
    }
  };

  const distance = useMemo(() => {
    const uLat = parseFloat(userLat);
    const uLng = parseFloat(userLng);
    const hLat = parseFloat(lat);
    const hLng = parseFloat(lng);

    if (isNaN(uLat) || isNaN(uLng) || isNaN(hLat) || isNaN(hLng)) {
      return null;
    }

    const dist = getDistanceFromLatLonInKm(uLat, uLng, hLat, hLng);
    return isNaN(dist) ? null : dist.toFixed(1);
  }, [lat, lng, userLat, userLng]);

  // ✅ [GTM] 전화 버튼 클릭 핸들러
  const handleCallClick = () => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'click_call_hospital',
        hospital_id: String(id),
        from_screen: fromScreen,
      });
    }
  };

  useEffect(() => {
    const recordHistory = async () => {
      if (!id) return;
      try {
        await registerRecentViewedHospital(Number(id));
      } catch (error) {
        console.error('최근 본 병원 등록 실패:', error);
      }
    };
    recordHistory();
  }, [id]);

  const formattedRating = overallRating
    ? Number(overallRating).toFixed(1)
    : '0.0';

  let formattedTimeDisplay = '';
  if (todayCloseTime) {
    const timeParts = todayCloseTime.split(':');
    formattedTimeDisplay =
      timeParts.length >= 2
        ? `${timeParts[0]}:${timeParts[1]}에 영업 종료`
        : `${todayCloseTime}에 영업 종료`;
  } else if (time && time.includes('~')) {
    const endTime = time.split('~')[1].trim();
    formattedTimeDisplay = `${endTime}에 영업 종료`;
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={image}
        alt="병원 이미지"
        className="h-25 w-25 rounded-[16.88px] object-cover"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <div className="text-[19px] font-semibold text-[#1E1E1E]">{name}</div>
          <div className="flex items-center justify-center gap-0.5 text-[16px] font-medium">
            <img src={Star} alt="star_icon" />
            <span className="text-[#424242]">{formattedRating}</span>
            <span className="text-[#9E9E9E]">({reviewCount || 0})</span>
          </div>
        </div>

        <div className="flex items-center gap-1.75 text-[14px] font-medium">
          <span className={openNow ? 'text-[#067DFD]' : 'text-[#BDBDBD]'}>
            {openNow ? '진료 중' : '진료 마감'}
          </span>

          {formattedTimeDisplay && (
            <>
              <img src={DotIcon} alt="dot_icon" />
              <span className="text-[#424242]">{formattedTimeDisplay}</span>
            </>
          )}

          <img src={DotIcon} alt="dot_icon" />
          <span className="text-[#9E9E9E]">
            {distance !== null ? `${distance}km` : '- km'}
          </span>
        </div>

        <div className="flex items-center gap-1 font-[#067DFD] text-[15px] font-semibold text-[#067DFD]">
          <img src={PhoneIcon} alt="PhoneIcon" />
          <a
            href={`tel:${phone}`}
            className="hover:underline"
            onClick={handleCallClick}
          >
            {phone}
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(phone)}
            type="button"
          >
            <img src={CopyIcon} alt="CopyIcon" />
          </button>
        </div>

        {isHospitalIndexPage ? (
          <div className="mt-1.5 flex w-[308px] flex-wrap items-center gap-1">
            {tags.map((tag, idx) => (
              <CategoryButton
                key={`${tag.value}-${idx}`}
                kind={tag.value}
                style={getTagStyle(tag.type)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-1.5 flex w-[308px] items-center gap-1 overflow-hidden">
            {visibleTags?.map((tag, idx) => (
              <CategoryButton
                key={`${tag.value}-${idx}`}
                kind={tag.value}
                style={getTagStyle(tag.type)}
              />
            ))}
            {hasMore && <img src={hide_icon} alt="more" />}
          </div>
        )}
      </div>
    </div>
  );
}
