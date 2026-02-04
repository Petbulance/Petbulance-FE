export default function LoginRequiredModal({ open, onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* dim */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[360px] rounded-xl bg-white px-6 py-7 text-center">
        {/* 타이틀 */}
        <h2 className="mb-3 text-[20px] font-semibold text-[#1E1E1E]">
          로그인이 필요한 기능이에요.
        </h2>

        {/* 설명 */}
        <p className="mb-6 text-[16px] leading-relaxed text-[#9E9E9E]">
          별도 가입 절차 없이
          <br />
          사용하던 소셜 계정으로 바로 이용하세요.
        </p>

        {/* 버튼 */}
        <button
          onClick={onConfirm}
          className="w-full rounded-full bg-[#2DA969] py-3 text-[15px] text-white active:scale-95"
        >
          소셜 계정으로 계속하기
        </button>
      </div>
    </div>
  );
}
