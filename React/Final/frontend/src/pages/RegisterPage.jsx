import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import API from '../services/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' }); // Formos duomenų būsena
  const navigate = useNavigate(); // Funkcija nukreipimui

  // Formos pateikimo tvarkymo funkcija
  const handleSubmit = async (e) => {
    e.preventDefault(); // Išvengiame puslapio perkrovimo
    try {
      await API.post('/auth/register', form); // Registracijos užklausa
      navigate('/login'); // Po sėkmės peradresuojame į prisijungimą
    } catch (err) {
      console.error(err.response?.data); // Klaidos informacija konsolėje
      alert('Registracija nepavyko'); // Vartotojui parodyti klaidos pranešimą
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Registracija</h1>
        <form onSubmit={handleSubmit}> {/* Formos paleidimas */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Vartotojo vardas"
              className="form-input"
              value={form.username} // Susiejame su būsena
              onChange={(e) => setForm({ ...form, username: e.target.value })} // Atnaujiname username
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Slaptažodis"
              className="form-input"
              value={form.password} // Susiejame su būsena
              onChange={(e) => setForm({ ...form, password: e.target.value })} // Atnaujiname password
            />
          </div>
          <button type="submit" className="btn">
            Registruotis
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            className="btn-small"
            onClick={() => navigate('/login')} // Greitas perėjimas į prisijungimo puslapį
          >
            Prisijungti
          </button>
        </div>
      </div>
    </div>
  );
}