export function PhoneFrame({ children }) {
  return (
    <div className="max-w-phone flex h-dvh max-h-dvh w-[620px] transform-gpu flex-col overflow-hidden bg-white">
      {children}
    </div>
  );
}
