import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { setAuth } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'aluno' | 'admin'>('aluno');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { data } = await api.login({ email, password, role });
    setAuth(data);
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
              <span className="brand-tagline">Academia Corporativa</span>
            </div>
          </div>

          <h2>Acesso à plataforma</h2>
          <p className="card-meta">Entre com as credenciais do seu ambiente corporativo.</p>

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
              Criar conta
            </NavLink>
          </p>
        </div>

        <div className="auth-panel">
          <span className="badge badge--ghost">Acesso Corporativo</span>
          <h1>Segurança e conformidade em cada login</h1>
          <p>
            A plataforma ILUNGI foi desenhada para ambientes empresariais com foco em governança,
            auditoria e controle de acesso.
          </p>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <span className="auth-dot" /> Políticas de acesso e trilhas executivas
            </div>
            <div className="auth-benefit">
              <span className="auth-dot" /> Conteúdos alinhados às normas internacionais
            </div>
            <div className="auth-benefit">
              <span className="auth-dot" /> Suporte dedicado para equipas e gestores
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
