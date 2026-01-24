import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';

import TermsForm from './TermsForm.jsx';

export default function TermsModify() {
  const navigate = useNavigate();
  const { termsType } = useParams(); // SERVICE / PRIVACY ...
  console.log(termsType);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await api.get(`/terms/${termsType}`);
        const data = res.data.data;

        setItem({
          termsType: termsType,
          version: data.version,
          isRequired: data.required,
          content: data.summary,
        });
      } catch (e) {
        console.error(e);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [termsType]);

  if (loading) {
    return <div className="text-sm text-gray-500">로딩 중...</div>;
  }

  if (!item) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/terms')}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          약관 목록으로 돌아가기
        </button>
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
          해당 약관을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <TermsForm
      mode="edit"
      initialData={item}
      onBack={() => navigate('/admin/terms')}
    />
  );
}
