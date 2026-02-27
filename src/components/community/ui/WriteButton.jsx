import plus from '@/assets/images/icons/plus.svg';

export function WriteButton() {
  return (
    <div className="pointer-events-none sticky bottom-4 z-10 flex justify-end px-4">
      <button className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2DA969] shadow-lg">
        <img src={plus} />
      </button>
    </div>
  );
}
