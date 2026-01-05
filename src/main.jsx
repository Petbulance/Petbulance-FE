import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import router from '@/router/index.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <Toaster
      position="bottom-center"
      offset={24}
      style={{ width: '100%', maxWidth: '572px', height: '44px' }}
      toastOptions={{ style: { width: '100%', height: '44px' } }}
      className="!left-1/2 !translate-x-1/2 !right-auto !top-auto !bottom-6 w-full max-w-[572px] h-[44px]"
    />
  </StrictMode>,
)
