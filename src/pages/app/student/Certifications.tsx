const availableCerts = [
  {
    id: 1,
    title: 'Certified Initiated in PMO (ILUNGI)',
    code: 'CI-PMO',
    level: 'Intermediate'
  },
  {
    id: 2,
    title: 'Governança, Risco e Compliance Avançado',
    code: 'ILU-GRC',
    level: 'Professional'
  }
];

const applications = [
  {
    id: 1,
    title: 'Certified Initiated in PMO (ILUNGI)',
    status: 'Aprovada',
    date: 'Jan 10, 2026'
  }
];

const StudentCertifications = () => {
  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Certificações</span>
          <h1>Certificações</h1>
          <p>Certificações disponíveis e minhas candidaturas</p>
        </div>
      </div>

      <div className="app-card">
        <h2>Certificações disponíveis</h2>
        <div className="app-card-grid">
          {availableCerts.map((cert) => (
            <div key={cert.id} className="app-card">
              <span className="badge">{cert.code}</span>
              <h3>{cert.title}</h3>
              <p className="muted">Nível: {cert.level}</p>
              <div className="app-card-actions">
                <button type="button" className="btn btn-primary btn-sm">
                  Candidatar-se
                </button>
                <button type="button" className="btn btn-ghost btn-sm">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="app-card">
        <h2>Minhas candidaturas</h2>
        <div className="app-table">
          <div className="app-table-row app-table-head app-table-row--4">
            <span>Certificação</span>
            <span>Estado</span>
            <span>Data</span>
            <span>Ações</span>
          </div>
          {applications.map((item) => (
            <div key={item.id} className="app-table-row app-table-row--4">
              <span>{item.title}</span>
              <span className="pill">{item.status}</span>
              <span>{item.date}</span>
              <span className="app-table-actions">
                <button type="button" className="btn btn-ghost btn-sm">
                  Detalhes
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCertifications;
