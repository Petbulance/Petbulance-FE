import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import ConfirmSupportModal from '@/components/commons/layout/ConfirmSupportModal.jsx';
import MypageLayout from '@/components/user/layout/MypageLayout.jsx';
import SupportWrite from '@/components/user/my/SupportWrite.jsx';
import { useSupportInquiryStore } from '@/stores/useSupportInquiryStore.js';
import { useSupportWriteStore } from '@/stores/useSupportWriteStore.js';

export default function SupportWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // 👈 qnaId

  const { title, content, reset, setFromInquiry, submit, update } =
    useSupportWriteStore();

  const { currentInquiry } = useSupportInquiryStore();
  const inquiryFromState = location.state?.inquiry;

  const [modalOpen, setModalOpen] = useState(false);

  const isWrite = location.pathname.includes('/write');
  const isModify = location.pathname.includes('/modify');
  const canSubmit = title.trim() && content.trim();

  const bottomToastOptions = {
    position: 'bottom-center',
    duration: 3000,
    style: {
      width: '100%',
      height: '44px',
      display: 'flex',
      alignItems: 'center',
      background: '#222222E5',
      color: '#ffffff',
    },
    action: {
      label: '✕',
      onClick: () => toast.dismiss(),
    },
    actionButtonStyle: {
      background: 'transparent',
      border: 'none',
      color: '#ffffff',
      padding: 0,
      cursor: 'pointer',
    },
  };

  /* ================= 수정 진입 시 기존 데이터 세팅 ================= */
  useEffect(() => {
    if (!isModify) return;

    const inquiry = inquiryFromState || currentInquiry;
    if (inquiry) {
      setFromInquiry(inquiry);
    }
  }, [isModify, inquiryFromState, currentInquiry, setFromInquiry]);

  /* ================= 등록 / 수정 ================= */
  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      if (isWrite) {
        await submit(navigate);
        return;
      }

      if (isModify) {
        await update(id);

        toast('문의를 수정했어요', bottomToastOptions);

        reset();
        navigate(-1);
      }
    } catch (e) {
      const errorName = e?.response?.data?.data?.errorClassName;

      if (errorName === 'VALIDATION_ERROR') {
        toast('제목과 내용을 모두 입력해 주세요.', bottomToastOptions);
      } else if (errorName === 'FORBIDDEN_QNA_ACCESS') {
        toast('수정 권한이 없습니다.', bottomToastOptions);
      } else if (errorName === 'QNA_NOT_FOUND') {
        toast('해당 문의를 찾을 수 없습니다.', bottomToastOptions);
      } else {
        toast('처리 중 오류가 발생했어요.', bottomToastOptions);
      }
    }
  };

  return (
    <>
      <MypageLayout
        title={isWrite ? '문의 작성' : '문의 수정'}
        onSubmit={handleSubmit}
      >
        <SupportWrite onSubmit={isModify ? handleSubmit : undefined} />
      </MypageLayout>

      <ConfirmSupportModal
        open={modalOpen}
        title="문의 제출이 완료되었습니다."
        content="담당자 확인 후 연락드릴게요."
        confirmText="내 문의 확인"
        cancelText="닫기"
        onCancel={() => {
          reset();
          setModalOpen(false);
          navigate('/index/mypage/support/MyInquiry');
        }}
      />
    </>
  );
}
