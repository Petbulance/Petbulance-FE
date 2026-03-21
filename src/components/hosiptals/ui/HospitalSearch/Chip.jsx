import chip_delete from '@/assets/images/icons/chip_delete.svg';

export function Chip({ label, onRemove }) {
  return (
    <div className="flex items-center gap-[2px] rounded-[8px] bg-[#EEEEEE] px-2 py-[2px]">
      <span className="text-[16px] font-medium text-[#424242]">{label}</span>
      <button type="button" onClick={onRemove}>
        <img src={chip_delete} alt="remove" />
      </button>
    </div>
  );
}
