import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = () => {
    fetch('http://localhost:3001/favorites')
      .then((response) => response.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error('Klaida gaunant mėgstamuosius:', error));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = (id) => {
    fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchFavorites())
      .catch((error) => console.error('Klaida šalinant mėgstamus:', error));
  };

  return (
    <div className="favorites">
      <h2>Mėgstamiausi Receptai</h2>
      {favorites.length === 0 ? (
        <p>Nėra mėgstamiausių receptų.</p>
      ) : (
        <div className="cards-container">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description || 'Nėra aprašymo'}</p>
              <div className="card-actions">
                <button onClick={() => removeFavorite(recipe.id)}>
                  Pašalinti iš mėgstamiausių
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
