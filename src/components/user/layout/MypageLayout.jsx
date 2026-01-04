import MypageHeader from '@/components/user/layout/MypageHeader.jsx';
import MypageLeftHeader from '@/components/user/layout/MypageLeftHeader.jsx';
import MainFooter from '@/components/user/layout/MainFooter.jsx';
import { Toaster } from 'sonner';

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
      <Toaster
        position="bottom-center"
        offset={24}
        style={{ width: '100%', maxWidth: '572px', height: '44px' }}
        toastOptions={{ style: { width: '100%', height: '44px' } }}
        className="!left-1/2 !translate-x-1/2 !right-auto !top-auto !bottom-6 w-full max-w-[572px] h-[44px]"
      />
    </div>

  );
}
