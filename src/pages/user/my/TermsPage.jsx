import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TERMS = [
  { id: 'service', title: '서비스 이용약관' },
  { id: 'privacy', title: '펫플러스 개인정보 처리방침' },
  { id: 'operation', title: '운영정책' },
  { id: 'location', title: '위치기반서비스 이용약관' },
  { id: 'marketing', title: '마케팅 정보 수신 동의 약관' },
]

export default function TermsPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white">
      {TERMS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() =>
            navigate(`/index/mypage/terms/${item.id}`)
          }
          className="
            flex w-full items-center justify-between
            border-b px-4 py-4 text-left
            active:bg-gray-50
          "
        >
          <p className="text-[16px] font-medium text-[#1e1e1e]">
            {item.title}
          </p>

          <ChevronLeft className="h-5 w-5 rotate-180 text-[#BDBDBD]" />
        </button>
      ))}
    </div>
  )
}
