import CopyIcon from '@/assets/images/icons/CopyIcon.svg';
import DotIcon from '@/assets/images/icons/DotIcon.svg';
import PhoneIcon from '@/assets/images/icons/PhoneIcon.svg';
import Star from '@/assets/images/icons/Star.svg';

import { CategoryButton } from './CategoryButton';

export function HosipitalDetail({
  img,
  name,
  status,
  time,
  distance,
  phoneNumber,
  rating,
  reviews,
  kinds = [],
}) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={img}
        alt="병원 이미지"
        className="h-25 w-25 rounded-[16.88px]"
      />
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-1">
          <div className="text-[19px] font-semibold text-[#1E1E1E]">{name}</div>
          <div className="flex items-center justify-center gap-0.5 text-[16px] font-medium">
            <img src={Star} alt="star_icon" />
            <span className="text-[#424242]">{rating}</span>
            <span className="text-[#9E9E9E]">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-1.75 text-[14px] font-medium">
          <span className="text-[#067DFD]">{status}</span>
          <img src={DotIcon} alt="dot_icon" />
          <span className="text-[#424242]">{time}에 영업 종료</span>
          <img src={DotIcon} alt="dot_icon" />
          <span className="text-[#9E9E9E]">{distance}km</span>
        </div>

        <div className="flex items-center gap-1 font-[#067DFD] text-[15px] font-semibold text-[#067DFD]">
          <img src={PhoneIcon} alt="PhoneIcon" />
          <a href={`tel:${phoneNumber}`} className="hover:underline">
            {phoneNumber}
          </a>
          <img src={CopyIcon} alt="CopyIcon" />
        </div>

        <div className="mt-1.5 flex items-center gap-1">
          {kinds.map((kind, idx) => (
            <CategoryButton key={`${kind}-${idx}`} kind={kind} />
          ))}
        </div>
      </div>
    </div>
  );
}
