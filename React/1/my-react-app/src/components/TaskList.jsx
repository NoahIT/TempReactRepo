import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // naudosime kaip unikalų ID
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
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
