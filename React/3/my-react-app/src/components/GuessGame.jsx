import React, { useState } from 'react';
import GuessForm from './GuessForm';
import Message from './Message';

// Pagrindinis skaičių spėjimo žaidimo komponentas
const GuessGame = () => {
  // Sugeneruojame atsitiktinį skaičių nuo 1 iki 100
  const [secretNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  // Vartotojo spėjimas
  const [guess, setGuess] = useState('');
  // Spėjimų skaičius
  const [attempts, setAttempts] = useState(0);
  // Pranešimo būsena
  const [message, setMessage] = useState('');

  // Funkcija, kuri tikrina vartotojo spėjimą
  const handleGuess = (e) => {
    e.preventDefault();// Neleidžiame puslapiui persikrauti
    const numericGuess = parseInt(guess, 10);// Konvertuojame
    if (isNaN(numericGuess)) {   // Jei įvesta ne skaičius, rodome klaidos pranešimą
      setMessage('Prašome įvesti skaičių');
      return;
    }
    setAttempts(attempts + 1);// Didiname bandymų skaičių
    if (numericGuess > secretNumber) {// Tikriname, ar spėjimas yra teisingas
      setMessage('Bandyk mažesnį');
    } else if (numericGuess < secretNumber) {
      setMessage('Bandyk didesnį');
    } else {
      setMessage('Teisingai!');
    }
    setGuess(''); // išvalome input
  };

  return (
    <div className="game-container">
      <h2>Skaičių spėjimo žaidimas</h2>
      {/*Komponentas, atsakingas už vartotojo įvestį*/}
      <GuessForm guess={guess} setGuess={setGuess} onSubmit={handleGuess} />
      {/*Komponentas, rodantis pranešimus ir bandymų skaičių*/}
      <Message message={message} attempts={attempts} />
    </div>
  );
};

export default GuessGame;
