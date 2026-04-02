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
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const notifications: { id: number; title: string; time: string }[] = [];

  const toggleNotifications = () => {
    setNotifOpen((prev) => !prev);
    setLangOpen(false);
    setProfileOpen(false);
  };

  const toggleLanguage = () => {
    setLangOpen((prev) => !prev);
    setNotifOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((prev) => !prev);
    setNotifOpen(false);
    setLangOpen(false);
  };

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 1100) {
      setIsSidebarOpen((prev) => !prev);
      return;
    }
    setIsSidebarCollapsed((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const closeMenus = () => {
    setProfileOpen(false);
    setNotifOpen(false);
    setLangOpen(false);
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
    <div
      className={`student-layout admin-layout${isSidebarCollapsed ? ' sidebar-collapsed' : ''}${
        isSidebarOpen ? ' sidebar-open' : ''
      }`}
    >
      <aside className="student-sidebar admin-sidebar">
        <div className="student-logo-wrap">
          <img src="/ilungi_logo.jpg" alt="AILUNGI" className="student-logo-lg" />
          <span className="student-logo-caption">Academia</span>
        </div>
        <div className="student-sidebar-section">
          <span className="student-nav-title">Administração</span>
          <nav className="student-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'student-nav-link student-nav-link--active' : 'student-nav-link'
                }
                end={item.to === '/app/admin'}
                onClick={closeSidebar}
              >
                <span className="student-nav-icon">{item.icon}</span>
                <span className="student-nav-text">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="student-sidebar-footer">
          <div className="student-sidebar-card">
            <strong>Ambiente Administrativo</strong>
            <p className="card-meta">Gerencie cursos, inscrições e certificados em um só lugar.</p>
            <button type="button" className="btn btn-light btn-sm">
              Ver relatórios
            </button>
          </div>
        </div>
      </aside>

      <div className="sidebar-overlay" onClick={closeSidebar} />

      <div className="student-main">
        <div className="student-topbar">
          <span className="student-topbar-title">{t.admin.areaTitle}</span>

          <div className="student-topbar-actions">
            <button
              type="button"
              className="icon-btn icon-btn--circle"
              onClick={toggleSidebar}
              aria-label={isSidebarCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
              title={isSidebarCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <button
              type="button"
              className="icon-btn icon-btn--circle theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <div className="menu-group">
              <button
                type="button"
                className="icon-btn icon-btn--circle"
                onClick={toggleLanguage}
                aria-label="Selecionar idioma"
                aria-expanded={langOpen}
                title={`Idioma: ${language.toUpperCase()}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
                </svg>
              </button>
              {langOpen && (
                <div className="menu-dropdown">
                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      setLanguage('pt');
                      setLangOpen(false);
                    }}
                  >
                    Português
                  </button>
                  <button
                    type="button"
                    className="menu-item"
                    onClick={() => {
                      setLanguage('en');
                      setLangOpen(false);
                    }}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            <div className="menu-group">
              <button
                type="button"
                className="icon-btn icon-btn--circle notif-btn"
                aria-label="Notificações"
                aria-expanded={notifOpen}
                onClick={toggleNotifications}
                title="Notificações"
              >
                {notifications.length > 0 && <span className="notif-dot" />}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </button>
              {notifOpen && (
                <div className="menu-dropdown notif-dropdown">
                  <div className="notif-header">Notificações</div>
                  {notifications.length > 0 ? (
                    notifications.map((item) => (
                      <div key={item.id} className="notif-item">
                        <strong className="notif-title">{item.title}</strong>
                        <span className="notif-time">{item.time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="notif-empty">Sem notificações no momento.</div>
                  )}
                </div>
              )}
            </div>

            <div className="profile-menu">
              <button type="button" className="profile-trigger" onClick={toggleProfile}>
                <span className="profile-avatar">{initials}</span>
                <span className="profile-info">
                  <span className="profile-name">{displayName}</span>
                  <span className="profile-role">Administrador</span>
                </span>
                <span className="profile-caret" />
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-summary">
                    <strong>{displayName}</strong>
                    <span>{auth?.email ?? 'admin@ilungi.com'}</span>
                  </div>
                  <button type="button" className="profile-link" onClick={handleLogout}>
                    {t.nav?.logout || 'Sair'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="student-content" onClick={closeMenus}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminShell;
