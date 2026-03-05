import { NavLink } from 'react-router-dom';
import { courses } from '../../data/courses';

const Courses = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Catálogo ILUNGI</span>
          <h1>Catálogo de Cursos</h1>
          <p>
            Programas executivos em governança, risco, compliance, finanças e liderança. Escolha a
            especialidade ideal para o seu momento profissional.
          </p>
        </div>

        <div className="course-table">
          <div className="course-row course-row--head">
            <div className="course-cell">Código</div>
            <div className="course-cell">Nome do Curso</div>
            <div className="course-cell">Especialidade / Área</div>
            <div className="course-cell">Carga Horária</div>
            <div className="course-cell">Modalidade</div>
            <div className="course-cell">Agenda</div>
            <div className="course-cell">Ação</div>
          </div>

          {courses.map((course) => (
            <div key={course.id} className="course-row">
              <div className="course-cell course-code" data-label="Código">
                {course.code}
              </div>
              <div className="course-cell course-title" data-label="Nome do Curso">
                <strong>{course.name}</strong>
                {course.featured && <span className="pill pill--accent">Destaque</span>}
              </div>
              <div className="course-cell" data-label="Especialidade / Área">
                {course.area}
              </div>
              <div className="course-cell" data-label="Carga Horária">
                {course.workload}
              </div>
              <div className="course-cell" data-label="Modalidade">
                {course.modality}
              </div>
              <div className="course-cell" data-label="Agenda">
                {course.schedule}
              </div>
              <div className="course-cell course-action" data-label="Ação">
                <NavLink to={`/cursos/${course.id}`} className="btn btn-primary btn-sm">
                  Saber mais
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
