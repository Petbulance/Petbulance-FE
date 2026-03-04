import greenCheckIcon from '@/assets/images/icons/green_check.svg';
import reloadIcon from '@/assets/images/icons/reload_gray.svg';
import { ANIMAL_FILTER_OPTIONS } from '@/data/community';

export function CommunityFilterSheet({
  isOpen,
  closeFilterSheet,
  filterTab,
  setFilterTab,
  resetDraftFilters,
  categoryFilterOptions,
  draftAnimalFilter,
  draftCategoryFilter,
  setDraftAnimalFilter,
  setDraftCategoryFilter,
  applyDraftFilters,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-30 flex items-end bg-black/50"
      onClick={closeFilterSheet}
      role="dialog"
      aria-modal="true"
      aria-label="커뮤니티 필터"
    >
      <div
        className="w-full rounded-t-[20px] bg-white pb-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center py-[27.56px]">
          <div className="h-[6.88px] w-[55.11px] rounded-full bg-black" />
        </div>

        <div className="flex border-b border-[#EEEEEE]">
          <button
            type="button"
            onClick={() => setFilterTab('animal')}
            className={`flex-1 py-[14px] text-[18px] font-semibold ${
              filterTab === 'animal'
                ? 'border-b-2 border-[#222222] text-[#1E1E1E]'
                : 'text-[#BDBDBD]'
            }`}
          >
            라운지 선택
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('category')}
            className={`flex-1 py-[14px] text-[18px] font-semibold ${
              filterTab === 'category'
                ? 'border-b-2 border-[#222222] text-[#1E1E1E]'
                : 'text-[#BDBDBD]'
            }`}
          >
            카테고리 선택
          </button>
        </div>

        <div className="flex justify-end border-b border-[#F5F5F5] px-5 pt-5 pb-3">
          <button
            type="button"
            onClick={resetDraftFilters}
            className="flex gap-1 text-[16px] font-medium text-[#616161]"
          >
            선택 초기화
            <img src={reloadIcon} alt="reset" />
          </button>
        </div>

        <div className="max-h-[46dvh] min-h-[260px] overflow-y-auto px-10">
          {(filterTab === 'animal'
            ? ANIMAL_FILTER_OPTIONS
            : categoryFilterOptions
          ).map((option) => {
            const isSelected =
              filterTab === 'animal'
                ? draftAnimalFilter === option
                : draftCategoryFilter === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (filterTab === 'animal') {
                    setDraftAnimalFilter((prev) =>
                      prev === option ? '' : option
                    );
                    return;
                  }

                  setDraftCategoryFilter((prev) =>
                    prev === option ? '' : option
                  );
                }}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span
                  className={`text-[25px] ${
                    isSelected ? 'font-medium text-[#2DA969]' : 'text-[#616161]'
                  }`}
                >
                  {option}
                </span>
                {isSelected && <img src={greenCheckIcon} alt="선택됨" />}
              </button>
            );
          })}
        </div>

        <div className="px-6 pt-3">
          <button
            type="button"
            onClick={applyDraftFilters}
            className="w-full rounded-[16px] bg-[#2DA969] py-5 text-[27px] font-medium text-white"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}
