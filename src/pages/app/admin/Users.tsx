import { useState } from 'react';
import { useI18n } from '../../../i18n/I18nContext';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const AdminUsers = () => {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');

  const users: User[] = [];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-page">
      <div className="app-page-header">
        <div>
          <span className="app-eyebrow">Admin</span>
          <h1>{t.admin.users}</h1>
          <p>Gestão de perfis, acessos e estatutos na plataforma AILUNGI.</p>
        </div>
        <button type="button" className="btn btn-primary">
          {t.admin.addUser}
        </button>
      </div>

      <div className="compact-search">
        <input
          type="text"
          placeholder={t.common.search + '...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="app-table">
        <div className="app-table-row app-table-head">
          <span>{t.common.name}</span>
          <span>{t.common.email}</span>
          <span>Perfil</span>
          <span>{t.common.status}</span>
          <span>{t.common.actions}</span>
        </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="app-table-row">
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span className="pill">{user.status}</span>
              <span className="app-table-actions">
                <button type="button" className="btn btn-ghost btn-sm">
                  {t.common.edit}
                </button>
                <button type="button" className="btn btn-ghost btn-sm">
                  Suspender
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>{t.common.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
