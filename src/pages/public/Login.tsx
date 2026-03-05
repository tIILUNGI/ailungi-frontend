import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { setAuth } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'aluno' | 'admin'>('aluno');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setAuth({
      role,
      email,
      name: email.split('@')[0]
    });
    navigate(role === 'admin' ? '/app/admin' : '/app/aluno');
  };

  return (
    <section className="section auth-section">
      <div className="container auth-grid">
        <div className="form-card auth-card">
          <div className="auth-brand">
            <NavLink to="/" className="brand">
              <span className="brand-logo-frame brand-logo-frame--lg">
                <img src="/ilungi_logo.jpg" alt="AILUNGI" className="brand-logo" />
              </span>
            </NavLink>
            <div>
              <span className="brand-name">AILUNGI</span>
              <span className="brand-tagline">Academia & Certificações</span>
            </div>
          </div>

          <h2>Entrar na plataforma</h2>
          <p className="card-meta">Aceda com o seu email corporativo ou pessoal.</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label htmlFor="role">Tipo de acesso</label>
              <select
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value as 'aluno' | 'admin')}
              >
                <option value="aluno">Aluno</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="split-grid split-grid--inline">
              <label className="check-row">
                <input type="checkbox" /> Lembrar-me
              </label>
              <NavLink to="/recuperar-senha" className="nav-link">
                Esqueceu a senha?
              </NavLink>
            </div>
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>

          <p className="card-meta" style={{ marginTop: '20px', textAlign: 'center' }}>
            Não tem uma conta?{' '}
            <NavLink to="/registro" className="nav-link nav-link--active">
              Criar conta grátis
            </NavLink>
          </p>
        </div>

        <div className="auth-panel">
          <span className="badge badge--ghost">Acesso Corporativo</span>
          <h1>Bem-vindo à AILUNGI</h1>
          <p>
            Entre na sua conta e continue a sua jornada em governança, risco e compliance com
            conteúdos alinhados às melhores práticas internacionais.
          </p>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <span className="auth-dot" /> Trilhas executivas e certificações reconhecidas
            </div>
            <div className="auth-benefit">
              <span className="auth-dot" /> Materiais estratégicos e mentoria especializada
            </div>
            <div className="auth-benefit">
              <span className="auth-dot" /> Acesso seguro ao seu histórico académico
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
