import MypageHeader from '@/components/user/layout/MypageHeader.jsx';
import MypageLeftHeader from '@/components/user/layout/MypageLeftHeader.jsx';
import MainFooter from '@/components/user/layout/MainFooter.jsx';

export default function MypageLayout({
                                       title,
                                       left = false,
                                       children,
                                     }) {
  console.log(left)
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden ">
      {/* Header */}

      {left ? (
        <MypageLeftHeader title={title} />
      ) : (
        <MypageHeader title={title} />
      )}

      {/* Content */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
