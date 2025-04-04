import React from 'react';

// Komponentas, atsakingas už skaičiaus įvedimą ir spėjimo pateikimą
const GuessForm = ({ guess, setGuess, onSubmit }) => {
  return (
    // Formos pateikimas iškviečia `onSubmit` funkciją
    <form onSubmit={onSubmit}>
      <input 
      className='guess-input'
        type="number" 
        value={guess} 
        onChange={(e) => setGuess(e.target.value)} // Atnaujina spėjimo būseną
        placeholder="Įveskite skaičių" 
      />
      <button type="submit">Spėti</button>
    </form>
  );
};

export default GuessForm;
