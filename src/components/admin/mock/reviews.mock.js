/* 리뷰 목업 데이터 (13건) */
export const REVIEWS = [
  {
    id: 'REV_0001',
    hospital: '아크리스 동물병원',
    user: '도마뱀집사',
    animal: '비어디 드래곤',
    date: '2024.10.01',
    status: '신고',
    rating: 4.5,
    count :2,
    title: '특수동물 진료 정말 잘해요',
    content: '도마뱀 진료를 정말 꼼꼼하게 봐주셨습니다.',

    ratings: {
      result: 5,
      kindness: 4,
      price: 4,
    },

    ocrInfo: {
      hospitalName: '아크리스 동물병원',
      address: '서울 강남구 테헤란로 123',
      latlng: '37.50123 / 127.03987',
      items: [
        { name: '진료비', price: 30000 },
        { name: '엑스레이', price: 50000 },
      ],
      total: 80000,
    },
  },

  {
    id: 'REV_0002',
    hospital: '에코 특수동물병원',
    user: '나나맘',
    animal: '앵무새',
    date: '2024.10.02',
    status: '게시',
    rating: 3.8,

    title: '앵무새 진료 후기',
    content: '친절하긴 했지만 대기 시간이 길었어요.',
    count :6,
    ratings: {
      result: 4,
      kindness: 4,
      price: 3,
    },

    ocrInfo: {
      hospitalName: '에코 특수동물병원',
      address: '서울 서초구 서초대로 88',
      latlng: '37.49210 / 127.01345',
      items: [
        { name: '기본 진료', price: 25000 },
        { name: '약 처방', price: 15000 },
      ],
      total: 40000,
    },
  },

  ...Array.from({ length: 11 }).map((_, i) => ({
    id: `REV_00${i + 3}`,
    hospital: `샘플 동물병원 ${i + 3}`,
    user: `유저${i + 3}`,
    animal: ['고슴도치', '토끼', '햄스터'][i % 3],
    date: `2024.10.${String(i + 3).padStart(2, '0')}`,
    status: i % 2 === 0 ? '신고' : '게시',
    rating: 3 + (i % 3),
   count : 3+i,
    title: '리뷰 제목 예시',
    content: '리뷰 본문 예시입니다.',

    ratings: {
      result: 3 + (i % 3),
      kindness: 4,
      price: 3,
    },

    ocrInfo: {
      hospitalName: `샘플 동물병원 ${i + 3}`,
      address: '서울 어딘가',
      latlng: '37.00000 / 127.00000',
      items: [
        { name: '진료비', price: 20000 },
        { name: '검사비', price: 30000 },
      ],
      total: 50000,
    },
  })),
];
