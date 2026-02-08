import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom'; // ✅ useLocation 추가

import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';
import { ReceiptPreview } from '@/components/reviews/ui/ReceiptPreview';
import { uploadReceiptScan } from '@/apis/reviews/uploadReceiptScan';

export default function ScanStep({ onScanSuccess }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [params, setParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (location.state?.file) {
      processFile(location.state.file);
    }
  }, [location.state]);

  const processFile = async (file) => {
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsFailed(false);
    setIsUploading(true);

    try {
      const response = await uploadReceiptScan(file);
      if (response.success) {
        onScanSuccess(response.data);
      } else {
        setIsFailed(true);
      }
    } catch (error) {
      console.error(error);
      setIsFailed(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
    e.target.value = '';
  };

  const handleRetry = () => {
    setIsFailed(false);
    setPreview(null);
    setTimeout(() => {
      fileRef.current?.click();
    }, 100);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-black">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview && !isUploading && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-white">영수증을 촬영해주세요</p>
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-full bg-white px-6 py-3 font-bold text-black"
          >
            카메라 켜기
          </button>
        </div>
      )}

      {preview && <ReceiptPreview image={preview} isScanning={isUploading} />}

      {isFailed && (
        <ConfirmSelectModal
          open={true}
          title="영수증을 인식하지 못했어요."
          content={`텍스트가 명확하거나 빛 반사가 없는 사진을 첨\n부해주세요.`}
          confirmText="다시 촬영"
          cancelText="인증 없이 작성"
          onConfirm={handleRetry}
          onCancel={() => setParams({ step: 'form1' })}
        />
      )}
    </div>
  );
}
