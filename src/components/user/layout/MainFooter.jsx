import {
  Group,
  HealthCross,
  Home,
  OverflowMenuHorizontal,
  Review,
} from '@carbon/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { pushDataLayer } from '@/lib/gtm';

const MENUS = [
  { label: '홈', icon: Home, path: '/index/home' },
  { label: '병원검색', icon: HealthCross, path: '/index/hospitals' },
  { label: '병원후기', icon: Review, path: '/index/reviews' },
  {
    label: '커뮤니티',
    icon: Group,
    path: '/index/community-tab',
    activePaths: ['/index/community', '/index/community-tab'],
  },
  { label: 'My', icon: OverflowMenuHorizontal, path: '/index/mypage' },
];

export default function MainFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMenuActive = (menu) => {
    if (menu.activePaths?.length) {
      return menu.activePaths.some((path) =>
        location.pathname.startsWith(path)
      );
    }

    return location.pathname.startsWith(menu.path);
  };

  const activeMenu = MENUS.find((menu) => isMenuActive(menu))?.label || '';

  const handleTabClick = (menuLabel, menuPath) => {
    pushDataLayer('view_tab', {
      tab_name: menuLabel,
      previous_tab: activeMenu,
    });
    navigate(menuPath);
  };

  return (
    <footer className="z-10 shrink-0 border-t bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="flex justify-around py-2">
        {MENUS.map((menu) => {
          const isActive = isMenuActive(menu);

          return (
            <li
              key={menu.label}
              onClick={() => handleTabClick(menu.label, menu.path)}
              className={`flex cursor-pointer flex-col items-center text-xs transition-colors ${isActive ? 'text-green-600' : 'text-gray-500'} `}
            >
              <menu.icon className="h-5 w-5" />
              <p className="mt-1">{menu.label}</p>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
