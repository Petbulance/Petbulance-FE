import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CONTENTS } from '@/components/admin/mock/contents.mock.js';

import ContentForm from './ContentForm.jsx';

export default function ContentModify() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = useMemo(() => CONTENTS.find((content) => String(content.id) === id), [id]);

  if (!item) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/content')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          콘텐츠 목록으로 돌아가기
        </button>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
          해당 콘텐츠를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <ContentForm
      mode="edit"
      initialData={item}
      onBack={() => navigate('/admin/content')}
    />
  );
}
