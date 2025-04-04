import React from 'react';

// SearchBar komponentas, kuris leidžia vartotojui ieškoti pagal vardą
const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="search-bar">
      {/* Įvedimo laukelis paieškai */}
      <input 
        type="text"
        placeholder="Ieškoti naudotojo pagal vardą..."
        value={value} // Įvedimo lauko reikšmė, kurią perduodame kaip prop iš tėvinio komponento
        onChange={onChange} // Funkcija, kuri bus kviečiama, kai vartotojas keičia įvedimo lauką
      />
      {/* Mygtukas, kuris išvalo paiešką */}
      <button onClick={onClear}>Valyti paiešką</button>
    </div>
  );
};

// React.memo naudojama optimizuoti komponento atnaujinimą, kad jis nebūtų persikrautas, jei `value`, `onChange`, ir `onClear` props nesikeičia.
export default React.memo(SearchBar);