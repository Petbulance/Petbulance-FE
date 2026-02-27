import { useEffect, useRef } from 'react';

import arrow from '@/assets/images/icons/down_arrow.svg';

const SORT_OPTIONS = ['최신순', '인기순'];

export function SortDropdown({
  selectedSort,
  isSortOpen,
  onToggleSort,
  onSelectSort,
  onCloseSort,
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        onCloseSort();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCloseSort]);

  return (
    <div
      ref={dropdownRef}
      className="relative px-[26px] py-2 text-[18px] font-medium text-[#1E1E1E]"
    >
      <button onClick={onToggleSort} className="flex items-center gap-1">
        {selectedSort} <img src={arrow} />
      </button>

      {isSortOpen && (
        <div className="absolute top-[42px] left-6 z-20 w-[160px] rounded-[8px] bg-white px-2 py-2 shadow-[0_0_8px_rgba(0,0,0,0.15),0_0_2px_rgba(0,0,0,0.24)]">
          {SORT_OPTIONS.map((sort) => (
            <button
              key={sort}
              onClick={() => onSelectSort(sort)}
              className={`block w-full rounded-[6px] px-2 py-2 text-left text-[19px] text-[#424242] ${
                selectedSort === sort ? 'bg-[#EEEEEE]' : ''
              }`}
            >
              {sort}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
