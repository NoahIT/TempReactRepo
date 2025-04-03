import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError('Prisijungimo klaida');
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
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Slaptažodis" 
            value={credentials.password} 
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Prisijungti</button>
      </form>
      <p>Naujas vartotojas? <Link to="/register">Registracija</Link></p>
    </div>
  );
};

export default Login;
