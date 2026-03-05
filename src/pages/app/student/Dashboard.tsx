import { NavLink } from 'react-router-dom';
import { getAuth } from '../../../utils/auth';

const StudentDashboard = () => {
  const auth = getAuth();
  const name = auth?.name ? auth.name : 'Aluno';

  return (
    <div className="app-page">
      <div className="student-welcome">
        <div>
          <span className="app-eyebrow">Painel</span>
          <h1>Bem-vindo de volta, {name}</h1>
          <p>Acompanhe seu progresso e continue sua jornada de certificação na AILUNGI.</p>
        </div>
        <div className="student-welcome-actions">
          <NavLink to="/app/aluno/exames" className="btn btn-primary">
            Explorar Exames
          </NavLink>
          <NavLink to="/app/aluno/extras" className="btn btn-ghost">
            Ver Certificados
          </NavLink>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M8 12l-2 7 6-3 6 3-2-7" />
              </svg>
            </span>
          </div>
          <strong>1</strong>
          <span>Certificações Ativas</span>
          <p className="muted">Certificações em andamento</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 4h10v7a5 5 0 0 1-10 0V4z" />
                <path d="M5 4h14" />
                <path d="M9 16v4h6v-4" />
              </svg>
            </span>
          </div>
          <strong>1</strong>
          <span>Certificados</span>
          <p className="muted">Certificados conquistados</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </span>
          </div>
          <strong>0</strong>
          <span>Notificações</span>
          <p className="muted">Notificações não lidas</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
          </div>
          <strong>—</strong>
          <span>Próximo Evento</span>
          <p className="muted">Nenhum evento agendado</p>
        </div>
      </div>

      <div className="app-grid-2">
        <div className="app-card">
          <h2>Associação Ativa</h2>
          <div className="status-row">
            <span className="pill">Ativo</span>
            <span className="muted">Individual · Válido até: Jan 24, 2027</span>
          </div>
        </div>

        <div className="app-card">
          <h2>Suas Estatísticas</h2>
          <div className="stats-split">
            <div>
              <span className="muted">Total de Tentativas</span>
              <strong>7</strong>
            </div>
            <div>
              <span className="muted">Exames Oficiais</span>
              <strong>1</strong>
            </div>
            <div>
              <span className="muted">Simulações</span>
              <strong>6</strong>
            </div>
            <div>
              <span className="muted">Taxa de Aprovação</span>
              <strong>100.0%</strong>
            </div>
            <div>
              <span className="muted">Pontuação Média</span>
              <strong>95.3%</strong>
            </div>
            <div>
              <span className="muted">Melhor Pontuação</span>
              <strong>100.0%</strong>
            </div>
          </div>
          <p className="muted">Melhor desempenho em Certified Initiated in PMO (ILUNGI)</p>
          <div className="recent-attempt">
            <h3>Tentativa Mais Recente</h3>
            <p className="muted">Resumo da sua atividade mais recente</p>
            <div className="recent-attempt-card">
              <div>
                <strong>Certified Initiated in PMO (ILUNGI)</strong>
                <p className="muted">Exame Oficial • 97.4%</p>
              </div>
              <span className="muted">Jan 29, 2026 13:17</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-grid-2">
        <div className="app-card">
          <h2>Progresso das Certificações</h2>
          <div className="progress-cert">
            <div>
              <strong>Certified Initiated in PMO (ILUNGI)</strong>
              <p className="muted">CI-PMO</p>
            </div>
            <span className="pill">Concluída</span>
          </div>
          <div className="progress-meta">
            <span>7 Tentativas</span>
            <span>Melhor: 100.0%</span>
            <span>Última: 97.4%</span>
            <span>Última atividade: Jan 29, 2026</span>
          </div>

          <div className="recent-cert">
            <h3>Certificados Recentes</h3>
            <div className="recent-cert-item">
              <div>
                <strong>Certified Initiated in PMO (ILUNGI)</strong>
                <p className="muted">Emitido</p>
              </div>
              <span className="muted">Jan 29, 2026</span>
            </div>
          </div>
        </div>

        <div className="app-card">
          <h2>Atividades recentes</h2>
          <div className="app-list">
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>Exame oficial concluído</strong>
                <p className="muted">Certified Initiated in PMO (ILUNGI) • 97.4%</p>
              </div>
              <span className="pill">Jan 29</span>
            </div>
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>Certificado emitido</strong>
                <p className="muted">Certified Initiated in PMO (ILUNGI)</p>
              </div>
              <span className="pill">Jan 29</span>
            </div>
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>Simulação concluída</strong>
                <p className="muted">Pontuação 95.3%</p>
              </div>
              <span className="pill">Jan 27</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
