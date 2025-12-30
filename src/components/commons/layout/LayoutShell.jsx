import { PhoneFrame } from "@components/commons/layout/PhoneFrame";

export function LayoutShell({ banner, children }) {
  return (
    <div className="min-h-dvh flex justify-center items-center bg-[#E7F9EF] bp1194:gap-31">
          <aside className="hidden bp1194:block shrink-0">
            {banner}
          </aside>
          
          <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}
