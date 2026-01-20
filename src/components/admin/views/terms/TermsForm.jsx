import { AlertCircle, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

import TermsEditor from '@/components/admin/editor/TermsEditor.jsx';

const TYPE_OPTIONS = [
  { value: 'SERVICE', label: '서비스 이용약관' },
  { value: 'PRIVACY', label: '개인정보 처리방침' },
  { value: 'LOCATION', label: '위치기반 서비스 약관' },
  { value: 'DIGITAL', label: '전자금융거래 약관' },
];

const STATUS_OPTIONS = ['예정', '시행중', '만료'];

export default function TermsForm({ mode = 'create', initialData, onBack }) {
  const [content, setContent] = useState(initialData?.content ?? '');

  useEffect(() => {
    setContent(initialData?.content ?? '');
  }, [initialData]);

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          약관 {mode === 'edit' ? '수정' : '신규 등록'}
        </h2>
        <button className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700">
          저장
        </button>
      </div>

      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              약관 유형
            </label>
            <select
              className="w-full rounded border bg-white p-2 text-sm"
              defaultValue={initialData?.type || TYPE_OPTIONS[0].value}
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              버전 명
            </label>
            <input
              type="text"
              placeholder="Ex) v1.1"
              defaultValue={initialData?.version || ''}
              className="w-full rounded border p-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              시행일
            </label>
            <input
              type="date"
              defaultValue={
                initialData?.startedAt
                  ? initialData.startedAt.replace(/\./g, '-')
                  : ''
              }
              className="w-full rounded border p-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              상태
            </label>
            <select
              className="w-full rounded border bg-white p-2 text-sm"
              defaultValue={initialData?.status || STATUS_OPTIONS[0]}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">약관 내용</label>
          <TermsEditor value={content} onChange={setContent} />
        </div>

        <div className="flex gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">약관 개정 시 주의사항</p>
            <p>
              전자상거래법 등에 따라 이용자에게 불리한 약관 변경의 경우 최소
              30일 전, 일반적인 경우 7일 전 사전 공지가 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
