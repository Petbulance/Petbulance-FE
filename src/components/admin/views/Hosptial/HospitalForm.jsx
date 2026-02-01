import AnimalTypeSelect from '@/components/admin/ui/AnimalTypeSelect.jsx';

/* ===== UI 보조 컴포넌트 ===== */

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      value={value ?? ''}
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
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border p-2 text-sm"
    />
  </div>
);

const LatLng = ({ lat, lng, onChangeLat, onChangeLng }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      위도 / 경도
    </label>
    <div className="flex gap-2">
      <input
        type="text"
        value={lat ?? ''}
        onChange={(e) => onChangeLat(e.target.value)}
        className="w-full rounded border p-2 text-sm"
      />
      <input
        type="text"
        value={lng ?? ''}
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
      {['월', '화', '수', '목', '금', '토', '일'].map((day, idx) => (
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

/* =========================
   HospitalForm
========================= */

export default function HospitalForm({
  form,
  hours,
  onChangeField,
  onChangeWorkTime,
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 좌측 */}
      <div className="space-y-4">
        <Input
          label="병원명"
          value={form.name}
          onChange={(v) => onChangeField('name', v)}
        />
        <Input
          label="전화번호"
          value={form.phoneNumber}
          onChange={(v) => onChangeField('phoneNumber', v)}
        />
        <Input
          label="주소"
          value={form.address}
          onChange={(v) => onChangeField('address', v)}
        />
        <LatLng
          lat={form.lat}
          lng={form.lng}
          onChangeLat={(v) => onChangeField('lat', v)}
          onChangeLng={(v) => onChangeField('lng', v)}
        />
      </div>

      {/* 우측 */}
      <div className="space-y-4">
        <WorkTimes hours={hours} onChange={onChangeWorkTime} />

        <AnimalTypeSelect
          value={form.treatmentAnimalType}
          onChange={(v) => onChangeField('treatmentAnimalType', v)}
        />

        <Input
          label="태그 (쉼표 구분)"
          value={form.tag}
          onChange={(v) => onChangeField('tag', v)}
        />

        <Textarea
          label="병원 소개글"
          value={form.information}
          onChange={(v) => onChangeField('information', v)}
        />
      </div>
    </div>
  );
}
