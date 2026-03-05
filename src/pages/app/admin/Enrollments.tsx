import { useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';

type Enrollment = {
  id: number;
  courseId: number;
  courseName: string;
  courseCode: string;
  fullName: string;
  email: string;
  phone: string;
  nif: string;
  company: string;
  jobTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolledDate: string;
  receiptFile?: string;
};

const AdminEnrollments = () => {
  const { t } = useI18n();
  
  // Mock enrollments data - in real app this would come from backend
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    {
      id: 1,
      courseId: 1,
      courseName: 'Interpretação e Auditor Interno normas ISO 37001 e ISO 37301',
      courseCode: 'CC-001',
      fullName: 'João Silva',
      email: 'joao@email.com',
      phone: '+244 923 456 789',
      nif: '123456789',
      company: 'Empresa X',
      jobTitle: 'Gerente',
      status: 'pending',
      enrolledDate: '2026-03-01'
    }
  ]);

  const handleApprove = (id: number) => {
    setEnrollments(prev => 
      prev.map(e => e.id === id ? { ...e, status: 'approved' } : e)
    );
    alert('Inscrição aprovada!');
  };

  const handleReject = (id: number) => {
    setEnrollments(prev => 
      prev.map(e => e.id === id ? { ...e, status: 'rejected' } : e)
    );
    alert('Inscrição rejeitada.');
  };

  const pendingEnrollments = enrollments.filter(e => e.status === 'pending');
  const processedEnrollments = enrollments.filter(e => e.status !== 'pending');

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.enrollments}</h1>
          <p>Gerencie as solicitações de inscrição dos alunos.</p>
        </div>
      </div>

      {pendingEnrollments.length > 0 && (
        <div className="enrollments-section">
          <h2>Inscrições Pendentes ({pendingEnrollments.length})</h2>
          <div className="enrollments-grid">
            {pendingEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="enrollment-card">
                <div className="enrollment-header">
                  <span className="enrollment-course-code">{enrollment.courseCode}</span>
                  <span className="enrollment-status-badge pending">
                    {t.student.enrollmentPending}
                  </span>
                </div>
                
                <h3 className="enrollment-course-name">{enrollment.courseName}</h3>
                
                <div className="enrollment-student-info">
                  <div className="info-row">
                    <span className="label">{t.admin.certificateStudent}:</span>
                    <span>{enrollment.fullName}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">{t.common.email}:</span>
                    <span>{enrollment.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">{t.student.phone}:</span>
                    <span>{enrollment.phone}</span>
                  </div>
                  {enrollment.nif && (
                    <div className="info-row">
                      <span className="label">{t.student.nif}:</span>
                      <span>{enrollment.nif}</span>
                    </div>
                  )}
                  {enrollment.company && (
                    <div className="info-row">
                      <span className="label">{t.student.company}:</span>
                      <span>{enrollment.company}</span>
                    </div>
                  )}
                  {enrollment.jobTitle && (
                    <div className="info-row">
                      <span className="label">{t.student.jobTitle}:</span>
                      <span>{enrollment.jobTitle}</span>
                    </div>
                  )}
                </div>
                
                <div className="enrollment-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleApprove(enrollment.id)}
                  >
                    {t.admin.approve}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => handleReject(enrollment.id)}
                  >
                    {t.admin.reject}
                  </button>
                </div>
                
                <div className="enrollment-date">
                  Data: {enrollment.enrolledDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {processedEnrollments.length > 0 && (
        <div className="enrollments-section">
          <h2>Inscrições Processadas</h2>
          <div className="app-table">
            <div className="app-table-row app-table-head">
              <span>Código</span>
              <span>Curso</span>
              <span>Aluno</span>
              <span>Email</span>
              <span>Status</span>
              <span>Data</span>
            </div>
            {processedEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="app-table-row">
                <span>{enrollment.courseCode}</span>
                <span>{enrollment.courseName.substring(0, 30)}...</span>
                <span>{enrollment.fullName}</span>
                <span>{enrollment.email}</span>
                <span className={`pill ${enrollment.status === 'approved' ? 'pill--success' : 'pill--danger'}`}>
                  {enrollment.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                </span>
                <span>{enrollment.enrolledDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {enrollments.length === 0 && (
        <div className="empty-state">
          <p>{t.common.noResults}</p>
        </div>
      )}
    </div>
  );
};

export default AdminEnrollments;
