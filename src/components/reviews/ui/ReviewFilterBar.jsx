import { Camera } from '@/assets/images/icons/Camera';
import { Check } from '@/assets/images/icons/Check';
import down_arrow from '@/assets/images/icons/down_arrow.svg';
import SelectArrow from '@/assets/images/icons/SelectArrow';
import { SelectButton } from '@/components/hosiptals/ui/SelectButton';
import { ANIMAL_CATEGORY_KO } from '@/data/animalSort';
import { sortLabels } from '@/data/reviewSort';

export function ReviewFilterBar({
  onOpenSheet,
  currentFilters = {},
  onToggleFilter,
  onSortClick,
}) {
  const selectedAnimals = currentFilters?.animal || [];
  let animalLabel = '동물종';

  if (selectedAnimals.length > 0) {
    const firstAnimalKo =
      ANIMAL_CATEGORY_KO[selectedAnimals[0]] || selectedAnimals[0];
    animalLabel =
      selectedAnimals.length > 1
        ? `${firstAnimalKo} 외 ${selectedAnimals.length - 1}`
        : firstAnimalKo;
  }

  const getRegionLabel = () => {
    const { city, region } = currentFilters;

    if (!city) return '지역';

    if (!region || !Array.isArray(region) || region.length === 0) {
      return city;
    }

    const firstRegion = region[0];
    const count = region.length;

    return count > 1 ? `${firstRegion} 외 ${count - 1}` : firstRegion;
  };

  const currentSortLabel = sortLabels?.[currentFilters?.sort] || '최신순';

  const buttons = [
    {
      id: 'region',
      label: getRegionLabel(),
      isHighlighted: !!currentFilters?.city,
      rightIcon: <SelectArrow />,
    },
    {
      id: 'animal',
      label: animalLabel,
      isHighlighted: selectedAnimals.length > 0,
      rightIcon: <SelectArrow />,
    },
    {
      id: 'hasImage',
      label: '사진 후기',
      isHighlighted: !!currentFilters?.image,
      leftIcon: (
        <Camera color={currentFilters?.image ? '#067DFD' : '#9E9E9E'} />
      ),
    },
    {
      id: 'isVerified',
      label: '영수증인증',
      isHighlighted: !!currentFilters?.receipt,
      leftIcon: (
        <Check color={currentFilters?.receipt ? '#067DFD' : '#9E9E9E'} />
      ),
    },
  ];

  const handleClick = (id) => {
    if (id === 'region' || id === 'animal') {
      return onOpenSheet(id);
    }
    if (onToggleFilter) {
      onToggleFilter(id);
    }
  };

  return (
    <div className="no-scrollbar absolute right-0 left-0 z-50 flex justify-between overflow-x-auto bg-white px-6 py-3">
      <div className="flex gap-2">
        {buttons.map((button) => (
          <SelectButton
            key={button.id}
            label={button.label}
            leftIcon={button.leftIcon}
            rightIcon={button.rightIcon}
            isSelected={button.isHighlighted}
            onClick={() => handleClick(button.id)}
          />
        ))}
      </div>

      <button
        onClick={onSortClick}
        className="ml-4 flex shrink-0 items-center gap-1 text-[18px] font-medium text-[#1E1E1E]"
      >
        {currentSortLabel}
        <img src={down_arrow} alt="toggle" />
      </button>
    </div>
  );
}
