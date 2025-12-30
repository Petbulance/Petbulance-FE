import './App.css';

import AdminPages from '@/pages/admin/AdminPages.jsx';
import { LayoutShell } from '@/components/commons/layout/LayoutShell.jsx';
import { ServiceBanner } from '@/components/commons/banner/index.jsx';
import Login from '@/pages/user/auth/Login.jsx';

function App() {

  return (

      <LayoutShell banner={<ServiceBanner />}>
        <Login />
        {/*<ServiceBanner/>*/}
      </LayoutShell>

  );
}

export default App;
