import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSupportWriteStore } from '@/stores/useSupportWriteStore.js';
import MypageLayout from '@/components/user/layout/MypageLayout.jsx';
import SupportWrite from '@/components/user/my/SupportWrite.jsx';
import { useSupportInquiryStore } from '@/stores/useSupportInquiryStore.js';
import ConfirmSupportModal from '@/components/commons/layout/ConfirmSupportModal.jsx';
import { X } from 'lucide-react';

export default function SupportWritePage() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    title,
    content,
    reset,
    setFromInquiry,
  } = useSupportWriteStore()

  const [modalOpen, setModalOpen] = useState(false)
  const [createdInquiry, setCreatedInquiry] = useState(null)

  const { currentInquiry, setInquiry } = useSupportInquiryStore()

  const inquiryFromState = location.state?.inquiry

  const isWrite = location.pathname.includes('/write')
  const isModify = location.pathname.includes('/modify')

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0

  useEffect(() => {
    if (!isModify) return

    const inquiry = inquiryFromState || currentInquiry

    if (inquiry) {
      setFromInquiry(inquiry)
    }
  }, [isModify, inquiryFromState, currentInquiry, setFromInquiry])

  const handleSubmit = async () => {
    if (!canSubmit) return

    try {
      if (isWrite) {
        const newInquiry = {
          id: Date.now(),
          title: title.trim(),
          content: content.trim(),
          date: new Date().toISOString().split('T')[0],
          answer: '',
          answerDate: '',
        }

        setInquiry(newInquiry)
        setCreatedInquiry(newInquiry)
        setModalOpen(true)
        return
      }

      if (isModify) {
        // TODO: 수정 API
        console.log('UPDATE', { title, content })

        navigate(-1)
        reset()
        toast('문의를 수정했어요', {
          position: 'bottom-center',
          duration: 4000,
          style: {
            width: '100%',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#222222E5',
            color: '#ffffff',
          },
          action: {
            label: (
              <X className="h-4 w-4 text-white" />
            ),
            onClick: () => {
              toast.dismiss()
              // handleUndoDelete(snapshot);
            },
          },
          actionButtonStyle: {
            background: 'transparent',
            color: '#ffffff',
            fontWeight: 500,
            padding: 0,
            marginLeft: '24px',
          },
        })
      }
    } catch (e) {
      toast('처리 중 오류가 발생했어요')
    }
  }

  return (
    <>
      <MypageLayout
        title={isWrite ? '문의 작성' : '문의 수정'}
        onSubmit={handleSubmit}
      >
        <SupportWrite />
      </MypageLayout>
      <ConfirmSupportModal
        open={modalOpen}
        title="문의 제출이 완료되었습니다."
        content="담당자 확인 후 연락드릴게요."
        confirmText="내 문의 확인"
        cancelText="닫기"
        onCancel={() => {
          reset()
          setModalOpen(false)
          navigate('/index/mypage/support/MyInquiry')
        }}
        onConfirm={() => {
          if (!createdInquiry) return

          navigate(
            `/index/mypage/support/myinquiry/detail/${createdInquiry.id}`,
            { state: { inquiry: createdInquiry } },
          )

          reset()
          setModalOpen(false)
        }}
      />
    </>
  )
}
