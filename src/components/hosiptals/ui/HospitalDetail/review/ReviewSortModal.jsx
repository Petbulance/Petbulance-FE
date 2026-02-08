import greenCheck from '@/assets/images/icons/green_check.svg';

export default function ReviewSortModal({
  open,
  onClose,
  selectedSort,
  onSelect,
}) {
  if (!open) return null;

  const sortOptions = [
    { label: '최신순', value: '' },
    { label: '추천순', value: 'likeCount' },
    { label: '별점 높은 순', value: 'rating' },
  ];
  return (
    <div className="absolute inset-0 z-[3000] flex h-dvh items-center justify-center px-10">
      {/* 배경 (딤 처리) */}
      <div
        className="absolute inset-0 touch-none bg-black/50"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className="relative w-[420px] rounded-[16px] bg-white px-6 py-8 whitespace-pre-line">
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
