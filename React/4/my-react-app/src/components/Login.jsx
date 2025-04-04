import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Naudojama autentifikavimo konteksto funkcija
import { useNavigate, Link } from 'react-router-dom'; // Naudojama navigacija ir registracijos nuoroda

// Komponentas, atsakingas už prisijungimo formą
const Login = () => {
  // Paimam `signIn` funkciją iš autentifikavimo konteksto
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate(); // Naudojama navigacijai

  // Būsena, sauganti vartotojo įvestus duomenis
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  // Būsena klaidų žinutėms
  const [error, setError] = useState('');

  // Funkcija, kuri atnaujina vartotojo duomenis įvedimo laukeliuose
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Funkcija, kuri valdys prisijungimo formos pateikimą
  const handleSubmit = async (e) => {
    e.preventDefault(); // Neleidžia formos pateikimui sukelti puslapio perkrovimo
    setError(''); // Išvalome klaidos žinutę prieš bandant prisijungti
    try {
      await signIn(credentials); // Bandom prisijungti su pateiktais duomenimis
      navigate('/dashboard'); // Jei prisijungimas sėkmingas, nukreipiame į 'dashboard'
    } catch (err) {
      setError('Prisijungimo klaida'); // Jei klaida, rodome klaidos žinutę
    }
  };

  return (
    <div className="auth-container">
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            name="username" 
            placeholder="Vartotojo vardas" 
            value={credentials.username} 
            onChange={handleChange} // Atnaujina vartotojo vardą
            required // Reikalingas laukelis
          />
        </div>
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Slaptažodis" 
            value={credentials.password} 
            onChange={handleChange} // Atnaujina slaptažodį
            required // Reikalingas laukelis
          />
        </div>
        {error && <p className="error">{error}</p>} {/* Rodoma klaidos žinutė, jei yra */}
        <button type="submit">Prisijungti</button> {/* Mygtukas formos pateikimui */}
      </form>
      <p>Naujas vartotojas? <Link to="/register">Registracija</Link></p> {/* Nuoroda į registracijos puslapį */}
    </div>
  );
};

export default Login;