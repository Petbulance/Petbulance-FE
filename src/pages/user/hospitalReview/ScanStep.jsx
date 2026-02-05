import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';
import { ReceiptPreview } from '@/components/reviews/ui/ReceiptPreview';
import { uploadReceiptScan } from '@/apis/reviews/uploadReceiptScan';

export default function ScanStep() {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      fileRef.current?.click();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsFailed(false);
    setIsUploading(true);

    try {
      const isSuccess = await uploadReceiptScan(file);

      if (isSuccess) {
        setParams({ step: 'form1' });
      } else {
        setIsFailed(true);
      }
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleRetry = () => {
    setIsFailed(false);
    setPreview(null);
    setTimeout(() => {
      fileRef.current?.click();
    }, 100);
  };

  return (
    <div className="relative h-full w-full bg-black">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && <ReceiptPreview image={preview} isScanning={isUploading} />}

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
