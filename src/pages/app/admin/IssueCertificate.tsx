import { useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { courses } from '../../../data/courses';

type Certificate = {
  id: number;
  studentName: string;
  studentEmail: string;
  courseName: string;
  courseCode: string;
  issueDate: string;
  status: 'issued' | 'pending' | 'cancelled';
  certificateNumber: string;
};

const AdminIssueCertificate = () => {
  const { t } = useI18n();
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      studentName: 'João Silva',
      studentEmail: 'joao@email.com',
      courseName: 'Compliance Officer',
      courseCode: 'CC-022',
      issueDate: '2026-02-15',
      status: 'issued',
      certificateNumber: 'AILUNGI-2026-001'
    },
    {
      id: 2,
      studentName: 'Maria Costa',
      studentEmail: 'maria@email.com',
      courseName: 'Governança Corporativa',
      courseCode: 'CC-029',
      issueDate: '2026-02-10',
      status: 'issued',
      certificateNumber: 'AILUNGI-2026-002'
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    courseId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCourse = courses.find(c => c.id === parseInt(formData.courseId));
    
    const newCertificate: Certificate = {
      id: certificates.length + 1,
      studentName: formData.studentName,
      studentEmail: formData.studentEmail,
      courseName: selectedCourse?.name || '',
      courseCode: selectedCourse?.code || '',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'issued',
      certificateNumber: `AILUNGI-${new Date().getFullYear()}-${String(certificates.length + 1).padStart(3, '0')}`
    };
    
    setCertificates([...certificates, newCertificate]);
    setShowForm(false);
    setFormData({ studentName: '', studentEmail: '', courseId: '' });
    alert(`Certificado emitido com sucesso!\nNúmero: ${newCertificate.certificateNumber}`);
  };

  const handleCancel = (id: number) => {
    if (confirm('Tem certeza que deseja cancelar este certificado?')) {
      setCertificates(certificates.map(c => 
        c.id === id ? { ...c, status: 'cancelled' } : c
      ));
    }
  };

  const handleDownload = (cert: Certificate) => {
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
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
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
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
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
                onChange={(e) => setFormData({...formData, studentEmail: e.target.value})}
                className="form-input"
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div className="form-group">
              <label>Curso *</label>
              <select
                required
                value={formData.courseId}
                onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                className="form-input"
              >
                <option value="">Selecione um curso</option>
                {courses.map(course => (
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
          <strong>{certificates.filter(c => c.status === 'issued').length}</strong>
          <span>Certificados Emitidos</span>
        </div>
        <div className="stat-card">
          <strong>{certificates.filter(c => c.status === 'pending').length}</strong>
          <span>Pendentes</span>
        </div>
        <div className="stat-card">
          <strong>{certificates.filter(c => c.status === 'cancelled').length}</strong>
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
        {certificates.map((cert) => (
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
              <button 
                type="button" 
                className="btn btn-ghost btn-sm"
                onClick={() => handleDownload(cert)}
              >
                Download
              </button>
              {cert.status !== 'cancelled' && (
                <button 
                  type="button" 
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleCancel(cert.id)}
                >
                  Cancelar
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminIssueCertificate;
