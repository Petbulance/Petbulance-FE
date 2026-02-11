import Magnifier from '@/assets/images/icons/Magnifier.svg';

export function DefaultHeader({ openSearch }) {
  return (
    <div className="flex items-center justify-between py-[14px] pr-[22px] pl-6 leading-[24px]">
      <h1
        className="cursor-pointer text-[25px] font-semibold text-[#1E1E1E]"
        onClick={() => window.location.reload()}
      >
        병원 검색
      </h1>

      <button type="button" onClick={openSearch}>
        <img src={Magnifier} alt="search" />
      </button>
    </div>
  );
}
