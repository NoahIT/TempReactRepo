import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Importuojame AuthContext, kad galėtume pasiekti autentifikacijos duomenis
import { useNavigate } from 'react-router-dom'; // Importuojame useNavigate, kad galėtume naviguoti tarp puslapių

// Komponentas, kuris rodo naudotojo informaciją ir suteikia galimybę atsijungti
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Iš AuthContext paimame vartotojo duomenis ir atsijungimo funkciją
  const navigate = useNavigate(); // Naudojame useNavigate, kad galėtume perkelti vartotoją į kitus puslapius

  // Funkcija, kuri atlieka atsijungimą ir perkelia vartotoją į prisijungimo puslapį
  const handleLogout = () => {
    logout(); // Iškviečiame logout funkciją, kad atsijungtume
    navigate('/login'); // Po atsijungimo nukreipiame vartotoją į prisijungimo puslapį
  };

  return (
    <div className="dashboard">
      <h2>Sveiki, {user?.username}!</h2> {/* Rodome sveikinimo žinutę su vartotojo vardu */}
      <p>Tai yra apsaugotas puslapis (Dashboard).</p> {/* Informacija, kad tai apsaugotas puslapis */}
      <button onClick={handleLogout}>Atsijungti</button> {/* Mygtukas, kuris iškviečia handleLogout funkciją */}
    </div>
  );
};

export default Dashboard;