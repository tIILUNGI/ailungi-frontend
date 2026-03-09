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

        <div className="course-catalog">
          {courses.map((course) => (
            <div key={course.id} className="course-catalog-item">
              <div className="course-catalog-code">{course.code}</div>
              <div className="course-catalog-info">
                <div className="course-catalog-header">
                  <h3 className="course-catalog-name">{course.name}</h3>
                  {course.featured && <span className="pill pill--accent">Destaque</span>}
                </div>
                <span className="course-catalog-area">{course.area}</span>
              </div>
              <div className="course-catalog-meta">
                <div className="course-catalog-meta-item">
                  <span className="label">Carga Horária</span>
                  <span className="value">{course.workload}</span>
                </div>
                <div className="course-catalog-meta-item">
                  <span className="label">Modalidade</span>
                  <span className="value">{course.modality}</span>
                </div>
                <div className="course-catalog-meta-item">
                  <span className="label">Agenda</span>
                  <span className="value">{course.schedule}</span>
                </div>
              </div>
              <div className="course-catalog-action">
                <NavLink to={`/cursos/${course.id}`} className="btn btn-primary">
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
