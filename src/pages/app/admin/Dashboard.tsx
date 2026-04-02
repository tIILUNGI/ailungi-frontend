import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useI18n } from '../../../i18n/I18nContext';
import { api, AdminCertificate, AdminEnrollment } from '../../../services/api';
import { Course } from '../../../data/courses';

const AdminDashboard = () => {
  const { t } = useI18n();
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<AdminCertificate[]>([]);
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([api.getCourses(), api.getAdminCertificates(), api.getAdminEnrollments()])
      .then(([coursesResponse, certificatesResponse, enrollmentsResponse]) => {
        if (!isMounted) return;
        setCourses(coursesResponse.data);
        setCertificates(certificatesResponse.data);
        setEnrollments(enrollmentsResponse.data);
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

  const usersCount = useMemo(() => {
    const emails = new Set<string>();
    enrollments.forEach((item) => {
      if (item.email) emails.add(item.email);
    });
    certificates.forEach((item) => {
      if (item.studentEmail) emails.add(item.studentEmail);
    });
    return emails.size;
  }, [enrollments, certificates]);

  const pendingEnrollments = useMemo(
    () => enrollments.filter((item) => item.status === 'pending').length,
    [enrollments]
  );

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.dashboard}</h1>
          <p>Visão administrativa pronta para integração com o backend.</p>
        </div>
        <NavLink to="/app/admin/cursos" className="btn btn-primary">
          {t.admin.createCourse}
        </NavLink>
      </div>

      <div className="app-grid-2">
        <div className="app-card">
          <h2>Resumo operacional</h2>
          <p className="muted">Indicadores em tempo real para a gestão administrativa.</p>
          {isLoading ? (
            <div className="empty-state">
              <p>A carregar indicadores...</p>
            </div>
          ) : (
            <div className="app-stats-grid">
              <div className="app-stat-card">
                <span className="label">Cursos no catálogo</span>
                <strong>{courses.length}</strong>
                <span className="meta">Disponíveis</span>
              </div>
              <div className="app-stat-card">
                <span className="label">Utilizadores ativos</span>
                <strong>{usersCount}</strong>
                <span className="meta">Alunos e gestores</span>
              </div>
              <div className="app-stat-card">
                <span className="label">Inscrições pendentes</span>
                <strong>{pendingEnrollments}</strong>
                <span className="meta">Aguardar validação</span>
              </div>
              <div className="app-stat-card">
                <span className="label">Certificados emitidos</span>
                <strong>{certificates.length}</strong>
                <span className="meta">Registos oficiais</span>
              </div>
            </div>
          )}
        </div>

        <div className="app-card">
          <h2>Atalhos administrativos</h2>
          <div className="admin-shortcuts">
            <NavLink to="/app/admin/cursos" className="admin-shortcut admin-shortcut--primary">
              <span className="admin-shortcut-title">Gestão de cursos</span>
              <span className="admin-shortcut-meta">Criar, editar e destacar formações</span>
            </NavLink>
            <NavLink to="/app/admin/certificados" className="admin-shortcut">
              <span className="admin-shortcut-title">Gerir certificados</span>
              <span className="admin-shortcut-meta">Emitir, cancelar e validar</span>
            </NavLink>
            <NavLink to="/app/admin/utilizadores" className="admin-shortcut">
              <span className="admin-shortcut-title">Utilizadores & acessos</span>
              <span className="admin-shortcut-meta">Perfis, estatutos e permissões</span>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="app-card">
        <h2>Atividades recentes</h2>
        <div className="empty-state">
          <p>Sem atividades no momento. Os eventos aparecerão aqui após a integração.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
