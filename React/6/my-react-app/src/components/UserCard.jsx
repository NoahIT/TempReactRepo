import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Miestas: {user.city}</p>
    </div>
  );
};

export default React.memo(UserCard);
