import site_icon from '@/assets/images/icons/site_icon.svg';

export function BottomTab({ showSite, showHospital }) {
  return (
    <div className="sticky right-0 bottom-8 left-0 px-8 pt-4">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={showSite}
          className="flex items-center gap-1 rounded-3xl border border-[#2DA969] bg-white px-6 py-5 whitespace-nowrap"
        >
          <img src={site_icon} alt="site_icon" />
          <span className="text-[27px] leading-7 font-medium text-[#2DA969]">
            내 위치
          </span>
        </button>

        <button
          type="button"
          onClick={showHospital}
          className="flex-1 rounded-3xl bg-[#2DA969] text-[27px] leading-7 font-medium text-white shadow-lg active:bg-green-600"
        >
          병원 보기
        </button>
      </div>
    </div>
  );
}
