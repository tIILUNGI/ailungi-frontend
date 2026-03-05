const StudentExtras = () => {
  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Extras</span>
          <h1>Meus Certificados</h1>
          <p>Visualize e gerencie suas certificações conquistadas</p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 4h10v7a5 5 0 0 1-10 0V4z" />
                <path d="M5 4h14" />
              </svg>
            </span>
          </div>
          <strong>1</strong>
          <span>Total</span>
          <p className="muted">Todos os certificados</p>
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
          <span>Ativos</span>
          <p className="muted">Atualmente válidos</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
          </div>
          <strong>0</strong>
          <span>Expirando em Breve</span>
          <p className="muted">Nos próximos 30 dias</p>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 4l8 4-8 4-8-4 8-4z" />
                <path d="M4 10v6l8 4 8-4v-6" />
              </svg>
            </span>
          </div>
          <strong>Intermediate</strong>
          <span>Nível</span>
          <p className="muted">Nível profissional</p>
        </div>
      </div>

      <div className="app-card">
        <div className="section-header">
          <h2>Filtros</h2>
          <div className="toggle-group">
            <button type="button" className="btn btn-ghost btn-sm">
              Todos os Certificados
            </button>
            <button type="button" className="btn btn-ghost btn-sm">
              Vista de Cartões
            </button>
            <button type="button" className="btn btn-ghost btn-sm">
              Vista de Lista
            </button>
          </div>
        </div>
        <p className="muted">Showing 1 of 1</p>
        <div className="app-card-grid">
          <div className="app-card">
            <span className="badge">CI-PMO</span>
            <h3>Certified Initiated in PMO (ILUNGI)</h3>
            <p className="muted">Emitido em Jan 29, 2026</p>
            <div className="app-card-actions">
              <button type="button" className="btn btn-primary btn-sm">
                Baixar
              </button>
              <button type="button" className="btn btn-ghost btn-sm">
                Ver detalhes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="app-card">
        <h2>Formação E-learning</h2>
        <p className="muted">
          Aqui verá apenas os cursos das certificações em que está inscrito na modalidade Curso +
          Exame e com o pagamento confirmado. Assim que a inscrição for validada, o conteúdo fica
          disponível para estudo.
        </p>
        <p className="muted">
          Verifique o estado da sua candidatura em &quot;As Minhas Candidaturas&quot; para garantir que o
          pagamento e a modalidade estão corretos.
        </p>
        <p className="muted">
          Caso ainda não veja cursos, significa que nenhuma certificação elegível está associada à
          sua conta de aluno.
        </p>
      </div>

      <div className="app-card">
        <h2>Associação</h2>
        <p className="muted">
          Torne-se membro AILUNGI e desfrute de benefícios exclusivos e descontos em certificações.
        </p>

        <div className="app-grid-2">
          <div className="app-card">
            <h3>Associação Ativa</h3>
            <p className="muted">Individual · Válido até: 24/01/2027</p>
            <div className="status-row">
              <span className="pill">Ativo</span>
              <span className="muted">Membro desde 24/01/2026</span>
            </div>
            <div className="stats-split">
              <div>
                <span className="muted">Válido até</span>
                <strong>24/01/2027</strong>
              </div>
              <div>
                <span className="muted">Restante</span>
                <strong>324 dias restantes</strong>
              </div>
              <div>
                <span className="muted">Preço do Plano</span>
                <strong>$120.00/ano</strong>
              </div>
            </div>
          </div>

          <div className="app-card">
            <h3>Como Funciona</h3>
            <ol className="steps-list">
              <li>Escolha um Plano</li>
              <li>Submeta o Pedido</li>
              <li>Efetue o Pagamento</li>
              <li>Obtenha Aprovação</li>
            </ol>
            <h3>Benefícios de Membro</h3>
            <ul className="bullet-list">
              <li>Preços de certificação com desconto</li>
              <li>Agendamento prioritário de exames</li>
              <li>Acesso a recursos exclusivos</li>
              <li>Acesso à comunidade profissional</li>
              <li>Distintivo digital de certificado</li>
              <li>Lembretes de renovação anual</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExtras;
