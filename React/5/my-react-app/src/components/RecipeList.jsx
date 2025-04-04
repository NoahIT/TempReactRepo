import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); // Saugo receptų sąrašą
  const [currentPage, setCurrentPage] = useState(0); // Saugo dabartinę puslapio būseną
  const recipesPerPage = 5; // Kiek receptų rodyti viename puslapyje darant pagination

  // Naudojame useEffect, kad užkrautume receptus iš serverio tik pirmą kartą
  useEffect(() => {
    fetch('https://dummyjson.com/recipes') // Užklausa į serverį, kad gautume receptus
      .then((response) => response.json()) // Paverčiame gautus duomenis į JSON
      .then((data) => {
        // Tikimės, kad atsakymas turės "recipes" lauką, kuriame bus visi receptai
        setRecipes(data.recipes); // Nustatome receptus į būsena
      })
      .catch((error) => {
        console.error('Klaida gaunant receptus:', error); // Klaidos tvarkymas
      });
  }, []); // Efektas bus vykdomas tik pirmą kartą komponentui pasikraunant

  // Apskaičiuojame bendrą puslapių skaičių pagal receptų kiekį ir receptų per puslapį skaičių
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  // Funkcija, kuri keičia puslapį į kitą
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); // Jei ne paskutinis puslapis, pereiname į kitą
  };

  // Funkcija, kuri grąžina į ankstesnį puslapį
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1); // Jei ne pirmas puslapis, pereiname į ankstesnį
  };

  // Apskaičiuojame, nuo kurio recepto prasideda dabartinis puslapis
  const startIndex = currentPage * recipesPerPage;
  // Pasirenkame tik tuos receptus, kurie priklauso dabartiniam puslapiui
  const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <div className="recipe-list">
      <h2>Receptai</h2>
      <div className="cards-container">
        {currentRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} /> // Rodo kiekvieną receptą naudojant RecipeCard komponentą
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 0}> {/* Puslapio atgal mygtukas */}
          Atgal
        </button>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}> {/* Puslapio į priekį mygtukas */}
          Kitas
        </button>
      </div>
    </div>
  );
};

export default RecipeList;