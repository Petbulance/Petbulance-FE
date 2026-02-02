import { ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSupportInquiryStore } from '@/stores/useSupportInquiryStore';
import { useSupportWriteStore } from '@/stores/useSupportWriteStore';

export default function MypageHeader({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentInquiry } = useSupportInquiryStore();
  const { title: writeTitle, content, submit } = useSupportWriteStore();

  const isWrite = location.pathname.includes('/write');
  const isDetail = location.pathname.includes('/detail');
  const isModify = location.pathname.includes('/modify');
  console.log('heda c', currentInquiry);
  /** 관리자 답변 존재 여부 */
  const hasAnswer = currentInquiry?.status === 'ANSWER_COMPLETED';

  console.log('cu', hasAnswer);
  /** 버튼 노출 조건 */
  const showActionButton = (isWrite || isDetail || isModify) && !hasAnswer;

  /** 등록/완료 가능 여부 */
  const canSubmit = writeTitle.trim() && content.trim();

  /** 버튼 텍스트 */
  const actionText = isWrite
    ? '등록'
    : isDetail
      ? '수정'
      : isModify
        ? '완료'
        : '';

  /** 버튼 클릭 */
  const handleActionClick = () => {
    // ✏️ 작성 / 수정 페이지 → submit
    if (isWrite || isModify) {
      submit(navigate);
      return;
    }

    // 🔁 상세 페이지 → 수정 페이지 이동
    if (isDetail && currentInquiry) {
      navigate(`/index/mypage/support/myinquiry/modify/${currentInquiry.id}`, {
        state: { inquiry: currentInquiry },
      });
    }
  };

  return (
    <header className="sticky top-0 border-b bg-white px-4 py-3 shadow-sm">
      <div className="relative flex items-center justify-between">
        {/* 뒤로가기 */}
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* 타이틀 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[25px] font-semibold">
          {title}
        </h1>

        {/* 우측 액션 버튼 */}
        {showActionButton ? (
          <button
            onClick={handleActionClick}
            disabled={(isWrite || isModify) && !canSubmit}
            className={`text-[18px] font-medium ${
              (isWrite || isModify) && !canSubmit
                ? 'text-gray-300'
                : 'text-[#424242]'
            }`}
          >
            {actionText}
          </button>
        ) : (
          <div className="w-[24px]" />
        )}
      </div>
    </header>
  );
}
