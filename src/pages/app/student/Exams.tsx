const StudentExams = () => {
  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Exames</span>
          <h1>Exames</h1>
          <p>Agende e acompanhe os seus exames oficiais.</p>
        </div>
      </div>

      <div className="app-card">
        <div className="section-header">
          <h2>Exames agendados</h2>
          <span className="pill">0</span>
        </div>
        <div className="empty-state">
          <h3>Nenhum exame agendado</h3>
          <p>Os exames serão listados aqui assim que estiverem disponíveis no backend.</p>
        </div>
      </div>

      <div className="app-card">
        <h2>Histórico de exames</h2>
        <p className="muted">As suas avaliações aparecerão aqui após a integração.</p>
        <div className="empty-state">
          <p>Sem histórico no momento.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentExams;
