/* 콘텐츠 관리 임시 데이터 (50개) */

export const CONTENTS = Array.from({ length: 50 }).map((_, i) => {
  const TYPES = ['banner', 'notice'];
  const CATEGORIES = ['이벤트', '공지', '광고'];
  const STATUSES = ['게시', '중단'];

  const type = TYPES[i % 2];
  const status = STATUSES[i % 2];

  return {
    id: i + 1,
    type, // banner | notice
    category: CATEGORIES[i % CATEGORIES.length],
    title:
      type === 'banner'
        ? `배너 콘텐츠 제목 ${i + 1}`
        : `공지사항 제목 ${i + 1}`,
    status,
    period:
      i % 3 === 0
        ? '상시게시'
        : `24.10.${String((i % 28) + 1).padStart(2, '0')} ~ 24.11.${String(
            (i % 28) + 1
          ).padStart(2, '0')}`,
    createdAt: `2024.10.${String((i % 28) + 1).padStart(2, '0')}`,
    isBanner: true,
  };
});
