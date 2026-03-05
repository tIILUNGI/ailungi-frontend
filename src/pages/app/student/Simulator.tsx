const practiceHistory = [
  {
    id: 1,
    cert: 'Certified Initiated in PMO (ILUNGI)',
    questions: 60,
    time: '90 min',
    status: 'Aprovado',
    start: 'Jan 27, 2026 10:12',
    score: '95.3%'
  }
];

const StudentSimulator = () => {
  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Simulador</span>
          <h1>Modo Prática</h1>
          <p>Pratique com questões realistas de exame para se preparar para sua certificação</p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 20h16" />
                <path d="M6 16l4-4 3 3 5-6" />
              </svg>
            </span>
          </div>
          <strong>6</strong>
          <span>Total de Tentativas</span>
          <p className="muted">Sessões de prática concluídas</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 4v16" />
                <path d="M4 12h16" />
              </svg>
            </span>
          </div>
          <strong>95%</strong>
          <span>Pontuação Média</span>
          <p className="muted">Seu desempenho médio</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 12l4 4 8-8" />
              </svg>
            </span>
          </div>
          <strong>6</strong>
          <span>Total Aprovado</span>
          <p className="muted">Sessões aprovadas com sucesso</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 6l12 12" />
                <path d="M18 6l-12 12" />
              </svg>
            </span>
          </div>
          <strong>0</strong>
          <span>Total Reprovado</span>
          <p className="muted">Sessões que precisam melhorias</p>
        </div>
      </div>

      <div className="app-card">
        <h2>Nova Sessão de Prática</h2>
        <p className="muted">Modo Prática - Resultados não afetarão sua certificação</p>
        <div className="form-grid">
          <div>
            <label>Certificação *</label>
            <select>
              <option>Selecione uma certificação</option>
              <option>Certified Initiated in PMO (ILUNGI)</option>
              <option>Governança, Risco e Compliance Avançado</option>
            </select>
          </div>
          <div>
            <label>Número de Questões *</label>
            <select>
              <option>5 questões</option>
              <option>10 questões</option>
              <option>20 questões</option>
            </select>
          </div>
          <div>
            <label>Limite de Tempo *</label>
            <select>
              <option>10 minutos</option>
              <option>30 minutos</option>
              <option>60 minutos</option>
            </select>
          </div>
        </div>
        <h3>Informações do Modo de Prática</h3>
        <div className="info-list">
          <p>Questões são selecionadas aleatoriamente do banco de questões reais do exame</p>
          <p>Questões limitadas para evitar memorização de todo o banco</p>
          <p>Resultados não afetam seu status de certificação oficial</p>
        </div>
        <button type="button" className="btn btn-primary">
          Iniciar prática
        </button>
      </div>

      <div className="app-card">
        <h2>Histórico de Prática</h2>
        <p className="muted">Visualize suas sessões de prática recentes e acompanhe seu progresso</p>
        <div className="app-table">
          <div className="app-table-row app-table-head app-table-row--7">
            <span>Certificação</span>
            <span>Questões</span>
            <span>Tempo Limite</span>
            <span>Estado</span>
            <span>Hora de Início</span>
            <span>Pontuação</span>
            <span>Ações</span>
          </div>
          {practiceHistory.map((item) => (
            <div key={item.id} className="app-table-row app-table-row--7">
              <span>{item.cert}</span>
              <span>{item.questions}</span>
              <span>{item.time}</span>
              <span className="pill">{item.status}</span>
              <span>{item.start}</span>
              <span>{item.score}</span>
              <span className="app-table-actions">
                <button type="button" className="btn btn-ghost btn-sm">
                  Ver detalhes
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSimulator;
