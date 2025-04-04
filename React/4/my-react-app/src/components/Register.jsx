import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Importuojamas AuthContext, kad galėtume pasiekti autentifikavimo funkcijas
import { Link, useNavigate } from 'react-router-dom'; // Naudosiu navigacija ir nuorodos į kitus puslapius

// Komponentas, atsakingas už vartotojo registraciją
const Register = () => {
  // Paimame `signUp` funkciją iš AuthContext, kad galėtume užregistruoti vartotoją
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate(); // Naudojama navigacijai į kitus puslapius

  // Būsena, sauganti registracijos duomenis
  const [registrationData, setRegistrationData] = useState({ username: '', password: '' });
  
  // Būsena klaidų ir sėkmingos registracijos žinutėms
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Funkcija, kuri apdoroja įvestų duomenų pasikeitimus formoje
  const handleChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  // Funkcija, kuri valdys registracijos formos pateikimą
  const handleSubmit = async (e) => {
    e.preventDefault(); // Neleidžia formos pateikimui sukelti puslapio perkrovimo
    setError(''); // Išvalome klaidos žinutę prieš bandant registruotis
    setSuccess(''); // Išvalome ankstesnę sėkmingos registracijos žinutę
    try {
      // Bandome užregistruoti vartotoją su pateiktais duomenimis
      await signUp(registrationData);
      setSuccess('Registracija sėkminga! Dabar galite prisijungti.'); // Jei registracija sėkminga, nustatome sėkmingą žinutę
      setTimeout(() => {
        navigate('/login'); // Po 2 sekundžių nukreipiame vartotoją į prisijungimo puslapį
      }, 2000);
    } catch (err) {
      setError('Registracijos klaida'); // Jei klaida, rodome klaidos žinutę
    }
  };

  return (
    <div className="auth-container">
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            name="username" 
            placeholder="Vartotojo vardas" 
            value={registrationData.username} 
            onChange={handleChange} // Atnaujina vartotojo vardą
            required // Reikalingas laukelis
          />
        </div>
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Slaptažodis" 
            value={registrationData.password} 
            onChange={handleChange} // Atnaujina slaptažodį
            required // Reikalingas laukelis
          />
        </div>
        {error && <p className="error">{error}</p>} {/* Rodoma klaidos žinutė, jei yra klaida */}
        {success && <p className="success">{success}</p>} {/* Rodoma sėkminga registracijos žinutė, jei registracija sėkminga */}
        <button type="submit">Registruotis</button> {/* Mygtukas formos pateikimui */}
      </form>
      <p>Jau turite paskyrą? <Link to="/login">Prisijungti</Link></p> {/* Nuoroda į prisijungimo puslapį */}
    </div>
  );
};

export default Register;