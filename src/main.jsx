import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from '@/router/index.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <Toaster position="bottom-center" />
  </StrictMode>,
)
