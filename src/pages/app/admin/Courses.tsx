import { useI18n } from '../../../i18n/I18nContext';
import { courses, Course } from '../../../data/courses';

const AdminCourses = () => {
  const { t } = useI18n();

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.courses}</h1>
          <p>Administre o catálogo, instrutores e estado de publicação.</p>
        </div>
        <button type="button" className="btn btn-primary">
          {t.common.create}
        </button>
      </div>

      <div className="app-table">
        <div className="app-table-row app-table-head">
          <span>Código</span>
          <span>Curso</span>
          <span>Área</span>
          <span>{t.common.status}</span>
          <span>{t.common.actions}</span>
        </div>
        {courses.slice(0, 10).map((course: Course) => (
          <div key={course.id} className="app-table-row">
            <span>{course.code}</span>
            <span>{course.name}</span>
            <span>{course.area}</span>
            <span className="pill">{t.common.active}</span>
            <span className="app-table-actions">
              <button type="button" className="btn btn-ghost btn-sm">
                {t.common.edit}
              </button>
              <button type="button" className="btn btn-ghost btn-sm">
                Pausar
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
