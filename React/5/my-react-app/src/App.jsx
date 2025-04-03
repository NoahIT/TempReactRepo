import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <nav>
          <Link to="/">Receptai</Link> | <Link to="/favorites">Mėgstamiausi</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
