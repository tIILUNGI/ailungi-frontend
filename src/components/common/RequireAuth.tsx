import { Navigate, useLocation } from 'react-router-dom';
import { AuthUser, UserRole, getAuth } from '../../utils/auth';

type RequireAuthProps = {
  role?: UserRole;
  children: JSX.Element;
};

const RequireAuth = ({ role, children }: RequireAuthProps) => {
  const location = useLocation();
  const auth = getAuth() as AuthUser | null;

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to={auth.role === 'admin' ? '/app/admin' : '/app/aluno'} replace />;
  }

  return children;
};

export default RequireAuth;
