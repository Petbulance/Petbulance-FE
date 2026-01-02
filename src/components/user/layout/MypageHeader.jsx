import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MypageHeader({ onSave, canSave }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-3">
      <div className="relative flex items-center justify-between">
        {/* 좌측: 뒤로가기 */}
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5 text-gray-900" />
        </button>

        {/* 가운데: 타이틀 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[25px] font-semibold text-gray-900">
          프로필 수정
        </h1>

        {/*/!* 우측: 저장 *!/*/}
        {/*<button*/}
        {/*  onClick={onSave}*/}
        {/*  disabled={!canSave}*/}
        {/*  className={`text-[18px] font-medium ${*/}
        {/*    canSave ? 'text-[#2DA969]' : 'text-gray-300'*/}
        {/*  }`}*/}
        {/*>*/}
        {/*  저장*/}
        {/*</button>*/}
      </div>
    </header>
  );
}
