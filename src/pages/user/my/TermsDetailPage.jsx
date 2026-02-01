import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';

export default function TermsDetailPage() {
  const { id } = useParams(); // SERVICE | PRIVACY | LOCATION | MARKETING
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  /* =========================
     약관 상세 조회
  ========================= */
  useEffect(() => {
    const fetchTermsDetail = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await api.get(`/terms/${id.toUpperCase()}`);
        setData(res.data.data);
      } catch (e) {
        console.error('약관 상세 조회 실패', e);

        // ❌ 존재하지 않는 약관
        if (e.response?.status === 404) {
          setNotFound(true);
        }

        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTermsDetail();
  }, [id]);

  /* =========================
     상태 처리
  ========================= */
  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-400">약관을 불러오는 중이에요…</div>
    );
  }

  if (notFound) {
    return (
      <div className="p-4 text-sm text-gray-400">
        요청하신 약관을 찾을 수 없어요.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-sm text-gray-400">
        약관 정보를 불러오지 못했어요.
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-5">
      <h1 className="mb-4 text-[18px] font-semibold">{data.title}</h1>

      <div
        className="terms-content text-[14px] leading-relaxed text-[#424242]"
        dangerouslySetInnerHTML={{ __html: data.summary }}
      />
    </div>
  );
}
