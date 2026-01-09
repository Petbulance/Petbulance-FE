export function GreenBtnWrap({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-1 rounded-full bg-[#2DA969] px-4 py-2 text-[18px] font-medium text-white shadow-md transition-colors hover:bg-[#258d58]"
    >
      {children}
    </button>
  );
}
