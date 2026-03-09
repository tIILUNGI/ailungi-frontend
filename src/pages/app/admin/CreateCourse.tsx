import { useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { courses, Course } from '../../../data/courses';

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
  const [coursesList, setCoursesList] = useState<Course[]>(courses);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    area: '',
    workload: '',
    modality: 'Online',
    schedule: 'On-demand',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCourse: Course = {
      id: coursesList.length + 1,
      code: formData.code,
      name: formData.name,
      area: formData.area,
      workload: formData.workload || 'A definir',
      modality: formData.modality,
      schedule: formData.schedule,
      featured: false
    };
    
    setCoursesList([...coursesList, newCourse]);
    setShowForm(false);
    setFormData({
      code: '',
      name: '',
      area: '',
      workload: '',
      modality: 'Online',
      schedule: 'On-demand',
      description: ''
    });
    alert('Curso criado com sucesso!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja eliminar este curso?')) {
      setCoursesList(coursesList.filter(c => c.id !== id));
    }
  };

  const handleToggleFeatured = (id: number) => {
    setCoursesList(coursesList.map(c => 
      c.id === id ? { ...c, featured: !c.featured } : c
    ));
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>Gestão de Cursos</h1>
          <p>Administre o catálogo de cursos da plataforma AILUNGI.</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : t.common.create + ' Curso'}
        </button>
      </div>

      {showForm && (
        <div className="create-form-card">
          <h3>Criar Novo Curso</h3>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-row">
              <div className="form-group">
                <label>Código do Curso *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  className="form-input"
                  placeholder="CC-001"
                />
              </div>
              
              <div className="form-group">
                <label>Área *</label>
                <select
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="form-input"
                >
                  <option value="">Selecione uma área</option>
                  {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
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
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="form-input"
                placeholder="Nome completo do curso"
              />
            </div>
            
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, workload: e.target.value})}
                  className="form-input"
                  placeholder="40 horas"
                />
              </div>
              
              <div className="form-group">
                <label>{t.admin.courseModality}</label>
                <select
                  value={formData.modality}
                  onChange={(e) => setFormData({...formData, modality: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, schedule: e.target.value})}
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
                {t.common.save}
              </button>
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
          {coursesList.map((course) => (
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
                <button type="button" className="btn btn-ghost btn-sm">
                  {t.common.edit}
                </button>
                <button 
                  type="button" 
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDelete(course.id)}
                >
                  {t.common.delete}
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateCourse;
