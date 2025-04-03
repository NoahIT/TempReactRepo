import React from 'react';

const Message = ({ message, attempts }) => {
  return (
    <div className="message">
      <p>{message}</p>
      {attempts > 0 && <p>Bandymai: {attempts}</p>}
    </div>
  );
};

export default Message;
