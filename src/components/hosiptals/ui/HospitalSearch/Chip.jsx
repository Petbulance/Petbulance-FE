import delete_icon from '@/assets/images/icons/x_icon.svg';

export function Chip({ label, onRemove }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#F5F5F5] px-3 py-1.5">
      <span className="text-[15px] font-medium text-[#1E1E1E]">{label}</span>
      <button type="button" onClick={onRemove}>
        <img src={delete_icon} alt="remove" />
      </button>
    </div>
  );
}
