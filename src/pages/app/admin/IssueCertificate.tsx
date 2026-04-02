import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { Course } from '../../../data/courses';
import { api, AdminCertificate } from '../../../services/api';

const AdminIssueCertificate = () => {
  const { t } = useI18n();
  const [showForm, setShowForm] = useState(false);
  const [certificates, setCertificates] = useState<AdminCertificate[]>([]);
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    courseId: ''
  });

  useEffect(() => {
    let isMounted = true;

    Promise.all([api.getCourses(), api.getAdminCertificates()])
      .then(([coursesResponse, certResponse]) => {
        if (isMounted) {
          setCoursesList(coursesResponse.data);
          setCertificates(certResponse.data);
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

  const nextCertificateNumber = useMemo(() => {
    const nextIndex = certificates.length + 1;
    return `AILUNGI-${new Date().getFullYear()}-${String(nextIndex).padStart(3, '0')}`;
  }, [certificates.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCourse = coursesList.find((course) => course.id === Number(formData.courseId));

    const newCertificate: AdminCertificate = {
      id: certificates.length + 1,
      studentName: formData.studentName,
      studentEmail: formData.studentEmail,
      courseName: selectedCourse?.name ?? 'Curso não definido',
      courseCode: selectedCourse?.code ?? '—',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'issued',
      certificateNumber: nextCertificateNumber
    };

    setCertificates((prev) => [newCertificate, ...prev]);
    await api.issueCertificate({
      studentName: formData.studentName,
      studentEmail: formData.studentEmail,
      courseId: formData.courseId
    });

    setShowForm(false);
    setFormData({ studentName: '', studentEmail: '', courseId: '' });
    alert(`Certificado emitido com sucesso!\nNúmero: ${newCertificate.certificateNumber}`);
  };

  const handleCancel = async (id: number) => {
    if (confirm('Tem certeza que deseja cancelar este certificado?')) {
      setCertificates((prev) => prev.map((cert) => (cert.id === id ? { ...cert, status: 'cancelled' } : cert)));
      await api.cancelCertificate(id);
    }
  };

  const handleDownload = (cert: AdminCertificate) => {
    alert(`A gerar certificado...\n\nNúmero: ${cert.certificateNumber}\nAluno: ${cert.studentName}\nCurso: ${cert.courseName}`);
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.issueCertificate}</h1>
          <p>Gerencie e emita certificados da plataforma AILUNGI.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? ' Cancelar' : t.admin.issueCertificate}
        </button>
      </div>

      {showForm && (
        <div className="create-form-card">
          <h3>Emitir Novo Certificado</h3>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
              <label>Nome do Aluno *</label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="form-input"
                placeholder="Nome completo do aluno"
              />
            </div>

            <div className="form-group">
              <label>{t.common.email} do Aluno *</label>
              <input
                type="email"
                required
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                className="form-input"
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="form-group">
              <label>Curso *</label>
              <select
                required
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                className="form-input"
              >
                <option value="">Selecione um curso</option>
                {coursesList.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Emitir Certificado
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="certificates-stats">
        <div className="stat-card">
          <strong>{certificates.filter((c) => c.status === 'issued').length}</strong>
          <span>Emitidos</span>
        </div>
        <div className="stat-card">
          <strong>{certificates.filter((c) => c.status === 'pending').length}</strong>
          <span>Pendentes</span>
        </div>
        <div className="stat-card">
          <strong>{certificates.filter((c) => c.status === 'cancelled').length}</strong>
          <span>Cancelados</span>
        </div>
      </div>

      <div className="app-table">
        <div className="app-table-row app-table-head">
          <span>Nº Certificado</span>
          <span>Aluno</span>
          <span>Email</span>
          <span>Curso</span>
          <span>Data de Emissão</span>
          <span>Status</span>
          <span>{t.common.actions}</span>
        </div>
        {isLoading ? (
          <div className="empty-state">
            <p>A carregar certificados...</p>
          </div>
        ) : certificates.length > 0 ? (
          certificates.map((cert) => (
            <div key={cert.id} className="app-table-row">
              <span className="cert-number">{cert.certificateNumber}</span>
              <span>{cert.studentName}</span>
              <span>{cert.studentEmail}</span>
              <span>{cert.courseCode}</span>
              <span>{cert.issueDate}</span>
              <span>
                <span className={`pill ${cert.status === 'issued' ? 'pill--success' : cert.status === 'cancelled' ? 'pill--danger' : ''}`}>
                  {cert.status === 'issued' && 'Emitido'}
                  {cert.status === 'pending' && 'Pendente'}
                  {cert.status === 'cancelled' && 'Cancelado'}
                </span>
              </span>
              <span className="app-table-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleDownload(cert)}>
                  Download
                </button>
                {cert.status !== 'cancelled' && (
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleCancel(cert.id)}>
                    Cancelar
                  </button>
                )}
              </span>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>Sem certificados emitidos. Os dados aparecerão aqui após integração.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminIssueCertificate;
