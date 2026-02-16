import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import { fetchHospitalDetail } from '@/apis/hospitals/hospitalDetail';
import { postReview } from '@/apis/reviews/postReview';
import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';
import { ReceiptVerifiedModal } from '@/components/commons/layout/ReceiptVerifiedModal';
import { pushDataLayer } from '@/lib/gtm';

import ReviewForm_1 from './form/ReviewForm_1';
import ReviewForm_2 from './form/ReviewForm_2';
import ReviewForm_3 from './form/ReviewForm_3';
import ScanStep from './ScanStep';

export function WriteReview() {
  const [params, setParams] = useSearchParams();
  const step = params.get('step') ?? 'form1';
  const navigate = useNavigate();
  const location = useLocation();

  const passedHospitalId = location.state?.hospitalId;
  const passedHospitalName = location.state?.hospitalName;

  const isHospitalFixed = !!passedHospitalId;

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isScanSuccessOpen, setIsScanSuccessOpen] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [receiptChecked, setReceiptChecked] = useState(false);

  const [formData, setFormData] = useState({
    hospitalName: passedHospitalName || '', // 초기값 우선 사용
    hospitalId: passedHospitalId || '', // 초기값 우선 사용
    cost: '',
    animalType: '',
    animalDetail: '',
    ratings: { expertise: 0, kindness: 0, facility: 0 },
    images: [],
    content: '',
  });

  useEffect(() => {
    const prefillHospitalInfo = async () => {
      if (!passedHospitalId || formData.hospitalName) return;

      try {
        const data = await fetchHospitalDetail(passedHospitalId);
        setFormData((prev) => ({
          ...prev,
          hospitalId: String(data.hospitalId),
          hospitalName: data.name,
        }));
      } catch (error) {
        console.error('병원 정보 프리필 실패:', error);
      }
    };

    prefillHospitalInfo();
  }, [passedHospitalId, formData.hospitalName]);

  const handleMoveToForm1 = () => {
    setIsScanSuccessOpen(false);
    setParams({ step: 'form1' });
  };

  useEffect(() => {
    let timer;
    if (isScanSuccessOpen) {
      timer = setTimeout(() => {
        handleMoveToForm1();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isScanSuccessOpen]);

  const handleScanSuccess = (ocrData) => {
    setReceiptChecked(true);
    setFormData((prev) => ({
      ...prev,
      hospitalName: ocrData.hospitalName || '',
      hospitalId: ocrData.hospitalId || '',
      cost: ocrData.price ? ocrData.price.toString() : '',
    }));
    setIsScanSuccessOpen(true);
  };

  const handleComplete = async () => {
    try {
      const savedReviewId = await postReview(formData, receiptChecked);
      if (savedReviewId) {
        setReviewId(savedReviewId);
        setIsSuccessOpen(true);

        const { expertise, kindness, facility } = formData.ratings;
        const avgRating =
          (Number(expertise) + Number(kindness) + Number(facility)) / 3;

        const gaPayload = {
          hospital_id: String(formData.hospitalId),
          rating: Number(avgRating.toFixed(1)),
          has_photo: Array.isArray(formData.images)
            ? formData.images.length > 0
            : false,
          has_receipt: Boolean(receiptChecked),
          review_length: String(formData.content || '').trim().length,
        };
        console.log('[GA] submit_review payload', gaPayload);
        pushDataLayer('submit_review', gaPayload);
      }
    } catch (error) {
      alert('후기 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };

  const renderStep = () => {
    const commonProps = { data: formData, setData: setFormData };

    switch (step) {
      case 'form1':
        return (
          <ReviewForm_1
            {...commonProps}
            isHospitalFixed={isHospitalFixed}
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
        return <ReviewForm_3 {...commonProps} onNext={handleComplete} />;
      case 'scan':
        return <ScanStep onScanSuccess={handleScanSuccess} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {renderStep()}

      <ReceiptVerifiedModal open={isScanSuccessOpen} />

      <ConfirmSelectModal
        open={isSuccessOpen}
        title={`소중한 후기가 등록되었습니다.`}
        content={''}
        confirmText="작성한 후기 확인"
        cancelText="닫기"
        onConfirm={() => navigate(`/index/reviews/${reviewId}`)}
        onCancel={() => navigate('/index/reviews')}
      />
    </div>
  );
}
