import { Handshake, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Pagination from '@/components/admin/Pagination.jsx';
import { Badge } from '@/components/admin/ui/Badge.jsx';

const TAB_CONFIG = {
  oneonone: {
    label: '1:1 고객 문의',
    apiType: 'ONE_ON_ONE',
    apiUrl: '/admin/qna',
  },
  partnership: {
    label: '기업 제휴 문의',
    apiType: 'PARTNERSHIP',
    apiUrl: '/admin/inquiries',
  },
};

export default function CustomerCenterView() {
  const [subTab, setSubTab] = useState('oneonone');
  const [page, setPage] = useState(1);

  const [list, setList] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* =========================
     상태 → Badge 색상
  ========================= */
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
  const mapQna = (item) => ({
    id: item.qnaId,
    status: item.status === 'ANSWER_WAITING' ? '대기' : '완료',
    author: item.writerNickname,
    title: item.title,
    content: item.content,
    date: item.createdAt,
  });

  const mapInquiry = (item, label) => ({
    id: item.inquiryId,
    status: item.inquiryAnswerType === 'ANSWER_WAITING' ? '대기' : '완료',
    author: item.companyName ?? item.managerName,
    title: label,
    content: item.content,
    date: item.createdAt,
  });

  const TAB_CONFIG = {
    oneonone: {
      label: '1:1 고객 문의',
      apiUrl: '/admin/qna',
      mapper: mapQna,
    },
    partnership: {
      label: '기업 제휴 문의',
      apiUrl: '/admin/inquiries',
      mapper: mapInquiry,
    },
  };

  /* =========================
     서버 데이터 조회 (탭 + 서버 페이징)
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = TAB_CONFIG[subTab];

        const response = await api.get(config.apiUrl, {
          params: { page },
        });
        console.log(response);
        const data = response.data.data;

        const mapped = data.content.map((item) =>
          subTab === 'oneonone'
            ? config.mapper(item)
            : config.mapper(item, config.label)
        );

        setList(mapped);
        setPageSize(data.size);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subTab, page]);

  /* =========================
     렌더링
  ========================= */
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <h2 className="text-2xl font-bold text-gray-800">고객센터</h2>

      {/* 탭 */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => {
            setSubTab('oneonone');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium ${
            subTab === 'oneonone'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="mr-1 inline h-4 w-4" />
          1:1 고객 문의
        </button>

        <button
          onClick={() => {
            setSubTab('partnership');
            setPage(1);
          }}
          className={`px-6 py-3 text-sm font-medium ${
            subTab === 'partnership'
              ? 'border-b-2 border-purple-600 text-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Handshake className="mr-1 inline h-4 w-4" />
          기업 제휴 문의
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-20 px-6 py-3">NO</th>
              <th className="w-24 px-6 py-3">상태</th>
              <th className="w-32 px-6 py-3">작성자</th>
              <th className="w-32 px-6 py-3">작성일</th>
              <th className="px-6 py-3">제목 및 내용</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  불러오는 중...
                </td>
              </tr>
            ) : list.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  데이터가 없습니다.
                </td>
              </tr>
            ) : (
              list.map((item, i) => (
                <tr
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    navigate(`/admin/cs/${item.id}`, {
                      state: { type: subTab }, // oneonone | partnership
                    })
                  }
                >
                  <td className="px-6 py-4">{(page - 1) * pageSize + i + 1}</td>
                  <td className="px-6 py-4">
                    <Badge color={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.author}</td>
                  <td className="px-6 py-4 text-gray-500">{item.date}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="max-w-lg truncate text-xs text-gray-500">
                      {item.content}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center bg-gray-50 py-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
