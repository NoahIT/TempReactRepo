import React, { useState } from 'react';
import GuessForm from './GuessForm';
import Message from './Message';

const GuessGame = () => {
  // Sugeneruojame atsitiktinį skaičių nuo 1 iki 100
  const [secretNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');

  // Funkcija, kuri valdys spėjimo logiką
  const handleGuess = (e) => {
    e.preventDefault();
    const numericGuess = parseInt(guess, 10);
    if (isNaN(numericGuess)) {
      setMessage('Prašome įvesti skaičių');
      return;
    }
    setAttempts(attempts + 1);
    if (numericGuess > secretNumber) {
      setMessage('Bandyk mažesnį');
    } else if (numericGuess < secretNumber) {
      setMessage('Bandyk didesnį');
    } else {
      setMessage('Teisingai!');
    }
    setGuess(''); // išvalome input lauką
  };

  return (
    <div className="game-container">
      <h2>Skaičių spėjimo žaidimas</h2>
      <GuessForm guess={guess} setGuess={setGuess} onSubmit={handleGuess} />
      <Message message={message} attempts={attempts} />
    </div>
  );
};

export default GuessGame;
