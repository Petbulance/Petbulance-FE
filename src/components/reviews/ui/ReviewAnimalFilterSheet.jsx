import { useState, useEffect } from 'react'; // useMemo 대신 useState, useEffect 사용

import greenCheck from '@/assets/images/icons/green_check.svg';
import { GreenBtn } from '@/components/commons/button/greenBtn';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';

export function ReviewAnimalFilterSheet({ filterState, onApply }) {
  const [tempSelected, setTempSelected] = useState(filterState.animal || []);

  useEffect(() => {
    setTempSelected(filterState.animal || []);
  }, [filterState.animal]);

  const handleAnimalClick = (englishCode) => {
    setTempSelected((prevList) => {
      if (prevList.includes(englishCode)) {
        return prevList.filter((item) => item !== englishCode);
      } else {
        return [...prevList, englishCode];
      }
    });
  };

  const handleApplyClick = () => {
    onApply({ animal: tempSelected });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-10 text-[25px] font-medium">
        <div className="bg-white">
          {Object.entries(ANIMAL_CATEGORY_KO).map(([code, name]) => {
            const isActive = tempSelected.includes(code);

            return (
              <button
                key={code}
                type="button"
                onClick={() => handleAnimalClick(code)}
                className="flex w-full items-center justify-between pt-10"
              >
                <span
                  className={`${isActive ? 'text-[#2DA969]' : 'text-[#616161]'}`}
                >
                  {name}
                </span>
                {isActive && <img src={greenCheck} alt="green_check_icon" />}
              </button>
            );
          })}
        </div>
      </div>

      <GreenBtn name="후기 보기" onClick={handleApplyClick} />
    </div>
  );
}
