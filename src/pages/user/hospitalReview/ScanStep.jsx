import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';
import { ReceiptPreview } from '@/components/reviews/ui/ReceiptPreview';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ScanStep() {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    fileRef.current?.click();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setIsFailed(false);
    e.target.value = '';
  };

  const handleRetry = () => {
    setIsFailed(false);
    setPreview(null);
    fileRef.current?.click();
  };

  return (
    <div className="relative h-full w-full bg-black">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && (
        <ReceiptPreview image={preview} onTimeout={() => setIsFailed(true)} />
      )}

      {isFailed && (
        <ConfirmSelectModal
          open={true}
          title="영수증을 인식하지 못했어요."
          content={`텍스트가 명확하거나 빛 반사가 없는 사진을 첨\n부해주세요.`}
          confirmText="사진 첨부"
          cancelText="인증 없이 작성"
          onConfirm={handleRetry}
          onCancel={() => setParams({ step: 'form1' })}
        />
      )}
    </div>
  );
}
