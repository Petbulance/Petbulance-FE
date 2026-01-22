import { Activity } from 'lucide-react';
import { useMemo, useState } from 'react';

const days = ['월', '화', '수', '목', '금', '토', '일'];
const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const DEFAULT_HOURS = {
  mon: '09:00~18:00',
  tue: '09:00~18:00',
  wed: '09:00~18:00',
  thu: '09:00~18:00',
  fri: '09:00~18:00',
  sat: '10:00~17:00',
  sun: '휴무',
};

const MOCK_HOSPITAL_HISTORY = [
  {
    id: 1,
    date: '2024-08-01 14:20',
    field: '주소',
    oldValue: '서울 강남구 역삼로 101',
    newValue: '서울 강남구 역삼로 123',
    admin: '관리자A',
  },
  {
    id: 2,
    date: '2024-07-20 09:45',
    field: '전화번호',
    oldValue: '02-1234-5678',
    newValue: '02-9876-5432',
    admin: '관리자B',
  },
  {
    id: 3,
    date: '2024-07-05 18:10',
    field: '소개글',
    oldValue: '반려동물의 건강을 최우선',
    newValue: '24시간 응급 진료 가능',
    admin: '관리자C',
  },
];

export default function HospitalDetail({ hospital }) {
  const [hospitalTab, setHospitalTab] = useState('info');

  const currentHospital = hospital ?? {};
  const hours = currentHospital.hours || DEFAULT_HOURS;

  const tagText = useMemo(() => {
    if (Array.isArray(currentHospital.tags)) return currentHospital.tags.join(', ');
    return currentHospital.tags || '';
  }, [currentHospital.tags]);

  const speciesText = useMemo(() => {
    if (Array.isArray(currentHospital.species)) return currentHospital.species.join(', ');
    return currentHospital.species || '';
  }, [currentHospital.species]);

  return (
    <div className="flex w-2/3 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b px-6 pt-6 pb-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {currentHospital.name || '병원을 선택하세요'}
            </h3>
            <span className="text-sm text-gray-500">DB ID: {currentHospital.id || '-'}</span>
          </div>
          {hospitalTab === 'info' && (
            <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              변경사항 저장
            </button>
          )}
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => setHospitalTab('info')}
            className={`pb-3 text-sm font-medium ${
              hospitalTab === 'info'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            기본 정보
          </button>
          <button
            onClick={() => setHospitalTab('history')}
            className={`pb-3 text-sm font-medium ${
              hospitalTab === 'history'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            변경 이력
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {hospitalTab === 'info' ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">병원명</label>
                <input
                  type="text"
                  defaultValue={currentHospital.name}
                  className="w-full rounded border p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">전화번호</label>
                <input
                  type="text"
                  defaultValue={currentHospital.phone}
                  className="w-full rounded border p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">주소</label>
                <input
                  type="text"
                  defaultValue={currentHospital.address}
                  className="w-full rounded border p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">위도/경도</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="37.12345"
                    className="w-full rounded border p-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="127.12345"
                    className="w-full rounded border p-2 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">운영시간</label>
                <div className="grid grid-cols-2 gap-2">
                  {days.map((day, idx) => (
                    <div key={day} className="flex items-center gap-2">
                      <span className="w-4 text-xs text-gray-500">{day}</span>
                      <input
                        type="text"
                        defaultValue={hours?.[dayKeys[idx]] || DEFAULT_HOURS[dayKeys[idx]]}
                        className="w-full rounded border p-1 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">진료가능종 (태그)</label>
                <input
                  type="text"
                  defaultValue={speciesText}
                  className="w-full rounded border p-2 text-sm"
                  placeholder="쉼표(,)로 구분하여 입력"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">태그 (쉼표 구분)</label>
                <input
                  type="text"
                  defaultValue={tagText}
                  className="w-full rounded border p-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">병원 소개글</label>
                <textarea
                  rows={2}
                  defaultValue={currentHospital.intro}
                  className="w-full rounded border p-2 text-sm"
                ></textarea>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4 flex items-start gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
              <Activity size={16} className="mt-0.5 shrink-0" />
              <p>
                해당 병원 정보의 수정 이력입니다. 데이터 무결성을 위해 모든 변경 사항이 기록됩니다.
              </p>
            </div>
            <table className="w-full overflow-hidden rounded-lg border text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3">수정 일시</th>
                  <th className="px-4 py-3">수정 항목</th>
                  <th className="px-4 py-3">변경 전</th>
                  <th className="px-4 py-3">변경 후</th>
                  <th className="px-4 py-3">작업자</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOCK_HOSPITAL_HISTORY.map((history) => (
                  <tr key={history.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{history.date}</td>
                    <td className="px-4 py-3 font-medium">{history.field}</td>
                    <td className="px-4 py-3 text-xs text-red-500 line-through">{history.oldValue}</td>
                    <td className="px-4 py-3 font-medium text-green-600">{history.newValue}</td>
                    <td className="px-4 py-3">{history.admin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
