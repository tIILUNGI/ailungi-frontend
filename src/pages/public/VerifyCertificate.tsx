import { FormEvent, useState } from 'react';
import { useCallback, useEffect } from 'react';
import { api, CertificateVerification } from '../../services/api';
import { useSearchParams } from 'react-router-dom';

const VerifyCertificate = () => {
  const [code, setCode] = useState('');
  const [hasResult, setHasResult] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CertificateVerification | null>(null);
  const [searchParams] = useSearchParams();

  const runVerification = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setHasResult(false);
      setIsValid(false);
      setResult(null);
      setIsLoading(false);
      return;
    }

    setHasResult(true);
    setIsLoading(true);

    const { data } = await api.verifyCertificate(trimmed);

    setIsValid(Boolean(data));
    setResult(data ?? null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const initialCode = searchParams.get('codigo');
    if (initialCode) {
      setCode(initialCode);
      runVerification(initialCode);
    }
  }, [searchParams, runVerification]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    runVerification(code);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="page-hero page-hero--corporate">
          <span className="badge">Validação</span>
          <h1>Verificar Certificado</h1>
          <p>Verifique a autenticidade de um certificado emitido pela AILUNGI.</p>
        </div>

        <div className="verify-grid">
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
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'A verificar...' : 'Verificar'}
              </button>
            </form>

            {hasResult && !isLoading && (
              <div style={{ marginTop: '24px' }}>
                {isValid && result ? (
                  <div className="ghost-panel verify-result verify-result--valid">
                    <div className="verify-result-head">
                      <h3>Certificado Válido</h3>
                      <span className="pill pill--success">Válido</span>
                    </div>
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
                  <div className="ghost-panel verify-result verify-result--invalid">
                    <div className="verify-result-head">
                      <h3>Certificado Não Encontrado</h3>
                      <span className="pill pill--danger">Inválido</span>
                    </div>
                    <p>
                      O código do certificado fornecido não foi encontrado. Verifique o código e tente
                      novamente.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="verify-side">
            <div className="card">
              <h3>Como funciona</h3>
              <ul className="check-list">
                <li>Insira o código completo do certificado.</li>
                <li>O sistema confirma a validade e os dados principais.</li>
                <li>Certificados inválidos não exibem informações.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Precisa de ajuda?</h3>
              <p>Para assistência, contacte a equipa ILUNGI.</p>
              <a className="btn btn-ghost btn-sm" href="mailto:contato@ailungi.com">
                Falar com suporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyCertificate;
