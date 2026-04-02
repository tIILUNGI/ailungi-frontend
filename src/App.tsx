import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import RequireAuth from './components/common/RequireAuth';
import { I18nProvider } from './i18n/I18nContext';
import AdminShell from './components/layout/AdminShell';
import PublicLayout from './components/layout/PublicLayout';
import StudentShell from './components/layout/StudentShell';
import Home from './pages/public/Home';
import Courses from './pages/public/Courses';
import CourseDetail from './pages/public/CourseDetail';
import CourseLesson from './pages/public/CourseLesson';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import Certifications from './pages/public/Certifications';
import VerifyCertificate from './pages/public/VerifyCertificate';
import Sitemap from './pages/public/Sitemap';
import NotFound from './pages/public/NotFound';
import StudentDashboard from './pages/app/student/Dashboard';
import StudentCourses from './pages/app/student/Courses';
import StudentPercurso from './pages/app/student/Percurso';
import StudentExams from './pages/app/student/Exams';
import StudentCertifications from './pages/app/student/Certifications';
import StudentSimulator from './pages/app/student/Simulator';
import StudentExtras from './pages/app/student/Extras';
import StudentProfile from './pages/app/student/Profile';
import StudentCourseLesson from './pages/app/student/CourseLesson';
import AdminDashboard from './pages/app/admin/Dashboard';
import AdminEnrollments from './pages/app/admin/Enrollments';
import AdminCreateUser from './pages/app/admin/CreateUser';
import AdminCreateCourse from './pages/app/admin/CreateCourse';
import AdminIssueCertificate from './pages/app/admin/IssueCertificate';
import AppNotFound from './pages/app/NotFound';

const App = () => {
  return (
    <div className="app-shell">
      <I18nProvider>
        <ScrollToTop />
        <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/cursos/:id" element={<CourseDetail />} />
          <Route path="/cursos/:id/aula" element={<CourseLesson />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha" element={<ForgotPassword />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/certificacoes" element={<Certifications />} />
          <Route path="/certificados/verificar" element={<VerifyCertificate />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Route>

        <Route
          path="/app/aluno"
          element={
            <RequireAuth role="aluno">
              <StudentShell />
            </RequireAuth>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="cursos" element={<StudentCourses />} />
          <Route path="percurso" element={<StudentPercurso />} />
          <Route path="curso/:id" element={<StudentCourseLesson />} />
          <Route path="exames" element={<StudentExams />} />
          <Route path="certificacoes" element={<StudentCertifications />} />
          <Route path="simulador" element={<StudentSimulator />} />
          <Route path="extras" element={<StudentExtras />} />
          <Route path="perfil" element={<StudentProfile />} />
          <Route path="*" element={<AppNotFound />} />
        </Route>

        <Route
          path="/app/admin"
          element={
            <RequireAuth role="admin">
              <AdminShell />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="cursos" element={<AdminCreateCourse />} />
          <Route path="certificados" element={<AdminIssueCertificate />} />
          <Route path="inscricoes" element={<AdminEnrollments />} />
          <Route path="utilizadores" element={<AdminCreateUser />} />
          <Route path="*" element={<AppNotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      </I18nProvider>
    </div>
  );
};

export default App;
