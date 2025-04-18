import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import TaskPage from './pages/TaskPage'; 
import ProtectedRoute from './components/ProtectedRoute'; // Apsaugotas maršrutas, prieiga tik prisijungusiems

function App() {
  return (
      <Routes>
        {/* Pagrindinis kelias nukreipia į /login (jei n tada /tasks) */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Vieši puslapiai: prisijungimas ir registracija */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Apsaugotas /tasks kelias: tik prisijungę vartotojai */}
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        } />
      </Routes>
  );
}

export default App; // Eksportuojame App komponentą kaip modulį