import { NavLink } from 'react-router-dom';

const PublicFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-logo-frame">
            <img src="/ilungi_logo.jpg" alt="AILUNGI" className="brand-logo" />
          </span>
        </div>

        <div>
          <h4>Navegação</h4>
          <div className="footer-links">
            <NavLink to="/cursos">Catálogo de Cursos</NavLink>
            <NavLink to="/certificacoes">Certificações</NavLink>
            <NavLink to="/certificados/verificar">Verificar Certificados</NavLink>
          </div>
        </div>

        <div>
          <h4>Conta</h4>
          <div className="footer-links">
            <NavLink to="/login">Entrar</NavLink>
            <NavLink to="/registro">Criar Conta</NavLink>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} ILUNGI. Todos os direitos reservados.</p>
        <NavLink to="/sitemap">Mapa do Site</NavLink>
      </div>
    </footer>
  );
};

export default PublicFooter;
