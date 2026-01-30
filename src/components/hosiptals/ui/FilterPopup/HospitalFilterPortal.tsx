import { createPortal } from 'react-dom';

export function HospitalFilterPortal({ children }) {
  return createPortal(children, document.body);
}
