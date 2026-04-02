import { NavLink } from 'react-router-dom';
import { getAuth } from '../../utils/auth';

const AppNotFound = () => {
  const auth = getAuth();
  const homePath = auth?.role === 'admin' ? '/app/admin' : '/app/aluno';

  return (
    <div className="app-page">
      <div className="app-empty">
        <h2>Página não encontrada</h2>
        <p>O recurso solicitado não existe nesta área.</p>
        <NavLink to={homePath} className="btn btn-primary">
          Voltar ao painel
        </NavLink>
      </div>
    </div>
  );
};

export default AppNotFound;
