import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert('Registracija nepavyko');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Registracija</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Vartotojo vardas" className="input" value={form.username}
               onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input type="password" placeholder="Slaptažodis" className="input" value={form.password}
               onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="btn">Registruotis</button>
      </form>
    </div>
  );
}
