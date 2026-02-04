export function HospitalIntroSection({ content }) {
  return (
    <section className="p-6">
      <h3 className="mb-3 text-[20px] font-semibold text-[#424242]">
        병원 소개
      </h3>
      <div className="text-[16px] text-[#424242]">{content}</div>
    </section>
  );
}
