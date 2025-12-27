export const COMMUNITY_REPORTS = Array.from({ length: 20 }).map((_, i) => {
  const TYPES = ['게시글', '댓글'];
  const STATUSES = ['대기', '완료', '반려'];
  const CASES = [
    '욕설/비방',
    '광고/홍보',
    '도배',
    '음란물',
    '혐오 발언',
    '허위 정보',
    '개인정보 노출',
    '저작권 침해',
    '사기 의심',
    '도박',
    '정치 선동',
    '폭력적 표현',
    '기타',
  ];

  return {
    id: i + 1,
    type: TYPES[i % TYPES.length],
    content: `문제성 콘텐츠 예시 문장 ${i + 1}`,
    caseType: CASES[i % CASES.length],
    author: `작성자${(i % 7) + 1}`,
    reporter: `신고자${(i % 5) + 1}`,
    date: `2024.10.${String((i % 28) + 1).padStart(2, '0')}`,
    reportDate: `2024.10.${String((i % 28) + 1).padStart(2, '0')}`,
    status: STATUSES[i % STATUSES.length],
  };
});
