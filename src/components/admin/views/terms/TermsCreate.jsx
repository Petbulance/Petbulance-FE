import { useNavigate } from 'react-router-dom';

import TermsForm from './TermsForm.jsx';

export default function TermsCreate() {
  const navigate = useNavigate();

  return <TermsForm mode="create" onBack={() => navigate('/admin/terms')} />;
}
