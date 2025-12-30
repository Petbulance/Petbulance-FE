import { PhoneFrame } from "@/components/commons/layout/PhoneFrame";

export function LayoutShell({ banner, children }) {
  return (
    <div className="min-h-dvh flex justify-center items-center bg-[#E7F9EF] xl:gap-31">
          <aside className="hidden xl:block shrink-0">
            {banner}
          </aside>
          
          <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}
