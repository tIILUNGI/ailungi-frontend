import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/cursos', label: 'Catálogo de Cursos' },
  { to: '/certificacoes', label: 'Certificações' },
  { to: '/certificados/verificar', label: 'Verificar Certificados' }
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
            <span className="brand-tagline">Academia</span>
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
