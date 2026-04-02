import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Course } from '../../data/courses';
import { api } from '../../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const courseId = Number(id);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!Number.isNaN(courseId)) {
      api
        .getCourseById(courseId)
        .then(({ data }) => {
          if (isMounted) {
            setCourse(data);
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  if (isLoading) {
    return (
      <section className="section">
        <div className="container empty-state">
          <p>A carregar curso...</p>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>Curso não encontrado</h2>
          <p>O curso solicitado não existe ou foi movido.</p>
          <NavLink to="/cursos" className="btn btn-primary">
            Voltar ao Catálogo
          </NavLink>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Curso {course.code}</span>
          <h1>{course.name}</h1>
          <p>Especialidade: {course.area}</p>
        </div>

        <div className="card-grid">
          <div className="card">
            <h3>Informações-chave</h3>
            <div className="split-grid">
              <div>
                <p className="card-meta">Código</p>
                <strong>{course.code}</strong>
              </div>
              <div>
                <p className="card-meta">Carga Horária</p>
                <strong>{course.workload}</strong>
              </div>
              <div>
                <p className="card-meta">Modalidade</p>
                <strong>{course.modality}</strong>
              </div>
              <div>
                <p className="card-meta">Agenda</p>
                <strong>{course.schedule}</strong>
              </div>
              <div>
                <p className="card-meta">Área</p>
                <strong>{course.area}</strong>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Sobre o curso</h3>
            <p>
              Formação orientada para profissionais que desejam fortalecer competências em {course.area}.
              O conteúdo programático completo, docentes e calendarização serão partilhados pela equipa
              ILUNGI após o seu contacto.
            </p>
          </div>

          <div className="card">
            <h3>Próximos passos</h3>
            <p>Fale connosco para garantir a sua vaga e receber os detalhes completos.</p>
            <div className="hero-actions">
              <NavLink to="/registro" className="btn btn-primary">
                Inscrever-me
              </NavLink>
              <NavLink to={`/cursos/${course.id}/aula`} className="btn btn-ghost">
                Ver Aula Demo
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
