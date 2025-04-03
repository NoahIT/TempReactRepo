import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
      className='task-input'
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder="Įrašykite užduotį..."
      />
      <button type="submit">Pridėti užduotį</button>
    </form>
  );
};

export default TaskForm;
