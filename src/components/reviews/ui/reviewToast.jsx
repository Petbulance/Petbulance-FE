import { toast } from 'sonner';

export const reportToastOptions = {
  position: 'bottom-center',
  duration: 3000,
  style: {
    width: '100%',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(34, 34, 34, 0.9)',
    color: '#ffffff',
  },
  action: {
    label: '✕',
    onClick: () => toast.dismiss(),
  },
  actionButtonStyle: {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    padding: 0,
    cursor: 'pointer',
  },
};
