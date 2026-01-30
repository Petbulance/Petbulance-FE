export function GreenBtn({ name, onClick }) {
  return (
    <div className="sticky bottom-0 z-50 px-6 pt-3.25 pb-8">
      <button
        onClick={onClick}
        className="w-full rounded-[16px] bg-[#2DA969] py-5 text-[27px] font-medium text-white shadow-lg transition-transform hover:bg-[#258d58] active:scale-[0.98]"
      >
        {name}
      </button>
    </div>
  );
}
