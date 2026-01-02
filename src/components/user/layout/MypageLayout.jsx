import MainHeader from '@/components/user/layout/MainHeader.jsx';
import MainFooter from '@/components/user/layout/MainFooter.jsx';
import MypageHeader from '@/components/user/layout/MypageHeader.jsx';

export default function MypageLayout({ title, children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-100">
      {/* Header */}
      <MypageHeader title={title} />

      {/* Content */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
