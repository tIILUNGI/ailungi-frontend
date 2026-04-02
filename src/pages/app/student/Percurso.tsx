import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../i18n/I18nContext';
import { api, Enrollment } from '../../../services/api';

const StudentPercurso = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api
      .getEnrollments()
      .then(({ data }) => {
        if (isMounted) {
          setEnrollments(data);
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

  const getStatusLabel = (status: Enrollment['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'blocked':
        return 'Bloqueado';
      default:
        return status;
    }
  };

  const handleContinue = (courseId: number) => {
    navigate(`/app/aluno/curso/${courseId}`);
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">AILUNGI</span>
          <h1>{t.student.myPath}</h1>
          <p>Visualize as suas inscrições e acesse o conteúdo aprovado.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="empty-state">
          <p>A carregar inscrições...</p>
        </div>
      ) : enrollments.length > 0 ? (
        <div className="percurso-section">
          <h2>Minhas inscrições</h2>
          <div className="percurso-grid">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="percurso-card">
                <div className="percurso-card-header">
                  <span className="course-code">{enrollment.course.code}</span>
                  <span className="pill">{getStatusLabel(enrollment.status)}</span>
                </div>
                <h3 className="course-title clamp-2">{enrollment.course.name}</h3>
                <div className="percurso-meta">
                  <span>
                    <span>Modalidade</span>
                    <strong>{enrollment.course.modality}</strong>
                  </span>
                  <span>
                    <span>Área</span>
                    <strong>{enrollment.course.area}</strong>
                  </span>
                  <span>
                    <span>Agenda</span>
                    <strong>{enrollment.course.schedule}</strong>
                  </span>
                </div>
                <div className="percurso-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleContinue(enrollment.course.id)}
                    disabled={enrollment.status !== 'active'}
                  >
                    {t.student.continue}
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => navigate('/app/aluno/cursos')}>
                    Ver catálogo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="app-empty">
          <h3>Ainda não tem inscrições ativas</h3>
          <p className="muted">Explore o catálogo de cursos e solicite a sua inscrição.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/app/aluno/cursos')}>
            {t.student.availableCourses}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentPercurso;
