import { useState } from 'react';

import arrow from '@/assets/images/icons/arrow_header.svg';
import Bell from '@/assets/images/icons/bell.svg';
import Search from '@/assets/images/icons/community_search.svg';

export function CommunityHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('전체');
  const animalTypes = [
    '전체',
    '소형포유류',
    '조류',
    '파충류',
    '양서류',
    '어류',
  ];

  return (
    <div className="relative flex items-center justify-between border-b-[1px] border-[#E0E0E0] px-1 pl-5">
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1 text-[20px] font-semibold text-[#1E1E1E]"
        >
          {selectedType}
          <img src={arrow} />
        </button>

        {isOpen && (
          <div className="absolute top-[34px] left-0 z-20 w-[180px] rounded-[8px] bg-white px-2 py-2 shadow-[0_0_8px_rgba(0,0,0,0.15),0_0_2px_rgba(0,0,0,0.24)]">
            {animalTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setIsOpen(false);
                }}
                className={`block w-full rounded-[6px] px-2 py-2 text-left text-[19px] text-[#424242] ${
                  selectedType === type ? 'bg-[#EEEEEE]' : ''
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center text-[#525252]">
        <img src={Search} />
        <img src={Bell} />
      </div>
    </div>
  );
}
