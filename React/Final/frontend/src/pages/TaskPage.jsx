import { useEffect, useState } from 'react';
import API from '../services/api'; 
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../components/KanbanBoard'; 

export default function TaskPage() {
  const [tasks, setTasks] = useState([]); // Užduočių sąrašas
  const [form, setForm] = useState({ title: '', description: '' }); // Formos būsena
  const navigate = useNavigate(); // Maršruto keitimas

  // Duomenų užkrovimas iš API
  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Nepavyko užkrauti užduočių:', err);
    }
  };

  // Pradinis užkrovimas
  useEffect(() => {
    fetchTasks();
  }, []);

  // Naujos užduoties pridėjimas
  const handleAdd = async () => {
    if (!form.title.trim()) return;
    try {
      await API.post('/tasks', form);
      setForm({ title: '', description: '' });
      fetchTasks();
    } catch (err) {
      console.error('Nepavyko pridėti užduoties:', err);
    }
  };

  // Užduoties atnaujinimas Kanban lentoje
  const handleUpdateTask = async (task) => {
    try {
      const payload = { title: task.title, description: task.description };
      if (task.group) payload.group = task.group; // Jei yra grupė, įtraukiame pakeitimą
      await API.put(`/tasks/${task.id}`, payload);
      fetchTasks();
    } catch (err) {
      console.error('Nepavyko atnaujinti užduoties:', err);
    }
  };

  // Užduoties šalinimas
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Nepavyko ištrinti užduoties:', err);
    }
  };

  // Atsijungimas ir nukreipimas į prisijungimo puslapį
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Tavo užduotys</h1>
        <button className="btn" onClick={logout}>Atsijungti</button>
      </div>

      {/* Formos laukeliai */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Pavadinimas"
          className="form-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Aprašymas"
          className="form-input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <button className="btn" onClick={handleAdd} style={{ marginBottom: '1rem' }}>Pridėti</button>

      {/* Rodo Kanban lentą su užduotimis */}
      <KanbanBoard
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
