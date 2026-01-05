import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSupportInquiryStore } from '@/stores/useSupportInquiryStore.js';

// 임시 더미 데이터
const NOTIFICATIONS = [
  {
    id: 1,
    title: '닉네임 변경 어떻게 하나요?',
    date: '2025-11-22',
    content: `안녕하세요!
              닉네임을 바꾸고 싶은데 어디서 하는지 못 찾겠어요 😢
              회원 가입할 때 자동으로 만든 제 닉네임이 너무 제 스타일이 아니라서요.
              마이페이지도 눌러보고 이것저것 찾아봤는데 수정하는 메뉴가 안 보이네요…
              닉네임 변경 가능한가요? 가능하면 어디서 바꾸는지 알려주세요! 감사합니다.`,
    answerDate: '2025-11-23',
    answer: `안녕하세요, 펫플러스 운영팀입니다 :)
            닉네임은 마이페이지 > 프로필 관리 > 닉네임 변경에서 수정하실 수 있어요.
            혹시 메뉴가 보이지 않으면 앱을 재시작하거나 업데이트 후 다시 시도해 주세요.
            감사합니다!`,
  },
  {
    id: 2,
    title: '닉네임 변경 어떻게 하나요?',
    date: '2025-11-22',
    content: `안녕하세요!
              닉네임을 바꾸고 싶은데 어디서 하는지 못 찾겠어요 😢
              회원 가입할 때 자동으로 만든 제 닉네임이 너무 제 스타일이 아니라서요.
              마이페이지도 눌러보고 이것저것 찾아봤는데 수정하는 메뉴가 안 보이네요…
              닉네임 변경 가능한가요? 가능하면 어디서 바꾸는지 알려주세요! 감사합니다.`,
    answerDate: '',
    answer: ``,
  },
];

export default function SupportInquiryDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentInquiry, setInquiry, clearInquiry } = useSupportInquiryStore();

  const inquiryFromState = location.state?.inquiry;
  const fallbackInquiry = NOTIFICATIONS.find((item) => item.id === Number(id));

  const inquiry = inquiryFromState || currentInquiry || fallbackInquiry;

  useEffect(() => {
    if (!inquiry) return;
    setInquiry(inquiry);

    return () => clearInquiry();
  }, [inquiry, setInquiry, clearInquiry]);

  if (!inquiry) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-[16px] text-[#9E9E9E]">작성한 문의가 없어요.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* ================= Content ================= */}
      <div className="flex-1 space-y-6 px-4 py-5">
        {/* ===== 문의 ===== */}
        <section className="space-y-2">
          <h1 className="text-[17px] font-semibold text-[#1e1e1e]">
            {inquiry.title}
          </h1>

          <p className="text-[13px] text-[#9E9E9E]">{inquiry.date}</p>

          <div className="rounded-lg text-[14px] whitespace-pre-line">
            {inquiry.content}
          </div>
        </section>
      </div>
      {inquiry.answerDate && <div className="my-3 h-[12px] bg-[#EEEEEE]" />}
      {/* ===== 답변 ===== */}
      <div className="flex-1 space-y-6 px-4 py-5">
        {inquiry.answer && (
          <section className="space-y-2">
            <p className="text-[14px] font-semibold text-[#27BE69]">
              펫뷸런스 운영팀 답변
            </p>

            <p className="text-[13px] text-[#9E9E9E]">{inquiry.answerDate}</p>

            <div className="rounded-lg text-[14px] whitespace-pre-line text-[#1e1e1e]">
              {inquiry.answer}
            </div>
          </section>
        )}
      </div>

      {/* ================= Bottom Buttons ================= */}
      <footer className="flex gap-3 px-4 py-[32px]">
        <button
          onClick={() => navigate('/index/mypage/support/MyInquiry')}
          className="flex-1 rounded-lg border border-[#E0E0E0] py-3 text-[15px] font-medium text-[#424242]"
        >
          목록
        </button>

        <button
          onClick={() => alert('삭제 API 연결')}
          className="flex-1 rounded-lg border border-[#27BE69] py-3 text-[15px] font-medium text-[#27BE69]"
        >
          삭제
        </button>
      </footer>
    </div>
  );
}
