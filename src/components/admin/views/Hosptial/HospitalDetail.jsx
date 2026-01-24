import { Activity } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import api from '@/apis/api.jsx';

const days = ['월', '화', '수', '목', '금', '토', '일'];
const dayMap = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function HospitalDetail({ hospitalId }) {
  const [hospitalTab, setHospitalTab] = useState('info');
  const [hospital, setHospital] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     병원 상세 조회
  ========================= */
  useEffect(() => {
    if (!hospitalId) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/hospital/detail/${hospitalId}`);
        setHospital(res.data.data);
        console.log(res.data.data);
        setForm(res.data.data);
      } catch (e) {
        console.error(e);
        setHospital(null);
        setForm(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [hospitalId]);

  const currentHospital = hospital ?? {};

  /* =========================
     운영시간 가공 (UI 유지)
  ========================= */
  const hours = useMemo(() => {
    const map = {};
    currentHospital.worktimes?.forEach((w) => {
      const idx = dayMap.indexOf(w.dayOfWeek);
      if (idx !== -1) {
        map[idx] = w.isOpen
          ? `${w.openTime ?? ''}~${w.closeTime ?? ''}`
          : '휴무';
      }
    });
    return map;
  }, [currentHospital.worktimes]);

  const tagText = useMemo(
    () => currentHospital.tag ?? '미작성',
    [currentHospital.tag]
  );

  const speciesText = useMemo(
    () =>
      currentHospital.treatmentAnimalType
        ? currentHospital.treatmentAnimalType.split(',').join(', ')
        : '미작성',
    [currentHospital.treatmentAnimalType]
  );

  /* =========================
     공통 변경 처리
  ========================= */
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateWorkTime = (idx, value) => {
    setForm((prev) => {
      const next = [...(prev.worktimes ?? [])];

      const [openTime, closeTime] =
        value === '휴무' || value === '미작성'
          ? [null, null]
          : value.split('~');

      next[idx] = {
        dayOfWeek: dayMap[idx],
        openTime,
        closeTime,
        isOpen: !!openTime,
      };

      return { ...prev, worktimes: next };
    });
  };

  /* =========================
     저장
  ========================= */
  const handleSave = async () => {
    const payload = {
      hospitalName: form.name,
      phoneNumber: form.phoneNumber,

      // ✅ 문자열 → 배열
      tags: form.tag ? form.tag.split(',').map((t) => t.trim()) : [],

      information: form.information,

      address: form.address,
      streetAddress: form.streetAddress ?? form.address,

      // ✅ 숫자 보정
      lat: form.lat !== null ? Number(form.lat) : 0,
      lon: form.lng !== null ? Number(form.lng) : 0,

      url: form.url ?? null,
      image: form.image ?? null,

      // ✅ Boolean 절대 null 금지
      night: form.night ?? false,
      twentyFour: form.twentyFour ?? false,

      // ✅ string → enum 배열
      animalTypes: form.treatmentAnimalType
        ? form.treatmentAnimalType.split(',').map((v) => v.trim())
        : [],

      // ✅ worktimes → operationTimes
      operationTimes: (form.worktimes ?? []).map((w) => ({
        dayOfWeek: w.dayOfWeek,
        isOpen: w.isOpen ?? false,
        openTime: w.openTime,
        closeTime: w.closeTime,
        startBreakTime: w.startBreakTime ?? null,
        endBreakTime: w.endBreakTime ?? null,
        deadLineTime: w.deadLineTime ?? null,
      })),
    };

    console.log('PUT payload', payload);

    try {
      await api.put(`/admin/hospital/update/${hospitalId}`, payload);
      alert('병원 정보가 저장되었습니다.');
    } catch (e) {
      console.error(e);
      alert('저장 중 오류가 발생했습니다.');
    }
  };
  if (!hospitalId) {
    return (
      <div className="flex w-2/3 items-center justify-center rounded-lg border bg-white text-gray-400">
        병원을 선택하세요
      </div>
    );
  }

  if (loading || !form) {
    return (
      <div className="flex w-2/3 items-center justify-center rounded-lg border bg-white text-gray-400">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex w-2/3 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* ===== 헤더 (UI 동일) ===== */}
      <div className="border-b px-6 pt-6 pb-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {currentHospital.name || '병원을 선택하세요'}
            </h3>
            <span className="text-sm text-gray-500">DB ID: {hospitalId}</span>
          </div>
          {hospitalTab === 'info' && (
            <button
              onClick={handleSave}
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
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

      {/* ===== 콘텐츠 ===== */}
      <div className="flex-1 overflow-y-auto p-6">
        {hospitalTab === 'info' ? (
          <div className="grid grid-cols-2 gap-6">
            {/* 좌측 */}
            <div className="space-y-4">
              <Input
                label="병원명"
                value={form.name}
                onChange={(v) => updateField('name', v)}
              />
              <Input
                label="전화번호"
                value={form.phoneNumber}
                onChange={(v) => updateField('phoneNumber', v)}
              />
              <Input
                label="주소"
                value={form.address}
                onChange={(v) => updateField('address', v)}
              />
              <LatLng
                lat={form.lat}
                lng={form.lng}
                onChangeLat={(v) => updateField('lat', v)}
                onChangeLng={(v) => updateField('lng', v)}
              />
            </div>

            {/* 우측 */}
            <div className="space-y-4">
              <WorkTimes hours={hours} onChange={updateWorkTime} />
              <Input
                label="진료가능종 (태그)"
                value={form.treatmentAnimalType}
                onChange={(v) =>
                  updateField('treatmentAnimalType', v.replaceAll(' ', ''))
                }
              />
              <Input
                label="태그 (쉼표 구분)"
                value={form.tag}
                onChange={(v) => updateField('tag', v)}
              />
              <Textarea
                label="병원 소개글"
                value={form.information}
                onChange={(v) => updateField('information', v)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-4 flex items-start gap-2 rounded bg-blue-50 p-4 text-sm text-blue-800">
              <Activity size={16} className="mt-0.5 shrink-0" />
              <p>
                해당 병원 정보의 수정 이력입니다. 데이터 무결성을 위해 모든 변경
                사항이 기록됩니다.
              </p>
            </div>

            <div className="rounded border p-4 text-sm text-gray-400">
              변경 이력 API 연동 예정
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== UI 보조 컴포넌트 (UI 동일) ===== */

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border p-2 text-sm"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      rows={10}
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border p-2 text-sm"
    />
  </div>
);

const LatLng = ({ lat, lng, onChangeLat, onChangeLng }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      위도/경도
    </label>
    <div className="flex gap-2">
      <input
        type="text"
        defaultValue={lat}
        onChange={(e) => onChangeLat(e.target.value)}
        className="w-full rounded border p-2 text-sm"
      />
      <input
        type="text"
        defaultValue={lng}
        onChange={(e) => onChangeLng(e.target.value)}
        className="w-full rounded border p-2 text-sm"
      />
    </div>
  </div>
);

const WorkTimes = ({ hours, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      운영시간
    </label>
    <div className="grid grid-cols-2 gap-2">
      {days.map((day, idx) => (
        <div key={day} className="flex items-center gap-2">
          <span className="w-4 text-xs text-gray-500">{day}</span>
          <input
            type="text"
            defaultValue={hours[idx] || '미작성'}
            onBlur={(e) => onChange(idx, e.target.value)}
            className="w-full rounded border p-1 text-xs"
          />
        </div>
      ))}
    </div>
  </div>
);
