import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSupportWriteStore } from '@/stores/useSupportWriteStore';
import MypageLayout from '@/components/user/layout/MypageLayout';
import SupportWrite from '@/components/user/my/SupportWrite.jsx';
import { useSupportInquiryStore } from '@/stores/useSupportInquiryStore.js';

export default function SupportWritePage() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    title,
    content,
    reset,
    setFromInquiry,
  } = useSupportWriteStore()

  const { currentInquiry } = useSupportInquiryStore()

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
        //  TODO: 등록 API
        console.log('CREATE', { title, content })

      }

      if (isModify) {
        // TODO: 수정 API
        console.log('UPDATE', { title, content })
      }
      const toastMessage = 
      '문의 내용을 수정했어요'

      navigate(-1)
      reset()
      toast(toastMessage, {
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
          label: '보기',
          onClick: () => {
            toast.dismiss();
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
      });
    } catch (e) {
      toast('처리 중 오류가 발생했어요')
    }
  }

  return (
    <MypageLayout
      title={isWrite ? '문의 작성' : '문의 수정'}
      onSubmit={handleSubmit}
    >
      <SupportWrite />
    </MypageLayout>
  )
}
