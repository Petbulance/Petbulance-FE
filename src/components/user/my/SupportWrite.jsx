import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSupportWriteStore } from '@/stores/useSupportWriteStore';

export default function SupportWrite() {
  const navigate = useNavigate();

  const { title, content, setTitle, setContent, reset } =
    useSupportWriteStore();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    // ✅ TODO: API 연동
    console.log('SUBMIT', { title, content });

    reset();
    navigate(-1);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <main className="flex-1 space-y-5 px-4 py-5">
        {/* 제목 */}
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

        {/* 내용 */}
        <section className="space-y-1">
          <p className="text-[14px] font-medium">내용</p>

          <Textarea
            rows={10}
            placeholder="문의 내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white pr-10"
          />
        </section>
      </main>
    </div>
  );
}
