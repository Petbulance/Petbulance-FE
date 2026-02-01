// AnimalTypeSelect.jsx
import Select from 'react-select';

// animalTypes.ts
const ANIMAL_TYPE_OPTIONS = [
  // 소동물
  { value: 'HAMSTER', label: '햄스터' },
  { value: 'GUINEAPIG', label: '기니피그' },
  { value: 'CHINCHILLA', label: '친칠라' },
  { value: 'RABBIT', label: '토끼' },
  { value: 'HEDGEHOG', label: '고슴도치' },
  { value: 'FERRET', label: '페럿' },
  { value: 'SUGAR_GLIDER', label: '슈가글라이더' },
  { value: 'PRAIRIE_DOG', label: '프레리도그' },
  { value: 'FLYING_SQUIRREL', label: '하늘다람쥐' },
  { value: 'OTHER_SMALL_MAMMALS', label: '기타 소동물' },

  // 조류
  { value: 'PARROT', label: '앵무새' },
  { value: 'FINCH_TYPES', label: '핀치류' },
  { value: 'OTHER_BIRDS', label: '기타 조류' },

  // 파충류
  { value: 'GECKO', label: '게코' },
  { value: 'OTHER_LIZARDS', label: '기타 도마뱀' },
  { value: 'SNAKE', label: '뱀' },
  { value: 'TURTLE', label: '거북이' },
  { value: 'OTHER_REPTILES', label: '기타 파충류' },

  // 양서류
  { value: 'FROG', label: '개구리' },
  { value: 'AXOLOTL', label: '우파루파' },
  { value: 'SALAMANDER', label: '도롱뇽' },
  { value: 'OTHER_AMPHIBIANS', label: '기타 양서류' },

  // 어류
  { value: 'ORNAMENTAL_FISH', label: '관상어' },
];

export default function AnimalTypeSelect({ value = [], onChange }) {
  const selectedOptions = ANIMAL_TYPE_OPTIONS.filter((opt) =>
    value.includes(opt.value)
  );

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        진료 가능 종
      </label>

      <Select
        isMulti
        options={ANIMAL_TYPE_OPTIONS}
        value={selectedOptions}
        onChange={(selected) => onChange(selected.map((opt) => opt.value))}
        placeholder="진료 가능 종 선택"
        classNamePrefix="react-select"
      />
    </div>
  );
}
