import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/cursos', label: 'Catálogo de Cursos' },
  { to: '/certificacoes', label: 'Certificações' },
  { to: '/certificados/verificar', label: 'Verificar Certificados' }
];

const externalApps = [
  {
    name: 'GPMOI',
    url: 'https://gpmoi.org/',
    short: 'GPM'
  },
  {
    name: 'SCR ILUNGI',
    url: 'https://scr.ilungi.ao/',
    short: 'SCR'
  }
];

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header glass-nav">
      <div className="container header-content">
        <NavLink to="/" className="brand" onClick={() => setIsOpen(false)}>
          <span className="brand-logo-frame brand-logo-frame--header">
            <img src="/ilungi_logo.jpg" alt="AILUNGI" className="brand-logo" />
          </span>
          <div>
            <span className="brand-name">AILUNGI</span>
            <span className="brand-tagline">Academia & Certificações</span>
          </div>
        </NavLink>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link--active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-apps">
          {externalApps.map((app) => (
            <a
              key={app.name}
              className="app-icon"
              href={app.url}
              target="_blank"
              rel="noreferrer"
              aria-label={app.name}
              title={app.name}
            >
              <span>{app.short}</span>
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <NavLink to="/login" className="btn btn-ghost">
            Entrar
          </NavLink>
          <NavLink to="/registro" className="btn btn-primary">
            Criar Conta
          </NavLink>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <div className="container mobile-menu-inner">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mobile-apps">
              {externalApps.map((app) => (
                <a
                  key={app.name}
                  className="mobile-app-link"
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="app-icon app-icon--sm">
                    <span>{app.short}</span>
                  </span>
                  {app.name}
                </a>
              ))}
            </div>
            <div className="mobile-actions">
              <NavLink to="/login" className="btn btn-ghost" onClick={() => setIsOpen(false)}>
                Entrar
              </NavLink>
              <NavLink to="/registro" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                Criar Conta
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
