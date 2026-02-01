import { X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSupportWriteStore } from '@/stores/useSupportWriteStore';

export default function SupportWrite() {
  const navigate = useNavigate();

  const { title, content, setTitle, setContent, reset } =
    useSupportWriteStore();

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /* =========================
     문의 작성
  ========================= */
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMessage('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');
      console.log('title', title, 'content', content);
      await api.post('/qna', {
        title,
        content,
      });

      reset();
      navigate('/index/mypage/support/myinquiry', { replace: true });
    } catch (e) {
      console.error('문의 작성 실패', e);

      const message =
        e?.response?.data?.data?.message ||
        '문의 등록에 실패했어요. 다시 시도해주세요.';

      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <main className="flex-1 space-y-5 px-4 py-5">
        {/* ================= 제목 ================= */}
        <section className="space-y-1">
          <p className="text-[14px] font-medium">제목</p>

          <div className="relative">
            <Input
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white pr-10"
            />

            {title && (
              <button
                type="button"
                onClick={() => setTitle('')}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
              >
                <X className="h-4 w-4 text-[#9E9E9E]" />
              </button>
            )}
          </div>
        </section>

        {/* ================= 내용 ================= */}
        <section className="space-y-1">
          <p className="text-[14px] font-medium">내용</p>

          <Textarea
            rows={10}
            placeholder="문의 내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white"
          />
        </section>

        {/* ================= 에러 메시지 ================= */}
        {errorMessage && (
          <p className="text-[13px] text-red-500">{errorMessage}</p>
        )}
      </main>

      {/* ================= 하단 버튼 ================= */}
      <div className="border-t px-4 py-4">
        <button
          disabled={submitting}
          onClick={handleSubmit}
          className={`w-full rounded-lg py-3 text-[16px] font-semibold ${
            submitting
              ? 'bg-gray-300 text-white'
              : 'bg-[#27BE69] text-white active:scale-[0.99]'
          }`}
        >
          문의 등록
        </button>
      </div>
    </div>
  );
}
