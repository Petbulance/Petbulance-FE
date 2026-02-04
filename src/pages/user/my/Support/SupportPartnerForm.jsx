import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import ConfirmSupportModal from '@/components/commons/layout/ConfirmSupportModal.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';

/* ================= ENUM 매핑 ================= */
const TYPE_MAP = {
  ad: 'ADVERTISING',
  partner: 'HOSPITAL_PARTNERSHIP',
};

const INTEREST_MAP = {
  '배너 광고': 'BANNER_AD',
  '병원 등록': 'HOSPITAL_REGISTRATION',
  '이벤트 협업': 'EVENT_COLLABORATION',
  기타: 'ETC',
};

export default function SupportPartnerForm() {
  const navigate = useNavigate();

  /* ================= 상태 ================= */
  const [form, setForm] = useState({
    type: 'ad', // ad | partner
    companyName: '',
    managerName: '',
    position: '',
    phone: '',
    email: '',
    interests: [],
    content: '',
    agree: false,
  });

  const [modal, setModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ================= handlers ================= */
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (value) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((v) => v !== value)
        : [...prev.interests, value],
    }));
  };

  /* ================= 제출 ================= */
  const handleSubmit = async () => {
    if (!form.agree) return;

    if (!form.phone && !form.email) {
      alert('연락처는 최소 1개 이상 입력해야 합니다.');
      return;
    }

    if (form.interests.length === 0) {
      alert('관심 항목을 최소 1개 선택해주세요.');
      return;
    }

    const payload = {
      type: TYPE_MAP[form.type],
      companyName: form.companyName,
      managerName: form.managerName,
      managerPosition: form.position || null,
      phone: form.phone || null,
      email: form.email || null,
      interestType: INTEREST_MAP[form.interests[0]], // ✅ 단일 값
      content: form.content,
      privacyConsent: form.agree,
    };

    try {
      setSubmitting(true);
      await api.post('/inquiries', payload);
      setModal(true);
    } catch (e) {
      alert(
        e?.response?.data?.data?.message ||
          '문의 접수에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= 제출 가능 여부 ================= */
  const isSubmitDisabled =
    !form.companyName ||
    !form.managerName ||
    (!form.phone && !form.email) ||
    !form.content ||
    !form.agree ||
    form.interests.length === 0 ||
    submitting;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* ================= Content ================= */}
      <main className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
        {/* 문의 유형 */}
        <section>
          <p className="mb-2 text-[16px] font-medium text-[#1e1e1e]">
            문의 유형
          </p>
          <p className="mb-3 text-[13px] text-[#9E9E9E]">
            제휴 유형을 선택하고 정보를 입력해주세요.
          </p>

          <RadioGroup
            value={form.type}
            onValueChange={(v) => updateField('type', v)}
            className="flex gap-6"
          >
            <Label className="flex cursor-pointer items-center gap-2 text-[14px]">
              <RadioGroupItem value="ad" />
              광고 문의
            </Label>

            <Label className="flex cursor-pointer items-center gap-2 text-[14px]">
              <RadioGroupItem value="partner" />
              병원 제휴 문의
            </Label>
          </RadioGroup>
        </section>

        {/* 회사 / 병원명 */}
        <section className="space-y-1">
          <Label className="text-[14px] font-medium">회사/병원명</Label>
          <Input
            value={form.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            placeholder="예) 펫플러스 동물병원"
          />
        </section>

        {/* 담당자명 / 직책 */}
        <section className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-[14px] font-medium">담당자명</Label>
            <Input
              value={form.managerName}
              onChange={(e) => updateField('managerName', e.target.value)}
              placeholder="홍길동"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[14px] font-medium">직책</Label>
            <Input
              value={form.position}
              onChange={(e) => updateField('position', e.target.value)}
              placeholder="예) 마케팅 매니저"
            />
          </div>
        </section>

        {/* 연락처 */}
        <section className="space-y-1">
          <Label className="text-[14px] font-medium">연락처</Label>
          <Input
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="010-0000-0000"
          />
        </section>

        {/* 이메일 */}
        <section className="space-y-1">
          <Label className="text-[14px] font-medium">이메일</Label>
          <Input
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="email@company.com"
          />
        </section>

        {/* 관심 항목 */}
        <section>
          <p className="mb-2 text-[14px] font-medium">
            관심 항목 (중복선택 가능)
          </p>

          <div className="flex flex-wrap gap-4 text-[14px]">
            {['배너 광고', '병원 등록', '이벤트 협업', '기타'].map((item) => (
              <Label
                key={item}
                className="flex cursor-pointer items-center gap-2"
              >
                <Checkbox
                  checked={form.interests.includes(item)}
                  onCheckedChange={() => toggleInterest(item)}
                />
                {item}
              </Label>
            ))}
          </div>
        </section>

        {/* 문의 내용 */}
        <section className="space-y-1">
          <Label className="text-[14px] font-medium">문의 내용</Label>
          <Textarea
            rows={5}
            value={form.content}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder="제휴/광고 목적과 예산, 희망 일정 등을 자유롭게 작성해 주세요."
          />
        </section>

        {/* 동의 */}
        <Label className="flex cursor-pointer items-start gap-2 text-[13px] text-[#424242]">
          <Checkbox
            checked={form.agree}
            onCheckedChange={(v) => updateField('agree', v)}
            className="mt-1"
          />
          (필수) 문의 처리 목적의 개인정보 수집 및 이용에 동의합니다.
        </Label>
      </main>

      {/* ================= Submit ================= */}
      <footer className="border-t px-4 py-3">
        <button
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className={`w-full rounded-lg py-3 text-[15px] font-medium text-white ${
            isSubmitDisabled ? 'bg-[#E0E0E0]' : 'bg-[#27BE69]'
          }`}
        >
          문의 제출
        </button>
      </footer>

      <ConfirmSupportModal
        open={modal}
        title="문의 제출이 완료되었습니다."
        content="담당자 확인 후 연락드릴게요."
        confirmText="홈으로"
        cancelText="닫기"
        onCancel={() => setModal(false)}
        onConfirm={() => navigate('/index/home')}
      />
    </div>
  );
}
