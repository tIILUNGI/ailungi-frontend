import { NavLink } from 'react-router-dom';

const certifications = [
  {
    id: 1,
    name: 'Certificado Profissional em Gestão de Projetos',
    description: 'Certificação internacional que valida as suas habilidades em gestão de projetos.'
  },
  {
    id: 2,
    name: 'Certificado em Desenvolvimento Web',
    description: 'Certificação que atesta as suas competências em desenvolvimento web front-end.'
  },
  {
    id: 3,
    name: 'Certificado em Liderança',
    description: 'Certificação para líderes e gestores de equipas.'
  },
  {
    id: 4,
    name: 'Certificado em Marketing Digital',
    description: 'Certificação especializada em marketing digital e redes sociais.'
  }
];

const Certifications = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Certificações</span>
          <h1>Certificações Profissionais</h1>
          <p>Obtenha certificações reconhecidas que impulsionam a sua carreira.</p>
        </div>

        <div className="card-grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="card">
              <span className="badge">Certificação</span>
              <h3 className="card-title">{cert.name}</h3>
              <p>{cert.description}</p>
              <div className="card-footer">
                <NavLink to="/registro" className="btn btn-primary" style={{ width: '100%' }}>
                  Saber Mais
                </NavLink>
              </div>
            </div>
          ))}
        </div>

        <div className="section">
          <div className="gradient-panel">
            <h2>Obtenha a sua certificação</h2>
            <p>Inscreva-se em um curso e conquiste a sua certificação profissional.</p>
            <NavLink to="/cursos" className="btn btn-light">
              Ver Cursos
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
