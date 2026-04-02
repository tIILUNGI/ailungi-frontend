import { useI18n } from '../../../i18n/I18nContext';

type Certificate = {
  id: number;
  student: string;
  course: string;
  date: string;
};

const AdminCertificates = () => {
  const { t } = useI18n();

  const certificates: Certificate[] = [];

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.certificates}</h1>
          <p>Controle de emissões, validação e exportação de certificados AILUNGI.</p>
        </div>
        <button type="button" className="btn btn-primary">
          {t.admin.issueCertificate}
        </button>
      </div>

      <div className="app-table">
        <div className="app-table-row app-table-row--4 app-table-head">
          <span>Aluno</span>
          <span>Curso</span>
          <span>{t.common.date}</span>
          <span>{t.common.actions}</span>
        </div>
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <div key={cert.id} className="app-table-row app-table-row--4">
              <span>{cert.student}</span>
              <span>{cert.course}</span>
              <span>{cert.date}</span>
              <span className="app-table-actions">
                <button type="button" className="btn btn-ghost btn-sm">
                  {t.common.view}
                </button>
                <button type="button" className="btn btn-ghost btn-sm">
                  {t.common.export}
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>{t.common.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCertificates;
