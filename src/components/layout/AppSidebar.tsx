import { NavLink } from 'react-router-dom';
import { UserRole } from '../../utils/auth';

type AppSidebarProps = {
  role: UserRole;
};

const studentNav = [
  { to: '/app/aluno', label: 'Dashboard', icon: 'DB' },
  { to: '/app/aluno/cursos', label: 'Meus Cursos', icon: 'CR' },
  { to: '/app/aluno/certificados', label: 'Certificados', icon: 'CF' },
  { to: '/app/aluno/area-estudante', label: 'Área do Estudante', icon: 'AE' }
];

const adminNav = [
  { to: '/app/admin', label: 'Dashboard', icon: 'DB' },
  { to: '/app/admin/cursos', label: 'Cursos', icon: 'CR' },
  { to: '/app/admin/certificados', label: 'Certificados', icon: 'CF' },
  { to: '/app/admin/usuarios', label: 'Usuarios', icon: 'US' }
];

const AppSidebar = ({ role }: AppSidebarProps) => {
  const navItems = role === 'admin' ? adminNav : studentNav;

  return (
    <aside className="app-sidebar">
      <div className="app-brand">
        <img src="/ilungi_logo.jpg" alt="AILUNGI" className="app-brand-logo" />
        <div>
          <span className="app-brand-name">AILUNGI</span>
          <span className="app-brand-sub">Academia</span>
        </div>
      </div>

      <nav className="app-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'app-nav-link app-nav-link--active' : 'app-nav-link'
            }
          >
            <span className="app-nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="app-role">
        <span className="app-role-label">Perfil</span>
        <strong className="app-role-value">{role === 'admin' ? 'Administrador' : 'Aluno'}</strong>
      </div>
    </aside>
  );
};

export default AppSidebar;
