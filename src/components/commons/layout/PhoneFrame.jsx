export function PhoneFrame({ children }) {
  return (
    <div className="
        w-full
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
