import { getAuth } from '../../../utils/auth';

const StudentProfile = () => {
  const auth = getAuth();
  const name = auth?.name ?? 'Aluno ILUNGI';
  const email = auth?.email ?? 'aluno@email.com';
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Área do estudante</span>
          <h1>Meu perfil</h1>
          <p>Gestão de dados pessoais, segurança e preferências.</p>
        </div>
      </div>

      <div className="app-grid-2">
        <div className="app-card">
          <h2>Dados pessoais</h2>
          <div className="profile-personal-card">
            <div className="profile-personal-header">
              <div className="profile-personal-identity">
                <span className="profile-personal-avatar">{initials}</span>
                <div>
                  <span className="profile-personal-label">Conta corporativa</span>
                  <strong>{name}</strong>
                  <span className="profile-personal-email">{email}</span>
                </div>
              </div>
              <span className="pill pill--success">Ativo</span>
            </div>

            <div className="profile-personal-grid">
              <div>
                <span className="muted">Telefone</span>
                <strong>+244 900 000 000</strong>
              </div>
              <div>
                <span className="muted">Empresa</span>
                <strong>—</strong>
              </div>
              <div>
                <span className="muted">Departamento</span>
                <strong>Gestão de Riscos</strong>
              </div>
              <div>
                <span className="muted">Localização</span>
                <strong>Luanda, Angola</strong>
              </div>
            </div>

            <div className="profile-personal-actions">
              <button type="button" className="btn btn-primary btn-sm">
                Atualizar dados
              </button>
              <button type="button" className="btn btn-ghost btn-sm">
                Carregar foto
              </button>
            </div>
          </div>
        </div>

        <div className="app-card">
          <h2>Segurança</h2>
          <div className="app-list">
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>Senha</strong>
                <p className="muted">Última atualização: 30 dias</p>
              </div>
              <button type="button" className="btn btn-ghost btn-sm">
                Alterar
              </button>
            </div>
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>Autenticação em dois fatores</strong>
                <p className="muted">Recomendado para contas executivas</p>
              </div>
              <button type="button" className="btn btn-ghost btn-sm">
                Ativar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="app-card">
        <h2>Preferências</h2>
        <div className="form-grid">
          <div>
            <label>Idioma preferido</label>
            <select className="form-input">
              <option>Português</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label>Notificações</label>
            <select className="form-input">
              <option>Ativas</option>
              <option>Silenciadas</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-sm">
          Guardar preferências
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
