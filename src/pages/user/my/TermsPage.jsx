import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';

export default function TermsPage() {
  const navigate = useNavigate();

  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* =========================
     약관 목록 조회
  ========================= */
  const fetchTerms = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await api.get('/terms');
      console.log('term', res.data);
      setTerms(res.data.data ?? []);
    } catch (e) {
      console.error('약관 목록 조회 실패', e);
      setError(true);
      setTerms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  /* =========================
     상태 처리
  ========================= */
  if (loading) {
    return <Spinner fullScreen message="약관을 불러오는 중이에요" />;
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-sm text-red-500">약관 정보를 불러오지 못했어요.</p>
      </div>
    );
  }

  if (terms.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-sm text-gray-400">등록된 약관이 없어요.</p>
      </div>
    );
  }

  /* =========================
     렌더링
  ========================= */
  return (
    <div className="bg-white">
      {terms.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() =>
            navigate(`/index/mypage/terms/${item.termsType.toLowerCase()}`)
          }
          className="flex w-full items-center justify-between border-b px-4 py-4 text-left active:bg-gray-50"
        >
          <p className="text-[16px] font-medium text-[#1e1e1e]">{item.title}</p>

          <ChevronLeft className="h-5 w-5 rotate-180 text-[#BDBDBD]" />
        </button>
      ))}
    </div>
  );
}
