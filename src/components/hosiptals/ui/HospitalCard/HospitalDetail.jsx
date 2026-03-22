import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { registerRecentViewedHospital } from '@/apis/hospitals/searchHistory';
import CopyIcon from '@/assets/images/icons/CopyIcon.svg';
import DotIcon from '@/assets/images/icons/DotIcon.svg';
import hide_icon from '@/assets/images/icons/hide_icon.svg';
import PhoneIcon from '@/assets/images/icons/PhoneIcon.svg';
import Star from '@/assets/images/icons/Star.svg';
import { pushDataLayer } from '@/lib/gtm';

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
}) {
  const { id } = useParams();
  const { pathname } = useLocation();

  const isHospitalIndexPage = pathname.includes(`/index/hospitals/${id}`);

  const MAX_RENDER_LIMIT = 5;
  const renderTags = tags.slice(0, MAX_RENDER_LIMIT);

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

  const handleCallClick = () => {
    const gaPayload = {
      hospital_id: String(id),
      from_screen: 'detail_cta',
      call_type: '직접전화',
      click_location: 'header_phone_number',
      hospital_name: name,
    };
    console.log('[GA] tag_phone_number_click payload', gaPayload);
    pushDataLayer('tag_phone_number_click', gaPayload);
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

  const getResponsiveTagClass = (index) => {
    const baseClass = 'shrink-0';

    // 인덱스별 표시 조건
    if (index < 2) {
      return `${baseClass} block`;
    }
    if (index === 2) {
      return `${baseClass} hidden min-[414px]:block`;
    }
    if (index === 3) {
      return `${baseClass} hidden min-[520px]:block`;
    }
    if (index === 4) {
      return `${baseClass} hidden min-[620px]:block`;
    }

    return `${baseClass} hidden`;
  };

  return (
    <div className="flex w-full items-start gap-3">
      <img
        src={image}
        alt="병원 이미지"
        className="h-20 w-20 shrink-0 rounded-[16.88px] object-cover sm:h-25 sm:w-25"
        loading="lazy"
        decoding="async"
      />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1">
          <div className="min-w-0 truncate text-[16px] font-semibold text-[#1E1E1E] sm:text-[19px]">
            {name}
          </div>
          <div className="flex shrink-0 items-center justify-center gap-0.5 text-[13px] font-medium sm:text-[16px]">
            <img src={Star} alt="star_icon" />
            <span className="text-[#424242]">{formattedRating}</span>
            <span className="text-[#9E9E9E]">({reviewCount || 0})</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[12px] leading-tight font-medium sm:text-[14px]">
          <span
            className={`shrink-0 whitespace-nowrap ${
              openNow ? 'text-[#067DFD]' : 'text-[#BDBDBD]'
            }`}
          >
            {openNow ? '진료 중' : '진료 마감'}
          </span>

          {formattedTimeDisplay && (
            <>
              <img className="shrink-0" src={DotIcon} alt="dot_icon" />
              <span className="shrink-0 whitespace-nowrap text-[#424242]">
                {formattedTimeDisplay}
              </span>
            </>
          )}

          <img className="shrink-0" src={DotIcon} alt="dot_icon" />
          <span className="shrink-0 whitespace-nowrap text-[#9E9E9E]">
            {distance !== null ? `${distance}km` : '- km'}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-1 text-[13px] font-semibold text-[#067DFD] sm:text-[15px]">
          <img src={PhoneIcon} alt="PhoneIcon" />
          <a
            href={`tel:${phone}`}
            className="whitespace-nowrap hover:underline"
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
          <div className="mt-1.5 flex w-full max-w-full items-center gap-1 overflow-hidden">
            {renderTags.map((tag, idx) => (
              <div
                key={`${tag.value}-${idx}`}
                className={getResponsiveTagClass(idx)}
              >
                <CategoryButton
                  kind={tag.value}
                  style={getTagStyle(tag.type)}
                />
              </div>
            ))}

            {/* 너비 < 414px (기본): 태그 2개 초과 시 아이콘 표시 */}
            {tags.length > 2 && (
              <img
                src={hide_icon}
                alt="more"
                className="block shrink-0 min-[414px]:hidden"
              />
            )}

            {/* 414px <= 너비 < 520px: 태그 3개 초과 시 아이콘 표시 */}
            {tags.length > 3 && (
              <img
                src={hide_icon}
                alt="more"
                className="hidden shrink-0 min-[414px]:block min-[520px]:hidden"
              />
            )}

            {/* 520px <= 너비 < 620px: 태그 4개 초과 시 아이콘 표시 */}
            {tags.length > 4 && (
              <img
                src={hide_icon}
                alt="more"
                className="hidden shrink-0 min-[520px]:block min-[620px]:hidden"
              />
            )}

            {/* 너비 >= 620px: 태그 5개 초과 시 아이콘 표시 */}
            {tags.length > 5 && (
              <img
                src={hide_icon}
                alt="more"
                className="hidden shrink-0 min-[620px]:block"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
