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
          <p>
            AILUNGI é uma plataforma de cursos online e certificações profissionais. Aprenda com
            especialistas e avance na sua carreira.
          </p>
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

        <div>
          <h4>Aplicativos</h4>
          <div className="footer-links">
            <a href="https://gpmoi.org/" target="_blank" rel="noreferrer">
              GPMOI
            </a>
            <a href="https://scr.ilungi.ao/" target="_blank" rel="noreferrer">
              SCR ILUNGI
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} AILUNGI. Todos os direitos reservados.</p>
        <NavLink to="/sitemap">Mapa do Site</NavLink>
      </div>
    </footer>
  );
};

export default PublicFooter;
