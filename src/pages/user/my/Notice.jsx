import NoticeList from '@/components/user/noti/NoticeList.jsx';
import { NOTICE_ITEMS } from '@/data/notices.js';

export default function Notice() {
  return (
    <div className="flex h-full flex-col">
      <main className="flex-1 overflow-y-auto">
        <NoticeList NOTIFICATIONS={NOTICE_ITEMS} />
      </main>
    </div>
  );
}
