import { useEffect, useState } from 'react';
import { api, Certification, CertificationApplication } from '../../../services/api';

const StudentCertifications = () => {
  const [availableCerts, setAvailableCerts] = useState<Certification[]>([]);
  const [applications, setApplications] = useState<CertificationApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([api.getCertifications(), api.getCertificationApplications()])
      .then(([certs, apps]) => {
        if (isMounted) {
          setAvailableCerts(certs.data);
          setApplications(apps.data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const approvedCount = applications.filter((item) => item.status === 'Aprovada').length;

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Certificações</span>
          <h1>Certificações</h1>
          <p>Certificações disponíveis e minhas candidaturas</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <strong>{availableCerts.length}</strong>
          <span>Disponíveis</span>
          <p>Escolha a certificação certa para si.</p>
        </div>
        <div className="stat-card">
          <strong>{applications.length}</strong>
          <span>Candidaturas</span>
          <p>Pedidos submetidos e em análise.</p>
        </div>
        <div className="stat-card">
          <strong>{approvedCount}</strong>
          <span>Aprovadas</span>
          <p>Certificações prontas para iniciar.</p>
        </div>
      </div>

      <div className="app-card">
        <h2>Certificações disponíveis</h2>
        {isLoading ? (
          <div className="empty-state">
            <p>A carregar certificações...</p>
          </div>
        ) : availableCerts.length > 0 ? (
          <div className="app-card-grid">
            {availableCerts.map((cert) => (
              <div key={cert.id} className="app-card">
                <span className="badge">{cert.level ?? 'Executivo'}</span>
                <h3 className="clamp-2">{cert.name}</h3>
                <p className="muted">{cert.description}</p>
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
        ) : (
          <div className="empty-state">
            <p>Nenhuma certificação disponível.</p>
          </div>
        )}
      </div>

      <div className="app-card">
        <h2>Minhas candidaturas</h2>
        {isLoading ? (
          <div className="empty-state">
            <p>A carregar candidaturas...</p>
          </div>
        ) : applications.length > 0 ? (
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
        ) : (
          <div className="empty-state">
            <p>Nenhuma candidatura registrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCertifications;
