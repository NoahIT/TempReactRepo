import React from 'react';

// UserCard komponentas, kuris rodo naudotojo informaciją
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      {/* Rodome naudotojo vardą */}
      <h3>{user.name}</h3>
      {/* Rodome naudotojo el. pašto adresą */}
      <p>Email: {user.email}</p>
      {/* Rodome naudotojo gyvenamąjį miestą */}
      <p>Miestas: {user.city}</p>
    </div>
  );
};

// React.memo naudojama optimizuoti šio komponento persikrovimus. 
// Komponentas nebus persikrautas, jei 'user' prop nepasikeičia.
export default React.memo(UserCard);