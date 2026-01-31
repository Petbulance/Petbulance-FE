import { LogOut } from 'lucide-react';

import logo from '@/assets/images/logo/pet_logo.png';

export default function AdminSidebar({ menus, isOpen, currentPath, onChange }) {
  /** ✅ 하위 경로 포함 active 판별 */
  const isActiveMenu = (menuPath) => {
    if (menuPath === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath === menuPath || currentPath.startsWith(menuPath + '/');
  };

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } z-20 flex flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300`}
    >
      {/* 로고 */}
      <div className="flex items-center gap-3 overflow-hidden p-6 whitespace-nowrap">
        <img src={logo} alt="Petbulance Logo" className="h-10 w-10" />
        {isOpen && (
          <span className="text-xl font-black tracking-tighter text-[#2DA969]">
            PETBULANCE
          </span>
        )}
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {menus.map((item) => {
          const active = isActiveMenu(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.path)}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 transition-all ${
                active
                  ? 'scale-[1.02] bg-[#2DA969] font-bold text-white shadow-md shadow-green-100'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 ${
                  active ? 'text-white' : 'text-gray-400'
                }`}
              />
              {isOpen && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="border-t border-gray-100 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600">
          <LogOut size={20} />
          {isOpen && '로그아웃'}
        </button>
      </div>
    </aside>
  );
}
