import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Sukuriame būseną, kurioje saugosime mėgstamus receptus

  // Funkcija, kuri gauna mėgstamus receptus iš serverio
  const fetchFavorites = () => {
    fetch('http://localhost:3001/favorites') // Užklausa į serverį, kad gautume mėgstamus receptus
      .then((response) => response.json()) // Paverčiame atsakymą į JSON
      .then((data) => setFavorites(data)) // Įrašome gautus duomenis į state
      .catch((error) => console.error('Klaida gaunant mėgstamuosius:', error)); // Jei įvyksta klaida, išvedame ją į konsolę
  };

  // Naudojame useEffect, kad gautume mėgstamus receptus tik pirmą kartą užkrovus komponentą
  useEffect(() => {
    fetchFavorites(); // Pirmą kartą užkrauname mėgstamus receptus
  }, []); // Tuščias masyvas, tai reiškia, kad efekto funkcija bus vykdoma tik vieną kartą

  // Funkcija, kuri pašalina receptą iš mėgstamų
  const removeFavorite = (id) => {
    fetch(`http://localhost:3001/favorites/${id}`, {
      method: 'DELETE' // Naudojame DELETE metodą, kad pašalintume receptą
    })
      .then(() => fetchFavorites()) // Po pašalinimo vėl gauname atnaujintą sąrašą
      .catch((error) => console.error('Klaida šalinant mėgstamus:', error)); // Jei įvyksta klaida, išvedame ją į konsolę
  };

  return (
    <div className="favorites">
      <h2>Mėgstamiausi Receptai</h2>
      {favorites.length === 0 ? ( // Patikriname, ar mėgstami receptai yra
        <p>Nėra mėgstamiausių receptų.</p> // Jei sąrašas tuščias, parodome žinutę
      ) : (
        <div className="cards-container">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3> {/* Rodyti recepto pavadinimą */}
              <p>{recipe.description || 'Nėra aprašymo'}</p> {/* Rodyti recepto aprašymą, jei jo nėra, parodyti pranešimą */}
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
