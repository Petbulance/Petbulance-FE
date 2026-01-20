import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SelectArrow from '@/assets/images/icons/SelectArrow';
import SortDropdown from '@/assets/images/icons/SortDropdown';

import { SelectButton } from './SelectButton';

export function ButtonSection() {
  const [selected, setSelected] = useState([]);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const buttons = [
    { label: '지역', rightIcon: <SelectArrow /> },
    { label: '동물종', rightIcon: <SelectArrow /> },
    { label: '가까운순', leftIcon: <SortDropdown /> },
    { label: '진료중' },
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
    navigate(`/index/hospitals?${next.toString()}`, { replace: true });
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
    <div className="no-scrollbar absolute z-50 flex w-full gap-2 overflow-x-auto px-6 py-3">
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
  );
}
