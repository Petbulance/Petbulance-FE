export const ADMIN_ACCOUNTS = Array.from({ length: 42 }).map((_, i) => ({
  id: `admin_${String(i + 1).padStart(2, '0')}`,
  name: ['김영욱', '이민규', '박수진', '최민호','홍길동,','김수현','황인범','손흥민','표도이','신민규','박지성'][i % 4],
  email: `admin${i + 1}@petbulance.com`,
}));
