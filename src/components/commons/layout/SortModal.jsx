import greenCheck from '@/assets/images/icons/green_check.svg';

export default function SortModal({ open, onClose, selectedSort, onSelect }) {
  if (!open) return null;

  const sortOptions = [
    { label: '가까운 순', value: 'distance' },
    { label: '리뷰 많은 순', value: 'reviewCount' },
    { label: '평점 높은 순', value: 'rating' },
  ];
  return (
    <div className="absolute inset-0 z-[3000] flex items-center justify-center px-10">
      {/* 배경 (딤 처리) */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className="relative w-full overflow-hidden rounded-[16px] bg-white px-6 py-8">
        <h2 className="mb-8 text-left text-[25px] font-semibold text-[#1E1E1E]">
          어떤 순서로 정렬할까요?
        </h2>

        <div className="flex flex-col gap-5">
          {sortOptions.map((option) => {
            const isSelected = selectedSort === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  onClose();
                }}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-[20px] font-medium text-[#616161]">
                  {option.label}
                </span>

                {isSelected && <img src={greenCheck} alt="selected" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
