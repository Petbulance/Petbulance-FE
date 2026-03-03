import MainFooter from '@/components/user/layout/MainFooter.jsx';
import { useLocation } from 'react-router-dom';

export default function CommunityLayout({ children }) {
  const { pathname } = useLocation();
  const isDetailPage = /^\/index\/community\/[^/]+$/.test(pathname);
  const isWritePage = pathname === '/index/community/write';

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* Content */}
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      {/* Footer */}
      {!isDetailPage && !isWritePage && <MainFooter />}
    </div>
  );
}
