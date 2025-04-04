import React from 'react';
import UserCard from './UserCard';  // Importuojame naudotojo kortelės komponentą

// UserList komponentas, kuris priima 'users' prop ir rodo kiekvieną naudotoją kaip 'UserCard'
const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {/* Iteruojame per kiekvieną naudotoją ir sukuriame UserCard komponentą */}
      {users.map(user => (
        <UserCard key={user.id} user={user} />  // Kiekvienam naudotojui perduodame 'user' prop ir naudojame 'id' kaip unikalų raktą
      ))}
    </div>
  );
};

// React.memo naudojamas optimizuoti komponento persikrovimus, kad jis neperrenginėtų, jei 'users' prop nepasikeitė
export default React.memo(UserList);


// import React from 'react';
// import UserCard from './UserCard';

// const UserList = ({ users }) => {
//   return (
//     <div className="user-list">
//       {users.map(user => (
//         <UserCard key={user.id} user={user} />
//       ))}
//     </div>
//   );
// };

// export default React.memo(UserList);
