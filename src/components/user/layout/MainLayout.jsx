import MainFooter from '@/components/user/layout/MainFooter.jsx';
import MainHeader from '@/components/user/layout/MainHeader.jsx';

export default function MainLayout({ title, children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-100">
      {/* Header */}
      <MainHeader title={title} />

      {/* Content */}
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
