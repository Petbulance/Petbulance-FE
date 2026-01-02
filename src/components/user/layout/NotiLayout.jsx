import MainHeader from '@/components/user/layout/MainHeader.jsx';
import MainFooter from '@/components/user/layout/MainFooter.jsx';
import MypageHeader from '@/components/user/layout/MypageHeader.jsx';
import NotificationHeader from '@/components/user/layout/NotificationHeader.jsx';

export default function NotiLayout({ title, children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden ">
      {/* Header */}
      <NotificationHeader title={title} />

      {/* Content */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
