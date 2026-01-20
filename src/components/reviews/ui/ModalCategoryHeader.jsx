import check_icon from '@/assets/images/icons/review_check_icon.svg';

export function ModalCategoryHeader({ section, isAllSelected, onToggleAll }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[23px] font-semibold text-[#424242]">
        {section.category}
      </h3>

      <button
        onClick={onToggleAll}
        className={`flex items-center gap-0.5 text-[18px] transition-colors ${
          isAllSelected ? 'text-[#424242]' : 'text-[#BDBDBD]'
        }`}
      >
        <img src={check_icon} alt="전체선택 아이콘" />
        전체선택
      </button>
    </div>
  );
}
