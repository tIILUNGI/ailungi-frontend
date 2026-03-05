const StudentExams = () => {
  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Exames</span>
          <h1>Exames</h1>
          <p>Gerencie seus exames agendados e visualize seu histórico de exames</p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <path d="M7 8h10M7 12h6" />
              </svg>
            </span>
          </div>
          <strong>0</strong>
          <span>Agendados</span>
          <p className="muted">Exames futuros</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                <path d="M14 3v6h6" />
              </svg>
            </span>
          </div>
          <strong>1</strong>
          <span>Concluídos</span>
          <p className="muted">Total de exames realizados</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 12l4 4 8-8" />
              </svg>
            </span>
          </div>
          <strong>1</strong>
          <span>Aprovados</span>
          <p className="muted">Exames aprovados</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 20h16" />
                <path d="M6 16l4-4 3 3 5-6" />
              </svg>
            </span>
          </div>
          <strong>100%</strong>
          <span>Taxa de Aprovação</span>
          <p className="muted">Percentual de sucesso</p>
        </div>
      </div>

      <div className="app-card">
        <div className="section-header">
          <h2>Exames Agendados</h2>
          <span className="pill">(0)</span>
        </div>
        <div className="empty-state">
          <h3>Nenhum exame agendado</h3>
          <p>Agende um exame a partir das suas candidaturas para vê-lo aqui</p>
        </div>
      </div>

      <div className="app-card">
        <h2>Histórico de Exames</h2>
        <p className="muted">Visualize suas tentativas de exames oficiais e resultados</p>
        <div className="app-table">
          <div className="app-table-row app-table-head app-table-row--7">
            <span>Certificação</span>
            <span>Questões</span>
            <span>Tempo Limite</span>
            <span>Estado</span>
            <span>Início</span>
            <span>Pontuação</span>
            <span>Ações</span>
          </div>
          <div className="app-table-row app-table-row--7">
            <span>Certified Initiated in PMO (ILUNGI)</span>
            <span>60</span>
            <span>90 min</span>
            <span className="pill">Concluído</span>
            <span>Jan 29, 2026</span>
            <span>97.4%</span>
            <span className="app-table-actions">
              <button type="button" className="btn btn-ghost btn-sm">
                Ver resultado
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExams;
