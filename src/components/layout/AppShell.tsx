import { Outlet, useNavigate } from 'react-router-dom';
import { clearAuth, getAuth } from '../../utils/auth';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';

const AppShell = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const role = auth?.role ?? 'aluno';

  const handleLogout = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-layout">
      <AppSidebar role={role} />
      <div className="app-main">
        <AppTopbar user={auth} onLogout={handleLogout} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
