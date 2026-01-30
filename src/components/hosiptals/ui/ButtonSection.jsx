import SelectArrow from '@/assets/images/icons/SelectArrow';
import SortDropdown from '@/assets/images/icons/SortDropdown';
import { ANIMAL_GROUPS } from '@/data/animalSort';

import { SelectButton } from './SelectButton';

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
  const getGroupLabel = (selectedAnimals) => {
    if (!selectedAnimals || selectedAnimals.length === 0) return '동물종';
    const firstSelected = selectedAnimals[0];

    const groupName = Object.keys(ANIMAL_GROUPS).find((group) =>
      ANIMAL_GROUPS[group].includes(firstSelected)
    );

    return groupName || '동물종';
  };

  const animalLabel = getGroupLabel(state.animal);

  const buttons = [
    {
      id: 'region',
      label: state.city ? `${state.region}` : '지역',
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
