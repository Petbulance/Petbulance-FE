import info_icon from '@/assets/images/icons/info_icon_small.svg';

export function HospitalReviewDefaultHeader() {
  return (
    <div className="flex items-center justify-between border-b-[1px] border-[#E0E0E0] bg-white py-[14px] pr-[22px] pl-6 leading-[24px]">
      <h1 className="text-[25px] font-semibold text-[#1E1E1E]">병원 후기</h1>
      <button type="button" onClick={''}>
        <img src={info_icon} alt="info" />
      </button>
    </div>
  );
}
