import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';
import { Accordion } from '@/components/ui/accordion.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx';

import TermsAgreementItem from './TermsAgreementItem.jsx';

export default function TermsBottomSheet({ open, onClose, onConsented }) {
  /* ===============================
     state
  =============================== */
  const [terms, setTerms] = useState([]);
  const [agreements, setAgreements] = useState({});
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     약관 조회
  =============================== */
  useEffect(() => {
    if (!open) return;

    const fetchTerms = async () => {
      try {
        const res = await api.get('/terms');
        const list = res.data.data;

        setTerms(list);

        // id 기준 동의 상태 초기화
        const init = {};
        list.forEach((t) => {
          init[t.id] = false;
        });
        setAgreements(init);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTerms();
  }, [open]);

  /* ===============================
     필수 약관 동의 여부
  =============================== */
  const isRequiredAgreed = terms
    .filter((t) => t.required)
    .every((t) => agreements[t.id]);

  /* ===============================
     공통 API 호출
  =============================== */
  const submitConsents = async (termsIds) => {
    try {
      setLoading(true);

      const tempToken = localStorage.getItem('temp_access_token');
      const finalToken = localStorage.getItem('access_token');
      const authToken = tempToken || finalToken;

      if (!authToken) {
        alert('로그인 정보가 없습니다. 다시 로그인해 주세요.');
        return;
      }

      const res = await api.post(
        '/terms/consents',
        {
          termsId: termsIds,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { accessToken, finalAccessToken, refreshToken } =
        res.data?.data || {};
      const tokenToStore = finalAccessToken || accessToken;

      if (tokenToStore) {
        localStorage.setItem('access_token', tokenToStore);
        localStorage.removeItem('temp_access_token');
      }
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }

      onClose();
      onConsented?.();
    } catch (e) {
      const error = e?.response?.data?.data;

      if (error?.errorClassName === 'REQUIRED_TERMS_MISSING') {
        alert(error.message);
      } else {
        alert('약관 동의 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     전체 동의하기
  =============================== */
  const handleAgreeAll = () => {
    const allIds = terms.map((t) => t.id);

    const next = {};
    terms.forEach((t) => {
      next[t.id] = true;
    });
    setAgreements(next);

    submitConsents(allIds);
  };

  /* ===============================
     동의하기
  =============================== */
  const handleSubmit = () => {
    if (!isRequiredAgreed) {
      alert('필수 약관에 모두 동의해 주세요.');
      return;
    }

    const agreedIds = Object.entries(agreements)
      .filter(([, checked]) => checked)
      .map(([id]) => Number(id));

    submitConsents(agreedIds);
  };

  /* ===============================
     render
  =============================== */
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="fixed top-1/2 left-1/2 h-[472px] max-h-[90vh] w-[calc(100vw-2rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-0">
          {/* 내부 레이아웃 */}
          <div className="flex max-h-[90vh] flex-col px-6 py-6">
            {/* 헤더 (고정) */}
            <DialogHeader>
              <DialogTitle className="font-pretendard inline-flex items-center text-[23px] leading-[24px] font-semibold tracking-[0.1px] text-[#1e1e1e]">
                펫뷸런스를 쓰려면 동의가 필요해요
              </DialogTitle>
            </DialogHeader>

            {/* 약관 리스트 (스크롤 영역) */}
            <div className="mt-3 flex-1 overflow-y-auto">
              <Accordion type="multiple" className="space-y-1">
                {terms.map((term) => (
                  <TermsAgreementItem
                    key={term.id}
                    value={term.termsType}
                    label={term.title}
                    required={term.required}
                    checked={agreements[term.id]}
                    onCheckedChange={(checked) =>
                      setAgreements((prev) => ({
                        ...prev,
                        [term.id]: checked,
                      }))
                    }
                    onClickDetail={() => setSelectedTerm(term)}
                  >
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: term.summary }}
                    />
                  </TermsAgreementItem>
                ))}
              </Accordion>
            </div>

            <div>
              <Button
                className="h-[68px] w-full rounded-2xl bg-[#2da969] text-[27px]"
                // disabled={loading || !isRequiredAgreed}
                onClick={handleAgreeAll}
              >
                <p className="text-[27px]">전체 동의하기</p>
              </Button>

              <button
                onClick={handleSubmit}
                className="mt-3 h-[68px] w-full rounded-2xl border border-[#2da969] text-[20px] text-[27px] text-[#2da969]"
                disabled={loading}
              >
                동의하기
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 상세 약관 */}
      <Dialog open={!!selectedTerm} onOpenChange={() => setSelectedTerm(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTerm?.title}</DialogTitle>
          </DialogHeader>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedTerm?.summary }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
