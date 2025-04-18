import { useState, useEffect } from 'react';

export default function KanbanBoard({ tasks, onUpdateTask, onDeleteTask }) {
  const [groups, setGroups] = useState(['To Do', 'In Progress', 'Done']); // pradinės Kanban grupės
  const [newGroupName, setNewGroupName] = useState(''); // laukas naujos grupės pavadinimui
  const [taskGroups, setTaskGroups] = useState({}); // užduočių priskyrimas grupėms
  const [dragOverGroup, setDragOverGroup] = useState(null); // kuri grupė aktyvi dragOver būsenoje

  // Sinchronizuojame taskGroups su gautomis užduotimis ir grupėmis
  useEffect(() => {
    setTaskGroups(prev =>
      tasks.reduce(
        (acc, t) => ({ ...acc, [t.id]: prev[t.id] || groups[0] }),
        {}
      )
    );
  }, [tasks, groups]);

  // Pridedame naują grupę, jei jos nėra sąraše
  const handleAddGroup = () => {
    const name = newGroupName.trim();
    if (name && !groups.includes(name)) {
      setGroups(g => [...g, name]);
      setNewGroupName('');
    }
  };

  // Pradedame vilkti užduotį: perduodame jos id
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  // Leidžiame drop veiksmą ir pažymime grupę
  const handleDragOver = (e, group) => {
    e.preventDefault();
    setDragOverGroup(group);
  };

  // Metame užduotį į grupę: atnaujiname UI ir siunčiame pakeitimus į serverį
  const handleDrop = (e, group) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData('taskId'));
    setDragOverGroup(null);
    setTaskGroups(prev => ({ ...prev, [taskId]: group }));
    const task = tasks.find(t => t.id === taskId);
    onUpdateTask({ ...task, group });
  };

  return (
    <div>
      {/* Grupės kūrimo įrankis */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Nauja grupė"
          value={newGroupName}
          className="form-input"
          onChange={e => setNewGroupName(e.target.value)} // atnaujiname įvestį
        />
        <button className="btn-small" onClick={handleAddGroup}>Add Group</button>
      </div>

      {/* Kanban lentos atvaizdavimas */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        {groups.map(group => (
          <div
            key={group}
            onDragOver={e => handleDragOver(e, group)}
            onDragLeave={() => setDragOverGroup(null)}
            onDrop={e => handleDrop(e, group)}
            style={{
              minWidth: '250px',
              padding: '1rem',
              borderRadius: '4px',
              border: dragOverGroup === group ? '3px dashed #007bff' : '2px dashed #ccc',
              backgroundColor: '#f7f7f7',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <h3 style={{ textAlign: 'center' }}>{group}</h3>

            {/* Užduočių atvaizdavimas pagal grupę */}
            {tasks
              .filter(t => taskGroups[t.id] === group)
              .map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={e => handleDragStart(e, task.id)}
                  style={{
                    backgroundColor: '#fff',
                    padding: '1rem',
                    marginBottom: '0.75rem',
                    borderRadius: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    cursor: 'grab',
                    position: 'relative',
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem' }}>{task.title}</h4>
                  <p style={{ margin: '0 0 0.5rem' }}>{task.description}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>
                    Created: {new Date(task.created_at).toLocaleString()}
                    <br />
                    Updated: {new Date(task.updated_at).toLocaleString()}
                  </p>

                  {/* Redagavimo ir šalinimo mygtukai */}
                  <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                    <button
                      className="btn-small"
                      onClick={() => {
                        const newTitle = prompt('Naujas pavadinimas:', task.title);
                        if (newTitle === null) return;
                        const newDesc = prompt('Naujas aprašymas:', task.description);
                        if (newDesc === null) return;
                        onUpdateTask({ ...task, title: newTitle, description: newDesc });
                      }}
                    >
                      ✏️
                    </button>
                    <button className="btn-small" onClick={() => onDeleteTask(task.id)}>🗑️</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}