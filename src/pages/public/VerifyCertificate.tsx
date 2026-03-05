import { FormEvent, useState } from 'react';

type CertificateResult = {
  name: string;
  course: string;
  date: string;
  code: string;
};

const VerifyCertificate = () => {
  const [code, setCode] = useState('');
  const [hasResult, setHasResult] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [result, setResult] = useState<CertificateResult | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setHasResult(true);

    if (code.trim().toUpperCase().startsWith('AILUNGI')) {
      setIsValid(true);
      setResult({
        name: 'João Silva',
        course: 'Gestão de Projetos',
        date: '15 de Janeiro, 2024',
        code: code.trim().toUpperCase()
      });
    } else {
      setIsValid(false);
      setResult(null);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Validação</span>
          <h1>Verificar Certificado</h1>
          <p>Verifique a autenticidade de um certificado emitido pela AILUNGI.</p>
        </div>

        <div className="form-wrapper">
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="certificateCode">Código do Certificado</label>
                <input
                  id="certificateCode"
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="AILUNGI-2024-XXX-000000"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Verificar
              </button>
            </form>

            {hasResult && (
              <div style={{ marginTop: '24px' }}>
                {isValid && result ? (
                  <div className="ghost-panel">
                    <h3>Certificado Válido</h3>
                    <p>
                      <strong>Nome:</strong> {result.name}
                    </p>
                    <p>
                      <strong>Curso:</strong> {result.course}
                    </p>
                    <p>
                      <strong>Data de Emissão:</strong> {result.date}
                    </p>
                    <p>
                      <strong>Código:</strong> {result.code}
                    </p>
                  </div>
                ) : (
                  <div className="ghost-panel">
                    <h3>Certificado Não Encontrado</h3>
                    <p>
                      O código do certificado fornecido não foi encontrado. Verifique o código e tente
                      novamente.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="card-meta" style={{ marginTop: '16px', textAlign: 'center' }}>
            Para assistência, contacte <a href="mailto:contato@ailungi.com">contato@ailungi.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerifyCertificate;
