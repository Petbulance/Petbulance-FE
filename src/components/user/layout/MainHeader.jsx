import { Notification } from '@carbon/icons-react';

export default function MainHeader({ title }) {
  const isMyPage = title === '마이페이지';

  return (
    <header
      className={`sticky top-0 z-50 px-4 py-3 ${
        isMyPage
          ? 'bg-gray-100'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">
          {title}
        </h1>
        <Notification className="h-5 w-5 text-gray-600" />
      </div>
    </header>
  );
}
