import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { registerRecentViewedHospital } from '@/apis/hospitals/searchHistory';
import CopyIcon from '@/assets/images/icons/CopyIcon.svg';
import DotIcon from '@/assets/images/icons/DotIcon.svg';
import hide_icon from '@/assets/images/icons/hide_icon.svg';
import PhoneIcon from '@/assets/images/icons/PhoneIcon.svg';
import Star from '@/assets/images/icons/Star.svg';

import { CategoryButton } from './CategoryButton';

export function HosipitalDetail({
  image,
  name,
  openNow,
  time,
  distanceMeter,
  phone,
  overallRating,
  reviewCount,
  acceptedAnimals,
}) {
  const { id } = useParams();
  const { pathname } = useLocation();

  const isHospitalIndexPage = pathname.includes(`/index/hospitals/${id}`);

  const MAX_SHOW = 4;
  const hasMore = acceptedAnimals?.length > MAX_SHOW;
  const visibleAnimals = acceptedAnimals?.slice(0, MAX_SHOW);

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

  const formattedDistance = distanceMeter
    ? (distanceMeter / 1000).toFixed(1)
    : '0.0';

  const formattedRating = overallRating
    ? Number(overallRating).toFixed(1)
    : '0.0';

  return (
    <div className="flex items-center gap-3">
      <img
        src={image}
        alt="병원 이미지"
        className="h-25 w-25 rounded-[16.88px] object-cover"
      />
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-1">
          <div className="text-[19px] font-semibold text-[#1E1E1E]">{name}</div>
          <div className="flex items-center justify-center gap-0.5 text-[16px] font-medium">
            <img src={Star} alt="star_icon" />
            <span className="text-[#424242]">{formattedRating || '0.0'}</span>
            <span className="text-[#9E9E9E]">({reviewCount || 0})</span>
          </div>
        </div>

        <div className="flex items-center gap-1.75 text-[14px] font-medium">
          <span className={openNow ? 'text-[#067DFD]' : 'text-[#BDBDBD]'}>
            {openNow ? '진료 중' : '진료 마감'}
          </span>
          <img src={DotIcon} alt="dot_icon" />
          {/* TODO: 영업 종료 시간 표시 로직 필요 */}
          <span className="text-[#424242]">{time}에 영업 종료</span>
          <img src={DotIcon} alt="dot_icon" />
          <span className="text-[#9E9E9E]">{formattedDistance || '0.0'}km</span>
        </div>

        <div className="flex items-center gap-1 font-[#067DFD] text-[15px] font-semibold text-[#067DFD]">
          <img src={PhoneIcon} alt="PhoneIcon" />
          <a href={`tel:${phone}`} className="hover:underline">
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
          //병원 상세 페이지 병원 카드
          <div className="mt-1.5 flex w-[308px] flex-wrap items-center gap-1">
            {acceptedAnimals.map((kind, idx) => (
              <CategoryButton key={`${kind}-${idx}`} kind={kind} />
            ))}
          </div>
        ) : (
          //지도 & 병원 목록 병원 카드
          <div className="mt-1.5 flex w-[308px] items-center gap-1 overflow-hidden">
            {visibleAnimals?.map((kind, idx) => (
              <CategoryButton key={`${kind}-${idx}`} kind={kind} />
            ))}
            {hasMore && <img src={hide_icon} />}
          </div>
        )}
      </div>
    </div>
  );
}
