export const MOCK_CS = Array.from({ length: 54 }).map((_, i) => {
  const TYPES = ['1:1', '제휴'];
  const STATUSES = ['대기', '대기', '완료'];

  const type = TYPES[i % 2];

  return {
    id: i + 1,
    type,
    status: STATUSES[i % STATUSES.length],
    author: type === '1:1' ? `유저${(i % 7) + 1}` : `기업담당자${(i % 5) + 1}`,
    company: type === '제휴' ? `(주)제휴기업${(i % 4) + 1}` : null,
    date: `2024.10.${String((i % 28) + 1).padStart(2, '0')}`,
    title:
      type === '1:1' ? `문의 제목 예시 ${i + 1}` : `제휴/광고 제안 ${i + 1}`,
    content:
      type === '1:1'
        ? `고객 문의 내용 예시입니다. 서비스 이용 중 발생한 문제에 대한 문의 ${i + 1}`
        : `기업 제휴 및 광고 관련 제안 내용입니다. 미팅 요청 및 제안서 전달 ${i + 1}`,
    answer: null,
    answeredAt: null,
  };
});
