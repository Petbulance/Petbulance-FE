import { Group, HealthCross, Home, OverflowMenuHorizontal, Review } from '@carbon/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

const MENUS = [
  { label: '홈', icon: Home, path: '/index/home' },
  { label: '병원검색', icon: HealthCross, path: '/index/hospitals' },
  { label: '병원후기', icon: Review, path: '/index/reviews' },
  { label: '커뮤니티', icon: Group, path: '/index/community' },
  { label: 'My', icon: OverflowMenuHorizontal, path: '/index/mypage' },
];

export default function MainFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="sticky bottom-0 border-t bg-white">
      <ul className="flex justify-around py-2">
        {MENUS.map((menu) => {
          const isActive = location.pathname.startsWith(menu.path);

          return (
            <li
              key={menu.label}
              onClick={() => navigate(menu.path)}
              className={`flex cursor-pointer flex-col items-center text-xs transition-colors
                ${isActive ? 'text-green-600' : 'text-gray-500'}
              `}
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

