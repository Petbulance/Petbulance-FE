export function GreenBtn({ name }) {
  return (
    <div className="sticky bottom-0 z-50 px-6 pt-3.25 pb-8">
      <button className="rounded-4 w-full bg-[#2DA969] py-5 text-[27px] font-medium text-white shadow-lg transition-transform hover:bg-[#258d58] active:scale-[0.98]">
        {name}
      </button>
    </div>
  );
}
