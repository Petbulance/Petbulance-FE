import { Group, HealthCross, Home, OverflowMenuHorizontal, Review } from '@carbon/icons-react';

const MENUS = [
  { label: '홈', icon: Home },
  { label: '병원검색', icon: HealthCross },
  { label: '병원후기', icon: Review },
  { label: '커뮤니티', icon: Group },
  { label: 'My', icon: OverflowMenuHorizontal
  },
];

export default function MainFooter() {
  return (
    <footer className="sticky bottom-0 border-t bg-white">
      <ul className="flex justify-around py-2">
        {MENUS.map((menu) => (
          <li
            key={menu.label}
            className="flex flex-col items-center text-xs text-gray-500 "
          >
            <menu.icon className="h-5 w-5" />
            <p className="mt-1">
            {menu.label}
            </p>
            </li>
        ))}
      </ul>
    </footer>
  );
}
