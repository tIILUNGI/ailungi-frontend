import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Erro 404</span>
          <h1>Página não encontrada</h1>
          <p>A página que procura não existe ou foi movida.</p>
          <NavLink to="/" className="btn btn-primary">
            Voltar ao Início
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
