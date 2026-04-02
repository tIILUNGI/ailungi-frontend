import { NavLink } from 'react-router-dom';
import { getAuth } from '../../../utils/auth';

const StudentDashboard = () => {
  const auth = getAuth();
  const name = auth?.name ? auth.name : 'Aluno';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="app-page">
      <div className="student-welcome">
        <div>
          <span className="app-eyebrow">Painel</span>
          <h1>Bem-vindo de volta, {name}</h1>
          <p>Gerencie suas formações, certificações e acessos em um só lugar.</p>
        </div>
        <div className="student-welcome-actions">
          <NavLink to="/app/aluno/cursos" className="btn btn-primary">
            Ver Cursos
          </NavLink>
          <NavLink to="/app/aluno/certificacoes" className="btn btn-ghost">
            Certificações
          </NavLink>
        </div>
      </div>

      <div className="app-grid-2">
        <div className="app-card">
          <h2>Resumo da conta</h2>
          <p className="muted">
            Os dados da sua conta serão carregados automaticamente assim que o backend estiver
            conectado.
          </p>
          <div className="profile-summary-card">
            <div className="profile-summary-main">
              <span className="profile-summary-avatar">{initials}</span>
              <div className="profile-summary-details">
                <strong>{name}</strong>
                <span className="muted">{auth?.email ?? 'Email não informado'}</span>
              </div>
            </div>
            <NavLink to="/app/aluno/perfil" className="btn btn-ghost btn-sm">
              Ver perfil
            </NavLink>
          </div>
          <div className="info-list">
            <p>Perfil: {auth?.role === 'admin' ? 'Administrador' : 'Aluno'}</p>
            <p>Status: Ativo</p>
          </div>
        </div>

        <div className="app-card quick-actions-card">
          <h2>Ações rápidas</h2>
          <div className="app-card-actions quick-actions">
            <NavLink to="/app/aluno/cursos" className="btn btn-primary btn-sm btn-action">
              Solicitar inscrição
            </NavLink>
            <NavLink to="/app/aluno/extras" className="btn btn-ghost btn-sm btn-action">
              Meus certificados
            </NavLink>
            <NavLink to="/app/aluno/exames" className="btn btn-ghost btn-sm btn-action">
              Exames
            </NavLink>
          </div>
        </div>
      </div>

      <div className="app-card">
        <div className="section-header">
          <h2>Comunicados</h2>
          <span className="pill">Equipe ILUNGI</span>
        </div>
        <div className="app-list">
          <div className="app-list-row app-list-row--tight">
            <div>
              <strong>Atualização de catálogo</strong>
              <p className="muted">Novos cursos executivos serão publicados em breve.</p>
            </div>
            <span className="pill">Novo</span>
          </div>
          <div className="app-list-row app-list-row--tight">
            <div>
              <strong>Suporte corporativo</strong>
              <p className="muted">Entre em contacto para planos personalizados.</p>
            </div>
            <span className="pill">Info</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
