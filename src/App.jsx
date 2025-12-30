import './App.css';

import AdminPages from '@/pages/admin/AdminPages.jsx';
import { LayoutShell } from '@/components/commons/layout/LayoutShell.jsx';
import { ServiceBanner } from '@/components/commons/banner/index.jsx';
import SocialSignUp from '@/pages/user/auth/SocialSignUp.jsx';

function App() {

  return (

      <LayoutShell banner={<ServiceBanner />}>
        <SocialSignUp />
        {/*<ServiceBanner/>*/}
      </LayoutShell>

  );
}

export default App;
