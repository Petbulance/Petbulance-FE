import { Toaster } from 'sonner';

import NotificationHeader from '@/components/user/layout/NotificationHeader.jsx';

export default function NotiLayout({ title, children }) {
  return (
    <div
      id="noti-layout-container"
      className="relative flex h-full min-h-0 flex-col overflow-hidden"
    >
      {/* Header */}
      <NotificationHeader title={title} />

      {/* Content */}
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      <Toaster
        position="bottom-center"
        offset={24}
        style={{ width: '100%', maxWidth: '572px', height: '44px' }}
        toastOptions={{ style: { width: '100%', height: '44px' } }}
        className="!top-auto !right-auto !bottom-6 !left-1/2 h-[44px] w-full max-w-[572px] !translate-x-1/2"
      />
    </div>
  );
}
