import { Badge } from './Badge.jsx';

const STATUS_COLOR_MAP = {
  정상: 'green',
  게시: 'green',
  처리: 'green',
  성공: 'blue',
  대기: 'yellow',
  신고: 'orange',
  삭제: 'red',
  중단: 'red',
  실패: 'red',
  후기정지: 'purple',
  커뮤정지: 'purple',
  '후기+커뮤정지': 'dark',
  시행중: 'green',
  예정: 'blue',
  만료: 'gray',
  이벤트: 'pink',
  공지: 'gray',
  광고: 'blue',
};

export function StatusBadge({ status, children }) {
  const label = status ?? children ?? '';
  const color = STATUS_COLOR_MAP[label] || 'gray';

  return <Badge color={color}>{label}</Badge>;
}
