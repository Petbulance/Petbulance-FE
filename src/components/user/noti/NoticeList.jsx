import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@/apis/api.jsx';
import Spinner from '@/components/commons/Spinner.jsx';

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

export default function NoticeList() {
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotices = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notices');
      setNoticeData(response.data?.data?.content ?? []);
    } catch (e) {
      console.error(e);
      setNoticeData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  if (loading) {
    return <Spinner fullScreen message="공지사항을 불러오는 중이에요" />;
  }

  if (noticeData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <p className="text-[18px] text-[#424242]">공지사항이 없어요</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {noticeData.map((item) => {
        const label = NOTICE_STATUS_MAP[item.noticeStatus] ?? '공지';

        return (
          <button
            key={item.noticeId}
            type="button"
            onClick={() => navigate(`/index/mypage/notice/${item.noticeId}`)}
            className="flex w-full items-center justify-between border-b px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100"
          >
            <div>
              <span
                className={`mb-1 inline-block rounded px-2 py-0.5 text-[14px] font-medium ${
                  BADGE_STYLE[label]
                }`}
              >
                {label}
              </span>

              <p className="text-[17px] font-medium">{item.title}</p>

              <p className="mt-1 text-[13px] text-gray-400">{item.createdAt}</p>
            </div>

            <ChevronLeft className="h-8 w-8 rotate-180 text-[#E0E0E0]" />
          </button>
        );
      })}
    </div>
  );
}
