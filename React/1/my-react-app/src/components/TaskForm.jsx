import React, { useState } from 'react';

// Funkcinis komponentas TaskForm, kuris priima prop'ą addTask
const TaskForm = ({ addTask }) => {
  // Naudojame state saugoti įvesties laukelio reikšmę
  const [input, setInput] = useState('');

  // Funkcija, kuri apdoros formos pateikimą
  const handleSubmit = (e) => {
    e.preventDefault();// Neleidžia puslapiui persikrauti paspaudus mygtuką
    if (input.trim()) { // Patikriname, ar įvestis nėra tuščia
      addTask(input); // Kvietimas į tėvinį komponentą perduoti naują užduotį
      setInput(''); // Išvalome įvesties lauką
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
      className='task-input'
        type="text" 
        value={input} 
        // Atnaujina būseną pagal vartotojo įvestį
        onChange={(e) => setInput(e.target.value)}
        placeholder="Įrašykite užduotį..."
      />
      <button type="submit">Pridėti užduotį</button> 
    </form>
  );
};

export default TaskForm;
