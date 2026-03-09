import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../../../data/courses';
import { useI18n } from '../../../i18n/I18nContext';
import { Course } from '../../../data/courses';

// Bank details for payment
const BANK_DETAILS = {
  bank: 'Banco Angolano de Investimento (BAI)',
  account: 'AILUNGI - Formação e Certificação',
  nib: '0045 0000 12345678901 23',
  iban: 'AO06 0045 0000 12345678901 23',
  swift: 'BAIOLA',
  reference: 'AILUNGI/2026'
};

type EnrolledCourse = {
  courseId: number;
  status: 'pending' | 'approved' | 'rejected';
  enrolledDate: string;
  paymentReceipt?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  nif?: string;
  company?: string;
  jobTitle?: string;
};

const StudentCourses = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  
  // Mock enrolled courses (in real app, this would come from backend)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  
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

  const areas = [...new Set(courses.map((c) => c.area))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === '' || course.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) return;
    
    // Create enrollment request
    const newEnrollment: EnrolledCourse = {
      courseId: selectedCourse.id,
      status: 'pending',
      enrolledDate: new Date().toISOString(),
      ...formData
    };
    
    setEnrolledCourses([...enrolledCourses, newEnrollment]);
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
    
    alert(t.student.enrollmentPending + '! ' + t.student.waitApproval);
  };

  const getEnrollmentStatus = (courseId: number): EnrolledCourse | undefined => {
    return enrolledCourses.find(ec => ec.courseId === courseId);
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
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>{t.common.email} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>{t.student.phone} *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>{t.student.nif}</label>
                <input
                  type="text"
                  value={formData.nif}
                  onChange={(e) => setFormData({...formData, nif: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>{t.student.company}</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>{t.student.jobTitle}</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
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
                <p className="form-hint">Envie o comprovativo de pagamento</p>
              </div>
              
              <button type="submit" className="btn btn-primary btn-full">
                {t.student.submitEnrollment}
              </button>
            </form>
          </div>
          
          <div className="payment-info-card">
            <h3>{t.student.paymentInstructions}</h3>
            
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
              <p><strong>Código:</strong> {selectedCourse.code}</p>
              <p><strong>Área:</strong> {selectedCourse.area}</p>
              <p><strong>Modalidade:</strong> {selectedCourse.modality}</p>
              <p><strong>Horário:</strong> {selectedCourse.schedule}</p>
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
          <p>Explore o catálogo de cursos e inscreva-se nos que mais lhe interessam.</p>
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
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course) => {
          const enrollment = getEnrollmentStatus(course.id);
          
          return (
            <div key={course.id} className="course-card">
              <div className="course-card-header">
                <span className="course-code">{course.code}</span>
                <span className="course-area">{course.area}</span>
              </div>
              <h3 className="course-title">{course.name}</h3>
              <div className="course-meta">
                <span>{course.schedule}</span>
              </div>
              
              {enrollment ? (
                <div className="enrollment-status">
                  {enrollment.status === 'pending' && (
                    <span className="status-pending">
                      {t.student.enrollmentPending}
                    </span>
                  )}
                  {enrollment.status === 'approved' && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => navigate('/app/aluno/percurso')}
                    >
                      {t.student.continue}
                    </button>
                  )}
                  {enrollment.status === 'rejected' && (
                    <span className="status-rejected">
                      Inscrição rejeitada
                    </span>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEnroll(course)}
                >
                  {t.student.enrollNow}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="empty-state">
          <p>{t.common.noResults}</p>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
