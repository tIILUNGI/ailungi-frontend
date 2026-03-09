import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
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
              <span className="brand-tagline">Academia</span>
            </div>
          </div>

          <h2>Criar conta</h2>
          <p className="card-meta">Complete os seus dados para começar a aprender hoje mesmo.</p>

          <form onSubmit={handleSubmit}>
            <div className="split-grid">
              <div>
                <label htmlFor="firstName">Nome</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="João"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Sobrenome</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Silva"
                  required
                />
              </div>
            </div>

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
              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+244 900 000 000"
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
              <p className="card-meta">Mínimo de 8 caracteres.</p>
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <label className="check-row">
              <input type="checkbox" required /> Aceito os Termos de Serviço e a Política de
              Privacidade.
            </label>

            {submitted && (
              <div className="inline-notice" role="status" aria-live="polite">
                Conta criada com sucesso. Enviámos um email de boas-vindas para {email}.
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={submitted}>
              {submitted ? 'Conta criada' : 'Criar Conta'}
            </button>
          </form>

          <p className="card-meta" style={{ marginTop: '20px', textAlign: 'center' }}>
            {submitted ? (
              <>
                Pode entrar agora.{' '}
                <NavLink to="/login" className="nav-link nav-link--active">
                  Entrar
                </NavLink>
              </>
            ) : (
              <>
                Já tem uma conta?{' '}
                <NavLink to="/login" className="nav-link nav-link--active">
                  Entrar
                </NavLink>
              </>
            )}
          </p>
        </div>

        <div className="auth-panel">
          <span className="badge badge--ghost">Inscrição Executiva</span>
          <h1>Crie a sua conta profissional</h1>
          <p>
            Aceda ao catálogo completo, certificações e conteúdos premium preparados por especialistas
            da AILUNGI.
          </p>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <span className="auth-dot" /> Registo rápido com confirmação imediata
            </div>
            <div className="auth-benefit">
              <span className="auth-dot" /> Catálogo com 34 cursos especializados
            </div>
            <div className="auth-benefit">
              <span className="auth-dot" /> Certificados digitais com validação online
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
