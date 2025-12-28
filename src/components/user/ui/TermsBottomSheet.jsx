import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx';
import { Accordion } from '@/components/ui/accordion.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useState } from 'react';
import TermsAgreementItem from './TermsAgreementItem.jsx';

export default function TermsBottomSheet({ open, onClose }) {
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const [agree4, setAgree4] = useState(false);

  const canSubmit = agree1 && agree2;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          fixed
          left-1/2
          bottom-0
          top-auto
          -translate-x-1/2
          translate-y-0

          w-full
          max-w-sm
          max-h-[90vh]

          rounded-t-2xl
          bg-white
          p-0
        "
      >
        {/* 내부 레이아웃 */}
        <div className="flex max-h-[90vh] flex-col px-6 py-6">
          {/* 헤더 (고정) */}
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              펫블런스를 쓰려면 동의가 필요해요
            </DialogTitle>
          </DialogHeader>

          {/* 약관 리스트 (스크롤 영역) */}
          <div className="mt-3 flex-1 overflow-y-auto">
            <Accordion type="multiple" className="space-y-1">
              <TermsAgreementItem
                value="terms"
                label="펫블런스 회원 약관 및 동의사항"
                required
                checked={agree1}
                onCheckedChange={setAgree1}
              >
                제1조 (목적) 이 약관은 펫블런스가 제공하는 서비스의 이용과
                관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정합니다...
              </TermsAgreementItem>

              <TermsAgreementItem
                value="privacy"
                label="개인정보 처리방침"
                required
                checked={agree2}
                onCheckedChange={setAgree2}
              >
                개인정보 처리방침 전문 텍스트가 들어갑니다...
              </TermsAgreementItem>

              <TermsAgreementItem
                value="location"
                label="위치기반 서비스 동의사항"
                checked={agree3}
                onCheckedChange={setAgree3}
              >
                위치기반 서비스 약관 내용...
              </TermsAgreementItem>

              <TermsAgreementItem
                value="marketing"
                label="마케팅 수신 동의사항"
                checked={agree4}
                onCheckedChange={setAgree4}
              >
                마케팅 정보 수신 관련 내용...
              </TermsAgreementItem>
            </Accordion>
          </div>

          {/* 버튼 영역 (항상 바텀) */}
          <div className="pt-4">
            <Button
              className="w-full bg-emerald-500"
              disabled={!canSubmit}
            >
              동의하기
            </Button>

            <button
              onClick={onClose}
              className="mt-2 w-full text-sm text-gray-400"
            >
              닫기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
