import { useState } from 'react';

import blueImg from '@/assets/images/icons/blue_bottom_arrow.svg';
import grayImg from '@/assets/images/icons/gray_bottom_arrow.svg';

import TermsDetailDialog from './TermsDetailDialog.jsx';

export default function TermsAgreementItem({
  label,
  checked,
  onCheckedChange,
  children,
  required = false,
}) {
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <>
      <div className="flex h-[48px] items-center justify-between py-[14px]">
        {/* 좌측 영역 */}
        <div className="flex h-[20px] items-center gap-3">
          {/* 체크박스 */}
          <div
            className="flex h-5 w-5 cursor-pointer items-center justify-center"
            onClick={() => onCheckedChange(!checked)}
          >
            <img
              src={checked ? blueImg : grayImg}
              alt={checked ? 'checked' : 'unchecked'}
              className="h-[11px] w-[19px]"
            />
          </div>

          {/* 약관명 */}
          <span className="text-tertiary text-[18px]">
            <span className="mr-1 font-semibold">
              [{required ? '필수' : '선택'}]
            </span>
            {label}
          </span>
        </div>

        {/* 우측 [자세히] */}
        <button
          type="button"
          onClick={() => setOpenDetail(true)}
          className="text-caption text-[15px] font-medium"
        >
          자세히
        </button>
      </div>

      {/* 약관 상세 팝업 */}
      <TermsDetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        title={label}
        content={children}
      />
    </>
  );
}
