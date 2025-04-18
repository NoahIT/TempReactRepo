import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Tikriname ar naudotojas prisijungęs per tokeną
  return token
    ? children // Jei tokenas egzistuoja, rodome apsaugotą turinį
    : <Navigate to="/login" />; // Jei ne, peradresuojame į prisijungimo puslapį
}
