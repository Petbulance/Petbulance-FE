/* =========================
 * 관리자 활동 로그 Mock
 * 케이스별 12개
 * ========================= */

const admins = ['김영욱', '이민규', '박수진', '최민호'];
const results = ['성공', '실패'];

const baseDate = new Date('2024-10-24T10:00:00');

const formatDate = (offsetMinutes) => {
  const d = new Date(baseDate);
  d.setMinutes(d.getMinutes() - offsetMinutes);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd} ${hh}:${mi}:${ss}`;
};

const pick = (arr, i) => arr[i % arr.length];

/* =========================
 * 1. 유저 관리 로그 (12)
 * ========================= */
const USER_LOGS = Array.from({ length: 12 }).map((_, i) => ({
  id: `USER_${i + 1}`,
  datetime: formatDate(i * 10),
  adminName: pick(admins, i),
  page: '유저관리',
  action: `유저(ID:${i + 1}) ${
    ['커뮤니티 정지', '리뷰 정지', '탈퇴 처리', '경고 해제'][i % 4]
  }`,
  result: pick(results, i),
}));

/* =========================
 * 2. 병원 관리 로그 (12)
 * ========================= */
const HOSPITAL_LOGS = Array.from({ length: 12 }).map((_, i) => ({
  id: `HOSP_${i + 1}`,
  datetime: formatDate(200 + i * 10),
  adminName: pick(admins, i),
  page: '병원관리',
  action: `병원(ID:H_${100 + i}) ${
    ['정보 수정', '운영시간 변경', '전화번호 수정', '태그 수정'][i % 4]
  }`,
  result: pick(results, i + 1),
}));

/* =========================
 * 3. 콘텐츠 관리 로그 (12)
 * ========================= */
const CONTENT_LOGS = Array.from({ length: 12 }).map((_, i) => ({
  id: `CONTENT_${i + 1}`,
  datetime: formatDate(400 + i * 10),
  adminName: pick(admins, i),
  page: '콘텐츠관리',
  action: `공지사항 ${['등록', '수정', '삭제'][i % 3]}`,
  result: pick(results, i),
}));

/* =========================
 * 4. 시스템 자동 처리 로그 (12)
 * ========================= */
const SYSTEM_LOGS = Array.from({ length: 12 }).map((_, i) => ({
  id: `SYSTEM_${i + 1}`,
  datetime: formatDate(600 + i * 10),
  adminName: '시스템',
  page: '자동처리',
  action: pick(['배치 작업 실행', '통계 집계', '로그 정리'], i),
  result: '성공',
}));

/* =========================
 * 최종 Export
 * ========================= */
export const ACTIVITY_LOGS = [
  ...USER_LOGS,
  ...HOSPITAL_LOGS,
  ...CONTENT_LOGS,
  ...SYSTEM_LOGS,
];
