import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Course } from '../../data/courses';
import { api } from '../../services/api';

const Home = () => {
  const [spotlightCourses, setSpotlightCourses] = useState<Course[]>([]);
  const [catalogCourses, setCatalogCourses] = useState<Course[]>([]);
  const [sectorAreas, setSectorAreas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    Promise.all([api.getFeaturedCourses(), api.getCourses()])
      .then(([featuredResponse, coursesResponse]) => {
        if (!isMounted) return;
        setSpotlightCourses(featuredResponse.data.slice(0, 4));
        setCatalogCourses(coursesResponse.data);
        const uniqueAreas = Array.from(
          new Set(coursesResponse.data.map((course) => course.area).filter(Boolean))
        );
        setSectorAreas(uniqueAreas);
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

  const totalCourses = catalogCourses.length;
  const topCategories = sectorAreas.slice(0, 8);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/cursos?pesquisa=${encodeURIComponent(query)}` : '/cursos');
  };

  const handleVerifySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedCode = verifyCode.trim();

    if (!trimmedCode) {
      navigate('/certificados/verificar');
      return;
    }

    navigate(`/certificados/verificar?codigo=${encodeURIComponent(trimmedCode)}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge badge--ghost fade-up">ILUNGI Academia Corporativa</span>
            <h1 className="hero-title fade-up delay-1">
              Formação executiva em <span className="text-gradient">Governança, Gestão e Compliance</span>
            </h1>
            <p className="hero-lead fade-up delay-2">
              Capacite líderes e equipas com programas estruturados em governança, risco e compliance,
              alinhados às melhores práticas internacionais.
            </p>

            <form className="hero-search fade-up delay-2" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="hero-search-input"
                placeholder="Pesquisar cursos, normas ISO, compliance, governança..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button type="submit" className="btn btn-primary" aria-label="Pesquisar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>
            </form>

            <div className="hero-actions fade-up delay-3">
              <NavLink to="/cursos" className="btn btn-primary">
                Ver catálogo completo
              </NavLink>
              <NavLink to="/registro" className="btn btn-outline">
                Criar conta corporativa
              </NavLink>
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
                <strong className="hero-stat">{isLoading ? '—' : `+${totalCourses}`}</strong>
                <span className="card-meta">Cursos especializados</span>
              </div>
              <div className="hero-mini-card">
                <span className="hero-mini-label">Modalidade</span>
                <strong className="hero-stat">On-demand</strong>
                <span className="card-meta">Flexibilidade total</span>
              </div>
              <div className="hero-mini-card">
                <span className="hero-mini-label">Acesso</span>
                <strong className="hero-stat">24/7</strong>
                <span className="card-meta">Conteúdo sempre disponível</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-title section-title--left section-title-row">
            <div>
              <h2>Formação corporativa para setores estratégicos</h2>
              <p>As áreas abaixo refletem o catálogo real da academia ILUNGI.</p>
            </div>
            <NavLink to="/cursos" className="btn btn-ghost btn-sm">
              Ver catálogo completo
            </NavLink>
          </div>

          <div className="category-bar">
            {topCategories.length > 0 ? (
              topCategories.map((area) => (
                <NavLink
                  key={area}
                  to={`/cursos?area=${encodeURIComponent(area)}`}
                  className="category-chip"
                >
                  {area}
                </NavLink>
              ))
            ) : isLoading ? (
              <span className="category-chip">A carregar setores...</span>
            ) : (
              <span className="category-chip">Setores em atualização</span>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title section-title--left section-title-row">
            <div>
              <h2>Cursos em destaque</h2>
              <p>Programas mais procurados por líderes e profissionais de alto impacto.</p>
            </div>
            <NavLink to="/cursos" className="btn btn-ghost btn-sm">
              Ver catálogo completo
            </NavLink>
          </div>
          {isLoading ? (
            <div className="empty-state">
              <p>A carregar cursos em destaque...</p>
            </div>
          ) : spotlightCourses.length > 0 ? (
            <div className="card-grid">
              {spotlightCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-card-header">
                    <span className="course-card-area">{course.area}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--ilungi-primary)', opacity: 0.6 }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="course-card-body">
                    <h3 className="course-card-title clamp-2">{course.name}</h3>
                    <div className="course-card-meta">
                      <span className="course-card-meta-item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {course.schedule}
                      </span>
                      <span className="course-card-meta-item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {course.workload}
                      </span>
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <NavLink
                      to={`/cursos/${course.id}`}
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center' }}
                    >
                      Ver detalhes
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Nenhum curso em destaque disponível no momento.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Soluções corporativas com visão estratégica</h2>
            <p>Metodologia premium para elevar a maturidade regulatória e a performance da equipa.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20h16" />
                  <path d="M6 20V8h12v12" />
                  <path d="M9 8V4h6v4" />
                </svg>
              </div>
              <h3>Governança & Compliance</h3>
              <p>Programas desenhados para fortalecer cultura ética, controlo e conformidade.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </div>
              <h3>Gestão de riscos</h3>
              <p>Mapeamento, mitigação e resposta a riscos críticos do seu negócio.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M8 12h8M8 16h5" />
                </svg>
              </div>
              <h3>Finanças & controlo</h3>
              <p>Formação aplicada para decisões financeiras sólidas e sustentáveis.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-title">
            <h2>Operação pronta para empresas</h2>
            <p>Da inscrição à emissão de certificados, com suporte dedicado em cada etapa.</p>
          </div>
          <div className="journey-grid">
            <div className="journey-card">
              <span className="journey-step">Etapa 01</span>
              <h3>Diagnóstico</h3>
              <p>Alinhamento com objetivos, riscos e requisitos regulatórios.</p>
            </div>
            <div className="journey-card">
              <span className="journey-step">Etapa 02</span>
              <h3>Formação aplicada</h3>
              <p>Conteúdos com estudos de caso e orientação de especialistas.</p>
            </div>
            <div className="journey-card">
              <span className="journey-step">Etapa 03</span>
              <h3>Avaliação estruturada</h3>
              <p>Exames e evidências de aprendizagem alinhadas à certificação.</p>
            </div>
            <div className="journey-card">
              <span className="journey-step">Etapa 04</span>
              <h3>Certificação digital</h3>
              <p>Emissão e validação com rastreabilidade e credibilidade.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container verify-spotlight">
          <div className="verify-spotlight-info">
            <span className="badge">Verificação oficial</span>
            <h2>Verifique certificados com segurança e rapidez</h2>
            <p>
              A validação é pública, imediata e protegida. Garanta a autenticidade de certificados
              emitidos pela ILUNGI em segundos.
            </p>
            <div className="verify-stats">
              <div className="verify-stat-card">
                <strong>100%</strong>
                <span>Rastreabilidade digital</span>
              </div>
              <div className="verify-stat-card">
                <strong>Instantâneo</strong>
                <span>Consulta online segura</span>
              </div>
              <div className="verify-stat-card">
                <strong>Compliance</strong>
                <span>Registos auditáveis</span>
              </div>
            </div>
            <ul className="check-list">
              <li>Código único para cada certificado emitido.</li>
              <li>Resultado imediato com dados essenciais.</li>
              <li>Ideal para RH, auditorias e parceiros.</li>
            </ul>
          </div>

          <div className="verify-panel">
            <div>
              <span className="pill">Validação pública</span>
              <h3>Verificar certificado</h3>
              <p className="card-meta">
                Digite o código completo para confirmar a certificação emitida pela ILUNGI.
              </p>
            </div>
            <form className="verify-panel-form" onSubmit={handleVerifySubmit}>
              <label htmlFor="verifyCode">Código do certificado</label>
              <div className="verify-input-row">
                <input
                  id="verifyCode"
                  type="text"
                  className="form-input"
                  value={verifyCode}
                  onChange={(event) => setVerifyCode(event.target.value)}
                  placeholder="AILUNGI-2024-XXX-000000"
                />
                <button type="submit" className="btn btn-primary">
                  Verificar
                </button>
              </div>
            </form>
            <div className="verify-panel-footer">
              <NavLink to="/certificados/verificar" className="btn btn-ghost btn-sm">
                Abrir página completa
              </NavLink>
              <span className="verify-panel-hint">Resposta em segundos.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container gradient-panel">
          <h2>Pronto para evoluir com a ILUNGI?</h2>
          <p>Crie a sua conta e tenha acesso imediato ao catálogo completo.</p>
          <div className="hero-actions">
            <NavLink to="/registro" className="btn btn-light">
              Criar conta
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
