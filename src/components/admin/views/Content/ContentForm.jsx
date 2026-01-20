import { ChevronLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ContentForm({ mode = 'create', initialData, onBack }) {
  const [isBannerEnabled, setIsBannerEnabled] = useState(
    initialData?.isBanner ?? false
  );

  useEffect(() => {
    setIsBannerEnabled(initialData?.isBanner ?? false);
  }, [initialData]);

  return (
    <div className="animate-in fade-in space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} className="mr-1" />
        목록으로 돌아가기
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {mode === 'edit' ? '공지/배너 수정' : '공지/배너 신규 등록'}
        </h2>
        <button className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700">
          저장
        </button>
      </div>

      <div className="space-y-6 rounded-lg border bg-white p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">분류</label>
            <select
              defaultValue={initialData?.category || '이벤트'}
              className="w-full rounded border p-2 text-sm"
            >
              <option>이벤트</option>
              <option>공지</option>
              <option>광고</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">상태</label>
            <div className="flex h-[38px] items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="status"
                  value="게시"
                  defaultChecked={initialData?.status !== '중단'}
                />
                게시
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="status"
                  value="중단"
                  defaultChecked={initialData?.status === '중단'}
                />
                중단
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">제목</label>
          <input
            defaultValue={initialData?.title || ''}
            className="w-full rounded border p-2 text-sm"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon size={18} />
              <span className="text-sm font-bold">메인 배너 설정</span>
            </div>

            <button
              onClick={() => setIsBannerEnabled((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isBannerEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isBannerEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {isBannerEnabled ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    배너 게시 기간
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      className="w-full rounded border p-2 text-sm"
                    />
                    <span>~</span>
                    <input
                      type="date"
                      className="w-full rounded border p-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    배너 이미지
                  </label>
                  <div className="flex h-[38px] cursor-pointer items-center justify-center rounded border border-dashed bg-white text-xs text-gray-400 hover:bg-gray-50">
                    <Upload size={14} className="mr-1" />
                    파일 선택
                  </div>
                </div>
              </div>

              <p className="text-xs text-blue-600">
                * 메인 홈 최상단 배너에 노출되며 클릭 시 본 공지로 이동합니다.
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              활성화 시 메인 홈 배너에 노출됩니다.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">본문 내용</label>
          <textarea
            rows={8}
            defaultValue={initialData?.content || ''}
            className="w-full rounded border p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            첨부 파일
          </label>
          <div className="rounded border border-gray-200 p-2">
            <input
              type="file"
              className="text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
