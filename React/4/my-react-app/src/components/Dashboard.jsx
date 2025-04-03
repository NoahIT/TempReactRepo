import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h2>Sveiki, {user?.username}!</h2>
      <p>Tai yra apsaugotas puslapis (Dashboard).</p>
      <button onClick={handleLogout}>Atsijungti</button>
    </div>
  );
};

export default Dashboard;
