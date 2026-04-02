import { useEffect, useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';
import { Course } from '../../../data/courses';
import { api } from '../../../services/api';

// Bank details for payment
const BANK_DETAILS = {
  bank: 'Banco Angolano de Investimento (BAI)',
  account: 'AILUNGI - Formação e Certificação',
  nib: '0045 0000 12345678901 23',
  iban: 'AO06 0045 0000 12345678901 23',
  swift: 'BAIOLA',
  reference: 'AILUNGI/2026'
};

const StudentCourses = () => {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nif: '',
    company: '',
    jobTitle: '',
    receiptFile: null as File | null
  });

  useEffect(() => {
    let isMounted = true;

    api
      .getCourses()
      .then(({ data }) => {
        if (isMounted) {
          setCoursesList(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const areas = [...new Set(coursesList.map((c) => c.area))];
  const totalCourses = coursesList.length;

  const filteredCourses = coursesList.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === '' || course.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) return;

    await api.submitEnrollment({
      courseId: selectedCourse.id,
      ...formData
    });

    setShowEnrollmentForm(false);
    setSelectedCourse(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      nif: '',
      company: '',
      jobTitle: '',
      receiptFile: null
    });

    alert('Pedido de inscrição enviado com sucesso. Aguarde a validação da equipa ILUNGI.');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receiptFile: e.target.files[0] });
    }
  };

  if (showEnrollmentForm && selectedCourse) {
    return (
      <div className="app-page">
        <div className="app-page-header">
          <div>
            <span className="app-eyebrow">AILUNGI</span>
            <h1>{t.student.submitEnrollment}</h1>
            <p>{selectedCourse.name}</p>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setShowEnrollmentForm(false);
              setSelectedCourse(null);
            }}
          >
            {t.student.cancel}
          </button>
        </div>

        <div className="enrollment-grid">
          <div className="enrollment-form-card">
            <h3>{t.student.submitEnrollment}</h3>
            <form onSubmit={handleSubmitEnrollment} className="enrollment-form">
              <div className="form-group">
                <label>{t.student.fullName} *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{t.common.email} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{t.student.phone} *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{t.student.nif}</label>
                <input
                  type="text"
                  value={formData.nif}
                  onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{t.student.company}</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{t.student.jobTitle}</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{t.student.uploadReceipt} *</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={handleFileChange}
                  className="form-input file-input"
                />
                <p className="form-hint">Envie o comprovativo de pagamento.</p>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                {t.student.submitEnrollment}
              </button>
            </form>
          </div>

          <div className="payment-info-card">
            <h3>{t.student.paymentInstructions}</h3>

            <div className="payment-amount">
              <span className="label">Investimento</span>
              <span className="amount">Sob consulta</span>
            </div>

            <div className="bank-details">
              <h4>{t.student.bankDetails}</h4>
              <div className="detail-row">
                <span>Banco:</span>
                <span>{BANK_DETAILS.bank}</span>
              </div>
              <div className="detail-row">
                <span>Beneficiária:</span>
                <span>{BANK_DETAILS.account}</span>
              </div>
              <div className="detail-row">
                <span>NIB:</span>
                <span>{BANK_DETAILS.nib}</span>
              </div>
              <div className="detail-row">
                <span>IBAN:</span>
                <span>{BANK_DETAILS.iban}</span>
              </div>
              <div className="detail-row">
                <span>SWIFT:</span>
                <span>{BANK_DETAILS.swift}</span>
              </div>
              <div className="detail-row reference">
                <span>Referência:</span>
                <span>{BANK_DETAILS.reference}</span>
              </div>
            </div>

            <div className="course-summary">
              <h4>Resumo do Curso</h4>
              <p>
                <strong>Código:</strong> {selectedCourse.code}
              </p>
              <p>
                <strong>Área:</strong> {selectedCourse.area}
              </p>
              <p>
                <strong>Modalidade:</strong> {selectedCourse.modality}
              </p>
              <p>
                <strong>Horário:</strong> {selectedCourse.schedule}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">AILUNGI</span>
          <h1>{t.student.availableCourses}</h1>
          <p>Explore o catálogo de cursos e solicite a sua inscrição.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <strong>{totalCourses}</strong>
          <span>Cursos disponíveis</span>
          <p>Atualizados com normas e práticas globais.</p>
        </div>
        <div className="stat-card">
          <strong>{areas.length}</strong>
          <span>Áreas executivas</span>
          <p>Selecione a área mais alinhada ao seu objetivo.</p>
        </div>
        <div className="stat-card">
          <strong>Suporte</strong>
          <span>Especializado</span>
          <p>Equipa pronta para orientar a sua inscrição.</p>
        </div>
      </div>

      <div className="info-panel">
        <div className="info-card">
          <h3>Como funciona a inscrição</h3>
          <ol className="steps-list">
            <li>Selecione o curso desejado.</li>
            <li>Preencha o formulário e envie o comprovativo.</li>
            <li>Aguarde a validação do pagamento.</li>
            <li>Receba o acesso completo ao conteúdo.</li>
          </ol>
        </div>
        <div className="info-card">
          <h3>Documentos necessários</h3>
          <ul className="bullet-list">
            <li>Comprovativo de pagamento</li>
            <li>Documento de identificação</li>
            <li>Dados de contacto atualizados</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>Suporte rápido</h3>
          <p className="muted">Dúvidas sobre inscrição? A nossa equipa ajuda em até 24h.</p>
          <button type="button" className="btn btn-secondary btn-sm">
            Falar com suporte
          </button>
        </div>
      </div>

      <div className="courses-filters">
        <input
          type="text"
          placeholder={t.common.search + '...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="filter-select"
          title="Filtrar por área"
        >
          <option value="">{t.common.filter} - Todas as áreas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <span className="filter-hint">{filteredCourses.length} cursos encontrados</span>
      </div>

      {isLoading ? (
        <div className="empty-state">
          <p>A carregar cursos...</p>
        </div>
      ) : (
        <>
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="app-course-card">
                <div className="app-course-header">
                  <span className="course-code">{course.code}</span>
                  <span className="app-course-area">{course.area}</span>
                </div>
                <h3 className="course-title clamp-2">{course.name}</h3>
                <div className="app-course-meta">
                  <span>
                    <span>Modalidade</span>
                    <strong>{course.modality}</strong>
                  </span>
                  <span>
                    <span>Carga horária</span>
                    <strong>{course.workload}</strong>
                  </span>
                  <span>
                    <span>Agenda</span>
                    <strong>{course.schedule}</strong>
                  </span>
                </div>

                <button type="button" className="btn btn-primary" onClick={() => handleEnroll(course)}>
                  {t.student.enrollNow}
                </button>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="empty-state">
              <p>{t.common.noResults}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentCourses;
