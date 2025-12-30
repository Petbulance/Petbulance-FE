import './App.css';
import { LayoutShell } from '@/components/commons/layout/LayoutShell.jsx';
import { ServiceBanner } from '@/components/commons/banner/index.jsx';
import Home from '@/pages/user/Home.jsx';

function App() {

  return (
      <LayoutShell banner={<ServiceBanner />}>
        {/*<SocialSignUp />*/}
        <Home/>
        {/*<ServiceBanner/>*/}
      </LayoutShell>

  );
}

export default App;
