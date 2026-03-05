import { NavLink, useParams } from 'react-router-dom';

const CourseLesson = () => {
  const { id } = useParams();

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Aula de Demonstração</span>
          <h1>Curso #{id}</h1>
          <p>Uma prévia do conteúdo para sentir a experiência AILUNGI.</p>
        </div>

        <div className="card-grid">
          <div className="card">
            <h3>Player de Aula</h3>
            <div className="ghost-panel">
              <p>Vídeo demonstrativo do curso. Substitua este bloco pelo player real.</p>
            </div>
          </div>
          <div className="card">
            <h3>Materiais de Apoio</h3>
            <p>Apresentações, exercícios e guias de estudo estarão disponíveis aqui.</p>
            <NavLink to="/registro" className="btn btn-primary">
              Garantir Acesso Completo
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseLesson;
