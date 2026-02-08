import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';

const TYPE_LABEL = {
  SERVICE: '서비스 이용약관',
  PRIVACY: '개인정보 처리방침',
  LOCATION: '위치기반 서비스 약관',
  MARKETING: '마케팅 정보 수신 동의',
};

export default function TermsModify() {
  const navigate = useNavigate();
  const { termsType } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await api.get(`/terms/${termsType}`);
        const data = res.data.data;

        setItem({
          termsType,
          version: data.version ?? '-',
          required: !!data.required,
          content: data.summary ?? '',
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
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} /> 약관 목록으로 돌아가기
        </button>
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-600">
          해당 약관을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate('/admin/terms')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} /> 목록으로 돌아가기
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">약관 상세보기</h2>
      </div>

      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">약관 유형</p>
            <p className="rounded border bg-gray-50 p-2 text-sm text-gray-900">
              {TYPE_LABEL[item.termsType] ?? item.termsType}
            </p>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">버전 명</p>
            <p className="rounded border bg-gray-50 p-2 text-sm text-gray-900">
              {item.version}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-gray-700">필수 여부</p>
          <p className="rounded border bg-gray-50 p-2 text-sm text-gray-900">
            {item.required ? '필수' : '선택'}
          </p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-gray-700">약관 내용</p>
          <div
            className="prose max-w-none rounded border bg-gray-50 p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
    </div>
  );
}
