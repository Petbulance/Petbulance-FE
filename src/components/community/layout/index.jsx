import MainFooter from '@/components/user/layout/MainFooter.jsx';
import { WriteButton } from '@/components/community/ui/WriteButton';
import { useLocation } from 'react-router-dom';

export default function CommunityLayout({ children }) {
  const { pathname } = useLocation();
  const isDetailPage = /^\/index\/community\/[^/]+$/.test(pathname);
  const isWritePage = pathname === '/index/community/write';
  const isEditPage = /^\/index\/community\/[^/]+\/edit$/.test(pathname);
  const isSearchPage = pathname === '/index/community/search';
  const isMainPage = /^\/index\/community\/?$/.test(pathname);

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      {/* Content */}
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      {isMainPage && <WriteButton />}

      {/* Footer */}
      {!isDetailPage && !isWritePage && !isEditPage && !isSearchPage && (
        <MainFooter />
      )}
    </div>
  );
}
