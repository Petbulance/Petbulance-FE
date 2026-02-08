import { PhoneFrame } from '@/components/commons/layout/PhoneFrame';

export function LayoutShell({ banner, children }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E7F9EF] xl:gap-31">
      <aside className="hidden shrink-0 xl:block xl:max-h-dvh">{banner}</aside>

      <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}
