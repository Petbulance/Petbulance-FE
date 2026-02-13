import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';
import { Switch } from '@/components/ui/switch.jsx';

const OPTIONAL_TERM_TYPES = new Set(['MARKETING', 'LOCATION']);

const toBool = (value) =>
  value === true || value === 'true' || value === 'AGREE';

const getStatusKey = (termType) => {
  const upper = (termType || '').toUpperCase();
  if (upper === 'MARKETING') return 'marketing';
  if (upper === 'LOCATION') return 'location';
  return '';
};

export default function TermsDetailPage() {
  const { id } = useParams(); // SERVICE | PRIVACY | LOCATION | MARKETING
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [optionalAgree, setOptionalAgree] = useState(false);
  const [updatingOptionalAgree, setUpdatingOptionalAgree] = useState(false);

  const termType = (data?.termsType || id || '').toUpperCase();
  const isOptionalTerm =
    data?.required === false || OPTIONAL_TERM_TYPES.has(termType);

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
     선택 약관 현재 동의 상태 조회
  ========================= */
  useEffect(() => {
    if (!isOptionalTerm) return;

    const fetchOptionalStatus = async () => {
      try {
        const statusKey = getStatusKey(termType);
        if (!statusKey) return;

        const res = await api.get('/terms/status');
        const status = res.data?.data ?? {};
        setOptionalAgree(toBool(status[statusKey]));
      } catch (e) {
        console.error('선택 약관 상태 조회 실패', e);
      }
    };

    fetchOptionalStatus();
  }, [isOptionalTerm, termType]);

  /* =========================
     선택 약관 동의 변경
  ========================= */
  const updateOptionalConsent = async (nextValue) => {
    const _nextValue = nextValue;
    await api.delete(`/terms/${termType}`, {});
    return _nextValue;
  };

  const handleOptionalToggle = async (nextValue) => {
    const prev = optionalAgree;
    setOptionalAgree(nextValue);
    setUpdatingOptionalAgree(true);

    try {
      await updateOptionalConsent(nextValue);
    } catch (e) {
      console.error('선택 약관 동의 변경 실패', e);
      setOptionalAgree(prev);

      const serverMessage =
        e?.response?.data?.data?.message || '동의 상태 변경에 실패했습니다.';
      alert(serverMessage);
    } finally {
      setUpdatingOptionalAgree(false);
    }
  };

  /* =========================
     상태 처리
  ========================= */
  if (loading) {
    return <Spinner fullScreen message="약관을 불러오는 중이에요" />;
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
      {isOptionalTerm && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-[#E5E7EB] px-4 py-3">
          <div>
            <p className="text-[14px] font-semibold text-[#1e1e1e]">
              선택 약관 동의
            </p>
          </div>
          <Switch
            checked={optionalAgree}
            disabled={updatingOptionalAgree}
            onCheckedChange={handleOptionalToggle}
            className="data-[state=checked]:bg-success"
          />
        </div>
      )}

      <h1 className="mb-4 text-[18px] font-semibold">{data.title}</h1>

      <div
        className="terms-content text-[14px] leading-relaxed text-[#424242]"
        dangerouslySetInnerHTML={{ __html: data.summary }}
      />
    </div>
  );
}
