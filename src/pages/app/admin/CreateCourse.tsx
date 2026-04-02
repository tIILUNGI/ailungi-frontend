import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { Course } from '../../../data/courses';
import { api } from '../../../services/api';

const AREAS = [
  'Compliance & Antissuborno',
  'Gestão de Riscos',
  'Auditoria & Investigações',
  'ESG',
  'Governança & Compliance',
  'Projectos (PMO)',
  'Finanças & Controlo',
  'Direito & Finanças',
  'Segurança da Informação',
  'Mercado de Capitais',
  'Liderança',
  'Gestão de Pessoas',
  'Administrativo'
];

const AdminCreateCourse = () => {
  const { t } = useI18n();
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    area: '',
    workload: '',
    modality: 'Online',
    schedule: 'On-demand',
    description: ''
  });

  useEffect(() => {
    let isMounted = true;

    api
      .getCourses()
      .then(({ data }) => {
        if (isMounted) {
          setCoursesList(data);
        }
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

  const nextCourseId = useMemo(() => {
    if (coursesList.length === 0) return 1;
    return Math.max(...coursesList.map((course) => course.id)) + 1;
  }, [coursesList]);

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      area: '',
      workload: '',
      modality: 'Online',
      schedule: 'On-demand',
      description: ''
    });
    setEditingCourseId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      code: formData.code,
      name: formData.name,
      area: formData.area,
      workload: formData.workload || 'A definir',
      modality: formData.modality,
      schedule: formData.schedule,
      description: formData.description
    };

    if (editingCourseId) {
      setCoursesList((prev) =>
        prev.map((course) => (course.id === editingCourseId ? { ...course, ...payload } : course))
      );
      await api.updateCourse(editingCourseId, payload);
      alert('Curso atualizado com sucesso.');
    } else {
      const newCourse: Course = {
        id: nextCourseId,
        featured: false,
        ...payload
      };
      setCoursesList((prev) => [newCourse, ...prev]);
      await api.createCourse(payload);
      alert('Curso criado com sucesso!');
    }

    setShowForm(false);
    resetForm();
  };

  const handleEdit = (course: Course) => {
    setFormData({
      code: course.code,
      name: course.name,
      area: course.area,
      workload: course.workload,
      modality: course.modality,
      schedule: course.schedule,
      description: ''
    });
    setEditingCourseId(course.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja eliminar este curso?')) {
      setCoursesList((prev) => prev.filter((course) => course.id !== id));
      await api.deleteCourse(id);
    }
  };

  const handleToggleFeatured = async (id: number) => {
    const targetCourse = coursesList.find((course) => course.id === id);
    if (!targetCourse) {
      return;
    }
    const nextFeatured = !targetCourse.featured;
    setCoursesList((prev) =>
      prev.map((course) => (course.id === id ? { ...course, featured: nextFeatured } : course))
    );
    await api.updateCourse(id, { featured: nextFeatured });
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>Gestão de Cursos</h1>
          <p>Administre o catálogo de cursos da plataforma AILUNGI.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : t.common.create + ' Curso'}
        </button>
      </div>

      {showForm && (
        <div className="create-form-card">
          <h3>{editingCourseId ? 'Editar Curso' : 'Criar Novo Curso'}</h3>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-row">
              <div className="form-group">
                <label>Código do Curso *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="form-input"
                  placeholder="CC-001"
                />
              </div>

              <div className="form-group">
                <label>Área *</label>
                <select
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="form-input"
                >
                  <option value="">Selecione uma área</option>
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{t.admin.courseTitle} *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Nome completo do curso"
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input"
                rows={4}
                placeholder="Descrição do curso..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Carga Horária</label>
                <input
                  type="text"
                  value={formData.workload}
                  onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
                  className="form-input"
                  placeholder="40 horas"
                />
              </div>

              <div className="form-group">
                <label>{t.admin.courseModality}</label>
                <select
                  value={formData.modality}
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                  className="form-input"
                >
                  <option value="Online">Online</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t.admin.courseSchedule}</label>
                <select
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="form-input"
                >
                  <option value="On-demand">On-demand</option>
                  <option value="Fim de semana">Fim de semana</option>
                  <option value="Noturno">Noturno</option>
                  <option value="Intensivo">Intensivo</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingCourseId ? 'Guardar alterações' : t.common.save}
              </button>
              {editingCourseId && (
                <button type="button" className="btn btn-ghost" onClick={resetForm}>
                  Limpar
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="courses-table">
        <div className="app-table">
          <div className="app-table-row app-table-head">
            <span>Código</span>
            <span>Curso</span>
            <span>Área</span>
            <span>Modalidade</span>
            <span>Horário</span>
            <span>Destaque</span>
            <span>{t.common.actions}</span>
          </div>
          {isLoading ? (
            <div className="empty-state">
              <p>A carregar cursos...</p>
            </div>
          ) : coursesList.length > 0 ? (
            coursesList.map((course) => (
              <div key={course.id} className="app-table-row">
                <span>{course.code}</span>
                <span>{course.name.substring(0, 40)}...</span>
                <span>{course.area}</span>
                <span className="pill">{course.modality}</span>
                <span>{course.schedule}</span>
                <span>
                  <button
                    type="button"
                    className={`btn btn-sm ${course.featured ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => handleToggleFeatured(course.id)}
                  >
                    {course.featured ? '✓ Sim' : 'Não'}
                  </button>
                </span>
                <span className="app-table-actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleEdit(course)}>
                    {t.common.edit}
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleDelete(course.id)}>
                    {t.common.delete}
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
    </div>
  );
};

export default AdminCreateCourse;
