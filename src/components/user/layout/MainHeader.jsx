import { Notification } from '@carbon/icons-react';
import { useLocation } from 'react-router-dom';

export default function MainHeader({ title }) {
  const location = useLocation();

  const isMyPage = title === '마이페이지';
  const isHome = location.pathname === '/index/home';

  return (
    <header
      className={`sticky top-0 z-50 px-4 py-3 ${
        isMyPage
          ? 'bg-gray-100'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <h1
          className={`text-lg font-bold ${
            isHome ? 'text-success' : 'text-gray-900'
          }`}
        >
          {title}
        </h1>

        <Notification className="h-5 w-5 text-gray-600" />
      </div>
    </header>
  );
}
