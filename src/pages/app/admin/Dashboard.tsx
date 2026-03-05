import { useI18n } from '../../../i18n/I18nContext';

const AdminDashboard = () => {
  const { t } = useI18n();

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.dashboard}</h1>
          <p>Indicadores gerais da plataforma AILUNGI.</p>
        </div>
        <button type="button" className="btn btn-primary">
          {t.admin.createCourse}
        </button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </span>
          </div>
          <strong>0</strong>
          <span className="kpi-label">{t.admin.kpis.activeUsers}</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
          </div>
          <strong>0</strong>
          <span className="kpi-label">{t.admin.kpis.publishedCourses}</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M8 12l-2 7 6-3 6 3-2-7" />
              </svg>
            </span>
          </div>
          <strong>0</strong>
          <span className="kpi-label">{t.admin.kpis.certificatesIssued}</span>
        </div>
        <div className="kpi-card">
          <div className="kpi-card-head">
            <span className="kpi-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </span>
          </div>
          <strong>0%</strong>
          <span className="kpi-label">{t.admin.kpis.completionRate}</span>
        </div>
      </div>

      <div className="app-grid-2">
        <div className="app-card">
          <h2>{t.admin.recentActivity}</h2>
          <div className="app-list">
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>{t.admin.activity.newEnrollment}</strong>
              </div>
            </div>
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>{t.admin.activity.certificateIssued}</strong>
              </div>
            </div>
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>{t.admin.activity.contentReview}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="app-card">
          <h2>{t.admin.alerts}</h2>
          <div className="app-list">
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>{t.admin.alertsList.pendingCertificates}</strong>
              </div>
            </div>
            <div className="app-list-row app-list-row--tight">
              <div>
                <strong>{t.admin.alertsList.courseUpdate}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
