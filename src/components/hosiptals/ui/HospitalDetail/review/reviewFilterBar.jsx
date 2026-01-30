import { useState } from 'react';

import down_arrow from '@/assets/images/icons/down_arrow.svg';
import gray_camera from '@/assets/images/icons/gray_camera.svg';
import gray_check from '@/assets/images/icons/gray_check.svg';
import navy_camera from '@/assets/images/icons/navy_camera.svg';
import navy_check from '@/assets/images/icons/navy_check.svg';

export function ReviewFilterBar({
  isPhotoOnly,
  setIsPhotoOnly,
  currentSortLabel,
  onOpenSort,
}) {
  const [isReceiptAuth, setIsReceiptAuth] = useState(true);

  return (
    <div className="flex items-center gap-3 bg-white px-6 pt-4 pb-3">
      <button
        className="flex items-center gap-1 text-[18px] font-medium text-[#1E1E1E]"
        onClick={onOpenSort}
      >
        {currentSortLabel}
        <img src={down_arrow} alt="toggle" />
      </button>

      <FilterButton
        label="사진 후기"
        isActive={isPhotoOnly}
        onClick={() => setIsPhotoOnly(!isPhotoOnly)}
        activeIcon={navy_camera}
        inactiveIcon={gray_camera}
      />

      <FilterButton
        label="영수증인증"
        isActive={isReceiptAuth}
        onClick={() => setIsReceiptAuth(!isReceiptAuth)}
        activeIcon={navy_check}
        inactiveIcon={gray_check}
      />
    </div>
  );
}

export function FilterButton({
  isActive,
  onClick,
  label,
  activeIcon,
  inactiveIcon,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded-full border px-3 py-1.5 transition-colors ${
        isActive
          ? 'border-[#1C334B] bg-white text-[#1C334B]'
          : 'border-[#E8EBED] bg-white text-[#B9C0C7]'
      }`}
    >
      <img src={isActive ? activeIcon : inactiveIcon} alt={label} />
      <span className="text-[15px] font-semibold">{label}</span>
    </button>
  );
}
