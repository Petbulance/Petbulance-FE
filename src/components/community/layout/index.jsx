import MainFooter from '@/components/user/layout/MainFooter.jsx';

export default function CommunityLayout({ children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* Content */}
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
