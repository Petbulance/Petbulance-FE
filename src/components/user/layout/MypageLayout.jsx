import MainFooter from '@/components/user/layout/MainFooter.jsx';
import MypageHeader from '@/components/user/layout/MypageHeader.jsx';
import MypageLeftHeader from '@/components/user/layout/MypageLeftHeader.jsx';

export default function MypageLayout({
  title,
  left = false,
  children,
  onSubmit,
}) {
  console.log(left);
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {/* Header */}

      {left ? (
        <MypageLeftHeader title={title} />
      ) : (
        <MypageHeader title={title} onSubmit={onSubmit} />
      )}

      {/* Content */}
      <main className="relative min-h-0 flex-1 overflow-y-auto">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
