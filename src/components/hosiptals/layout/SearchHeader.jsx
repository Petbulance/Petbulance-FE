import BackIcon from '@/assets/images/icons/left_arrow.svg';
import SmallMagnifier from '@/assets/images/icons/small_magnifier.svg';

export function SearchHeader({
  closeSearch,
  inputRef,
  keyword,
  onChangeKeyword,
}) {
  return (
    <div className="flex items-center py-3 pr-5 pl-[14px]">
      <button type="button" onClick={closeSearch} className="shrink-0">
        <img src={BackIcon} alt="back" className="h-6 w-6" />
      </button>

      <div className="mr-3 ml-[14px] flex flex-1 items-center rounded-[6px] bg-[#F5F5F5] px-[16px] py-[6px]">
        <input
          ref={inputRef}
          value={keyword}
          onChange={onChangeKeyword}
          placeholder="검색어를 입력하세요"
          className="w-full bg-transparent text-[20px] font-medium text-[#424242] outline-none placeholder:text-[#BDBDBD]"
        />
        <img src={SmallMagnifier} alt="search" />
      </div>

      <button
        type="button"
        onClick={closeSearch}
        className="shrink-0 text-[18px] font-semibold text-[#424242]"
      >
        닫기
      </button>
    </div>
  );
}
