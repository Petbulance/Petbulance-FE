import { NOTICE_ITEMS } from '@/data/notices.js';
import SupportList from '@/components/user/my/SupportList.jsx';

export default function Support() {

  return (
    <div className="flex h-full flex-col ">
      <main className="flex-1 overflow-y-auto ">
          <SupportList  NOTIFICATIONS={NOTICE_ITEMS}/>
      </main>
    </div>
  );
}
