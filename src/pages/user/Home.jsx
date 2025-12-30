import { Outlet } from 'react-router-dom';
import MainHeader from '@/components/user/layout/MainHeader.jsx';
import MainFooter from '@/components/user/layout/MainFooter.jsx';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <MainHeader title={'펫뷸런스'} />

      <main className="flex-1">
        <Outlet />
      </main>

      <MainFooter />
    </div>
  );
}
