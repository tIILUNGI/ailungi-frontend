import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../i18n/I18nContext';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

const AdminCreateUser = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Aluno', status: 'Ativo', createdAt: '2026-01-15' },
    { id: 2, name: 'Maria Costa', email: 'maria@email.com', role: 'Aluno', status: 'Ativo', createdAt: '2026-02-01' },
    { id: 3, name: 'Admin Principal', email: 'admin@ailungi.ao', role: 'Admin', status: 'Ativo', createdAt: '2025-12-01' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Aluno',
    status: 'Ativo'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: User = {
      id: users.length + 1,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
    setShowForm(false);
    setFormData({ name: '', email: '', role: 'Aluno', status: 'Ativo' });
    alert('Utilizador criado com sucesso!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja eliminar este utilizador?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.addUser}</h1>
          <p>Gerencie os utilizadores da plataforma AILUNGI.</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : t.common.create + ' Utilizador'}
        </button>
      </div>

      {showForm && (
        <div className="create-form-card">
          <h3>Criar Novo Utilizador</h3>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-row">
              <div className="form-group">
                <label>{t.admin.userName} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="form-input"
                  placeholder="Nome completo"
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
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>{t.admin.userRole} *</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="form-input"
                >
                  <option value="Aluno">Aluno</option>
                  <option value="Admin">Admin</option>
                  <option value="Instrutor">Instrutor</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>{t.admin.userStatus} *</label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="form-input"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {t.common.save}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="app-table">
        <div className="app-table-row app-table-head">
          <span>ID</span>
          <span>{t.admin.userName}</span>
          <span>{t.common.email}</span>
          <span>{t.admin.userRole}</span>
          <span>{t.admin.userStatus}</span>
          <span>Data</span>
          <span>{t.common.actions}</span>
        </div>
        {users.map((user) => (
          <div key={user.id} className="app-table-row">
            <span>#{user.id}</span>
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span className="pill">{user.role}</span>
            <span className={`pill ${user.status === 'Ativo' ? 'pill--success' : 'pill--danger'}`}>
              {user.status}
            </span>
            <span>{user.createdAt}</span>
            <span className="app-table-actions">
              <button type="button" className="btn btn-ghost btn-sm">
                {t.common.edit}
              </button>
              <button 
                type="button" 
                className="btn btn-ghost btn-sm"
                onClick={() => handleDelete(user.id)}
              >
                {t.common.delete}
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCreateUser;
