const StudentSimulator = () => {
  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Simulador</span>
          <h1>Modo prática</h1>
          <p>Configure sessões de treino para se familiarizar com o formato dos exames.</p>
        </div>
      </div>

      <div className="app-card">
        <h2>Nova sessão de prática</h2>
        <p className="muted">Esta área ficará disponível quando o banco de questões estiver ativo.</p>
        <div className="form-grid">
          <div>
            <label>Certificação *</label>
            <select disabled>
              <option>Selecione uma certificação</option>
            </select>
          </div>
          <div>
            <label>Número de Questões *</label>
            <select disabled>
              <option>5 questões</option>
            </select>
          </div>
          <div>
            <label>Limite de Tempo *</label>
            <select disabled>
              <option>10 minutos</option>
            </select>
          </div>
        </div>
        <h3>Informações do modo de prática</h3>
        <div className="info-list">
          <p>As sessões são liberadas quando o conteúdo estiver publicado.</p>
          <p>Resultados ficam disponíveis na área do aluno.</p>
          <p>Suporte dedicado para orientar a sua preparação.</p>
        </div>
        <button type="button" className="btn btn-primary" disabled>
          Iniciar prática
        </button>
      </div>

      <div className="app-card">
        <h2>Histórico de prática</h2>
        <p className="muted">Sem registros até o momento.</p>
        <div className="empty-state">
          <p>As suas sessões aparecerão aqui assim que o backend estiver integrado.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentSimulator;
