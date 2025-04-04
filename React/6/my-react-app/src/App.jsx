import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBar from './components/SearchBar'; // Importuojame paieškos juostą komponentą
import UserList from './components/UserList';   // Importuojame naudotojų sąrašo komponentą
import './App.css';  // Importuojame stilius

const App = () => {
  const [users, setUsers] = useState([]); // Saugo visus naudotojus
  const [searchText, setSearchText] = useState(''); // Saugo paieškos tekstą
  const [loading, setLoading] = useState(true); // Nustatome, ar duomenys vis dar kraunami

  // Naudojame useEffect, kad užkrautume naudotojus tik pirmą kartą
  useEffect(() => {
    setTimeout(() => {
      // Generuojame 100 naudotojų su atsitiktiniais duomenimis
      const generatedUsers = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        city: `City ${((i + 1) % 10) + 1}` // 10 skirtingų miestų pasirinkau
      }));
      setUsers(generatedUsers); // Nustatome naudotojų sąrašą į būseną
      setLoading(false); // Nustatome, kad duomenys yra užkrauti
    }, 1000); // Duomenų užkrovimas simuliuojamas su 1 sekundės vėlavimu
  }, []); // Efektas bus vykdomas tik pirmą kartą, kai komponentas pasikrauna

  // Efektyviai filtruojame naudotojus pagal paieškos tekstą
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) // Filtruojame pagal vardą
    );
  }, [users, searchText]); // Užtikriname, kad filtravimas bus vykdomas tik kai keičiasi naudotojų sąrašas ar paieškos tekstas

  // Naudojame useCallback, kad išvengtume perteklinių komponentų persikrovimų
  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value); // Nustatome paieškos tekstą pagal įvestą reikšmę
  }, []); // Funkcija nebus kuriama iš naujo, kol nepasikeis priklausomybės

  // Naudojame useCallback, kad išvengtume perteklinių komponentų persikrovimų
  const handleClearSearch = useCallback(() => {
    setSearchText(''); // Išvalome paieškos lauką
  }, []); // Funkcija nebus kuriama iš naujo, kol nepasikeis priklausomybės

  return (
    <div className="app">
      <h1>Naudotojų paieška</h1>
      {/* Paieškos juosta komponentas */}
      <SearchBar 
        value={searchText}          // Paieškos tekstas
        onChange={handleSearchChange} // Paieškos teksto pokytis
        onClear={handleClearSearch}   // Paieškos laukelio išvalymas
      />
      {loading ? (
        <p>Loading...</p> // Rodo kol užkraunami duomenys
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            // Jei yra rasta atitikmenų, rodome naudotojų sąrašą
            <UserList users={filteredUsers} />
          ) : (
            <p>Nerasta rezultatų.</p> // Jei nerandama naudotojų pagal paieškos kriterijus
          )}
        </>
      )}
    </div>
  );
};

export default App;
