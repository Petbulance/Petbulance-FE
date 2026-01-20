import { useNavigate } from 'react-router-dom';

import ContentForm from './ContentForm.jsx';

export default function ContentCreate() {
  const navigate = useNavigate();

  return <ContentForm mode="create" onBack={() => navigate('/admin/content')} />;
}
