import { NavLink } from 'react-router-dom';
import { featuredCourses } from '../../data/courses';

const Home = () => {
  const spotlightCourses = featuredCourses.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge badge--ghost fade-up">ILUNGI Academia</span>
            <h1 className="hero-title fade-up delay-1">
              Formação executiva em{' '}
              <span className="text-gradient">governança, risco e compliance</span>
            </h1>
            <p className="hero-lead fade-up delay-2">
              Programas estratégicos alinhados às normas internacionais e às necessidades reais do
              mercado. Evolua com conteúdos aplicados e mentoria especializada.
            </p>
            <div className="hero-actions fade-up delay-3">
              <NavLink to="/cursos" className="btn btn-primary">
                Ver Cursos Disponíveis
              </NavLink>
              <NavLink to="/registro" className="btn btn-outline">
                Criar Conta Gratuita
              </NavLink>
            </div>
            <div className="hero-highlights fade-up delay-3">
              <div className="highlight-item">
                <span className="pill">On-demand</span>
              </div>
              <div className="highlight-item">
                <span className="pill">Normas ISO</span>
              </div>
              <div className="highlight-item">
                <span className="pill">Certificações Profissionais</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-logo-wrap">
              <img src="/ilungi_logo.jpg" alt="AILUNGI" className="hero-logo" />
              <span className="hero-logo-caption">Academia</span>
            </div>
            <div className="hero-mini-grid">
              <div className="hero-mini-card">
                <span className="hero-mini-label">Catálogo</span>
                <strong className="hero-stat">34</strong>
                <span className="card-meta">Cursos especializados</span>
              </div>
              <div className="hero-mini-card">
                <span className="hero-mini-label">Modelo</span>
                <strong className="hero-stat">On-demand</strong>
                <span className="card-meta">Flexibilidade total</span>
              </div>
              <div className="hero-mini-card">
                <span className="hero-mini-label">Excelência</span>
                <strong className="hero-stat">100%</strong>
                <span className="card-meta">Aprendizagem aplicada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Cursos em Destaque</h2>
            <p>Programas mais procurados por líderes e profissionais de alto impacto.</p>
          </div>
          <div className="card-grid">
            {spotlightCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-card-header">
                  <span className="course-card-area">{course.area}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ilungi-primary)', opacity: 0.6 }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="course-card-body">
                  <h3 className="course-card-title">{course.name}</h3>
                  <div className="course-card-meta">
                    <span className="course-card-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {course.schedule}
                    </span>
                    <span className="course-card-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {course.workload}
                    </span>
                  </div>
                </div>
                <div className="course-card-footer">
                  <NavLink to={`/cursos/${course.id}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                    Ver Detalhes
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container card-grid">
          <div className="card">
            <h3>Metodologia Premium</h3>
            <p>Estudos de caso, frameworks atuais e acompanhamento de mentores especialistas.</p>
          </div>
          <div className="card">
            <h3>Certificações Reconhecidas</h3>
            <p>Comprove as suas competências com credibilidade no mercado.</p>
          </div>
          <div className="card">
            <h3>Rede de Líderes</h3>
            <p>Conecte-se com profissionais de alto nível e amplie o seu networking.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container gradient-panel">
          <h2>Pronto para evoluir com a ILUNGI?</h2>
          <p>Crie a sua conta e tenha acesso imediato ao catálogo completo.</p>
          <div className="hero-actions">
            <NavLink to="/registro" className="btn btn-light">
              Criar Conta Gratuita
            </NavLink>
            <NavLink to="/login" className="btn btn-ghost">
              Já tenho conta
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
