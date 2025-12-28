import logo from '@/assets/images/pet_logo.svg';

export default function AdminSidebar({
                                       menus,
                                       isOpen,
                                       currentPath,
                                       onChange,
                                       onToggle,
                                     }) {
  return (
    <aside
      className={`${isOpen ? 'w-64' : 'w-20'} z-20 flex flex-col border-r border-gray-200 bg-white shadow-sm transition-all duration-300`}
    >
      {/* 로고 */}
      <div className="flex items-center gap-3 overflow-hidden p-6 whitespace-nowrap">
        <div className="rounded-xl">
          <img src={logo} alt="Petbulance Logo" className="h-15 w-15" />
        </div>
        {isOpen && (
          <span className="text-xl font-black tracking-tighter text-[#2DA969]">
            PETBULANCE
          </span>
        )}
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {menus.map((item) => {
          const active = currentPath === item.path;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.path)}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 transition-all ${
                active
                  ? 'scale-[1.02] bg-[#2DA969] font-bold text-white shadow-md shadow-blue-100'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              <item.icon
                className={`h-5 w-5 flex-shrink-0 ${
                  active ? 'text-white' : 'text-gray-400'
                }`}
              />
              {isOpen && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* 토글 */}
      <button
        onClick={onToggle}
        className="flex justify-center p-4 text-gray-300 hover:text-gray-600"
      >
        {isOpen ? 'Side Close' : 'Open'}
      </button>
    </aside>
  );
}
