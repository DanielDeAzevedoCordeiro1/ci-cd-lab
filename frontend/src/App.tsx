import { useState, useEffect } from 'react';

interface User {
  id: string;
  _id?: string;
  nome: string;
  senha: string;
}

const API_URL = 'https://imo-tech.tech';

function App() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha }),
      });
      if (res.ok) {
        setNome('');
        setSenha('');
        fetchUsers();
      }
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="container">
      <h1>Gerenciador de Usuários</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        
        <div className="buttons">
          <button type="submit">Salvar</button>
        </div>
      </form>

      <div className="users-list">
        <h2>Usuários ({users.length})</h2>
        {users.length === 0 ? (
          <p>Nenhum usuário cadastrado</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id ?? user._id}>
                <span>{user.nome}</span>
                <button onClick={() => handleDelete(user.id ?? user._id ?? '')}>Deletar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
