import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams(); // Gauname recepto ID iš URL parametrų
  const [recipe, setRecipe] = useState(null); // Būsena, sauganti recepto detales
  const [loading, setLoading] = useState(true); // Būsena, kuri nurodo, ar recepto duomenys yra kraunami

  // Efektas, kuris užkrauna recepto duomenis, kai recepto ID keičiasi
  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`) // Atliekame užklausą pagal recepto ID
      .then((response) => response.json()) // Paverčiame gautus duomenis į JSON
      .then((data) => {
        setRecipe(data); // Nustatome recepto duomenis
        setLoading(false); // Baigiame krauti
      })
      .catch((error) => {
        console.error('Klaida gaunant recepto detales:', error); // Jei klaida, išvedame klaidą į konsolę
        setLoading(false); // Baigiame krauti net jei įvyko klaida
      });
  }, [id]); // Efektas aktyvuojamas kiekvieną kartą, kai recepto ID keičiasi

  // Jei duomenys dar kraunami, rodomas įspėjimas
  if (loading) return <p>Kraunasi...</p>;

  // Jei receptas nerastas, rodomas pranešimas
  if (!recipe) return <p>Receptas nerastas.</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2> {/* Rodyti recepto pavadinimą */}
      <p>{recipe.description || 'Detalių nėra.'}</p> {/* Rodyti aprašymą arba pranešimą, jei aprašymo nėra */}
    </div>
  );
};

export default RecipeDetail;