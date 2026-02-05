import { useMemo, useState } from 'react';

import greenCheck from '@/assets/images/icons/green_check.svg';
import { GreenBtn } from '@/components/commons/button/greenBtn';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';

export function ReviewAnimalFilterSheet({
  filterState,
  onApply,
  setFilterState,
}) {
  const selectedAnimals = useMemo(
    () => filterState.animal || [],
    [filterState.animal]
  );

  const handleAnimalClick = (englishCode) => {
    setFilterState((prev) => {
      const currentList = prev.animal || [];
      const newList = currentList.includes(englishCode)
        ? currentList.filter((item) => item !== englishCode)
        : [...currentList, englishCode];

      return {
        ...prev,
        animal: newList,
      };
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-10 text-[25px] font-medium">
        <div className="bg-white">
          {Object.entries(ANIMAL_CATEGORY_KO).map(([code, name]) => {
            const isActive = selectedAnimals.includes(code);

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

      <GreenBtn name="후기 보기" onClick={() => onApply(selectedAnimals)} />
    </div>
  );
}
