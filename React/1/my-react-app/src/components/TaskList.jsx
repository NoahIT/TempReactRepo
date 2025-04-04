import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

// Pagrindinis komponentas, valdantis užduočių sąrašą
const TaskList = () => {
  // Naudojame state užduočių sąrašo saugojimui
  const [tasks, setTasks] = useState([]);

  // Funkcija naujai užduočiai pridėti
  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // naudosime kaip unikalų ID
      text,
      completed: false, // Pradinė būsena false
    };
    setTasks([...tasks, newTask]); // Atnaujiname būseną, pridedant naują užduotį į masyvą
  };

  // Funkcija užduočiai pažymėti kaip atliktai arba atšaukti atlikimą
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task// Keičiame atlikimo būseną
    );
    setTasks(updatedTasks);// Atnaujiname būseną
  };

  // Funkcija užduočiai ištrinti pagal ID
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id); // Išfiltruojame užduotis, palikdami visas, išskyrus tą, kurią reikia ištrinti
    setTasks(updatedTasks);// Atnaujiname būseną
  };

  return (
    <div className="task-container">
      <h2>Užduočių sąrašas</h2>
      <TaskForm addTask={addTask} />
      <ul>
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
