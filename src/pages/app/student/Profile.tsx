import { getAuth } from '../../../utils/auth';

const StudentProfile = () => {
  const auth = getAuth();
  const name = auth?.name ?? 'Aluno ILUNGI';
  const email = auth?.email ?? 'aluno@email.com';

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
          <div className="app-definition">
            <div>
              <span className="muted">Nome</span>
              <strong>{name}</strong>
            </div>
            <div>
              <span className="muted">Email</span>
              <strong>{email}</strong>
            </div>
            <div>
              <span className="muted">Telefone</span>
              <strong>+244 900 000 000</strong>
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-sm">
            Atualizar dados
          </button>
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
    </div>
  );
};

export default StudentProfile;
