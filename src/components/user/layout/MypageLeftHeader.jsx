import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MypageLeftHeader({ title }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        {/* 뒤로 버튼 */}
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* 왼쪽 정렬 타이틀 */}
        <h1 className="text-[25px] font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
}
