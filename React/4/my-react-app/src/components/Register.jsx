import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registrationData, setRegistrationData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await signUp(registrationData);
      setSuccess('Registracija sėkminga! Dabar galite prisijungti.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Registracijos klaida');
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
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Slaptažodis" 
            value={registrationData.password} 
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Registruotis</button>
      </form>
      <p>Jau turite paskyrą? <Link to="/login">Prisijungti</Link></p>
    </div>
  );
};

export default Register;
