import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  // Simuliuojame naudotojų duomenų užkrovimą
  useEffect(() => {
    setTimeout(() => {
      // Generuojame 100 naudotojų
      const generatedUsers = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        city: `City ${((i + 1) % 10) + 1}`
      }));
      setUsers(generatedUsers);
      setLoading(false);
    }, 1000);
  }, []);

  // Efektyviai filtruojame naudotojus pagal paieškos tekstą
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]);

  // useCallback, kad nepersistengtų komponentai nereikalingai
  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
  }, []);

  return (
    <div className="app">
      <h1>Naudotojų paieška</h1>
      <SearchBar 
        value={searchText}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            <UserList users={filteredUsers} />
          ) : (
            <p>Nerasta rezultatų.</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
