import info_icon from '@/assets/images/icons/info_icon_small.svg';
import Magnifier from '@/assets/images/icons/Magnifier.svg';

export function HospitalReviewDefaultHeader({ openSearch }) {
  return (
    <div className="flex items-center justify-between py-[14px] pr-[22px] pl-6 leading-[24px]">
      <h1 className="text-[25px] font-semibold text-[#1E1E1E]">병원 후기</h1>

      <div className="flex gap-[29.75px]">
        <button type="button" onClick={openSearch}>
          <img src={Magnifier} alt="search" />
        </button>
        <button type="button" onClick={''}>
          <img src={info_icon} alt="info" />
        </button>
      </div>
    </div>
  );
}
