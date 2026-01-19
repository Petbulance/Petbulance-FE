import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Camera } from '@/assets/images/icons/Camera';
import { Check } from '@/assets/images/icons/Check';
import SelectArrow from '@/assets/images/icons/SelectArrow';
import { SelectButton } from '@/components/hosiptals/ui/SelectButton';

export function ReviewFilterBar() {
  const [selected, setSelected] = useState([]);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const buttons = [
    { label: '지역', rightIcon: <SelectArrow /> },
    { label: '동물종', rightIcon: <SelectArrow /> },
    { label: '사진 후기', leftIcon: <Camera /> },
    { label: '영수증인증', leftIcon: <Check /> },
  ];

  //클릭시 상태 변경
  const toggleSelection = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  //모달 오픈 함수
  const openSheet = (type) => {
    const next = new URLSearchParams(params);
    next.set('sheet', type);
    navigate(`/index/reviews?${next.toString()}`, { replace: true });
  };

  //필터 버튼 클릭시 작동 함수
  const handleClick = (label) => {
    if (label === '지역') {
      toggleSelection(label);
      return openSheet('region');
    }
    if (label === '동물종') {
      toggleSelection(label);
      return openSheet('animal');
    }

    return toggleSelection(label);
  };

  return (
    <div className="no-scrollbar absolute right-0 left-0 z-50 flex justify-between overflow-x-auto px-6 py-3">
      <div className="flex gap-2">
        {buttons.map((button) => {
          const isSelected = selected.includes(button.label);

          return (
            <SelectButton
              key={button.label}
              label={button.label}
              leftIcon={button.leftIcon}
              rightIcon={button.rightIcon}
              isSelected={isSelected}
              onClick={() => handleClick(button.label)}
            />
          );
        })}
      </div>

      <button className="flex items-center justify-center gap-1">
        <span className="text-[18px] font-medium text-[#1E1E1E]">최신순</span>
        <SelectArrow />
      </button>
    </div>
  );
}
