export default function AppShell({ banner, children }) {
  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="mx-auto px-4 py-6">
        <div className="flex justify-center bp1194:gap-8">
          {/* 1194px 이상에서만 배너 표시 */}
          <aside className="hidden bp1194:block w-[320px] shrink-0">
            {banner}
          </aside>

          {/* 메인 스크린 (≤620: 화면에 맞게, 620~: 620 고정) */}
          <main className="w-full max-w-screenMax bp620:w-screenFixed bp620:max-w-none">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
