import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';

import ContentForm from './ContentForm.jsx';

export default function ContentModify() {
  const navigate = useNavigate();
  const { id } = useParams(); // noticeId
  console.log(id);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     상세 조회 (공지/배너)
  ========================= */
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/admin/notices/${id}`);
        console.log(response);
        setItem(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  /* =========================
     로딩 상태
  ========================= */
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-400">불러오는 중...</div>
    );
  }

  /* =========================
     데이터 없음
  ========================= */
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

  /* =========================
     수정 폼
  ========================= */
  return (
    <ContentForm
      mode="edit"
      noticeId={id}
      initialData={item}
      onBack={() => navigate('/admin/content')}
    />
  );
}
