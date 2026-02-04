import SelectArrow from '@/assets/images/icons/SelectArrow';
import SortDropdown from '@/assets/images/icons/SortDropdown';

import { SelectButton } from './SelectButton';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';

const SORT_LABELS = {
  distance: '가까운 순',
  rating: '평점 높은 순',
  reviewCount: '리뷰 많은 순',
};

export function ButtonSection({
  state,
  onOpenSheet,
  onOpenSort,
  onToggleOpen,
}) {
  //동물종 레이블 설정 함수
  const getGroupLabel = (selectedAnimals) => {
    if (!selectedAnimals || selectedAnimals.length === 0) return '동물종';

    const firstCode = selectedAnimals[0];
    const firstLabel = ANIMAL_CATEGORY_KO[firstCode] || firstCode;

    const count = selectedAnimals.length;

    return count > 1 ? `${firstLabel} 외 ${count - 1}` : firstLabel;
  };

  const animalLabel = getGroupLabel(state.animal);

  const buttons = [
    {
      id: 'region',
      label: state.region || state.city || '지역',
      isHighlighted: false,
      rightIcon: <SelectArrow />,
    },
    {
      id: 'animal',
      label: animalLabel,
      isHighlighted: false,
      rightIcon: <SelectArrow />,
    },
    {
      id: 'sort',
      label: SORT_LABELS[state.sort],
      isHighlighted: false,
      leftIcon: <SortDropdown />,
    },
    {
      id: 'open',
      label: '진료중',
      isHighlighted: state.isOpen,
    },
  ];

  const handleClick = (id) => {
    if (id === 'region') return onOpenSheet('region');
    if (id === 'animal') return onOpenSheet('animal');
    if (id === 'sort') return onOpenSort();
    if (id === 'open') return onToggleOpen();
  };

  return (
    <div className="no-scrollbar absolute z-50 flex w-full gap-2 overflow-x-auto px-6 py-3">
      {buttons.map((button) => {
        return (
          <SelectButton
            key={button.id}
            label={button.label}
            leftIcon={button.leftIcon}
            rightIcon={button.rightIcon}
            isSelected={button.isHighlighted}
            onClick={() => handleClick(button.id)}
          />
        );
      })}
    </div>
  );
}
