import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TERMS } from '@/components/admin/mock/terms.mock.js';

import TermsForm from './TermsForm.jsx';

export default function TermsModify() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = useMemo(
    () => TERMS.find((term) => String(term.id) === id),
    [id]
  );

  if (!item) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/terms')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          약관 목록으로 돌아가기
        </button>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
          해당 약관을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <TermsForm mode="edit" initialData={item} onBack={() => navigate('/admin/terms')} />
  );
}
