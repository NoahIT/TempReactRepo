import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    if (!isFavorite) {
      // Pridedame receptą į mėgstamų sąrašą
      fetch('http://localhost:3001/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      })
        .then((res) => res.json())
        .then(() => setIsFavorite(true))
        .catch((error) => console.error('Klaida pridedant mėgstamus:', error));
    } else {
      // Pašaliname receptą iš mėgstamų sąrašo
      fetch(`http://localhost:3001/favorites/${recipe.id}`, {
        method: 'DELETE'
      })
        .then(() => setIsFavorite(false))
        .catch((error) => console.error('Klaida šalinant mėgstamus:', error));
    }
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{recipe.description || 'Nėra aprašymo'}</p>
      <div className="card-actions">
        <Link to={`/recipe/${recipe.id}`}>Plačiau</Link>
        <button onClick={handleFavorite}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
