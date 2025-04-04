import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Importuojame Navigate komponentą iš react-router-dom, kuris leidžia atlikti puslapio nukreipimą
import { AuthContext } from './AuthContext'; // Importuojame AuthContext, kad galėtume pasiekti autentifikacijos būseną

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Naudojame useContext, kad pasiektume autentifikacijos būseną iš AuthContext

  // Jei vartotojas nėra prisijungęs, nukreipiame jį į login puslapį
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect į login puslapį, jei vartotojas nėra prisijungęs
  }

  // Jei vartotojas prisijungęs, leidžiame jam pasiekti vaiką (pavyzdžiui, užrakintas puslapis)
  return children; 
};

export default ProtectedRoute;