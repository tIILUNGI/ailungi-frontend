import { useEffect, useState } from 'react';
import { api, StudentCertificate } from '../../../services/api';

const StudentExtras = () => {
  const [certificates, setCertificates] = useState<StudentCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api
      .getStudentCertificates()
      .then(({ data }) => {
        if (isMounted) {
          setCertificates(data);
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

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Extras</span>
          <h1>Meus Certificados</h1>
          <p>Visualize e gerencie suas certificações conquistadas.</p>
        </div>
      </div>

      <div className="app-card">
        <div className="section-header">
          <h2>Gestão de certificados</h2>
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
        <p className="muted">Exibindo {certificates.length} de {certificates.length}</p>

        {isLoading ? (
          <div className="empty-state">
            <p>A carregar certificados...</p>
          </div>
        ) : certificates.length > 0 ? (
          <div className="app-card-grid">
            {certificates.map((cert) => (
              <div key={cert.id} className="app-card">
                <span className="badge">{cert.code}</span>
                <h3 className="clamp-2">{cert.title}</h3>
                <p className="muted">Emitido em {cert.issuedAt}</p>
                <div className="cert-meta">
                  <span>
                    <strong>Status</strong>
                    <span>{cert.status === 'active' ? 'Ativo' : 'Expirado'}</span>
                  </span>
                </div>
                <div className="app-card-actions">
                  <button type="button" className="btn btn-primary btn-sm">
                    Baixar
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
            <p>Nenhum certificado disponível.</p>
          </div>
        )}
      </div>

      <div className="app-card">
        <h2>Formação E-learning</h2>
        <p className="muted">
          Os cursos vinculados às suas certificações aparecerão aqui assim que a inscrição e o
          pagamento forem confirmados pelo backend.
        </p>
      </div>
    </div>
  );
};

export default StudentExtras;
