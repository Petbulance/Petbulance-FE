import Magnifier from '@/assets/images/icons/Magnifier.svg';

export function HospitalSearchHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[#E0E0E0] px-6 py-2.5">
      <text className="text-[25px] font-semibold text-[#1E1E1E]">
        병원 검색
      </text>
      <img src={Magnifier} alt="search" />
    </header>
  );
}
