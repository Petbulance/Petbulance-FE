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
      // 이미 선택된 거면 제거, 아니면 추가
      if (prevList.includes(englishCode)) {
        return prevList.filter((item) => item !== englishCode);
      } else {
        return [...prevList, englishCode];
      }
    });
  };

  const handleApplyClick = () => {
    // 2. 부모에게 보낼 때는 객체 형태로 포장해서 전송
    // ReviewMain의 handleApplyFilter가 { ...prev, ...newData } 로 받기 때문
    onApply({ animal: tempSelected });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-10 text-[25px] font-medium">
        <div className="bg-white">
          {Object.entries(ANIMAL_CATEGORY_KO).map(([code, name]) => {
            // 로컬 상태(tempSelected)를 기준으로 체크 표시 확인
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

      {/* 3. 버튼 클릭 시 handleApplyClick 실행 */}
      <GreenBtn name="후기 보기" onClick={handleApplyClick} />
    </div>
  );
}
