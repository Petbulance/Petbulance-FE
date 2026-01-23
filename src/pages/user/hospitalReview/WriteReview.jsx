import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';

import ReviewForm_1 from './form/ReviewForm_1';
import ReviewForm_2 from './form/ReviewForm_2';
import ReviewForm_3 from './form/ReviewForm_3';
import ScanStep from './ScanStep';

export function WriteReview() {
  const [params, setParams] = useSearchParams();
  const step = params.get('step') ?? 'confirm';
  const navigate = useNavigate();

  // 전체 데이터 통합 관리
  const [formData, setFormData] = useState({
    hospitalName: '',
    ratings: { expertise: 0, kindness: 0, facility: 0 },
    animalType: '',
    animalDetail: '',
    treatments: [],
    content: '',
    images: [],
  });

  const renderStep = () => {
    const commonProps = { data: formData, setData: setFormData };

    switch (step) {
      case 'form1':
        return (
          <ReviewForm_1
            {...commonProps}
            onNext={() => setParams(new URLSearchParams({ step: 'form2' }))}
          />
        );
      case 'form2':
        return (
          <ReviewForm_2
            {...commonProps}
            onNext={() => setParams(new URLSearchParams({ step: 'form3' }))}
          />
        );
      case 'form3':
        return (
          <ReviewForm_3
            {...commonProps}
            onNext={() => setParams(new URLSearchParams({ step: 'success' }))}
          />
        );
      case 'success':
        return (
          <ConfirmSelectModal
            open={true}
            title={`후기가 등록되었습니다.`}
            content={`작성해주신 후기는 검수 완료 후 공개됩니다.`}
            confirmText="작성한 후기 보기"
            cancelText="닫기"
            //TODO: 동작 추가
            onConfirm={''}
            onCancel={() => navigate('/index/reviews')}
          />
        );
      case 'scan':
        return <ScanStep />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {step === 'confirm' && (
        <ConfirmSelectModal
          open={true}
          title={`후기를 작성하기 전에\n영수증 인증을 진행하시겠어요?`}
          content={`카드 및 현금으로 결제한 영수증만\n인증 가능합니다.`}
          confirmText="사진 첨부"
          cancelText="인증 없이 작성"
          onConfirm={() => setParams({ step: 'scan' })}
          onCancel={() => setParams({ step: 'form1' })}
        />
      )}

      {renderStep()}
    </div>
  );
}
