import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li>
      <span className={task.completed ? 'completed' : ''}>
        {task.text}
      </span>
      <button onClick={() => onToggle(task.id)}>
        {task.completed ? 'Atšaukti' : 'Pažymėti kaip atliktą'}
      </button>
      <button onClick={() => onDelete(task.id)}>Ištrinti</button>
    </li>
  );
};

export default TaskItem;
