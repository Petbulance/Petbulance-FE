import NoticeList from '@/components/user/noti/NoticeList.jsx';

const NOTIFICATIONS = [
  {
    id: 1,
    type: '이벤트',
    title: '펫플러스 오픈 기념 리뷰 작성 이벤트',
    date: '2025-11-30',
    isNotice: true,
    content: `펫플러스 여러분 안녕하세요!

펫플러스가 오픈하여 이벤트를 준비했습니다.
앱을 통해 병원 방문 후 리뷰를 남겨주세요.

이벤트는 11월 30일까지 진행됩니다.
감사합니다 💚`,
  },
  {
    id: 2,
    type: '공지',
    title: '시스템 점검 안내 (11/13 01:00~06:00)',
    date: '2025-11-12',
    isNotice: true,
    content: `안정적인 서비스 제공을 위해
시스템 점검이 진행될 예정입니다.`,
  },
];



export default function Notice() {

  return (
    <div className="flex h-full flex-col ">
      <main className="flex-1 overflow-y-auto ">
          <NoticeList  NOTIFICATIONS={NOTIFICATIONS}/>
      </main>
    </div>
  );
}
