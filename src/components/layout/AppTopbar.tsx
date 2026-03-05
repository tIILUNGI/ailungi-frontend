import { AuthUser } from '../../utils/auth';

type AppTopbarProps = {
  user: AuthUser | null;
  onLogout: () => void;
};

const AppTopbar = ({ user, onLogout }: AppTopbarProps) => {
  const displayName = user?.name ?? (user?.email ? user.email.split('@')[0] : 'Utilizador');

  return (
    <div className="app-topbar">
      <div className="app-search">
        <span className="app-search-label">Pesquisar</span>
        <input type="search" placeholder="Cursos, certificados, utilizadores..." />
      </div>

      <div className="app-topbar-actions">
        <div className="app-user">
          <span className="app-user-avatar">{displayName.slice(0, 2).toUpperCase()}</span>
          <div>
            <span className="app-user-name">{displayName}</span>
            <span className="app-user-meta">{user?.role === 'admin' ? 'Administrador' : 'Aluno'}</span>
          </div>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default AppTopbar;
