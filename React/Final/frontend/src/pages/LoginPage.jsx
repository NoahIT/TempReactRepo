import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' }); // Formos duomenys
  const navigate = useNavigate(); // Navigacijos funkcija

  // Prisijungimo formos pateikimo tvarkymas
  const handleSubmit = async (e) => {
    e.preventDefault(); // Išvengiame puslapio perkrovimo
    try {
      const res = await API.post('/auth/login', form); // Siunčiame prisijungimo užklausą
      localStorage.setItem('token', res.data.token); // Saugojame prisijungimo tokeną
      navigate('/tasks'); // Nukreipiame į užduočių puslapį
    } catch (err) {
      console.error(err.response?.data); // Klaidos informacija konsolėje
      alert('Prisijungimas nepavyko'); // Informuojame vartotoją apie klaidą
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Prisijungimas</h1>
        <form onSubmit={handleSubmit}> {/* Formos pateikimo registracija */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Vartotojo vardas"
              className="form-input"
              value={form.username} // Susiejame laukelį su būsena
              onChange={(e) => setForm({ ...form, username: e.target.value })} // Atnaujiname vartotojo vardą
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Slaptažodis"
              className="form-input"
              value={form.password} // Susiejame laukelį su būsena
              onChange={(e) => setForm({ ...form, password: e.target.value })} // Atnaujiname slaptažodį
            />
          </div>
          <button type="submit" className="btn">
            Prisijungti
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            className="btn-small"
            onClick={() => navigate('/register')} // Perkeliam į registracijos puslapį
          >
            Registruotis
          </button>
        </div>
      </div>
    </div>
  );
}