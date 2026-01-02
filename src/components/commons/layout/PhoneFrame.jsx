export function PhoneFrame({ children }) {
  return (
    <div
      className="
        flex
        h-dvh
        max-h-dvh
        w-[620px]
        max-w-phone
        flex-col
        overflow-hidden
        bg-white
      "
    >
      {children}
    </div>
  );
}
