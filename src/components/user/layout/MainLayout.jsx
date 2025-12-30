import MainHeader from '@/components/user/layout/MainHeader.jsx';
import MainFooter from '@/components/user/layout/MainFooter.jsx';

export default function MainLayout({ title, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <MainHeader title={title} />

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
