import { Activity } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import api from '@/apis/api.jsx';
import AnimalTypeSelect from '@/components/admin/ui/AnimalTypeSelect.jsx';
import HospitalHistories from '@/components/admin/views/Hosptial/HospitalHistories.jsx';

const days = ['월', '화', '수', '목', '금', '토', '일'];
const dayMap = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// animalTypes.ts
export const ANIMAL_TYPE_OPTIONS = [
  // 소동물
  { value: 'HAMSTER', label: '햄스터' },
  { value: 'GUINEAPIG', label: '기니피그' },
  { value: 'CHINCHILLA', label: '친칠라' },
  { value: 'RABBIT', label: '토끼' },
  { value: 'HEDGEHOG', label: '고슴도치' },
  { value: 'FERRET', label: '페럿' },
  { value: 'SUGAR_GLIDER', label: '슈가글라이더' },
  { value: 'PRAIRIE_DOG', label: '프레리도그' },
  { value: 'FLYING_SQUIRREL', label: '하늘다람쥐' },
  { value: 'OTHER_SMALL_MAMMALS', label: '기타 소동물' },

  // 조류
  { value: 'PARROT', label: '앵무새' },
  { value: 'FINCH_TYPES', label: '핀치류' },
  { value: 'OTHER_BIRDS', label: '기타 조류' },

  // 파충류
  { value: 'GECKO', label: '게코' },
  { value: 'OTHER_LIZARDS', label: '기타 도마뱀' },
  { value: 'SNAKE', label: '뱀' },
  { value: 'TURTLE', label: '거북이' },
  { value: 'OTHER_REPTILES', label: '기타 파충류' },

  // 양서류
  { value: 'FROG', label: '개구리' },
  { value: 'AXOLOTL', label: '우파루파' },
  { value: 'SALAMANDER', label: '도롱뇽' },
  { value: 'OTHER_AMPHIBIANS', label: '기타 양서류' },

  // 어류
  { value: 'ORNAMENTAL_FISH', label: '관상어' },
];

export default function HospitalDetail({ hospitalId, mode = 'edit' }) {
  const isCreateMode = mode === 'create';

  const [hospitalTab, setHospitalTab] = useState('info');
  const [hospital, setHospital] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     초기화 / 상세 조회
  ========================= */
  useEffect(() => {
    if (isCreateMode) {
      setForm({
        name: '',
        phoneNumber: '',
        address: '',
        streetAddress: '',
        lat: '',
        lng: '',
        tag: '',
        treatmentAnimalType: '',
        information: '',
        url: '',
        image: '',
        night: false,
        twentyFour: false,
        worktimes: dayMap.map((d) => ({
          dayOfWeek: d,
          isOpen: false,
          openTime: null,
          closeTime: null,
          startBreakTime: null,
          endBreakTime: null,
          deadLineTime: null,
        })),
      });
      setHospital(null);
      return;
    }

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
  const histories = currentHospital.hospitalHistories ?? [];

  /* =========================
     운영시간 가공 (UI 유지)
  ========================= */
  const hours = useMemo(() => {
    const map = {};
    form?.worktimes?.forEach((w) => {
      const idx = dayMap.indexOf(w.dayOfWeek);
      if (idx !== -1) {
        map[idx] = w.isOpen
          ? `${w.openTime ?? ''}~${w.closeTime ?? ''}`
          : '휴무';
      }
    });
    return map;
  }, [form?.worktimes]);

  /* =========================
     공통 변경 처리
  ========================= */
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateWorkTime = (idx, value) => {
    setForm((prev) => {
      const next = [...prev.worktimes];
      const [openTime, closeTime] =
        value === '휴무' || value === '미작성'
          ? [null, null]
          : value.split('~');

      next[idx] = {
        ...next[idx],
        isOpen: !!openTime,
        openTime: openTime ? `${openTime}:00` : null,
        closeTime: closeTime ? `${closeTime}:00` : null,
      };

      return { ...prev, worktimes: next };
    });
  };

  /* =========================
     저장 (등록 / 수정)
  ========================= */
  const handleSave = async () => {
    const payload = {
      hospitalName: form.name,
      phoneNumber: form.phoneNumber,

      tags: form.tag ? form.tag.split(',').map((t) => t.trim()) : [],
      information: form.information,

      address: form.address,
      streetAddress: form.streetAddress ?? form.address,

      lat: Number(form.lat) || 0,
      lon: Number(form.lng) || 0,

      url: form.url || null,
      image: form.image || null,

      night: !!form.night,
      twentyFour: !!form.twentyFour,

      animalTypes: form.treatmentAnimalType ?? [],

      operationTimes: form.worktimes.map((w) => ({
        dayOfWeek: w.dayOfWeek,
        isOpen: w.isOpen,
        openTime: w.openTime,
        closeTime: w.closeTime,
        startBreakTime: w.startBreakTime,
        endBreakTime: w.endBreakTime,
        deadLineTime: w.deadLineTime,
      })),
    };

    try {
      console.log('등록/수정', payload);
      if (isCreateMode) {
        await api.post('/admin/hospital/save', payload);
        alert('병원이 등록되었습니다.');
      } else {
        await api.put(`/admin/hospital/update/${hospitalId}`, payload);
        alert('병원 정보가 저장되었습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  /* =========================
     상태 처리
  ========================= */
  if (loading || !form) {
    return (
      <div className="flex w-2/3 items-center justify-center rounded-lg border bg-white text-gray-400">
        불러오는 중...
      </div>
    );
  }
  return (
    <div
      className={`flex ${
        isCreateMode ? 'w-full' : 'w-2/3'
      } flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm`}
    >
      {/* ===== 헤더 (UI 동일) ===== */}
      <div className="border-b px-6 pt-6 pb-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {currentHospital.name || '병원을 선택하세요'}
            </h3>
            <span className="text-sm text-gray-500">DB ID: {hospitalId}</span>
          </div>

          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            {isCreateMode ? '등록' : '변경사항 저장'}
          </button>
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
              <AnimalTypeSelect
                value={form.treatmentAnimalType}
                onChange={(v) => updateField('treatmentAnimalType', v)}
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
          <HospitalHistories histories={histories} />
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
