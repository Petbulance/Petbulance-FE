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

/* =========================
   WorkTimes (공휴일 체크박스)
========================= */
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', '공휴일'];
const DAY_LABEL = ['일', '월', '화', '수', '목', '금', '토', '공휴일'];

const WorkTimes = ({ worktimes, onChange }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      운영시간
    </label>

    <div className="grid grid-cols-2 gap-2">
      {DAYS.map((day, idx) => {
        const w = worktimes.find((x) => x.dayOfWeek === day);
        if (!w) return null;

        const isHoliday = day === '공휴일';

        return (
          <div key={day} className="flex items-center gap-2">
            <span
              className={`w-10 text-center text-xs ${
                isHoliday ? 'font-medium text-red-500' : 'text-gray-500'
              }`}
            >
              {DAY_LABEL[idx]}
            </span>

            {/* ✅ 공휴일: 체크박스만 */}
            {isHoliday ? (
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={w.isOpen}
                  onChange={(e) => onChange('공휴일', e.target.checked)}
                />
                운영
              </label>
            ) : (
              /* ✅ 월~일: 시간 입력 */
              <input
                type="text"
                defaultValue={
                  w.isOpen && w.openTime && w.closeTime
                    ? `${w.openTime.slice(0, 5)}~${w.closeTime.slice(0, 5)}`
                    : '휴무'
                }
                onBlur={(e) => onChange(day, e.target.value)}
                className="w-full rounded border p-1 text-xs"
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

/* =========================
   HospitalForm
========================= */

export default function HospitalForm({
  form,
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
        <WorkTimes
          worktimes={form.worktimes}
          onChange={(dayOfWeek, value) => {
            onChangeWorkTime(dayOfWeek, value);
          }}
        />

        <AnimalTypeSelect
          value={form.treatmentAnimalType}
          onChange={(v) => onChangeField('treatmentAnimalType', v)}
        />

        <Input
          label="태그 (#으로 구분)"
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
