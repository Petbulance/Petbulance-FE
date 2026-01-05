import { useState } from 'react';

import ActivityList from '@/components/user/noti/ActivityList.jsx';
import NoticeList from '@/components/user/noti/NoticeList.jsx';
import NotificationTabs from '@/components/user/noti/NotificationTabs.jsx';

const NOTIFICATIONS = [
  /* ================= 공지사항 ================= */
  {
    id: 1,
    type: '이벤트',
    title: '펫플러스 오픈 기념 리뷰 작성 이벤트',
    date: '2025-11-30',
    isNotice: true,
  },
  {
    id: 2,
    type: '공지',
    title: '시스템 점검 안내 (11/13 01:00~06:00)',
    date: '2025-11-12',
    isNotice: true,
  },
  {
    id: 3,
    type: '광고',
    title: '조류전문 응급 24시 동물병원을 찾으시나요?',
    date: '2025-11-10',
    isNotice: true,
  },
  {
    id: 4,
    type: '공지',
    title: '개인정보 처리방침 개정 안내',
    date: '2025-11-07',
    isNotice: true,
  },
  {
    id: 5,
    type: '공지',
    title: '앱 업데이트 안내 (v1.2.0)',
    date: '2025-10-12',
    isNotice: true,
  },

  /* ================= 내 활동 ================= */
  {
    id: 6,
    type: '활동',
    category: '소형포유류 · 일상/자랑',
    content: '“햄스터 케이지 추천해주세요” 글에 베테랑님이 댓글을 달았어요.',
    time: '2일 전',
    isNotice: false,
    isRead: false, // ❌ 읽지 않음 (1)
  },
  {
    id: 7,
    type: '활동',
    category: '소형포유류 · 일상/자랑',
    content:
      '“햄스터 케이지 추천해주세요” 글에 내 댓글에 햄스터보호님이 답글을 남겼어요.',
    time: '2일 전',
    isNotice: false,
    isRead: false, // ❌ 읽지 않음 (2)
  },
  {
    id: 8,
    type: '활동',
    category: '소형포유류 · 건강/질병',
    content:
      '“햄스터 계속 설사하는데 왜 이러는걸까요?” 글에 간호햄스터님이 댓글을 달았어요.',
    time: '5일 전',
    isNotice: false,
    isRead: false, // ❌ 읽지 않음 (3)
  },
  {
    id: 9,
    type: '활동',
    category: '조류 · 건강/질병',
    content:
      '“앵무새가 자주 소리를 지르는데 왜 이러죠?” 글에 무새님이 댓글을 달았어요.',
    time: '9일 전',
    isNotice: false,
    isRead: false, // ❌ 읽지 않음 (4)
  },

  /* ----- 아래부터는 전부 읽음 ----- */
  {
    id: 10,
    type: '활동',
    category: '파충류 · 건강/질병',
    content:
      '“거북이가 잘 먹지 않는데 어떤 문제일까요?” 글에 거북이사랑님이 댓글을 달았어요.',
    time: '11일 전',
    isNotice: false,
    isRead: true,
  },
  {
    id: 11,
    type: '활동',
    category: '조류 · 건강/질병',
    content:
      '“앵무새가 자꾸 깃질을 하는데 왜 그런건가요?” 글에 무새님이 댓글을 달았어요.',
    time: '15일 전',
    isNotice: false,
    isRead: true,
  },
  {
    id: 12,
    type: '활동',
    category: '고양이 · 일상',
    content: '“고양이 간식 추천해주세요” 글에 집사님이 댓글을 달았어요.',
    time: '18일 전',
    isNotice: false,
    isRead: true,
  },
  {
    id: 13,
    type: '활동',
    category: '강아지 · 건강',
    content: '“강아지 예방접종 주기 궁금해요” 글에 수의사님이 댓글을 달았어요.',
    time: '20일 전',
    isNotice: false,
    isRead: true,
  },
  {
    id: 14,
    type: '활동',
    category: '파충류 · 사육',
    content:
      '“도마뱀 온습도 설정 어떻게 하세요?” 글에 파충류고수님이 댓글을 달았어요.',
    time: '22일 전',
    isNotice: false,
    isRead: true,
  },
  {
    id: 15,
    type: '활동',
    category: '소형포유류 · 사육',
    content: '“햄스터 케이지 청소 주기” 글에 햄찌집사님이 댓글을 달았어요.',
    time: '25일 전',
    isNotice: false,
    isRead: true,
  },
];

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState('공지사항');

  return (
    <div className="flex h-full flex-col">
      <NotificationTabs active={activeTab} onChange={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        {activeTab === '공지사항' ? (
          <NoticeList NOTIFICATIONS={NOTIFICATIONS} />
        ) : (
          <ActivityList NOTIFICATIONS={NOTIFICATIONS} />
        )}
      </main>
    </div>
  );
}
