import downArrow from '@/assets/images/icons/down_arrow.svg';
import filterIcon from '@/assets/images/icons/filter_icon.svg';
import { SORT_OPTIONS } from '@/data/community';

export function CommunitySearchHeader({
  activeTab,
  setActiveTab,
  openFilterSheet,
  filterLabel,
  dropdownGroupRef,
  isSortOpen,
  setIsSortOpen,
  isTypeOpen,
  setIsTypeOpen,
  selectedSort,
  selectedType,
  searchTypeOptions,
  setSelectedSort,
  setSelectedType,
}) {
  return (
    <div className="border-y border-[#EEEEEE]">
      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveTab('post')}
          className={`py-[14px] text-[18px] font-semibold ${
            activeTab === 'post'
              ? 'border-b border-[#2DA969] text-[#2DA969]'
              : 'text-[#BDBDBD]'
          }`}
        >
          게시글
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('comment')}
          className={`py-[14px] text-[18px] font-semibold ${
            activeTab === 'comment'
              ? 'border-b border-[#2DA969] text-[#2DA969]'
              : 'text-[#BDBDBD]'
          }`}
        >
          댓글
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-[#EEEEEE] px-6 py-3">
        <button
          type="button"
          onClick={openFilterSheet}
          className="flex w-[208px] items-center gap-1 text-[18px] font-medium text-[#1E1E1E]"
        >
          <img src={filterIcon} alt="필터" />
          {filterLabel}
        </button>

        <div
          ref={dropdownGroupRef}
          className={`relative flex items-center text-[18px] font-medium text-[#1E1E1E] ${
            activeTab === 'post'
              ? 'w-[208px] justify-between'
              : 'w-auto justify-end'
          }`}
        >
          {activeTab === 'post' && (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSortOpen((prev) => !prev);
                  setIsTypeOpen(false);
                }}
                className="flex items-center gap-1"
              >
                {selectedSort}
                <img src={downArrow} alt="정렬 선택" />
              </button>
              {isSortOpen && (
                <div className="absolute top-[34px] right-0 z-20 w-[160px] rounded-[8px] bg-white px-2 py-2 shadow-[0_0_8px_rgba(0,0,0,0.15),0_0_2px_rgba(0,0,0,0.24)]">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedSort(option);
                        setIsSortOpen(false);
                      }}
                      className={`block w-full rounded-[6px] px-2 py-2 text-left text-[19px] text-[#1E1E1E] ${
                        selectedSort === option ? 'bg-[#EEEEEE]' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTypeOpen((prev) => !prev);
                setIsSortOpen(false);
              }}
              className="flex items-center gap-1"
            >
              {selectedType}
              <img src={downArrow} alt="검색 범위 선택" />
            </button>
            {isTypeOpen && (
              <div className="absolute top-[34px] right-0 z-20 w-[160px] rounded-[8px] bg-white px-2 py-2 shadow-[0_0_8px_rgba(0,0,0,0.15),0_0_2px_rgba(0,0,0,0.24)]">
                {searchTypeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSelectedType(option);
                      setIsTypeOpen(false);
                    }}
                    className={`block w-full rounded-[6px] px-2 py-2 text-left text-[19px] text-[#1E1E1E] ${
                      selectedType === option ? 'bg-[#EEEEEE]' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
