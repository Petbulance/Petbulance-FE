import { Bell } from 'lucide-react';

export default function AdminHeader({ currentMenu, menus }) {
  const currentLabel =
    menus.find((m) => m.id === currentMenu)?.label || '관리자';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md">
      <h2 className="text-lg font-black tracking-tight text-gray-700">
        {currentLabel}
      </h2>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer rounded-full p-2 hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[9px] font-bold text-white">
            8
          </span>
        </div>

        <div className="flex h-8 items-center gap-3 border-l pl-6">
          <div className="text-right leading-tight">
            <p className="text-xs font-black">김대표</p>
            <p className="text-[10px] text-gray-400">Master Admin</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-white shadow-sm">
            K
          </div>
        </div>
      </div>
    </header>
  );
}
