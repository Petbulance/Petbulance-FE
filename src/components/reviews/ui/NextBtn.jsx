export function NextBtn({ label, onClick, isComplete }) {
  return (
    <div className="pb-8">
      <button
        type="button"
        onClick={onClick}
        disabled={!isComplete}
        className={`w-full rounded-[16px] py-5 text-[20px] font-medium text-white shadow-md transition-all ${
          isComplete
            ? 'bg-[#2DA969] active:scale-[0.98]'
            : 'cursor-not-allowed bg-[#E0E0E0]'
        }`}
      >
        {label}
      </button>
    </div>
  );
}
