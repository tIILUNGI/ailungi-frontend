import { NavLink } from 'react-router-dom';

const Sitemap = () => {
  const publicLinks = [
    { to: '/', label: 'Início' },
    { to: '/cursos', label: 'Catálogo de Cursos' },
    { to: '/certificacoes', label: 'Certificações' },
    { to: '/certificados/verificar', label: 'Verificar Certificados' },
    { to: '/login', label: 'Entrar' },
    { to: '/registro', label: 'Criar Conta' },
  ];

  const externalLinks = [
    { href: 'https://gpmoi.org/', label: 'GPMOI' },
    { href: 'https://scr.ilungi.ao/', label: 'SCR ILUNGI' },
  ];

  const studentLinks = [
    { to: '/app/aluno', label: 'Painel do Aluno' },
    { to: '/app/aluno/cursos', label: 'Cursos Disponíveis' },
    { to: '/app/aluno/percurso', label: 'O Meu Percurso' },
    { to: '/app/aluno/exames', label: 'Exames' },
    { to: '/app/aluno/certificacoes', label: 'Certificações' },
  ];

  const adminLinks = [
    { to: '/app/admin', label: 'Painel Admin' },
    { to: '/app/admin/cursos', label: 'Gestão de Cursos' },
    { to: '/app/admin/usuarios', label: 'Utilizadores' },
    { to: '/app/admin/certificados', label: 'Certificados' },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Navegação</span>
          <h1>Mapa do Site</h1>
          <p>Encontre rapidamente as principais páginas da AILUNGI.</p>
        </div>

        <div className="sitemap-grid">
          <div className="sitemap-card">
            <h3>Público</h3>
            <ul className="sitemap-list">
              {publicLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sitemap-card">
            <h3>Área do Aluno</h3>
            <ul className="sitemap-list">
              {studentLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sitemap-card">
            <h3>Área Administrativa</h3>
            <ul className="sitemap-list">
              {adminLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sitemap;
