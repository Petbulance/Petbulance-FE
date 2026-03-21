import { ChevronLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MypageLeftHeader({ title }) {
  const navigate = useNavigate();
  const isBoardManage = title === '게시글 관리';

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* 뒤로 버튼 */}
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* 왼쪽 정렬 타이틀 */}
          <h1 className="text-[25px] font-semibold text-gray-900">{title}</h1>
        </div>

        {isBoardManage ? (
          <button
            type="button"
            aria-label="게시글 관리 메뉴"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('boardmanage:open-menu'))
            }
            className="text-[#616161]"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        ) : (
          <div className="h-5 w-5" />
        )}
      </div>
    </header>
  );
}
