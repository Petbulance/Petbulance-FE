import { useMemo } from 'react';

import greenCheck from '@/assets/images/icons/green_check.svg';
import { GreenBtn } from '@/components/commons/button/greenBtn';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';

export function ReviewAnimalFilterSheet({
  filterState,
  setFilterState,
  onApply,
}) {
  const categoryKeys = useMemo(() => Object.keys(ANIMAL_CATEGORY_KO), []);

  const handleAnimalClick = (englishKey) => {
    setFilterState((prev) => ({
      ...prev,
      animal: englishKey,
    }));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-10 text-[25px] font-medium">
        <div className="bg-white">
          {categoryKeys.map((key) => {
            // 3. 현재 저장된 값과 키가 일치하는지만 확인 (매우 단순해짐)
            const isActive = filterState.animal === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleAnimalClick(key)}
                className="flex w-full items-center justify-between pt-10"
              >
                <span
                  className={`${isActive ? 'text-[#2DA969]' : 'text-[#616161]'}`}
                >
                  {ANIMAL_CATEGORY_KO[key]} {/* 한글 명칭 표시 */}
                </span>
                {isActive && <img src={greenCheck} alt="green_check_icon" />}
              </button>
            );
          })}
        </div>
      </div>

      <GreenBtn name="후기 보기" onClick={() => onApply(filterState.animal)} />
    </div>
  );
}
