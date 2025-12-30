export function PhoneFrame({ children }) {
  return (
    <div className="
        w-[620px]
        min-h-dvh
        max-w-phone
        overflow-hidden
      bg-white
      "
    >
      {children}
    </div>
  );
}
