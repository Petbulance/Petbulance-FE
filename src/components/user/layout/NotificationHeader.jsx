import { ChevronLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotificationHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-3">
      <div className="relative flex items-center justify-between">
        {/* 뒤로 */}
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* 타이틀 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[25px] font-semibold">
          알림
        </h1>

        {/* 설정 */}
        <button>
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
