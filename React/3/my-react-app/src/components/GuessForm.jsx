import React from 'react';

const GuessForm = ({ guess, setGuess, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input 
      className='guess-input'
        type="number" 
        value={guess} 
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Įveskite skaičių" 
      />
      <button type="submit">Spėti</button>
    </form>
  );
};

export default GuessForm;
