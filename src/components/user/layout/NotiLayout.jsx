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
        offset={24}
        style={{ width: '100%', maxWidth: '572px', height: '44px' }}
        toastOptions={{ style: { width: '100%', height: '44px' } }}
        className="!left-1/2 !translate-x-1/2 !right-auto !top-auto !bottom-6 w-full max-w-[572px] h-[44px]"
      />
    </div>
  );
}
