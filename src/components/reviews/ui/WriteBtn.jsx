import pencil_icon from '@/assets/images/icons/pencil_icon.svg';

export function WriteBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="pointer-events-auto rounded-full bg-[#2DA969] p-[11.43px] shadow-[0_0_9.14px_0_rgba(0,0,0,0.15),0_0_2.29px_0_rgba(0,0,0,0.24)]"
    >
      <img src={pencil_icon} alt="write_review" />
    </button>
  );
}
