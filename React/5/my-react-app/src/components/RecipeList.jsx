import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 5;

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((response) => response.json())
      .then((data) => {
        // Tikimės, kad duomenyse yra "recipes" laukas
        setRecipes(data.recipes);
      })
      .catch((error) => {
        console.error('Klaida gaunant receptus:', error);
      });
  }, []);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * recipesPerPage;
  const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <div className="recipe-list">
      <h2>Receptai</h2>
      <div className="cards-container">
        {currentRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Atgal
        </button>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Kitas
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
