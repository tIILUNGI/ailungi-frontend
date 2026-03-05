import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAuth, getAuth } from '../../utils/auth';
import { useI18n } from '../../i18n/I18nContext';

const AdminShell = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useI18n();
  const auth = getAuth();
  const displayName = auth?.name ?? (auth?.email ? auth.email.split('@')[0] : 'Admin');
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
      to: '/app/admin',
      label: t.admin.dashboard,
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
      to: '/app/admin/inscricoes',
      label: t.admin.enrollments,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      )
    },
    {
      to: '/app/admin/cursos',
      label: t.admin.courses,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" />
        </svg>
      )
    },
    {
      to: '/app/admin/utilizadores',
      label: t.admin.users,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      to: '/app/admin/certificados',
      label: t.admin.certificates,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M8 12l-2 7 6-3 6 3-2-7" />
        </svg>
      )
    }
  ];

  return (
    <div className="student-layout admin-layout">
      <aside className="student-sidebar admin-sidebar">
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
              end={item.to === '/app/admin'}
            >
              <span className="student-nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="student-main">
        <div className="student-topbar">
          <span className="student-topbar-title">{t.admin.areaTitle}</span>

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

export default AdminShell;
