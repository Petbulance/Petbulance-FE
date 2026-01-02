import MainHeader from '@/components/user/layout/MainHeader.jsx';
import MainFooter from '@/components/user/layout/MainFooter.jsx';

export default function MainLayout({ title, children }) {
  return (
    <div className="flex h-full flex-col bg-gray-100 overflow-hidden">
      {/* Header */}
      <MainHeader title={title} />

      {/* Content (여기만 스크롤) */}
      <main className="flex-1 overflow-y-auto bg-red-100">

        {children}
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
