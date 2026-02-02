import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F2F2F2]">
      {/* 중앙 카드 */}
      <div className="flex h-[90%] w-[90%] max-w-[420px] flex-col items-center justify-center rounded-lg bg-white px-[24px] text-center">
        <p className="mb-2 text-[18px] font-semibold text-[#424242]">
          존재하지 않는 페이지에요.
        </p>

        <p className="mb-6 text-[14px] text-[#9E9E9E]">
          입력한 URL을 다시 한번 확인해주시겠어요?
        </p>

        {/* 버튼 */}
        <button
          onClick={() => navigate('/index/home')}
          className="w-full rounded-lg bg-[#2DA969] px-6 py-3 text-[20px] text-white shadow-md active:scale-95"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
