import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section auth-section">
      <div className="container form-wrapper">
        <div className="form-card">
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

          <h2>Recuperar senha</h2>
          <p className="card-meta">Informe o seu email para receber o link de recuperação.</p>

          <form onSubmit={handleSubmit}>
            {submitted && (
              <div className="inline-notice" role="status" aria-live="polite">
                Enviámos um link de recuperação para {email}. Verifique a sua caixa de entrada e o
                spam.
              </div>
            )}
            <div>
              <label htmlFor="recovery-email">Email</label>
              <input
                id="recovery-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitted}>
              {submitted ? 'Link enviado' : 'Enviar link'}
            </button>
          </form>

          <p className="card-meta" style={{ marginTop: '20px', textAlign: 'center' }}>
            Lembrou a senha?{' '}
            <NavLink to="/login" className="nav-link nav-link--active">
              Voltar ao login
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
