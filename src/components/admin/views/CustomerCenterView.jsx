import { Search, MessageSquare, Handshake, Send } from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '../ui/Badge';

export default function CustomerCenterView() {
  const [activeTab, setActiveTab] = useState('qna');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const qnaList = [
    {
      id: 1,
      title: '로그인이 안 됩니다',
      user: '도마뱀집사',
      date: '10분 전',
      status: '대기',
      content:
        '어제까지 잘 되었는데 오늘 갑자기 비밀번호가 틀리다고 나옵니다. 소셜 로그인을 사용 중인데 가입 경로가 헷갈리네요.',
    },
    {
      id: 2,
      title: '영수증 인증 오류 문의',
      user: '나나맘',
      date: '2시간 전',
      status: '완료',
      content:
        '이미지가 선명한데 자꾸 인식이 안 된다고 뜨네요. 수동으로 등록 부탁드립니다.',
    },
  ];

  const partnershipList = [
    {
      id: 101,
      company: '(주)펫보험코리아',
      type: '광고',
      date: '1일 전',
      status: '대기',
      title: '앱 내 배너 광고 집행 문의',
      content:
        '귀사의 서비스 이용자 타겟팅이 저희 상품과 잘 맞아 광고를 집행하고 싶습니다. 제안서 전달드립니다.',
    },
  ];

  const currentList = activeTab === 'qna' ? qnaList : partnershipList;

  return (
    <div className="animate-in fade-in flex h-[calc(100vh-160px)] flex-col gap-6 duration-500">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab('qna');
            setSelectedInquiry(null);
          }}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all ${activeTab === 'qna' ? 'border-b-4 border-blue-600 bg-blue-50/30 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <MessageSquare className="h-4 w-4" /> 1:1 고객 문의
        </button>
        <button
          onClick={() => {
            setActiveTab('partner');
            setSelectedInquiry(null);
          }}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all ${activeTab === 'partner' ? 'border-b-4 border-blue-600 bg-blue-50/30 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Handshake className="h-4 w-4" /> 기업 제휴/광고 문의
        </button>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        <div className="flex w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b bg-gray-50/50 p-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full rounded-xl border py-2 pr-4 pl-9 text-xs"
                placeholder="검색어 입력..."
              />
            </div>
          </div>
          <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
            {currentList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedInquiry(item)}
                className={`cursor-pointer p-5 transition-all hover:bg-gray-50 ${selectedInquiry?.id === item.id ? 'border-r-4 border-blue-600 bg-blue-50/80' : ''}`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <Badge color={item.status === '대기' ? 'yellow' : 'green'}>
                    {item.status}
                  </Badge>
                  <span className="font-mono text-[10px] text-gray-400">
                    {item.date}
                  </span>
                </div>
                <h4 className="line-clamp-1 text-sm font-bold text-gray-800">
                  {activeTab === 'qna' ? item.title : item.company}
                </h4>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {activeTab === 'qna' ? item.user : item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
          {selectedInquiry ? (
            <div className="animate-in slide-in-from-right-4 flex h-full flex-col duration-300">
              <div className="mb-8 border-b pb-8">
                <h3 className="text-2xl leading-tight font-black text-gray-800">
                  {activeTab === 'qna'
                    ? selectedInquiry.title
                    : selectedInquiry.company}
                </h3>
                <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                  {selectedInquiry.content}
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                <label className="mb-3 flex items-center gap-2 text-sm font-black text-gray-700">
                  <Send className="h-4 w-4 text-blue-600" /> 답변 작성
                </label>
                <textarea
                  className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="내용을 입력하세요..."
                />
                <div className="mt-6 flex justify-end gap-3">
                  <button className="rounded-xl bg-blue-600 px-10 py-3 text-sm font-black text-white shadow-lg shadow-blue-100">
                    답변 전송 완료
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-300 opacity-50">
              <MessageSquare className="mb-4 h-20 w-20" />
              <p>항목을 선택해주세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
