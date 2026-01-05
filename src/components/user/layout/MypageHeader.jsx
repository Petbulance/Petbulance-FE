import { ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSupportInquiryStore } from '@/stores/useSupportInquiryStore';
import { useSupportWriteStore } from '@/stores/useSupportWriteStore';

export default function MypageHeader({ title, onSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentInquiry } = useSupportInquiryStore();
  const { title: writeTitle, content } = useSupportWriteStore();

  const isWrite = location.pathname.includes('/write');
  const isDetail = location.pathname.includes('/detail');
  const isModify = location.pathname.includes('/modify');

  const hasAnswer = Boolean(currentInquiry?.answer);

  // 버튼 표시 조건
  const showActionButton = (isWrite || isDetail || isModify) && !hasAnswer;

  const canSubmit = writeTitle.trim() && content.trim();

  const handleActionClick = () => {
    if (isWrite || isModify) {
      // 실제 submit은 Page(wrapper)에서
      onSubmit?.();
      return;
    }

    if (isDetail && currentInquiry) {
      navigate(`/index/mypage/support/myinquiry/modify/${currentInquiry.id}`, {
        state: { inquiry: currentInquiry },
      });
    }
  };

  const actionText = isWrite
    ? '등록'
    : isDetail
      ? '수정'
      : isModify
        ? '완료'
        : '';

  return (
    <header className="sticky top-0 border-b bg-white px-4 py-3 shadow-sm">
      <div className="relative flex items-center justify-between">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-[25px] font-semibold">
          {title}
        </h1>

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
