import { useState } from 'react';

import ActivityList from '@/components/user/noti/ActivityList.jsx';
import NoticeList from '@/components/user/noti/NoticeList.jsx';
import NotificationTabs from '@/components/user/noti/NotificationTabs.jsx';

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState('공지사항');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-full flex-col">
      <NotificationTabs active={activeTab} onChange={handleTabChange} />

      <main className="flex-1 overflow-y-auto">
        {activeTab === '공지사항' && <NoticeList />}

        {activeTab === '내 활동' && <ActivityList />}
      </main>
    </div>
  );
}
