import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    await API.post('/tasks', form);
    setForm({ title: '', description: '' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleUpdate = async (task) => {
    const updated = prompt('Naujas pavadinimas:', task.title);
    if (!updated) return;
    await API.put(`/tasks/${task.id}`, { ...task, title: updated });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tavo Užduotys</h1>
        <button className="btn" onClick={logout}>Atsijungti</button>
      </div>

      <div className="space-y-2">
        <input type="text" placeholder="Pavadinimas" className="input" value={form.title}
               onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="text" placeholder="Aprašymas" className="input" value={form.description}
               onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="btn" onClick={handleAdd}>Pridėti</button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleUpdate(task)} className="btn-sm">✏️</button>
              <button onClick={() => handleDelete(task.id)} className="btn-sm">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
