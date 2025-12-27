// src/mocks/hospitals.mock.js

const NAMES = [
  '다사랑동물병원',
  '가나동물병원',
  '나눔동물의료센터',
  '에코특수동물병원',
  '우성동물센터',
  '하니특수병원',
  '미래동물의원',
  '서울특수동물병원',
  '그린펫동물병원',
  '온누리동물의료원',
];

const DISTRICTS = [
  '강남구',
  '서초구',
  '송파구',
  '마포구',
  '성동구',
  '용산구',
  '영등포구',
  '동작구',
  '광진구',
  '중랑구',
];

const TAG_SETS = [
  ['개', '고양이'],
  ['개', '고양이', '특수동물'],
  ['파충류', '양서류'],
  ['조류', '특수동물'],
  ['소형 포유류'],
  ['고슴도치', '토끼'],
];

const INTRO_TEMPLATES = [
  '반려동물의 건강을 최우선으로 생각합니다.',
  '특수동물 진료 경험이 풍부한 병원입니다.',
  '최신 의료 장비와 전문 의료진이 상주합니다.',
  '24시간 응급 진료가 가능합니다.',
  '지역 주민과 함께하는 신뢰받는 동물병원입니다.',
];

export const HOSPITALS = Array.from({ length: 100 }).map((_, i) => {
  const name = `${NAMES[i % NAMES.length]} ${i + 1}`;
  const district = DISTRICTS[i % DISTRICTS.length];
  const tags = TAG_SETS[i % TAG_SETS.length];
  const intro = INTRO_TEMPLATES[i % INTRO_TEMPLATES.length];

  return {
    id: `PET_HOSP_${String(i + 1).padStart(6, '0')}`,
    name,
    address: `서울 ${district} 역삼로 ${100 + i}번지`,
    phone: `02-${1000 + (i % 900)}-${1000 + (i % 900)}`,
    tags,
    intro,
  };
});
