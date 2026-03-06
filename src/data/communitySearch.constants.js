export const INITIAL_RECENT_KEYWORDS = [
  { id: 1, text: '골절' },
  { id: 2, text: '탈구' },
  { id: 3, text: '타박상' },
  { id: 4, text: '햄스터골절' },
];

export const MOCK_POST_RESULTS = [
  {
    id: 1,
    nickname: '햄찌집사',
    category: '건강/질병',
    animal: '소형포유류',
    title: '햄스터 골절 의심 증상 질문',
    content: '다리를 절뚝이는데 바로 병원 가야 할까요?',
    time: '1시간 전',
    views: 35,
    likes: 5,
    comments: 3,
    hasImage: false,
  },
  {
    id: 2,
    nickname: '도치아빠',
    category: '자유수다',
    animal: '소형포유류',
    title: '골절 치료 후 케이지 환경 어떻게 바꾸셨나요?',
    content: '2층 구조 말고 평지형으로 바꾸는 게 좋을지 고민입니다.',
    time: '6시간 전',
    views: 82,
    likes: 11,
    comments: 7,
    hasImage: true,
  },
  {
    id: 3,
    nickname: '러버덕',
    category: '질문',
    animal: '조류',
    title: '새 발목 골절 이후 회복 기간',
    content: '비슷한 경험 있는 분들 회복 기간 알려주세요.',
    time: '어제',
    views: 40,
    likes: 2,
    comments: 1,
    hasImage: false,
  },
];

export const MOCK_COMMENT_RESULTS = [
  {
    id: 1,
    category: '질문',
    animal: '엑조틱',
    content:
      '함깡이 관련한 통원병원이 있는데, 원장선생님이 특수동물 진료를 정말 잘보셔요. 13년째 다니는 중입니다.',
    nickname: '넬네엘',
    date: '2026.02.26',
    postTitle: '엑스틱 체중 감소',
    hasImage: true,
  },
  {
    id: 2,
    category: '질문',
    animal: '엑조틱',
    content:
      '함깡이 관련한 통원병원이 있는데, 원장선생님이 특수동물 진료를 정말 잘보셔요. 13년째 다니는 중입니다.',
    nickname: '넬네엘',
    date: '2026.02.26',
    postTitle: '엑스틱 체중 감소',
    hasImage: false,
  },
  {
    id: 3,
    category: '질문',
    animal: '엑조틱',
    content:
      '골절 이후 케이지 평지 세팅으로 바꾸니까 회복이 빨랐어요. 이동 동선은 짧게 유지하는 게 중요합니다.',
    nickname: '햄찌언니',
    date: '2026.02.25',
    postTitle: '케이지 환경 질문',
    hasImage: false,
  },
  {
    id: 4,
    category: '건강/질병',
    animal: '소형포유류',
    content:
      '햄스터 다리 골절일 때는 바로 내원하시는 게 좋아요. 지연되면 보정이 어려워질 수 있습니다.',
    nickname: '도치아빠',
    date: '2026.02.24',
    postTitle: '골절 의심 증상',
    hasImage: true,
  },
];
