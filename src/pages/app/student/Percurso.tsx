import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../../../data/courses';
import { useI18n } from '../../../i18n/I18nContext';
import { Course } from '../../../data/courses';

type EnrolledCourse = {
  course: Course;
  progress: number;
  status: 'enrolled' | 'in_progress' | 'completed';
  enrolledDate: string;
};

const StudentPercurso = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  // Sample enrolled courses (in a real app, this would come from backend)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([
    {
      course: courses[0],
      progress: 45,
      status: 'in_progress',
      enrolledDate: '2026-01-15'
    },
    {
      course: courses[2],
      progress: 100,
      status: 'completed',
      enrolledDate: '2025-12-01'
    }
  ]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'enrolled':
        return t.student.enrolled;
      case 'in_progress':
        return t.student.inProgress;
      case 'completed':
        return t.student.completed;
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'enrolled':
        return 'status-enrolled';
      case 'in_progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const handleContinue = (courseId: number) => {
    // In a real app, navigate to course content
    navigate(`/app/aluno/curso/${courseId}`);
  };

  const handleFinish = (courseId: number) => {
    setEnrolledCourses(prev => 
      prev.map(ec => 
        ec.course.id === courseId 
          ? { ...ec, status: 'completed', progress: 100 }
          : ec
      )
    );
  };

  const handleRequestCertificate = (courseId: number) => {
    // In a real app, this would submit a certificate request
    alert('Certificado solicitado com sucesso!');
  };

  const activeCourses = enrolledCourses.filter(ec => ec.status !== 'completed');
  const completedCourses = enrolledCourses.filter(ec => ec.status === 'completed');

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">AILUNGI</span>
          <h1>{t.student.myPath}</h1>
          <p>Acompanhe o seu progresso e solicite certificados.</p>
        </div>
      </div>

      {activeCourses.length > 0 && (
        <div className="percurso-section">
          <h2>{t.student.inProgress}</h2>
          <div className="percurso-grid">
            {activeCourses.map((enrolled) => (
              <div key={enrolled.course.id} className="percurso-card">
                <div className="percurso-card-header">
                  <span className="course-code">{enrolled.course.code}</span>
                  <span className={`status-badge ${getStatusClass(enrolled.status)}`}>
                    {getStatusLabel(enrolled.status)}
                  </span>
                </div>
                <h3 className="course-title">{enrolled.course.name}</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${enrolled.progress}%` }}
                  />
                </div>
                <div className="progress-text">
                  <span>{enrolled.progress}%</span>
                  <span>{t.student.inProgress}</span>
                </div>
                <div className="percurso-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleContinue(enrolled.course.id)}
                  >
                    {t.student.continue}
                  </button>
                  {enrolled.progress >= 80 && enrolled.progress < 100 && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => handleFinish(enrolled.course.id)}
                    >
                      {t.student.finish}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedCourses.length > 0 && (
        <div className="percurso-section">
          <h2>{t.student.completed}</h2>
          <div className="percurso-grid">
            {completedCourses.map((enrolled) => (
              <div key={enrolled.course.id} className="percurso-card completed">
                <div className="percurso-card-header">
                  <span className="course-code">{enrolled.course.code}</span>
                  <span className={`status-badge ${getStatusClass(enrolled.status)}`}>
                    {getStatusLabel(enrolled.status)}
                  </span>
                </div>
                <h3 className="course-title">{enrolled.course.name}</h3>
                <div className="completion-date">
                  Concluído em: {enrolled.enrolledDate}
                </div>
                <div className="percurso-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleRequestCertificate(enrolled.course.id)}
                  >
                    {t.student.requestCertificate}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {enrolledCourses.length === 0 && (
        <div className="empty-state">
          <h3>Ainda não está inscrito em nenhum curso</h3>
          <p>Explore o catálogo de cursos e inscreva-se!</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/app/aluno/cursos')}
          >
            {t.student.availableCourses}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentPercurso;
