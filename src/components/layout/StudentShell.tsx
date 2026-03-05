import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAuth, getAuth } from '../../utils/auth';
import { useI18n } from '../../i18n/I18nContext';

const StudentShell = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useI18n();
  const auth = getAuth();
  const displayName = auth?.name ?? (auth?.email ? auth.email.split('@')[0] : 'Aluno');
  const initials = useMemo(() => displayName.slice(0, 2).toUpperCase(), [displayName]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return (window.localStorage.getItem('ilungi.theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    window.localStorage.setItem('ilungi.theme', theme);
  }, [theme]);

  const handleLogout = () => {
    clearAuth();
    navigate('/login', { replace: true });
  };

  const navItems = [
    {
      to: '/app/aluno',
      label: t.student.dashboard,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      )
    },
    {
      to: '/app/aluno/cursos',
      label: t.student.availableCourses,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" />
        </svg>
      )
    },
    {
      to: '/app/aluno/percurso',
      label: t.student.myPath,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    },
    {
      to: '/app/aluno/exames',
      label: t.student.exams,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M14 3v6h6" />
          <path d="M9 14h6M9 18h4" />
        </svg>
      )
    },
    {
      to: '/app/aluno/certificacoes',
      label: t.student.myCertifications,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M8 12l-2 7 6-3 6 3-2-7" />
        </svg>
      )
    },
    {
      to: '/app/aluno/simulador',
      label: t.student.simulator,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M9 20h6" />
          <path d="M10 8l5 3-5 3z" />
        </svg>
      )
    },
    {
      to: '/app/aluno/extras',
      label: t.student.extras,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      )
    }
  ];

  return (
    <div className="student-layout">
      <aside className="student-sidebar">
        <div className="student-logo-wrap">
          <img src="/ilungi_logo.jpg" alt="AILUNGI" className="student-logo-lg" />
        </div>
        <nav className="student-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'student-nav-link student-nav-link--active' : 'student-nav-link'
              }
              end={item.to === '/app/aluno'}
            >
              <span className="student-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="student-main">
        <div className="student-topbar">
          <span className="student-topbar-title">{t.student.areaTitle}</span>

          <div className="student-topbar-actions">
            <button
              type="button"
              className="icon-btn theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            <select
              className="lang-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value as 'pt' | 'en')}
              aria-label="Idioma"
            >
              <option value="pt">PT</option>
              <option value="en">EN</option>
            </select>

            <button type="button" className="icon-btn notif-btn" aria-label="Notificações">
              <span className="notif-dot" />
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>

            <div className="profile-menu">
              <button
                type="button"
                className="profile-trigger"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <span className="profile-avatar">{initials}</span>
                <span className="profile-name">{displayName}</span>
                <span className="profile-caret" />
              </button>
              {menuOpen && (
                <div className="profile-dropdown">
                  <NavLink
                    to="/app/aluno/perfil"
                    className="profile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.student.profile}
                  </NavLink>
                  <button type="button" className="profile-link" onClick={handleLogout}>
                    {t.nav.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="student-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentShell;
