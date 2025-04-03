import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Klaida gaunant recepto detales:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Kraunasi...</p>;
  if (!recipe) return <p>Receptas nerastas.</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <p>{recipe.description || 'Detalių nėra.'}</p>
      {/* Papildoma informacija, pvz.: ingredientai, gaminimo laikas ir pan. */}
    </div>
  );
};

export default RecipeDetail;
