export const ANIMAL_GROUPS = {
  소형포유류: [
    'HAMSTER',
    'GUINEAPIG',
    'CHINCHILLA',
    'RABBIT',
    'HEDGEHOG',
    'FERRET',
    'SUGAR_GLIDER',
    'PRAIRIE_DOG',
    'FLYING_SQUIRREL',
    'OTHER_SMALL_MAMMALS',
  ],
  조류: ['PARROT', 'FINCH_TYPES', 'OTHER_BIRDS'],
  파충류: ['GECKO', 'OTHER_LIZARDS', 'SNAKE', 'TURTLE', 'OTHER_REPTILES'],
  양서류: ['FROG', 'AXOLOTL', 'SALAMANDER', 'OTHER_AMPHIBIANS'],
  어류: ['ORNAMENTAL_FISH'],
};

export const ANIMAL_NAME_KO = {
  // 소형포유류
  HAMSTER: '햄스터',
  GUINEAPIG: '기니피그',
  CHINCHILLA: '친칠라',
  RABBIT: '토끼',
  HEDGEHOG: '고슴도치',
  FERRET: '페럿',
  SUGAR_GLIDER: '슈가글라이더',
  PRAIRIE_DOG: '프레리독',
  FLYING_SQUIRREL: '하늘다람쥐',
  OTHER_SMALL_MAMMALS: '기타 소형포유류',

  // 조류
  PARROT: '앵무새',
  FINCH_TYPES: '핀치류',
  OTHER_BIRDS: '기타 조류',

  // 파충류
  GECKO: '게코',
  OTHER_LIZARDS: '기타 도마뱀',
  SNAKE: '뱀',
  TURTLE: '거북이',
  OTHER_REPTILES: '기타 파충류',

  // 양서류
  FROG: '개구리',
  AXOLOTL: '우파루파',
  SALAMANDER: '도롱뇽',
  OTHER_AMPHIBIANS: '기타 양서류',

  // 어류
  ORNAMENTAL_FISH: '관상어',
};

export const ANIMAL_CATEGORY_KO = {
  SMALLMAMMALS: '소형포유류',
  AVIAN: '조류',
  REPTILE: '파충류',
  AMPHIBIAN: '양서류',
  FISH: '어류',
};

export const ANIMAL_CATEGORY_VALUE = [
  { value: 'SMALLMAMMALS', label: '소형포유류' },
  { value: 'AVIAN', label: '조류' },
  { value: 'REPTILE', label: '파충류' },
  { value: 'AMPHIBIAN', label: '양서류' },
  { value: 'FISH', label: '어류' },
];

export const ANIMAL_GROUPS_VALUE = {
  SMALLMAMMALS: [
    { value: 'HAMSTER', label: '햄스터' },
    { value: 'RABBIT', label: '토끼' },
    { value: 'GUINEAPIG', label: '기니피그' },
    { value: 'SUGAR_GLIDER', label: '슈가글라이더' },
    { value: 'CHINCHILLA', label: '친칠라' },
    { value: 'FERRET', label: '페럿' },
    { value: 'PRAIRIE_DOG', label: '프레리도그' },
    // { value: 'HEDGEHOG', label: '고슴도치' },
    { value: 'FLYING_SQUIRREL', label: '하늘다람쥐' },
    { value: 'OTHER_SMALL_MAMMALS', label: '기타' },
  ],
  AVIAN: [
    { value: 'PARROT', label: '앵무새' },
    { value: 'FINCH_TYPES', label: '핀치류' },
    { value: 'OTHER_BIRDS', label: '기타' },
  ],
  REPTILE: [
    { value: 'GECKO', label: '게코' },
    { value: 'OTHER_LIZARDS', label: '기타 도마뱀' },
    // { value: 'SNAKE', label: '뱀' },
    { value: 'TURTLE', label: '거북이' },
    { value: 'OTHER_REPTILES', label: '기타' },
  ],
  AMPHIBIAN: [
    { value: 'FROG', label: '개구리' },
    { value: 'AXOLOTL', label: '우파루파' },
    { value: 'SALAMANDER', label: '도롱뇽' },
    { value: 'OTHER_AMPHIBIANS', label: '기타' },
  ],
  FISH: [{ value: 'ORNAMENTAL_FISH', label: '관상어' }],
};
