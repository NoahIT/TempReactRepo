import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Būsena, kuri nurodo, ar receptas yra mėgstamas

  // Funkcija, kuri prideda arba pašalina receptą iš mėgstamų sąrašo
  const handleFavorite = () => {
    if (!isFavorite) {
      // Pridedame receptą į mėgstamų sąrašą, siunčiame POST užklausą į serverį
      fetch('http://localhost:3001/favorites', {
        method: 'POST', // Naudojame POST metodą, kad pridėtume receptą
        headers: { 'Content-Type': 'application/json' }, // Nurodome, kad siunčiame JSON duomenis
        body: JSON.stringify(recipe) // Perduodame receptą kaip JSON objektą
      })
        .then((res) => res.json()) // Paverčiame atsakymą į JSON
        .then(() => setIsFavorite(true)) // Jei užklausa sėkminga, nustatome, kad receptas yra mėgstamas
        .catch((error) => console.error('Klaida pridedant mėgstamus:', error)); // Jei klaida, išvedame klaidą į konsolę
    } else {
      // Pašaliname receptą iš mėgstamų sąrašo, siunčiame DELETE užklausą į serverį
      fetch(`http://localhost:3001/favorites/${recipe.id}`, {
        method: 'DELETE' // Naudojame DELETE metodą, kad pašalintume receptą pagal ID
      })
        .then(() => setIsFavorite(false)) // Po sėkmingo pašalinimo, nustatome, kad receptas nebe yra mėgstamas
        .catch((error) => console.error('Klaida šalinant mėgstamus:', error)); // Jei klaida, išvedame klaidą į konsolę
    }
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3> {/* Rodyti recepto pavadinimą */}
      <p>{recipe.description || 'Nėra aprašymo'}</p> {/* Rodyti recepto aprašymą arba pranešimą, jei nėra aprašymo */}
      <div className="card-actions">
        <Link to={`/recipe/${recipe.id}`}>Plačiau</Link> {/* Nuoroda į detalią recepto puslapį */}
        <button onClick={handleFavorite}>
          {isFavorite ? '❤️' : '🤍'} {/* Rodyti širdies mygtuką, priklausomai nuo to, ar receptas mėgstamas */}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;