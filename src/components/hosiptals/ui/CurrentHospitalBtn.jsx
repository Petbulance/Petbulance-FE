import reload_icon from '@/assets/images/icons/reload_icon.svg';

export function CurrentHospitalBtn({ onClick }) {
  return (
    <div className="absolute top-14 left-1/2 z-[1000] -translate-x-1/2">
      <button
        onClick={onClick}
        className="flex items-center gap-1 rounded-full border-2 border-[#2DA969] bg-white px-4 py-2"
      >
        <img src={reload_icon} alt="research" />
        <span className="text-[16px] font-medium text-[#2DA969]">
          현위치에서 재검색
        </span>
      </button>
    </div>
  );
}
