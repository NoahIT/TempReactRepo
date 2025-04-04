import React from 'react';

// Komponentas, rodantis pranešimą apie spėjimo rezultatą ir bandymų skaičių
const Message = ({ message, attempts }) => {
  return (
    <div className="message">
      <p>{message}</p>
      {attempts > 0 && <p>Bandymai: {attempts}</p>}
    </div>
  );
};

export default Message;
