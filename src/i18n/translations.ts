export type Language = 'pt' | 'en';

export type TranslationKeys = {
  common: {
    search: string;
    filter: string;
    create: string;
    save: string;
    edit: string;
    delete: string;
    view: string;
    export: string;
    cancel: string;
    active: string;
    inactive: string;
    status: string;
    actions: string;
    name: string;
    email: string;
    date: string;
    noResults: string;
  };
  nav: {
    logout: string;
  };
  admin: {
    dashboard: string;
    courses: string;
    enrollments: string;
    users: string;
    certificates: string;
    createCourse: string;
    addUser: string;
    areaTitle: string;
    certificateStudent: string;
    approve: string;
    reject: string;
    courseTitle: string;
    courseModality: string;
    courseSchedule: string;
    userName: string;
    userRole: string;
    userStatus: string;
    issueCertificate: string;
  };
  student: {
    dashboard: string;
    availableCourses: string;
    myPath: string;
    exams: string;
    myCertifications: string;
    simulator: string;
    extras: string;
    profile: string;
    areaTitle: string;
    continue: string;
    cancel: string;
    submitEnrollment: string;
    fullName: string;
    phone: string;
    nif: string;
    company: string;
    jobTitle: string;
    uploadReceipt: string;
    paymentInstructions: string;
    bankDetails: string;
    enrollNow: string;
    enrollmentPending: string;
  };
};

export const translations: Record<Language, TranslationKeys> = {
  pt: {
    common: {
      search: 'Pesquisar',
      filter: 'Filtrar',
      create: 'Criar',
      save: 'Guardar',
      edit: 'Editar',
      delete: 'Eliminar',
      view: 'Ver',
      export: 'Exportar',
      cancel: 'Cancelar',
      active: 'Ativo',
      inactive: 'Inativo',
      status: 'Estado',
      actions: 'Ações',
      name: 'Nome',
      email: 'Email',
      date: 'Data',
      noResults: 'Sem resultados',
    },
    nav: {
      logout: 'Sair',
    },
    admin: {
      dashboard: 'Painel',
      courses: 'Cursos',
      enrollments: 'Inscrições',
      users: 'Utilizadores',
      certificates: 'Certificados',
      createCourse: 'Criar Curso',
      addUser: 'Adicionar Utilizador',
      areaTitle: 'Área Administrativa',
      certificateStudent: 'Aluno',
      approve: 'Aprovar',
      reject: 'Rejeitar',
      courseTitle: 'Título do Curso',
      courseModality: 'Modalidade',
      courseSchedule: 'Agenda',
      userName: 'Nome',
      userRole: 'Perfil',
      userStatus: 'Estado',
      issueCertificate: 'Emitir Certificado',
    },
    student: {
      dashboard: 'Painel',
      availableCourses: 'Cursos Disponíveis',
      myPath: 'O Meu Percurso',
      exams: 'Exames',
      myCertifications: 'As Minhas Certificações',
      simulator: 'Simulador',
      extras: 'Extras',
      profile: 'Perfil',
      areaTitle: 'Área do Estudante',
      continue: 'Continuar',
      cancel: 'Cancelar',
      submitEnrollment: 'Solicitar Inscrição',
      fullName: 'Nome Completo',
      phone: 'Telefone',
      nif: 'NIF',
      company: 'Empresa',
      jobTitle: 'Cargo',
      uploadReceipt: 'Comprovativo de Pagamento',
      paymentInstructions: 'Instruções de Pagamento',
      bankDetails: 'Dados Bancários',
      enrollNow: 'Inscrever Agora',
      enrollmentPending: 'Pendente',
    },
  },
  en: {
    common: {
      search: 'Search',
      filter: 'Filter',
      create: 'Create',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      export: 'Export',
      cancel: 'Cancel',
      active: 'Active',
      inactive: 'Inactive',
      status: 'Status',
      actions: 'Actions',
      name: 'Name',
      email: 'Email',
      date: 'Date',
      noResults: 'No results',
    },
    nav: {
      logout: 'Logout',
    },
    admin: {
      dashboard: 'Dashboard',
      courses: 'Courses',
      enrollments: 'Enrollments',
      users: 'Users',
      certificates: 'Certificates',
      createCourse: 'Create Course',
      addUser: 'Add User',
      areaTitle: 'Admin Area',
      certificateStudent: 'Student',
      approve: 'Approve',
      reject: 'Reject',
      courseTitle: 'Course Title',
      courseModality: 'Modality',
      courseSchedule: 'Schedule',
      userName: 'Name',
      userRole: 'Role',
      userStatus: 'Status',
      issueCertificate: 'Issue Certificate',
    },
    student: {
      dashboard: 'Dashboard',
      availableCourses: 'Available Courses',
      myPath: 'My Path',
      exams: 'Exams',
      myCertifications: 'My Certifications',
      simulator: 'Simulator',
      extras: 'Extras',
      profile: 'Profile',
      areaTitle: 'Student Area',
      continue: 'Continue',
      cancel: 'Cancel',
      submitEnrollment: 'Submit Enrollment',
      fullName: 'Full Name',
      phone: 'Phone',
      nif: 'Tax ID',
      company: 'Company',
      jobTitle: 'Job Title',
      uploadReceipt: 'Payment Receipt',
      paymentInstructions: 'Payment Instructions',
      bankDetails: 'Bank Details',
      enrollNow: 'Enroll Now',
      enrollmentPending: 'Pending',
    },
  },
};
