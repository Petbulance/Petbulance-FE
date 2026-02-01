import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@/apis/api.jsx';

const NOTICE_STATUS_MAP = {
  EVENT: '이벤트',
  NOTICE: '공지',
  AD: '광고',
};

const BADGE_STYLE = {
  이벤트: 'bg-[#E6FAEE] text-[#27BE69]',
  공지: 'bg-[#E6F2FF] text-[#0265CF]',
  광고: 'bg-[#FAF5B8] text-[#142435]',
};

export default function NoticeDetail() {
  const { id } = useParams();
  const [noticeDetailData, setNoticeDetailData] = useState(null);

  const fetchNoticeDetail = async () => {
    try {
      const response = await api.get(`/notices/${id}`);
      setNoticeDetailData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setNoticeDetailData(null);
    }
  };

  useEffect(() => {
    fetchNoticeDetail();
  }, [id]);

  if (!noticeDetailData) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-[18px] text-[#424242]">공지사항을 찾을 수 없어요</p>
      </div>
    );
  }

  const label = NOTICE_STATUS_MAP[noticeDetailData.noticeStatus] ?? '공지';

  return (
    <div className="flex h-full flex-col bg-white">
      <main className="flex-1 overflow-y-auto px-6 py-5">
        {/* 배지 */}
        <span
          className={`inline-block rounded px-2 py-0.5 text-[14px] font-medium ${
            BADGE_STYLE[label]
          }`}
        >
          {label}
        </span>

        {/* 제목 */}
        <h1 className="mt-2 text-[20px] font-semibold">
          {noticeDetailData.title}
        </h1>

        {/* 날짜 */}
        <p className="mt-1 border-b text-[14px] text-gray-400">
          {noticeDetailData.createdAt}
        </p>

        {/* 내용 */}
        {/* 내용 */}
        <div className="mt-6 text-[15px] leading-relaxed whitespace-pre-line text-[#424242]">
          {/* 이미지 */}
          {Array.isArray(noticeDetailData.attachments) &&
            noticeDetailData.attachments.map((file) => (
              <img
                key={file.fileId}
                src={file.fileUrl}
                alt={file.fileName}
                className="my-4 w-full rounded-lg object-contain"
              />
            ))}

          {/* 텍스트 */}
          {noticeDetailData.content}
        </div>
      </main>
    </div>
  );
}
