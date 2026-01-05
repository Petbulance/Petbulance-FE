import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog.jsx';
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
          h-[472px]
          max-h-[90vh]
          rounded-t-3xl
          bg-white
          p-0
        "
      >
        {/* 내부 레이아웃 */}
        <div className="flex max-h-[90vh] flex-col px-6 py-6">
          {/* 헤더 (고정) */}
          <DialogHeader>
            <DialogTitle
              className="
    inline-flex items-center
    font-pretendard
    text-[23px]
    font-semibold
    leading-[24px]
    tracking-[0.1px]
    text-[#1e1e1e]
  "
            >
              펫뷸런스를  쓰려면 동의가 필요해요
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
                제1조 (목적)
                이 약관은 주식회사 펫뷸런스(이하 “회사”)가 제공하는 특수동물 병원 정보 검색, 후기 등록, 비대면 상담, 실시간 진료 여부 확인 등 서비스(이하 “서비스”)의 이용조건 및 절차, 회사와 이용자(회원 및 비회원) 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                제2조 (정의)
                “이용자”란 본 약관에 동의하고 서비스를 이용하는 회원 및 비회원을 말합니다.
                “회원”이란 회사와 이용계약을 체결하고 서비스를 이용하는 자를 말합니다.
                “비회원”이란 회원가입 없이 회사가 제공하는 일부 서비스를 이용하는 자를 말합니다.
                “콘텐츠”란 이용자가 서비스 내에서 등록하거나 열람할 수 있는 후기, 사진, 병원 정보, 상담기록 등을 의미합니다.
                “병원정보제공자”란 회사와 제휴 또는 등록절차에 따라 병원 정보를 제공하는 특수동물 병원을 말합니다.
                제3조 (약관의 게시 및 변경)
                회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면 또는 웹사이트에 게시합니다.
                회사는 관련 법령을 위배하지 않는 범위 내에서 약관을 변경할 수 있으며, 변경 시 변경사유 및 적용일자를 명시해 최소 7일 이상 공지하고, 이용자가 거부의사를 표시하지 않으면 승인된 것으로 봅니다.
                변경된 약관은 공지된 적용일자 이후부터 효력이 발생합니다.
                제4조 (이용계약의 체결 및 해지)
                이용자는 본 약관에 동의하고 회원가입 절차를 완료함으로써 이용계약이 성립됩니다.
                회사는 다음 각 호에 해당하는 신청에 대해 승낙을 하지 않을 수 있습니다:
                허위 정보를 등록한 경우
                이용신청 요건을 충족하지 않은 경우
                회원은 언제든지 서비스 내 계정 삭제 또는 탈퇴 신청을 할 수 있으며, 회사는 관련 절차를 이용자가 탈퇴 요청한 날 또는 회원이 탈퇴 기준을 충족한 날로부터 처리합니다.
                제5조 (서비스의 제공 및 변경)
                회사는 다음과 같은 서비스를 제공합니다:
                특수동물 병원 정보 검색 및 필터링
                병원 후기 등록 및 열람
                커뮤니티 글 등록 및 작성
                기타 회사가 추가개발 또는 제휴를 통해 제공하는 서비스
                회사는 서비스의 내용 및 제공 시간을 변경할 수 있으며, 변경이 필요한 경우 이용자에게 사전 공지합니다.
                회사는 천재지변, 설비점검, 장애 등으로 서비스 제공이 지연되거나 중단될 수 있으며, 이에 대해 책임을 지지 않을 수 있습니다.
                제6조 (이용자의 의무)
                이용자는 관련 법령, 본 약관, 운영정책 및 공지사항을 준수해야 합니다.
                이용자는 서비스를 이용함에 있어 다음 행위를 하여서는 안 됩니다:
                허위 정보 등록 또는 타인의 정보를 도용하는 행위
                서비스의 안정적 운영을 방해하는 행위
                타인의 권리를 침해하거나 명예를 훼손하는 행위
                이용자는 회사가 요청하는 경우 이용신청 사항을 진실하게 제공해야 하며, 변경사항이 있는 경우 즉시 통지해야 합니다.
                제7조 (콘텐츠의 저작권 및 이용제한)
                서비스 내 등록된 콘텐츠(후기, 사진 등)의 저작권은 원칙적으로 해당 이용자에게 귀속됩니다.
                이용자는 자신이 등록한 콘텐츠가 제3자의 권리를 침해하지 않음을 보장해야 합니다.
                회사는 이용자가 등록한 콘텐츠를 서비스 운영·홍보 목적으로 사용할 수 있으며, 이용자는 이를 위해 별도 동의합니다.
                제8조 (회사의 면책 및 책임제한)
                회사는 병원정보, 이용후기, 상담 결과 등 제3자가 제공한 정보의 정확성, 완전성, 적합성에 대해 보증하지 않습니다.
                이용자 간의 상담, 진료예약, 병원 방문 등과 관련한 분쟁에 대하여 회사는 책임을 지지 않습니다.
                회사는 무료로 제공되는 서비스 이용으로 인해 이용자에게 발생한 손해에 대해서도, 회사가 고의 또는 중과실로 입증되지 않는 한 책임을 지지 않습니다.
                제9조 (서비스 이용의 제한 및 중지)
                회사는 다음 각 호의 사유가 있을 경우 이용자의 서비스 이용을 제한하거나 중지할 수 있습니다:
                이용자가 약관 또는 운영정책을 위반한 경우
                타인의 명의를 도용하거나 허위로 계정을 생성한 경우
                기타 회사가 서비스 운영상 필요하다고 인정한 경우
                이 경우 회사는 사전 통지하거나 사후 통지할 수 있으며, 중지 기간 및 조건 등을 이용자에게 안내합니다.
                제10조 (약관의 해석 및 준거법·분쟁해결)
                본 약관에 명시되지 않은 사항은 관계법령 및 상관례에 따릅니다.
                본 약관과 이용계약의 해석 및 이행에 관하여 분쟁이 발생할 경우 대한민국 법률을 준거법으로 하며, 관할 법원은 회사의 본사 소재지를 관할하는 법원으로 합니다.
                부칙
                이 약관은 2025년 00월 00일부터 시행됩니다.
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
          <div className="">
            <Button
              className="w-full h-[68px] bg-primary text-[27px] rounded-2xl "
              disabled={!canSubmit}
            >
             <p className="text-inverse">동의하기</p>
            </Button>

            <button
              onClick={onClose}
              className="mt-3 w-full h-[68px] font-semibold text-caption text-[20px]"
            >
              닫기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
