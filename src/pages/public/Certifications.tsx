import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { api, Certification } from '../../services/api';

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api
      .getCertifications()
      .then(({ data }) => {
        if (isMounted) {
          setCertifications(data);
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
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Certificações</span>
          <h1>Certificações Profissionais</h1>
          <p>Obtenha certificações reconhecidas que impulsionam a sua carreira.</p>
        </div>

        <div className="stat-grid" style={{ marginBottom: '28px' }}>
          <div className="stat-card">
            <strong>Validação</strong>
            <span>Online</span>
            <p>Certificados digitais com verificação pública.</p>
          </div>
          <div className="stat-card">
            <strong>Especialidades</strong>
            <span>Executivas</span>
            <p>Rotas alinhadas às necessidades do mercado.</p>
          </div>
          <div className="stat-card">
            <strong>Emissão</strong>
            <span>Estruturada</span>
            <p>Processo claro após aprovação do aluno.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="empty-state">
            <p>A carregar certificações...</p>
          </div>
        ) : certifications.length > 0 ? (
          <div className="card-grid">
            {certifications.map((cert) => (
              <div key={cert.id} className="card cert-card">
                <span className="badge">Certificação</span>
                <h3 className="card-title clamp-2">{cert.name}</h3>
                <p>{cert.description}</p>
                <div className="cert-meta">
                  <span>
                    <strong>Nível</strong>
                    <span>{cert.level ?? 'Executivo'}</span>
                  </span>
                  <span>
                    <strong>Duração</strong>
                    <span>{cert.duration ?? 'Sob consulta'}</span>
                  </span>
                  <span>
                    <strong>Formato</strong>
                    <span>{cert.exam ? 'Avaliação aplicada' : 'Sem avaliação'}</span>
                  </span>
                </div>
                <div className="card-footer">
                  <NavLink to="/registro" className="btn btn-primary" style={{ width: '100%' }}>
                    Saber Mais
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Nenhuma certificação publicada</h3>
            <p>As certificações aparecerão aqui assim que estiverem disponíveis.</p>
          </div>
        )}

        <div className="section-tight">
          <div className="section-title">
            <h2>Processo de certificação estruturado</h2>
            <p>Um percurso claro para garantir qualidade, compliance e credibilidade no mercado.</p>
          </div>
          <div className="journey-grid">
            <div className="journey-card">
              <span className="journey-step">Etapa 01</span>
              <h3>Inscrição validada</h3>
              <p>Documentação, pagamento e validação administrativa.</p>
            </div>
            <div className="journey-card">
              <span className="journey-step">Etapa 02</span>
              <h3>Formação orientada</h3>
              <p>Conteúdos aplicados com acompanhamento de mentores.</p>
            </div>
            <div className="journey-card">
              <span className="journey-step">Etapa 03</span>
              <h3>Avaliação final</h3>
              <p>Exame, projeto ou estudo de caso conforme a certificação.</p>
            </div>
            <div className="journey-card">
              <span className="journey-step">Etapa 04</span>
              <h3>Certificado emitido</h3>
              <p>Emissão digital com código de validação online.</p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="gradient-panel">
            <h2>Obtenha a sua certificação</h2>
            <p>Inscreva-se em um curso e conquiste a sua certificação profissional.</p>
            <div className="hero-actions">
              <NavLink to="/cursos" className="btn btn-light">
                Ver Cursos
              </NavLink>
              <NavLink to="/certificados/verificar" className="btn btn-ghost">
                Verificar Certificado
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
