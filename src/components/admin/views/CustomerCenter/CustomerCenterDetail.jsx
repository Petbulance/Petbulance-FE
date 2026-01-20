import { ChevronLeft, Handshake, MessageSquare } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MOCK_CS } from '@/components/admin/mock/customerCenter.mock.js';

import { Badge } from '../../ui/Badge.jsx';

const getStatusColor = (status) => {
  switch (status) {
    case '대기':
      return 'yellow';
    case '완료':
      return 'green';
    default:
      return 'gray';
  }
};

export default function CustomerCenterDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const item = useMemo(() => MOCK_CS.find((cs) => String(cs.id) === id), [id]);

  if (!item) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/admin/cs')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          고객센터 목록으로 돌아가기
        </button>

        <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
          해당 문의를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const TypeIcon = item.type === '1:1' ? MessageSquare : Handshake;
  const typeLabel = item.type === '1:1' ? '1:1 고객 문의' : '기업 제휴 문의';

  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <button
        onClick={() => navigate('/admin/cs')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} className="mr-1" />
        목록으로 돌아가기
      </button>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <TypeIcon className="h-4 w-4" />
        <span>{typeLabel}</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800">문의 상세</h2>

      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between border-b pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-500">
              작성자: {item.author}
              {item.company ? ` | 기업: ${item.company}` : ''} | 작성일:{' '}
              {item.date} | 상태:{' '}
              <Badge color={getStatusColor(item.status)}>{item.status}</Badge>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">문의 내용</h4>
          <div className="rounded bg-gray-50 p-4 text-sm leading-relaxed text-gray-800">
            {item.content}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">
            관리자 답변 작성
          </h4>
          <textarea
            className="h-32 w-full rounded border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="답변을 입력하세요..."
            defaultValue={item.answer ?? ''}
          />
          <div className="flex justify-end">
            <button className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700">
              답변 전송 및 처리 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
