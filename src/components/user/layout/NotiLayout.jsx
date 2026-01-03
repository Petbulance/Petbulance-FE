import { Toaster } from 'sonner';
import NotificationHeader from '@/components/user/layout/NotificationHeader.jsx';

export default function NotiLayout({ title, children }) {
  return (
    <div
      id="noti-layout-container"
      className="flex h-full min-h-0 flex-col overflow-hidden relative"
    >
      {/* Header */}
      <NotificationHeader title={title} />

      {/* Content */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>

      <Toaster
        position="bottom-center"
        container={() =>
          document.getElementById('noti-layout-container')
        }
      />
    </div>
  );
}
