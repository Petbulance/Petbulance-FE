export function HosipitalDetailWrap({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 rounded-3xl bg-white px-5 py-6 shadow-[0_2px_3px_0_rgba(0,0,0,0.30),0_6px_10px_4px_rgba(0,0,0,0.15)]"
    >
      {children}
    </div>
  );
}
