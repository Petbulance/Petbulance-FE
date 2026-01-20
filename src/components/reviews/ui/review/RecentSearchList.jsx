import cancle_icon from '@/assets/images/icons/cancle_icon.svg';
import clock_icon from '@/assets/images/icons/clock_icon.svg';

export function RecentSearchList({ keywords, onDelete }) {
  return (
    <ul className="mt-3 flex flex-col gap-4">
      {keywords.map((item) => (
        <li key={item.id} className="flex items-center justify-between">
          <button className="flex items-center gap-2">
            <img src={clock_icon} alt="clock_icon" />
            <span className="cursor-pointer text-[19px] text-[#424242] hover:underline">
              {item.text}
            </span>
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="rounded-full hover:bg-gray-100"
            aria-label="검색어 삭제"
          >
            <img src={cancle_icon} alt="delete" />
          </button>
        </li>
      ))}
    </ul>
  );
}
