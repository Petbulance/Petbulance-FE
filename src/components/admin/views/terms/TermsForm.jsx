import { AlertCircle, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import TermsEditor from '@/components/admin/editor/TermsEditor.jsx';

const TYPE_OPTIONS = [
  { value: 'SERVICE', label: '서비스 이용약관' },
  { value: 'PRIVACY', label: '개인정보 처리방침' },
  { value: 'LOCATION', label: '위치기반 서비스 약관' },
  { value: 'MARKETING', label: '마케팅 정보 수신 동의' },
];

const STATUS_OPTIONS = ['예정', '시행중', '만료'];

export default function TermsForm({ mode = 'create', initialData, onBack }) {
  /* =========================
     Form State
  ========================= */
  const [termsType, setTermsType] = useState(initialData?.termsType);
  const [version, setVersion] = useState(initialData?.version ?? '');
  const [isRequired, setIsRequired] = useState(initialData?.isRequired ?? true);
  const [content, setContent] = useState(initialData?.content ?? '');

  useEffect(() => {
    console.log(initialData);
    if (!initialData) return;
    setTermsType(initialData.termsType);
    setVersion(initialData.version);
    setIsRequired(initialData.isRequired);
    setContent(initialData.content);
  }, [initialData]);

  /* =========================
     저장
  ========================= */
  const handleSubmit = async () => {
    if (!version.trim() || !content.trim()) {
      alert('버전과 약관 내용을 입력해주세요.');
      return;
    }

    const payload = {
      termsType,
      version,
      isRequired,
      content,
    };

    try {
      await api.post('/admin/version/terms', payload);
      alert('약관이 등록되었습니다.');
      onBack();
    } catch (error) {
      console.error(error);
      alert('약관 등록에 실패했습니다.');
    }
  };

  /* =========================
     Render
  ========================= */
  return (
    <div className="space-y-4">
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>

      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          약관 {mode === 'edit' ? '수정' : '신규 등록'}
        </h2>
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
        >
          저장
        </button>
      </div>

      {/* 폼 */}
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* 유형 / 버전 */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              약관 유형
            </label>
            <select
              value={termsType}
              onChange={(e) => setTermsType(e.target.value)}
              className="w-full rounded border bg-white p-2 text-sm"
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
              placeholder="Ex) s1.1"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full rounded border p-2 text-sm"
            />
          </div>
        </div>

        {/* 시행일 / 상태 (UI 유지용) */}
        <div className="grid grid-cols-2 gap-6 opacity-60">
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
            <select disabled className="w-full rounded border p-2 text-sm">
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 필수 여부 */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
          <span className="text-sm text-gray-700">필수 동의 약관 여부</span>
        </div>

        {/* 약관 내용 */}
        <div>
          <label className="mb-1 block text-sm font-medium">약관 내용</label>
          <TermsEditor value={content} onChange={setContent} />
        </div>

        {/* 안내 */}
        <div className="flex gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">약관 개정 시 주의사항</p>
            <p>이용자에게 불리한 변경은 최소 30일 전 사전 공지가 필요합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
